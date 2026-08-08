import Image from 'next/image';

import { ServiceSubProcessAccordion } from '@/components/sections/service-detail/service-sub-process-accordion';
import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/types/navigation';
import type { ServiceSubDetail } from '@/types/service-detail';

/** DOM id the `<h1>` carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-sub-heading';

export interface ServiceSubDetailPageProps {
  /** The sub-page being rendered. */
  readonly detail: ServiceSubDetail;
  /** Trail from the site root down to this page. */
  readonly breadcrumb: readonly NavLink[];
}

/**
 * `service-details` — the reference's template for an offering card's own page.
 *
 * Two bands: a centred breadcrumb hero on the page's background image, then a
 * two-part body — a hero shot with a lead description, followed by a process
 * accordion beside a numbered step list, and a checklist of what the
 * engagement delivers.
 *
 * A Server Component apart from the accordion.
 *
 * @param props - See {@link ServiceSubDetailPageProps}.
 */
export function ServiceSubDetailPage({ detail, breadcrumb }: ServiceSubDetailPageProps) {
  return (
    <>
      {/* `.breadcrumb.bg_img` */}
      <section
        aria-labelledby={HEADING_ID}
        className={cn(
          'flex min-h-[500px] items-center bg-svc-hero-frame bg-cover bg-center bg-no-repeat',
          'py-[100px] pt-[150px] max-bs-lg:py-20 max-bs-lg:pt-[130px]',
        )}
      >
        <Container>
          <div className="text-center">
            <BreadcrumbTrail items={breadcrumb} className="flex justify-center" />
            <h1
              id={HEADING_ID}
              className="mt-6 font-heading text-[65px] font-normal tracking-display text-white max-bs-lg:text-[44px] max-bs-md:text-[34px]"
            >
              {detail.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* `.service-details` */}
      <section className="pb-[130px] pt-[75px] max-bs-md:pb-20 max-bs-md:pt-10">
        <Container>
          {/* `.single-item-image.service-det-img` */}
          <div className="relative mb-[75px] overflow-hidden rounded-[16px]">
            <Image
              src={detail.heroImage}
              alt={detail.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 1140px) 100vw, 1140px"
              className="h-auto w-full object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-veil/20" />
          </div>

          <h2 className="mb-[15px] font-heading text-[42px] font-normal leading-[52px] tracking-[-0.03em] text-white max-bs-lg:text-[32px] max-bs-lg:leading-[1.3]">
            {detail.subtitle}
          </h2>

          {detail.description.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 40)}
              className={cn('text-hero-sub text-subtle', index === 0 ? 'mb-[30px]' : 'mb-0')}
            >
              {paragraph}
            </p>
          ))}

          {/* `.service-process-wrap` */}
          <ServiceSubProcessAccordion steps={detail.process} />

          {/* `.services-outcome-wrap` */}
          <div className="mt-[60px] border-t border-white/10 pt-[60px]">
            <h2 className="mb-[15px] font-heading text-[42px] font-normal leading-[52px] tracking-[-0.03em] text-white max-bs-lg:text-[32px] max-bs-lg:leading-[1.3]">
              {detail.outcomeHeading}
            </h2>

            <ul className="m-0 grid grid-cols-1 gap-x-8 gap-y-4 p-0 bs-md:grid-cols-2">
              {detail.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-white">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-bold text-ink"
                  >
                    ✓
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
