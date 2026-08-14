import type { Metadata } from 'next';

import { ServicesHub } from '@/components/sections/services-page/services-hub';
import { servicesPageContent } from '@/lib/services-page';

/**
 * Services hub metadata.
 *
 * Title and description are transcribed from the reference's own `<title>` and
 * meta description for this route, so the page keeps its established search
 * presence rather than inheriting the homepage's.
 */
export const metadata: Metadata = {
  title: {
    absolute: 'Our Services — AI, Web, App & Digital Solutions | McCarthy Tech',
  },
  description: servicesPageContent.lead,
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Our Services — AI, Web, App & Digital Solutions',
    description: servicesPageContent.lead,
    url: '/services',
  },
};

/** The `/services` hub page. */
export default function ServicesPage() {
  return <ServicesHub />;
}
