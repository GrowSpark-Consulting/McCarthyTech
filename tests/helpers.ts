import type { Page } from '@playwright/test';

/**
 * Section anchors on the homepage, keyed by a stable slug.
 *
 * Driven off `aria-labelledby` targets rather than CSS classes, so a styling
 * refactor cannot silently break the suite — if one of these disappears, the
 * section has genuinely lost its accessible name and the test *should* fail.
 */
/**
 * The footer wordmark, excluded from the colour-contrast rule only.
 *
 * It is a 347px rendering of "McCarthy Tech" at `#121521` on `#00020f` — a measured
 * **1.14:1**, against a 3:1 threshold for text this size. That is not an
 * oversight; being barely there is the entire design. Raising it to pass would
 * put a giant word in direct competition with the footer's actual content, which
 * is worse for everyone and worst for the low-vision readers the rule protects.
 *
 * It qualifies for WCAG 1.4.3's exemption for incidental text: it is
 * `aria-hidden`, it conveys nothing, and the brand name it repeats is already
 * carried by the header logo's accessible name and the footer's legal-name link.
 *
 * **Scope.** `AxeBuilder.exclude` drops the element from the audit entirely, not
 * just from the contrast rule — axe has no per-element rule opt-out. That is
 * acceptable here only because the element is a single `aria-hidden` paragraph
 * with no children, no interactivity and no role: contrast is the only rule that
 * could ever apply to it. It would not be acceptable for a container.
 *
 * If the wordmark ever stops being `aria-hidden`, gains a link, or becomes the
 * only place the brand name appears, the exemption lapses and this must go.
 * Every other element on the page remains audited.
 */
export const DECORATIVE_WORDMARK = 'footer .font-black';

export const SECTION_HEADINGS = {
  hero: 'hero-heading',
  about: 'about-heading',
  services: 'services-heading',
  features: 'features-heading',
  projects: 'projects-heading',
  aiStream: 'ai-stream-heading',
  industriesServed: 'industries-served-heading',
  contact: 'contact-heading',
  testimonials: 'testimonials-heading',
} as const;

/**
 * Loads the homepage and settles it for a deterministic screenshot.
 *
 * Three things must be true before a shot is comparable run to run:
 *
 * 1. The preloader curtain is gone.
 * 2. Fonts have loaded — otherwise text is measured in the fallback face and
 *    every line wraps differently.
 * 3. Lazy media has had a chance to mount, so panels are not mid-swap.
 *
 * @param page - The page to prepare.
 */
export async function gotoHome(page: Page): Promise<void> {
  await gotoSettled(page, '/');
}

/**
 * Loads a service detail page and settles it.
 *
 * @param page - The page to prepare.
 * @param slug - Segment under `/services/`, e.g. `app-development`.
 */
export async function gotoService(page: Page, slug: string): Promise<void> {
  await gotoSettled(page, `/services/${slug}`);
}

/**
 * Navigates and waits for the page to stop moving.
 *
 * Shared by every entry point so no suite can accidentally assert against a
 * page that is still streaming, or measure text in the fallback font.
 *
 * @param page - The page to prepare.
 * @param path - Application-relative path to open.
 */
async function gotoSettled(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'load' });

  /*
   * Wait for the page's own content, not for a placeholder to disappear.
   *
   * Two earlier attempts at this were both wrong in instructive ways. A fixed
   * 1200ms sleep held until the machine was loaded, then let assertions run
   * against Next's streaming fallback. Replacing it with "wait for the loading
   * status to be hidden, `.catch()` if it never is" was worse: the catch
   * swallowed exactly the case it existed for, so under load the helper gave up
   * silently and the failure surfaced later as a correct element mysteriously
   * reporting `hidden`.
   *
   * Waiting for a real heading inside `main` cannot fail that way. The fallback
   * in `app/loading.tsx` contains no heading, so this resolves only once the
   * route has actually streamed. If it times out it throws here, naming the
   * problem, instead of corrupting an unrelated assertion further down.
   */
  await page.locator('#main-content :is(h1, h2)').first().waitFor({
    state: 'attached',
    timeout: 60_000,
  });

  await page.evaluate(() => document.fonts.ready);
  // A short beat for the entrance animations the fallback was covering.
  await page.waitForTimeout(400);
}

/**
 * Scrolls the whole page once, then returns to the top.
 *
 * Every section below the fold gates its media on an IntersectionObserver, so
 * without this pass a full-page screenshot captures skeletons rather than
 * content.
 *
 * @param page - The page to sweep.
 */
export async function revealLazyContent(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

/**
 * Pauses every video and rewinds it to its first frame.
 *
 * Playwright's `animations: 'disabled'` freezes CSS animations and transitions
 * but has no effect on media playback. The hero, service panels, and project
 * cards all autoplay, so without this each run screenshots a different frame and
 * every visual comparison fails on content that never actually changed.
 *
 * @param page - The page whose media should be frozen.
 */
export async function freezeMedia(page: Page): Promise<void> {
  await page.evaluate(() => {
    for (const video of document.querySelectorAll('video')) {
      video.pause();
      video.currentTime = 0;
      // Stop it restarting if a lazy mount re-triggers autoplay.
      video.autoplay = false;
      video.loop = false;
    }
  });
  await page.waitForTimeout(300);
}
