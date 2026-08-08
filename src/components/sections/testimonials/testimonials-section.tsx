import Image from 'next/image';

import { TestimonialCarousel } from '@/components/sections/testimonials/testimonial-carousel';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { testimonials, testimonialsContent } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

/**
 * Testimonials section — "Hear from our happy customers".
 *
 * A Server Component wrapping the carousel, which is the only part that
 * hydrates. The heading's animated ornament sits *behind* the text on the
 * z-axis, so the words read cleanly over it.
 */
export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-testimonial-stage bg-cover bg-center bg-no-repeat pb-[150px] max-bs-md:pb-20"
    >
      <Container>
        <div className="mb-[50px] text-center">
          <SectionEyebrow className="mb-[15px]">{testimonialsContent.eyebrow}</SectionEyebrow>
          <h2
            id="testimonials-heading"
            className={cn(
              'relative z-[1] block font-heading text-[62px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
            )}
          >
            {testimonialsContent.headingBefore}
            <Image
              src={testimonialsContent.headingOrnament.src}
              alt={testimonialsContent.headingOrnament.alt}
              width={testimonialsContent.headingOrnament.width}
              height={testimonialsContent.headingOrnament.height}
              aria-hidden="true"
              // Animated GIF: the optimiser would flatten it to one frame.
              unoptimized
              className="relative -z-10 inline-block w-28 align-middle max-bs-md:w-[75px]"
            />
            {testimonialsContent.headingAfter}
          </h2>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
