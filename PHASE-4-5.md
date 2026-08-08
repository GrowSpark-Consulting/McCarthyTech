# Phases 4 & 5 — Projects + Industries

Two phases delivered together. Same method: values transcribed from the
reference's `main.css`, cited beside each.

> **The section list in `website_analysis_report.md` was incomplete.** It shows
> Industries as one section between the client logos and Contact. The live page
> actually has **three**: a sticky project stack, an AI traffic stream, and an
> industries card strip. All three are built here.

---

## 1. Phase 4 — Projects ("Tailored for every industry")

A centred heading over a **sticky stack** of four showcase cards.

| Element | Value | Source |
|---|---|---|
| Section | `pt-135 pb-150`, `project-bg.png` | `.project` |
| Heading ornament | `305×50` pill-cropped GIF, `margin-right: 30px`; `160px` ≤767 | `.round-img img` |
| Card | `sticky top:50px`, `padding 90px 120px 90px 55px`, `rounded:10px` | `.xb-project-item` |
| Card offsets | `top: 30px` 1200–1500, `40px` ≤991, `20px` ≤767 | same |
| Caption | `500px` wide, `blur(30px)`, `rgba(0,2,15,0.42)`, grain + hairline | `.xb-item--inner` |
| Caption width | `460px` ≤991, full-width ≤767 | same |
| Caption title | `42px`, `-0.06em`; `38 / 32 / 26 / 28px` | `.xb-item--title` |
| Fact row | `gap: 127px`, `18px/500`; `60 / 15px` | `.xb-item--list` |
| Blurred backdrop | `blur(25px) brightness(0.7)`, `opacity .8`, ≥1024 only | `.xb-project-video-bg` |
| Sharp clip | `calc(100% - 60px)`, `left:30px`, `rounded:20px`, `object-contain` ≥1024 | `.xb-project-video` |
| Rail | `sticky top:0`, `min-height:100vh`, `items-end`, `pr:20px` | `.xb-project-pagination-wrap` |
| Rail dot | `40×40`, 80% inner ring; active → lime text + `#00ff97` ring | `.xb-project-pagination li` |
| Deck offset | `margin-top: -100vh` | `.xb-project-inner` |

**How the stack works.** The rail lives in its own full-height sticky column;
the card list is pulled up over it with `-100dvh` so both occupy the same band
of page. Each card is then `sticky` at a 50px offset, so they pile up like a
deck instead of scrolling past.

---

## 2. Phase 5 — Industries (two sections)

### 5a. "Real-time AI for smarter business"

| Element | Value | Source |
|---|---|---|
| Section | `pt-145 pb-50`, `industries-bg02.png` | `.industries` |
| Stream frame | `590px` tall, vertical fade mask at 12%/92%; `420px` ≤767, `590px` 576–767 | `.xb-industries-marquee` |
| Rotation | `rotate(-90deg)`, `gap: 15px` | `.xb-indus-marquee-inner` |
| Row speeds | `26s` forward / `32s` reverse | inline `animation-duration` |
| Pill | `#121420`, `border rgba(255,255,255,.15)`, `padding 5px 16px 5px 8px` | `.xb-marquee-item` |
| Pill hover | `translateY(-2px) scale(1.05)` + mint/red glow | same |
| Method tag | `#0c2627` + lime; red variant `rgba(252,1,89,.1)` + `#fc0159` | `.tag` |
| Status | `#2c32fe` on `#181daa`; red `#fc0159` | `.number` |
| Latency | `min-width: 48px`, tabular figures, `#00ff97` / `#ff6a9c` | `.xb-metric` |
| Live dot | `7px`, `box-shadow` pulse `0 → 7px`, `1.6s` | `.xb-live-dot` |

**The trick:** two ordinary *horizontal* marquees sit inside a container rotated
`-90deg`, so their travel reads as two vertical columns of traffic. The second
row runs in `reverse` at a slower pace, which is what makes them counter-scroll
rather than move as a block.

### 5b. "Industries We Are Serving"

| Element | Value | Source |
|---|---|---|
| Section | `pb-165`, `industries-bg02.png` | `.industries` |
| Strip | `py:30px`, horizontal fade mask at 7%/93% | `.xb-served` |
| Track | `gap: 26px`, `42s linear infinite`; `18px` / `30s` ≤767 | `.xb-served-track` |
| Card | `236px`, `rounded:18px`, `padding 36px 22px 30px` | `.xb-served-card` |
| Card hover | `translateY(-12px) scale(1.05)`, mint border + glow | same |
| Spotlight | strip hover dims all to `opacity .4 saturate(.65)` | `.xb-served:hover` |
| Icon well | `116px` circle, radial mint tint; `92px` ≤767 | `.xb-served-card__icon` |
| Accent ring | `conic-gradient` arc, masked, `3s` spin, revealed on hover | `::before` |
| Icon | `52px`, `scale(1.14)` on hover; `42px` ≤767 | `img` |

The spotlight is pure CSS via two nested group scopes: `group/strip` dims the
field, `group/card` restores the one under the cursor.

---

## 3. Assets

**Eleven files were referenced by the reference stylesheet or markup but absent
from `exact_assets_checklist.md`.** All pulled from the live site:

| File | Size | Used by |
|---|---|---|
| `bg/project-bg.png` | 343 KB | Projects backdrop |
| `bg/industries-bg02.png` | 159 KB | Both industries sections |
| `bg/contact-bg.png` | 428 KB | Contact (Phase 6) |
| `bg/testimonial-bg.png` | 224 KB | Testimonials (Phase 6) |
| `bg/footer-bg.png` | 335 KB | Footer (Phase 6) |
| `project/noise.png` | 31 KB | Project caption grain |
| `industries/hms.mp4` | **15.1 MB** | Healthcare card |
| `industries/ecommerce.mp4` | **17.6 MB** | E-commerce card |
| `industries/crm-video.mp4` | 2.1 MB | Real Estate card |
| `industries/logistics.mp4` | 0.5 MB | Logistics card |

`avatar/img01.jpg` and `avatar/img02.jpg` **404 on the live site too** — the
reference's own testimonial avatars are broken. Phase 6 will need substitutes.

---

## 4. Notable decisions

**Video deferral is not optional here.** The reference autoplays every project
clip on page load and renders each one *twice* per card (sharp + blurred
backdrop). At 15 MB and 18 MB for the first two, that is **over 60 MB requested
before the visitor scrolls anywhere near this section.** Here both layers mount
only when their card is within 600px of the viewport, then latch. The two layers
share one URL, so the second is served from cache. Confirmed: **zero `<video>`
elements in the initial HTML.**

**The pagination rail now means something.** The reference hard-codes `active`
onto item 2 and never updates it — scroll the live site and the highlight never
moves. Here each card reports when its centre crosses the viewport middle via a
second, tighter `IntersectionObserver`, and the rail follows. Same visual, but
it now tracks the deck.

**Two sections ship zero JavaScript.** Both the AI stream and the industries
strip are Server Components — every motion is a CSS keyframe and every pause is
a `:hover` rule.

**Tone drives the pill palette.** `StreamEntry.tone` selects one entry from a
`TONE_STYLES` map rather than each of the five colours being set at the call
site, so a red pill cannot end up with a mint dot.

---

## 5. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Home route | 8.59 → **7.81 kB**; First Load JS 170 → **172 kB** |
| Sections | **8** — hero, about, services, features, brands, projects, ai-stream, industries-served |
| `aria-labelledby` | all 8 headings wired |
| Project cards | 4, each with a titled `<article>` |
| **Videos in initial HTML** | **0** — deferral confirmed |
| Stream pills | 28 (14 × 2 for the seamless loop) |
| Served cards | 14 (7 × 2) |
| Rail dots | 4 |
| Compiled CSS | `animate-stream-down` (26s), `animate-stream-up` (32s reverse), `animate-served-scroll` (42s), `animate-served-spin` (3s), `animate-live-pulse`, `bg-project-caption`, `bg-served-ring` (conic), `bg-served-icon` (radial), `bg-stream-pill` (`#121420`), `text-stream-code` (`#2c32fe`) — all correct |

---

## 6. Known improvements

1. **33 MB of project video.** Deferral stops it hurting load, but a visitor who
   scrolls the deck still downloads it. `hms.mp4` and `ecommerce.mp4` are the two
   largest assets on the site by an order of magnitude — re-encoding to VP9/AV1
   at 1080p is the single highest-value optimisation remaining, ahead of the hero
   clip.
2. **Sticky stack on short viewports.** The `-100dvh` offset assumes the deck is
   taller than the rail. On a very short landscape phone the rail can run out
   before the last card. Worth testing at 320×480 landscape.
3. **AI stream rotation and text scaling.** The `-90deg` rotation means the
   frame's *height* is governed by the row's width. Very long request paths would
   overflow the 590px frame; current copy fits with room to spare.
4. **Rail is decorative.** It reports position but is not clickable. Making each
   dot scroll to its card would be a small, obvious win.
5. **`role="img"` on the two strips.** Correct for conveying "this is a
   decorative illustration", but it means the industry names are not individually
   readable by a screen reader. A visually-hidden plain list would fix that.

---

## 7. Still not built

Contact/CTA + stats · Testimonials · Footer · any additional route.

Note the reference's Contact section also contains a **"Ready to collaborate with
us?"** block and the stats counters (30+/100%) — `react-countup` and the
`shadcn/ui` + React Hook Form + Zod contact form all land in Phase 6.
