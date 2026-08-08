'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Selector matching every element that can hold keyboard focus.
 * Negative `tabindex` values are excluded — they are programmatically focusable
 * but must not appear in the Tab cycle.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Confines keyboard focus to a container while it is active.
 *
 * Required for the mobile drawer to be usable with a keyboard or screen reader:
 * without it, Tab walks straight out of the open drawer and into the page
 * behind it, which is still visually covered and inert to a sighted user.
 *
 * On activation, focus moves to the first focusable descendant. On deactivation,
 * it returns to whatever was focused before — so dismissing the drawer puts the
 * user back on the trigger button rather than at the top of the document.
 *
 * @param containerRef - The element to trap focus within.
 * @param isActive - Whether the trap is currently engaged.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, isActive: boolean): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || container === null) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      );

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (first === undefined || last === undefined) {
        // Nothing focusable inside: keep focus on the container itself rather
        // than letting Tab escape to the inert page behind the overlay.
        event.preventDefault();
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [containerRef, isActive]);
}
