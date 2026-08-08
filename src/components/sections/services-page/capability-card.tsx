'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';
import type { ServiceCapability } from '@/lib/services-page';

/** Lead distance before a card's clip starts downloading. */
const MEDIA_PREFETCH_MARGIN = '400px';

export interface CapabilityCardProps {
  readonly capability: ServiceCapability;
}

/**
 * One card in the capability grid.
 *
 * The nine clips total roughly 74 MB, so — as everywhere else on this build —
 * each one mounts only when its card approaches the viewport, then latches. A
 * grid of nine autoplaying videos on load would dwarf every other cost on the
 * page.
 *
 * The hover treatment is three separate layers because each does a different
 * job: the card lifts, the corner number brightens, and a diagonal edge-light
 * fades in. That last one is a masked gradient frame — a gradient cannot be a
 * real border and still follow the 20px radius.
 *
 * @param props - See {@link CapabilityCardProps}.
 */
export function CapabilityCard({ capability }: CapabilityCardProps) {
  const { ref, inView } = useInView({ rootMargin: MEDIA_PREFETCH_MARGIN, triggerOnce: true });
  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);

  useEffect(() => {
    if (inView) setHasLoadedVideo(true);
  }, [inView]);

  return (
    <AppLink
      ref={ref}
      href={capability.href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[20px] p-[14px] pb-[26px]',
        'border border-white/[0.08] bg-svc-card',
        'transition-[transform,border-color,box-shadow] duration-500 ease-out',
        'hover:-translate-y-1.5 hover:border-mint/40',
        'hover:shadow-[0_28px_60px_-28px_rgba(0,255,151,0.35)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute right-6 top-[22px] z-[3] text-[15px] font-bold tracking-[2px]',
          'text-white/35 transition-colors duration-ring ease-out group-hover:text-mint',
        )}
      >
        {capability.number}
      </span>

      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-svc-well">
        {hasLoadedVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="size-full object-cover"
          >
            <source src={capability.videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="pt-5">
        <h3 className="m-0 font-heading text-[22px] tracking-[-0.02em] text-white">
          {capability.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.65] text-svc-muted">{capability.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mint">
          Learn more
          <ArrowGlyph
            variant="cta"
            size={22}
            absolute={false}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </span>
      </div>

      {/* Diagonal edge-light, revealed on hover. */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-[4] rounded-[20px] bg-svc-sheen p-px opacity-0',
          'transition-opacity duration-card ease-out group-hover:opacity-100',
          '[mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]',
        )}
      />
    </AppLink>
  );
}
