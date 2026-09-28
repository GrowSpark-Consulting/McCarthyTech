'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { BrandMark } from '@/components/layout/brand-logo';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { siteConfig } from '@/lib/site';

/**
 * Hard ceiling on how long the curtain may stay up.
 *
 * Originally 1500ms and tied to the window `load` event — which Lighthouse
 * measured as *the* Largest Contentful Paint blocker: the hero headline finished
 * its entrance behind the curtain, then waited on `load` (gated by a 20 MB video)
 * before anyone could see it. LCP landed at 2.4s against a 0.4s First
 * Contentful Paint.
 *
 * The curtain now lifts on `document.fonts.ready` instead, which is the signal
 * it actually exists for: hiding the font swap and the layout settling that
 * comes with it. This ceiling is the backstop for a stalled font request.
 */
const MAX_VISIBLE_MS = 800;

/** Curtain fade-out duration, in seconds. */
const FADE_OUT_SECONDS = 0.4;

/**
 * Brand curtain shown while the page's initial resources settle.
 *
 * Lifts on whichever comes first: the window `load` event, or {@link MAX_VISIBLE_MS}.
 * Because the hero poster is preloaded at high priority, `load` normally fires
 * just after that image decodes — so the curtain lifts at almost exactly the
 * moment the Largest Contentful Paint element is ready to be seen, rather than
 * holding it back.
 *
 * The curtain is `aria-hidden` and fully unmounted once dismissed, so it is
 * never announced and never intercepts a click. Screen-reader and
 * reduced-motion users skip it entirely: it is decorative, and the real content
 * is already in the DOM behind it.
 */
export function SitePreloader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isStale = false;
    const dismiss = (): void => {
      if (!isStale) setIsVisible(false);
    };

    // Whichever comes first: the webfonts resolving, or the ceiling. Crucially
    // this no longer waits on window `load`, which is gated by every image and
    // video on the page and was holding the headline back by ~2 seconds.
    const timeoutId = window.setTimeout(dismiss, MAX_VISIBLE_MS);
    void document.fonts.ready.then(dismiss);

    return () => {
      isStale = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_SECONDS, ease: 'easeOut' }}
          className="fixed inset-0 z-preloader flex flex-col items-center justify-center gap-6 bg-ink"
        >
          {/* Fetched eagerly but deliberately *not* `priority`: a preload here
              would land in the document head ahead of the hero poster and
              compete with the Largest Contentful Paint element for early
              bandwidth. The mark is a few kilobytes and paints well within the
              curtain's lifetime either way. */}
          <BrandMark loading="eager" className="h-[72px] w-auto" />

          {/* Indeterminate progress rail: a lime sliver sweeping a dim track. */}
          <span className="relative block h-px w-[140px] overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-y-0 w-1/3 bg-lime"
              initial={{ x: '-100%' }}
              animate={{ x: '300%' }}
              transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
            />
          </span>

          <span className="sr-only">Loading {siteConfig.name}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
