import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';

import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  /**
   * Which surface the mark is rendering on. `header` caps by width, `drawer`
   * caps by height, matching the reference's two sizing rules.
   */
  readonly placement?: 'header' | 'drawer';
  /**
   * Whether to fetch the image at high priority. Set on the header instance
   * only — it is above the fold and part of the first meaningful paint.
   */
  readonly priority?: boolean;
  readonly className?: string;
}

/**
 * The McCarthy Tech wordmark, wrapped in a home link.
 *
 * The link's accessible name is the company name plus destination rather than
 * the bare alt text, so a screen-reader user hears where it goes. The icon
 * image carries an empty alt because the surrounding link already names it —
 * announcing both would read the brand twice.
 *
 * @param props - See {@link BrandLogoProps}.
 */
export function BrandLogo({ placement = 'header', priority = false, className }: BrandLogoProps) {
  const isHeader = placement === 'header';

  return (
    <AppLink
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 transition-opacity duration-300 ease-out hover:opacity-80',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
        className,
      )}
    >
      {/* Lime green icon from the original logo */}
      <Image
        src="/assets/img/logo/grow-spark-logo.png"
        alt=""
        width={1075}
        height={232}
        priority={priority}
        sizes={isHeader ? '40px' : '32px'}
        className={cn(
          'h-auto w-auto object-contain',
          isHeader ? 'max-h-[36px] max-w-[40px] max-bs-md:max-h-[30px]' : 'max-h-8 max-w-[36px]',
        )}
        style={{ objectPosition: 'left center', clipPath: 'inset(0 75% 0 0)' }}
      />
      {/* Text wordmark */}
      <span
        className={cn(
          'font-heading font-bold tracking-tight text-white',
          isHeader ? 'text-xl max-bs-md:text-lg' : 'text-lg',
        )}
      >
        McCarthy Tech
      </span>
    </AppLink>
  );
}
