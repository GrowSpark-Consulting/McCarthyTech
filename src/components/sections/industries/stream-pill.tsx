import { cn } from '@/lib/utils';
import type { StreamEntry } from '@/types/industries';

/** Per-tone palette, so a pill's colours are chosen once from its `tone`. */
const TONE_STYLES = {
  mint: {
    tag: 'bg-stream-tag text-lime',
    status: 'text-stream-code border-stream-code-border',
    metric: 'text-mint',
    dot: 'bg-mint animate-live-pulse',
    hover: 'hover:border-mint/55 hover:shadow-[0_6px_26px_-2px_rgba(0,255,151,0.35)]',
  },
  danger: {
    tag: 'bg-danger/10 text-danger',
    status: 'text-danger border-danger',
    metric: 'text-danger-soft',
    dot: 'bg-danger animate-live-pulse-red',
    hover: 'hover:border-danger/55 hover:shadow-[0_6px_26px_-2px_rgba(252,1,89,0.35)]',
  },
} as const;

export interface StreamPillProps {
  readonly entry: StreamEntry;
}

/**
 * One request pill in the simulated API stream.
 *
 * The latency read-out is fixed at a 48px minimum width and set in tabular
 * figures — without both, a three-digit value would be wider than a two-digit
 * one and the pill would visibly jitter as the strip loops.
 *
 * Purely illustrative, so the whole strip is hidden from assistive technology by
 * its container; nothing here needs an accessible name.
 *
 * @param props - See {@link StreamPillProps}.
 */
export function StreamPill({ entry }: StreamPillProps) {
  const tone = TONE_STYLES[entry.tone];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-full',
        'border border-white/15 bg-stream-pill py-[5px] pl-2 pr-4 backdrop-blur-[40px]',
        'shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
        'transition-[transform,border-color,box-shadow] duration-pill ease-out',
        'hover:-translate-y-0.5 hover:scale-105',
        tone.hover,
      )}
    >
      <span
        className={cn(
          'inline-block rounded-[11px] px-[10px] text-[11px] font-semibold uppercase leading-[22px]',
          tone.tag,
        )}
      >
        {entry.label}
      </span>
      <span
        className={cn(
          'inline-block rounded-[11px] border px-[10px] text-[11px] font-semibold uppercase leading-[22px]',
          tone.status,
        )}
      >
        {entry.value}
      </span>
      <p className="m-0 inline-block whitespace-nowrap text-[13px] text-stream-path">
        {entry.text}
      </p>
      <span
        className={cn(
          'min-w-12 text-right text-[11px] font-bold tabular-nums tracking-[0.3px]',
          tone.metric,
        )}
      >
        {entry.latencyMs}ms
      </span>
      {entry.isLive === true ? (
        <span
          className={cn('size-[7px] shrink-0 rounded-full motion-reduce:animate-none', tone.dot)}
        />
      ) : null}
    </div>
  );
}
