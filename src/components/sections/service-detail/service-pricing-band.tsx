'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { ThmButton } from '@/components/ui/thm-button';
import { cn } from '@/lib/utils';
import type { ServiceDetail, ServicePricingPlan } from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-pricing-heading';

/** `.pricing-item.xb-border` — one plan card. */
const PLAN_CARD = cn(
  'relative h-full overflow-hidden rounded-[10px] bg-pricing-card bg-cover bg-center p-[30px]',
  'border border-white/10 shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
);

/** `.xb-tag` — the corner label. */
const TAG = cn(
  'absolute right-[30px] top-[30px] rounded-full border border-white/20 px-[14px] py-1',
  'font-body text-xs font-medium uppercase tracking-[0.06em] text-white',
);

interface PlanProps {
  readonly plan: ServicePricingPlan;
  readonly yearly: boolean;
  readonly onToggle: () => void;
  readonly toggleId: string;
}

/** One plan: icon, price, call to action, then what it includes. */
function Plan({ plan, yearly, onToggle, toggleId }: PlanProps) {
  const hasToggle = plan.yearly !== undefined;
  const price = hasToggle && yearly ? plan.yearly : plan.monthly;

  return (
    <div className={cn(PLAN_CARD, plan.featured === true && 'border-lime/40')}>
      <span className={TAG}>{plan.tag}</span>

      <Image src={plan.icon} alt="" width={48} height={48} aria-hidden="true" />

      <p className="mb-0 mt-5 font-heading text-[44px] font-normal leading-none tracking-display text-white">
        ${price}
        {plan.period === undefined ? null : (
          <sub className="ml-1 align-baseline font-body text-base font-normal text-muted">
            {plan.period}
          </sub>
        )}
      </p>

      {hasToggle ? (
        <p className="mb-0 mt-3 flex items-center gap-2.5 text-sm text-muted">
          <span id={toggleId}>Monthly</span>
          {/*
            A real switch rather than the reference's bare `<span class="toggle">`.
            It changes the price the visitor is quoted, so it has to be operable
            from the keyboard and announce its state — `role="switch"` carries
            both, and `aria-checked` says which billing period is active.
          */}
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-labelledby={toggleId}
            onClick={onToggle}
            className={cn(
              'relative h-6 w-11 shrink-0 rounded-full border border-white/20 transition-colors duration-300',
              yearly ? 'bg-lime' : 'bg-white/10',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
            )}
          >
            <span
              className={cn(
                'absolute top-[3px] size-4 rounded-full transition-all duration-300',
                yearly ? 'left-[24px] bg-ink' : 'left-[3px] bg-white',
              )}
            />
          </button>
          <span>Yearly</span>
        </p>
      ) : null}

      <div className="mb-[25px] mt-[25px]">
        <ThmButton href={plan.ctaHref} label={plan.ctaLabel} />
      </div>

      <ul className="m-0 list-none p-0">
        {plan.features.map((feature) => (
          <li key={feature} className="mb-3 flex items-start gap-2.5 text-white">
            <span
              aria-hidden="true"
              className="mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-ink"
            >
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface ServicePricingBandProps {
  /** The service being rendered. Must carry a `pricingBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#pricing` — the plan comparison.
 *
 * The billing toggle is shared: flipping it on the plan that offers a yearly
 * rate is a page-level choice, not a per-card one, so the state lives here.
 *
 * @param props - See {@link ServicePricingBandProps}.
 */
export function ServicePricingBand({ service }: ServicePricingBandProps) {
  const toggleId = useId();
  const [yearly, setYearly] = useState(false);
  const { pricingBand } = service;

  if (pricingBand === undefined) return null;

  return (
    <section
      id="pricing"
      aria-labelledby={HEADING_ID}
      className="bg-pricing-stage bg-cover bg-center bg-no-repeat pb-[150px] pt-[145px] max-bs-md:py-20"
    >
      <Container>
        <div className="mb-[30px] text-center">
          <SectionEyebrow tone="dot" className="mb-[25px] block">
            {pricingBand.eyebrow}
          </SectionEyebrow>

          <h2
            id={HEADING_ID}
            className="font-heading text-[52px] font-normal leading-[1.2] tracking-display text-white max-bs-md:text-[32px]"
          >
            {pricingBand.titleLead}{' '}
            <span
              aria-hidden="true"
              className="relative mx-1 inline-block h-[50px] w-[120px] overflow-hidden rounded-full bg-aurora align-middle"
            />{' '}
            {pricingBand.titleTrail}
          </h2>
        </div>

        <div className="flex items-start gap-[30px] max-bs-lg:flex-col">
          {pricingBand.plans.map((plan) => (
            <div
              key={plan.id}
              className={cn('w-full', plan.featured === true ? 'bs-lg:w-7/12' : 'bs-lg:w-5/12')}
            >
              <Plan
                plan={plan}
                yearly={yearly}
                onToggle={() => setYearly((current) => !current)}
                toggleId={`${toggleId}-${plan.id}`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
