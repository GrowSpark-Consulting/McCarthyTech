import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceBrandsSection } from '@/components/sections/service-detail/service-brands-section';
import { ServiceDetailHero } from '@/components/sections/service-detail/service-detail-hero';
import { ServiceHeroBand } from '@/components/sections/service-detail/service-hero-band';
import { ServiceFaqSection } from '@/components/sections/service-detail/service-faq-section';
import { ServiceBrandBand } from '@/components/sections/service-detail/service-brand-band';
import { ServiceFaqBandSection } from '@/components/sections/service-detail/service-faq-section-band';
import { ServiceChooseBand } from '@/components/sections/service-detail/service-choose-band';
import { ServiceOfferingsBand } from '@/components/sections/service-detail/service-offerings-band';
import { ServiceFeaturesBand } from '@/components/sections/service-detail/service-features-band';
import { ServiceCtaBand } from '@/components/sections/service-detail/service-cta-band';
import { ServiceIntegrationBand } from '@/components/sections/service-detail/service-integration-band';
import { ServiceNumberedFaqBand } from '@/components/sections/service-detail/service-numbered-faq-band';
import { ServicePricingBand } from '@/components/sections/service-detail/service-pricing-band';
import { ServiceLogoMarqueeBand } from '@/components/sections/service-detail/service-logo-marquee-band';
import { ServiceShowcaseBand } from '@/components/sections/service-detail/service-showcase-band';
import { ServiceSplitHero } from '@/components/sections/service-detail/service-split-hero';
import { ServiceOfferingsSection } from '@/components/sections/service-detail/service-offerings-section';
import { ServiceOverviewBand } from '@/components/sections/service-detail/service-overview-band';
import { ServiceOverviewSection } from '@/components/sections/service-detail/service-overview-section';
import { ServiceProcessBand } from '@/components/sections/service-detail/service-process-band';
import { ServiceReasonsSection } from '@/components/sections/service-detail/service-reasons-section';
import { ServiceTechRow } from '@/components/sections/service-detail/service-tech-row';
import { ServiceTestimonialsSection } from '@/components/sections/service-detail/service-testimonials-section';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from '@/lib/seo';
import { getServiceDetail, serviceDetails } from '@/lib/service-details';
import { getServiceSections } from '@/lib/service-sections';
import { isServiceSlug } from '@/lib/service-slugs';
import type { NavLink } from '@/types/navigation';
import type { ServiceDetail } from '@/types/service-detail';

/**
 * Route params.
 *
 * Next 15 hands `params` to pages as a Promise — the change that lets a route
 * begin streaming before its dynamic segments have resolved. It must be awaited
 * before any property is read.
 */
interface ServiceDetailPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

/**
 * Pre-renders all eight detail pages at build time.
 *
 * Combined with {@link dynamicParams} below, this makes the route a closed set:
 * the eight known services become static HTML, and anything else 404s without
 * ever reaching the server. That is both faster and safer than rendering on
 * demand — an arbitrary `/services/<anything>` cannot spin up a render.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

/** Reject any slug not returned by {@link generateStaticParams}. */
export const dynamicParams = false;

/**
 * Builds the trail shown above the heading and published as structured data.
 *
 * @param service - The service being rendered.
 */
function buildBreadcrumb(service: ServiceDetail): readonly NavLink[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.name, href: `/services/${service.slug}` },
  ];
}

/**
 * Per-service metadata.
 *
 * Each page carries its own absolute title, description, canonical, and social
 * card. Titles are authored absolutely rather than run through the site's
 * `%s | Grow Spark` template, because they already name the brand — the
 * template would produce "… | Grow Spark | Grow Spark".
 *
 * Returning empty metadata for an unknown slug is unreachable while
 * `dynamicParams` is `false`, but Next still types the params as arbitrary
 * strings; the guard keeps this total rather than relying on that invariant
 * holding forever.
 */
export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (service === undefined) return {};

  const path = `/services/${service.slug}`;

  return {
    title: { absolute: service.seo.title },
    description: service.seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: service.seo.title,
      description: service.seo.description,
      url: path,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

/**
 * One service detail page.
 *
 * Phase 1 renders the hero band. The two structured-data blocks are emitted
 * here rather than in the layout because both are page-specific: the breadcrumb
 * describes this route's position, and the Service node describes this service.
 *
 * @param props - See {@link ServiceDetailPageProps}.
 */
export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (service === undefined) notFound();

  const breadcrumb = buildBreadcrumb(service);
  const sections = isServiceSlug(slug) ? getServiceSections(slug) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised by `JSON.stringify` from typed, in-repo config. No user
        // input reaches this string.
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildServiceJsonLd(service) }}
      />

      {sections === undefined ? null : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(sections.faq.faqs) }}
        />
      )}

      {/*
        Services are being rebuilt against the reference one at a time. Those
        already ported render the reference's own opening band; the rest keep the
        earlier hero until their turn comes.

        The technology row is deliberately absent from the ported branch — the
        reference has no such section, and it sits directly against the hero's
        bottom edge, so leaving it in would be visible. Technologies return in
        their own phase, in the form the reference actually gives them.
      */}
      {service.heroBand !== undefined ? (
        <ServiceHeroBand service={service} />
      ) : service.splitHeroBand !== undefined ? (
        <ServiceSplitHero service={service} />
      ) : (
        <>
          <ServiceDetailHero service={service} breadcrumb={breadcrumb} />
          <ServiceTechRow tech={service.hero.tech} accent={service.accent} />
        </>
      )}

      {service.showcaseBand === undefined ? null : <ServiceShowcaseBand service={service} />}
      {service.featuresBand === undefined ? null : <ServiceFeaturesBand service={service} />}
      {service.logoMarqueeBand === undefined ? null : <ServiceLogoMarqueeBand service={service} />}
      {service.processBand === undefined ? null : <ServiceProcessBand service={service} />}
      {service.integrationBand === undefined ? null : <ServiceIntegrationBand service={service} />}
      {service.pricingBand === undefined ? null : <ServicePricingBand service={service} />}
      {service.numberedFaqBand === undefined ? null : <ServiceNumberedFaqBand service={service} />}
      {service.ctaBand === undefined ? null : <ServiceCtaBand service={service} />}
      {service.overviewBand === undefined ? null : <ServiceOverviewBand service={service} />}
      {service.offeringsBand === undefined ? null : <ServiceOfferingsBand service={service} />}
      {service.brandBand === undefined ? null : <ServiceBrandBand service={service} />}
      {service.chooseBand === undefined ? null : <ServiceChooseBand service={service} />}
      {service.faqBand === undefined ? null : <ServiceFaqBandSection service={service} />}

      {/* Services still to be built out render the hero and technology row and
          stop, rather than showing empty section shells. */}
      {sections === undefined ? null : (
        <>
          {/* Superseded once the service has a reference-accurate overview. */}
          {service.overviewBand !== undefined ? null : (
            <ServiceOverviewSection band={sections.overview} accent={service.accent} />
          )}
          {/* Superseded once the service has a reference-accurate offerings grid. */}
          {service.offeringsBand !== undefined ? null : (
            <ServiceOfferingsSection band={sections.offerings} accent={service.accent} />
          )}
          {/* Superseded once the service has a reference-accurate client band. */}
          {service.brandBand !== undefined ? null : (
            <ServiceBrandsSection band={sections.brands} accent={service.accent} />
          )}
          {/* Superseded once the service has a reference-accurate choose grid. */}
          {service.chooseBand !== undefined ? null : (
            <ServiceReasonsSection band={sections.reasons} accent={service.accent} />
          )}
          {/*
            The reference ships this band with an inline `display: none` — the
            markup is there, the section is not. Reproducing that means not
            rendering it at all rather than rendering it hidden, which would put
            four testimonials into the accessibility tree and the page's text
            content for no one's benefit.
          */}
          {service.faqBand !== undefined ? null : (
            <ServiceTestimonialsSection band={sections.testimonials} accent={service.accent} />
          )}

          {/* Superseded once the service has a reference-accurate FAQ band. */}
          {service.faqBand !== undefined ? null : (
            <ServiceFaqSection band={sections.faq} accent={service.accent} />
          )}
        </>
      )}
    </>
  );
}
