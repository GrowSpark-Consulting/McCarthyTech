import Link from 'next/link';
import type { ComponentProps } from 'react';

import { isShippedRoute } from '@/lib/routes';

export type AppLinkProps = ComponentProps<typeof Link>;

/**
 * `next/link` that only prefetches routes which exist.
 *
 * Next prefetches every link as it enters the viewport. Until the inner pages
 * ship, that means a burst of 404s on first paint — thirteen on the homepage —
 * each costing a round-trip and each logged as a console error.
 *
 * This defers to {@link isShippedRoute}, so the behaviour is driven by one list
 * rather than a `prefetch={false}` scattered across every call site that someone
 * would later have to hunt down and remove.
 *
 * An explicit `prefetch` prop always wins, for the rare case where a caller
 * knows better.
 */
export function AppLink({ href, prefetch, ...rest }: AppLinkProps) {
  const resolvedPrefetch =
    prefetch ?? (typeof href === 'string' ? (isShippedRoute(href) ? undefined : false) : undefined);

  return <Link href={href} prefetch={resolvedPrefetch} {...rest} />;
}
