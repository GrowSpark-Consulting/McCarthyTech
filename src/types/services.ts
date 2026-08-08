/**
 * Services domain types.
 */

/** One panel in the services accordion. */
export interface ServiceOffering {
  /** Stable key and route segment. */
  readonly slug: string;
  /** Panel heading, also rendered rotated in the collapsed state. */
  readonly title: string;
  /** Supporting copy shown only while the panel is expanded. */
  readonly description: string;
  /** Destination route. */
  readonly href: string;
  /** Looping preview clip revealed with the panel. */
  readonly videoSrc: string;
}
