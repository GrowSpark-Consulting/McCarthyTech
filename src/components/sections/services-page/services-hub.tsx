import { CapabilityCard } from '@/components/sections/services-page/capability-card';
import { ServicesHeroVisual } from '@/components/sections/services-page/services-hero-visual';
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
          'relative isolate overflow-hidden',
          'pt-svc-hero-top max-bs-lg:pt-svc-hero-top-lg max-bs-md:pt-svc-hero-top-md',
        )}
      >
        {/*
         * Backdrop: a faint grid and two soft blooms, faded out towards the
         * bottom so the hero hands over to the plain canvas of the next band
         * without a visible edge.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]"
        >
          <div className="absolute inset-0 bg-svc-grid [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_15%,transparent_75%)]" />
          <div
            className={cn(
              'absolute -left-[15%] -top-[30%] size-[min(960px,120vw)] rounded-full',
              'bg-[radial-gradient(circle,rgba(0,255,151,0.13)_0%,rgba(0,255,151,0)_62%)]',
              'animate-svc-bloom motion-reduce:animate-none',
            )}
          />
        </div>

        <Container>
          <div
            className={cn(
              'grid grid-cols-1 items-center gap-10',
              'bs-lg:grid-cols-[minmax(0,1fr)_clamp(280px,30%,420px)]',
            )}
          >
            {/*
             * Copy column. It is a size container so the headline can be set in
             * `cqi` against the column's own width: "Engineering" is ~7.3em wide
             * in the display face, so 13cqi keeps it inside the column at every
             * breakpoint without a ladder of per-breakpoint sizes.
             */}
            <div className="[container-type:inline-size]">
              <BreadcrumbTrail
                items={servicesPageContent.breadcrumb}
                className="animate-fade-in-up"
              />

              <p
                className={cn(
                  'mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[3px] text-mint',
                  "before:h-px before:w-8 before:bg-mint before:content-['']",
                  'animate-fade-in-up [animation-delay:80ms]',
                )}
              >
                {servicesPageContent.eyebrow}
              </p>

              {/*
               * `leading-*` must come after the `text-*` size here: `cn` runs
               * tailwind-merge, which drops a line-height that precedes a
               * font-size, and the heading then inherits the body's 28px.
               */}
              <h1
                id="services-hero-heading"
                className={cn(
                  'mt-5 font-heading font-bold tracking-[-0.035em] text-white',
                  'text-[clamp(38px,13cqi,128px)] leading-[1.04]',
                  'animate-fade-in-up [animation-delay:160ms]',
                )}
              >
                <span className="block">{servicesPageContent.title.firstLine}</span>{' '}
                <span className="block">
                  {servicesPageContent.title.secondLine}{' '}
                  <span className="text-mint">{servicesPageContent.title.accent}</span>
                </span>
              </h1>

              <p
                className={cn(
                  'mt-7 max-w-[580px] text-[17px] leading-[1.7] text-svc-muted bs-xl:text-lg',
                  'animate-fade-in-up [animation-delay:240ms]',
                )}
              >
                {servicesPageContent.lead}
              </p>

              <div
                className={cn(
                  'mt-10 flex flex-wrap items-center gap-4 max-bs-md:mt-8',
                  'animate-fade-in-up [animation-delay:320ms]',
                )}
              >
                <AgencyButton
                  href={servicesPageContent.primaryCta.href}
                  label={servicesPageContent.primaryCta.label}
                />
                <GhostButton
                  href={servicesPageContent.secondaryCta.href}
                  label={servicesPageContent.secondaryCta.label}
                />
              </div>
            </div>

            {/* Decorative, so it gives way below `bs-lg` rather than crowd the copy. */}
            <ServicesHeroVisual
              className={cn(
                'hidden bs-lg:block',
                'delay-300 duration-1000 ease-out animate-in fade-in-0 zoom-in-95 fill-mode-both',
              )}
            />
          </div>

          {/* Discipline ticker. Rendered twice so the -50% travel tiles. */}
          <div
            role="img"
            aria-label="Disciplines we cover"
            className={cn(
              'mt-16 overflow-hidden bs-lg:mt-20',
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
