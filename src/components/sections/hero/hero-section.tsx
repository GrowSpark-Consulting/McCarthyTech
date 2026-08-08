import { HeroScrollCue } from '@/components/sections/hero/hero-scroll-cue';
import { HeroVideoBackdrop } from '@/components/sections/hero/hero-video-backdrop';
import { Reveal } from '@/components/shared/reveal';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { heroContent } from '@/lib/hero';
import { HERO_REVEAL_DELAY } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Hero section — a full-viewport video stage with bottom-anchored copy.
 *
 * A Server Component: the markup, copy, and every layout class ship as static
 * HTML with zero JavaScript. Only the three genuinely interactive pieces — the
 * deferred video, the entrance animation, and the scroll cue — are Client
 * Components, which is what keeps the page's hydration cost near the floor.
 *
 * Layout notes:
 *
 * - `items-end` with a 110px bottom inset anchors the copy to the lower-left,
 *   directly over the scrim's darkest corner.
 * - `isolate` scopes the backdrop's negative z-indices to this section, so the
 *   video can sit behind the content without escaping behind the page canvas.
 * - The 2000px perspective and `preserve-3d` on the copy block are what give the
 *   `Reveal` children their depth; without them the 3D entrance flattens into a
 *   plain slide.
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        'relative isolate flex min-h-dvh items-end overflow-hidden pt-0',
        'max-bs-lg:min-h-[92dvh]',
      )}
    >
      <HeroVideoBackdrop />

      <Container className="w-full pb-hero-gutter max-bs-lg:pb-hero-gutter-md max-bs-md:pb-hero-gutter-sm">
        <div className="max-w-hero-content [perspective:2000px] [transform-style:preserve-3d]">
          <Reveal
            as="h1"
            delay={HERO_REVEAL_DELAY.headline}
            className={cn(
              'font-heading text-hero-xl tracking-display text-white',
              'max-bs-xl:text-hero-lg max-bs-lg:text-hero-md',
              'max-bs-md:text-hero-xs bs-sm:max-bs-md:text-hero-sm',
              'max-bs-md:break-words',
            )}
          >
            <span id="hero-heading">{heroContent.headline}</span>
          </Reveal>

          <Reveal
            as="p"
            delay={HERO_REVEAL_DELAY.subheadline}
            className={cn(
              'my-[6px] mb-8 inline-block max-w-hero-sub text-hero-sub text-white',
              'max-bs-xl:max-w-hero-sub-lg max-bs-md:text-hero-sub-sm',
            )}
          >
            {heroContent.subheadline}
          </Reveal>

          <Reveal delay={HERO_REVEAL_DELAY.cta}>
            <AgencyButton href={heroContent.cta.href} label={heroContent.cta.label} />
          </Reveal>
        </div>

        <HeroScrollCue
          targetId={heroContent.scrollCue.targetId}
          label={heroContent.scrollCue.label}
          accessibleLabel={heroContent.scrollCue.accessibleLabel}
        />
      </Container>
    </section>
  );
}
