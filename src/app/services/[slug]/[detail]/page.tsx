import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceSubDetailPage } from '@/components/sections/service-detail/service-sub-detail-page';
import { buildBreadcrumbJsonLd } from '@/lib/seo';
import { getServiceDetail } from '@/lib/service-details';
import { getServiceSubDetail, serviceSubDetails } from '@/lib/service-sub-details';
import type { NavLink } from '@/types/navigation';

/**
 * Route params.
 *
 * Next 15 hands `params` to pages as a Promise; it must be awaited before any
 * property is read.
 */
interface ServiceSubDetailPageProps {
  readonly params: Promise<{ readonly slug: string; readonly detail: string }>;
}

/**
 * Pre-renders every offering card's own page at build time.
 *
 * Currently four — all of them App Development's. The route is a closed set in
 * the same way `/services/[slug]` is: `dynamicParams = false` means a segment
 * pair not returned here 404s without a render being attempted.
 */
export function generateStaticParams(): Array<{ slug: string; detail: string }> {
  return serviceSubDetails.map((sub) => ({ slug: sub.parentSlug, detail: sub.slug }));
}

/** Reject any pair not returned by {@link generateStaticParams}. */
export const dynamicParams = false;

export async function generateMetadata({ params }: ServiceSubDetailPageProps): Promise<Metadata> {
  const { slug, detail } = await params;
  const sub = getServiceSubDetail(slug, detail);

  if (sub === undefined) return {};

  const path = `/services/${sub.parentSlug}/${sub.slug}`;

  return {
    title: { absolute: sub.seo.title },
    description: sub.seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: sub.seo.title,
      description: sub.seo.description,
      url: path,
    },
    twitter: {
      card: 'summary_large_image',
      title: sub.seo.title,
      description: sub.seo.description,
    },
  };
}

/**
 * One offering card's own page — e.g. `/services/app-development/ios`.
 *
 * Exists because the reference gives App Development's four offering cards
 * real destinations, unlike every other service's cards, which point back at
 * their own parent. The breadcrumb resolves the parent's display name from
 * `lib/service-details.ts` rather than repeating it here, so the two cannot
 * drift apart.
 *
 * @param props - See {@link ServiceSubDetailPageProps}.
 */
export default async function ServiceSubDetailRoute({ params }: ServiceSubDetailPageProps) {
  const { slug, detail } = await params;
  const sub = getServiceSubDetail(slug, detail);
  const parent = getServiceDetail(slug);

  if (sub === undefined || parent === undefined) notFound();

  const breadcrumb: readonly NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: parent.name, href: `/services/${parent.slug}` },
    { label: sub.title, href: `/services/${sub.parentSlug}/${sub.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd(breadcrumb) }}
      />
      <ServiceSubDetailPage detail={sub} breadcrumb={breadcrumb} />
    </>
  );
}
