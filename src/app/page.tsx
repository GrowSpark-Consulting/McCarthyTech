import type { Metadata } from 'next';

import { AboutSection } from '@/components/sections/about/about-section';
import { BrandMarqueeSection } from '@/components/sections/brands/brand-marquee-section';
import { ContactSection } from '@/components/sections/contact/contact-section';
import { FeaturesSection } from '@/components/sections/features/features-section';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { AiStreamSection } from '@/components/sections/industries/ai-stream-section';
import { IndustriesServedSection } from '@/components/sections/industries/industries-served-section';
import { ProjectsSection } from '@/components/sections/projects/projects-section';
import { ServicesSection } from '@/components/sections/services/services-section';
import { TestimonialsSection } from '@/components/sections/testimonials/testimonials-section';
import { siteConfig } from '@/lib/site';

/**
 * Home page metadata.
 *
 * Overrides only the canonical path; title, description, and social cards are
 * inherited from the root layout, so the home page never carries a duplicated
 * or subtly divergent copy of them.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: {
    absolute: siteConfig.title,
  },
};

/**
 * Home page.
 *
 * Sections mount in document order, matching the reference's layout: hero,
 * about, services, features, client logos, projects, AI stream, industries
 * served. The hero's scroll cue targets `#about`, which `AboutSection` owns.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <BrandMarqueeSection />
      <ProjectsSection />
      <AiStreamSection />
      <IndustriesServedSection />
      <ContactSection />
      <TestimonialsSection />
    </>
  );
}
