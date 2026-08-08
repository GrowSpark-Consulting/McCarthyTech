import type { Metadata, Viewport } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { MouseCursor } from '@/components/shared/mouse-cursor';
import { SitePreloader } from '@/components/shared/site-preloader';
import { SmoothScrollProvider } from '@/components/shared/smooth-scroll-provider';
import { dmSans, sportingGrotesque } from '@/app/fonts';
import { buildOrganizationJsonLd, buildWebSiteJsonLd, rootMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = rootMetadata;

/**
 * Viewport and theme colour.
 *
 * `maximumScale` and `userScalable` are deliberately left at their permissive
 * defaults — blocking pinch-zoom is a WCAG 1.4.4 failure and Lighthouse flags it
 * under Accessibility.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00020f',
  colorScheme: 'dark',
};

/**
 * Root layout.
 *
 * Establishes, in order:
 *
 * - The two font CSS variables the Tailwind theme reads.
 * - Organisation and WebSite structured data.
 * - A skip link, so keyboard users can jump past the navigation.
 * - Lenis smooth scrolling for the whole tree.
 * - The header, which is shared by every route.
 *
 * The header lives here rather than in the page so it survives client-side route
 * transitions without remounting — which would otherwise replay its entrance and
 * drop any open menu state on every navigation.
 */
export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={cn(dmSans.variable, sportingGrotesque.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-ink font-body text-white antialiased">
        <script
          type="application/ld+json"
          // Content is produced by `JSON.stringify` from typed, in-repo config —
          // there is no user input in this string.
          dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildWebSiteJsonLd() }}
        />

        <a
          href="#main-content"
          className={cn(
            'sr-only focus:not-sr-only',
            'focus:fixed focus:left-4 focus:top-4 focus:z-preloader',
            'focus:rounded-full focus:bg-lime focus:px-5 focus:py-3',
            'focus:text-sm focus:font-bold focus:uppercase focus:text-ink',
          )}
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>
          <SitePreloader />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          {/*
            Last in the tree so it paints over everything without needing a
            stacking-context fight, and outside `main` because it is decoration
            rather than page content.
          */}
          <MouseCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
