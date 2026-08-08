import type { ServiceOffering } from '@/types/services';
import type { NavLink } from '@/types/navigation';

/**
 * Services section content.
 *
 * Copy is transcribed verbatim from the reference, including the original's
 * misspelled asset filename (`app-developoment.mp4`) — the file on disk carries
 * that name, so "correcting" it here would simply 404.
 */
export const servicesContent = {
  heading: 'Comprehensive Digital Solutions',
  eyebrow: 'Our Expertise',
  cta: { label: 'view more services', href: '/services' } satisfies NavLink,
} as const;

/** The seven panels, in render order. */
export const serviceOfferings: readonly ServiceOffering[] = [
  {
    slug: 'app-development',
    title: 'App Development',
    description:
      "Native & cross-platform solutions (iOS & Android) that keep your business at your customers' fingertips.",
    href: '/services/app-development',
    videoSrc: '/assets/img/video/app-developoment.mp4',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    description:
      'High-converting corporate websites and complex web applications built for speed and scalability.',
    href: '/services/web-development',
    videoSrc: '/assets/img/video/web-dev.mp4',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'User-centric designs that are as intuitive as they are beautiful. We design specifically for your users.',
    href: '/services/ui-ux-design',
    videoSrc: '/assets/img/video/ui-ux.mp4',
  },
  {
    slug: 'ai-implementation',
    title: 'AI Implementation',
    description:
      'From automation to LLMs, we integrate data-driven insights into your daily operations.',
    href: '/services/ai-implementation',
    videoSrc: '/assets/img/video/ai-implementation.mp4',
  },
  {
    slug: 'branding',
    title: 'Branding',
    description:
      'Amplifying your brand identity through strategic SEO, social media, and content campaigns.',
    href: '/services/branding',
    videoSrc: '/assets/img/video/branding-new.mp4',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven strategies to boost your online presence, traffic, and sales growth.',
    href: '/services/digital-marketing',
    videoSrc: '/assets/img/video-assets/digital-marketing.mp4',
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    description:
      'Tailor-made software solutions designed to address your unique business challenges.',
    href: '/services/custom-software',
    videoSrc: '/assets/img/video/custom-software.mp4',
  },
] as const;
