# Phase 9 — Test Harness

Playwright + axe-core, running on the **system Chrome** (`channel: 'chrome'`) so
no ~500 MB browser download was needed.

```
playwright.config.ts          8 breakpoint projects, production webServer
tests/helpers.ts             gotoHome · revealLazyContent · freezeMedia
tests/layout.spec.ts         structural + responsive + visual
tests/accessibility.spec.ts  axe (WCAG 2.1 AA + best-practice) + keyboard
```

```bash
npm test            # full suite
npm run test:a11y   # accessibility only
npm run test:update # rewrite visual baselines
```

---

## Result: 45 passed · 0 failed · 27 skipped

Skips are intentional — the a11y audit runs at three representative widths
(375 / 768 / 1280), and the drawer and skip-link tests are width-specific.

| Suite | Coverage |
|---|---|
| Structural | 40 assertions across all 8 breakpoints |
| **No horizontal scroll** | **passes at 320 · 375 · 425 · 640 · 768 · 1024 · 1280 · 1536** |
| Accessibility | axe clean at 3 widths |
| Keyboard | drawer focus trap + Escape; skip link is first tab stop |

---

## The tests found seven real defects

Lighthouse scored Accessibility **100/100**. axe with `best-practice` found
seven genuine problems it does not check for. All fixed:

| Defect | Severity | Fix |
|---|---|---|
| Service `<select>` had no accessible name | **critical** | added `sr-only` `<label>` — a disabled first `<option>` is a prompt, not a name |
| File input had no label | **critical** | added `sr-only` `<label>` |
| Floating labels failed contrast (~3.4:1) | serious | `text-white/50` → `/70` |
| Stream status chips failed contrast (~2.5:1) | serious | `#2c32fe` → `#8f93ff` — the reference's blue is genuinely unreadable at 11px on `#121420` |
| Two `<header>` banner landmarks | moderate | dropped the pinned header's exit animation so only one is ever mounted |
| Duplicate landmark identity | moderate | same fix |
| **Hero invisible under reduced motion** | **critical** | see below |

### The reduced-motion bug

`Reveal` decided between animating and settling inside a `useEffect`, using
state from `usePrefersReducedMotion` — which starts `false`. The animation was
therefore always queued first, and the corrective `progress.set(0)` raced it.

Measured state under `prefers-reduced-motion: reduce`:

```
opacity:   "0"
transform: matrix3d(... 85, 142.702, 496.766, 1)   ← the start pose
```

**The hero headline, sub-headline, and CTA were fully invisible for anyone who
asks for reduced motion**, in every build since Phase 1. Playwright's
`toBeVisible()` misses this — it ignores `opacity`.

Fixed by enforcing the final pose in CSS, which cannot race hydration:

```
motion-reduce:!transform-none motion-reduce:!opacity-100
```

`!important` beats the inline styles Framer Motion writes, so the outcome holds
whether or not any JavaScript runs.

---

## Visual regression is NOT trustworthy yet

Marked `test.fixme` — deliberately, so the suite stays green and meaningful
rather than red and ignored.

Baselines still differ between consecutive runs of identical code. Two causes
were found and fixed:

1. **`<video>` playback** — `animations: 'disabled'` does not touch media.
   `freezeMedia()` now pauses and rewinds every video.
2. **Looping GIF ornaments** — cannot be paused by any API; now masked.

A third source remains. Suspects, in order: full-page height shifting as lazy
sections settle; the seven marquees sampling mid-cycle; `backdrop-filter`
rasterising differently per run. Best narrowed by switching to locator-scoped
screenshots and bisecting per section.

**Do not remove the `fixme` until it passes twice in a row with no code change.**

---

## Also fixed

- **BOM corruption.** PowerShell's `Set-Content -Encoding UTF8` writes a byte-order
  mark; it broke `package.json` (`Unexpected token '﻿'`) and had silently landed
  in 10 source files. All stripped.
- **Stale-server trap.** `reuseExistingServer` meant a running server on :3400
  was reused across runs, so code changes appeared to have no effect. Kill the
  port between runs when testing a fix.

---

## Not done

**Video re-encoding.** Disk went 1.81 GB → **0.88 GB** free during this phase
(node_modules + build artefacts + npm cache). Installing ffmpeg plus writing
~7 MB of re-encoded output is feasible but would leave very little headroom, and
`npm` has already failed once with `ENOSPC` in this project. Commands are in
[PHASE-8.md](PHASE-8.md#3-not-done-and-why).

**Section re-audit.** Still outstanding, and still my top recommendation — the AI
stream turned out to have *two* separate under-extractions, and Services,
Features, Industries Served, and Testimonials were extracted the same way.

**LazyMotion refactor** for mobile TBT (860 ms).
