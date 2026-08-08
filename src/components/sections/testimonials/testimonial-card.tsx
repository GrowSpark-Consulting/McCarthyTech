import { Star } from 'lucide-react';

import { AvatarInitials } from '@/components/ui/avatar-initials';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/testimonials';

export interface TestimonialCardProps {
  readonly testimonial: Testimonial;
}

/**
 * One review card.
 *
 * Marked up as a `<figure>` with a `<blockquote>` and `<figcaption>`, so the
 * quote is programmatically tied to its attribution — the reference uses plain
 * `<p>` and `<div>`, which leaves a screen reader no way to connect the two.
 *
 * The rating chip's numeric score is real text rather than a repeated star
 * glyph, so "Google 5.0" is announced once instead of five identical stars.
 *
 * @param props - See {@link TestimonialCardProps}.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'relative isolate m-0 h-full rounded-[10px] pb-[30px] pl-[30px] pr-9 pt-[30px]',
        'bg-glass-sheen shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[40px]',
      )}
    >
      {/* 1px gradient hairline — `.xb-border::after`. */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
          '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        )}
      />

      <p className="inline-flex items-center gap-[9px] rounded-[7px] bg-ink px-[10px] py-[7px]">
        <Star aria-hidden="true" className="size-[18px] fill-star text-star" />
        <span className="text-[21px] tracking-[-0.03em] text-white">{testimonial.source}</span>
        <span className="ml-1.5 text-[21px] tracking-[-0.03em] text-white">
          {testimonial.rating.toFixed(1)}
        </span>
        <span className="sr-only">out of 5</span>
      </p>

      <blockquote className="m-0 mb-16 mt-[23px] text-[22px] font-medium leading-[34px] tracking-[-0.02em] text-white">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-[15px]">
        <AvatarInitials name={testimonial.name} />
        <span className="block">
          <span className="block font-heading text-[21px] capitalize text-white">
            {testimonial.name}
          </span>
          <span className="block font-medium text-subtle">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
