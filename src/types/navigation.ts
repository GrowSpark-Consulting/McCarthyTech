/**
 * Navigation domain types.
 *
 * The header renders three distinct menus from one source of truth
 * (`src/lib/navigation.ts`): the desktop bar, the services mega-menu, and the
 * mobile drawer. Modelling them as data — rather than as three hand-written JSX
 * trees — is what keeps the labels, hrefs, and ordering guaranteed identical
 * across all three, and makes adding a route a one-line change.
 */

/** A leaf entry in any navigation surface. */
export interface NavLink {
  /** Visible label. Casing is authored exactly as it should render. */
  readonly label: string;
  /** Application-relative route. */
  readonly href: string;
}

/**
 * A service tile inside the mega-menu grid: an icon, a title, and a one-line
 * value proposition rendered beneath it.
 */
export interface ServiceMenuItem extends NavLink {
  /** Public path to the tile's SVG glyph. */
  readonly iconSrc: string;
  /** Supporting copy shown under the title. */
  readonly description: string;
}

/**
 * A top-level entry in the primary navigation.
 *
 * `services` is present only on the entry that opens the mega-menu; its
 * presence is what the renderer branches on, so no extra "hasDropdown" flag is
 * needed and an entry can never claim a dropdown it has no content for.
 */
export interface PrimaryNavItem extends NavLink {
  readonly services?: readonly ServiceMenuItem[];
}

/** Promo panel shown alongside the mega-menu's service grid. */
export interface MegaMenuPromo {
  /** Looping preview clip. */
  readonly videoSrc: string;
  /** Headline copy. */
  readonly heading: string;
  /** Call-to-action rendered under the heading. */
  readonly cta: NavLink;
  /** Intrinsic render size of the clip, in CSS pixels. */
  readonly width: number;
  readonly height: number;
}
