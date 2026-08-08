export interface GoogleGlyphProps {
  readonly className?: string;
}

/**
 * The Google "G" mark.
 *
 * Drawn inline because Lucide — the project's icon set — carries no brand
 * glyphs, and pulling in a second icon library for one mark is not worth the
 * dependency. Painted in `currentColor` so it inherits the row's hover
 * transition alongside the LinkedIn and Instagram icons, rather than staying
 * multi-coloured while its neighbours invert.
 *
 * @param props - See {@link GoogleGlyphProps}.
 */
export function GoogleGlyph({ className }: GoogleGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
    </svg>
  );
}
