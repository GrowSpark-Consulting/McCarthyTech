import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoHome, revealLazyContent } from './helpers';

/**
 * WCAG levels enforced. AA is the standard commercial sites are held to;
 * `best-practice` catches structural problems (nesting, landmark misuse) that
 * the WCAG tags alone miss.
 */
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

/**
 * Automated accessibility audit.
 *
 * axe catches roughly a third of real accessibility defects — it cannot judge
 * whether alt text is *meaningful*, only whether it exists. Passing here is a
 * floor, not a certificate.
 *
 * Runs at three representative widths rather than all eight: the mobile drawer,
 * the tablet layout, and the desktop mega-menu are the three genuinely different
 * interaction models, and the rest only differ in type scale.
 */
test.describe('accessibility', () => {
  test('homepage has no detectable violations', async ({ page }, testInfo) => {
    test.skip(
      !['w375', 'w768', 'w1280'].includes(testInfo.project.name),
      'Audited at three representative widths only.',
    );

    await gotoHome(page);
    await revealLazyContent(page);

    const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

    // Name each violation in the failure message — an empty-array assertion
    // tells you nothing about *what* broke.
    const summary = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact ?? 'unknown'}) — ${violation.help}\n` +
        violation.nodes.map((node) => `    ${node.target.join(' ')}`).join('\n'),
    );

    expect(summary, `axe violations:\n${summary.join('\n')}`).toEqual([]);
  });

  test('mobile drawer traps focus and closes on Escape', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w375', 'Drawer only exists below 992px.');

    await gotoHome(page);

    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: 'Site navigation' });
    await expect(dialog).toBeVisible();

    // Focus must land inside the drawer, not stay behind it on the trigger.
    const focusedInside = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"]');
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(focusedInside, 'focus did not move into the drawer').toBe(true);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('skip link is the first tab stop and targets main', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'w1280', 'Keyboard order is width-independent.');

    await gotoHome(page);
    await page.keyboard.press('Tab');

    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main-content');
    await expect(page.locator('#main-content')).toHaveCount(1);
  });
});
