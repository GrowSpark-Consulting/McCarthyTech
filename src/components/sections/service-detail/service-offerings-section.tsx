import { ArrowUpRight } from 'lucide-react';

import { ServiceIcon } from '@/components/sections/service-detail/service-icon';
import { ServiceSectionHeading } from '@/components/sections/service-detail/service-section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { AppLink } from '@/components/ui/app-link';
import { Container } from '@/components/ui/container';
import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceOfferingsBand } from '@/types/service-sections';

/** DOM id the heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-offerings-heading';

/** Stagger between cards, in seconds. */
const CARD_STAGGER_S = 0.08;

export interface ServiceOfferingsSectionProps {
  readonly band: ServiceOfferingsBand;
  readonly accent: ServiceAccent;
}

/**
 * The four-column capability grid.
 *
 * Collapses 4 → 2 → 1 across the breakpoint set. Each card is a single link, so
 * the whole tile is one tab stop and one hit target rather than a card
 * containing a small "learn more" link that a thumb has to find.
 *
 * Cards enter on a stagger driven by their index, which is what makes the row
 * read as a sequence rather than four things appearing at once.
 *
 * @param props - See {@link ServiceOfferingsSectionProps}.
 */
export function ServiceOfferingsSection({ band, accent }: ServiceOfferingsSectionProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    // `id="service"` is the target the overview band's corner cue drops to. It
    // lives here rather than on a wrapper because this is the band the reference
    // gives that id, and the cue has to resolve before this section is rebuilt.
    <section id="service" aria-labelledby={HEADING_ID} className="pt-[130px] max-bs-md:pt-20">
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
          {band.offerings.map((offering, index) => (
            <li key={offering.id} className="flex">
              <ScrollReveal delay={index * CARD_STAGGER_S} className="flex w-full">
                <AppLink
                  href={offering.href}
                  className={cn(
                    'group relative flex w-full flex-col rounded-[20px] p-7',
                    'border border-white/[0.08] bg-svc-card',
                    'transition-[transform,border-color,box-shadow] duration-500 ease-out',
                    'hover:-translate-y-1.5',
                    accentClasses.cardHover,
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
                  )}
                >
                  <ServiceIcon icon={offering.icon} className={accentClasses.text} />

                  <h3 className="mt-6 font-heading text-xl leading-snug tracking-[-0.02em] text-white">
                    {offering.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-svc-muted">
                    {offering.subtitle}
                  </p>

                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-6 inline-flex items-center gap-1.5 text-sm font-bold',
                      accentClasses.text,
                    )}
                  >
                    Learn more
                    <ArrowUpRight
                      className={cn(
                        'size-4 transition-transform duration-300 ease-out',
                        'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                      )}
                    />
                  </span>
                </AppLink>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
