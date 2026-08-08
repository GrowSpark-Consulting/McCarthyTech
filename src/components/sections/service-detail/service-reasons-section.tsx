import { ServiceIcon } from '@/components/sections/service-detail/service-icon';
import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceReasonsBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-reasons-heading';

/** Stagger between cards, in seconds. */
const CARD_STAGGER_S = 0.08;

export interface ServiceReasonsSectionProps {
  readonly band: ServiceReasonsBand;
  readonly accent: ServiceAccent;
}

/**
 * The four differentiator cards.
 *
 * Same grid rhythm as the offerings band above it — 4 → 2 → 1 — but these are
 * static cards rather than links, so they are plain list items. Making them
 * links purely for visual symmetry would put four tab stops in the page that go
 * nowhere.
 *
 * The "Focus:" qualifier is a `<p>` rather than being folded into the heading,
 * so the card's accessible name stays the short title.
 *
 * @param props - See {@link ServiceReasonsSectionProps}.
 */
export function ServiceReasonsSection({ band, accent }: ServiceReasonsSectionProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

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

        <ul
          className={cn(
            'm-0 grid list-none grid-cols-1 gap-6 p-0',
            'bs-md:grid-cols-2 bs-xl:grid-cols-4',
          )}
        >
          {band.reasons.map((reason, index) => (
            <li key={reason.id} className="flex">
              <ScrollReveal delay={index * CARD_STAGGER_S} className="flex w-full">
                <div
                  className={cn(
                    'flex w-full flex-col rounded-[20px] border border-white/[0.08] bg-svc-card p-7',
                    'transition-colors duration-500 ease-out',
                    accentClasses.cardHover,
                  )}
                >
                  <ServiceIcon icon={reason.icon} className={accentClasses.text} />

                  <h3 className="mt-6 font-heading text-xl leading-snug tracking-[-0.02em] text-white">
                    {reason.title}
                  </h3>
                  <p className={cn('mt-2 text-[13px] font-semibold', accentClasses.text)}>
                    {reason.focus}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-svc-muted">
                    {reason.description}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
