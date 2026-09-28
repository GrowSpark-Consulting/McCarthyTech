import Image from 'next/image';

import { BrandMark } from '@/components/layout/brand-logo';
import { LazyVideo } from '@/components/shared/lazy-video';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { ThmButton } from '@/components/ui/thm-button';
import { cn } from '@/lib/utils';
import type {
  ServiceDetail,
  ServiceFeatureCard,
  ServiceFeatureOrnament,
} from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-features-heading';

/** `data-wow-delay` on the cards, converted to seconds. */
const CARD_STAGGER_S = 0.1;

/**
 * The image overlays, each with its own placement and idle motion.
 *
 * Held as a lookup rather than composed at the call site so a card's data only
 * has to name one, and so a new ornament is a compile error here rather than a
 * card that silently renders bare. The `logo` ornament is drawn rather than an
 * image, so it is rendered by {@link LogoOrnament} instead.
 */
const ORNAMENTS: Record<
  Exclude<ServiceFeatureOrnament, 'logo'>,
  { readonly src: string; readonly className: string; readonly size: number }
> = {
  /** A scanning bar pinned to the clip's left edge. */
  scan: {
    src: '/assets/img/feature/scan.png',
    className: 'left-0 top-[30px] animate-bounce motion-reduce:animate-none',
    size: 200,
  },
  /** A ring turning once every 20 seconds. */
  circle: {
    src: '/assets/img/feature/circle.png',
    className:
      'left-[70px] top-5 max-bs-xl:left-[50px] max-bs-xl:top-1.5 max-bs-md:left-[20%] max-bs-md:top-[30px] max-bs-md:w-3/5 [&_img]:animate-[spin_20s_linear_infinite] [&_img]:motion-reduce:animate-none',
    size: 200,
  },
  /** A shield, dead centre and above the dotted wire. */
  security: {
    src: '/assets/img/feature/security.png',
    className: 'left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 max-w-[110px]',
    size: 140,
  },
};

/** Where the logo ornament sits: centred on the clip. */
const LOGO_ORNAMENT_CLASS =
  'left-1/2 top-[20%] -translate-x-1/2 max-bs-lg:top-[10%] max-bs-md:top-[14%] max-bs-md:max-w-[22%]';

/**
 * The logo in a glowing ring, breathing.
 *
 * Keeps the 147×160 footprint of the ring artwork it replaces — the ring a 93px
 * circle in the box's upper part — so the placement above is unchanged, and is
 * sized in percentages so it scales under the `max-w-[22%]` cap on phones. The
 * ring, its glow and the breathing zoom are all on the frame; the logo inside
 * is the untouched file.
 */
function LogoOrnament() {
  return (
    <span className="relative block aspect-[147/160] w-[147px] max-w-full animate-zoominup motion-reduce:animate-none">
      <span
        className={cn(
          'absolute left-[18.4%] top-[16.9%] aspect-square w-[63.3%] rounded-full',
          'bg-[linear-gradient(225deg,#25a5a3_0%,#336fbd_100%)]',
          'shadow-[0_0_18px_2px_rgba(0,202,158,0.35),0_0_32px_6px_rgba(22,89,211,0.22)]',
          'max-bs-md:shadow-[0_0_10px_1px_rgba(0,202,158,0.35),0_0_18px_3px_rgba(22,89,211,0.22)]',
        )}
      >
        <span className="absolute inset-[11%] flex items-center justify-center rounded-full bg-[#020411]">
          <BrandMark className="h-auto w-[58%]" />
        </span>
      </span>
    </span>
  );
}

/**
 * `.xb-item--inner.xb-border` — the frosted panel every card sits in.
 *
 * A 5% white sheen over a 40px backdrop blur, so the card picks up whatever is
 * behind it rather than reading as a flat tile.
 */
const CARD_INNER = cn(
  'h-full rounded-[10px] bg-glass-sheen p-5 backdrop-blur-[40px]',
  'shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
);

interface FeatureCardProps {
  readonly card: ServiceFeatureCard;
  readonly index: number;
}

/** One card: a clip, an optional ornament over it, and a caption below. */
function FeatureCard({ card, index }: FeatureCardProps) {
  const ornament =
    card.ornament === undefined || card.ornament === 'logo' ? undefined : ORNAMENTS[card.ornament];

  return (
    <ScrollReveal
      delay={index * CARD_STAGGER_S}
      className={cn(
        'h-full',
        card.wide === true ? 'bs-lg:col-span-2' : 'bs-lg:col-span-1',
        card.orderFirst === true && 'bs-lg:order-first',
      )}
    >
      <article className={CARD_INNER}>
        <div className="relative z-[1] overflow-hidden rounded-[10px] shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]">
          <div className="relative aspect-[16/10]">
            <LazyVideo
              clip={card.clip}
              sizes={
                card.wide === true
                  ? '(max-width: 991px) 100vw, 66vw'
                  : '(max-width: 991px) 100vw, 33vw'
              }
            />
          </div>

          {card.ornament === 'logo' ? (
            <span aria-hidden="true" className={cn('absolute', LOGO_ORNAMENT_CLASS)}>
              <LogoOrnament />
            </span>
          ) : null}

          {ornament === undefined ? null : (
            <span aria-hidden="true" className={cn('absolute', ornament.className)}>
              <Image
                src={ornament.src}
                alt=""
                width={ornament.size}
                height={ornament.size}
                className="h-auto w-full"
              />
            </span>
          )}

          {/*
            `.animated-dot` — five dots travelling a dotted wire behind the
            shield. Only the security card has one, so it rides along with that
            ornament rather than being a fifth entry in the lookup.
          */}
          {card.ornament === 'security' ? (
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[5px] w-[54%] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            >
              <span className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-dotted border-white">
                {[0, 2, 4, 6, 8].map((delay) => (
                  <span
                    key={delay}
                    className={cn(
                      'absolute -top-0.5 size-1 rounded-full bg-white',
                      'animate-[left-to-right_10s_linear_infinite] motion-reduce:animate-none',
                      delay === 0 && 'delay-0',
                      delay === 2 && '[animation-delay:2s]',
                      delay === 4 && '[animation-delay:4s]',
                      delay === 6 && '[animation-delay:6s]',
                      delay === 8 && '[animation-delay:8s]',
                    )}
                  />
                ))}
              </span>
            </span>
          ) : null}
        </div>

        <h3 className="mb-[5px] mt-[30px] font-heading text-[22px] font-normal leading-[1.3] tracking-[-0.04em] text-white max-bs-md:text-[21px]">
          {card.title}
        </h3>
        <p className={cn('mb-0 text-muted', card.wide === true && 'max-w-[703px]')}>
          {card.description}
        </p>
      </article>
    </ScrollReveal>
  );
}

export interface ServiceFeaturesBandProps {
  /** The service being rendered. Must carry a `featuresBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#features` — the mixed-width grid of capability cards.
 *
 * **On the row order.** The reference lists the wide card first in source and
 * then gives the card after it `order-lg-first`, so at desktop the narrow card
 * jumps ahead of it and the row reads narrow-then-wide. Reproduced with an
 * explicit order rather than by reordering the data, because the source order is
 * what a screen reader and a crawler follow — and the original's source order is
 * the one that matches the content's importance.
 *
 * A Server Component apart from the per-card reveal and the clips.
 *
 * @param props - See {@link ServiceFeaturesBandProps}.
 */
export function ServiceFeaturesBand({ service }: ServiceFeaturesBandProps) {
  const { featuresBand } = service;

  if (featuresBand === undefined) return null;

  return (
    <section id="features" aria-labelledby={HEADING_ID} className="pb-[155px] max-bs-md:pb-20">
      <Container>
        <div className="mb-[45px] text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-base uppercase text-white">
            <Image
              src="/assets/img/icon/sub-left-icon.png"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            {featuresBand.eyebrow}
          </span>

          <h2
            id={HEADING_ID}
            className={cn(
              'ml-[105px] font-heading text-[52px] font-normal leading-[1.5] tracking-display text-white',
              'max-bs-xl:ml-[50px] max-bs-lg:ml-0 max-bs-lg:leading-[1.3] max-bs-md:text-[32px]',
            )}
          >
            {/*
              A 305×50 pill with the ornament overflowing inside it — the image
              is 230% of the pill's width and pulled 200px left, so only a moving
              slice of it is ever visible through the clip.
            */}
            <span
              aria-hidden="true"
              className="relative mr-[30px] inline-block h-[50px] w-[305px] overflow-hidden rounded-full align-middle max-bs-md:mr-0 max-bs-md:w-[200px]"
            >
              <Image
                src="/assets/img/icon/artificial-intelligence-11761.gif"
                alt=""
                width={700}
                height={200}
                unoptimized
                className="absolute left-[-200px] top-1/2 max-w-[230%] -translate-y-1/2 object-cover"
              />
            </span>
            {featuresBand.title}{' '}
            <span className="inline-block translate-x-[18px] translate-y-[-15px] align-middle max-bs-lg:translate-x-0 max-bs-lg:translate-y-0">
              <ThmButton href={featuresBand.cta.href} label={featuresBand.cta.label} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[30px] bs-md:grid-cols-2 bs-lg:grid-cols-3">
          {featuresBand.cards.map((card, index) => (
            <FeatureCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
