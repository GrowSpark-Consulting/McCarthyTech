import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceBrandsBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-brands-heading';

export interface ServiceBrandsSectionProps {
  readonly band: ServiceBrandsBand;
  readonly accent: ServiceAccent;
}

/**
 * The trusted-by strip.
 *
 * A seamless marquee: the list is rendered twice and travelled `-50%`, so the
 * second copy lands exactly where the first began and the loop point is
 * invisible. Same technique as the homepage's brand marquee — a CSS animation
 * with no JavaScript and no scroll listener.
 *
 * **On the marks themselves.** These render as neutral monogram chips carrying
 * the client names from the data layer. Another company's logo asserts a
 * relationship with that company, so the artwork is left to be supplied
 * deliberately rather than assumed — replace the entries in
 * `lib/service-sections.ts` with your own clients and the strip picks them up.
 *
 * The marquee is exposed as a single labelled image rather than as a list: its
 * contents are duplicated for the loop, and a screen reader would otherwise read
 * fourteen names for seven clients.
 *
 * @param props - See {@link ServiceBrandsSectionProps}.
 */
export function ServiceBrandsSection({ band, accent }: ServiceBrandsSectionProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];
  const brandNames = band.brands.map((brand) => brand.name).join(', ');

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
            className="mb-12 max-bs-md:mb-9"
          />
        </ScrollReveal>

        <div
          role="img"
          aria-label={`Clients we have worked with: ${brandNames}`}
          className={cn(
            'overflow-hidden',
            '[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]',
          )}
        >
          <div className="flex w-max animate-marquee-x motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden="true"
                className="m-0 flex shrink-0 list-none items-center gap-4 p-0 pr-4"
              >
                {band.brands.map((brand) => (
                  <li key={brand.id}>
                    <span
                      className={cn(
                        'flex items-center gap-3 rounded-full border border-white/[0.08]',
                        'bg-svc-card py-3 pl-3 pr-7 transition-colors duration-500 ease-out',
                        accentClasses.cardHover,
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-full bg-svc-well',
                          'font-heading text-sm leading-none tracking-[-0.02em]',
                          accentClasses.text,
                        )}
                      >
                        {brand.monogram}
                      </span>
                      <span className="whitespace-nowrap text-[15px] text-white">{brand.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <ScrollReveal className="mt-12 flex justify-center max-bs-md:mt-9">
          <AgencyButton href={band.cta.href} label={band.cta.label} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
