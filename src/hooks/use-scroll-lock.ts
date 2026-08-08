'use client';

import { useEffect } from 'react';

/**
 * Freezes background scrolling while an overlay (the mobile drawer) is open.
 *
 * Locking is done by hiding overflow on `<html>` *and* compensating for the
 * scrollbar width with padding. Without the compensation, removing the
 * scrollbar widens the viewport by ~15px on desktop and the whole page visibly
 * jumps sideways the instant the drawer opens.
 *
 * The previous inline values are captured and restored on cleanup, so this
 * cooperates with anything else that may have touched them rather than
 * clobbering it.
 *
 * @param isLocked - Whether scrolling should currently be frozen.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const { documentElement, body } = document;
    const previousOverflow = documentElement.style.overflow;
    const previousPaddingRight = documentElement.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }
    // iOS Safari ignores overflow on the root element; the body needs it too.
    const previousBodyOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      documentElement.style.overflow = previousOverflow;
      documentElement.style.paddingRight = previousPaddingRight;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isLocked]);
}
