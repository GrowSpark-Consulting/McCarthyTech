'use client';

import { useCallback, useId, useState } from 'react';
import { motion } from 'framer-motion';

import { HeaderBar } from '@/components/layout/header-bar';
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer';
import { useStickyHeader } from '@/hooks/use-sticky-header';
import { DURATION, STICKY_EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Site header.
 *
 * Reproduces the reference's two-stage behaviour:
 *
 * 1. A glass capsule floating 24px into the hero, in the normal document flow,
 *    which simply scrolls away with the page.
 * 2. Past 300px of scroll, a full-width frosted bar slides down from above.
 *
 * Both are rendered from one `HeaderBar`, and exactly one is exposed to
 * assistive technology at a time: whichever is off-screen is marked
 * `aria-hidden` and `inert`. That avoids the duplicate navigation landmark the
 * original's DOM-cloning approach produces, while keeping the visual result
 * identical — the swap happens at a scroll depth where the capsule is already
 * well out of view, so it is never perceivable.
 */
export function SiteHeader() {
  const isPinned = useStickyHeader();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerId = useId();

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const barProps = {
    onOpenDrawer: openDrawer,
    isDrawerOpen,
    drawerId,
  } as const;

  return (
    <>
      {/* Stage 1 — the floating capsule over the hero. `relative` makes this the
          containing block for the services mega-menu, so the panel spans the
          full viewport width rather than the width of its menu item. */}
      <header
        className={cn('absolute inset-x-0 top-6 z-header', isPinned && 'pointer-events-none')}
        aria-hidden={isPinned}
        inert={isPinned}
      >
        <div className="relative">
          <HeaderBar variant="floating" logoPriority {...barProps} />
        </div>
      </header>

      {/* Stage 2 — the pinned frosted bar.
          Deliberately **not** wrapped in `AnimatePresence`. An exit animation
          would keep this `<header>` mounted while the floating one is already
          exposed again, putting two banner landmarks in the tree at once —
          axe reports `landmark-no-duplicate-banner`, and a screen-reader user
          hears the header twice. Unmounting immediately guarantees exactly one
          banner at every moment. The slide-in on arrival is preserved; only the
          slide-out is dropped, and that happens at the top of the page where
          the floating header has already taken over visually. */}
      {isPinned ? (
        <motion.header
          key="pinned-header"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: DURATION.sticky, ease: STICKY_EASE }}
          className={cn(
            'fixed inset-x-0 top-0 z-backdrop py-[30px] max-bs-md:py-5',
            'border-b border-white/[0.08] bg-drawer/60 shadow-sticky',
            'backdrop-blur-glass backdrop-saturate-glass',
          )}
        >
          <div className="relative">
            <HeaderBar variant="pinned" {...barProps} />
          </div>
        </motion.header>
      ) : null}

      <MobileNavDrawer isOpen={isDrawerOpen} onClose={closeDrawer} id={drawerId} />
    </>
  );
}
