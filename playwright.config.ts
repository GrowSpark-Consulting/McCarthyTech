import { defineConfig, devices } from '@playwright/test';

/**
 * The eight widths this project is specified against.
 *
 * Each becomes its own Playwright project, so a regression at 375px is reported
 * separately from one at 1280px rather than the suite failing with a single
 * ambiguous "visual difference".
 */
const BREAKPOINTS = [320, 375, 425, 640, 768, 1024, 1280, 1536] as const;

/** Viewport height used for every breakpoint. */
const VIEWPORT_HEIGHT = 900;

const PORT = 3400;
const BASE_URL = `http://127.0.0.1:${PORT}`;

/**
 * Playwright configuration.
 *
 * Uses the **system Chrome** (`channel: 'chrome'`) rather than Playwright's
 * bundled Chromium. That avoids a ~500 MB browser download on a machine that is
 * already short on disk, and it tests the engine real visitors use.
 *
 * `webServer` builds and serves the production bundle, because that is what
 * ships — the dev server has React Strict Mode double-invoking effects and no
 * minification, so screenshots taken against it would not represent production.
 */
export default defineConfig({
  testDir: './tests',
  // Screenshots must be byte-comparable, so run them serially rather than
  // letting parallel workers contend for CPU and shift animation timing.
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  timeout: 60_000,
  expect: {
    toHaveScreenshot: {
      /**
       * A small tolerance absorbs sub-pixel text rendering and the odd
       * animation frame, while still catching genuine layout regressions.
       */
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
      caret: 'hide',
    },
  },
  use: {
    baseURL: BASE_URL,
    channel: 'chrome',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Kills the entrance animations, marquees, and counters so a screenshot is
    // deterministic instead of depending on when it was taken. Passed through
    // `contextOptions` — this Playwright version does not surface
    // `reducedMotion` as a top-level `use` option.
    contextOptions: { reducedMotion: 'reduce' },
  },
  projects: BREAKPOINTS.map((width) => ({
    name: `w${width}`,
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
      viewport: { width, height: VIEWPORT_HEIGHT },
    },
  })),
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
