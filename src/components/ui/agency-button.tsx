import { AppLink } from '@/components/ui/app-link';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { cn } from '@/lib/utils';

/**
 * The site's primary call-to-action: a split lime capsule whose two halves
 * separate on hover while the arrow glyph flies out to the north-east and an
 * identical one flies in behind it from the south-west.
 *
 * Both halves are `<span>` elements inside a single `<AppLink>` rather than
 * separate controls, so the whole capsule is one tab stop and one hit target.
 *
 * `.thm-btn` base: an inline flex row, clipped so the arrow's travel is masked
 * by the capsule edge instead of spilling over neighbouring content.
 */
const BASE_CLASS = cn(
  'group relative z-[1] inline-flex items-center justify-center self-center',
  'overflow-clip rounded-cta bg-transparent font-body text-base font-bold uppercase leading-[1.1] tracking-normal',
  'text-ink transition-all duration-300 ease-out',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
);

/**
 * Per-size geometry, transcribed from `.agency-btn` and `.megamenu-btn`.
 *
 * The two sizes differ only in padding and glyph metrics — never in typography
 * or colour — so the difference is expressed as a lookup rather than as a
 * variant system that would generate identical class strings for both.
 */
const SIZE_TOKENS = {
  default: {
    /** `.agency-btn .text { padding: 21.2px 20px }` */
    label: 'px-5 py-[21.2px]',
    /** `.thm-btn .arrow-icon { height: 46px; width: 46px }` */
    icon: 'size-[46px]',
    /** `.thm-btn .arrow-icon svg { left: 9px; top: 10px }` */
    glyph: 'left-[9px] top-[10px]',
    glyphSize: 28,
  },
  compact: {
    /** `.megamenu-btn .text { padding: 16.2px 20px }` */
    label: 'px-5 py-[16.2px]',
    /** `.megamenu-btn .arrow-icon { height: 36px; width: 36px }` */
    icon: 'size-9',
    /** `.megamenu-btn .arrow-icon svg { top: 6px; left: 5px }` */
    glyph: 'left-[5px] top-[6px]',
    glyphSize: 25,
  },
} as const;

/** Available CTA scales. */
export type AgencyButtonSize = keyof typeof SIZE_TOKENS;

export interface AgencyButtonProps {
  /** Rendered scale. Defaults to the hero's full size. */
  readonly size?: AgencyButtonSize;
  /** Destination route. */
  readonly href: string;
  /** Visible label. Uppercased by CSS, so author it in natural casing. */
  readonly label: string;
  /** Extra classes for the outer element. */
  readonly className?: string;
  /** Overrides the accessible name when the visible label is not descriptive. */
  readonly ariaLabel?: string;
  /**
   * Visually hidden text appended to the label, e.g. " about Healthcare
   * Solutions".
   *
   * Preferred over `ariaLabel` when several buttons share generic copy like
   * "read more". An `aria-label` fixes the accessible name but leaves the
   * element's `innerText` generic — and Lighthouse's SEO `link-text` audit reads
   * `innerText`, so it still reports four identical links. Appending hidden text
   * makes both the accessible name *and* the text content unique, without
   * changing what is on screen.
   */
  readonly srSuffix?: string;
  /** Fired on activation — used by overlays to dismiss themselves on navigate. */
  readonly onClick?: () => void;
}

/**
 * Primary split-capsule CTA.
 *
 * The hover choreography is pure CSS driven off a single `group` class, so it
 * runs on the compositor with no JavaScript and no re-render:
 *
 * - Both halves round to a full `30px` radius, visually splitting the capsule.
 * - The leading arrow translates `(30px, -30px)` and clips away.
 * - The trailing arrow travels from `(-30px, 30px)` to rest, `100ms` behind, so
 *   the two never occupy the same spot mid-flight.
 *
 * @param props - See {@link AgencyButtonProps}.
 */
export function AgencyButton({
  href,
  label,
  size = 'default',
  className,
  ariaLabel,
  srSuffix,
  onClick,
}: AgencyButtonProps) {
  const tokens = SIZE_TOKENS[size];

  return (
    <AppLink
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(BASE_CLASS, className)}
    >
      <span
        className={cn(
          'rounded-l-cta rounded-r-none bg-lime transition-all duration-300 ease-out',
          'group-hover:rounded-cta',
          tokens.label,
        )}
      >
        {label}
        {srSuffix === undefined ? null : <span className="sr-only">{srSuffix}</span>}
      </span>

      <span
        className={cn(
          'flex items-center justify-center rounded-l-none rounded-r-cta bg-lime p-[7px]',
          'transition-all duration-300 ease-out group-hover:rounded-cta',
        )}
      >
        <span
          className={cn(
            'relative overflow-hidden rounded-full bg-ink text-white transition-all duration-300 ease-out',
            tokens.icon,
          )}
        >
          {/* Leading glyph: at rest, flies out on hover. */}
          <ArrowGlyph
            size={tokens.glyphSize}
            className={cn(
              tokens.glyph,
              'transition-transform duration-300 ease-out',
              'group-hover:-translate-y-[30px] group-hover:translate-x-[30px]',
            )}
          />
          {/* Trailing glyph: parked off-canvas, arrives 100ms later. */}
          <ArrowGlyph
            size={tokens.glyphSize}
            className={cn(
              tokens.glyph,
              '-translate-x-[30px] translate-y-[30px]',
              'transition-transform duration-300 ease-out group-hover:delay-100',
              'group-hover:translate-x-0 group-hover:translate-y-0',
            )}
          />
        </span>
      </span>
    </AppLink>
  );
}
