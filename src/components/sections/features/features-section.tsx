import Image from 'next/image';

import { FeatureCard } from '@/components/sections/features/feature-card';
import { FeatureOrbit } from '@/components/sections/features/feature-orbit';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { featuresContent, leftFeatureHighlights, rightFeatureHighlights } from '@/lib/features';
import { cn } from '@/lib/utils';
import type { FeatureColumnSide, FeatureHighlight } from '@/types/features';

/**
 * Per-card entrance delay, in seconds.
 *
 * The reference staggers its three cards at 100/200/300ms via
 * `data-wow-delay`, so each column cascades rather than snapping in as a block.
 */
const CARD_STAGGER_S = 0.1;

/** Gap between cards in a column — `.xb-feature-item2:not(:last-child)`. */
const CARD_GAP_CLASS = 'mb-[82px] last:mb-0 max-bs-lg:mb-[30px]';

/**
 * Renders one mirrored column of feature cards.
 */
function FeatureColumn({
  highlights,
  side,
}: {
  readonly highlights: readonly FeatureHighlight[];
  readonly side: FeatureColumnSide;
}) {
  return (
    <div className={side === 'left' ? 'mr-6 max-bs-xl:mr-0' : 'ml-6 max-bs-xl:ml-0'}>
      {highlights.map((highlight, index) => (
        <ScrollReveal
          key={highlight.id}
          delay={(index + 1) * CARD_STAGGER_S}
          className={CARD_GAP_CLASS}
        >
          <FeatureCard highlight={highlight} side={side} />
        </ScrollReveal>
      ))}
    </div>
  );
}

/**
 * Features section — "Why businesses choose us".
 *
 * Two mirrored columns of capsules flanking a dashed-ring ornament. The column
 * order is deliberate: the right column is rendered *second* in the DOM but
 * ordered last only from 992px up, so on tablets the two card columns sit side
 * by side with the ornament dropping to a full-width row beneath them, and on
 * phones everything stacks in reading order.
 *
 * A Server Component; only the `ScrollReveal` wrappers hydrate.
 */
export function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="pt-[145px] max-bs-md:pt-20">
      <Container>
        <div className="mb-[50px] text-center">
          <SectionEyebrow>{featuresContent.eyebrow}</SectionEyebrow>

          <h2
            id="features-heading"
            className={cn(
              'block font-heading text-[62px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
            )}
          >
            {featuresContent.headingBefore}
            <span
              aria-hidden="true"
              className="relative inline-block h-20 w-[60px] max-bs-md:h-[45px]"
            >
              <Image
                src={featuresContent.headingOrnament.src}
                alt={featuresContent.headingOrnament.alt}
                width={featuresContent.headingOrnament.width}
                height={featuresContent.headingOrnament.height}
                // Animated GIF: the optimiser would flatten it to one frame.
                unoptimized
                className={cn(
                  'absolute -left-12 top-[9px] max-w-[160px]',
                  'max-bs-md:-top-5 max-bs-md:max-w-[140px]',
                )}
              />
            </span>
            {featuresContent.headingAfter}
          </h2>
        </div>

        <div className="grid items-center gap-[30px] bs-md:grid-cols-2 bs-lg:grid-cols-3">
          <FeatureColumn highlights={leftFeatureHighlights} side="left" />

          {/* Ordered last only from 992px, so the ornament sits between the two
              columns on desktop but below them on tablet. */}
          <div className="bs-lg:order-last">
            <FeatureColumn highlights={rightFeatureHighlights} side="right" />
          </div>

          <div className="max-bs-lg:col-span-full">
            <ScrollReveal variant="zoomIn">
              <FeatureOrbit />
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
