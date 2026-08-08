import { cn } from '@/lib/utils';

/**
 * The reference draws its diagonal arrow not as a path but as a shaft plus six
 * square "pixels" forming the head, all rotated by the same angle.
 *
 * Two sets of geometry ship in the original — a 28-unit box used inside CTA
 * buttons and a 31-unit box used inside the 50px circular badges on the service
 * panels. They are *not* the same drawing scaled: the 31-unit glyph fills a
 * larger share of its box. Both are transcribed so each renders at its intended
 * optical weight rather than one being stretched to stand in for the other.
 */
const ARROW_ROTATION_DEG = -40.2798;

/** CTA geometry — `0 0 28 28`. */
const ARROW_RECTS_28 = [
  { x: 5.06592, y: 19.9785, width: 20.5712, height: 2.61221 },
  { x: 7.97095, y: 7.24463, width: 2.61221, height: 2.61221 },
  { x: 11.6523, y: 7.54834, width: 2.61221, height: 2.61221 },
  { x: 15.334, y: 7.85205, width: 2.61221, height: 2.61221 },
  { x: 18.7119, y: 11.8374, width: 2.61221, height: 2.61221 },
  { x: 18.4084, y: 15.52, width: 2.61221, height: 2.61221 },
  { x: 18.104, y: 19.2012, width: 2.61221, height: 2.61221 },
] as const;

/** Badge geometry — `0 0 31 31`. */
const ARROW_RECTS_31 = [
  { x: 6.28979, y: 21.4111, width: 22.36, height: 2.83936 },
  { x: 9.44751, y: 7.57031, width: 2.83936, height: 2.83936 },
  { x: 13.449, y: 7.90015, width: 2.83936, height: 2.83936 },
  { x: 17.4507, y: 8.23047, width: 2.83936, height: 2.83936 },
  { x: 21.1223, y: 12.5627, width: 2.83936, height: 2.83936 },
  { x: 20.7925, y: 16.5649, width: 2.83936, height: 2.83936 },
  { x: 20.4617, y: 20.5667, width: 2.83936, height: 2.83936 },
] as const;

/** Compact geometry — `0 0 24 24`, used inside the contact form's submit button. */
const ARROW_RECTS_24 = [
  { x: 4.40552, y: 16.7634, width: 17.888, height: 2.27149 },
  { x: 6.93164, y: 5.69067, width: 2.27149, height: 2.27149 },
  { x: 10.1328, y: 5.95459, width: 2.27149, height: 2.27149 },
  { x: 13.3342, y: 6.21899, width: 2.27149, height: 2.27149 },
  { x: 16.2717, y: 9.68457, width: 2.27149, height: 2.27149 },
  { x: 16.0078, y: 12.8865, width: 2.27149, height: 2.27149 },
  { x: 15.7429, y: 16.0879, width: 2.27149, height: 2.27149 },
] as const;

const ARROW_VARIANTS = {
  cta: { rects: ARROW_RECTS_28, viewBox: 28 },
  badge: { rects: ARROW_RECTS_31, viewBox: 31 },
  compact: { rects: ARROW_RECTS_24, viewBox: 24 },
} as const;

/** Which of the reference's two arrow drawings to render. */
export type ArrowGlyphVariant = keyof typeof ARROW_VARIANTS;

export interface ArrowGlyphProps {
  /** Which geometry to use. Defaults to the CTA drawing. */
  readonly variant?: ArrowGlyphVariant;
  /** Rendered edge length in pixels. Defaults to the variant's native size. */
  readonly size?: number;
  /** Extra classes, used to drive positioning and hover translation. */
  readonly className?: string;
  /**
   * Whether to position absolutely. CTA buttons need this to animate the glyph
   * inside a clipped badge; the service badges centre it with flex instead.
   */
  readonly absolute?: boolean;
}

/**
 * The diagonal "north-east" arrow used in CTAs and service badges.
 *
 * Painted with `currentColor`, so the same component serves both the white
 * arrow on the dark CTA badge and the ink arrow on the lime service badge —
 * the parent sets the colour.
 *
 * Marked `aria-hidden` throughout: the arrow is decorative, and the surrounding
 * link's text already names the destination for assistive technology.
 *
 * @param props - See {@link ArrowGlyphProps}.
 */
export function ArrowGlyph({ variant = 'cta', size, className, absolute = true }: ArrowGlyphProps) {
  const { rects, viewBox } = ARROW_VARIANTS[variant];
  const renderedSize = size ?? viewBox;

  return (
    <svg
      width={renderedSize}
      height={renderedSize}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(absolute && 'absolute', className)}
    >
      {rects.map((rect) => (
        <rect
          key={`${rect.x}-${rect.y}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          transform={`rotate(${ARROW_ROTATION_DEG} ${rect.x} ${rect.y})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
