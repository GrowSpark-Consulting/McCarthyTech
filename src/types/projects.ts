/**
 * Projects domain types.
 */

/** A labelled fact shown beneath a project's description. */
export interface ProjectFact {
  /** Field name, e.g. "Industry". */
  readonly label: string;
  /** Field value, rendered in the accent colour. */
  readonly value: string;
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
