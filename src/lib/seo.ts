import type { Metadata } from 'next';

import { brandLogo, siteConfig } from '@/lib/site';
import type { NavLink } from '@/types/navigation';
import type { ServiceDetail } from '@/types/service-detail';
import type { ServiceFaq } from '@/types/service-sections';

/**
 * Root document metadata.
 *
 * `metadataBase` is what lets every relative URL below (Open Graph images,
 * canonicals) resolve to absolute URLs — without it Next emits relative OG tags,
 * which most crawlers reject.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: '/',
  },
  // The favicon is the logo file itself rather than a separate copy under
  // `app/`, so the tab icon cannot fall out of step with the logo.
  icons: {
    icon: { url: brandLogo.src, type: 'image/png' },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/assets/img/bg/hero_bg.png',
        width: 1920,
        height: 938,
        alt: `${siteConfig.name} — premium IT solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/assets/img/bg/hero_bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

/**
 * Organisation JSON-LD.
 *
 * Serialised into a `<script type="application/ld+json">` in the root layout so
 * search engines can attach the brand's contact details, address, and social
 * profiles to a knowledge panel. Built from `siteConfig` so it cannot drift from
 * what the page actually renders.
 */
export function buildOrganizationJsonLd(): string {
  const { name, legalName, url, description, contact, social } = siteConfig;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    legalName,
    url,
    description,
    logo: `${url}${brandLogo.src}`,
    email: contact.email,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode,
    },
    sameAs: [social.linkedin, social.instagram, social.google],
  });
}

/**
 * WebSite JSON-LD, declaring the canonical site name for sitelink rendering.
 */
export function buildWebSiteJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
  });
}

/**
 * BreadcrumbList JSON-LD.
 *
 * This is what turns the URL line in a search result into the readable
 * `mccarthytech.com › Services › App Development` trail. Without it Google
 * falls back to the raw path, and interior pages lose the context that tells
 * someone what they are about to click.
 *
 * Positions are 1-indexed per the schema.org specification, and every `item` is
 * resolved to an absolute URL — relative paths in structured data are ignored.
 *
 * Driven from the same array the visible {@link BreadcrumbTrail} renders, so the
 * markup and the structured data cannot describe different hierarchies.
 *
 * @param items - The trail, root first.
 */
export function buildBreadcrumbJsonLd(items: readonly NavLink[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  });
}

/**
 * FAQPage JSON-LD.
 *
 * Makes the questions on a detail page eligible to appear as expandable results
 * in search. Google requires the answer text to match what is visible on the
 * page, so both are rendered from the same array rather than the structured data
 * carrying its own summarised copy.
 *
 * @param faqs - The questions and answers, in render order.
 */
export function buildFaqJsonLd(faqs: readonly ServiceFaq[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

/**
 * Service JSON-LD for one detail page.
 *
 * Declares the offering, who provides it, and where it is offered, which is what
 * makes the page eligible for service-specific result treatments rather than
 * being read as a generic marketing page.
 *
 * `provider` repeats the organisation rather than referencing the layout's
 * Organization node by `@id`. That is deliberate: the two scripts are separate
 * top-level graphs, and a dangling `@id` reference across them is a validation
 * error in Google's Rich Results Test.
 *
 * @param service - The service being described.
 */
export function buildServiceJsonLd(service: ServiceDetail): string {
  const { name, legalName, url, contact } = siteConfig;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seo.description,
    serviceType: service.name,
    url: `${url}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name,
      legalName,
      url,
      email: contact.email,
      telephone: contact.phone,
    },
    areaServed: {
      '@type': 'Country',
      name: contact.address.country,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${url}/contact`,
    },
  });
}
