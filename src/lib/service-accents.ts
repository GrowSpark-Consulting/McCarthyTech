import type { ServiceAccent } from '@/types/service-detail';

/**
 * Accent → Tailwind class mapping for the service detail pages.
 *
 * **Why a lookup and not interpolation.** Tailwind builds its stylesheet by
 * scanning source files for class names that appear *literally*. A template
 * string like `` `text-${accent}` `` produces the right markup at runtime and no
 * CSS at all at build time, so the page renders unstyled. Every class below is
 * therefore written out in full, and the `Record<ServiceAccent, …>` type means
 * adding a fifth accent to the union fails the build until its classes are
 * supplied here — rather than shipping a page with no colour on it.
 *
 * Kept in one module because the backdrop, the heading, the eyebrow dot and the
 * highlight cards all need to agree on what "the cyan page" means. Splitting
 * them across components is how two of them end up a shade apart.
 */
export interface ServiceAccentClasses {
  /** Foreground colour for the accented half of the headline and for figures. */
  readonly text: string;
  /** Radial wash behind the hero copy. */
  readonly bloom: string;
  /** Fill for the eyebrow's leading dot. */
  readonly dot: string;
  /** Hover border for cards — a translucent tint, so the card warms rather than outlines. */
  readonly cardHover: string;
  /** Hover treatment for the outlined secondary CTA, which shifts border *and* label. */
  readonly ghostHover: string;
}

export const SERVICE_ACCENT_CLASSES: Record<ServiceAccent, ServiceAccentClasses> = {
  mint: {
    text: 'text-mint',
    bloom: 'bg-svc-bloom-mint',
    dot: 'bg-mint',
    cardHover: 'hover:border-mint/45',
    ghostHover: 'hover:border-mint hover:text-mint',
  },
  lime: {
    text: 'text-lime',
    bloom: 'bg-svc-bloom-lime',
    dot: 'bg-lime',
    cardHover: 'hover:border-lime/45',
    ghostHover: 'hover:border-lime hover:text-lime',
  },
  violet: {
    text: 'text-accent-violet',
    bloom: 'bg-svc-bloom-violet',
    dot: 'bg-accent-violet',
    cardHover: 'hover:border-accent-violet/45',
    ghostHover: 'hover:border-accent-violet hover:text-accent-violet',
  },
  cyan: {
    text: 'text-accent-cyan',
    bloom: 'bg-svc-bloom-cyan',
    dot: 'bg-accent-cyan',
    cardHover: 'hover:border-accent-cyan/45',
    ghostHover: 'hover:border-accent-cyan hover:text-accent-cyan',
  },
};
