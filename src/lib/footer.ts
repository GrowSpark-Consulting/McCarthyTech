import { siteConfig } from '@/lib/site';
import type { NavLink } from '@/types/navigation';

/**
 * A footer nav column: a question, answered by the link beneath it.
 */
export interface FooterNavItem extends NavLink {
  /** The question above the link, e.g. "What we do?". */
  readonly prompt: string;
}

/** One row in the social bar. */
export interface FooterSocialLink {
  readonly id: 'linkedin' | 'instagram' | 'google';
  readonly label: string;
  readonly href: string;
}

/** Footer content. */
export const footerContent = {
  /** Giant decorative wordmark behind the email pill. */
  watermark: 'McCarthy Tech',
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  phoneHref: siteConfig.contact.phoneHref,
  location: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.locality} ${siteConfig.contact.address.postalCode}`,
  copyrightYear: 2025,
} as const;

/** The five prompt-and-link columns. */
export const footerNavItems: readonly FooterNavItem[] = [
  { prompt: 'What we do?', label: 'Services', href: '/services' },
  { prompt: 'Who we are?', label: 'About us', href: '/about' },
  { prompt: 'How we deliver', label: 'Contact us', href: '/contact' },
  { prompt: "What we're good at?", label: 'Our project', href: '/projects' },
  { prompt: 'News?', label: 'Blog', href: '/blog' },
];

/** The three social rows. */
export const footerSocialLinks: readonly FooterSocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: siteConfig.social.linkedin },
  { id: 'instagram', label: 'Instagram', href: siteConfig.social.instagram },
  { id: 'google', label: 'Google', href: siteConfig.social.google },
];
