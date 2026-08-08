import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';

export interface ServiceSectionHeadingProps {
  /** Small accent label above the heading. */
  readonly eyebrow: string;
  /** The heading text. */
  readonly heading: string;
  /** DOM id, referenced by the section's `aria-labelledby`. */
  readonly headingId: string;
  /** Accent theme for the eyebrow. */
  readonly accent: ServiceAccent;
  /** Centres the block. Defaults to left-aligned. */
  readonly centered?: boolean;
  /** Extra classes for the wrapper. */
  readonly className?: string;
}

/**
 * The eyebrow-plus-heading block that opens every band on a detail page.
 *
 * Extracted because six sections need it and each would otherwise carry its own
 * copy of the same four classes — which is how one of them ends up two pixels
 * off after a tweak. The heading level is fixed at `h2`: these are the page's
 * top-level sections beneath a single `h1`, and a page whose heading levels skip
 * around is one screen-reader users cannot navigate by structure.
 *
 * @param props - See {@link ServiceSectionHeadingProps}.
 */
export function ServiceSectionHeading({
  eyebrow,
  heading,
  headingId,
  accent,
  centered = false,
  className,
}: ServiceSectionHeadingProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <div className={cn(centered && 'text-center', className)}>
      <p
        className={cn(
          'm-0 inline-flex items-center gap-[9px]',
          'text-xs font-semibold uppercase tracking-[3px]',
          accentClasses.text,
        )}
      >
        <span aria-hidden="true" className={cn('size-[7px] rounded-full', accentClasses.dot)} />
        {eyebrow}
      </p>

      <h2
        id={headingId}
        className={cn(
          'mt-[18px] font-heading leading-[1.12] tracking-[-0.02em] text-white',
          'text-[clamp(28px,3.6vw,48px)]',
          centered && 'mx-auto max-w-[820px]',
        )}
      >
        {heading}
      </h2>
    </div>
  );
}
