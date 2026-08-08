'use client';

import Image from 'next/image';

import { useIdleReady } from '@/hooks/use-idle-ready';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { heroBackgroundVideo } from '@/lib/hero';

/**
 * The clip is desktop-only.
 *
 * Lighthouse's mobile run attributed Largest Contentful Paint to this `<video>`
 * with a **7.4 second load delay** — the element only exists after an idle
 * callback, and on a throttled connection that lands very late. Beyond the
 * metric, pushing 20 MB of decorative video to a phone on cellular is the wrong
 * default whatever the score says.
 *
 * Below this width the poster is the whole backdrop: it still fills the hero,
 * still carries the scrim, and becomes the LCP element itself — which is exactly
 * what it was preloaded for.
 */
const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * The hero's full-bleed background: a poster frame with a looping clip layered
 * over it, plus the two-pass scrim that keeps the headline legible.
 *
 * Load order is deliberate and is the single biggest lever on this page's
 * Largest Contentful Paint:
 *
 * 1. The poster renders immediately at `priority`, so the browser preloads it in
 *    the document head. It is what paints for LCP.
 * 2. The clip — roughly 20 MB — is not in the markup at all on first render. It
 *    mounts only once the browser reports an idle slot, so it cannot compete
 *    with the poster, the font, or the JS bundle for bandwidth during load.
 * 3. The poster stays behind the clip rather than being swapped out, so the
 *    first video frame has something to cross-fade over and there is never a
 *    flash of empty background.
 *
 * The clip is skipped entirely when the visitor prefers reduced motion — an
 * autoplaying loop is exactly the kind of motion that setting exists to
 * suppress — leaving the poster as a still backdrop.
 */
export function HeroVideoBackdrop() {
  const isIdle = useIdleReady();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldPlayVideo = isIdle && isDesktop && !prefersReducedMotion;

  return (
    <>
      <Image
        src={heroBackgroundVideo.poster.src}
        alt=""
        fill
        priority
        quality={80}
        sizes="100vw"
        aria-hidden="true"
        className="-z-20 object-cover"
      />

      {shouldPlayVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          poster={heroBackgroundVideo.poster.src}
          className="pointer-events-none absolute inset-0 -z-20 size-full object-cover"
        >
          <source src={heroBackgroundVideo.src} type={heroBackgroundVideo.type} />
        </video>
      ) : null}

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-veil" />
    </>
  );
}
