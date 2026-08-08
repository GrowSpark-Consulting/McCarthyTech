'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import { AvatarInitials } from '@/components/ui/avatar-initials';
import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceTestimonial } from '@/types/service-sections';

export interface ServiceTestimonialCarouselProps {
  readonly testimonials: readonly ServiceTestimonial[];
  readonly accent: ServiceAccent;
}

/**
 * The reviews carousel on a service detail page.
 *
 * Built on Embla, matching the homepage's testimonial carousel so the two behave
 * identically — same slide widths per breakpoint, same circular controls, same
 * keyboard handling. Embla ships no CSS of its own, which is what lets the slide
 * sizing stay ordinary Tailwind classes instead of a JavaScript breakpoint map.
 *
 * Accessibility, which carousels usually get wrong:
 *
 * - The track is a labelled `group` with `aria-roledescription="carousel"`.
 * - Each slide announces its position, "2 of 4".
 * - Controls are real `<button>`s, disabled at the ends.
 * - Left and right arrows move between slides when the region has focus.
 *
 * @param props - See {@link ServiceTestimonialCarouselProps}.
 */
export function ServiceTestimonialCarousel({
  testimonials,
  accent,
}: ServiceTestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi === undefined) return;

    const sync = (): void => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    sync();
    emblaApi.on('select', sync).on('reInit', sync);

    return () => {
      emblaApi.off('select', sync).off('reInit', sync);
    };
  }, [emblaApi]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}`}
              className={cn(
                'min-w-0 shrink-0 grow-0',
                'basis-full bs-md:basis-[calc(50%-12px)] bs-xl:basis-[calc(33.333%-16px)]',
              )}
            >
              <figure
                className={cn(
                  'm-0 flex h-full flex-col rounded-[20px] border border-white/[0.08] bg-svc-card p-7',
                  'transition-colors duration-500 ease-out',
                  accentClasses.cardHover,
                )}
              >
                <Quote
                  aria-hidden="true"
                  className={cn('size-7 shrink-0', accentClasses.text)}
                  strokeWidth={1.6}
                />

                <blockquote className="m-0 mt-5 flex-1 text-[15px] leading-[1.7] text-white">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-white/[0.08] pt-6">
                  <AvatarInitials name={testimonial.name} className="size-11 text-base" />
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-white">
                      {testimonial.role}
                    </span>
                    <span className="block truncate text-sm text-svc-muted">
                      {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <CarouselButton label="Previous review" onClick={scrollPrev} disabled={!canScrollPrev}>
          <ArrowLeft aria-hidden="true" className="size-5" />
        </CarouselButton>
        <CarouselButton label="Next review" onClick={scrollNext} disabled={!canScrollNext}>
          <ArrowRight aria-hidden="true" className="size-5" />
        </CarouselButton>
      </div>
    </div>
  );
}

/** A circular carousel control. */
function CarouselButton({
  label,
  onClick,
  disabled,
  children,
}: {
  readonly label: string;
  readonly onClick: () => void;
  readonly disabled: boolean;
  readonly children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex size-12 items-center justify-center rounded-full border border-white/20 bg-ink text-white',
        'transition-colors duration-300 ease-out',
        'hover:border-lime hover:bg-lime hover:text-ink',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20',
        'disabled:hover:bg-ink disabled:hover:text-white',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
      )}
    >
      {children}
    </button>
  );
}
