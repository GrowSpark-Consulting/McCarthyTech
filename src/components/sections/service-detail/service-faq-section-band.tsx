import { ServiceFaqAccordion } from '@/components/sections/service-detail/service-faq-band';
import { TextReveal } from '@/components/shared/text-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the statement carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-faq-heading';

export interface ServiceFaqBandSectionProps {
  /** The service being rendered. Must carry a `faqBand`. */
  readonly service: ServiceDetail;
}

/**
 * `.faq` — the closing band.
 *
 * `.faq .ai-download-wrap` overrides the shared `.ul_li_between` row into a
 * centred column, so the heading stacks above the panel rather than sitting
 * beside it. That override is why this band looks nothing like the
 * `.ai-download-wrap` used elsewhere despite sharing its markup.
 *
 * A Server Component; only the accordion below it hydrates.
 *
 * @param props - See {@link ServiceFaqBandSectionProps}.
 */
export function ServiceFaqBandSection({ service }: ServiceFaqBandSectionProps) {
  const { faqBand } = service;

  if (faqBand === undefined) return null;

  return (
    <section aria-labelledby={HEADING_ID} className="pt-20">
      <Container width="fluid">
        {/* `.ai-download-wrap.mlr-20` — a centred column on this page. */}
        <div className="mx-5 flex flex-col items-center gap-[50px] max-bs-md:mx-0">
          {/* `.download-sec-title` */}
          <div className="max-w-[550px] text-center max-bs-lg:max-w-[480px] max-bs-md:max-w-full">
            <SectionEyebrow tone="square" className="mb-[25px]">
              {faqBand.eyebrow}
            </SectionEyebrow>

            <TextReveal
              id={HEADING_ID}
              className={cn(
                'font-heading font-normal tracking-display text-white',
                'text-svc-band-title ref-md:text-svc-band-title-md ref-sm:text-svc-band-title-sm',
                'ref-xs:text-svc-band-title-xs ref-xxs:text-svc-band-title-xxs',
              )}
            >
              {faqBand.statement}
            </TextReveal>
          </div>

          <ServiceFaqAccordion faqs={faqBand.faqs} />
        </div>
      </Container>
    </section>
  );
}
