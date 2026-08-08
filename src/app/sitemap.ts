import type { MetadataRoute } from 'next';

import { serviceDetailPaths } from '@/lib/service-slugs';
import { jobListings } from '@/lib/careers-page';
import { siteConfig } from '@/lib/site';

/**
 * Generates `/sitemap.xml`.
 *
 * Only routes that actually resolve are listed. The navigation already points at
 * `/services`, `/about`, and the rest, but those pages ship in later phases —
 * listing them now would feed crawlers URLs that return 404, which suppresses
 * indexing of the whole site. Each route joins this list as it lands.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/careers`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const serviceDetailRoutes = serviceDetailPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const careerDetailRoutes = jobListings.map((job) => ({
    url: `${siteConfig.url}/careers/${job.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceDetailRoutes, ...careerDetailRoutes];
}
