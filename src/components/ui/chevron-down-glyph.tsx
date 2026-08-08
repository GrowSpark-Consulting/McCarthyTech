import { cn } from '@/lib/utils';

export interface ChevronDownGlyphProps {
  readonly className?: string;
}

/**
 * The 18×10 stroked chevron the reference serves as `icon/down-white-icon.svg`.
 *
 * Inlined rather than loaded through `next/image`. The file is 144 bytes — less
 * than the request that would fetch it — and inlining lets the stroke inherit
 * `currentColor`, so the glyph follows the label it sits beside instead of being
 * pinned to white by the asset.
 *
 * @param props - See {@link ChevronDownGlyphProps}.
 */
export function ChevronDownGlyph({ className }: ChevronDownGlyphProps) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <path d="M17 1L9 9L1 1" stroke="currentColor" />
    </svg>
  );
}
