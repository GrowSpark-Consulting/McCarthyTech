import { cn } from '@/lib/utils';

/**
 * The seven squares, transcribed from the reference's inline SVG.
 *
 * They form a chevron out of discrete blocks rather than a drawn stroke — six
 * climb and descend the diagonal, and the seventh sits detached at the elbow,
 * which is what stops the shape reading as a plain arrowhead. The `-0.1709°`
 * rotation on every square is in the original too; it is far too small to see
 * and far too deliberate to drop.
 */
const SQUARES = [
  { x: 11.9299, y: 12.4632, width: 3.80516, height: 3.83411 },
  { x: 0.843506, y: 0.994343, width: 3.83411, height: 3.83411 },
  { x: 4.68921, y: 4.81607, width: 3.83411, height: 3.83411 },
  { x: 8.53442, y: 8.63861, width: 3.83411, height: 3.83411 },
  { x: 8.55786, y: 16.3068, width: 3.83411, height: 3.83411 },
  { x: 4.73535, y: 20.1535, width: 3.83411, height: 3.83411 },
  { x: 0.912354, y: 23.9985, width: 3.83411, height: 3.83411 },
] as const;

/** Shared by all seven squares. */
const SQUARE_ROTATION_DEG = -0.1709;

export interface StepArrowGlyphProps {
  readonly className?: string;
}

/**
 * The stepped chevron on the service pages' call to action.
 *
 * Filled with `currentColor` rather than the reference's hard-coded `black`, so
 * the glyph follows whatever the button sets on itself. That matters here: the
 * button's ink changes on hover, and a baked fill would leave the arrow behind
 * as the label around it darkened.
 *
 * Marked `aria-hidden` and given no title — the arrow decorates a link that
 * already carries its own text, and announcing it would only add noise.
 *
 * @param props - See {@link StepArrowGlyphProps}.
 */
export function StepArrowGlyph({ className }: StepArrowGlyphProps) {
  return (
    <svg
      width="16"
      height="28"
      viewBox="0 0 16 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      {SQUARES.map((square) => (
        <rect
          key={`${square.x}-${square.y}`}
          x={square.x}
          y={square.y}
          width={square.width}
          height={square.height}
          transform={`rotate(${SQUARE_ROTATION_DEG} ${square.x} ${square.y})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
