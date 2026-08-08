'use client';

import { useCallback, useId, useState } from 'react';
import { Plus } from 'lucide-react';

import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';
import type { ServiceFaq } from '@/types/service-sections';

export interface ServiceFaqAccordionProps {
  readonly faqs: readonly ServiceFaq[];
  readonly accent: ServiceAccent;
}

/**
 * The FAQ accordion.
 *
 * One panel open at a time, tracked by id rather than index so reordering the
 * data cannot silently change which question opens. The first is open on
 * arrival — an accordion that starts fully collapsed gives a visitor nothing to
 * read and no indication of what the answers look like.
 *
 * **Built by hand rather than pulled from a component library.** The pattern is
 * a disclosure: a `<button>` carrying `aria-expanded` and `aria-controls`, and a
 * region labelled by that button. That is the whole specification, and
 * implementing it directly avoids adding a dependency — plus the animation stays
 * ours rather than being fought with overrides.
 *
 * The panel animates via a `grid-template-rows` transition from `0fr` to `1fr`,
 * which is the one way to animate to a content-derived height without measuring
 * anything in JavaScript. `visibility` is toggled alongside it so a collapsed
 * answer is not reachable by keyboard or read out by a screen reader while it is
 * visually hidden.
 *
 * @param props - See {@link ServiceFaqAccordionProps}.
 */
export function ServiceFaqAccordion({ faqs, accent }: ServiceFaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const baseId = useId();
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  const toggle = useCallback(
    (id: string) => setOpenId((current) => (current === id ? null : id)),
    [],
  );

  return (
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        const triggerId = `${baseId}-trigger-${faq.id}`;
        const panelId = `${baseId}-panel-${faq.id}`;

        return (
          <li key={faq.id}>
            <div
              className={cn(
                'overflow-hidden rounded-[18px] border bg-svc-card transition-colors duration-500 ease-out',
                isOpen ? 'border-white/20' : 'border-white/[0.08]',
              )}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(faq.id)}
                  className={cn(
                    'flex w-full items-center justify-between gap-5 px-7 py-6 text-left',
                    'font-heading text-lg leading-snug tracking-[-0.02em] text-white',
                    'transition-colors duration-300 ease-out max-bs-md:px-5 max-bs-md:text-base',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
                  )}
                >
                  {faq.question}

                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-full',
                      'border border-white/[0.12] bg-svc-well transition-transform duration-300 ease-out',
                      accentClasses.text,
                      // 45° turns the plus into a cross, so the control reads as
                      // "close" without swapping the icon out.
                      isOpen && 'rotate-45',
                    )}
                  >
                    <Plus className="size-4" strokeWidth={2} />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={cn(
                  'grid transition-[grid-template-rows,visibility] duration-500 ease-out',
                  isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      'm-0 px-7 pb-7 text-[15px] leading-[1.75] text-svc-muted',
                      'max-bs-md:px-5 max-bs-md:pb-6',
                    )}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
