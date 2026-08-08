import { serviceDetailPaths } from '@/lib/service-slugs';
import { serviceSubDetails } from '@/lib/service-sub-details';

/**
 * Routes that actually resolve.
 *
 * The navigation, footer, and section CTAs all link to pages that ship in later
 * phases. Next's `<Link>` prefetches every link that enters the viewport, so
 * each of those produced a 404 in the network log — thirteen of them on the
 * homepage, which Lighthouse reports as console errors and which waste a
 * round-trip per link.
 *
 * `AppLink` consults this list and disables prefetch for anything not on it.
 * When a route ships, add it here and prefetching turns back on automatically —
 * there is no per-link flag to remember to remove.
 *
 * Keep in sync with `src/app/sitemap.ts`, which lists the same set.
 */
export const SHIPPED_ROUTES: readonly string[] = [
  '/',
  '/services',
  // Derived rather than retyped: the detail pages are defined once in
  // `lib/service-details.ts`, and a service added there turns on prefetching
  // here and appears in the sitemap without a second edit.
  ...serviceDetailPaths,
  // App Development's four offering cards are the only ones on the site that
  // link to a page of their own rather than back to their parent service.
  ...serviceSubDetails.map((sub) => `/services/${sub.parentSlug}/${sub.slug}`),
];

/**
 * Whether a route currently resolves to a real page.
 *
 * @param href - An application-relative path.
 */
export function isShippedRoute(href: string): boolean {
  return SHIPPED_ROUTES.includes(href);
}
