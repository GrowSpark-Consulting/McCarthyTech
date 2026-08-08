# Phase 8 — Performance & QA

First time the site has been **measured**. Lighthouse ran against a production
build using the system Chrome.

---

## 1. Results

### Desktop

| | Before | After |
|---|---|---|
| **Performance** | 77 | **98** |
| **Accessibility** | 100 | **100** |
| **Best Practices** | 96 | **100** |
| **SEO** | 92 | **100** |
| First Contentful Paint | 0.4 s | 0.4 s |
| Largest Contentful Paint | 2.4 s | **0.9 s** |
| Total Blocking Time | 120 ms | **10 ms** |
| Cumulative Layout Shift | 0.001 | **0** |
| Speed Index | 3.3 s | **1.2 s** |
| Total transfer | 41,854 KiB | **24,844 KiB** |
| Console errors | 13 | **0** |

### Mobile

| | Before | After |
|---|---|---|
| **Performance** | — | 68 |
| **Accessibility** | — | **100** |
| **Best Practices** | — | **100** |
| **SEO** | — | **100** |
| Largest Contentful Paint | 8.7 s | **3.6 s** |
| Cumulative Layout Shift | — | **0** |
| Total transfer | 24,844 KiB | **3,434 KiB** |
| Total Blocking Time | 280 ms | 860 ms ⚠️ |

Mobile Performance is **not** where it should be — see §4.

---

## 2. What was wrong, and what fixed it

### 13 console errors → 0
Every `<Link>` in the nav, footer, and cards was **prefetching** a route that
does not exist yet. Next prefetches links as they enter the viewport, so the
homepage fired thirteen 404s on load.

`AppLink` (`src/components/ui/app-link.tsx`) consults one list —
`SHIPPED_ROUTES` in `src/lib/routes.ts` — and disables prefetch for anything not
on it. When a route ships, add it there and prefetching resumes automatically.
No scattered `prefetch={false}` for someone to hunt down later.

### 17 MB downloaded for a menu nobody opened
`ai-main.mp4` (16.9 MB) was the second-largest request on the page. It was gated
on `useIdleReady`, so **every** visitor fetched it shortly after load for a
mega-menu panel most never open. It now loads on first open and stays mounted.

### LCP 2.4 s → 0.9 s — the preloader was the blocker
Lighthouse identified the hero `<h1>` as the LCP element. The headline finished
its entrance animation *behind* the curtain, which then waited on window `load` —
gated by a 20 MB video — before lifting.

The curtain now resolves on `document.fonts.ready` (the signal it actually exists
for: hiding the font swap) with an 800 ms ceiling instead of 1500 ms. **This was
my own regression, introduced in Phase 1 and flagged as a risk there. Measuring
confirmed it.**

### Mobile: 24.8 MB → 3.4 MB
Mobile LCP was the hero `<video>` with a **7.4 second load delay**. The clip is
now desktop-only (`min-width: 1024px`), on top of the existing idle and
reduced-motion gates. Pushing 20 MB of decorative video to a phone on cellular
was the wrong default regardless of the metric; the poster already fills the hero
and carries the scrim.

### SEO 92 → 100
Four project cards all read "READ MORE". An `aria-label` fixed the *accessible
name* — but Lighthouse's `link-text` audit reads `innerText`, so it kept
reporting four identical links.

`AgencyButton` now takes `srSuffix`, which appends visually-hidden text
(" about Healthcare Solutions"). Both the accessible name and the text content
become unique; the visible copy is untouched.

### Contact form deferred
`ContactFormLoader` code-splits the form with `ssr: false` and mounts it on
intersection. React Hook Form + the Zod resolver stay out of the initial payload.
First Load JS 211 → 202 kB.

Also cleared three ambiguous-class warnings (`duration-[350ms]`, `[400ms]`,
`[450ms]`) missed under truncated build output in Phase 5. **The build is now
warning-free.**

---

## 3. Not done, and why

**Video re-encoding — blocked.** `ffmpeg` is not installed, and the disk has
**1.81 GB free**. I chose not to install a ~100 MB binary onto a nearly-full
volume. Run this yourself once ffmpeg is available:

```bash
# ~53 MB -> ~7 MB across the three largest clips
for f in development ; do
  ffmpeg -i "public/assets/img/video/$f.mp4" -c:v libvpx-vp9 -crf 34 -b:v 0 \
         -vf "scale=1920:-2" -an "public/assets/img/video/$f.webm"
done
for f in hms ecommerce ; do
  ffmpeg -i "public/assets/img/industries/$f.mp4" -c:v libvpx-vp9 -crf 36 -b:v 0 \
         -vf "scale=1280:-2" -an "public/assets/img/industries/$f.webm"
done
```
Then add a `<source type="video/webm">` before each existing `<source>`.

**Playwright visual regression — not started.** Chrome is present so
`channel: 'chrome'` would avoid a browser download, but with 1.81 GB free I did
not want to add `@playwright/test` + `@axe-core/playwright` and risk a repeat of
the `ENOSPC` failure that already broke one install this project. **Free up disk
first.**

**Image conversion — not done.** Lighthouse still reports 1,690 KiB from
`modern-image-formats` and 880 KiB from `efficient-animated-content`. The section
backdrops are PNGs referenced from CSS `background-image`, so they bypass
`next/image` entirely; the heading ornaments are animated GIFs (689 KB + 428 KB
for two of them). Converting the backdrops to WebP and the GIFs to animated WebP
is worth ~2.5 MB. `sharp` ships with Next and can do both.

---

## 4. Mobile Performance is 68 — the honest read

Bytes are fixed (3.4 MB). **Total Blocking Time is now the bottleneck at 860 ms**,
and it went *up* from 280 ms. Some of that is run-to-run noise on a 4×-throttled
headless run, but not all of it.

The cause is main-thread JavaScript during hydration, and the largest single
contributor is `framer-motion`, imported by six components (header, drawer,
mega-menu, hero reveal, scroll reveal, preloader). The fix is Framer's
`LazyMotion` + `domAnimation` feature bundle, which cuts the motion runtime
roughly in half but requires switching every `motion.*` to `m.*`.

That is a real refactor, not a tweak, and I did not want to make it unmeasured at
the end of a long session. **It is the top item for the next phase.**

---

## 5. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** (was 3) |
| `prettier --check` | clean |
| Lighthouse desktop | 98 / 100 / 100 / 100 |
| Lighthouse mobile | 68 / 100 / 100 / 100 |
| Console errors | 0 |
| Reports | `lh-v3-desktop.json`, `lh-v3-mobile.json` in the session scratchpad |

Reproduce:
```bash
npm run build && npx next start -p 3213
npx lighthouse http://127.0.0.1:3213/ --preset=desktop --view
npx lighthouse http://127.0.0.1:3213/ --view          # mobile
```
> Use `127.0.0.1`, not `localhost` — Chrome's headless resolver refuses the
> latter here and Lighthouse reports a misleading "interstitial" error.

---

## 6. Next phase — recommended order

1. `LazyMotion` refactor → mobile TBT (biggest remaining win).
2. Convert backdrops + GIFs to WebP via `sharp` → ~2.5 MB.
3. Re-encode video once ffmpeg is available → ~46 MB.
4. Playwright + axe once disk allows.
5. Then inner pages — and add each to `SHIPPED_ROUTES` and `sitemap.ts` as it lands.
