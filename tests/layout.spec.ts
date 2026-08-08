import { expect, test } from '@playwright/test';

import { SECTION_HEADINGS, freezeMedia, gotoHome, revealLazyContent } from './helpers';

/**
 * Structural and responsive checks.
 *
 * These run at all eight breakpoints. They assert the things that are cheap to
 * break and expensive to notice: a section vanishing, the page gaining a
 * horizontal scrollbar, or the heading outline losing its single `<h1>`.
 */
test.describe('homepage layout', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test('renders every section', async ({ page }) => {
    for (const [name, id] of Object.entries(SECTION_HEADINGS)) {
      await expect(page.locator(`#${id}`), `${name} section is missing`).toHaveCount(1);
    }
  });

  test('has exactly one h1', async ({ page }) => {
    // The footer watermark and the service panels are deliberately not h1s.
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('never scrolls horizontally', async ({ page }) => {
    await revealLazyContent(page);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    // A 1px allowance absorbs sub-pixel rounding on fractional device widths.
    expect(
      overflow.scrollWidth,
      `page overflows by ${overflow.scrollWidth - overflow.clientWidth}px`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });

  test('exposes exactly one navigation for the viewport', async ({ page }, testInfo) => {
    const width = testInfo.project.use.viewport?.width ?? 0;
    // The desktop bar is `display: none` below 992px, where the drawer takes
    // over — so "exactly one Primary nav" only holds from 992px up. Below that
    // the correct expectation is zero exposed, plus a working drawer trigger.
    const isDesktop = width >= 992;

    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(isDesktop ? 1 : 0);

    if (!isDesktop) {
      await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
    }
  });

  test('hero headline is visible and not clipped', async ({ page }) => {
    const heading = page.locator('#hero-heading');
    await expect(heading).toBeVisible();

    // Wait for a settled box rather than sampling once — the hero's entrance can
    // still be resolving on slower breakpoints, and a mid-flight measurement
    // reads as a null box.
    await expect.poll(async () => (await heading.boundingBox())?.width ?? 0).toBeGreaterThan(0);
  });
});

/**
 * Visual regression.
 *
 * One full-page snapshot per breakpoint. Motion is disabled via the config's
 * `reducedMotion: 'reduce'`, which the app honours everywhere, so marquees,
 * counters, and entrance animations are all frozen — the shot captures layout,
 * not a moment in an animation.
 */
test.describe('visual regression', () => {
  /**
   * NOT YET TRUSTWORTHY — do not remove this `fixme` until it passes twice in a
   * row with no code change in between.
   *
   * Two sources of frame-to-frame variance have been eliminated: `<video>`
   * playback (see `freezeMedia`) and looping GIF ornaments (masked below). A
   * third remains unidentified — full-page captures still differ between
   * consecutive runs of identical code.
   *
   * Prime suspects, in order:
   *  1. Full-page height varying as lazily-mounted sections settle, which shifts
   *     every pixel below the first difference.
   *  2. The five stream marquees and two logo marquees — `motion-reduce` stops
   *     the CSS animation, but the initial transform may be sampled mid-cycle.
   *  3. `backdrop-filter` blur rasterising slightly differently per run.
   *
   * Narrowing it down is best done per-section rather than full-page: swap
   * `toHaveScreenshot` for a locator-scoped shot and bisect. The structural
   * tests above are unaffected and all pass.
   */
  test.fixme('full page matches baseline', async ({ page }, testInfo) => {
    await gotoHome(page);
    await revealLazyContent(page);
    await freezeMedia(page);

    await expect(page).toHaveScreenshot(`home-${testInfo.project.name}.png`, {
      fullPage: true,
      /**
       * Animated GIFs cannot be paused.
       *
       * `<video>` can be frozen and CSS animations disabled, but a looping GIF
       * keeps advancing and there is no API to stop it — every run captures a
       * different frame of the heading ornaments, so the comparison fails on
       * content that has not changed. Masking paints them over with a flat block
       * in both the baseline and the comparison, leaving the surrounding layout
       * (which is what this test is for) fully asserted.
       */
      mask: [page.locator('img[src$=".gif"]')],
    });
  });
});
