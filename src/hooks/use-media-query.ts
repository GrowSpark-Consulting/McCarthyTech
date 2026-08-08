'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether a CSS media query currently matches.
 *
 * Returns `false` during server render and on the first client paint, because
 * the query is unreadable without a window and guessing would produce a
 * hydration mismatch. Consumers must therefore treat `false` as "not yet known"
 * and keep their layout driven by CSS — this hook is for behaviour that CSS
 * cannot express, such as deciding whether an off-screen video should be
 * mounted at all.
 *
 * @param query - A media query string, e.g. `(max-width: 767.98px)`.
 * @returns `true` while the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
