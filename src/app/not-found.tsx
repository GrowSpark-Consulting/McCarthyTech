import type { Metadata } from 'next';

import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/**
 * 404 boundary.
 *
 * Not a content page — it is the error state Next renders for any unresolved
 * route. It exists because the header already links to routes that ship in later
 * phases (`/services`, `/about`, `/team`, …); without it those links land on
 * Next's unstyled default, which reads as a broken build rather than a
 * deliberate work-in-progress.
 *
 * Marked `noindex` so the placeholder never enters search results.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink py-24">
      <Container className="text-center">
        <p className="mb-4 font-body text-sm uppercase tracking-cue text-lime">Error 404</p>
        <h1 className="mx-auto max-w-hero-content font-heading text-hero-md tracking-display text-white max-bs-md:text-hero-xs">
          This page hasn&rsquo;t landed yet
        </h1>
        <p className="mx-auto mb-8 mt-4 max-w-hero-sub text-hero-sub text-subtle max-bs-md:text-hero-sub-sm">
          The address you followed doesn&rsquo;t resolve to anything on this site. Head back to the
          homepage and pick up from there.
        </p>
        <div className="flex justify-center">
          <AgencyButton href="/" label="Back to home" />
        </div>
      </Container>
    </div>
  );
}
