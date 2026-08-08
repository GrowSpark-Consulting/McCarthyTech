import { Container } from '@/components/ui/container';

/**
 * Route-level Suspense fallback.
 *
 * Next.js renders this while a route segment streams. It deliberately mirrors
 * the hero's silhouette — same full-viewport stage, same bottom-anchored copy
 * block, same line heights — so the skeleton occupies the exact space the real
 * content will, and the swap causes no layout shift.
 *
 * Marked `aria-busy` with a polite status so assistive tech announces that
 * content is loading rather than reading out a wall of empty boxes.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="relative flex min-h-dvh items-end overflow-hidden bg-ink"
    >
      <span className="sr-only">Loading page content</span>

      <Container className="w-full pb-hero-gutter max-bs-lg:pb-hero-gutter-md max-bs-md:pb-hero-gutter-sm">
        <div className="max-w-hero-content space-y-4" aria-hidden="true">
          <div className="h-[72px] w-full animate-pulse rounded-md bg-white/[0.06] max-bs-lg:h-[50px] max-bs-md:h-9" />
          <div className="h-[72px] w-4/5 animate-pulse rounded-md bg-white/[0.06] max-bs-lg:h-[50px] max-bs-md:h-9" />
          <div className="h-[30px] w-full max-w-hero-sub animate-pulse rounded-md bg-white/[0.04]" />
          <div className="h-[30px] w-3/5 max-w-hero-sub animate-pulse rounded-md bg-white/[0.04]" />
          <div className="h-[60px] w-[260px] animate-pulse rounded-cta bg-white/[0.08]" />
        </div>
      </Container>
    </div>
  );
}
