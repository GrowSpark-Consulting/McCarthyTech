'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import type { ServiceClip } from '@/types/service-detail';

/**
 * How much of the card must be on screen before its clip is fetched.
 *
 * Small, so a card that is only just entering the viewport has already started
 * loading by the time it is fully visible.
 */
const VISIBILITY_THRESHOLD = 0.1;

/**
 * Margin around the viewport used to start loading early.
 *
 * Half a screen of lead time is enough for a ~1–15 MB clip to be well underway
 * before the card is actually looked at, without fetching a whole grid's worth
 * of video for someone who never scrolls that far.
 */
const ROOT_MARGIN = '50% 0px';

export interface LazyVideoProps {
  /** The clip and the still it falls back to. */
  readonly clip: ServiceClip;
  /**
   * Classes applied to the poster and the clip alike, so the two stay aligned.
   *
   * Both are absolutely positioned fills. **The caller must give the wrapper its
   * own height** — an aspect ratio or a fixed value — because neither layer is
   * in flow and a wrapper relying on them collapses to zero. That collapse is
   * silent: the card still renders, it is simply 0px tall and cannot be hovered.
   */
  readonly className?: string;
  /** Sizes hint for the poster. */
  readonly sizes?: string;
}

/**
 * A muted, looping clip that is only fetched once it is nearly on screen.
 *
 * The reference marks these `preload="none"` and then sets `autoplay`, which
 * cancels out: autoplay forces the fetch immediately, so all four clips in the
 * grid — around 32 MB — are pulled during initial load whether or not anyone
 * scrolls to them. Gating on an `IntersectionObserver` keeps the markup and the
 * behaviour otherwise identical while making `preload="none"` mean what it says.
 *
 * The poster is a `next/image` beneath the clip rather than the `poster`
 * attribute, and it stays mounted: it is what shows before the clip arrives,
 * what shows when the clip is suppressed, and what gives the first video frame
 * something to appear over instead of a flash of empty card.
 *
 * Under reduced motion the clip is never mounted at all and the poster is the
 * whole card — a complete rendering, not a degraded one.
 *
 * @param props - See {@link LazyVideoProps}.
 */
export function LazyVideo({ clip, className, sizes = '25vw' }: LazyVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: VISIBILITY_THRESHOLD,
    rootMargin: ROOT_MARGIN,
  });

  // A slot with no `src` is a still by design, not a missing asset.
  const shouldPlay = inView && !prefersReducedMotion && clip.src !== undefined;

  return (
    <span ref={ref} className="contents">
      <Image
        src={clip.poster}
        alt=""
        fill
        sizes={sizes}
        aria-hidden="true"
        className={cn('object-cover', className)}
      />

      {shouldPlay ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className={cn('absolute inset-0 size-full object-cover', className)}
        >
          <source src={clip.src} type={clip.type} />
        </video>
      ) : null}
    </span>
  );
}
