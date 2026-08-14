/**
 * Canonical site metadata and contact details.
 *
 * Anything that appears in more than one place — the document title, the
 * organisation name in JSON-LD, the phone number in the drawer — is defined
 * here once so the copy can never drift between surfaces.
 */
export const siteConfig = {
  name: 'McCarthy Tech',
  legalName: 'McCarthy Tech IT Solutions Pvt. Ltd.',
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
 * Brand mark used in the header, the mobile drawer, and the preloader.
 *
 * The image itself is a typeset "McCarthy Tech" wordmark beside the site's lime
 * icon — the icon is the original scraped mark reused as-is (it is an abstract
 * geometric device, not text, so it needed no change), and the wordmark was
 * redrawn to replace the previous "altibix" text baked into the source PNG's
 * pixels. Renaming that file in code, on its own, would not have touched what
 * visitors actually see: the old text was part of the image, not page text, so
 * no string replacement could reach it.
 *
 * `width`/`height` are the new file's true intrinsic pixels. Both header and
 * drawer placements cap the rendered size with `max-width`/`max-height` rather
 * than fixed dimensions, so the wider canvas (1075 vs. the original 894) does
 * not change layout — it only changes what fraction of that cap the mark fills.
 */
export const brandLogo = {
  src: '/assets/img/logo/grow-spark-logo.png',
  alt: 'McCarthy Tech',
  width: 1075,
  height: 232,
} as const;

export type SiteConfig = typeof siteConfig;
