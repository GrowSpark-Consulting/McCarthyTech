# Phase 2 — About + Services

Adds the two sections that follow the hero. Same method as Phase 1: every value
transcribed from the reference's `main.css`, cited in a comment beside it.

---

## 1. New files

```
src/
├── components/sections/
│   ├── about/
│   │   ├── about-section.tsx          # section shell, split layout
│   │   └── decorated-heading.tsx      # text + inline animated ornaments
│   └── services/
│       ├── services-section.tsx       # heading block + full-bleed strip
│       ├── service-accordion.tsx      # active-panel state, media gating
│       └── service-panel.tsx          # one panel: expand, reveal, video
├── components/ui/
│   └── section-eyebrow.tsx            # lime-dot label, shared by both sections
├── hooks/
│   └── use-media-query.ts             # stacked-layout detection
├── lib/
│   ├── about.ts                       # heading segments + copy
│   └── services.ts                    # 7 offerings + section copy
└── types/
    ├── about.ts                       # HeadingSegment union
    └── services.ts                    # ServiceOffering
```

**Modified:** `arrow-glyph.tsx` (badge variant), `page.tsx`, `tailwind.config.ts`,
`lib/utils.ts` (new class groups).

**Assets added:** `service/noise.png` and `shape/header-noise.png` — both
referenced by the reference stylesheet but missing from the original download
list. Pulled from the live site.

---

## 2. Component tree

```
HomePage
├─ HeroSection                                    (Phase 1)
├─ AboutSection                        ← Server Component, zero JS
│  ├─ SectionEyebrow  "About Us"
│  ├─ DecoratedHeading                            id="about-heading"
│  │  └─ 6 segments: 3 text runs + 3 inline animated ornaments
│  └─ <p> mission copy
└─ ServicesSection                     ← Server Component
   ├─ <h2> "Comprehensive Digital Solutions"      id="services-heading"
   ├─ AgencyButton  "view more services"
   ├─ SectionEyebrow  "Our Expertise"
   └─ ServiceAccordion                ← Client: active panel + media gating
      └─ ServicePanel × 7
         ├─ noise layer + masked gradient hairline
         ├─ expanded:  h3 (underline sweep) · lime badge · copy · video pair
         └─ collapsed: rotated h3 rail · dim badge
```

---

## 3. Values transcribed

| Element | Value | Source |
|---|---|---|
| About padding-top | `140px` | `.pt-140` |
| About heading | `52px / 1.5`, `-0.08em`, max-w `874px`; `36px` ≤767 | `.about-sec-title .title` |
| About layout | `flex justify-between items-start`; column + `10px` gap ≤1199 | `.about-sec-title` |
| Ornament 1 | slot `58×57`, img `left:-10px top:8px max-width:180%` | `span:nth-child(1)` |
| Ornament 2 | slot `116×80 mt:-20px`; `100×62` ≤767 | `span:nth-child(2)` |
| Ornament 3 | slot `326×50`, `left:20px top:6px`, pill-cropped; `160px` ≤767; `326px` 576–767 | `span:nth-child(3)` |
| About body | `18px`, max-w `450px`, `#b1b1b1` | inline style |
| Services padding-top | `135px` | `.pt-135` |
| Section heading | `62px / 1.5`, `-0.08em`; `52 / 48 / 32px` | `.sec-title .title` |
| Heading block gap | `55px`; `80px` ≤1199 | `.xb-sec-padding` |
| Eyebrow | `16px`, `pl:16px`, 8px lime dot | `.sec-title .sub-title` |
| Panel height | `920 / 800 / 670 / 635 / 810px` | `.xb-service-item` |
| Panel padding | `82px 85px 85px 92px` → `45 / 50 / 30 / 20px` | `.xb-item--item` |
| Panel expand | `flex: 1 → 3`, `600ms ease` | `.xb-service-item.active` |
| Content cascade | `300 / 400 / 500ms`, `30px` rise, `400ms` | `.active .xb-item--*` |
| Panel title | `42px`, `-0.06em`; `30 / 26 / 38px` | `.xb-item--title` |
| Panel fill | `linear-gradient(209deg, …0.05…)` + `blur(40px)` + noise | `.xb-service-item` |
| Hairline | `linear-gradient(146deg, .4 → .2 → .06 → .4)`, 1px masked | `.xb-border::after` |
| Underline sweep | `bg-size 0→100%`, `600ms cubic-bezier(.215,.61,.355,1)` | `.border-effect a` |
| Lime badge | `50×50` circle; `45×45 top:-5px` ≤1199 | `.xb-item--icon` |
| Rotated rail | `top:4% left:11%`, `translateX(-50%) rotate(-90deg)`, origin `bottom right` | `.service-vertical-text` |
| Dim badge | `50×50`, `bottom:85px`, `rgba(0,2,15,0.2)`; `65px` ≤1199 | `.xb-icon` |
| Circular overlay | second clip, `rounded-full`, `scale(0.9)` on hover | `.img-hove-effect` |

---

## 4. Notable implementation decisions

**Heading as data, not markup.** The About headline mixes text with three
ornaments that each have their own slot size and their own offset *inside* that
slot. Modelled as a `HeadingSegment[]` union, so `DecoratedHeading` is a plain
loop with no positional special-casing — a fourth ornament needs no code change.
The slot/image split is what lets artwork overflow its box (the first is sized at
180% and bleeds left) without disturbing line breaks.

**GIFs are `unoptimized`.** Next's image pipeline re-encodes GIFs to a single
still frame. Passing them through the optimiser would have silently killed the
animation these ornaments exist for.

**Video loading, again.** The reference autoplays all seven clips (~4 MB) on page
load. Here a clip mounts only when the strip is within 400px of the viewport
**and** its panel is either expanded or in stacked layout — then latches on, so
sweeping across panels never re-downloads one. On desktop that is one clip on
arrival instead of seven. Confirmed: **zero `<video>` elements in the initial
HTML.**

**Keyboard operability.** The reference accordion is hover-only. Panels here also
activate on `onFocusCapture`, so tabbing through the strip expands each panel as
it is reached.

**Ornaments and rails are `aria-hidden`.** A screen reader gets one clean
sentence for the About heading, and the collapsed rotated title is not announced
as a duplicate of the expanded one.

---

## 5. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Home route size | 5.55 kB → **8.38 kB**; First Load JS 167 kB → **170 kB** |
| `<section id="about">` | present, `aria-labelledby` wired |
| Ornaments | 3, served raw from `/assets/img/icon/*.gif` (optimiser bypassed) |
| Service panels | 7 `<article>`s, correct titles and order |
| Videos in initial HTML | **0** — deferral confirmed |
| Compiled CSS spot-checks | `bg-service-stage`, `bg-panel-noise`, `bg-hairline`, `bg-sweep-underline`, `delay-panel-head/copy/media` (.3/.4/.5s), `duration-panel` (.6s), `ease-underline`, `flex-[3]` — all correct |
| **Responsive cascade order** | Verified in compiled CSS: panel `635px` precedes `810px`; hero `36px` precedes `48px`; ornament `160px` precedes the 576–767px `326px` override. Stacked variants land after their single-variant counterparts, so no rule is silently overridden. |

Two build issues found and fixed: `delay-[400ms]` was ambiguous to Tailwind
(resolved by adding a named `delay-panel-*` scale), and a stale `.next` cache
caused spurious `PageNotFoundError`s (cleared).

---

## 6. Known improvements

1. **Panels are hover/focus-activated.** On a touch tablet between 768 and 991px
   there is no hover and the layout has not yet stacked, so the first panel stays
   expanded. A `pointerType`-aware tap-to-expand guard would fix it — same
   caveat as the mega-menu.
2. **Seven clips still total ~4 MB.** Deferral avoids paying for them upfront,
   but a visitor who explores every panel downloads all of them. Re-encoding to
   VP9/AV1 applies here as much as to the hero.
3. **Fixed panel heights.** Taken verbatim from the reference. At 992–1199px the
   670px box is tight for the longest description; worth revisiting once the copy
   is final.
4. **`/services/custom-software` has no route yet.** Six of the seven panels link
   to routes the mega-menu also references; this one is new. All land on the 404
   boundary until the service pages ship.

---

## 7. Still not built

Features ("The Altibix Advantage") · Client logos marquee · Industries ·
Contact/CTA + stats · Testimonials · Footer · any additional route.

Say the word for Phase 3.
