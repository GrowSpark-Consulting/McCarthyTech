import type { Metadata } from 'next';

import { AboutSection } from '@/components/sections/about/about-section';
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
 * Sections mount in document order: hero, about, services, features, an empty
 * band, projects, AI stream, industries served. The hero's scroll cue targets
 * `#about`, which `AboutSection` owns.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      {/*
       * Deliberately empty. The client-logo strip that stood here was removed,
       * and this keeps the footprint it occupied — its 170px/150px padding
       * around a 225px card, or 80px/80px around a 220px card below `bs-md` —
       * so the sections beneath stay where they were.
       */}
      <div aria-hidden="true" className="h-[545px] max-bs-md:h-[380px]" />
      <ProjectsSection />
      <AiStreamSection />
      <IndustriesServedSection />
      <ContactSection />
      <TestimonialsSection />
    </>
  );
}
