import type { ImageAsset } from '@/types/media';

/**
 * Section copy. The form's fields, rules and messages are shared with the
 * Contact page form — see `@/lib/contact-inquiry`.
 */
export const contactContent = {
  eyebrow: 'Our Achievements',
  headingBefore: 'Your Trusted ',
  headingAfter: ' Tech Partner',
  /** Pill-cropped animated ornament set into the heading. */
  headingOrnament: {
    src: '/assets/img/icon/b10c3e43e836d32554bf.gif',
    alt: '',
    width: 300,
    height: 300,
  } satisfies ImageAsset,
  formHeading: 'Ready to collaborate with us?',
  formSubheading: 'Who knows where a single message might lead you.',
  submitLabel: 'submit here',
  /** Decorative shapes floating over the stats card. */
  shapes: [
    {
      src: '/assets/img/shape/contact-shape01.png',
      alt: '',
      width: 134,
      height: 179,
      className:
        'left-[30%] top-[-40%] max-bs-xl:left-[26%] max-bs-lg:left-[35%] max-bs-md:left-[16%] max-bs-md:top-[-30%] bs-sm:max-bs-md:left-[29%] bs-sm:max-bs-md:top-[-40%]',
    },
    {
      src: '/assets/img/shape/contact-shape02.png',
      alt: '',
      width: 130,
      height: 144,
      className:
        '-z-10 right-[31%] top-[-40%] max-bs-xl:right-[25%] max-bs-lg:right-[34%] max-bs-md:right-[15%] max-bs-md:top-[-30%] bs-sm:max-bs-md:right-[28%] bs-sm:max-bs-md:top-[-40%]',
    },
  ],
} as const;

/** The two animated achievement counters. */
export const achievementStats = [
  { id: 'projects', value: 30, suffix: '+', label: 'Projects Successfully Delivered' },
  { id: 'satisfaction', value: 100, suffix: '%', label: 'Client Satisfaction Rate' },
] as const;
