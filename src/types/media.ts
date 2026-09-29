/**
 * Media domain types shared by the hero and any future video-backed section.
 */

/** A raster asset with its intrinsic dimensions, as required by `next/image`. */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/**
 * A looping, muted background clip paired with the poster frame that stands in
 * for it until playback is ready.
 *
 * The poster is a first-class field rather than an optional extra: it is what
 * paints during the Largest Contentful Paint window, so the hero must always
 * have one.
 */
export interface BackgroundVideoAsset {
  readonly src: string;
  /** A lighter portrait cut for phones. Without one, phones play `src`. */
  readonly mobileSrc?: string;
  readonly type: `video/${string}`;
  readonly poster: ImageAsset;
}
