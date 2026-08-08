import { cn } from '@/lib/utils';

/**
 * The shaft and the six blocks that form the arrowhead.
 *
 * Unlike the stepped chevron on the CTA, this arrow has a solid diagonal bar —
 * the first entry, at eight times the width of the rest — with the head built
 * from six discrete squares climbing away from it. Every piece carries the same
 * `-40.2798°` rotation, which is what sets the arrow on its diagonal; the
 * rectangles themselves are axis-aligned before it is applied.
 */
const PARTS = [
  { x: 6.12842, y: 21.8882, width: 22.7911, height: 2.8941 },
  { x: 9.34692, y: 7.78027, width: 2.8941, height: 2.8941 },
  { x: 13.4258, y: 8.11658, width: 2.8941, height: 2.8941 },
  { x: 17.5046, y: 8.45337, width: 2.8941, height: 2.8941 },
  { x: 21.2471, y: 12.8689, width: 2.8941, height: 2.8941 },
  { x: 20.9109, y: 16.9485, width: 2.8941, height: 2.8941 },
  { x: 20.5735, y: 21.0273, width: 2.8941, height: 2.8941 },
] as const;

/** Shared by every piece. */
const ROTATION_DEG = -40.2798;

export interface DiagonalArrowGlyphProps {
  readonly className?: string;
}

/**
 * The lime diagonal arrow on each offering card.
 *
 * Filled with `currentColor` rather than the reference's hard-coded `#C4F012`,
 * because the fill inverts on hover — the ring behind it goes lime and the arrow
 * has to go dark to stay visible. A baked fill would leave the arrow to vanish
 * into its own background. The transition lives here too, matching the
 * original's `transition: 0.3s` on the rectangles themselves.
 *
 * @param props - See {@link DiagonalArrowGlyphProps}.
 */
export function DiagonalArrowGlyph({ className }: DiagonalArrowGlyphProps) {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0 transition-colors duration-300', className)}
    >
      {PARTS.map((part) => (
        <rect
          key={`${part.x}-${part.y}`}
          x={part.x}
          y={part.y}
          width={part.width}
          height={part.height}
          transform={`rotate(${ROTATION_DEG} ${part.x} ${part.y})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
