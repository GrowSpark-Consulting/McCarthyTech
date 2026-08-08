# Phase 3 — Features + Client Logo Marquee

Adds sections 4 and 5. Same method: every value transcribed from the reference's
`main.css`, cited beside it.

---

## 1. New files

```
src/
├── components/sections/
│   ├── features/
│   │   ├── features-section.tsx     # heading + mirrored 3-column grid
│   │   ├── feature-card.tsx         # one capsule, mirrored per side
│   │   └── feature-orbit.tsx        # 3 dashed rings + gradient sphere
│   └── brands/
│       └── brand-marquee-section.tsx
├── components/shared/
│   └── scroll-reveal.tsx            # WOW.js replacement
├── lib/
│   ├── features.ts
│   └── brands.ts
└── types/
    └── features.ts
```

**Modified:** `page.tsx`, `tailwind.config.ts`, `lib/utils.ts`.

**Assets added:** `feature/noise.png`, `brand/noise.png` (both referenced by
`main.css`, both absent from the original download list — pulled from the live
site), plus `shape/feature-ring-{1,2,3}.svg` extracted from the reference's
inline markup.

---

## 2. Component tree

```
HomePage
├─ HeroSection · AboutSection · ServicesSection          (Phases 1–2)
├─ FeaturesSection                       ← Server Component
│  ├─ SectionEyebrow  "The Altibix Advantage"
│  ├─ <h2> "Why businesses [💎 gif] choose us"           id="features-heading"
│  └─ grid (1 / 2 / 3 columns)
│     ├─ FeatureColumn side="left"       → ScrollReveal fadeInUp ×3, 100/200/300ms
│     │  └─ FeatureCard  (title, then icon — right-aligned)
│     ├─ FeatureColumn side="right"      → bs-lg:order-last
│     │  └─ FeatureCard  (icon, then title — left-aligned)
│     └─ ScrollReveal zoomIn
│        └─ FeatureOrbit  → 3 ring SVGs (−117px overlap) + sphere behind
└─ BrandMarqueeSection                   ← Server Component, ZERO JavaScript
   ├─ heading pill  "World's Best 30+ Companies Work With Us"
   └─ marquee → BrandTrack ×2 (6 logos each), CSS translateX(0 → −50%)
```

---

## 3. Values transcribed

| Element | Value | Source |
|---|---|---|
| Section padding | `pt-145` / `pt-170 pb-150` | `.pt-145`, `.pt-170`, `.pb-150` |
| Heading | `62px / 1.5`, `-0.08em`; `52 / 48 / 32px` | `.sec-title .title` |
| Diamond ornament | slot `60×80`, img `left:-48px top:9px max-w:160px`; `top:-20px max-w:140px` ≤767 | `.fea-sec-title .title span` |
| Card shell | `rounded:10px`, `shadow 0 4px 24px -1px rgba(28,9,61,.2)` | `.xb-feature-item` |
| Card inner | `flex gap:20px`, `padding:19px 15px`; `gap:14px padding:19px 10px` ≤1199 | `.xb-feature-item2 .xb-item--inner` |
| Card fill | `linear-gradient(209deg …0.05…)` + `blur(40px)` + grain | `.xb-item--inner`, `::before` |
| Card title | `21px / 32px`, `-0.03em`; `19 / 17 / 20 / 19px` | `.xb-feature-item2 .xb-item--title` |
| Card icon | `52×52` circle, `rgba(0,2,15,0.3)`; `rotateY(180deg)` on hover | `.xb-item--icon` |
| Column gap | `82px`; `30px` ≤991 | `.xb-feature-item2:not(:last-child)` |
| Column inset | `mr / ml: 24px`; `0` ≤1199 | `.xb-feature-left/right-item` |
| Ring overlap | `margin-top: -117px` | `.xb-feature-shape li:not(:first-child)` |
| Ring sizes | `391×235`; `315×212` / `295×207` / `330×215` | `.xb-feature-shape li svg` |
| Ring dash | `stroke-dashoffset 0 → -200`, `6s linear infinite` | `@keyframes moveWave` |
| Sphere offset | `top:1px`; `12 / 16 / 8px` | `.xb-feature-shape .shape` |
| Entrance | `fadeInUp` 100/200/300ms, `zoomIn` 0ms, `600ms` | `data-wow-*` |
| Marquee card | `padding:20px 30px 55px`, `rounded:10px`, `215deg` sheen | `.xb-brand-wrap` |
| Heading pill | `padding:6px 39px`, `rounded:7px`, `#0b2336`, `translateY(-42px)`; `-67px` ≤767, `-42px` 576–767 | `.brand-sub-title` |
| Pill dots | 8px lime, both sides, `padding: 0 16px` | `.brand-sub-title p::before/::after` |
| Logo track | `gap:80px margin-right:80px`; `40px` ≤767 | `.xb-brand-inner` |
| Logo hover | `opacity: 0.5`; `max-w:105px` ≤767 | `.xb-brand-item` |

---

## 4. Notable decisions

**The three rings are files, not inline SVG.** Their paths total ~48,000
characters. Inlining them would ship that in the JS payload of every visitor. As
standalone files they are cached, fetched in parallel, and never parsed by React.
The catch: page CSS cannot style the contents of an `<img>`, so each file carries
its own `@keyframes moveWave` — *and* its own `prefers-reduced-motion` guard.
Their gradient ids were namespaced per file (`featureRing1Gradient`, …) so three
`<img>` tags on one page cannot collide.

**`ScrollReveal` replaces WOW.js.** The reference loads a whole library to add a
class when an element becomes visible. `IntersectionObserver` does that natively —
no scroll listener, no layout thrash — and it fires once, then detaches. The
`fadeInUp` variant reproduces Animate.css's `translate3d(0, 100%, 0)`, so a tall
card rises further than a short one, which is what gives the column its weight.

**The marquee ships zero JavaScript.** The reference clones DOM nodes at runtime
with a jQuery plugin. Here the track is simply rendered twice and slid
`translateX(0 → -50%)`: at the end of each cycle the second copy sits exactly
where the first started, so the seam is invisible. Both copies are `aria-hidden`
with a single `role="img"` label on the container, so a screen reader hears one
description rather than twelve logo names for six companies.

**Feature titles are `<h3>`, not `<h2>`.** The reference marks each card as an
`<h2>` — the same level as the section heading above it. Using `<h3>` gives a
correct document outline with no visual change.

**Title line breaks are data.** `titleLines: readonly [string, string]` rather
than a string containing `<br>`, so the break points stay content and the tuple
type guarantees exactly two lines.

---

## 5. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Home route | 8.38 → **8.59 kB**; First Load JS **170 kB** (unchanged) |
| Sections rendered | **5** |
| Feature cards | 6, correct titles and order, both columns |
| Ring SVGs | 3, served raw from `/assets/img/shape/` (optimiser bypassed) |
| Marquee tracks | 2 — duplication confirmed |
| Headings | `about-` / `services-` / `features-` / `brands-heading` all wired to `aria-labelledby` |
| Compiled CSS | `animate-marquee-x` (25s linear infinite), `@keyframes marquee-x` (0 → −50%), `bg-feature-noise`, `bg-brand-noise`, `bg-glass-sheen-215` (215deg), `bg-brand-pill` (`#0b2336`) — all correct |
| Grid order | Verified: left │ orbit │ right at ≥992px; left │ right with orbit spanning below at 768–991px; stacked below 768px |

**Note on the dev server:** running `next build` while `next dev` was live
corrupted the shared `.next` directory (`__webpack_modules__[moduleId] is not a
function`). Cleared and restarted — not a code defect, but worth knowing if you
build while the dev server runs.

---

## 6. Known improvements

1. **Marquee does not pause on hover.** The reference does not either, but
   pausing on hover (and on focus) is the friendlier behaviour for anyone trying
   to read a logo. One `animation-play-state` rule.
2. **Ring SVGs are ~16 KB each uncompressed.** They gzip well, but the paths
   carry far more precision than 391px of rendering needs. Running them through
   SVGO would likely halve them.
3. **`prefers-reduced-motion` for the rings lives inside each SVG.** That works,
   but it means the guard is duplicated three times in generated files rather
   than expressed once in the design system.
4. **Feature card hover flips the icon only.** Matches the reference; the card
   itself has no hover state, which reads as slightly inert next to the service
   panels.

---

## 7. Still not built

Industries ("Tailored for every industry") · Contact/CTA + stats · Testimonials ·
Footer · any additional route.
