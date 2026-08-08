'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/** Target accepted by {@link SmoothScrollApi.scrollTo}. */
export type ScrollTarget = string | number | HTMLElement;

export interface SmoothScrollApi {
  /** Scrolls to an element, selector, or absolute offset. */
  readonly scrollTo: (target: ScrollTarget) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  // Before the provider mounts (and after it bails out under reduced motion),
  // fall back to the platform's own scrolling so callers always work.
  scrollTo: (target) => {
    if (typeof window === 'undefined') return;
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
});

/**
 * Access the app's scrolling API.
 *
 * Always route programmatic scrolling through this rather than calling
 * `scrollTo`/`scrollIntoView` directly: while Lenis is running it drives scroll
 * position from its own animation loop, and a native smooth scroll issued
 * alongside it fights the loop and stutters.
 */
export function useSmoothScroll(): SmoothScrollApi {
  return useContext(SmoothScrollContext);
}

/** Lenis tuning. Lower `lerp` means a longer, heavier glide. */
const LENIS_OPTIONS = {
  lerp: 0.1,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  /** Native touch scrolling is already smooth and far cheaper on battery. */
  smoothWheel: true,
} as const;

export interface SmoothScrollProviderProps {
  readonly children: React.ReactNode;
}

/**
 * Installs Lenis smooth scrolling for the whole document.
 *
 * The instance is driven from a single `requestAnimationFrame` loop that is torn
 * down on unmount, so no orphaned loop survives a hot reload or a route change.
 *
 * Skipped entirely when the visitor prefers reduced motion — hijacking the
 * scroll wheel is precisely the kind of motion that preference disables — in
 * which case the context falls back to native scrolling and Lenis is never even
 * constructed.
 *
 * @param props - See {@link SmoothScrollProviderProps}.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;

    let frameId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback((target: ScrollTarget) => {
    const lenis = lenisRef.current;

    if (lenis !== null) {
      lenis.scrollTo(target);
      return;
    }

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const api = useMemo<SmoothScrollApi>(() => ({ scrollTo }), [scrollTo]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
