import { DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Typography.
 *
 * Both faces are self-hosted by `next/font`, which inlines the `@font-face`
 * rules, emits a `<link rel="preload">` for each file, and â€” critically â€”
 * computes a size-adjusted local fallback so the swap from fallback to webfont
 * causes no layout shift. That is what keeps Cumulative Layout Shift at zero
 * despite the hero's very large display type.
 *
 * `display: 'swap'` means text is painted in the fallback immediately rather
 * than being withheld, so the headline is readable from the first frame.
 */

/** Body face â€” matches the reference's `--font-body`. */
export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  // The reference loads the full variable range; 400â€“700 covers every weight
  // actually used (body 400, nav 500, drawer 600, buttons 700).
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial'],
});

/** Display face â€” matches the reference's `--font-heading`. */
export const sportingGrotesque = localFont({
  src: [
    {
      path: '../../public/assets/fonts/SportingGrotesque-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SportingGrotesque-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-heading',
  fallback: ['Georgia', 'serif'],
  // Trims the fallback's metric mismatch against the display face so the
  // headline does not reflow when the webfont arrives.
  adjustFontFallback: 'Times New Roman',
});
