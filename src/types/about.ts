import type { ImageAsset } from '@/types/media';

/**
 * A run of plain text inside the decorated heading.
 */
export interface HeadingTextSegment {
  readonly kind: 'text';
  readonly value: string;
}

/**
 * An animated GIF inlaid into the heading.
 *
 * Each of the three ornaments in the reference has its own box and its own
 * offset within that box, so the geometry travels with the asset rather than
 * being hard-coded at the call site.
 */
export interface HeadingOrnamentSegment {
  readonly kind: 'ornament';
  readonly asset: ImageAsset;
  /** Tailwind classes sizing the inline slot the ornament occupies. */
  readonly slotClassName: string;
  /** Tailwind classes positioning the image within that slot. */
  readonly imageClassName: string;
}

/** One piece of a heading that mixes text with inline ornaments. */
export type HeadingSegment = HeadingTextSegment | HeadingOrnamentSegment;
