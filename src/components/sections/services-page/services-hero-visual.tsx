import { cn } from '@/lib/utils';

/** Ring radii, in the 400×400 viewBox. */
const OUTER = 186;
const MIDDLE = 136;
const INNER = 86;

/** Point on a ring at `deg` degrees clockwise from 3 o'clock. */
function onRing(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: 200 + radius * Math.cos(rad), y: 200 + radius * Math.sin(rad) };
}

/** A clockwise arc along `radius` from `from` to `to` degrees. */
function arcPath(radius: number, from: number, to: number) {
  const a = onRing(radius, from);
  const b = onRing(radius, to);
  const largeArc = to - from > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${largeArc} 1 ${b.x} ${b.y}`;
}

/** Nodes riding the middle ring, which drifts clockwise. */
const MIDDLE_NODES = [24, 148, 262].map((deg) => onRing(MIDDLE, deg));
const ARC = { from: 200, to: 290 };
const ARC_HEAD = onRing(OUTER, ARC.to);

/**
 * Decorative orbital diagram for the `/services` hero.
 *
 * Three concentric rings around a glowing core: a tick-marked outer dial, a
 * dashed middle orbit carrying three nodes, and an aurora-tinted arc sweeping
 * the outer ring the other way. Drawn as inline SVG in the site's own mint,
 * cyan and aurora accents, so it ships no image request and stays sharp at
 * every size.
 *
 * Motion is limited to two slow rotations built from the existing `svc-orbit`
 * and `about-orbit` animations, which run on the compositor and stop under
 * `prefers-reduced-motion`.
 */
export function ServicesHeroVisual({ className }: { readonly className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative aspect-square w-full', className)}>
      {/* Indigo bloom seating the diagram against the canvas. */}
      <span className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(44,50,254,0.2)_0%,rgba(44,50,254,0)_62%)]" />

      <svg viewBox="0 0 400 400" fill="none" className="relative size-full overflow-visible">
        <defs>
          <radialGradient id="svc-hero-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff97" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00ff97" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="svc-hero-arc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2c32fe" stopOpacity="0" />
            <stop offset="55%" stopColor="#00a4af" />
            <stop offset="100%" stopColor="#00ff97" />
          </linearGradient>
        </defs>

        {/* Crosshair. */}
        <path d="M 0 200 H 400 M 200 0 V 400" stroke="white" strokeOpacity="0.06" />

        {/* Outer dial: a hairline plus 72 ticks drawn as one dashed stroke. */}
        <circle cx="200" cy="200" r={OUTER} stroke="white" strokeOpacity="0.1" />
        <circle
          cx="200"
          cy="200"
          r={OUTER + 7}
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="5"
          strokeDasharray={`1 ${(2 * Math.PI * (OUTER + 7)) / 72 - 1}`}
        />

        {/* Aurora arc, drifting counter-clockwise around the dial. */}
        <g className="origin-center animate-about-orbit [animation-direction:reverse] motion-reduce:animate-none">
          <path
            d={arcPath(OUTER, ARC.from, ARC.to)}
            stroke="url(#svc-hero-arc)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx={ARC_HEAD.x} cy={ARC_HEAD.y} r="3" fill="#22d3ee" />
        </g>

        {/* Middle orbit and its nodes, drifting clockwise. */}
        <g className="origin-center animate-svc-orbit motion-reduce:animate-none">
          <circle
            cx="200"
            cy="200"
            r={MIDDLE}
            stroke="#00ff97"
            strokeOpacity="0.35"
            strokeDasharray="2 7"
          />
          {MIDDLE_NODES.map((node) => (
            <g key={`${node.x}-${node.y}`}>
              <circle cx={node.x} cy={node.y} r="10" fill="#00ff97" fillOpacity="0.12" />
              <circle cx={node.x} cy={node.y} r="3.5" fill="#00ff97" />
            </g>
          ))}
        </g>

        <circle cx="200" cy="200" r={INNER} stroke="white" strokeOpacity="0.08" />

        {/* Core. */}
        <circle cx="200" cy="200" r="72" fill="url(#svc-hero-core)" />
        <circle cx="200" cy="200" r="26" fill="#00020f" stroke="#00ff97" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="5" fill="#00ff97" />
      </svg>
    </div>
  );
}
