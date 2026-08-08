import type { HeadingSegment } from '@/types/about';

/**
 * The About heading, modelled as a segment list rather than a string with markup
 * baked in.
 *
 * Each of its three animated ornaments has its own slot size and its own offset
 * inside that slot — values transcribed from
 * `.about-sec-title .title span:nth-child(n)` and its `img` rules. Keeping the
 * geometry beside the asset means the renderer stays a simple loop with no
 * positional special-casing, and a fourth ornament would need no code change.
 */
const headingSegments: readonly HeadingSegment[] = [
  { kind: 'text', value: 'Bridging the gap between ' },
  {
    kind: 'ornament',
    asset: {
      src: '/assets/img/icon/original-66948a0d81d.gif',
      alt: '',
      width: 200,
      height: 150,
    },
    // `span:nth-child(1) { width: 58px; height: 57px }`
    slotClassName: 'h-[57px] w-[58px]',
    // `img { left: -10px; top: 8px; max-width: 180% }`
    imageClassName: 'absolute -left-[10px] top-2 max-w-[180%]',
  },
  { kind: 'text', value: ' visionary ideas and' },
  {
    kind: 'ornament',
    asset: {
      src: '/assets/img/icon/0deec720000b2066289b.gif',
      alt: '',
      width: 200,
      height: 200,
    },
    // `span:nth-child(2) { width: 116px; height: 80px; margin-top: -20px }`
    slotClassName: 'mt-[-20px] h-20 w-[116px] max-bs-md:h-[62px] max-bs-md:w-[100px]',
    // `img { top: -5px; left: 5px }`
    imageClassName: 'absolute -top-[5px] left-[5px]',
  },
  { kind: 'text', value: ' functional technology for your success ' },
  {
    kind: 'ornament',
    asset: {
      src: '/assets/img/icon/b10c3e43e836d32554bf.gif',
      alt: '',
      width: 300,
      height: 300,
    },
    // `span:nth-child(3) { width: 326px; height: 50px; left: 20px; top: 6px;
    //  overflow: hidden; border-radius: 100px }` — a letterbox slot that crops
    //  the square GIF into a pill. It narrows on phones, then returns to full
    //  width on the larger handsets the reference singles out (576–767px).
    slotClassName: [
      'h-[50px] w-[326px] overflow-hidden rounded-full',
      'left-5 top-[6px]',
      'max-bs-md:left-[10px] max-bs-md:top-[15px] max-bs-md:w-[160px]',
      'bs-sm:max-bs-md:w-[326px]',
    ].join(' '),
    // `img { width: 100% }`
    imageClassName: 'w-full',
  },
];

/** About section content. */
export const aboutContent = {
  /** Anchor target for the hero's scroll cue. */
  id: 'about',
  eyebrow: 'About Us',
  headingSegments,
  body: "At Grow Spark IT Solutions Pvt. Ltd., we don't just build software; we build the digital backbone of your success. From local startups to global enterprises, our mission is to deliver premium solutions that drive growth.",
} as const;
