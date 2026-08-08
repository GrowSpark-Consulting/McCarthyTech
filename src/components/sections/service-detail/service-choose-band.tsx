import { LazyVideo } from '@/components/shared/lazy-video';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { ServiceChooseCard, ServiceDetail } from '@/types/service-detail';

/** DOM id the band's heading carries, referenced by `aria-labelledby`. */
const HEADING_ID = 'service-choose-heading';

/** `data-wow-delay` on each card, converted to seconds. */
const CARD_STAGGER_S = 0.15;

/** `.choose-card` — the resting state and everything hover moves. */
const CARD = cn(
  'group relative flex h-full flex-col overflow-hidden rounded-2xl',
  'border border-[#e8e8e8]/10 bg-brand-pill shadow-[0_10px_30px_rgba(0,0,0,0.3)]',
  'duration-[400ms] transition-[transform,border-color,box-shadow] ease-house',
  'hover:-translate-y-2 hover:border-lime/55',
  'hover:shadow-[0_22px_46px_rgba(0,0,0,0.45),0_0_0_1px_rgba(196,240,18,0.18)]',
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
);

/** `.choose-card__index` — the ordinal pinned to the clip's corner. */
const INDEX_CHIP = cn(
  'absolute left-[14px] top-[14px] z-[2] rounded-md px-[11px] py-1',
  'bg-lime font-heading text-sm font-bold tracking-[0.08em] text-ink',
  'shadow-[0_0_14px_rgba(196,240,18,0.5)]',
);

/**
 * `.choose-card__body::before` — the accent rule that draws itself on hover.
 *
 * Zero-width at rest and 56px once the card is hovered, inset to align with the
 * body's own left padding rather than the card edge.
 */
const BODY = cn(
  'relative flex-1 p-[26px_28px_30px]',
  "before:absolute before:left-7 before:top-0 before:h-[3px] before:w-0 before:bg-lime before:content-['']",
  'before:duration-[450ms] before:shadow-[0_0_12px_#c4f012] before:transition-[width] before:ease-house',
  'group-hover:before:w-14',
  'motion-reduce:before:transition-none',
);

interface ChooseCardProps {
  readonly card: ServiceChooseCard;
  readonly index: number;
}

/** One card: a 16:10 clip with an ordinal, over a caption body. */
function ChooseCard({ card, index }: ChooseCardProps) {
  return (
    <ScrollReveal delay={index * CARD_STAGGER_S} className="h-full">
      <article className={CARD}>
        {/* `.choose-card__media` */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <span className={INDEX_CHIP}>{card.index}</span>

          <LazyVideo
            clip={card.clip}
            sizes="(max-width: 767px) 100vw, 50vw"
            className={cn(
              'duration-[600ms] transition-transform ease-house',
              'group-hover:scale-[1.06] motion-reduce:transition-none',
            )}
          />

          {/*
            `::after` — a scrim over the clip's lower half. It sits above the
            video and below the ordinal, which is why the chip carries `z-[2]`.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-choose-card-scrim"
          />
        </div>

        <div className={BODY}>
          <h3 className="mb-2.5 font-heading text-[26px] font-normal leading-[1.15] text-white max-bs-lg:text-[23px]">
            {/* Decorative: the title reads the same without it, and a screen
                reader announcing "rocket" mid-heading helps nobody. */}
            <span aria-hidden="true">{card.emoji} </span>
            {card.titleLead} <span className="text-lime">{card.titleAccent}</span>
          </h3>

          <p className="m-0 text-[15px] leading-[1.5] text-muted">
            <span className="font-semibold text-white">Focus:</span> {card.focus}
          </p>
        </div>
      </article>
    </ScrollReveal>
  );
}

export interface ServiceChooseBandProps {
  /** The service being rendered. Must carry a `chooseBand`. */
  readonly service: ServiceDetail;
}

/**
 * `.award` — the "why leading brands choose us" grid.
 *
 * A 2×2 of clip cards on a meshed panel. The band carries only an eyebrow, no
 * heading: the reference's `.sec-title-three` here holds a `.sub-title` and
 * nothing else. That would leave the section without an accessible name, so the
 * eyebrow is promoted to a visually identical `<h2>` — same 16px uppercase
 * treatment, same lime square, but now something a screen reader can navigate to
 * and something the document outline records.
 *
 * A Server Component apart from the per-card reveal and the clips.
 *
 * @param props - See {@link ServiceChooseBandProps}.
 */
export function ServiceChooseBand({ service }: ServiceChooseBandProps) {
  const { chooseBand } = service;

  if (chooseBand === undefined) return null;

  return (
    <section aria-labelledby={HEADING_ID} className="mt-[70px]">
      <Container width="fluid">
        {/* `.ai-award-wrap.mlr-20` */}
        <div
          className={cn(
            'relative z-[1] mx-5 bg-drawer p-[20px_21px_80px]',
            'max-bs-md:mx-0 max-bs-md:p-[20px_10px_80px]',
            "before:absolute before:inset-0 before:-z-[1] before:content-['']",
            'before:bg-ai-award-net before:bg-cover before:bg-center before:bg-no-repeat',
          )}
        >
          <SectionEyebrow as="h2" id={HEADING_ID} tone="square" className="mb-[70px]">
            {chooseBand.eyebrow}
          </SectionEyebrow>

          {/* `.choose-grid` */}
          <div className="grid grid-cols-2 gap-6 max-bs-md:grid-cols-1 max-bs-md:gap-[18px]">
            {chooseBand.cards.map((card, index) => (
              <ChooseCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
