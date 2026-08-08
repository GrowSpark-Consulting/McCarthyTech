import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ServiceShowcase } from '@/components/sections/service-detail/service-showcase';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceOverviewBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-overview-heading';

export interface ServiceOverviewSectionProps {
  readonly band: ServiceOverviewBand;
  readonly accent: ServiceAccent;
}

/**
 * The "what do we do" statement, and the showcase beneath it.
 *
 * A centred single column: eyebrow, heading, one paragraph, one call to action,
 * then the rotating device mock. The two are one section rather than two
 * because the mock is illustrating the statement directly above it — splitting
 * them would put a section boundary through the middle of one idea.
 *
 * @param props - See {@link ServiceOverviewSectionProps}.
 */
export function ServiceOverviewSection({ band, accent }: ServiceOverviewSectionProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn('relative overflow-hidden pt-[130px]', 'max-bs-md:pt-20')}
    >
      <Container>
        <ScrollReveal>
          <ServiceSectionHeading
            eyebrow={band.eyebrow}
            heading={band.heading}
            headingId={HEADING_ID}
            accent={accent}
            centered
          />

          <p
            className={cn(
              'mx-auto mt-6 max-w-[760px] text-center text-lg leading-[1.75] text-svc-muted',
              'max-bs-md:text-base',
            )}
          >
            {band.lead}
          </p>

          <div className="mt-10 flex justify-center">
            <AgencyButton href={band.cta.href} label={band.cta.label} />
          </div>
        </ScrollReveal>

        <ServiceShowcase accent={accent} />
      </Container>
    </section>
  );
}
