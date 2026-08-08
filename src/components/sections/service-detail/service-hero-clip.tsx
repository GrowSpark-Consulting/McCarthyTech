'use client';

import { useIdleReady } from '@/hooks/use-idle-ready';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { ServiceClip } from '@/types/service-detail';

export interface ServiceHeroClipPlayerProps {
  /** The clip to play, and the still it falls back to. */
  readonly clip: ServiceClip;
}

/**
 * The looping clip behind a service hero band.
 *
 * Deliberately the *only* client component in the band. Everything else — the
 * headline, the ornaments, the metric row, the call to action and its entire
 * hover choreography — is server-rendered and animated in CSS, so this is the
 * whole of the page's hydration cost above the fold.
 *
 * The clip is not in the first render at all. It mounts once the browser reports
 * an idle slot, which keeps its bytes out of the critical path: the poster
 * beneath it is a `priority` image and is what paints for Largest Contentful
 * Paint, and a video competing for that bandwidth is the single easiest way to
 * push the metric out. The poster stays mounted underneath rather than being
 * swapped away, so the first video frame has something to appear over and there
 * is never a gap.
 *
 * Skipped entirely under `prefers-reduced-motion` — an autoplaying loop is
 * precisely the motion that setting exists to suppress — leaving the poster as a
 * still backdrop, which is a complete rendering of the band rather than a
 * degraded one.
 *
 * No `poster` attribute is set here on purpose. The still is rendered as a
 * `next/image` by the parent instead, so it is negotiated down to AVIF or WebP
 * and sized to the viewport; a `poster` is fetched raw at full weight.
 *
 * @param props - See {@link ServiceHeroClipPlayerProps}.
 */
export function ServiceHeroClipPlayer({ clip }: ServiceHeroClipPlayerProps) {
  const isIdle = useIdleReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!isIdle || prefersReducedMotion || clip.src === undefined) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute inset-0 size-full object-cover"
    >
      <source src={clip.src} type={clip.type} />
    </video>
  );
}
