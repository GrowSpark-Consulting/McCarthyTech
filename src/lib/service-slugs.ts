/**
 * The URL segments of the eight service detail pages.
 *
 * **Why this is separate from `lib/service-details.ts`.** The prefetch
 * allow-list in `lib/routes.ts` needs to know which service routes exist, and
 * `routes.ts` is reached from `AppLink` — a component every client bundle pulls
 * in. Importing the full detail module there would drag all eight services'
 * headlines, leads and figures into the browser payload purely to answer "does
 * this path resolve?". Eight strings answer that question instead.
 *
 * Declared `as const` so {@link ServiceSlug} is a union of the literals rather
 * than `string`. `serviceDetails` is then keyed by that union, which makes a
 * missing or misspelled service a compile error instead of a 404 discovered in
 * production.
 */
export const SERVICE_DETAIL_SLUGS = [
  'app-development',
  'web-development',
  'ui-ux-design',
  'branding',
  'digital-marketing',
  'ai-implementation',
  'ai-chatbot',
  'ai-marketing',
] as const;

/** Union of the eight valid slugs. */
export type ServiceSlug = (typeof SERVICE_DETAIL_SLUGS)[number];

/** Application-relative path for every shipped detail page, in navigation order. */
export const serviceDetailPaths: readonly string[] = SERVICE_DETAIL_SLUGS.map(
  (slug) => `/services/${slug}`,
);

/**
 * Narrows an arbitrary URL segment to a known service.
 *
 * @param slug - The `[slug]` segment, already decoded by Next.
 */
export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_DETAIL_SLUGS as readonly string[]).includes(slug);
}
