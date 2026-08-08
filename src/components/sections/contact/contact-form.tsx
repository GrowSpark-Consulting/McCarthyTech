'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { submitEnquiry, type EnquiryResult } from '@/app/actions/submit-enquiry';
import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import {
  ACCEPTED_ATTACHMENT_TYPES,
  CONTACT_SERVICES,
  MAX_ATTACHMENT_BYTES,
  contactContent,
  contactEnquirySchema,
  type ContactEnquiry,
} from '@/lib/contact';
import { cn } from '@/lib/utils';

/** Shared shell styling for every control — `.xb-input-field input`. */
const CONTROL_CLASS = cn(
  'h-[60px] w-full rounded-[5px] border border-white/35 bg-field',
  'py-[10px] pl-12 pr-5 text-[15px] font-normal tracking-[-0.02em] text-white',
  'outline-none transition-all duration-300 ease-out',
  'focus:border-lime',
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

/** Leading glyph — `.xb-input-field img`. The source art is black, so it is
 *  inverted to white with a brightness filter, as in the reference. */
const ICON_CLASS = 'pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 brightness-[100]';

/** Field-level error text. */
function FieldError({ id, message }: { readonly id: string; readonly message?: string }) {
  if (message === undefined) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] text-danger-soft">
      {message}
    </p>
  );
}

/**
 * The enquiry form.
 *
 * Validation is declared once in `contactEnquirySchema` and enforced twice: React
 * Hook Form runs it in the browser for immediate feedback, and the Server Action
 * re-parses it before doing anything with the data. The browser pass is a
 * convenience, never a security boundary.
 *
 * Native `required` and `placeholder=" "` are kept on each control so the
 * floating-label animation is driven by CSS state rather than by re-rendering on
 * every keystroke.
 *
 * **Attachments.** The file input accepts and validates a document, but only its
 * *name* is transmitted — there is no storage bucket configured, and silently
 * dropping a file the visitor believes they attached would be worse than saying
 * so. Wire up storage and the payload can carry the file itself.
 */
export function ContactForm() {
  const formId = useId();
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactEnquiry>({
    resolver: zodResolver(contactEnquirySchema),
    mode: 'onBlur',
  });

  const fieldId = (name: string) => `${formId}-${name}`;

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setAttachmentError(null);

    if (file === undefined) {
      setAttachmentName(null);
      setValue('attachmentName', undefined);
      return;
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      setAttachmentError('That file is over 5 MB.');
      event.target.value = '';
      return;
    }

    if (
      !ACCEPTED_ATTACHMENT_TYPES.includes(file.type as (typeof ACCEPTED_ATTACHMENT_TYPES)[number])
    ) {
      setAttachmentError('Use a PDF, Word document, PNG, or JPEG.');
      event.target.value = '';
      return;
    }

    setAttachmentName(file.name);
    setValue('attachmentName', file.name);
  };

  const onSubmit = handleSubmit(async (values) => {
    const outcome = await submitEnquiry(values);
    setResult(outcome);

    if (outcome.status === 'success') {
      reset();
      setAttachmentName(null);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 bs-md:grid-cols-2">
      <div className="relative block">
        <input
          id={fieldId('name')}
          type="text"
          placeholder=" "
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
          {...register('name')}
          className={cn(CONTROL_CLASS, 'peer')}
        />
        <label htmlFor={fieldId('name')} className={LABEL_CLASS}>
          Your Name*
        </label>
        <Image
          src="/assets/img/icon/user-balck-icon.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className={ICON_CLASS}
        />
        <FieldError id={`${fieldId('name')}-error`} message={errors.name?.message} />
      </div>

      <div className="relative block">
        <input
          id={fieldId('email')}
          type="email"
          placeholder=" "
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${fieldId('email')}-error` : undefined}
          {...register('email')}
          className={cn(CONTROL_CLASS, 'peer')}
        />
        <label htmlFor={fieldId('email')} className={LABEL_CLASS}>
          Email Address*
        </label>
        <Image
          src="/assets/img/icon/sms-balck-icon.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className={ICON_CLASS}
        />
        <FieldError id={`${fieldId('email')}-error`} message={errors.email?.message} />
      </div>

      <div className="relative block">
        <input
          id={fieldId('phone')}
          type="tel"
          placeholder=" "
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? `${fieldId('phone')}-error` : undefined}
          {...register('phone')}
          className={cn(CONTROL_CLASS, 'peer')}
        />
        <label htmlFor={fieldId('phone')} className={LABEL_CLASS}>
          Contact No*
        </label>
        <Image
          src="/assets/img/icon/call-icon02.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className={ICON_CLASS}
        />
        <FieldError id={`${fieldId('phone')}-error`} message={errors.phone?.message} />
      </div>

      <div>
        <div
          className={cn(
            'relative h-[60px] rounded-[5px] border border-white/35 bg-field',
            'transition-all duration-300 ease-out focus-within:border-lime',
          )}
        >
          {/* The visible "Attach file..." chip is `aria-hidden` decoration, so
                the input needs its own name. */}
          <label htmlFor={fieldId('attachment')} className="sr-only">
            Attach a file
          </label>
          <input
            id={fieldId('attachment')}
            type="file"
            accept={ACCEPTED_ATTACHMENT_TYPES.join(',')}
            onChange={handleAttachmentChange}
            aria-invalid={attachmentError !== null ? true : undefined}
            // Points at the rejection message too, so a screen-reader user
            // hears *why* their file was refused rather than just the hint.
            aria-describedby={cn(
              `${fieldId('attachment')}-hint`,
              attachmentError !== null && `${fieldId('attachment')}-error`,
            )}
            className="absolute inset-0 z-[1] size-full cursor-pointer opacity-0"
          />
          <Image
            src="/assets/img/icon/upload-icon.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className={ICON_CLASS}
          />
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-12 top-[19px] h-[22px] max-w-[calc(100%-70px)] truncate rounded-[20px]',
              'border border-field-chip px-[10px] text-[15px] font-normal leading-5 text-white/70',
              'transition-colors duration-300 ease-out',
              attachmentName !== null && 'border-lime text-white',
            )}
          >
            {attachmentName ?? 'Attach file...'}
          </span>
        </div>
        <p id={`${fieldId('attachment')}-hint`} className="sr-only">
          Optional. PDF, Word, PNG, or JPEG, up to 5 megabytes.
        </p>
        <FieldError id={`${fieldId('attachment')}-error`} message={attachmentError ?? undefined} />
      </div>

      <div className="bs-md:col-span-2">
        <div className="relative z-[1]">
          {/* A disabled first `<option>` is a prompt, not an accessible name —
                axe reports `select-name` without a real label. */}
          <label htmlFor={fieldId('service')} className="sr-only">
            Select service
          </label>
          <select
            id={fieldId('service')}
            defaultValue=""
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? `${fieldId('service')}-error` : undefined}
            {...register('service')}
            className={cn(
              CONTROL_CLASS,
              'cursor-pointer appearance-none py-[10px] pl-12 pr-12',
              'leading-[38px] text-white',
            )}
          >
            <option value="" disabled className="bg-field">
              Select Service*
            </option>
            {CONTACT_SERVICES.map((service) => (
              <option key={service} value={service} className="bg-field">
                {service}
              </option>
            ))}
          </select>
          <Image
            src="/assets/img/icon/list-icon.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className={ICON_CLASS}
          />
        </div>
        <FieldError id={`${fieldId('service')}-error`} message={errors.service?.message} />
      </div>

      <div className="relative block bs-md:col-span-2">
        <textarea
          id={fieldId('message')}
          placeholder=" "
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${fieldId('message')}-error` : undefined}
          {...register('message')}
          className={cn(CONTROL_CLASS, 'peer h-[120px] resize-y py-[14px] pl-12 pr-5')}
        />
        <label htmlFor={fieldId('message')} className={cn(LABEL_CLASS, 'top-[30px]')}>
          Your Message..
        </label>
        <Image
          src="/assets/img/icon/messages-icon.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className={cn(ICON_CLASS, 'top-[30px]')}
        />
        <FieldError id={`${fieldId('message')}-error`} message={errors.message?.message} />
      </div>

      <div className="mt-[15px] bs-md:col-span-2">
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
            'rounded-[5px] border px-4 py-3 text-[15px] bs-md:col-span-2',
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
