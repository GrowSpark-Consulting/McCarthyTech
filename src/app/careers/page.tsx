import type { Metadata } from 'next';

import { CareersHero } from '@/components/sections/careers-page/careers-hero';
import { CareersGallery } from '@/components/sections/careers-page/careers-gallery';
import { HiringProcess } from '@/components/sections/careers-page/hiring-process';
import { OpenPositions } from '@/components/sections/careers-page/open-positions';
import { BottomVideo } from '@/components/sections/careers-page/bottom-video';

export const metadata: Metadata = {
  title: 'Careers at Grow Spark — Join Our Team',
  description:
    'Explore open positions in development, design, and marketing at Grow Spark. Join our fully remote team and build state-of-the-art products.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at Grow Spark — Join Our Team',
    description:
      'Explore open positions in development, design, and marketing at Grow Spark. Join our fully remote team and build state-of-the-art products.',
    url: '/careers',
  },
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersGallery />
      <HiringProcess />
      <OpenPositions />
      <BottomVideo />
    </>
  );
}
