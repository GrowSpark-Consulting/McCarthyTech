'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/app-link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { BrandLogo } from '@/components/layout/brand-logo';
import { MenuSearchField } from '@/components/layout/menu-search-field';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { backdropVariants, drawerTransition, drawerVariants } from '@/lib/motion';
import { mobileNavItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { PrimaryNavItem } from '@/types/navigation';

/** `.xb-menu-primary li a` — shared row styling for every drawer link. */
const DRAWER_LINK_CLASS = cn(
  'block border-b border-white/10 font-body text-sm font-semibold capitalize leading-[46px]',
  'text-white transition-colors duration-300 ease-out hover:text-lime',
  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
);

export interface MobileNavDrawerProps {
  /** Whether the drawer is open. */
  readonly isOpen: boolean;
  /** Dismisses the drawer. */
  readonly onClose: () => void;
  /** DOM id, referenced by the toggle's `aria-controls`. */
  readonly id: string;
}

/**
 * Matches a nav entry against the current filter query.
 *
 * A parent matches if its own label matches *or* any of its child services do,
 * so searching "chatbot" keeps "Services" visible as the route to reach it.
 */
function matchesQuery(item: PrimaryNavItem, query: string): boolean {
  if (query === '') return true;
  if (item.label.toLowerCase().includes(query)) return true;
  return (item.services ?? []).some((service) => service.label.toLowerCase().includes(query));
}

/**
 * Off-canvas navigation drawer for viewports below 992px.
 *
 * Implemented as a modal dialog: while open it locks background scrolling, traps
 * Tab within the panel, closes on Escape or a backdrop click, and returns focus
 * to the hamburger trigger on dismissal. It is unmounted when closed — unlike
 * the mega-menu it holds no expensive media, and unmounting guarantees nothing
 * inside can be reached while hidden.
 *
 * @param props - See {@link MobileNavDrawerProps}.
 */
export function MobileNavDrawer({ isOpen, onClose, id }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [expandedHref, setExpandedHref] = useState<string | null>(null);

  useScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);
  useFocusTrap(panelRef, isOpen);

  const handleQueryChange = useCallback((next: string) => setQuery(next), []);

  const visibleItems = useMemo(
    () => mobileNavItems.filter((item) => matchesQuery(item, query)),
    [query],
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="drawer"
            id={id}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={drawerTransition}
            className="fixed inset-y-0 left-0 z-drawer m-0 h-dvh w-[300px] max-w-[85vw] overflow-y-auto bg-drawer"
          >
            <div className="relative px-[25px] pb-10 pt-[50px]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className={cn(
                  'group absolute right-0 top-0 inline-flex size-9 items-center justify-center',
                  'border-[9px] border-transparent bg-white/[0.04] text-white/70',
                  'transition-colors duration-300 ease-out hover:text-lime',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
                )}
              >
                {/* Two crossed bars that straighten to a horizontal pair on hover,
                    reproducing the reference's `.xb-close` interaction. */}
                <span className="relative block size-full">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -mt-px h-0.5 w-full rotate-45 bg-current transition-transform duration-menu ease-menu group-hover:rotate-0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -mt-px h-0.5 w-full -rotate-45 bg-current transition-transform duration-menu ease-menu group-hover:rotate-0"
                  />
                </span>
              </button>

              <div className="mb-10">
                <BrandLogo placement="drawer" />
              </div>

              <MenuSearchField onQueryChange={handleQueryChange} />

              <nav aria-label="Mobile">
                <ul className="m-0 list-none p-0">
                  {visibleItems.map((item) => {
                    const services = item.services ?? [];
                    const hasServices = services.length > 0;
                    const isExpanded = expandedHref === item.href;
                    const isCurrent =
                      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                    return (
                      <li key={item.href} className="relative">
                        <AppLink
                          href={item.href}
                          onClick={onClose}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={cn(DRAWER_LINK_CLASS, isCurrent && 'text-lime')}
                        >
                          <span>{item.label}</span>
                        </AppLink>

                        {hasServices ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setExpandedHref(isExpanded ? null : item.href)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} submenu`}
                              className={cn(
                                'absolute right-0 top-[10px] flex size-7 items-center justify-center',
                                'rounded-[3px] bg-transparent text-white transition-colors duration-menu',
                                'hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
                              )}
                            >
                              <ChevronDown
                                size={15}
                                aria-hidden="true"
                                className={cn(
                                  'transition-transform duration-menu ease-menu',
                                  isExpanded && 'rotate-180',
                                )}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded ? (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeOut' }}
                                  className="m-0 list-none overflow-hidden p-0 pl-[15px]"
                                >
                                  {services.map((service) => (
                                    <li key={service.href}>
                                      <AppLink
                                        href={service.href}
                                        onClick={onClose}
                                        className={cn(DRAWER_LINK_CLASS, 'pl-0 font-medium')}
                                      >
                                        <span>{service.label}</span>
                                      </AppLink>
                                    </li>
                                  ))}
                                </motion.ul>
                              ) : null}
                            </AnimatePresence>
                          </>
                        ) : null}
                      </li>
                    );
                  })}

                  {visibleItems.length === 0 ? (
                    <li role="status" className="py-4 text-sm text-muted">
                      No pages match “{query}”.
                    </li>
                  ) : null}
                </ul>
              </nav>
            </div>
          </motion.div>

          <motion.button
            key="backdrop"
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={drawerTransition}
            className="fixed inset-0 z-backdrop size-full cursor-default border-0 bg-black/50 p-0"
          />
        </>
      ) : null}
    </AnimatePresence>
  );
}
