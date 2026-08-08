'use client';

import { cn } from '@/lib/utils';

export interface MobileNavToggleProps {
  /** Opens the drawer. */
  readonly onOpen: () => void;
  /** Whether the drawer is currently open, for `aria-expanded`. */
  readonly isOpen: boolean;
  /** The drawer's DOM id, for `aria-controls`. */
  readonly controls: string;
  readonly className?: string;
}

/**
 * The hamburger trigger shown below 992px.
 *
 * A real `<button>` rather than a styled `<div>`, so it is reachable by Tab and
 * activated by both Enter and Space with no extra key handling. The three bars
 * are decorative and hidden from assistive tech; the accessible name comes from
 * `aria-label`.
 *
 * @param props - See {@link MobileNavToggleProps}.
 */
export function MobileNavToggle({ onOpen, isOpen, controls, className }: MobileNavToggleProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open navigation menu"
      aria-expanded={isOpen}
      aria-controls={controls}
      className={cn(
        'inline-flex items-center justify-center rounded-md border-0 bg-transparent p-1.5 text-white',
        'transition-colors duration-300 ease-out hover:text-lime',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
        'bs-lg:hidden',
        className,
      )}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
