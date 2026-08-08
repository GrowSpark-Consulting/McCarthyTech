'use client';

import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

/**
 * How much of the remaining distance the dot closes each frame.
 *
 * Below 1 it trails the pointer instead of pinning to it, which is the whole
 * effect. 0.18 settles in about six frames — present enough to feel attached,
 * loose enough to read as a follower rather than a second cursor.
 */
const FOLLOW_EASE = 0.18;

/** Elements the dot tightens over, matching the reference's `-pointer` state. */
const INTERACTIVE = 'a, button, input, textarea, select, summary, [role="button"], [role="tab"]';

/**
 * Only shown to a real mouse.
 *
 * A coarse pointer has no cursor to decorate, and `hover: none` rules out
 * devices that emulate one. Rendering it there would leave a dot stranded
 * wherever the last tap landed.
 */
const FINE_POINTER = '(pointer: fine) and (hover: hover)';

/**
 * `.cb-cursor` — the lime dot that trails the pointer.
 *
 * Transcribed from `mousecursor.css`: a 48px circle offset to its own centre,
 * scaled to `0.3` at rest, `0.15` over anything interactive, and `0.23` while a
 * button is held. Transitions are on `transform` alone, so the scaling never
 * costs a layout.
 *
 * **The native cursor is left alone.** The reference hides it behind a
 * `cursor-hide` class; this does not. A decorative dot is a poor substitute for
 * the system cursor — it lags by design, it carries none of the OS shape cues
 * that tell you a field is editable or an edge is draggable, and anyone relying
 * on a large or high-contrast pointer loses that. The dot rides alongside
 * instead, which is also what was asked for.
 *
 * Position is written straight to the element in a rAF loop rather than through
 * React state: at 60fps a state update per frame would re-render the tree sixty
 * times a second for something no other component reads.
 */
export function MouseCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | undefined>(undefined);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [active, setActive] = useState(false);

  // Gate on the pointer *type*, which cannot be known until the client runs.
  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(query.matches);

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const overInteractive =
        event.target instanceof Element && event.target.closest(INTERACTIVE) !== null;
      setPointer(overInteractive);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    const tick = () => {
      const dot = dotRef.current;
      if (dot !== null) {
        // Under reduced motion the dot is pinned rather than eased — the
        // trailing *is* the animation, and it is the part worth removing.
        const ease = prefersReducedMotion ? 1 : FOLLOW_EASE;
        current.current.x += (target.current.x - current.current.x) * ease;
        current.current.y += (target.current.y - current.current.y) * ease;
        dot.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    frame.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      if (frame.current !== undefined) window.cancelAnimationFrame(frame.current);
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled) return null;

  /** `:before` — the circle itself, sized entirely by `transform`. */
  const scale = !visible
    ? 'scale-0'
    : pointer
      ? 'scale-[0.15]'
      : active
        ? 'scale-[0.23]'
        : 'scale-[0.3]';

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] will-change-transform [contain:layout_style_size]"
    >
      <span
        className={cn(
          'absolute -left-6 -top-6 block size-12 rounded-full bg-lime',
          'transition-transform duration-300 ease-in-out',
          active && 'duration-200',
          scale,
        )}
      />
    </div>
  );
}
