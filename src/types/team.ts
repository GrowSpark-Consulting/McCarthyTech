import type { NavLink } from '@/types/navigation';

/**
 * Team domain types.
 */

/** Copy for one group of cards — an eyebrow over a heading. */
export interface TeamGroupContent {
  /** DOM id of the heading, which labels the group's section. */
  readonly id: string;
  /** Small label above the heading, e.g. "Leadership". */
  readonly eyebrow: string;
  readonly title: string;
}

/** Copy for the `/team` page, around the cards. */
export interface TeamPageContent {
  /** The browser tab title; the site name is appended by the root layout. */
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly title: string;
  /** Root first; the last entry is the current page. */
  readonly breadcrumb: readonly NavLink[];
  readonly leadership: TeamGroupContent;
  readonly people: TeamGroupContent;
}

/**
 * One person on the `/team` page.
 *
 * Only `id`, `name` and `role` are required. Without an `image` the card shows
 * a monogram of the name; without a `linkedinUrl` it shows no social button.
 */
export interface TeamMember {
  /** Stable key, unique across both groups. */
  readonly id: string;
  readonly name: string;
  /** Designation shown beneath the name, e.g. "Tech Lead". */
  readonly role: string;
  /** Portrait under `public/`, cropped to the card with `object-fit: cover`. */
  readonly image?: string;
  /** The person's own LinkedIn profile; opens in a new tab. */
  readonly linkedinUrl?: string;
}
