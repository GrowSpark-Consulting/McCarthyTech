import { AppLink } from '@/components/ui/app-link';
import { Container } from '@/components/ui/container';
import { teamPageContent } from '@/lib/team-page';
import { cn } from '@/lib/utils';

/** DOM id of the page heading, which labels the hero. */
const HEADING_ID = 'team-page-heading';

/**
 * The Team page title band — `.breadcrumb.bg_img` in the reference.
 *
 * The same band the Projects page opens with, over the same curtain backdrop:
 * a breadcrumb flanked by two lime dots, then the title. The reference sets the
 * title in an `h2`; here it is the page's `h1`, with the same type.
 */
export function TeamHero() {
  const { breadcrumb, title } = teamPageContent;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        'flex min-h-[500px] items-center bg-breadcrumb-stage bg-cover bg-center bg-no-repeat',
        'pb-[100px] pt-[150px]',
        'max-bs-lg:min-h-[380px] max-bs-lg:pt-[140px] max-bs-md:min-h-[360px]',
      )}
    >
      <Container className="text-center">
        <nav aria-label="Breadcrumb">
          <ol
            className={cn(
              'relative m-0 inline-flex list-none items-center p-0 capitalize',
              // The two lime dots — `.breadcrumb__list::before/::after`.
              "before:absolute before:-left-4 before:top-1/2 before:size-2 before:-translate-y-1/2 before:rounded-full before:bg-lime before:content-['']",
              "after:absolute after:-right-4 after:top-1/2 after:size-2 after:-translate-y-1/2 after:rounded-full after:bg-lime after:content-['']",
            )}
          >
            {breadcrumb.map((item, index) => {
              const isCurrent = index === breadcrumb.length - 1;

              return (
                <li key={item.href} className={index === 0 ? undefined : 'pl-2'}>
                  {index === 0 ? null : (
                    <span aria-hidden="true" className="pr-2 text-white/75">
                      {'//'}
                    </span>
                  )}
                  {isCurrent ? (
                    <span aria-current="page">{item.label}</span>
                  ) : (
                    <AppLink
                      href={item.href}
                      className={cn(
                        'rounded-sm transition-colors duration-300 ease-out hover:text-lime',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
                      )}
                    >
                      {item.label}
                    </AppLink>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/*
         * `leading-*` comes after the `text-*` sizes: `cn` runs tailwind-merge,
         * which drops a line-height that precedes a font-size.
         */}
        <h1
          id={HEADING_ID}
          className={cn(
            'mt-6 font-heading font-normal tracking-[-0.07em] text-white',
            'max-bs-lg:mt-[15px] max-bs-md:mt-2.5',
            'text-[65px] max-bs-xl:text-[52px] max-bs-lg:text-[45px] max-bs-md:text-[28px] max-[480px]:text-[23px]',
            'leading-[1.2]',
          )}
        >
          {title}
        </h1>
      </Container>
    </section>
  );
}
