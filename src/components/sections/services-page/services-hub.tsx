import { CapabilityCard } from '@/components/sections/services-page/capability-card';
import { AgencyButton } from '@/components/ui/agency-button';
import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { Container } from '@/components/ui/container';
import { GhostButton } from '@/components/ui/ghost-button';
import {
  serviceCapabilities,
  servicesPageContent,
  servicesPageReasons,
  servicesPageStats,
} from '@/lib/services-page';
import { cn } from '@/lib/utils';

/** `.svc-eyebrow` — the small lime label above each section heading. */
const EYEBROW_CLASS = cn(
  'inline-flex items-center gap-[9px] text-xs font-semibold uppercase tracking-[3px] text-mint',
  "before:size-[7px] before:rounded-full before:bg-mint before:content-['']",
);

/** `.svc-sec-title` — fluid section heading. */
const SECTION_TITLE_CLASS = cn(
  'mt-[18px] font-heading leading-[1.12] tracking-[-0.02em] text-white',
  'text-[clamp(30px,3.6vw,48px)]',
);

/**
 * The `/services` hub.
 *
 * Five bands, matching the reference: hero, capability grid, stats, "why
 * partner with us", and a closing CTA.
 *
 * A Server Component throughout — only the individual cards hydrate, and only
 * because each gates its own preview clip on visibility.
 */
export function ServicesHub() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"
        className={cn(
          'relative overflow-hidden',
          'pt-svc-hero-top max-bs-lg:pt-svc-hero-top-lg max-bs-md:pt-svc-hero-top-md',
        )}
      >
        <Container>
          <BreadcrumbTrail items={servicesPageContent.breadcrumb} />

          <p className={cn(EYEBROW_CLASS, 'mt-8')}>{servicesPageContent.eyebrow}</p>

          <h1
            id="services-hero-heading"
            className={cn(
              'mt-5 font-heading font-bold leading-[1.02] tracking-[-0.03em] text-white',
              'text-[clamp(44px,6.6vw,96px)]',
            )}
          >
            {servicesPageContent.titleLines[0]}{' '}
            <span className="text-mint">{servicesPageContent.titleLines[1]}</span>
          </h1>

          <p className="mt-6 max-w-[720px] text-lg leading-[1.7] text-svc-muted">
            {servicesPageContent.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <AgencyButton
              href={servicesPageContent.primaryCta.href}
              label={servicesPageContent.primaryCta.label}
            />
            <GhostButton
              href={servicesPageContent.secondaryCta.href}
              label={servicesPageContent.secondaryCta.label}
            />
          </div>

          {/* Discipline ticker. Rendered twice so the -50% travel tiles. */}
          <div
            role="img"
            aria-label="Disciplines we cover"
            className={cn(
              'mt-16 overflow-hidden',
              '[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]',
            )}
          >
            <div className="flex w-max animate-marquee-x motion-reduce:animate-none">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden="true"
                  className="m-0 flex shrink-0 list-none items-center gap-3 p-0 pr-3"
                >
                  {servicesPageContent.disciplines.map((discipline) => (
                    <li
                      key={discipline}
                      className={cn(
                        'shrink-0 whitespace-nowrap rounded-full border border-white/[0.08]',
                        'bg-white/[0.03] px-5 py-2.5 text-sm text-svc-muted',
                      )}
                    >
                      {discipline}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Capability grid */}
      <section
        id="capabilities"
        aria-labelledby="capabilities-heading"
        className="pt-[130px] max-bs-md:pt-20"
      >
        <Container>
          <div className="mb-12">
            <p className={EYEBROW_CLASS}>{servicesPageContent.gridEyebrow}</p>
            <h2 id="capabilities-heading" className={SECTION_TITLE_CLASS}>
              {servicesPageContent.gridHeading}
            </h2>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 bs-md:grid-cols-2 bs-xl:grid-cols-3">
            {serviceCapabilities.map((capability) => (
              <li key={capability.number} className="flex">
                <CapabilityCard capability={capability} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Stats */}
      <section aria-label="Company figures" className="pt-[110px] max-bs-md:pt-16">
        <Container>
          <dl
            className={cn(
              'm-0 grid grid-cols-2 gap-px overflow-hidden rounded-[20px]',
              'border border-white/[0.08] bg-white/[0.06] bs-lg:grid-cols-4',
            )}
          >
            {servicesPageStats.map((stat) => (
              <div key={stat.id} className="bg-ink px-6 py-10 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="m-0">
                  <span className="block font-heading text-[clamp(34px,4vw,52px)] leading-none text-mint">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-sm text-svc-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Why partner with us */}
      <section aria-labelledby="why-heading" className="pt-[130px] max-bs-md:pt-20">
        <Container>
          <div className="mb-12">
            <p className={EYEBROW_CLASS}>{servicesPageContent.whyEyebrow}</p>
            <h2 id="why-heading" className={SECTION_TITLE_CLASS}>
              {servicesPageContent.whyHeading}
            </h2>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 bs-md:grid-cols-2 bs-xl:grid-cols-4">
            {servicesPageReasons.map((reason) => (
              <li
                key={reason.id}
                className={cn(
                  'rounded-[18px] border border-white/[0.08] bg-svc-card p-7',
                  'transition-colors duration-500 ease-out hover:border-mint/40',
                )}
              >
                <h3 className="m-0 font-heading text-xl tracking-[-0.02em] text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-svc-muted">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="services-cta-heading"
        className="pb-[150px] pt-[130px] max-bs-md:py-20"
      >
        <Container>
          <div
            className={cn(
              'relative isolate overflow-hidden rounded-[24px] border border-white/[0.08]',
              'bg-svc-card px-12 py-16 text-center max-bs-md:px-6',
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indus-halo"
            />
            <p className={cn(EYEBROW_CLASS, 'justify-center')}>{servicesPageContent.ctaEyebrow}</p>
            <h2 id="services-cta-heading" className={cn(SECTION_TITLE_CLASS, 'mx-auto')}>
              {servicesPageContent.ctaHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-svc-muted">
              {servicesPageContent.ctaLead}
            </p>
            <div className="mt-9 flex justify-center">
              <AgencyButton
                href={servicesPageContent.ctaButton.href}
                label={servicesPageContent.ctaButton.label}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
