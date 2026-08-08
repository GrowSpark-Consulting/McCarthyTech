'use client';

import { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ServicePanel } from '@/components/sections/services/service-panel';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import type { ServiceOffering } from '@/types/services';

/**
 * Viewport width below which panels stop behaving as an accordion and stack into
 * an always-open column. Matches the reference's `@media (max-width: 767px)`.
 */
const STACKED_LAYOUT_QUERY = '(max-width: 767.98px)';

/**
 * How far ahead of the viewport to start warming the preview clips. One
 * screen-height of lead time is enough for the first clip to be ready by the
 * time the section is actually looked at, without fetching for visitors who
 * never scroll this far.
 */
const MEDIA_PREFETCH_MARGIN = '400px';

export interface ServiceAccordionProps {
  readonly offerings: readonly ServiceOffering[];
}

/**
 * The horizontal services filmstrip.
 *
 * Exactly one panel is expanded at a time, tracked by slug rather than index so
 * reordering the data cannot silently change which panel opens first. The first
 * offering is expanded on arrival, matching the reference's `active` class on
 * its first item.
 *
 * Media loading is gated on an `IntersectionObserver` covering the whole strip:
 * nothing is fetched until the section approaches the viewport, at which point
 * individual panels decide for themselves whether they need their clip yet.
 *
 * @param props - See {@link ServiceAccordionProps}.
 */
export function ServiceAccordion({ offerings }: ServiceAccordionProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(offerings[0]?.slug ?? null);
  const isStacked = useMediaQuery(STACKED_LAYOUT_QUERY);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: MEDIA_PREFETCH_MARGIN,
  });

  const activate = useCallback((slug: string) => setActiveSlug(slug), []);

  return (
    <div
      ref={ref}
      className={cn('flex bg-service-stage bg-cover bg-center bg-no-repeat', 'max-bs-md:flex-wrap')}
    >
      {offerings.map((offering) => (
        <ServicePanel
          key={offering.slug}
          offering={offering}
          isActive={activeSlug === offering.slug}
          onActivate={() => activate(offering.slug)}
          isNearViewport={inView}
          isStacked={isStacked}
        />
      ))}
    </div>
  );
}
