'use client';

import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';
import { motion } from 'framer-motion';

import { AgencyButton } from '@/components/ui/agency-button';
import { DURATION, megaMenuVariants } from '@/lib/motion';
import { megaMenuConsultationCta, megaMenuPromo } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { ServiceMenuItem } from '@/types/navigation';

/** Rendered size of the service tile glyphs — `.iconbox_block_2 .iconbox_icon img`. */
const TILE_ICON_SIZE = 16;

/**
 * Fixed box for the promo clip (171×186), shared by the video and its
 * placeholder so the deferred swap causes no layout shift.
 */
const PROMO_MEDIA_CLASS = 'block h-[186px] w-[171px] shrink-0 rounded-[10px] object-cover';

export interface ServicesMegaMenuProps {
  /** Tiles to render, in order. */
  readonly items: readonly ServiceMenuItem[];
  /** Whether the panel is currently revealed. */
  readonly isOpen: boolean;
  /** DOM id, referenced by the trigger's `aria-controls`. */
  readonly id: string;
  /** Called when a tile or CTA is activated, so the trigger can close the panel. */
  readonly onNavigate: () => void;
  /** Whether the deferred promo clip may start loading. */
  readonly isPromoReady: boolean;
}

/**
 * A single service tile.
 *
 * The gradient hover ring is drawn with a masked pseudo-layer rather than a
 * `border-image`: a real gradient border cannot follow a `border-radius`, so the
 * reference paints the gradient into a 1px inset frame and knocks the middle out
 * with `mask-composite: exclude`. Reproduced here with the same technique.
 */
function ServiceTile({ item, onNavigate }: { item: ServiceMenuItem; onNavigate: () => void }) {
  return (
    <AppLink
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'group/tile relative z-[1] block rounded-[10px] border border-white/25 bg-ink',
        'px-[15px] py-3 leading-[1.3] transition-all duration-300 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-[1] rounded-[10px] bg-aurora p-px opacity-0',
          'transition-opacity duration-300 ease-out group-hover/tile:opacity-100',
          '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        )}
      />

      <span className="mb-[10px] flex items-center gap-[10px]">
        <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-[5px] bg-[rgba(255,255,235,0.15)]">
          <Image
            src={item.iconSrc}
            alt=""
            width={TILE_ICON_SIZE}
            height={TILE_ICON_SIZE}
            aria-hidden="true"
            className="max-w-4"
          />
        </span>
        <span className="mt-[3px] font-heading text-xl font-normal leading-none text-white transition-colors duration-300 ease-out group-hover/tile:text-lime">
          {item.label}
        </span>
      </span>

      <span className="block text-base font-normal text-muted max-bs-xxl:text-[15px]">
        {item.description}
      </span>
    </AppLink>
  );
}

/**
 * The services dropdown: a nine-tile grid plus an AI promo panel.
 *
 * Rendered inside its trigger's `<li>` so pointer hover naturally persists while
 * the cursor travels from the trigger into the panel, but positioned against the
 * `<header>` (the nearest positioned ancestor) so it spans the full viewport
 * width instead of the width of the menu item.
 *
 * Kept mounted and toggled with opacity so the browser can rasterise it once,
 * and so the tile images are already decoded the first time it is opened. While
 * closed it is `aria-hidden` and pointer-inert, keeping its links out of the tab
 * order.
 *
 * @param props - See {@link ServicesMegaMenuProps}.
 */
export function ServicesMegaMenu({
  items,
  isOpen,
  id,
  onNavigate,
  isPromoReady,
}: ServicesMegaMenuProps) {
  return (
    <motion.div
      id={id}
      initial={false}
      animate={isOpen ? 'visible' : 'hidden'}
      variants={megaMenuVariants}
      transition={{ duration: DURATION.hover, ease: 'easeOut' }}
      aria-hidden={!isOpen}
      // Keeps the panel's links out of the tab order while it is collapsed,
      // without unmounting (and re-decoding) the nine tile images each time.
      inert={!isOpen}
      className="absolute inset-x-0 top-full z-[2] mx-auto mt-[10px] w-full max-w-shell px-[15px]"
    >
      <div
        className={cn(
          'relative z-[2] overflow-hidden rounded-[10px] border border-white/20 bg-panel',
          'p-[30px] pb-10',
        )}
      >
        {/* Aurora bloom behind the panel, clipped by the panel's own overflow. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 left-0 -z-[1] h-full w-full bg-aurora opacity-90 blur-[20.5px]"
        />

        <div className="grid gap-y-[30px] bs-xl:grid-cols-[2fr_1fr]">
          <div
            className={cn(
              'mr-0',
              'bs-xl:mr-[-30px] min-[1301px]:mr-[70px] min-[1501px]:mr-[115px]',
            )}
          >
            <ul className="grid list-none grid-cols-1 gap-[10px] p-0 bs-lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.href}>
                  <ServiceTile item={item} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>

            <ul className="mt-[30px] flex list-none items-center gap-[30px] p-0 bs-xl:mt-20">
              <li className="p-0">
                <AgencyButton
                  href={megaMenuConsultationCta.href}
                  label={megaMenuConsultationCta.label}
                  size="compact"
                />
              </li>
            </ul>
          </div>

          <div
            className={cn(
              'ml-0 grid grid-cols-2 gap-5',
              'bs-xl:ml-[55px] bs-xl:block bs-xl:text-center',
              'min-[1301px]:ml-[-55px] min-[1301px]:text-left',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-[25px] overflow-hidden rounded-[10px] bg-ink p-[10px]',
                'bs-xl:flex-wrap bs-xl:justify-center min-[1301px]:flex-nowrap min-[1301px]:justify-start',
              )}
            >
              {isPromoReady ? (
                <video
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                  width={megaMenuPromo.width}
                  height={megaMenuPromo.height}
                  className={PROMO_MEDIA_CLASS}
                >
                  <source src={megaMenuPromo.videoSrc} type="video/mp4" />
                </video>
              ) : (
                // Same box as the clip, so the panel never reflows when the
                // deferred video swaps in.
                <span aria-hidden="true" className={cn(PROMO_MEDIA_CLASS, 'bg-white/5')} />
              )}

              <div>
                <h3 className="mb-[60px] font-heading text-xl font-normal leading-tight text-white">
                  {megaMenuPromo.heading}
                </h3>
                <AgencyButton
                  href={megaMenuPromo.cta.href}
                  label={megaMenuPromo.cta.label}
                  size="compact"
                  onClick={onNavigate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
