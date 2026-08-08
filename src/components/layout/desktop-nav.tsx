'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/app-link';
import { usePathname } from 'next/navigation';

import { ServicesMegaMenu } from '@/components/layout/services-mega-menu';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { primaryNavItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { PrimaryNavItem } from '@/types/navigation';

/** Shared pill styling for every top-level nav link. */
const NAV_LINK_CLASS = cn(
  'relative z-[4] inline-block rounded-pill border border-white/10 bg-surface',
  'px-5 pb-1.5 pt-1 font-body text-base font-medium tracking-body text-white',
  'transition-colors duration-300 ease-out hover:border-white/25',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
);

/**
 * Grace period between the pointer leaving the menu and the menu closing.
 *
 * Sized against the gap it exists to cover: roughly 20px of header between the
 * nav pill and the panel. 220ms clears that at any speed a person actually moves
 * a mouse, while staying well under the ~400ms where a menu starts to feel like
 * it is refusing to close.
 */
const CLOSE_DELAY_MS = 220;

/**
 * Height of the dead space between the nav pill and the mega-menu panel.
 *
 * Measured, not guessed: the trigger's bottom edge sits at 76px and the panel's
 * top at 108px. The trigger's `<li>` is padded by this much and pulled back by
 * the same amount, so its hit area meets the panel without its layout box
 * growing — the flex row's height, and everything aligned to it, is unchanged.
 *
 * If the header's spacing changes, this changes with it. It is a bridge across a
 * specific gap, not a general cushion.
 */
const MENU_BRIDGE_CLASS = 'pb-[33px] -mb-[33px]';

/**
 * Determines whether a nav entry represents the current location.
 *
 * The home route matches only on an exact path; every other entry also matches
 * its descendants, so `/services/ai-chatbot` still marks "Services" as current.
 *
 * @param pathname - The active pathname.
 * @param href - The entry's route.
 */
function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Desktop primary navigation.
 *
 * Hidden below 992px, where the mobile drawer takes over — matching the
 * reference's `navbar-expand-lg` breakpoint.
 *
 * The services dropdown opens on hover *and* on keyboard focus, and closes on
 * Escape or pointer-out.
 *
 * **Closing is deliberately delayed.** The panel is a DOM child of the trigger's
 * `<li>`, which suggests hover is retained on the way into it — but the panel is
 * absolutely positioned against the full-width header, so a real gap of empty
 * header sits between the pill and the panel's top edge. Crossing that gap puts
 * the pointer outside every box the `<li>` actually paints, `mouseleave` fires,
 * and the menu closes out from under the cursor before it arrives.
 *
 * Two things fix it together, because either alone leaves a hole:
 *
 * 1. **The gap is bridged.** The trigger's `<li>` is padded down by exactly the
 *    measured 33px and pulled back with an equal negative margin, so its hit
 *    area reaches the panel while its layout box does not move. The pointer
 *    never leaves the subtree, so `mouseleave` never fires.
 * 2. **Closing is deferred anyway.** A short grace period covers the diagonal
 *    case — travelling toward a service tile off to one side, briefly clipping
 *    the corner of the bridge — and cancels the moment anything is re-entered.
 *
 * The bridge is the load-bearing half; the timer is the safety net. A timer on
 * its own is speed-dependent, and a slow hand outruns any value short enough to
 * still feel responsive.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const megaMenuId = useId();
  const [openMenuHref, setOpenMenuHref] = useState<string | null>(null);

  /**
   * The mega-menu's promo clip is ~17 MB. It was previously gated on
   * `useIdleReady`, which meant every visitor downloaded it shortly after load
   * for a panel most never open — Lighthouse measured it as the second-largest
   * request on the page. It now loads on first open and stays mounted, so the
   * cost is paid only by visitors who actually look at the menu.
   */
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);

  /** Pending close, held so re-entering the menu can cancel it. */
  const closeTimer = useRef<number | undefined>(undefined);

  const cancelPendingClose = useCallback(() => {
    if (closeTimer.current === undefined) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = undefined;
  }, []);

  const openMenu = useCallback(
    (href: string) => {
      cancelPendingClose();
      setOpenMenuHref(href);
      setHasOpenedMenu(true);
    },
    [cancelPendingClose],
  );

  /** Immediate — for Escape, for navigating away, and for blur. */
  const closeMenu = useCallback(() => {
    cancelPendingClose();
    setOpenMenuHref(null);
  }, [cancelPendingClose]);

  /** Deferred — for the pointer leaving, which may just be crossing the gap. */
  const scheduleClose = useCallback(() => {
    cancelPendingClose();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = undefined;
      setOpenMenuHref(null);
    }, CLOSE_DELAY_MS);
  }, [cancelPendingClose]);

  // A timer outliving the component would call `setState` on an unmounted tree.
  useEffect(() => cancelPendingClose, [cancelPendingClose]);

  useEscapeKey(closeMenu, openMenuHref !== null);

  const renderItem = (item: PrimaryNavItem) => {
    const isCurrent = isCurrentRoute(pathname, item.href);
    const hasMegaMenu = item.services !== undefined && item.services.length > 0;
    const isOpen = hasMegaMenu && openMenuHref === item.href;

    return (
      <li
        key={item.href}
        // `static` so the mega-menu panel resolves its containing block against
        // the full-width <header>, not against this menu item.
        className={cn('static', hasMegaMenu && MENU_BRIDGE_CLASS)}
        onMouseEnter={hasMegaMenu ? () => openMenu(item.href) : undefined}
        onMouseLeave={hasMegaMenu ? scheduleClose : undefined}
        onFocus={hasMegaMenu ? () => openMenu(item.href) : undefined}
        onBlur={
          hasMegaMenu
            ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  closeMenu();
                }
              }
            : undefined
        }
      >
        <AppLink
          href={item.href}
          aria-current={isCurrent ? 'page' : undefined}
          aria-expanded={hasMegaMenu ? isOpen : undefined}
          aria-controls={hasMegaMenu ? megaMenuId : undefined}
          aria-haspopup={hasMegaMenu ? 'menu' : undefined}
          className={cn(NAV_LINK_CLASS, isCurrent && 'border-white/25')}
        >
          <span>{item.label}</span>
        </AppLink>

        {hasMegaMenu && item.services !== undefined ? (
          <ServicesMegaMenu
            id={megaMenuId}
            items={item.services}
            isOpen={isOpen}
            onNavigate={closeMenu}
            isPromoReady={hasOpenedMenu}
          />
        ) : null}
      </li>
    );
  };

  return (
    <nav aria-label="Primary" className="flex items-center max-bs-lg:hidden">
      <ul className="m-0 flex list-none flex-wrap items-center gap-[10px] p-0">
        {primaryNavItems.map(renderItem)}
      </ul>
    </nav>
  );
}
