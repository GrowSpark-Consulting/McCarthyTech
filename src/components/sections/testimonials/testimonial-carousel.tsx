'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { TestimonialCard } from '@/components/sections/testimonials/testimonial-card';
import { testimonialsContent, type Testimonial } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

export interface TestimonialCarouselProps {
  readonly testimonials: readonly Testimonial[];
}

/**
 * The reviews carousel.
 *
 * Built on Embla rather than the reference's Swiper: it is a fraction of the
 * size, ships no CSS of its own, and leaves the slide layout to plain flexbox —
 * so the responsive slide widths below are ordinary Tailwind classes rather than
 * a JavaScript breakpoint config.
 *
 * Accessibility the reference lacks entirely:
 *
 * - The track is a labelled `group` region with `aria-roledescription="carousel"`.
 * - Each slide announces its position ("2 of 4").
 * - Real `<button>` controls, disabled at the ends, with live-updating labels.
 * - Arrow keys move between slides when the region has focus.
 *
 * @param props - See {@link TestimonialCarouselProps}.
 */
export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
      aria-label={testimonialsContent.carouselLabel}
      onKeyDown={handleKeyDown}
      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
      tabIndex={0}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-[30px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}`}
              className={cn(
                'min-w-0 shrink-0 grow-0',
                'basis-full bs-md:basis-[calc(50%-15px)] bs-xl:basis-[calc(33.333%-20px)]',
              )}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <CarouselButton
          label={testimonialsContent.previousLabel}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </CarouselButton>
        <CarouselButton
          label={testimonialsContent.nextLabel}
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
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
