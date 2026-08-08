'use client';

import { useCallback } from 'react';

import { useSmoothScroll } from '@/components/shared/smooth-scroll-provider';
import { cn } from '@/lib/utils';

export interface HeroScrollCueProps {
  /** Id of the section to scroll to when activated. */
  readonly targetId: string;
  /** Visible label beneath the animated line. */
  readonly label: string;
  /** Accessible name for the control. */
  readonly accessibleLabel: string;
}

/**
 * The animated "Scroll" affordance pinned to the bottom of the hero.
 *
 * A 1px rail with a highlight that repeatedly sweeps top-to-bottom, matching the
 * reference's `heroScroll` keyframes exactly (2s, `cubic-bezier(0.76, 0, 0.24, 1)`,
 * travelling from `-50%` to `100%` and holding for the final quarter of the
 * cycle so there is a beat between sweeps).
 *
 * Rendered as a `<button>` rather than an `#anchor`: the target section is not
 * on the page yet, and a link to a missing fragment is a dead control. The
 * handler scrolls to the section once it exists and otherwise advances one
 * viewport, so the cue behaves correctly both now and after later sections land.
 *
 * Hidden below 768px and its animation suppressed under reduced-motion, both as
 * in the reference.
 *
 * @param props - See {@link HeroScrollCueProps}.
 */
export function HeroScrollCue({ targetId, label, accessibleLabel }: HeroScrollCueProps) {
  const { scrollTo } = useSmoothScroll();

  const handleScroll = useCallback(() => {
    const target = document.getElementById(targetId);
    scrollTo(target ?? window.innerHeight);
  }, [targetId, scrollTo]);

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label={accessibleLabel}
      className={cn(
        'absolute bottom-[30px] left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-[10px]',
        'border-0 bg-transparent p-0 no-underline',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
        'max-bs-md:hidden',
      )}
    >
      <span
        aria-hidden="true"
        className="relative block h-[46px] w-px overflow-hidden bg-white/[0.28]"
      >
        <span className="absolute left-0 top-[-50%] h-1/2 w-full animate-hero-scroll bg-white motion-reduce:animate-none" />
      </span>
      <span className="text-[11px] uppercase tracking-cue text-white/65">{label}</span>
    </button>
  );
}
