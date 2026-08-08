import { LazyVideo } from '@/components/shared/lazy-video';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { TextReveal } from '@/components/shared/text-reveal';
import { AppLink } from '@/components/ui/app-link';
import { Container } from '@/components/ui/container';
import { DiagonalArrowGlyph } from '@/components/ui/diagonal-arrow-glyph';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { ServiceDetail, ServiceOfferingCard } from '@/types/service-detail';

/** DOM id the statement carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-offerings-heading';

/**
 * `data-wow-delay` on each card, converted to seconds.
 *
 * A flat 150ms step. Held as a constant rather than computed from the index so
 * that a fifth card does not silently extend the stagger to 600ms — if the
 * reference ever adds one, its delay is a decision, not an accident.
 */
const CARD_STAGGER_S = 0.15;

/** `.ai-service-img` — four across, halving twice on the way down. */
const GRID = cn(
  'grid gap-5',
  'grid-cols-4',
  'ref-sm:grid-cols-2 ref-xs:grid-cols-2 ref-xxs:grid-cols-1',
);

/**
 * `.ai-img-content` — the panel that scales up from the card's bottom edge.
 *
 * Hidden by `transform: scaleY(0)` and `opacity: 0` rather than `display: none`,
 * which matters for more than the animation: the caption and its link stay in
 * the accessibility tree throughout, so a screen reader reads every card in full
 * without anything having to be hovered.
 */
const PANEL = cn(
  'absolute bottom-[-1px] left-0 z-[1] w-full overflow-hidden bg-ink',
  'duration-[400ms] origin-bottom scale-y-0 opacity-0 transition-all',
  // Revealed on hover, and on focus landing anywhere inside — without the
  // second, the arrow is a focusable control that a keyboard user can reach
  // but never see.
  'group-hover:scale-y-100 group-hover:opacity-100',
  'group-focus-within:scale-y-100 group-focus-within:opacity-100',
  'motion-reduce:transition-none',
  // `min-height` and padding, band by band.
  'min-h-[234px] p-[50px_30px_30px]',
  'ref-xl:min-h-[185px] ref-xl:p-[50px_20px_20px]',
  'ref-lg:min-h-[185px] ref-lg:p-[50px_20px_20px]',
  'ref-md:min-h-[120px] ref-md:p-[45px_20px_20px]',
  'ref-sm:min-h-[200px] ref-sm:p-[45px_20px_20px]',
  'ref-xs:min-h-[180px] ref-xs:p-[45px_10px_20px]',
  'ref-xxs:min-h-[200px] ref-xxs:p-[45px_20px_20px]',
  // `::before` — a second slab offset 20px down, which is what gives the panel
  // its layered edge instead of one flat rectangle.
  "before:absolute before:left-0 before:top-5 before:-z-[1] before:size-full before:bg-drawer before:content-['']",
);

/** `.ai-img-content .arrow` — the ring in the panel's corner. */
const ARROW = cn(
  'absolute inline-flex items-center justify-center rounded-full border border-rule',
  'bg-transparent text-lime transition-colors duration-300',
  'hover:bg-lime hover:text-ink focus-visible:bg-lime focus-visible:text-ink',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
  'bottom-[30px] right-[30px] size-[53px]',
  'ref-xl:bottom-[25px] ref-xl:right-5 ref-xl:size-[43px]',
  'ref-lg:bottom-[25px] ref-lg:right-5 ref-lg:size-[43px]',
  'ref-md:bottom-5 ref-md:right-3 ref-md:size-10',
  'ref-sm:bottom-5 ref-sm:right-[21px] ref-sm:size-10',
  'ref-xs:bottom-5 ref-xs:right-[21px] ref-xs:size-10',
  'ref-xxs:bottom-5 ref-xxs:right-[21px] ref-xxs:size-10',
);

/** `.ai-img-content .title`. */
const CARD_TITLE = cn(
  'mb-1.5 font-heading font-normal tracking-caption text-white',
  'max-w-[250px] text-svc-card-title',
  'ref-lg:max-w-[210px] ref-lg:text-svc-card-title-lg',
  'ref-md:max-w-[210px] ref-md:text-svc-card-title-md',
  'ref-sm:max-w-[250px] ref-sm:text-svc-card-title-sm',
  'ref-xs:max-w-[230px] ref-xs:text-svc-card-title-sm',
  'ref-xxs:max-w-[230px] ref-xxs:text-svc-card-title-sm',
);

interface OfferingCardProps {
  readonly card: ServiceOfferingCard;
  readonly index: number;
}

/**
 * One card: a 4:5 clip with a caption panel that rises over it.
 *
 * The clip's own scale-up on hover is driven from the same `group` as the panel,
 * so the two are always in step and neither needs JavaScript.
 */
function OfferingCard({ card, index }: OfferingCardProps) {
  return (
    <ScrollReveal variant="fadeInLeft" delay={index * CARD_STAGGER_S}>
      <div className="group relative z-[1]">
        {/*
          `.appdev-page .ai-service-img-item .img`.

          The `4/5` ratio is on this wrapper rather than on the clip, where the
          original puts it. Both layers inside are absolutely positioned fills,
          so a wrapper that took its height from them would collapse to zero
          before the clip mounts — and a 0px-tall card cannot be hovered, which
          would make the whole caption panel unreachable. Holding the box open
          here gives the same rendered geometry and no dependency on load order.
        */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
          <LazyVideo
            clip={card.clip}
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 25vw"
            className={cn(
              'duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transition-transform',
              'group-hover:scale-[1.06] motion-reduce:transition-none',
            )}
          />
        </div>

        <div className={PANEL}>
          <h3 className={CARD_TITLE}>{card.title}</h3>
          <p
            className={cn(
              'mb-0 leading-[1.2] text-white',
              'ref-lg:max-w-[200px] ref-xs:max-w-[200px]',
            )}
          >
            {card.description}
          </p>

          <AppLink href={card.href} className={ARROW}>
            <DiagonalArrowGlyph className="max-bs-xl:w-[21px]" />
            {/* Four arrows would otherwise be four identical unnamed links. */}
            <span className="sr-only">{card.title}</span>
          </AppLink>
        </div>
      </div>
    </ScrollReveal>
  );
}

export interface ServiceOfferingsBandProps {
  /** The service being rendered. Must carry an `offeringsBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#service` — the offerings grid.
 *
 * The band the overview's corner cue drops to, which is why the id lives on the
 * section rather than on a wrapper.
 *
 * Its heading row is a single `justify-between` flex line holding two unequal
 * blocks — a 975px statement and a 668px paragraph — that simply wrap onto
 * separate lines once they no longer fit. There is no breakpoint governing it;
 * the widths do the work.
 *
 * A Server Component apart from the per-card reveal, the clips, and the
 * statement's word sweep.
 *
 * @param props - See {@link ServiceOfferingsBandProps}.
 */
export function ServiceOfferingsBand({ service }: ServiceOfferingsBandProps) {
  const { offeringsBand } = service;

  if (offeringsBand === undefined) return null;

  return (
    <section id="service" aria-labelledby={HEADING_ID} className="pt-[30px]">
      <Container width="fluid">
        {/* `.ai-service-wrap.sec-border.mlr-20` */}
        <div
          className={cn(
            'mx-5 border border-white/15 px-5 py-[30px]',
            'max-bs-md:mx-0 max-bs-md:px-[10px]',
          )}
        >
          {/* `.ai-service-heading.ul_li_between.mb-60.mt-40` */}
          <div className="mb-[60px] mt-10 flex flex-wrap items-center justify-between gap-[25px]">
            <div className="max-w-[975px]">
              <SectionEyebrow tone="square" className="mb-[25px]">
                {offeringsBand.eyebrow}
              </SectionEyebrow>

              <TextReveal
                id={HEADING_ID}
                className={cn(
                  'font-heading font-normal tracking-display text-white',
                  'text-svc-band-title ref-md:text-svc-band-title-md ref-sm:text-svc-band-title-sm',
                  'ref-xs:text-svc-band-title-xs ref-xxs:text-svc-band-title-xxs',
                )}
              >
                {offeringsBand.statement}
              </TextReveal>
            </div>

            <p className="mb-0 max-w-[668px] text-svc-band-lead">{offeringsBand.body}</p>
          </div>

          <div className={GRID}>
            {offeringsBand.cards.map((card, index) => (
              <OfferingCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
