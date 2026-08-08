'use client';

import { useCallback, useId, useState } from 'react';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ServiceSubProcessStep } from '@/types/service-detail';

export interface ServiceSubProcessAccordionProps {
  readonly steps: readonly ServiceSubProcessStep[];
}

/**
 * `.service_process_faq` — the four-step process accordion.
 *
 * The reference splits this into two columns: an accordion on the left holding
 * the descriptions, and a plain numbered list on the right that mirrors the
 * same four titles and drives the same panels. That duplication exists to give
 * the accordion a static-looking companion at rest; it also means a screen
 * reader would meet each step's name twice with no indication the two lists
 * are the same control.
 *
 * Reproduced here as a single accordion instead — same four steps, same
 * open/closed behaviour, one set of controls. `ServiceFaqAccordion` already
 * owns this exact pattern (a `<button>` with `aria-expanded`/`aria-controls`,
 * grid-row height transition) for the FAQ bands; this is that pattern applied
 * to four process steps rather than reimplemented.
 *
 * @param props - See {@link ServiceSubProcessAccordionProps}.
 */
export function ServiceSubProcessAccordion({ steps }: ServiceSubProcessAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id ?? null);
  const baseId = useId();

  const toggle = useCallback(
    (id: string) => setOpenId((current) => (current === id ? null : id)),
    [],
  );

  return (
    <div className="mt-[60px] border-t border-white/10 pt-[60px]">
      <h2 className="mb-10 font-heading text-[42px] font-normal leading-[52px] tracking-[-0.03em] text-white max-bs-lg:text-[32px] max-bs-lg:leading-[1.3]">
        Service process
      </h2>

      <ol className="m-0 flex list-none flex-col gap-4 p-0">
        {steps.map((step, index) => {
          const isOpen = openId === step.id;
          const triggerId = `${baseId}-trigger-${step.id}`;
          const panelId = `${baseId}-panel-${step.id}`;

          return (
            <li key={step.id}>
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
                    onClick={() => toggle(step.id)}
                    className={cn(
                      'flex w-full items-center gap-5 px-7 py-6 text-left',
                      'font-heading text-lg leading-snug tracking-[-0.02em] text-white',
                      'transition-colors duration-300 ease-out max-bs-md:px-5 max-bs-md:text-base',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
                    )}
                  >
                    <span aria-hidden="true" className="font-body text-sm text-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">{step.title}</span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full',
                        'border border-white/[0.12] bg-svc-well text-lime transition-transform duration-300 ease-out',
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
                    <p className="m-0 px-7 pb-7 pl-[62px] text-[15px] leading-[1.75] text-svc-muted max-bs-md:px-5 max-bs-md:pb-6 max-bs-md:pl-5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
