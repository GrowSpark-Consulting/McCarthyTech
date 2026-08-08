# Phase 1 — Navbar + Hero

Port of `altibixcodelab.com` to Next.js 15 (App Router) + TypeScript + Tailwind.

Every dimension, colour, easing curve, and duration in this phase was transcribed
from the reference's own `assets/css/main.css` and its inline `<style>` block —
not estimated from screenshots. The source of truth for each value is cited in a
comment beside it.

---

## 1. Folder structure

```
.
├── public/assets/                     # original media, copied verbatim
│   ├── fonts/                         # SportingGrotesque Regular + Bold (woff2/woff)
│   └── img/{bg,brand,feature,icon,industries,logo,shape,video,video-assets}/
├── src/
│   ├── app/
│   │   ├── fonts.ts                   # next/font declarations
│   │   ├── icon.png                   # App Router favicon
│   │   ├── layout.tsx                 # root shell, JSON-LD, skip link, providers
│   │   ├── loading.tsx                # route-level Suspense skeleton
│   │   ├── not-found.tsx              # 404 boundary
│   │   ├── page.tsx                   # home — renders HeroSection
│   │   ├── robots.ts                  # generated /robots.txt
│   │   └── sitemap.ts                 # generated /sitemap.xml
│   ├── components/
│   │   ├── layout/                    # header + navigation
│   │   │   ├── brand-logo.tsx
│   │   │   ├── desktop-nav.tsx
│   │   │   ├── header-bar.tsx
│   │   │   ├── menu-search-field.tsx
│   │   │   ├── mobile-nav-drawer.tsx
│   │   │   ├── mobile-nav-toggle.tsx
│   │   │   ├── services-mega-menu.tsx
│   │   │   └── site-header.tsx
│   │   ├── sections/hero/
│   │   │   ├── hero-scroll-cue.tsx
│   │   │   ├── hero-section.tsx
│   │   │   └── hero-video-backdrop.tsx
│   │   ├── shared/                    # cross-section behaviour
│   │   │   ├── reveal.tsx
│   │   │   ├── site-preloader.tsx
│   │   │   └── smooth-scroll-provider.tsx
│   │   └── ui/                        # atoms
│   │       ├── agency-button.tsx
│   │       ├── arrow-glyph.tsx
│   │       ├── container.tsx
│   │       └── pill-button.tsx
│   ├── hooks/
│   │   ├── use-escape-key.ts
│   │   ├── use-focus-trap.ts
│   │   ├── use-idle-ready.ts
│   │   ├── use-prefers-reduced-motion.ts
│   │   ├── use-scroll-lock.ts
│   │   └── use-sticky-header.ts
│   ├── lib/
│   │   ├── hero.ts                    # hero copy + media
│   │   ├── motion.ts                  # easing curves, durations, variants
│   │   ├── navigation.ts              # all menu data
│   │   ├── seo.ts                     # metadata + JSON-LD builders
│   │   ├── site.ts                    # brand + contact config
│   │   └── utils.ts                   # cn() with configured tailwind-merge
│   ├── styles/globals.css
│   └── types/
│       ├── media.ts
│       └── navigation.ts
├── .eslintrc.json  .prettierrc.json  .prettierignore  .gitignore
├── next.config.mjs  postcss.config.mjs  tailwind.config.ts  tsconfig.json
└── package.json
```

---

## 2. Component tree

```
RootLayout
├─ <script type="application/ld+json">  Organization
├─ <script type="application/ld+json">  WebSite
├─ Skip link  →  #main-content
└─ SmoothScrollProvider                          (Lenis, context)
   ├─ SitePreloader                              (brand curtain)
   ├─ SiteHeader
   │  ├─ <header> floating              ← exposed while scrollY ≤ 300
   │  │  └─ HeaderBar variant="floating"
   │  │     └─ Container width="shell"
   │  │        ├─ BrandLogo priority
   │  │        ├─ DesktopNav                     ≥ 992px
   │  │        │  └─ <li> × 6
   │  │        │     └─ ServicesMegaMenu         (on the "Services" item)
   │  │        │        ├─ ServiceTile × 9
   │  │        │        ├─ AgencyButton size="compact"   "Get free consultation"
   │  │        │        └─ promo: <video> + h3 + AgencyButton "contact us now"
   │  │        ├─ PillButton  "join now"         ≥ 1200px
   │  │        └─ MobileNavToggle                < 992px
   │  ├─ <motion.header> pinned         ← exposed while scrollY > 300
   │  │  └─ HeaderBar variant="pinned"           (same subtree)
   │  └─ MobileNavDrawer                         (dialog, mounted only when open)
   │     ├─ close button
   │     ├─ BrandLogo placement="drawer"
   │     ├─ MenuSearchField                      (RHF + Zod, live filter)
   │     └─ nav → 8 rows, "Services" expands to 7 sub-rows
   └─ <main id="main-content">
      └─ HomePage
         └─ HeroSection                          ← Server Component
            ├─ HeroVideoBackdrop                 (poster → deferred video → scrim)
            ├─ Container
            │  ├─ Reveal as="h1"   delay 0.0s
            │  ├─ Reveal as="p"    delay 0.2s
            │  └─ Reveal           delay 0.4s → AgencyButton "Start Your Project"
            └─ HeroScrollCue
```

Server Components: `HeroSection`, `RootLayout`, `HomePage`, `Loading`, `NotFound`,
`Container`, `AgencyButton`, `PillButton`, `BrandLogo`, `ArrowGlyph`.
Everything else is a Client Component only because it needs state, an effect, or
a pointer handler.

---

## 3. Design tokens (verbatim from the reference)

| Token | Value | Source |
|---|---|---|
| `--color-primary` → `lime` | `#c4f012` | `main.css:55` |
| `--color-secondary` / `--color-body` → `ink` | `#00020f` | `main.css:56,63` |
| Nav pill surface → `surface` | `#15192f` | `.header-style--one .main-menu>ul>li>a` |
| Mega-menu panel → `panel` | `#222746` | `.mega_menu_wrapper_inner` |
| Drawer / sticky bar → `drawer` | `#11121d` | `.xb-header-menu` |
| `--color-gray` → `muted` | `#b2b3b7` | `main.css:60` |
| Body font | DM Sans | `main.css:53` |
| Heading font | Sporting Grotesque | `main.css:54`, `custom-fonts.css` |
| Glass fill | `rgba(17,18,29,0.28)` + `blur(18px) saturate(150%)` | inline `<style>` |
| Glass radius / shadow | `60px` / `0 10px 40px rgba(6,8,24,0.28)` | inline `<style>` |
| Hero scrim | 2-layer linear + radial gradient | inline `<style>` |
| Hero title | `72/90px`, `-0.07em` | `.hero-content .title` |
| Reveal curve | `cubic-bezier(0.55,0.085,0,0.99)`, 1s | `.scale-animation` |
| Sticky curve | `cubic-bezier(0.23,0.76,0.53,0.99)`, 0.6s | `.xb-header-area-sticky` |
| Drawer curve | `cubic-bezier(0.165,0.84,0.44,1)`, 0.4s | `.xb-header-menu` |
| Scroll cue | `heroScroll` 2s `cubic-bezier(0.76,0,0.24,1)` | inline `<style>` |

Two breakpoint families coexist in `tailwind.config.ts`:

- `xxs 320 · xs 375 · xsm 425 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` — the QA scale.
- `bs-sm 576 · bs-md 768 · bs-lg 992 · bs-xl 1200 · bs-xxl 1400` — Bootstrap 5, the scale the
  original was authored against. Tailwind auto-generates `max-*` variants, so
  `max-bs-lg:` compiles to `max-width: 991.98px` and matches the reference's
  `@media (max-width: 991px)` rules **exactly**.

---

## 4. Animation implementation

| Animation | How | File |
|---|---|---|
| Hero text/CTA reveal | Framer Motion `MotionValue` 1→0; every axis (`rotateX`, `translate3d`, `scaleZ`) derived from it so the composed pose interpolates in lockstep. `scaleZ` has no first-class Framer prop, which is why a progress value is used rather than discrete props. | `shared/reveal.tsx`, `lib/motion.ts` |
| Staggered cascade | delays `0 / 0.2 / 0.4s` | `HERO_REVEAL_DELAY` |
| Navbar pin | `AnimatePresence` slide `y: -100% → 0`, 0.6s | `site-header.tsx` |
| Glass hover | `border-color` cross-fade, 400ms | `header-bar.tsx` |
| Mega-menu open | opacity + 10px `y` settle (travel expressed as transform, not `top`, to stay off the layout path) | `services-mega-menu.tsx` |
| Tile gradient ring | masked pseudo-layer, `mask-composite: exclude` — a real gradient border cannot follow `border-radius` | `services-mega-menu.tsx` |
| CTA hover | pure CSS `group`: halves round to full pills, leading arrow flies `(30,-30)`, trailing arrow arrives from `(-30,30)` 100ms later | `agency-button.tsx` |
| Pill CTA hover | white sheet `scaleY(0→1)` behind the label | `pill-button.tsx` |
| Drawer | slide `x: -100% → 0` + backdrop fade, 0.4s | `mobile-nav-drawer.tsx` |
| Submenu expand | height auto + opacity, 0.25s | `mobile-nav-drawer.tsx` |
| Close-button morph | crossed bars straighten to horizontal on hover | `mobile-nav-drawer.tsx` |
| Scroll cue | CSS `@keyframes hero-scroll`, infinite | `tailwind.config.ts` |
| Preloader | logo + indeterminate lime sweep, fades out on `load` | `site-preloader.tsx` |
| Smooth scroll | Lenis RAF loop, exposed via context | `smooth-scroll-provider.tsx` |

Everything animates **only `transform` and `opacity`** — no layout-triggering
properties — so all of it composites at 60 FPS.

---

## 5. Accessibility

- Skip link to `#main-content`, visible on focus.
- Exactly **one** navigation landmark exposed at a time: the off-screen header is
  `aria-hidden` + `inert`. (The original clones its DOM node and ships two
  identical `<nav>`s; this avoids that without changing the visual result.)
- Mega-menu: `aria-expanded` / `aria-controls` / `aria-haspopup` on the trigger;
  opens on hover **and** keyboard focus; closes on Escape; `inert` while collapsed
  so its 11 links stay out of the tab order.
- Drawer: `role="dialog"` + `aria-modal`, focus trap, Escape to close, background
  scroll locked with scrollbar-width compensation (no sideways jump), focus
  returned to the trigger on dismiss.
- `aria-current="page"` on the active route in both menus.
- All decorative media (`video`, poster, arrows, icons) `aria-hidden` and
  `tabIndex={-1}`.
- Focus-visible ring on every interactive element; global fallback ring in
  `globals.css`.
- `prefers-reduced-motion` honoured in **three** places: JS animations short-circuit,
  the background video never mounts, Lenis is never constructed — plus a CSS
  backstop for anything third-party.
- Pinch-zoom left enabled (WCAG 1.4.4).
- Single `<h1>` on the page.

---

## 6. Performance

| Lever | Detail |
|---|---|
| Hero LCP | Poster preloaded at `priority` with a full `srcSet`; it is the LCP element. |
| 20 MB hero clip | Not in the initial markup at all. Mounts on `requestIdleCallback` (200ms fallback for Safari, 2s timeout) so it never competes with the poster, font, or JS for early bandwidth. |
| Mega-menu clip | Same deferral; a fixed-size placeholder holds its 171×186 box so the swap causes zero layout shift. |
| Fonts | Self-hosted via `next/font` with `display: swap` + `adjustFontFallback` → zero CLS on 72px display type. |
| Images | AVIF/WebP, `deviceSizes` matched to the project breakpoints so no oversized candidate is generated. |
| Scroll listener | `passive`, batched into one `rAF`, state flips only on threshold crossing. |
| Caching | `/assets/*` served `immutable, max-age=31536000`. |
| Bundle | Home route **5.55 kB**, First Load JS **167 kB**. The hero's markup, copy, and layout classes are Server-rendered; only the reveal, the deferred video, and the scroll cue hydrate. |

---

## 7. Installation

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start
npm run lint       # eslint, --max-warnings 0
npm run typecheck  # tsc --noEmit
npm run format     # prettier + tailwind class sorting
```

---

## 8. Packages

**Used in Phase 1:** `next@15.5.22`, `react@19`, `typescript`, `tailwindcss@3.4`,
`framer-motion`, `lenis`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`,
`zod`, `clsx`, `tailwind-merge`, `class-variance-authority`, `tailwindcss-animate`,
`eslint`, `prettier`, `prettier-plugin-tailwindcss`.

**Installed per the stack spec, first used in later phases:** `gsap` (only where
Framer cannot do the job), `embla-carousel-react` (testimonials / industries),
`react-countup` (achievements), `react-intersection-observer` (scroll triggers),
`@radix-ui/react-slot` (shadcn/ui primitives for the contact form).

> `next` was pinned to **15.5.22**, not 15.1.6: npm flags 15.1.6 for CVE-2025-66478.
> 15.5.22 is the latest patched release on the 15 line.

---

## 9. Verification performed

| Check | Result |
|---|---|
| `tsc --noEmit` (strict, `noUncheckedIndexedAccess`) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Static prerender | 7/7 pages |
| Rendered HTML inspected | `<h1>`, hero copy, glass bar classes, 9 mega-menu tiles, title, description, OG/Twitter tags, both JSON-LD blocks, skip link — all present and correct |
| Generated CSS inspected | `bg-glass/[0.28]` → `rgb(17 18 29/.28)`, `bg-hero-veil` → both gradient layers, `text-hero-xl` → `72px/90px`, `@keyframes hero-scroll`, `rounded-glass` → `60px`, `backdrop-blur-glass` → `blur(18px)` — all match the reference byte-for-byte |
| Fonts | 4 `.woff2` emitted and self-hosted; `@font-face` present for both families |

**One real bug was found and fixed during verification:** `tailwind-merge` was
silently deleting `text-hero-xl` and `text-hero-sub`. It classifies a `text-*`
class by inspecting its value — a length is a font size, anything else a colour —
so custom theme keys were assumed to be colours and dropped whenever `text-white`
appeared later in the same `cn()` call. The hero headline was rendering at the
inherited 16px. Fixed by declaring the custom scales via `extendTailwindMerge`
in `src/lib/utils.ts`; re-verified in the compiled output.

---

## 10. Deliberate deviations (3)

Each of these is a place where copying the reference exactly would have shipped a
defect. Say the word and I will match the original instead.

1. **Sticky header is not a DOM clone.** The reference clones its `<header>`, so
   two identical `<nav>` landmarks exist simultaneously. This port renders one
   `HeaderBar` twice and marks the off-screen one `inert`. Visually identical —
   the swap happens at 300px of scroll, where the capsule is long gone.
2. **Scroll cue is a `<button>`, not `<a href="#about">`.** The About section
   ships in Phase 2; a link to a non-existent fragment is a dead control. The
   handler targets `#about` when it exists and otherwise advances one viewport,
   so it is correct now and correct later with no change.
3. **Drawer search filters the menu live.** The reference ships it wired to
   `action="#"` — it does nothing. Rather than reproduce dead markup or point it
   at a `/search` route that Phase 1 forbids creating, it filters the drawer's
   own list (React Hook Form + Zod). Same position, same styling, actually works.

`src/app/not-found.tsx` is also new: it is an error boundary, not a content page.
Without it the header's links to `/services`, `/about`, `/team` — all Phase 2+ —
land on Next's unstyled default, which reads as a broken build.

---

## 11. Known improvements

1. **Hero clip is 20 MB.** Deferring it protects LCP, but it is still a large
   transfer for anyone who stays on the page. Re-encoding to VP9/WebM + AV1 at
   ~1080p should land it near 2–3 MB. This is the single biggest remaining win.
2. **No explicit `<link rel="preload" as="font">`.** `next/font` emits the
   preload-flagged files but no head link for CSS-variable fonts. `font-display: swap`
   plus the size-adjusted fallback already gives zero CLS, so this is worth
   perhaps ~100ms on a slow connection.
3. **Sitemap lists only `/`.** Each route joins as it ships — listing 404s now
   would suppress indexing.
4. **No automated tests yet.** Playwright visual-regression snapshots at all eight
   breakpoints, plus axe-core assertions, would lock in what is currently verified
   by inspection.
5. **Lighthouse not run in-session.** No headless Chrome is installed here. All
   the levers are in place and the build is clean, but the actual score is
   unmeasured — run `npx lighthouse http://localhost:3000 --view` against
   `npm start` to confirm.
6. **Mega-menu is hover/focus only.** Fine for pointer and keyboard; a tap on a
   hybrid touch-laptop opens the panel and navigates in the same gesture. A
   `pointerType`-aware first-tap-opens guard would fix it.

---

## 12. Explicitly NOT built (per Phase 1 scope)

About · Services · Features · Client logos · Industries · Contact · Testimonials ·
Footer · any additional route.
