import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * The two eyebrow treatments the reference uses, transcribed from
 * `.sec-title .sub-title` and `.sec-title-three .sub-title`.
 *
 * They are near neighbours and differ in every detail that matters: a round dot
 * against a square one, sentence case against upper, regular weight against
 * semibold, and 16px of lead-in against 21px. Expressed as variants rather than
 * two components, because a second component would be this file with four values
 * changed — and the two would drift the first time the dot size moved.
 *
 * The marker is drawn with `before:` in both, so it carries no text content and
 * a screen reader announces only the label.
 */
const eyebrowStyles = cva(
  cn(
    'relative inline-block pr-0 font-body text-base text-white',
    "before:absolute before:left-0 before:top-1/2 before:block before:-translate-y-1/2 before:content-['']",
  ),
  {
    variants: {
      tone: {
        /** `.sec-title .sub-title` — 8px round dot, sentence case. */
        dot: 'pl-4 font-normal capitalize tracking-body before:size-2 before:rounded-full before:bg-lime',
        /** `.sec-title-three .sub-title` — 12px lime square, uppercase. */
        square: 'pl-[21px] font-semibold uppercase tracking-body before:size-3 before:bg-lime',
      },
    },
    defaultVariants: { tone: 'dot' },
  },
);

export interface SectionEyebrowProps extends VariantProps<typeof eyebrowStyles> {
  /** Label text, e.g. "About Us" or "What do we do". */
  readonly children: React.ReactNode;
  /**
   * Element to render as. Defaults to `span`.
   *
   * Some bands give their `.sec-title-three` an eyebrow and no heading at all.
   * Left as a `span` those sections have no accessible name and contribute
   * nothing to the document outline, so the eyebrow is promoted to the heading
   * it is already acting as. The rendered result is identical.
   */
  readonly as?: 'span' | 'h2' | 'h3';
  /** DOM id, so a section can label itself with this element. */
  readonly id?: string;
  readonly className?: string;
}

/**
 * The small label that introduces a section, preceded by its marker.
 *
 * @param props - See {@link SectionEyebrowProps}.
 */
export function SectionEyebrow({
  children,
  tone,
  as: Component = 'span',
  id,
  className,
}: SectionEyebrowProps) {
  return (
    <Component id={id} className={cn(eyebrowStyles({ tone }), className)}>
      {children}
    </Component>
  );
}
