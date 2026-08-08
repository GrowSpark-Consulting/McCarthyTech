'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { streamRows } from '@/lib/industries';
import { cn } from '@/lib/utils';
import type { StreamEntry } from '@/types/industries';

/** How often the request read-out advances to the next entry, in ms. */
const REQUEST_TICK_MS = 2600;

/** How often the telemetry grid and load bars resample, in ms. */
const TELEMETRY_TICK_MS = 1800;

/** Telemetry grid dimensions. */
const MATRIX_COLUMNS = 6;
const MATRIX_ROWS = 4;
const MATRIX_CELLS = MATRIX_COLUMNS * MATRIX_ROWS;

/** Regions and nodes the request panel cycles through. */
const REGIONS = ['us-west-2', 'eu-central-1', 'ap-southeast-1', 'us-east-1'] as const;
const NODES = ['cache-09', 'gpu-14', 'edge-03', 'infer-21'] as const;

/** Shared panel chrome — `.xb-stream-panel`. */
const PANEL_CLASS = cn(
  'absolute top-[44%] w-[300px] -translate-y-1/2 rounded-[14px] p-[18px]',
  'border border-mint/20 bg-[rgba(9,13,22,0.78)] backdrop-blur-[16px]',
  'shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)]',
  'font-mono text-[#cfe9df]',
  'duration-[400ms] z-[4] transition-all ease-out',
  // Below 1400px there is no room either side of the stream for a 300px panel.
  'max-bs-xxl:hidden',
);

/** Header row — `.xb-stream-panel__head`. */
const HEAD_CLASS =
  'mb-[14px] flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-mint';

/** A labelled read-out cell. */
function Readout({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
      <p className="mb-1 text-[9px] uppercase tracking-[1.5px] text-[#cfe9df]/45">{label}</p>
      <p className="truncate text-[13px] font-bold text-white">{value}</p>
    </div>
  );
}

/**
 * Deterministic pseudo-random generator.
 *
 * `Math.random()` cannot be used for the initial values: the server and client
 * would produce different numbers and React would report a hydration mismatch.
 * Seeding from the tick index gives stable first-paint output that still looks
 * arbitrary, and only changes once the client starts ticking.
 */
function seeded(seed: number): number {
  const x = Math.sin(seed) * 10_000;
  return x - Math.floor(x);
}

/** Two-digit figure for a matrix cell at a given tick. */
function matrixValue(cell: number, tick: number): number {
  return Math.floor(seeded(cell * 37 + tick * 91) * 100);
}

/**
 * Whether a cell is highlighted.
 *
 * The reference tints a scattered handful of cells rose to suggest saturated
 * nodes; the rest stay dim.
 */
function isHotCell(cell: number, tick: number): boolean {
  return seeded(cell * 13 + tick * 57) > 0.72;
}

export interface StreamPanelsProps {
  /** All pills, flattened — the request panel walks this list. */
  readonly entries?: readonly StreamEntry[];
}

/**
 * The two monospace read-out panels flanking the AI stream.
 *
 * The reference ships these as empty shells and fills them from client script,
 * so there is no markup to transcribe — only the chrome, which is. The contents
 * here are driven from the same `streamRows` data the pills use, so the request
 * panel always shows a request that genuinely appears in the stream rather than
 * a second, unrelated set of fixtures.
 *
 * Both are `aria-hidden`: they are an ambient simulation, and narrating a
 * counter that changes every 1.8 seconds would be hostile to a screen reader.
 *
 * Ticking stops when the section scrolls out of view and under reduced motion,
 * so this never burns a timer on content nobody is looking at.
 */
export function StreamPanels({ entries }: StreamPanelsProps) {
  const pool = useMemo(() => entries ?? streamRows.flatMap((row) => row.entries), [entries]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ rootMargin: '200px' });
  const isTicking = inView && !prefersReducedMotion;

  const [requestTick, setRequestTick] = useState(0);
  const [telemetryTick, setTelemetryTick] = useState(0);

  useEffect(() => {
    if (!isTicking) return;
    const id = window.setInterval(() => setRequestTick((t) => t + 1), REQUEST_TICK_MS);
    return () => window.clearInterval(id);
  }, [isTicking]);

  useEffect(() => {
    if (!isTicking) return;
    const id = window.setInterval(() => setTelemetryTick((t) => t + 1), TELEMETRY_TICK_MS);
    return () => window.clearInterval(id);
  }, [isTicking]);

  const active = pool[requestTick % pool.length];
  const throughput = 900 + Math.floor(seeded(requestTick * 7) * 1200);
  const cpu = 30 + Math.floor(seeded(telemetryTick * 3) * 50);
  const memory = 30 + Math.floor(seeded(telemetryTick * 11 + 5) * 50);

  return (
    <div ref={ref} aria-hidden="true">
      {/* Left — live request read-out. */}
      <div className={cn(PANEL_CLASS, 'left-[-336px]')}>
        <div className={HEAD_CLASS}>
          <span
            className={cn(
              'size-[7px] rounded-full bg-mint shadow-[0_0_8px_#00ff97]',
              'animate-live-pulse motion-reduce:animate-none',
            )}
          />
          Request · Live
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Readout label="Method" value={active?.label ?? 'GET'} />
          <Readout label="Status" value={active?.value ?? '200'} />
        </div>
        <div className="mt-2.5">
          <Readout label="Endpoint" value={active?.text ?? '/ai/inference'} />
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <Readout label="Latency" value={`${active?.latencyMs ?? 0} ms`} />
          <Readout label="Throughput" value={`${throughput.toLocaleString('en-US')}/s`} />
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <Readout label="Region" value={REGIONS[requestTick % REGIONS.length] ?? REGIONS[0]} />
          <Readout label="Node" value={NODES[requestTick % NODES.length] ?? NODES[0]} />
        </div>
      </div>

      {/* Right — telemetry matrix. */}
      <div className={cn(PANEL_CLASS, 'right-[-336px]')}>
        <div className={HEAD_CLASS}>
          Telemetry Matrix
          <span className="animate-xb-blink motion-reduce:animate-none">▍</span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: MATRIX_CELLS }, (_, cell) => {
            const hot = isHotCell(cell, telemetryTick);
            return (
              <span
                key={cell}
                className={cn(
                  'rounded px-1 py-1.5 text-center text-[11px] font-bold tabular-nums',
                  'transition-colors duration-500 ease-out',
                  hot ? 'bg-danger/20 text-danger-soft' : 'bg-white/[0.04] text-[#cfe9df]/70',
                )}
              >
                {matrixValue(cell, telemetryTick).toString().padStart(2, '0')}
              </span>
            );
          })}
        </div>

        <div className="mt-3 space-y-2">
          <LoadBar label="CPU" percent={cpu} />
          <LoadBar label="MEM" percent={memory} />
        </div>
      </div>
    </div>
  );
}

/**
 * A labelled load meter.
 *
 * The fill is driven by `scaleX` on a full-width layer rather than by animating
 * `width`, so each resample composites instead of triggering layout.
 */
function LoadBar({ label, percent }: { readonly label: string; readonly percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative h-[26px] flex-1 overflow-hidden rounded bg-white/[0.05]">
        <span
          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#00a4af] to-mint transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </span>
      <span className="w-[68px] shrink-0 text-right text-[11px] font-bold tabular-nums text-[#cfe9df]/80">
        {label} {percent}%
      </span>
    </div>
  );
}
