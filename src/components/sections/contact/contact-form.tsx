'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldPath } from 'react-hook-form';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { contactContent } from '@/lib/contact';
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

/** Shared shell styling for every control — `.xb-input-field input`. */
const CONTROL_CLASS = cn(
  'h-[60px] w-full rounded-[5px] border border-white/35 bg-field',
  'py-[10px] pl-12 pr-5 text-[15px] font-normal tracking-[-0.02em] text-white',
  'outline-none transition-all duration-300 ease-out',
  'focus:border-lime',
);

/** Selects: the same shell, with the prompt shown as the first option. There
 *  is no arrow, so the right padding is slim: "Mobile App Development" must fit
 *  the half-width box at 1200–1399px. */
const SELECT_CLASS = cn(
  CONTROL_CLASS,
  'cursor-pointer appearance-none py-[10px] pl-12 pr-2',
  'leading-[38px] text-white',
);

/** Floating placeholder — `.xb-input-field label`. */
const LABEL_CLASS = cn(
  'pointer-events-none absolute left-12 top-1/2 inline-block -translate-y-1/2 whitespace-nowrap',
  // 70%, not the reference's 50%. White at 50% over the `#2b3d66` field reaches
  // only ~3.4:1 against the WCAG AA minimum of 4.5:1 — axe flags it as a
  // `color-contrast` violation. 70% clears the threshold at the same weight.
  'text-[15px] font-normal capitalize tracking-[-0.02em] text-white/70',
  'transition-all duration-300 ease-out',
  // Slides out and fades once the field has focus or content, exactly as the
  // reference's `:focus + label, :valid + label` pair does.
  'peer-focus:-translate-y-1/2 peer-focus:translate-x-[15px] peer-focus:opacity-0',
  'peer-[:not(:placeholder-shown)]:translate-x-[15px] peer-[:not(:placeholder-shown)]:opacity-0',
);

/** Leading glyph — `.xb-input-field img`. The source art is grey, so it is
 *  turned white with a brightness filter, as in the reference. */
const ICON_CLASS = 'pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 brightness-[100]';

const ICON_DIR = '/assets/img/icon';

/** The text inputs, in grid order. */
const TEXT_FIELDS = [
  {
    name: 'fullName',
    label: 'Full Name*',
    type: 'text',
    autoComplete: 'name',
    maxLength: INQUIRY_LIMITS.name,
    icon: `${ICON_DIR}/user-balck-icon.svg`,
  },
  {
    name: 'email',
    label: 'Work Email*',
    type: 'email',
    autoComplete: 'email',
    maxLength: INQUIRY_LIMITS.email,
    icon: `${ICON_DIR}/sms-balck-icon.svg`,
  },
  {
    name: 'phone',
    label: 'Phone Number*',
    type: 'tel',
    autoComplete: 'tel',
    maxLength: INQUIRY_LIMITS.phone,
    icon: `${ICON_DIR}/call-icon02.svg`,
  },
  {
    name: 'company',
    label: 'Company Name*',
    type: 'text',
    autoComplete: 'organization',
    maxLength: INQUIRY_LIMITS.company,
    icon: `${ICON_DIR}/building-icon.svg`,
  },
] as const;

/**
 * The dropdowns, in grid order. A required one's prompt is a disabled option;
 * the optional one's prompt can be chosen again to clear it. A prompt is not
 * an accessible name, so each also has a visually hidden label.
 */
const SELECT_FIELDS = [
  {
    name: 'service',
    label: 'Service required',
    prompt: 'Service Required*',
    options: INQUIRY_SERVICES,
    required: true,
    icon: `${ICON_DIR}/list-icon.svg`,
  },
  {
    name: 'budget',
    label: 'Project budget',
    prompt: 'Project Budget*',
    options: INQUIRY_BUDGETS,
    required: true,
    icon: `${ICON_DIR}/wallet-icon.svg`,
  },
  {
    name: 'timeline',
    label: 'Project timeline',
    prompt: 'Project Timeline*',
    options: INQUIRY_TIMELINES,
    required: true,
    icon: `${ICON_DIR}/calendar-icon.svg`,
  },
  {
    name: 'howHeard',
    label: 'How did you find us? (optional)',
    // Shorter than the Contact page's "How did you hear about us?", which is
    // clipped in the half-width box at 1200–1399px.
    prompt: 'How Did You Find Us?',
    options: INQUIRY_SOURCES,
    required: false,
    icon: `${ICON_DIR}/global-icon.svg`,
  },
] as const;

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

/** What the visitor is told after a send. */
type Result = { readonly status: 'success' | 'error'; readonly message: string };

/** Field-level error text. */
function FieldError({ id, message }: { readonly id: string; readonly message?: string }) {
  if (message === undefined) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] text-danger-soft">
      {message}
    </p>
  );
}

/** A control's leading glyph. */
function FieldIcon({ src, className }: { readonly src: string; readonly className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={20}
      height={20}
      aria-hidden="true"
      className={cn(ICON_CLASS, className)}
    />
  );
}

/**
 * The homepage enquiry form.
 *
 * It asks for the same details as the Contact page form and sends them the
 * same way: validated in the browser against `contactInquirySchema`, then
 * through `submitContactForm` to the Google Apps Script endpoint, which
 * validates again, stores the inquiry in Google Sheets and emails the team.
 * Field errors the endpoint reports are shown on the same fields.
 *
 * Spam defences on this side are a honeypot input people never see and the
 * time the form was opened; the endpoint enforces both, plus rate limits and
 * duplicate suppression. A ref guards against a second submit before React
 * has disabled the button. A failed send keeps everything the visitor typed.
 *
 * Native `placeholder=" "` is kept on each text control so the floating-label
 * animation is driven by CSS state rather than by re-rendering on every
 * keystroke.
 */
export function ContactForm() {
  const formId = useId();
  const [result, setResult] = useState<Result | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const inFlightRef = useRef(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInquiry>({
    resolver: zodResolver(contactInquirySchema),
    mode: 'onBlur',
    defaultValues: EMPTY,
  });

  const fieldId = (name: string) => `${formId}-${name}`;

  /** Wires a control to its label, error and ARIA state. */
  const describe = (name: FieldPath<ContactInquiry>) => ({
    id: fieldId(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  const onSubmit = handleSubmit(async (values) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setResult(null);

    try {
      const outcome = await submitContactForm({
        ...values,
        howHeard: values.howHeard ?? '',
        companyFax: honeypotRef.current?.value ?? '',
        startedAt: startedAtRef.current,
      });

      if (outcome.ok) {
        reset(EMPTY);
        startedAtRef.current = Date.now();
        setResult({ status: 'success', message: contactInquiryContent.successMessage });
        return;
      }

      if (outcome.reason === 'invalid' && outcome.fieldErrors) {
        for (const [field, text] of Object.entries(outcome.fieldErrors)) {
          if (field in EMPTY) setError(field as FieldPath<ContactInquiry>, { message: text });
        }
      }
      if (outcome.reason === 'not-configured' && process.env.NODE_ENV !== 'production') {
        console.error('Contact form: NEXT_PUBLIC_CONTACT_FORM_ENDPOINT is not set.');
      }
      setResult({
        status: 'error',
        message:
          outcome.reason === 'rate-limited'
            ? contactInquiryContent.rateLimitedMessage
            : contactInquiryContent.errorMessage,
      });
    } finally {
      inFlightRef.current = false;
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={isSubmitting}
      className={cn(
        'relative grid grid-cols-1 gap-5 bs-md:grid-cols-2',
        // 992–1199px: the section is two columns there, leaving each half of
        // this grid too narrow for the longer dropdown choices.
        'bs-lg:max-bs-xl:grid-cols-1',
      )}
    >
      {/* Honeypot: off-screen and unfocusable, so only a bot ever fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 size-px overflow-hidden">
        <label htmlFor={fieldId('companyFax')}>Company fax</label>
        <input
          ref={honeypotRef}
          id={fieldId('companyFax')}
          name="companyFax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {TEXT_FIELDS.map((field) => (
        <div key={field.name} className="relative block">
          <input
            type={field.type}
            placeholder=" "
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
            {...describe(field.name)}
            {...register(field.name)}
            className={cn(CONTROL_CLASS, 'peer')}
          />
          <label htmlFor={fieldId(field.name)} className={LABEL_CLASS}>
            {field.label}
          </label>
          <FieldIcon src={field.icon} />
          <FieldError id={`${fieldId(field.name)}-error`} message={errors[field.name]?.message} />
        </div>
      ))}

      {SELECT_FIELDS.map((field) => (
        <div key={field.name}>
          <div className="relative z-[1]">
            <label htmlFor={fieldId(field.name)} className="sr-only">
              {field.label}
            </label>
            <select {...describe(field.name)} {...register(field.name)} className={SELECT_CLASS}>
              <option value="" disabled={field.required} className="bg-field">
                {field.prompt}
              </option>
              {field.options.map((option) => (
                <option key={option} value={option} className="bg-field">
                  {option}
                </option>
              ))}
            </select>
            <FieldIcon src={field.icon} />
          </div>
          <FieldError id={`${fieldId(field.name)}-error`} message={errors[field.name]?.message} />
        </div>
      ))}

      <div className="relative block col-span-full">
        <textarea
          placeholder=" "
          rows={4}
          maxLength={INQUIRY_LIMITS.message}
          {...describe('message')}
          {...register('message')}
          className={cn(CONTROL_CLASS, 'peer h-[120px] resize-y py-[14px] pl-12 pr-5')}
        />
        <label htmlFor={fieldId('message')} className={cn(LABEL_CLASS, 'top-[30px]')}>
          Message / Project Details*
        </label>
        <FieldIcon src={`${ICON_DIR}/messages-icon.svg`} className="top-[30px]" />
        <FieldError id={`${fieldId('message')}-error`} message={errors.message?.message} />
      </div>

      <div className="mt-[15px] col-span-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'group relative flex w-full items-center justify-center gap-2 overflow-clip rounded-cta',
            'bg-lime px-10 py-[15px] font-body text-base font-bold uppercase leading-[1.1] text-ink',
            'transition-colors duration-300 ease-out hover:bg-white',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
            'disabled:cursor-not-allowed disabled:opacity-70',
          )}
        >
          {isSubmitting ? 'Sending…' : contactContent.submitLabel}
          <span className="relative flex size-[30px] items-center justify-center overflow-hidden rounded-full text-ink">
            <ArrowGlyph
              variant="compact"
              className="left-2 top-[3px] transition-transform duration-300 ease-out group-hover:-translate-y-[30px] group-hover:translate-x-[30px]"
            />
            <ArrowGlyph
              variant="compact"
              className={cn(
                'left-2 top-[3px] -translate-x-[30px] translate-y-[30px]',
                'transition-transform duration-300 ease-out group-hover:delay-100',
                'group-hover:translate-x-0 group-hover:translate-y-0',
              )}
            />
          </span>
        </button>
      </div>

      {result !== null ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'col-span-full rounded-[5px] border px-4 py-3 text-[15px]',
            result.status === 'success'
              ? 'border-mint/50 bg-mint/10 text-mint'
              : 'border-danger/50 bg-danger/10 text-danger-soft',
          )}
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
