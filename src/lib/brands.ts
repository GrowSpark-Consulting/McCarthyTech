import type { ImageAsset } from '@/types/media';

/**
 * Client logo marquee content.
 *
 * The heading is split around its highlighted fragment so the accent colour is
 * applied to a `<span>` in the markup rather than being baked into the string.
 */
export const brandsContent = {
  headingBefore: "World's Best ",
  headingHighlight: '30+ Companies',
  headingAfter: ' Work With Us',
  /** Announced in place of the decorative logo strip. */
  accessibleLabel: 'Logos of companies McCarthy Tech works with',
} as const;

/**
 * The logos, in track order.
 *
 * Intrinsic dimensions are recorded so `next/image` can reserve each slot and
 * the strip never reflows as logos decode.
 */
export const brandLogos: readonly ImageAsset[] = [
  { src: '/assets/img/logo/logo-2-light.png', alt: 'McCarthy Tech', width: 150, height: 42 },
  { src: '/assets/img/brand/client6.png', alt: 'Tysense', width: 110, height: 40 },
  { src: '/assets/img/brand/client22white.png', alt: 'TVS', width: 110, height: 40 },
  { src: '/assets/img/brand/MAHINDRA.png', alt: 'Mahindra', width: 110, height: 40 },
  { src: '/assets/img/brand/panda-logo.png', alt: 'Panda', width: 110, height: 110 },
  { src: '/assets/img/brand/logo06.png', alt: 'Cambridge', width: 148, height: 32 },
];
