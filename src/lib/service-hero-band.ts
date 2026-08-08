/**
 * Assets shared by every `hero-style--three` service hero.
 *
 * Six of the eight detail pages open with the same two animated ornaments and
 * the same backdrop, varying only in copy and in the clip that plays behind
 * them. Those constants live here rather than being repeated in each service's
 * record, so a swapped ornament is one edit instead of six — and so no two
 * services can end up a few pixels or a different file apart.
 */

/**
 * The animated pill set into the middle of the headline.
 *
 * The source file is a 300×300 square, and the reference draws it at 217×84 with
 * no `object-fit`, so it is deliberately squashed and then clipped to a full
 * radius. The intrinsic dimensions are recorded here; the rendered box is the
 * component's business, since it changes per breakpoint.
 */
export const HEADLINE_ORNAMENT = {
  src: '/assets/img/icon/b10c3e43e836d32554bf.gif',
  width: 300,
  height: 300,
} as const;

/** The shape that floats to the right of the sub-heading. Hidden below 768px. */
export const FLOATING_SHAPE = {
  src: '/assets/img/icon/animated-gif02.gif',
  width: 200,
  height: 150,
} as const;

/**
 * The still behind every band's clip.
 *
 * One frame grabbed from the source video, shared by all six pages exactly as
 * the reference shares it. Served through `next/image` rather than as the
 * `<video poster>` attribute: the original is an 843 KB JPEG — larger than most
 * of the clips it fronts — and a `poster` is fetched raw, with no format
 * negotiation and no responsive candidates.
 */
export const HERO_BAND_POSTER = '/assets/img/bg/hero-bg03_1.jpg';

/** Every clip on these pages is H.264 in an MP4 container. */
export const HERO_BAND_CLIP_TYPE = 'video/mp4';

/**
 * `.ai-circle-img` — the ring that drifts behind the overview panel.
 *
 * A 1326×1338 render pulled up by 350px so only its lower arc is on screen, and
 * turned by `animation: spin 70s linear infinite`. Hidden below 768px, where
 * there is no room for it to read as anything but a smudge.
 */
export const OVERVIEW_ORBIT = {
  src: '/assets/img/about/app-rotate.png',
  width: 1326,
  height: 1338,
} as const;

/** `.down-arrow` chevron — an 18×10 stroke, inlined rather than fetched. */
export const OVERVIEW_SCROLL_CUE = {
  label: 'Scroll Down',
  /** Id of the band the cue jumps to. Owned by the offerings section. */
  targetId: 'service',
} as const;

/**
 * The overlapping platform logos, at their intrinsic 98×98.
 *
 * Vendor wordmarks are reproduced as shipped in the extracted assets. They
 * identify the platforms a team builds on — nominative use — and are never
 * presented as endorsements or as this project's own marks.
 */
/**
 * The seven clients in the brand band's switcher.
 *
 * Identical on every service page in the reference — same names, same order,
 * same logos — so it lives here rather than being retyped per service. The
 * copy quirks are the original's: lowercase "Tvs", and "Multysense associates"
 * with only the first word capitalised.
 */
export const SHARED_CLIENT_BRANDS = [
  { id: 'multysense', name: 'Multysense associates', logo: '/assets/img/logo/logo-2-light.png' },
  { id: 'tvs', name: 'Tvs', logo: '/assets/img/brand/client6.png' },
  { id: 'hero', name: 'Hero', logo: '/assets/img/brand/client22white.png' },
  { id: 'mahindra', name: 'Mahindra', logo: '/assets/img/brand/MAHINDRA.png' },
  { id: 'lativio', name: 'Lativio', logo: '/assets/img/brand/brand05.png' },
  { id: 'panda', name: 'Panda', logo: '/assets/img/brand/panda logo.png' },
  { id: 'orange-it', name: 'Orange IT', logo: '/assets/img/brand/brand07.png' },
] as const;

/**
 * The cluster the web pages use, at their intrinsic widths.
 *
 * Unlike the app page's three square platform marks, these are three different
 * heights sharing one width — the overlap is horizontal only, so the differing
 * heights are the design rather than a mismatch to correct.
 */
export const WEB_AUDIENCE_LOGOS = [
  { id: 'one', src: '/assets/img/hero/text-img01.png', alt: '', width: 204, height: 63 },
  { id: 'two', src: '/assets/img/hero/text-img02.png', alt: '', width: 204, height: 29 },
  { id: 'three', src: '/assets/img/hero/text-img03.png', alt: '', width: 204, height: 77 },
] as const;

export const APP_PLATFORM_LOGOS = [
  { id: 'java', src: '/assets/img/service/app-dev/java.png', alt: 'Java', width: 98, height: 98 },
  {
    id: 'kotlin',
    src: '/assets/img/service/app-dev/kotlin.png',
    alt: 'Kotlin',
    width: 98,
    height: 98,
  },
  {
    id: 'flutter',
    src: '/assets/img/service/app-dev/flutter.png',
    alt: 'Flutter',
    width: 98,
    height: 98,
  },
] as const;
