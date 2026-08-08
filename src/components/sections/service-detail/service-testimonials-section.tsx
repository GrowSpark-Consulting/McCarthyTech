import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ServiceTestimonialCarousel } from '@/components/sections/service-detail/service-testimonial-carousel';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceTestimonialsBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-testimonials-heading';

export interface ServiceTestimonialsSectionProps {
  readonly band: ServiceTestimonialsBand;
  readonly accent: ServiceAccent;
}

/**
 * The reviews band.
 *
 * A Server Component wrapper around the carousel, so the heading ships as static
 * HTML and only the slider itself hydrates.
 *
 * @param props - See {@link ServiceTestimonialsSectionProps}.
 */
export function ServiceTestimonialsSection({ band, accent }: ServiceTestimonialsSectionProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-[130px] max-bs-md:pt-20">
      <Container>
        <ScrollReveal>
          <ServiceSectionHeading
            eyebrow={band.eyebrow}
            heading={band.heading}
            headingId={HEADING_ID}
            accent={accent}
            centered
            className="mb-14 max-bs-md:mb-10"
          />
        </ScrollReveal>

        <ServiceTestimonialCarousel testimonials={band.testimonials} accent={accent} />
      </Container>
    </section>
  );
}
