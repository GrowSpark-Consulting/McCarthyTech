import type { ImageAsset } from '@/types/media';

/**
 * One card in the "Why businesses choose us" grid.
 *
 * `title` is authored as an array of lines rather than a string with a `<br>`,
 * so the break points stay content rather than markup and a screen reader reads
 * one continuous phrase.
 */
export interface FeatureHighlight {
  /** Stable key. */
  readonly id: string;
  /** Title lines, rendered with an explicit break between them. */
  readonly titleLines: readonly [string, string];
  /** Card glyph. */
  readonly icon: ImageAsset;
}

/**
 * Which side of the centre ornament a feature column sits on.
 *
 * Drives both the card's internal order (icon before or after the title) and
 * its text alignment, so the two columns mirror each other around the orbit.
 */
export type FeatureColumnSide = 'left' | 'right';
