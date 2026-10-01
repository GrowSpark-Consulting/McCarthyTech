'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type FieldPath } from 'react-hook-form';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { ChevronDownGlyph } from '@/components/ui/chevron-down-glyph';
import {
  INQUIRY_BUDGETS,
  INQUIRY_LIMITS,
  INQUIRY_SERVICES,
  INQUIRY_SOURCES,
  INQUIRY_TIMELINES,
  contactInquiryContent,
  contactInquirySchema,
  type ContactInquiry,
} from '@/lib/contact-inquiry';
import { submitContactForm } from '@/lib/contact-service';
import { cn } from '@/lib/utils';

/** Text inputs, selects and the textarea share one shell. */
const CONTROL_CLASS = cn(
  'w-full rounded-[10px] border border-white/[0.12] bg-white/[0.03] px-4 text-[15px] text-white',
  'outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-out placeholder:text-white/45',
  'hover:border-white/25 focus:border-lime focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(196,240,18,0.14)]',
  'aria-[invalid=true]:border-danger-soft/70 aria-[invalid=true]:focus:shadow-[0_0_0_3px_rgba(255,106,156,0.16)]',
);

const EMPTY: ContactInquiry = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '' as ContactInquiry['service'],
  budget: '' as ContactInquiry['budget'],
  timeline: '' as ContactInquiry['timeline'],
  message: '',
  howHeard: '',
};

type Status = 'idle' | 'success' | 'error';

interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

/** Label above, control, then the field's error. */
function Field({ id, label, required = false, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/85">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-lime">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-white/50">(optional)</span>
        )}
      </label>
      {children}
      {error === undefined ? null : (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger-soft">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The Contact page inquiry form.
 *
 * Validates in the browser for quick feedback, then sends through
 * `submitContactForm` to the Google Apps Script endpoint, which validates
 * again, stores the inquiry in Google Sheets and emails the team. Field errors
 * the endpoint reports are shown on the same fields.
 *
 * Spam defences on this side are a honeypot input people never see and the
 * time the form was opened; the endpoint enforces both, plus rate limits and
 * duplicate suppression. A ref guards against a second submit before React
 * has disabled the button.
 *
 * A failed send keeps everything the visitor typed; only a success resets it.
 */
export function ContactInquiryForm() {
  const baseId = useId();
  const id = (name: string) => `${baseId}-${name}`;
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>(contactInquiryContent.errorMessage);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const inFlightRef = useRef(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInquiry>({
    resolver: zodResolver(contactInquirySchema),
    mode: 'onTouched',
    defaultValues: EMPTY,
  });

  const [service, budget, timeline, howHeard, message] = useWatch({
    control,
    name: ['service', 'budget', 'timeline', 'howHeard', 'message'],
  });

  /** Wires a control to its label, error and ARIA state. */
  const describe = (name: FieldPath<ContactInquiry>) => ({
    id: id(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  });

  const onSubmit = handleSubmit(async (values) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus('idle');

    try {
      const result = await submitContactForm({
        ...values,
        howHeard: values.howHeard ?? '',
        companyFax: honeypotRef.current?.value ?? '',
        startedAt: startedAtRef.current,
      });

      if (result.ok) {
        reset(EMPTY);
        setStatus('success');
        return;
      }

      if (result.reason === 'invalid' && result.fieldErrors) {
        for (const [field, text] of Object.entries(result.fieldErrors)) {
          if (field in EMPTY) setError(field as FieldPath<ContactInquiry>, { message: text });
        }
      }
      if (result.reason === 'not-configured' && process.env.NODE_ENV !== 'production') {
        console.error('Contact form: NEXT_PUBLIC_CONTACT_FORM_ENDPOINT is not set.');
      }
      setErrorMessage(
        result.reason === 'rate-limited'
          ? contactInquiryContent.rateLimitedMessage
          : contactInquiryContent.errorMessage,
      );
      setStatus('error');
    } finally {
      inFlightRef.current = false;
    }
  });

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[560px] flex-col items-center justify-center px-4 text-center max-bs-md:min-h-[420px]"
      >
        <span className="relative mb-7 flex size-20 items-center justify-center rounded-full border border-lime/40 bg-lime/10 shadow-[0_0_40px_-6px_rgba(196,240,18,0.55)]">
          <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#c4f012"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-heading text-2xl tracking-[-0.03em] text-white">
          {contactInquiryContent.successTitle}
        </h3>
        <p className="mt-3 max-w-[380px] text-base leading-relaxed text-white/80">
          {contactInquiryContent.successMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={cn(
            'mt-8 rounded-cta border border-white/20 px-6 py-3 text-sm font-bold uppercase text-white',
            'transition-colors duration-300 ease-out hover:border-lime hover:text-lime',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
          )}
        >
          {contactInquiryContent.successAgain}
        </button>
      </div>
    );
  }

  const selectClass = (value: string | undefined) =>
    cn(CONTROL_CLASS, 'h-[54px] cursor-pointer appearance-none pr-11', !value && 'text-white/45');

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={isSubmitting} className="relative">
      {/* Honeypot: off-screen and unfocusable, so only a bot ever fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 size-px overflow-hidden">
        <label htmlFor={id('companyFax')}>Company fax</label>
        <input
          ref={honeypotRef}
          id={id('companyFax')}
          name="companyFax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 bs-md:grid-cols-2">
        <Field id={id('fullName')} label="Full Name" required error={errors.fullName?.message}>
          <input
            type="text"
            autoComplete="name"
            maxLength={INQUIRY_LIMITS.name}
            placeholder="Enter your full name"
            {...describe('fullName')}
            {...register('fullName')}
            className={cn(CONTROL_CLASS, 'h-[54px]')}
          />
        </Field>

        <Field id={id('email')} label="Work Email" required error={errors.email?.message}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={INQUIRY_LIMITS.email}
            placeholder="Enter your business email"
            {...describe('email')}
            {...register('email')}
            className={cn(CONTROL_CLASS, 'h-[54px]')}
          />
        </Field>

        <Field id={id('phone')} label="Phone Number" required error={errors.phone?.message}>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={INQUIRY_LIMITS.phone}
            placeholder="Enter your phone number"
            {...describe('phone')}
            {...register('phone')}
            className={cn(CONTROL_CLASS, 'h-[54px]')}
          />
        </Field>

        <Field id={id('company')} label="Company Name" required error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            maxLength={INQUIRY_LIMITS.company}
            placeholder="Enter your company name"
            {...describe('company')}
            {...register('company')}
            className={cn(CONTROL_CLASS, 'h-[54px]')}
          />
        </Field>

        <Field id={id('service')} label="Service Required" required error={errors.service?.message}>
          <div className="relative">
            <select
              {...describe('service')}
              {...register('service')}
              className={selectClass(service)}
            >
              <option value="" disabled className="bg-[#0b1020] text-white/60">
                Select a service
              </option>
              {INQUIRY_SERVICES.map((option) => (
                <option key={option} value={option} className="bg-[#0b1020] text-white">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownGlyph className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
          </div>
        </Field>

        <Field id={id('budget')} label="Project Budget" required error={errors.budget?.message}>
          <div className="relative">
            <select {...describe('budget')} {...register('budget')} className={selectClass(budget)}>
              <option value="" disabled className="bg-[#0b1020] text-white/60">
                Select a budget range
              </option>
              {INQUIRY_BUDGETS.map((option) => (
                <option key={option} value={option} className="bg-[#0b1020] text-white">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownGlyph className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
          </div>
        </Field>

        <Field
          id={id('timeline')}
          label="Project Timeline"
          required
          error={errors.timeline?.message}
        >
          <div className="relative">
            <select
              {...describe('timeline')}
              {...register('timeline')}
              className={selectClass(timeline)}
            >
              <option value="" disabled className="bg-[#0b1020] text-white/60">
                Select a timeline
              </option>
              {INQUIRY_TIMELINES.map((option) => (
                <option key={option} value={option} className="bg-[#0b1020] text-white">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownGlyph className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
          </div>
        </Field>

        <Field
          id={id('howHeard')}
          label="How did you hear about us?"
          error={errors.howHeard?.message}
        >
          <div className="relative">
            <select
              {...describe('howHeard')}
              {...register('howHeard')}
              className={selectClass(howHeard)}
            >
              <option value="" className="bg-[#0b1020] text-white/60">
                Select an option
              </option>
              {INQUIRY_SOURCES.map((option) => (
                <option key={option} value={option} className="bg-[#0b1020] text-white">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownGlyph className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
          </div>
        </Field>

        <Field
          id={id('message')}
          label="Message / Project Details"
          required
          error={errors.message?.message}
          className="bs-md:col-span-2"
        >
          <textarea
            rows={6}
            maxLength={INQUIRY_LIMITS.message}
            placeholder="Tell us about your project, requirements, goals, or challenges..."
            {...describe('message')}
            {...register('message')}
            className={cn(CONTROL_CLASS, 'min-h-[160px] resize-y py-3.5 leading-relaxed')}
          />
          <p className="mt-1.5 text-right text-xs text-white/50" aria-hidden="true">
            {(message ?? '').length}/{INQUIRY_LIMITS.message}
          </p>
        </Field>
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className="mt-6 flex items-center gap-3 rounded-[10px] border border-danger/40 bg-danger/10 px-4 py-3 text-[15px] text-danger-soft"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 7v6m0 3.5v.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'group relative inline-flex items-center justify-center gap-3 overflow-clip rounded-cta bg-lime',
            'py-[15px] pl-7 pr-3 font-body text-base font-bold uppercase leading-[1.1] text-ink',
            'shadow-[0_0_0_0_rgba(196,240,18,0)] transition-all duration-300 ease-out',
            'hover:-translate-y-0.5 hover:shadow-[0_10px_34px_-8px_rgba(196,240,18,0.65)]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
            'disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none',
            'max-bs-sm:w-full',
          )}
        >
          {isSubmitting ? contactInquiryContent.submittingLabel : contactInquiryContent.submitLabel}
          <span className="relative flex size-[34px] items-center justify-center overflow-hidden rounded-full bg-ink text-white">
            {isSubmitting ? (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-lime motion-reduce:animate-none"
              />
            ) : (
              <>
                <ArrowGlyph
                  variant="compact"
                  className="left-[5px] top-[5px] transition-transform duration-300 ease-out group-hover:-translate-y-[30px] group-hover:translate-x-[30px]"
                />
                <ArrowGlyph
                  variant="compact"
                  className={cn(
                    'left-[5px] top-[5px] -translate-x-[30px] translate-y-[30px]',
                    'transition-transform duration-300 ease-out group-hover:delay-100',
                    'group-hover:translate-x-0 group-hover:translate-y-0',
                  )}
                />
              </>
            )}
          </span>
        </button>
        <p className="text-sm text-white/55">{contactInquiryContent.privacyNote}</p>
      </div>
    </form>
  );
}
