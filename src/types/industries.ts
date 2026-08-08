import type { ImageAsset } from '@/types/media';

/**
 * One pill in the simulated live stream.
 *
 * The stream mixes two kinds of pill that share one shape: API traffic
 * (`POST · 201 · /ai/inference`) and company stats
 * (`Trusted · 30+ · Projects Delivered Globally`). Both are modelled with the
 * same three slots rather than a discriminated union, because they are
 * visually identical — only the words differ.
 *
 * `tone` drives the whole pill's palette — mint for normal traffic, red for
 * destructive calls — rather than each colour being set at the call site.
 */
export interface StreamEntry {
  /** Leading chip: an HTTP verb, or a stat category like "Trusted". */
  readonly label: string;
  /** Bordered chip: a status code, or a figure like "30+" or "99.9%". */
  readonly value: string;
  /** Main text: a request path, or a stat description. */
  readonly text: string;
  /** Trailing latency read-out, in milliseconds. */
  readonly latencyMs: number;
  readonly tone: 'mint' | 'danger';
  /** Whether this pill carries a pulsing "live" dot. */
  readonly isLive?: boolean;
}

/** A single scrolling row: its pills, pace, and direction. */
export interface StreamRow {
  readonly id: string;
  readonly entries: readonly StreamEntry[];
  /** Tailwind animation utility carrying this row's duration and direction. */
  readonly animationClass: string;
}

/** One card in the industries-served strip. */
export interface ServedIndustry {
  readonly id: string;
  readonly title: string;
  readonly icon: ImageAsset;
}
