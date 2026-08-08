import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

/**
 * Generates `/robots.txt`.
 *
 * Next builds this at compile time, so the sitemap URL always matches the
 * deployed origin rather than a hard-coded one.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
