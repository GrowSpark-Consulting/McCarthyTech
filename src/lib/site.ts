/**
 * Canonical site metadata and contact details.
 *
 * Anything that appears in more than one place — the document title, the
 * organisation name in JSON-LD, the phone number in the drawer — is defined
 * here once so the copy can never drift between surfaces.
 */
export const siteConfig = {
  name: 'McCarthy Tech',
  legalName: 'McCarthy Labs Pvt Ltd',
  title: 'McCarthy Tech | Premium IT Solutions',
  titleTemplate: '%s | McCarthy Tech',
  description:
    'McCarthy Tech offers premium IT solutions, AI implementation, and full-stack development. Bridging the gap between visionary ideas and functional technology.',
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
    'Singapore software company',
  ],
  contact: {
    email: 'info@mccathy.tech',
    phone: '+91 8637 609 300',
    /** E.164 form, for `tel:` links. */
    phoneHref: '+918637609300',
    address: {
      street: '1 Bukit Batok Cres, #04-48',
      postalCode: '658064',
      locality: 'Singapore',
      region: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
    },
  },
  social: {
    linkedin: '#',
    instagram: '#',
    google: '#',
  },
} as const;

/**
 * The full McCarthy Digital logo — the lime mark beside the white wordmark, on
 * a transparent canvas.
 *
 * Used wherever the logo is shown at a readable size: the header, the mobile
 * drawer, and the preloader. The wordmark is white, so it is only ever drawn on
 * the site's dark surfaces. The file is served exactly as supplied — only the
 * box it is drawn into changes per placement, always with `object-contain` so
 * the lockup keeps its proportions.
 *
 * `width`/`height` are the file's intrinsic pixels, so `next/image` can reserve
 * the right aspect ratio before it decodes.
 */
export const brandLogo = {
  src: '/assets/img/logo/mccarthy-digital-logo.png',
  alt: 'McCarthy Digital',
  width: 469,
  height: 122,
} as const;

/**
 * The lime mark on its own, without the wordmark — the same glyph as in
 * {@link brandLogo}.
 *
 * Used where the full lockup would be unreadable or invisible: the favicon, the
 * Organization structured data (search engines show it on white, where the
 * white wordmark would vanish), and the two framed ornaments (the homepage
 * AI-stream badge and the AI Implementation feature card).
 */
export const brandMark = {
  src: '/assets/img/logo/mccarthy-tech-logo.png',
  alt: 'McCarthy Digital',
  width: 846,
  height: 655,
} as const;

export type SiteConfig = typeof siteConfig;
