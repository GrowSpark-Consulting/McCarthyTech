import { ServiceFaqAccordion } from '@/components/sections/service-detail/service-faq-accordion';
import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceFaqBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-faq-heading';

export interface ServiceFaqSectionProps {
  readonly band: ServiceFaqBand;
  readonly accent: ServiceAccent;
}

/**
 * The FAQ band, and the last section before the footer.
 *
 * Constrained to a single centred column: an accordion spanning the full grid
 * makes each question's hit target run the width of the viewport, and the answer
 * text below it exceeds a comfortable measure by a wide margin.
 *
 * Only the accordion hydrates; the heading is static HTML.
 *
 * @param props - See {@link ServiceFaqSectionProps}.
 */
export function ServiceFaqSection({ band, accent }: ServiceFaqSectionProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="pb-[150px] pt-[130px] max-bs-md:pb-20 max-bs-md:pt-20"
    >
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

        <div className="mx-auto max-w-[860px]">
          <ServiceFaqAccordion faqs={band.faqs} accent={accent} />
        </div>
      </Container>
    </section>
  );
}
