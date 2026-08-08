'use client';

import { useEffect, useState } from 'react';

/** Fallback delay when `requestIdleCallback` is unavailable (Safari). */
const IDLE_FALLBACK_MS = 200;

/** Upper bound on how long we wait for an idle slot before proceeding anyway. */
const IDLE_TIMEOUT_MS = 2000;

/**
 * Signals when the browser is idle enough to start non-critical work.
 *
 * Used to defer heavy media — the 20 MB hero clip, the mega-menu preview — until
 * after the critical render path has finished. Fetching those during initial
 * load competes with the poster image and the font for bandwidth and directly
 * inflates Largest Contentful Paint.
 *
 * @returns `false` on the server and first paint, `true` once the browser is idle.
 */
export function useIdleReady(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // `requestIdleCallback` is still unimplemented in Safari; fall back to a
    // short timeout there so the media is never left permanently unloaded.
    if (typeof window.requestIdleCallback !== 'function') {
      const timeoutId = window.setTimeout(() => setIsReady(true), IDLE_FALLBACK_MS);
      return () => window.clearTimeout(timeoutId);
    }

    const handle = window.requestIdleCallback(() => setIsReady(true), {
      timeout: IDLE_TIMEOUT_MS,
    });
    return () => window.cancelIdleCallback(handle);
  }, []);

  return isReady;
}
