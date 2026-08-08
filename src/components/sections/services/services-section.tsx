import { ServiceAccordion } from '@/components/sections/services/service-accordion';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { serviceOfferings, servicesContent } from '@/lib/services';
import { cn } from '@/lib/utils';

/**
 * Services section — a centred heading block above a full-bleed accordion.
 *
 * The heading block is a Server Component; only the accordion beneath it
 * hydrates, and only because it tracks which panel is open.
 *
 * The heading is constrained to 11 of 12 grid columns and centred, matching the
 * reference's `.row.justify-content-center > .col-lg-11`. The accordion
 * deliberately sits *outside* the container so its backdrop bleeds to both
 * viewport edges.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="pt-[135px] max-bs-md:pt-20">
      <Container>
        <div className="flex justify-center">
          <div className="w-full max-w-[91.666%] text-center max-bs-lg:max-w-full">
            {/* `.xb-sec-padding` — the gap between the heading block and the
                strip widens once the layout narrows. */}
            <div className="mb-[55px] max-bs-xl:mb-20">
              <h2
                id="services-heading"
                className={cn(
                  'block font-heading text-[62px] font-normal leading-[1.5]',
                  'tracking-[-0.08em] text-white',
                  'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
                )}
              >
                {servicesContent.heading}
              </h2>

              <div className="mt-6 inline-block">
                <AgencyButton href={servicesContent.cta.href} label={servicesContent.cta.label} />
              </div>

              <div className="mb-2 mt-12">
                <SectionEyebrow>{servicesContent.eyebrow}</SectionEyebrow>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <ServiceAccordion offerings={serviceOfferings} />
    </section>
  );
}
