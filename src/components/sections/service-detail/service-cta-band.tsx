import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { ThmButton } from '@/components/ui/thm-button';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-cta-heading';

export interface ServiceCtaBandProps {
  /** The service being rendered. Must carry a `ctaBand`. */
  readonly service: ServiceDetail;
}

/**
 * `.cta` — the closing ask.
 *
 * A half-width block on a full-bleed photograph: eyebrow, one line, one button.
 * The right column is empty in the reference — the artwork carries it — so
 * nothing is rendered there rather than an empty element being kept for shape.
 *
 * A Server Component.
 *
 * @param props - See {@link ServiceCtaBandProps}.
 */
export function ServiceCtaBand({ service }: ServiceCtaBandProps) {
  const { ctaBand } = service;

  if (ctaBand === undefined) return null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="bg-cta-stage bg-cover bg-center bg-no-repeat pb-[150px] max-bs-md:pb-20"
    >
      <Container>
        <div className="w-1/2 max-bs-lg:w-full">
          <ScrollReveal>
            <SectionEyebrow tone="dot" className="mb-[25px] block">
              {ctaBand.eyebrow}
            </SectionEyebrow>

            <h2
              id={HEADING_ID}
              className="font-heading text-[52px] font-normal leading-[1.2] tracking-display text-white max-bs-md:text-[32px]"
            >
              {ctaBand.title}
            </h2>

            <div className="mt-10">
              <ThmButton href={ctaBand.cta.href} label={ctaBand.cta.label} />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
