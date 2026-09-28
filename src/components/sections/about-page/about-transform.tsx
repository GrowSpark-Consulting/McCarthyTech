import { Fragment } from 'react';

import { AboutTransformAwards } from '@/components/sections/about-page/about-transform-awards';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

/** Stagger between the eyebrow, heading, copy and button, in seconds. */
const STAGGER_S = 0.08;

/**
 * The About page's closing call to action.
 *
 * Copy on the left, and on the right a field of award badges gliding
 * vertically in three columns (see {@link AboutTransformAwards}). Below `bs-lg`
 * the two stack, copy first.
 *
 * The left column only moves once: a short staggered rise as it enters the
 * viewport. The continuous motion all belongs to the badge field.
 */
export function AboutTransform() {
  const { transform } = aboutPageContent;

  return (
    <section
      aria-labelledby="about-transform-heading"
      className="relative overflow-hidden py-[120px] max-bs-md:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 bs-lg:grid-cols-2 bs-lg:gap-10">
          {/*
           * A size container, so the heading can be set in `cqi` against the
           * column: its longest line, "strategic digital", is ~8.8em wide, and
           * 11cqi keeps it on one line at every breakpoint.
           */}
          <div className="[container-type:inline-size]">
            <ScrollReveal variant="rise">
              <SectionEyebrow>{transform.subtitle}</SectionEyebrow>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={STAGGER_S}>
              {/*
               * `leading-*` comes after the `text-*` size: `cn` runs
               * tailwind-merge, which drops a line-height that precedes a
               * font-size.
               */}
              <h2
                id="about-transform-heading"
                className={cn(
                  'mt-7 font-heading font-normal tracking-[-0.04em] text-white',
                  'text-[clamp(30px,11cqi,88px)] leading-[1.12]',
                )}
              >
                {transform.titleLines.map((line, index) => (
                  <Fragment key={line}>
                    {index === 0 ? null : ' '}
                    <span className="block">{line}</span>
                  </Fragment>
                ))}
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={STAGGER_S * 2}>
              <p className="mt-7 max-w-[560px] text-[17px] leading-[1.75] text-white/80 bs-xl:text-lg">
                {transform.content}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={STAGGER_S * 3} className="mt-10 max-bs-md:mt-8">
              <AgencyButton href={transform.button.href} label={transform.button.label} />
            </ScrollReveal>
          </div>

          <AboutTransformAwards awards={transform.awards} label={transform.awardsLabel} />
        </div>
      </Container>
    </section>
  );
}
