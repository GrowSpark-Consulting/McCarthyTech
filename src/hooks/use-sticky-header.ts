'use client';

import { useEffect, useState } from 'react';

/** Scroll offset, in pixels, past which the pinned header is revealed. */
const DEFAULT_STICKY_THRESHOLD = 300;

/**
 * Tracks whether the page has scrolled far enough to pin the frosted header.
 *
 * Reads are batched into a `requestAnimationFrame` callback and the listener is
 * registered as passive, so scrolling is never blocked on this work and the
 * state setter runs at most once per frame. State only changes when the boolean
 * actually flips, so steady scrolling inside one zone triggers no re-renders.
 *
 * @param threshold - Scroll distance in pixels before the header pins.
 * @returns `true` once the page is scrolled past `threshold`.
 */
export function useStickyHeader(threshold: number = DEFAULT_STICKY_THRESHOLD): boolean {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const measure = (): void => {
      frameId = 0;
      setIsPinned(window.scrollY > threshold);
    };

    const handleScroll = (): void => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(measure);
    };

    // Seed from the current position so a restored scroll offset (back/forward
    // navigation, or a reload partway down the page) renders the correct state
    // on the very first paint instead of flashing the transparent header.
    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, [threshold]);

  return isPinned;
}
