'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

import { LazyVideo } from '@/components/shared/lazy-video';
import { cn } from '@/lib/utils';
import type { ServiceFaqEntry } from '@/types/service-detail';

/** `.accordion_box .accordion` — one row, and the rule that divides it. */
const ROW = cn('mb-5 border-b border-white/10 pb-5', 'last:mb-0 last:border-b-0 last:pb-0');

export interface ServiceFaqAccordionProps {
  /** The questions, in render order. The first is open initially. */
  readonly faqs: readonly ServiceFaqEntry[];
}

/**
 * `.ai-download-inner` — the accordion and the clip it drives.
 *
 * The two are one component because they are one control: opening a question is
 * what swaps the clip, and splitting them would mean lifting the open index into
 * a parent that has no other reason to be a Client Component.
 *
 * **Buttons inside headings.** Each question is an `<h3>` wrapping a `<button>`,
 * which is the pattern the ARIA authoring practices specify for a disclosure
 * accordion: the heading keeps the question in the document outline so a screen
 * reader can jump between questions, and the button carries `aria-expanded` and
 * `aria-controls` so its state is announced. The reference uses a bare `<div>`
 * with a click handler — not focusable, not announced, not operable from a
 * keyboard at all.
 *
 * Only one panel is open at a time, matching the original.
 *
 * @param props - See {@link ServiceFaqAccordionProps}.
 */
export function ServiceFaqAccordion({ faqs }: ServiceFaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState(faqs[0]?.id);
  const open = faqs.find((faq) => faq.id === openId) ?? faqs[0];

  if (open === undefined) return null;

  return (
    <div
      className={cn(
        'relative z-[1] flex w-full flex-col items-center gap-10 overflow-hidden bg-drawer p-10',
        'max-bs-md:p-5',
      )}
    >
      {/* `.bg-shape` — the mesh pinned to the panel's left edge. */}
      <Image
        src="/assets/img/download/net-img.png"
        alt=""
        width={395}
        height={206}
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-full w-auto opacity-40"
      />

      {/* `.ai-download-book` — only the open entry's clip is mounted. */}
      <div className="relative w-full text-center">
        <div className="relative mx-auto aspect-[4/5] w-[360px] max-w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
          <LazyVideo key={open.id} clip={open.clip} sizes="360px" />
        </div>
      </div>

      {/* `.accordion_box` */}
      <div className="w-full">
        {faqs.map((faq) => {
          const isOpen = faq.id === open.id;
          const panelId = `${baseId}-${faq.id}`;

          return (
            <div key={faq.id} className={ROW}>
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(faq.id)}
                  className={cn(
                    'relative flex w-full cursor-pointer items-center justify-between gap-4 pr-[30px] text-left',
                    'font-body text-xl font-semibold transition-colors duration-300',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
                    isOpen ? 'text-lime' : 'text-white hover:text-white/80',
                  )}
                >
                  {faq.question}

                  {/* `.icon-outer` — a chevron that flips when the row opens. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute right-0 top-1/2 -translate-y-1/2 text-base transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                  >
                    <svg width="16" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                      <path d="M17 1L9 9L1 1" stroke="currentColor" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div id={panelId} hidden={!isOpen} className="pt-[15px]">
                <p className="m-0 leading-[1.6] text-white/70">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
