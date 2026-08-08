'use client';

import { useId, useState } from 'react';

import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-numbered-faq-heading';

export interface ServiceNumberedFaqBandProps {
  /** The service being rendered. Must carry a `numberedFaqBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#faq` — the numbered accordion.
 *
 * Distinct from the media-linked FAQ on the `hero-style--three` pages: no clip
 * swaps here, just an ordinal, a question, and an answer that opens beneath it.
 *
 * Built on real disclosure semantics — a `<button>` inside each heading, with
 * `aria-expanded` and `aria-controls` tying it to its panel. The reference
 * toggles classes on `<div>`s, which looks identical and tells a screen reader
 * nothing about what is open or what the control does.
 *
 * One panel at a time, matching the original's behaviour.
 *
 * @param props - See {@link ServiceNumberedFaqBandProps}.
 */
export function ServiceNumberedFaqBand({ service }: ServiceNumberedFaqBandProps) {
  const baseId = useId();
  const { numberedFaqBand } = service;
  const [openId, setOpenId] = useState(numberedFaqBand?.faqs[0]?.id);

  if (numberedFaqBand === undefined) return null;

  return (
    <section
      id="faq"
      aria-labelledby={HEADING_ID}
      className="relative bg-faq-stage bg-cover bg-center bg-no-repeat pb-[150px] pt-[145px] max-bs-md:py-20"
    >
      <Container>
        <div className="mb-[45px]">
          <SectionEyebrow tone="dot" className="mb-[25px] block">
            {numberedFaqBand.eyebrow}
          </SectionEyebrow>

          <h2
            id={HEADING_ID}
            className="font-heading text-[52px] font-normal leading-[1.2] tracking-display text-white max-bs-md:text-[32px]"
          >
            {numberedFaqBand.title}
          </h2>
        </div>

        <ul className="m-0 list-none p-0">
          {numberedFaqBand.faqs.map((faq) => {
            const isOpen = faq.id === openId;
            const panelId = `${baseId}-panel-${faq.id}`;
            const buttonId = `${baseId}-button-${faq.id}`;

            return (
              <li key={faq.id} className="border-b border-white/10">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? undefined : faq.id)}
                    className={cn(
                      'flex w-full items-center gap-5 py-6 text-left',
                      'font-heading text-[22px] font-normal tracking-[-0.03em] text-white',
                      'transition-colors duration-300 hover:text-lime',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
                      'max-bs-md:text-[18px]',
                    )}
                  >
                    <span aria-hidden="true" className="shrink-0 text-lime">
                      {faq.number}
                    </span>
                    <span className="flex-1">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'shrink-0 text-2xl leading-none transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-6 pl-[46px] pr-10 text-muted max-bs-md:pl-0"
                >
                  <p className="mb-0">{faq.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
