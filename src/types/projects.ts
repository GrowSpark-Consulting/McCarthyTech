import type { NavLink } from '@/types/navigation';

/**
 * Projects domain types.
 */

/** Copy for the `/projects` page, around the project list. */
export interface ProjectsPageContent {
  /** The browser tab title; the site name is appended by the root layout. */
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly title: string;
  /** Optional line beneath the title. The reference has none. */
  readonly description?: string;
  /** Root first; the last entry is the current page. */
  readonly breadcrumb: readonly NavLink[];
  /** Label on every card's button. */
  readonly cardCta: string;
  /** Accessible name for the list of projects. */
  readonly listLabel: string;
}

/** A labelled fact shown beneath a project's description. */
export interface ProjectFact {
  /** Field name, e.g. "Industry". */
  readonly label: string;
  /** Field value, rendered in the accent colour. */
  readonly value: string;
}

/**
 * One project on the `/projects` page.
 *
 * Only `id`, `title`, `description` and `image` are required. Each optional
 * field that is set becomes a fact in the card's facts row; a project with none
 * of them renders exactly like the reference card — title, copy and button.
 */
export interface Project {
  /** Stable key, unique across the list. */
  readonly id: string;
  readonly title: string;
  /** Shown as the "Category" fact, e.g. "Web Development". */
  readonly category?: string;
  readonly description: string;
  /** Screenshot or cover under `public/`, shown at 16:9 with `object-fit: cover`. */
  readonly image: string;
  /**
   * Set to `'light'` when the screenshot is mostly light. The card's glass is
   * nearly clear and blurs whatever is behind it, so over a white page its white
   * text would vanish; `'light'` gives it a dark tint instead. Defaults to
   * `'dark'`, the reference's look.
   */
  readonly imageTone?: 'dark' | 'light';
  /** Shown as the "Stack" fact, comma-separated. */
  readonly technologies?: readonly string[];
  /** Shown as the "Year" fact. */
  readonly year?: string;
  /** Shown as the "Client" fact. */
  readonly client?: string;
  /** Where the card's button goes. External URLs open in a new tab. */
  readonly liveUrl?: string;
  /** Adds a "Source" fact linking to the repository. */
  readonly githubUrl?: string;
  /** Featured projects are listed first, keeping their order among themselves. */
  readonly featured?: boolean;
}

/** One card in the sticky project stack. */
export interface ProjectShowcase {
  /** Stable key. */
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  /** Exactly two facts — the layout is a fixed two-column row. */
  readonly facts: readonly [ProjectFact, ProjectFact];
  /** Looping clip shown behind the caption. */
  readonly videoSrc: string;
  /** Destination for the card's CTA. */
  readonly href: string;
}
