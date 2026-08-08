import type { Metadata } from 'next';

import { AboutFeatures } from '@/components/sections/about-page/about-features';
import { AboutHero } from '@/components/sections/about-page/about-hero';
import { AboutOverview } from '@/components/sections/about-page/about-overview';
import { AboutStats } from '@/components/sections/about-page/about-stats';
import { AboutTransform } from '@/components/sections/about-page/about-transform';

export const metadata: Metadata = {
  title: 'About Grow Spark — Engineering the Future',
  description:
    'Learn about Grow Spark, a Chennai-based AI and software development company turning visionary ideas into functional, real-world technology.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Grow Spark — Engineering the Future',
    description:
      'Learn about Grow Spark, a Chennai-based AI and software development company turning visionary ideas into functional, real-world technology.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOverview />
      <AboutStats />
      <AboutFeatures />
      <AboutTransform />
    </>
  );
}
