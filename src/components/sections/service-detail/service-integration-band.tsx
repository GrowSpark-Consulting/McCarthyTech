import Image from 'next/image';

import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { ThmButton } from '@/components/ui/thm-button';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-integration-heading';

/**
 * `.integration-logo` — one platform mark on its tile.
 *
 * The `::after` is a blurred aurora sitting two layers down, revealed on hover,
 * which is what makes a tile appear to light from behind rather than change
 * colour.
 */
const LOGO_TILE = cn(
  'group relative z-[1] mb-5 flex size-[110px] items-center justify-center rounded-[10px] bg-ink p-px',
  'transition-all duration-300 max-bs-lg:size-[90px] max-bs-md:size-[60px]',
  "before:absolute before:inset-0 before:-z-[1] before:bg-integration-tile before:bg-cover before:bg-center before:bg-no-repeat before:content-['']",
  "after:absolute after:inset-0 after:-z-[2] after:opacity-0 after:blur-[15px] after:transition-opacity after:duration-300 after:content-['']",
  'after:bg-aurora hover:after:opacity-100',
);

/** `.comparison-list` — one half of the before/after split. */
const COMPARISON_CARD = cn(
  'relative rounded-[10px] bg-comparison-card bg-cover bg-center',
  'shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
);

/** A tick or a cross, whichever the column calls for. */
function ListMark({ tone }: { readonly tone: 'yes' | 'no' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
        tone === 'yes' ? 'bg-mint text-ink' : 'bg-white/15 text-white',
      )}
    >
      {tone === 'yes' ? '✓' : '✕'}
    </span>
  );
}

export interface ServiceIntegrationBandProps {
  /** The service being rendered. Must carry an `integrationBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#integration` — the ecosystem claim and the before/after comparison.
 *
 * The logo columns counter-scroll: one runs down at 30s, the other up at 36s.
 * The mismatched paces are what stop the two reading as a single moving block,
 * and both are masked top and bottom by blurred slabs of the page's own canvas
 * colour so marks fade rather than clip at the column edges.
 *
 * Each column renders its logos **twice** — `marquee-y` translates exactly
 * `-50%`, so the second copy lands where the first began and the loop is
 * seamless. The duplicate run is `aria-hidden`; the platform names are carried
 * once, in the first.
 *
 * A Server Component: both marquees and the tile glow are pure CSS.
 *
 * @param props - See {@link ServiceIntegrationBandProps}.
 */
export function ServiceIntegrationBand({ service }: ServiceIntegrationBandProps) {
  const { integrationBand } = service;

  if (integrationBand === undefined) return null;

  const { eyebrow, title, capabilities, cta, logos, beforeTitle, before, afterTitle, after } =
    integrationBand;

  const half = Math.ceil(logos.length / 2);
  const columns = [logos.slice(0, half), logos.slice(half)];

  return (
    <section
      id="integration"
      aria-labelledby={HEADING_ID}
      className="bg-integrations-stage bg-cover bg-center bg-no-repeat pb-[150px] pt-10 max-bs-md:pb-20"
    >
      <Container>
        <div className="flex items-center gap-[30px] max-bs-lg:flex-col">
          <div className="w-1/2 max-bs-lg:w-full">
            <ScrollReveal>
              <SectionEyebrow tone="dot" className="mb-[30px] block">
                {eyebrow}
              </SectionEyebrow>

              <h2
                id={HEADING_ID}
                className="mb-2.5 font-heading text-[52px] font-normal leading-[1.2] tracking-display text-white max-bs-md:text-[32px]"
              >
                {title}
              </h2>

              <ul className="m-0 list-none p-0">
                {capabilities.map((line) => (
                  <li key={line} className="mb-5 flex items-center gap-2.5 font-medium text-white">
                    <ListMark tone="yes" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-[45px]">
                <ThmButton href={cta.href} label={cta.label} />
              </div>
            </ScrollReveal>
          </div>

          {/* `.integration-logo-wrap` — two counter-scrolling columns. */}
          <div
            className={cn(
              'relative flex max-h-[678px] w-1/2 justify-end gap-[30px] overflow-hidden',
              'max-bs-lg:w-full max-bs-lg:justify-center max-bs-md:max-h-[500px] max-bs-md:gap-5',
            )}
          >
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={cn(
                  'flex shrink-0 flex-col',
                  columnIndex === 0 ? 'animate-marquee-y' : 'animate-marquee-y-reverse',
                  'motion-reduce:animate-none',
                )}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
                    {column.map((logo) => (
                      <span key={logo} className={LOGO_TILE}>
                        <Image src={logo} alt="" width={72} height={72} className="max-w-[65%]" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* `.xb-shape` — blurred slabs that fade the columns at both ends. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[30px] -top-[90px] h-[201px] w-[110%] bg-ink blur-[25px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[52px] -left-[30px] h-[201px] w-[110%] bg-ink blur-[25px]"
            />
          </div>
        </div>

        {/* `.comparison-container` */}
        <div className="flex gap-[30px] pt-[42px] max-bs-lg:flex-col max-bs-lg:gap-[80px]">
          <div className={cn(COMPARISON_CARD, 'relative w-1/2 max-bs-lg:w-full')}>
            <h3 className="rounded-t-[10px] border-b border-white/20 bg-surface px-0 pb-1.5 pt-[13px] text-center font-heading text-[22px] font-normal tracking-[-0.04em] text-white">
              {beforeTitle}
            </h3>
            <ul className="m-0 list-none p-[45px_50px_50px] max-bs-md:p-[45px_20px_50px]">
              {before.map((line) => (
                <li
                  key={line}
                  className="mb-[15px] flex items-start gap-2.5 font-medium text-muted"
                >
                  <ListMark tone="no" />
                  {line}
                </li>
              ))}
            </ul>

            {/*
              `.comparison-vs-logo` — pinned to the seam between the two cards at
              desktop, and dropped below the first one once they stack.
            */}
            <span
              className={cn(
                'absolute right-[-40px] top-1/2 z-[2] flex size-[52px] -translate-y-1/2 items-center justify-center',
                'rounded-full bg-[#060E50] font-heading text-lg font-bold tracking-[-0.1em] text-white',
                "before:absolute before:inset-0 before:-z-[1] before:rounded-[inherit] before:bg-vs-badge before:content-['']",
                'max-bs-lg:bottom-[-40px] max-bs-lg:left-1/2 max-bs-lg:right-auto max-bs-lg:top-auto max-bs-lg:-translate-x-1/2 max-bs-lg:translate-y-0',
              )}
            >
              VS
            </span>
          </div>

          <div className={cn(COMPARISON_CARD, 'w-1/2 max-bs-lg:w-full')}>
            <h3 className="rounded-t-[10px] border-b border-white/20 bg-surface px-0 pb-1.5 pt-[13px] text-center font-heading text-[22px] font-normal tracking-[-0.04em] text-white">
              {afterTitle}
            </h3>
            <ul className="m-0 list-none p-[45px_50px_50px] max-bs-md:p-[45px_20px_50px]">
              {after.map((line) => (
                <li
                  key={line}
                  className="mb-[15px] flex items-start gap-2.5 font-medium text-white"
                >
                  <ListMark tone="yes" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
