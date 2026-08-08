import { DecoratedHeading } from '@/components/sections/about/decorated-heading';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { aboutContent } from '@/lib/about';
import { cn } from '@/lib/utils';

/**
 * About section — the mission statement beneath the hero.
 *
 * A Server Component: it is pure content with no interactivity, so it ships as
 * static HTML and adds nothing to the hydration cost.
 *
 * Layout is a two-part split — an ornamented headline on the left, a narrow
 * paragraph on the right — that collapses to a single stacked column below
 * 1200px, exactly as `.about-sec-title` does in the reference.
 *
 * Carries `id="about"`, which is the target the hero's scroll cue resolves.
 */
export function AboutSection() {
  return (
    <section
      id={aboutContent.id}
      aria-labelledby="about-heading"
      className="pt-[140px] max-bs-md:pt-20"
    >
      <Container>
        <div className="mb-[30px] text-center">
          <SectionEyebrow>{aboutContent.eyebrow}</SectionEyebrow>
        </div>

        <div
          className={cn(
            'mb-[75px] flex items-start justify-between',
            'max-bs-xl:flex-col max-bs-xl:gap-[10px]',
          )}
        >
          <DecoratedHeading
            id="about-heading"
            segments={aboutContent.headingSegments}
            className={cn(
              'mb-0 block max-w-[874px] font-heading text-[52px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-md:text-[36px]',
            )}
          />

          <div className="my-auto">
            <p className="mb-0 mt-0 max-w-[450px] text-lg text-subtle">{aboutContent.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
