'use client';

import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reports whether the visitor has asked the OS to reduce motion.
 *
 * Starts as `false` so server and first client render agree (the media query is
 * unreadable during SSR, and guessing `true` would make every visitor see a
 * flash of the static state). The real value is applied in an effect, and the
 * listener keeps it live if the preference changes mid-session.
 *
 * @returns `true` when reduced motion is requested.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
