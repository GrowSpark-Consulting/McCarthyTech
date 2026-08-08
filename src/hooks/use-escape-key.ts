'use client';

import { useEffect } from 'react';

/**
 * Invokes a handler when Escape is pressed, while enabled.
 *
 * Dismissing an overlay with Escape is a WAI-ARIA requirement for dialogs and
 * the expected behaviour for menus; centralising it here keeps every overlay in
 * the app consistent.
 *
 * @param onEscape - Called when Escape is pressed.
 * @param isEnabled - Whether the listener is attached.
 */
export function useEscapeKey(onEscape: () => void, isEnabled: boolean): void {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onEscape();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, isEnabled]);
}
