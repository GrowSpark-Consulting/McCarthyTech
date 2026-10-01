import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { DECORATIVE_WORDMARK, gotoTeam, revealLazyContent } from './helpers';

/** Same levels the homepage audit enforces. See `accessibility.spec.ts`. */
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

const leadershipGroup = 'section[aria-labelledby~="team-leadership-heading"]';
const peopleGroup = 'section[aria-labelledby~="team-people-heading"]';

/**
 * Structural and responsive checks for `/team`.
 *
 * These run at all eight breakpoints: the two card grids step through four
 * column counts between them, and each step is a chance for a name to clip or
 * the page to scroll sideways.
 */
test.describe('team page', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTeam(page);
  });

  test('renders the title band and both groups under one h1', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Our team');
    await expect(page.getByRole('heading', { level: 2, name: 'Board of Directors' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Our Team' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
  });

  test('every card has a named heading and a role', async ({ page }) => {
    await revealLazyContent(page);

    for (const group of [leadershipGroup, peopleGroup]) {
      const cards = page.locator(`${group} article`);
      expect(await cards.count()).toBeGreaterThan(0);

      for (const card of await cards.all()) {
        await expect(card.locator('h3')).not.toBeEmpty();
        await expect(card.locator('p')).not.toBeEmpty();
      }
    }
  });

  test('names fit inside their cards', async ({ page }) => {
    await revealLazyContent(page);

    const clipped = await page.evaluate(() =>
      [...document.querySelectorAll('main article')].flatMap((card) => {
        const box = card.getBoundingClientRect();
        const name = card.querySelector('h3');
        if (!name) return ['missing name'];
        const text = name.getBoundingClientRect();
        return text.left >= box.left - 1 &&
          text.right <= box.right + 1 &&
          text.bottom <= box.bottom + 1
          ? []
          : [name.textContent ?? ''];
      }),
    );

    expect(clipped, `clipped names: ${clipped.join(', ')}`).toEqual([]);
  });

  test('portrait frames keep their shape', async ({ page }) => {
    // Height ÷ width of each card's photo frame: square for the board, 4:5 for the team.
    const ratioOf = (group: string) =>
      page.locator(`${group} article > div:first-child`).evaluateAll((frames) =>
        frames.map((frame) => {
          const box = frame.getBoundingClientRect();
          return box.height / box.width;
        }),
      );

    for (const ratio of await ratioOf(leadershipGroup)) expect(ratio).toBeCloseTo(1, 1);
    for (const ratio of await ratioOf(peopleGroup)) expect(ratio).toBeCloseTo(1.25, 1);
  });

  test('cards in a row share one height', async ({ page }) => {
    await revealLazyContent(page);

    const uneven = await page.evaluate(() => {
      const rows = new Map<number, number[]>();
      for (const card of document.querySelectorAll('main article')) {
        const box = card.getBoundingClientRect();
        const top = Math.round(box.top + window.scrollY);
        rows.set(top, [...(rows.get(top) ?? []), box.height]);
      }
      return [...rows.values()].filter(
        (heights) => Math.max(...heights) - Math.min(...heights) > 1,
      );
    });

    expect(uneven).toEqual([]);
  });

  test('every image loads', async ({ page }) => {
    await revealLazyContent(page);

    const broken = await page.evaluate(() =>
      [...document.querySelectorAll('main img')]
        .filter(
          (img) =>
            !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0,
        )
        .map((img) => (img as HTMLImageElement).currentSrc),
    );

    expect(broken).toEqual([]);
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

  test('LinkedIn buttons are named external links', async ({ page }) => {
    const links = page.locator('main article a[href*="linkedin.com"]');

    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link).toHaveAttribute('aria-label', /LinkedIn/);
    }
  });
});

test.describe('team page — navigation', () => {
  test('the header links to /team', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w1280', 'Desktop bar only.');

    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Team', exact: true }).click();

    await expect(page).toHaveURL(/\/team$/);
    await expect(page.locator('h1')).toHaveText('Our team');
  });

  test('loads without console errors', async ({ page }, testInfo) => {
    test.skip(!['w375', 'w1280'].includes(testInfo.project.name), 'Two widths are enough.');

    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await gotoTeam(page);
    await revealLazyContent(page);

    expect(errors).toEqual([]);
  });
});

test.describe('team page — SEO', () => {
  test('carries its own title, canonical and breadcrumb data', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w1280', 'Metadata is width-independent.');

    await gotoTeam(page);

    await expect(page).toHaveTitle(/Our Team/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/team$/);

    const types = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => {
        const parsed: unknown = JSON.parse(node.textContent ?? '{}');
        return (parsed as { '@type'?: string })['@type'] ?? '';
      }),
    );
    expect(types).toContain('BreadcrumbList');
  });
});

test.describe('team page — accessibility', () => {
  test('has no detectable violations', async ({ page }, testInfo) => {
    test.skip(
      !['w375', 'w768', 'w1280'].includes(testInfo.project.name),
      'Audited at three representative widths only.',
    );
    test.setTimeout(180_000);

    await gotoTeam(page);
    await revealLazyContent(page);

    const results = await new AxeBuilder({ page })
      .withTags(AXE_TAGS)
      // A documented WCAG 1.4.3 exemption — see `DECORATIVE_WORDMARK`.
      .exclude(DECORATIVE_WORDMARK)
      .analyze();

    const summary = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact ?? 'unknown'}) — ${violation.help}\n` +
        violation.nodes.map((node) => `    ${node.target.join(' ')}`).join('\n'),
    );

    expect(summary, `axe violations:\n${summary.join('\n')}`).toEqual([]);
  });
});
