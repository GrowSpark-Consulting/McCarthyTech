import { HeroScrollCue } from '@/components/sections/hero/hero-scroll-cue';
import { ServiceHeroBackdrop } from '@/components/sections/service-detail/service-hero-backdrop';
import { ServiceHeroStats } from '@/components/sections/service-detail/service-hero-stats';
import { TECH_ROW_ID } from '@/components/sections/service-detail/service-tech-row';
import { Reveal } from '@/components/shared/reveal';
import { AgencyButton } from '@/components/ui/agency-button';
import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { Container } from '@/components/ui/container';
import { SERVICE_HERO_REVEAL_DELAY } from '@/lib/motion';
import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/types/navigation';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the `<h1>` carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-hero-heading';

/** Scroll affordance copy. Identical on all eight pages, so it is not per-service data. */
const SCROLL_CUE = {
  label: 'Scroll Down',
  accessibleLabel: 'Scroll down to the technologies we build with',
} as const;

export interface ServiceDetailHeroProps {
  /** The service being rendered. */
  readonly service: ServiceDetail;
  /** Trail from the site root down to this page. */
  readonly breadcrumb: readonly NavLink[];
}

/**
 * The opening band of a service detail page.
 *
 * Reproduces the reference's arrangement: a centred single column running
 * service name → headline → lead → one call to action → two counters, with a
 * scroll cue pinned to the bottom edge and the technology row following as its
 * own section.
 *
 * **The headline ornament.** The reference sets an animated GIF into the middle
 * of the headline phrase. The same effect is drawn here as a gradient pill
 * panning on a CSS keyframe — no asset to download or decode, sharp at any
 * density, and it re-themes with the page instead of being a fixed image. The
 * pattern mirrors `ContactSection`, which sets an ornament into its heading the
 * same way.
 *
 * **Why the `<h1>` contains both halves.** Visually the service name sits above
 * the rest of the phrase, which would suggest an eyebrow element and an `<h1>`
 * holding only the remainder. That would leave the page's sole level-one
 * heading reading "for Business Growth" — a fragment, and a poor result in
 * search. Both halves live inside the `<h1>` instead, styled to look like two
 * lines.
 *
 * A Server Component. Only `Reveal` and the counters hydrate.
 *
 * @param props - See {@link ServiceDetailHeroProps}.
 */
export function ServiceDetailHero({ service, breadcrumb }: ServiceDetailHeroProps) {
  const { accent, hero } = service;
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        'relative isolate overflow-hidden text-center',
        'pt-svc-hero-top max-bs-lg:pt-svc-hero-top-lg max-bs-md:pt-svc-hero-top-md',
        // Bottom inset leaves room for the absolutely positioned scroll cue.
        'pb-[120px] max-bs-md:pb-16',
      )}
    >
      <ServiceHeroBackdrop accent={accent} />

      <Container>
        <BreadcrumbTrail items={breadcrumb} className="flex justify-center" />

        <div className="mx-auto mt-8 max-w-[960px] [perspective:2000px] [transform-style:preserve-3d]">
          <Reveal
            as="h1"
            delay={SERVICE_HERO_REVEAL_DELAY.headline}
            className={cn(
              'font-heading font-bold leading-[1.06] tracking-[-0.03em] text-white',
              'text-[clamp(34px,5.6vw,76px)]',
            )}
          >
            <span id={HEADING_ID}>
              <span className={accentClasses.text}>{hero.eyebrow}</span>{' '}
              {/* Ornament — decorative, so it carries no text and is hidden
                  from assistive technology. `align-middle` keeps it optically
                  centred on the cap height rather than the baseline. */}
              <span
                aria-hidden="true"
                className={cn(
                  'mx-1 inline-block h-[0.62em] w-[1.9em] overflow-hidden rounded-full align-middle',
                  'bg-aurora bg-[length:200%_100%]',
                  'animate-gradient-pan motion-reduce:animate-none',
                )}
              />{' '}
              {hero.headline}
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={SERVICE_HERO_REVEAL_DELAY.lead}
            className={cn(
              'mx-auto mt-7 max-w-[720px] text-lg leading-[1.7] text-svc-muted',
              'max-bs-md:text-base',
            )}
          >
            {hero.lead}
          </Reveal>

          <Reveal delay={SERVICE_HERO_REVEAL_DELAY.cta}>
            <div className="mt-10 flex justify-center">
              <AgencyButton
                href={hero.cta.href}
                label={hero.cta.label}
                srSuffix={` about ${service.name}`}
              />
            </div>
          </Reveal>

          <Reveal delay={SERVICE_HERO_REVEAL_DELAY.highlights} className="mt-16 max-bs-md:mt-12">
            <ServiceHeroStats stats={hero.stats} accent={accent} />
          </Reveal>
        </div>
      </Container>

      <HeroScrollCue
        targetId={TECH_ROW_ID}
        label={SCROLL_CUE.label}
        accessibleLabel={SCROLL_CUE.accessibleLabel}
      />
    </section>
  );
}
