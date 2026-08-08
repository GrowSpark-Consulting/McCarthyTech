/**
 * Canonical site metadata and contact details.
 *
 * Anything that appears in more than one place — the document title, the
 * organisation name in JSON-LD, the phone number in the drawer — is defined
 * here once so the copy can never drift between surfaces.
 */
export const siteConfig = {
  name: 'Grow Spark',
  legalName: 'Grow Spark IT Solutions Pvt. Ltd.',
  title: 'Grow Spark | Premium IT Solutions',
  titleTemplate: '%s | Grow Spark',
  description:
    'Grow Spark offers premium IT solutions, AI implementation, and full-stack development. Bridging the gap between visionary ideas and functional technology.',
  /**
   * Absolute origin used for canonical URLs, Open Graph tags, and the sitemap.
   * Override per-environment with `NEXT_PUBLIC_SITE_URL`.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://altibixcodelab.com',
  locale: 'en_US',
  language: 'en',
  keywords: [
    'IT solutions',
    'software development company',
    'AI implementation',
    'web development',
    'app development',
    'UI/UX design',
    'digital marketing',
    'Kerala software company',
  ],
  contact: {
    email: 'altibix360@gmail.com',
    phone: '+91 7306 339 274',
    /** E.164 form, for `tel:` links. */
    phoneHref: '+917306339274',
    address: {
      locality: 'Nilamel',
      region: 'Kerala',
      country: 'India',
      countryCode: 'IN',
    },
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/altibix-codelab-pvt-ltd',
    instagram: 'https://www.instagram.com/altibix/',
    google: 'https://share.google/zZw0x8Q0XfgnaXSFq',
  },
} as const;

/** Brand mark used in the header and the mobile drawer. */
export const brandLogo = {
  src: '/assets/img/logo/altibix-logos/altibix-logo.png',
  alt: 'Grow Spark',
  width: 894,
  height: 232,
} as const;

export type SiteConfig = typeof siteConfig;
