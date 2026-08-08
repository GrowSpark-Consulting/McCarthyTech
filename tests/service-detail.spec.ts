import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

import { gotoService, revealLazyContent } from './helpers';

/**
 * The service whose page has been rebuilt against the reference.
 *
 * A constant rather than a literal because the remaining seven follow one at a
 * time; each becomes a second entry here, and the suite below is written to be
 * parameterised over it rather than rewritten.
 */
const SLUG = 'app-development';

/** Same levels the homepage audit enforces. See `accessibility.spec.ts`. */
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

/**
 * The hero band, addressed by its accessible name.
 *
 * Every assertion below scopes through this rather than searching the document.
 * The same call to action appears three more times further down the page, so an
 * unscoped `getByRole('link', …)` matches four elements and fails strict mode —
 * and a `.first()` would paper over that by asserting against whichever happened
 * to come first in the DOM.
 */
const heroBand = (page: Page) => page.locator('section[aria-labelledby="service-hero-heading"]');

/** The overview panel, addressed the same way and for the same reason. */
const overviewBand = (page: Page) =>
  page.locator('section[aria-labelledby="service-overview-heading"]');

/** The offerings grid — also the target of the overview's corner cue. */
const offeringsBand = (page: Page) =>
  page.locator('section[aria-labelledby="service-offerings-heading"]');

/**
 * Structural and responsive checks for the service detail hero.
 *
 * These run at all eight breakpoints. The hero is the one band on the page with
 * genuinely different geometry at each of them — seven type sizes, five
 * different top insets, a float that disappears below 768px — so a width-by-width
 * sweep is the only thing that would catch a band being mis-declared.
 */
test.describe('service detail — hero band', () => {
  test.beforeEach(async ({ page }) => {
    await gotoService(page, SLUG);
  });

  test('renders the hero with a single top-level heading', async ({ page }) => {
    const heading = page.locator('#service-hero-heading');

    await expect(heading).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    // The heading holds both halves of the phrase, split around the ornament.
    await expect(heading).toContainText('App Development');
    await expect(heading).toContainText('for Business Growth');
  });

  test('renders the sub-heading, metric row, and call to action', async ({ page }) => {
    const hero = heroBand(page);

    await expect(
      hero.getByText('Scalable, user-centric mobile applications for iOS and Android'),
    ).toBeVisible();
    await expect(hero.getByText('Mobile Apps', { exact: true })).toBeVisible();
    await expect(hero.getByText('Deployed', { exact: true })).toBeVisible();

    const cta = hero.getByRole('link', { name: /Book a Free Discovery Session/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/contact');
  });

  test('the headline entrance settles to a visible pose', async ({ page }) => {
    // `toBeVisible()` ignores opacity, which is exactly how the reduced-motion
    // hero bug in Phase 9 went unnoticed. Read the computed value instead.
    const opacity = await page
      .locator('#service-hero-heading')
      .evaluate((node) => window.getComputedStyle(node).opacity);

    expect(Number(opacity)).toBeGreaterThan(0.99);
  });

  test('platform logos carry accessible names', async ({ page }) => {
    const hero = heroBand(page);

    for (const name of ['Java', 'Kotlin', 'Flutter']) {
      await expect(hero.getByRole('img', { name })).toBeVisible();
    }
  });

  test('the decorative ornaments are hidden from assistive technology', async ({ page }) => {
    // Both GIFs are pure decoration. If either ever gains an accessible name it
    // will be read out mid-headline, which is worse than it sounds.
    const exposed = await heroBand(page).evaluate(
      (section) =>
        [...section.querySelectorAll('img[src*=".gif"]')].filter(
          (img) => img.closest('[aria-hidden="true"]') === null,
        ).length,
    );

    expect(exposed, 'a decorative GIF is exposed to screen readers').toBe(0);
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
});

/**
 * Structural checks for the overview panel.
 *
 * The panel's distinguishing feature is that its parts are *not* in one column —
 * the eyebrow is lifted out of the centred flow and pinned to the panel's corner,
 * and the paragraph and button are centred as a pair while the paragraph's own
 * text stays left-aligned. Both are easy to lose in a refactor and neither shows
 * up in a text-content assertion, so they are measured here.
 */
test.describe('service detail — overview band', () => {
  test.beforeEach(async ({ page }) => {
    await gotoService(page, SLUG);
  });

  test('renders the eyebrow, statement, body, and call to action', async ({ page }) => {
    const band = overviewBand(page);

    await expect(band.getByText('What do we do')).toBeVisible();
    await expect(band).toContainText(
      'We build scalable Mobile Applications to expand your reach and engage your customers.',
    );
    await expect(band).toContainText('From native iOS and Android apps to seamless cross-platform');
    await expect(band.getByRole('link', { name: /Book a Free Discovery Session/ })).toBeVisible();
  });

  test('the eyebrow is pinned to the panel corner, not to the centred column', async ({ page }) => {
    const offset = await overviewBand(page).evaluate((section) => {
      const eyebrow = [...section.querySelectorAll('span')].find(
        (node) => node.textContent?.trim() === 'What do we do',
      );
      const panel = eyebrow?.offsetParent;
      if (!eyebrow || !panel) return null;

      const e = eyebrow.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      return { left: Math.round(e.left - p.left), top: Math.round(e.top - p.top) };
    });

    // `.ai-about-inner .sec-title-three .sub-title { top: 31px; left: 21px }`.
    expect(offset).toEqual({ left: 21, top: 31 });
  });

  test('the statement is fully legible once scrolled to', async ({ page }) => {
    const statement = page.locator('#service-overview-heading');
    await statement.scrollIntoViewIfNeeded();
    // The reveal is scrubbed, so drive past its end rather than sampling mid-sweep.
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(900);

    const dimmest = await statement.evaluate((node) =>
      Math.min(
        ...[...node.querySelectorAll('span')].map((span) =>
          Number(window.getComputedStyle(span).opacity),
        ),
        1,
      ),
    );

    expect(dimmest, 'a word never finished lighting').toBeGreaterThan(0.9);
  });

  test('the statement keeps its text intact despite the word split', async ({ page }) => {
    // The reveal splits on spaces; if the spaces are not re-emitted the accessible
    // name silently becomes "Webuildscalable…".
    const text = await page.locator('#service-overview-heading').evaluate((n) => n.textContent);

    expect(text).toBe(
      'We build scalable Mobile Applications to expand your reach and engage your customers.',
    );
  });

  test('the corner cue resolves to a section that exists', async ({ page }) => {
    const cue = overviewBand(page).getByRole('link', { name: /Scroll Down/ });

    await expect(cue).toBeVisible();
    await expect(cue).toHaveAttribute('href', '#service');
    await expect(page.locator('#service')).toHaveCount(1);
  });

  test('the rotating ring is decorative and drops out below 768px', async ({ page }, testInfo) => {
    const width = testInfo.project.use.viewport?.width ?? 0;
    const ring = overviewBand(page).locator('img[src*="app-rotate"]');

    if (width < 768) {
      await expect(ring).toBeHidden();
      return;
    }

    await expect(ring).toHaveAttribute('alt', '');
  });
});

/**
 * Structural checks for the offerings grid.
 *
 * The grid's caption panel is invisible at rest — `opacity: 0` and
 * `scaleY(0)` — so almost nothing here can be asserted by looking for text. The
 * checks below measure geometry and computed style instead, and two of them
 * guard defects that shipped and were caught only by measuring:
 * a card that collapsed to zero height, and a panel reachable by mouse but not
 * by keyboard.
 */
test.describe('service detail — offerings band', () => {
  test.beforeEach(async ({ page }) => {
    await gotoService(page, SLUG);
  });

  test('renders the heading row and all four cards', async ({ page }) => {
    const band = offeringsBand(page);

    await expect(band.getByText('Our App Development Services')).toBeVisible();
    await expect(band).toContainText(
      'We turn complex business requirements into intuitive, user-friendly mobile solutions.',
    );
    await expect(band).toContainText('Whether you need a consumer-facing app');

    for (const title of [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Development',
      'UI/UX Design for Mobile',
    ]) {
      await expect(band.getByRole('heading', { name: title })).toHaveCount(1);
    }
  });

  test('the grid steps 4 → 2 → 1 across the breakpoints', async ({ page }, testInfo) => {
    const width = testInfo.project.use.viewport?.width ?? 0;
    const expected = width >= 992 ? 4 : width >= 576 ? 2 : 1;

    const columns = await offeringsBand(page)
      .locator('.grid')
      .evaluate((grid) => window.getComputedStyle(grid).gridTemplateColumns.split(' ').length);

    expect(columns, `expected ${expected} columns at ${width}px`).toBe(expected);
  });

  test('each card holds its 4:5 box before the clip loads', async ({ page }) => {
    // Regression guard. The poster and the clip are both absolutely positioned,
    // so a wrapper that took its height from them collapsed to 0px — the card
    // rendered, could not be hovered, and the caption was unreachable.
    const ratios = await offeringsBand(page)
      .locator('.grid > *')
      .evaluateAll((cards) =>
        cards.map((card) => {
          const box = card.querySelector('.aspect-\\[4\\/5\\]')?.getBoundingClientRect();
          return box && box.height > 0 ? Number((box.width / box.height).toFixed(2)) : 0;
        }),
      );

    expect(ratios).toHaveLength(4);
    for (const ratio of ratios) expect(ratio).toBeCloseTo(0.8, 1);
  });

  test('the caption panel is hidden at rest and revealed on hover', async ({ page }) => {
    const band = offeringsBand(page);
    await band.scrollIntoViewIfNeeded();

    const card = band.locator('.grid > *').first();
    const panel = card.locator('h3').locator('..');

    await expect(panel).toHaveCSS('opacity', '0');

    await card.hover();
    await expect(panel).toHaveCSS('opacity', '1');
  });

  test('the caption panel is also revealed by keyboard focus', async ({ page }) => {
    // Without `focus-within` the arrow is a control a keyboard user can reach
    // but never see. Hover alone would pass every other check here.
    const band = offeringsBand(page);
    await band.scrollIntoViewIfNeeded();

    const card = band.locator('.grid > *').first();
    const panel = card.locator('h3').locator('..');

    await card.getByRole('link').first().focus();
    await expect(panel).toHaveCSS('opacity', '1');
  });

  test('the four arrows have distinct accessible names', async ({ page }) => {
    // All four are the same glyph pointing at different routes; unnamed, they
    // would be four identical links in an accessibility tree and a link report.
    const names = await offeringsBand(page)
      .locator('.grid a')
      .evaluateAll((links) => links.map((link) => link.textContent?.trim() ?? ''));

    expect(names).toEqual([
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Development',
      'UI/UX Design for Mobile',
    ]);
  });
});

/**
 * Accessibility audit for the detail route.
 *
 * Three representative widths, matching the homepage suite's reasoning: the
 * drawer, the tablet layout, and the desktop mega-menu are the three genuinely
 * different interaction models on the page.
 */
test.describe('service detail — accessibility', () => {
  test('has no detectable violations', async ({ page }, testInfo) => {
    test.skip(
      !['w375', 'w768', 'w1280'].includes(testInfo.project.name),
      'Audited at three representative widths only.',
    );

    await gotoService(page, SLUG);
    await revealLazyContent(page);

    const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

    const summary = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact ?? 'unknown'}) — ${violation.help}\n` +
        violation.nodes.map((node) => `    ${node.target.join(' ')}`).join('\n'),
    );

    expect(summary, `axe violations:\n${summary.join('\n')}`).toEqual([]);
  });
});

/**
 * Structured data.
 *
 * The visible breadcrumb the earlier hero carried is not in the reference and
 * has gone with it, but the `BreadcrumbList` it fed has not — losing the trail
 * from search results would be a real regression, and nothing on screen has to
 * change to keep it.
 */
test.describe('service detail — SEO', () => {
  test('publishes breadcrumb, service, and FAQ structured data', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w1280', 'Markup is width-independent.');

    await gotoService(page, SLUG);

    const types = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => {
        const parsed: unknown = JSON.parse(node.textContent ?? '{}');
        return (parsed as { '@type'?: string })['@type'] ?? '';
      }),
    );

    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('Service');
    expect(types).toContain('FAQPage');
  });

  test('carries its own canonical and title', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w1280', 'Metadata is width-independent.');

    await gotoService(page, SLUG);

    await expect(page).toHaveTitle(/App Development/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`/services/${SLUG}$`),
    );
  });
});
