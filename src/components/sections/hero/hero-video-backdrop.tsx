'use client';

import Image from 'next/image';

import { useIdleReady } from '@/hooks/use-idle-ready';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { heroBackgroundVideo } from '@/lib/hero';

/**
 * Below this width the hero plays the phone cut of the clip.
 *
 * The clip was once desktop-only, when it weighed 20 MB. It is now a 5 MB
 * landscape encode for desktop and a 2 MB portrait crop for phones — a crop
 * rather than a downscale, because `object-cover` on a tall phone hero would
 * otherwise throw away two thirds of every landscape frame it downloaded. The
 * poster still paints first either way and remains the LCP element.
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
  const shouldPlayVideo = isIdle && !prefersReducedMotion;
  const videoSrc = isDesktop
    ? heroBackgroundVideo.src
    : (heroBackgroundVideo.mobileSrc ?? heroBackgroundVideo.src);

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
          // Keyed on the source: a `<source>` swap alone does not reload a
          // playing video, so crossing the breakpoint remounts it instead.
          key={videoSrc}
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
          <source src={videoSrc} type={heroBackgroundVideo.type} />
        </video>
      ) : null}

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-veil" />
    </>
  );
}
