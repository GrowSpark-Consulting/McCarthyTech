import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/types/navigation';

export interface BreadcrumbTrailProps {
  /** The full trail, root first. The last entry is rendered as the current page. */
  readonly items: readonly NavLink[];
  /** Extra classes for the `<nav>`. */
  readonly className?: string;
}

/**
 * The Home / Services / … trail shown above a page heading.
 *
 * Rendered as an ordered list inside a labelled `<nav>`, which is what lets a
 * screen reader announce it as a navigation landmark and read the position in
 * the hierarchy. The final crumb is a `<span>` rather than a link — a link to
 * the page you are already on is a dead control — and carries
 * `aria-current="page"` so its role is still announced.
 *
 * The `/` separators are `aria-hidden`: they are punctuation between list
 * items, and reading them aloud turns "Home, Services" into "Home slash
 * Services".
 *
 * Visual-only sibling to {@link buildBreadcrumbJsonLd}, which publishes the same
 * trail as structured data. Both are driven from the same array at each call
 * site, so what a visitor sees and what a crawler is told cannot diverge.
 *
 * @param props - See {@link BreadcrumbTrailProps}.
 */
export function BreadcrumbTrail({ items, className }: BreadcrumbTrailProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-svc-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {isCurrent ? (
                <span aria-current="page" className="text-white">
                  {item.label}
                </span>
              ) : (
                <>
                  <AppLink
                    href={item.href}
                    className={cn(
                      'rounded-sm transition-colors duration-300 ease-out hover:text-mint',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
                    )}
                  >
                    {item.label}
                  </AppLink>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
