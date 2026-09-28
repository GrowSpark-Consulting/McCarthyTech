import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';
import { Instagram, Linkedin } from 'lucide-react';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { GoogleGlyph } from '@/components/ui/google-glyph';
import { footerContent, footerNavItems, footerSocialLinks } from '@/lib/footer';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Maps a social row's id to its glyph. Keeps the data file free of JSX. */
const SOCIAL_GLYPHS = {
  linkedin: Linkedin,
  instagram: Instagram,
  google: GoogleGlyph,
} as const;

/**
 * Site footer.
 *
 * A Server Component — every interaction here is a CSS hover, so it ships no
 * JavaScript at all.
 *
 * Three bands, matching the reference:
 *
 * 1. A giant "McCarthy Tech" watermark with the email address on a gradient pill
 *    floating over its centre. The gradient pans continuously, which is done by
 *    over-sizing the gradient to 200% and animating its *position* — the pill
 *    itself never moves.
 * 2. Five prompt-and-link columns, each with an underline that wipes in on hover.
 * 3. A social bar whose rows fill with lime left-to-right on hover, then the
 *    contact strip.
 *
 * The watermark is `aria-hidden`: it is 347px of decorative lettering, and the
 * brand name is already announced by the logo and the copyright line. Rendering
 * it as an `<h1>` — as the reference does — would also give the page a second
 * top-level heading.
 */
export function SiteFooter() {
  return (
    <footer className="bg-footer-stage bg-cover bg-center bg-no-repeat pt-[145px] max-bs-md:pt-20">
      <div className="bg-ink pt-[50px]">
        <div className="relative">
          <p
            aria-hidden="true"
            className={cn(
              'm-0 text-center font-heading font-black uppercase tracking-[0.02em] text-watermark',
              'text-[347px] leading-none',
              'max-[1600px]:text-[289px] max-bs-xxl:text-[247px]',
              'max-bs-xl:text-[185px] max-lg:text-[179px] max-bs-lg:text-[139px]',
              'max-bs-md:text-[63px] bs-sm:max-bs-md:text-[105px]',
            )}
          >
            {footerContent.watermark}
          </p>

          <a
            href={`mailto:${footerContent.email}`}
            className={cn(
              'absolute left-1/2 top-[38%] z-[1] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-[15px]',
              'overflow-hidden rounded-[61px] px-10 py-[26px]',
              'font-heading text-[32px] tracking-[-0.03em] text-ink transition-all duration-300 ease-out',
              'hover:scale-105',
              'max-bs-xl:px-[30px] max-bs-xl:py-[15px]',
              'max-bs-lg:px-[25px] max-bs-lg:py-[5px] max-bs-lg:text-[22px]',
              'max-bs-md:px-3 max-bs-md:py-[3px] max-bs-md:text-base',
              'bs-sm:max-bs-md:px-[25px] bs-sm:max-bs-md:py-3 bs-sm:max-bs-md:text-xl',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 -z-10 bg-aurora bg-[length:200%_200%]',
                'animate-gradient-pan motion-reduce:animate-none',
              )}
            />
            <Image
              src="/assets/img/icon/email-icon.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className="max-bs-md:w-4"
            />
            {footerContent.email}
          </a>
        </div>

        <nav
          aria-label="Footer"
          className={cn(
            '-mt-[30px] flex items-center justify-between px-[50px]',
            'max-bs-xxl:mt-[5px] max-bs-xl:mt-5',
            'max-bs-lg:mt-10 max-bs-lg:px-5',
            'max-bs-md:flex-wrap max-bs-md:gap-[30px]',
            'bs-sm:max-bs-md:justify-center bs-sm:max-bs-md:gap-[50px]',
          )}
        >
          {footerNavItems.map((item) => (
            <div
              key={item.href}
              className="text-center max-bs-md:w-full bs-sm:max-bs-md:w-auto bs-sm:max-bs-md:text-start"
            >
              <span
                className={cn(
                  'font-body font-bold uppercase tracking-[-0.02em] text-muted',
                  'max-bs-lg:text-[13px]',
                )}
              >
                {item.prompt}
              </span>
              <p
                className={cn(
                  'group relative z-[1] mt-[15px] font-heading text-[42px] capitalize',
                  'tracking-[-0.03em] text-white transition-colors duration-300 ease-out',
                  'hover:text-lime',
                  'max-bs-xxl:text-[30px] max-bs-xl:text-[28px] max-bs-lg:text-[22px]',
                )}
              >
                <AppLink
                  href={item.href}
                  className={cn(
                    'relative inline-block text-current',
                    // Underline wipes in from the left on hover.
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-lime after:opacity-0 after:transition-all after:duration-300 after:content-['']",
                    'hover:after:w-full hover:after:opacity-100',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
                  )}
                >
                  {item.label}
                </AppLink>
              </p>
            </div>
          ))}
        </nav>

        <ul
          className={cn(
            'mt-[85px] grid list-none grid-cols-3 border-y border-rule p-0',
            'max-bs-md:mt-[65px] max-bs-md:grid-cols-1',
          )}
        >
          {footerSocialLinks.map((social, index) => {
            const Glyph = SOCIAL_GLYPHS[social.id];
            const isLast = index === footerSocialLinks.length - 1;

            return (
              <li
                key={social.id}
                className={cn(
                  'group relative isolate',
                  !isLast && 'border-r border-rule max-bs-md:border-b max-bs-md:border-r-0',
                )}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    'flex items-center justify-between py-[15.5px] pl-5 pr-[15px]',
                    'transition-colors duration-300 ease-out',
                    'focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-lime',
                  )}
                >
                  {/* Lime sheet wipes across the row on hover. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-y-0 left-0 -z-10 w-0 bg-lime opacity-0',
                      'transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100',
                    )}
                  />
                  <span className="flex items-center gap-[10px]">
                    <Glyph
                      aria-hidden="true"
                      className="size-5 text-white transition-colors duration-300 ease-out group-hover:text-ink"
                    />
                    <span className="font-body text-sm font-semibold uppercase text-white transition-colors duration-300 ease-out group-hover:text-ink">
                      {social.label}
                    </span>
                  </span>
                  <span className="relative flex size-7 items-center justify-center text-white transition-colors duration-300 ease-out group-hover:text-ink">
                    <ArrowGlyph absolute={false} size={28} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/*
         * Contact strip. The address is a full street line, so it is set in the
         * body face at reading size and given the widest column — in the display
         * face at 24px it wrapped to three lines. Below `bs-lg` the three cells
         * stack and centre, since a 3-up row there leaves each too narrow; the
         * address stays left-aligned beside its pin when it wraps on phones.
         */}
        <div
          className={cn(
            'grid grid-cols-1',
            // Phone hugs its number; address and copyright share the rest.
            'bs-lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]',
          )}
        >
          <address
            className={cn(
              'flex items-center justify-center gap-3 border-b border-rule px-5 py-6 not-italic',
              'bs-lg:min-h-[91px] bs-lg:justify-start bs-lg:border-b-0 bs-lg:border-r bs-lg:py-0 bs-xl:px-6',
            )}
          >
            <Image
              src="/assets/img/icon/location-icon.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="shrink-0"
            />
            <span className="font-body text-base font-medium tracking-body text-white bs-xl:text-lg">
              {footerContent.location}
            </span>
          </address>

          <div
            className={cn(
              'flex items-center justify-center border-b border-rule px-5 py-6',
              'bs-lg:min-h-[91px] bs-lg:border-b-0 bs-lg:border-r bs-lg:py-0',
            )}
          >
            <p className="text-center text-sm font-medium text-muted bs-xl:text-base">
              Copyright © {footerContent.copyrightYear}{' '}
              <AppLink
                href="/"
                className="font-semibold text-white transition-colors duration-300 ease-out hover:text-lime"
              >
                {siteConfig.legalName}
              </AppLink>
              , All rights reserved.
            </p>
          </div>

          <div
            className={cn(
              'flex items-center justify-center gap-3 px-5 py-6',
              'bs-lg:min-h-[91px] bs-lg:py-0 bs-xl:px-8',
            )}
          >
            <Image
              src="/assets/img/icon/call-icon.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="shrink-0"
            />
            <a
              href={`tel:${footerContent.phoneHref}`}
              className={cn(
                'whitespace-nowrap font-heading text-xl tracking-body text-white bs-xl:text-2xl',
                'transition-colors duration-300 ease-out hover:text-lime',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
              )}
            >
              {footerContent.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
