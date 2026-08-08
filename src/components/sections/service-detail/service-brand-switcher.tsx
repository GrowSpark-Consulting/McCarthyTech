'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

import { cn } from '@/lib/utils';
import type { ServiceBrandEntry } from '@/types/service-detail';

/** The 10×12 chevron revealed beside the selected name. */
function SelectedArrow({ className }: { readonly className?: string }) {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <path
        d="M9.53033 6.53033C9.82322 6.23744 9.82322 5.76256 9.53033 5.46967L4.75736 0.6967C4.46447 0.403806 3.98959 0.403806 3.6967 0.696699C3.40381 0.989593 3.40381 1.46447 3.6967 1.75736L7.93934 6L3.6967 10.2426C3.40381 10.5355 3.40381 11.0104 3.6967 11.3033C3.98959 11.5962 4.46447 11.5962 4.75736 11.3033L9.53033 6.53033ZM0 6L-6.55671e-08 6.75L9 6.75L9 6L9 5.25L6.55671e-08 5.25L0 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** `.ai-brand-list li a` — one row of the switcher. */
const ROW = cn(
  'flex w-full items-center justify-between py-2 text-left text-[17px] tracking-[-0.02em]',
  'border-b border-[#e8e8e8]/20 text-[#e8e8e8]/20 transition-colors duration-300',
  'hover:text-white/70',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
  // `::before` — the 6px marker parked at the row's right edge, behind the
  // chevron that replaces it once the row is selected.
  "before:bg-[#e8e8e8]/33 before:absolute before:right-0 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:transition-all before:duration-300 before:content-['']",
);

export interface ServiceBrandSwitcherProps {
  /** Clients, in render order. The first is selected initially. */
  readonly brands: readonly ServiceBrandEntry[];
}

/**
 * `.ai-brand-list` + `.ai-brand-logo` — the client switcher.
 *
 * **Buttons, not links.** The reference marks each name up as
 * `<a href="#!">` — an anchor that navigates nowhere and exists purely to run a
 * click handler. That is a control announced as a link, reachable by keyboard,
 * that does not go anywhere; rendering it as a `<button>` gives the same
 * behaviour with semantics that match what it actually does.
 *
 * The logo swap is announced politely rather than silently: the panel is a live
 * region, so a screen-reader user who activates a name hears which client is now
 * shown instead of nothing at all.
 *
 * @param props - See {@link ServiceBrandSwitcherProps}.
 */
export function ServiceBrandSwitcher({ brands }: ServiceBrandSwitcherProps) {
  const panelId = useId();
  const [selectedId, setSelectedId] = useState(brands[0]?.id);
  const selected = brands.find((brand) => brand.id === selectedId) ?? brands[0];

  if (selected === undefined) return null;

  return (
    <div className="flex items-start">
      <ul className="m-0 w-1/2 list-none p-0">
        {brands.map((brand) => {
          const isSelected = brand.id === selected.id;

          return (
            <li key={brand.id} className="relative">
              <button
                type="button"
                aria-pressed={isSelected}
                aria-controls={panelId}
                onClick={() => setSelectedId(brand.id)}
                className={cn(ROW, isSelected && 'text-white before:opacity-0')}
              >
                <span>{brand.name}</span>
                <SelectedArrow
                  className={cn(
                    'opacity-0 transition-opacity duration-300',
                    isSelected && 'opacity-100',
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id={panelId}
        aria-live="polite"
        className="w-1/2 pt-[14px] text-center max-bs-xl:[&_img]:max-w-[55%]"
      >
        <Image
          // Keyed on the logo so React swaps the element rather than mutating
          // `src` on one node — without it the browser paints the previous logo
          // at the new one's dimensions for a frame.
          key={selected.logo}
          src={selected.logo}
          alt={selected.name}
          width={200}
          height={60}
          className="mx-auto h-auto w-auto transition-opacity duration-500"
        />
      </div>
    </div>
  );
}
