import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

/**
 * The service heroes' breakpoint bands, as **mutually exclusive** ranges.
 *
 * The reference styles that hero with seven overlapping media queries, including
 * two `min-width: 1200px` ranges that contradict each other and are resolved
 * purely by source order. Overlapping Tailwind variants cannot rely on that:
 * Tailwind sorts `min-` ascending and `max-` descending, so two rules sharing a
 * bound land in an order this file does not control.
 *
 * Splitting the bands so exactly one matches at any width removes the question
 * entirely — every rule becomes order-independent. The values written at each
 * call site are therefore the *resolved* ones: the original's cascade has been
 * collapsed here rather than at run time, which also means the intended value is
 * readable at a glance instead of being three overrides deep.
 *
 * **Why a plugin and not `screens`.** Range breakpoints can be declared as
 * `{ min, max }` objects under `theme.screens`, but doing so silently disables
 * Tailwind's generated `min-*` and `max-*` variants for *every* screen — and this
 * project's layout leans on `max-bs-lg:` and friends throughout. Registering the
 * bands as their own variants keeps `screens` free of objects, so both families
 * work side by side.
 *
 * Upper bounds carry `.98px` where the original wrote a bare pixel value,
 * following Bootstrap's own convention, so a fractional viewport width on a
 * scaled display cannot fall between two bands.
 */
const REFERENCE_BANDS: Record<string, string> = {
  'ref-xxl': '@media (min-width: 1501px) and (max-width: 1600px)',
  'ref-xl': '@media (min-width: 1301px) and (max-width: 1500px)',
  'ref-lg': '@media (min-width: 1200px) and (max-width: 1300px)',
  'ref-md': '@media (min-width: 992px) and (max-width: 1199.98px)',
  'ref-sm': '@media (min-width: 768px) and (max-width: 991.98px)',
  'ref-xs': '@media (min-width: 576px) and (max-width: 767.98px)',
  'ref-xxs': '@media (max-width: 575.98px)',
};

const referenceBands = plugin(({ addVariant }) => {
  for (const [name, query] of Object.entries(REFERENCE_BANDS)) {
    addVariant(name, query);
  }
});

/**
 * Tailwind design system for the Altibix Codelab site.
 *
 * Every token below is transcribed from the reference design's own stylesheet
 * (`:root` custom properties and the component rules that consume them), so the
 * utility classes generated here render values identical to the original —
 * no eyeballed approximations.
 *
 * Two breakpoint families coexist deliberately:
 *
 * 1. `xxs … 2xl` — the project's QA breakpoints (320/375/425/640/768/1024/1280/1536).
 * 2. `bs-sm … bs-xxl` — the Bootstrap 5 grid breakpoints the original layout was
 *    authored against. Tailwind auto-generates `max-*` variants for every screen,
 *    so `max-bs-lg:` compiles to `max-width: 991.98px`, exactly matching the
 *    reference's `@media (max-width: 991px)` rules. Keeping them lets the port
 *    reproduce the original's responsive behaviour rule-for-rule.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      xsm: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      // Bootstrap 5 grid breakpoints — the reference layout's native scale.
      'bs-sm': '576px',
      'bs-md': '768px',
      'bs-lg': '992px',
      'bs-xl': '1200px',
      'bs-xxl': '1400px',
    },
    extend: {
      colors: {
        /** `--color-body` / `--color-secondary`: page canvas and button ink. */
        ink: '#00020f',
        /** `--color-primary`: the chartreuse accent used on every primary CTA. */
        lime: '#c4f012',
        /** Nav pill and desktop submenu surface. */
        surface: '#15192f',
        /** Mega-menu panel surface. */
        panel: '#222746',
        /** Mobile drawer and sticky-header surface. */
        drawer: '#11121d',
        /** `--color-gray`: mega-menu description copy. */
        muted: '#b2b3b7',
        /** Hero sub-headline and secondary body copy. */
        subtle: '#b1b1b1',
        /** `.brand-sub-title` pill fill. */
        'brand-pill': '#0b2336',
        /** Accent green used by the AI stream and the served-card hover ring. */
        mint: '#00ff97',
        /** `DELETE`-request accent in the AI stream. */
        danger: '#fc0159',
        /** Softer danger tint for the stream's latency read-out. */
        'danger-soft': '#ff6a9c',
        /** `.xb-marquee-item` pill fill. */
        'stream-pill': '#121420',
        /** `.xb-marquee-item .tag` fill. */
        'stream-tag': '#0c2627',
        /**
         * `.xb-marquee-item .number`.
         *
         * The reference uses `#2c32fe` — a saturated blue that lands at roughly
         * 2.5:1 against the `#121420` pill, well under the 4.5:1 WCAG AA
         * minimum, and genuinely hard to read at 11px. axe flags it as
         * `color-contrast`. Lifted to a brighter tint of the same hue: same
         * look, legible, and it clears AA.
         */
        'stream-code': '#8f93ff',
        'stream-code-border': '#3b41d6',
        /** `.xb-marquee-item p` — the request path. */
        'stream-path': '#cfd2e6',
        /** Contact form input fill. */
        field: '#2b3d66',
        /** Border on the "Attach file…" chip. */
        'field-chip': '#3b4d77',
        /** Giant "Altibix" watermark behind the footer's email pill. */
        watermark: '#121521',
        /** Hairline rules dividing the footer's social and contact rows. */
        rule: '#262833',
        /** Review star. */
        star: '#d9ff43',
        /** `--svc-line` — hairline on the services cards. */
        'svc-line': 'rgb(255 255 255 / <alpha-value>)',
        /** `.svc-card__desc` body copy. */
        'svc-muted': '#97a1b5',
        /** `.svc-card__media` letterbox behind each clip. */
        'svc-well': '#0a0e18',
        /**
         * Service-detail accents.
         *
         * Each of the eight detail pages is themed by one of four accents so the
         * set reads as a family rather than eight unrelated pages. `mint` and
         * `lime` already exist above and serve as two of the four; these are the
         * remaining two. Both clear 4.5:1 against the `#00020f` canvas, so they
         * are safe on body copy and not only on display type.
         */
        'accent-violet': '#a78bfa',
        'accent-cyan': '#22d3ee',
        /** Glass header tint — `rgba(17, 18, 29, 0.28)`. */
        glass: 'rgb(17 18 29 / <alpha-value>)',
        /** Hero overlay base — `rgba(10, 11, 20, …)`. */
        veil: 'rgb(10 11 20 / <alpha-value>)',
      },
      fontFamily: {
        /** `--font-body`: DM Sans, injected as a CSS variable by `next/font`. */
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        /** `--font-heading`: self-hosted Sporting Grotesque display face. */
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Hero type ramp, transcribed from `.hero-content .title` and its
        // breakpoint overrides. Each entry pairs size with its exact line-height.
        'hero-xl': ['72px', '90px'],
        'hero-lg': ['62px', '80px'],
        'hero-md': ['50px', '72px'],
        'hero-sm': ['48px', '60px'],
        'hero-xs': ['36px', '50px'],
        'hero-sub': ['20px', '30px'],
        'hero-sub-sm': ['16px', '26px'],
        /**
         * Service-detail hero ramp, transcribed from `.hero-content--three`.
         *
         * The line-height is a unitless `1.47` at every size rather than a paired
         * pixel value, exactly as the original authors it — which is what keeps
         * the headline's leading proportional as the type steps down instead of
         * crowding at the small end.
         */
        'svc-title': ['80px', '1.47'],
        'svc-title-xl': ['65px', '1.47'],
        'svc-title-md': ['56px', '1.47'],
        'svc-title-sm': ['44px', '1.47'],
        'svc-title-xs': ['35px', '1.47'],
        'svc-title-xxs': ['30px', '1.47'],
        /** `.hero-content--three .sub-title`. */
        'svc-sub': ['24px', '1.3'],
        'svc-sub-xs': ['18px', '1.3'],
        /** `.hero-content-bottom .xb-item--text`. */
        'svc-metric': ['24px', '1.4'],
        'svc-metric-xs': ['18px', '1.4'],
        /**
         * `.sec-title-three .title` — the heading every interior band opens with.
         *
         * Five steps, all sharing a unitless `1.3`. Distinct from the `svc-title`
         * ramp above, which is the hero's display type: this one is set at
         * `font-weight: 400`, where the hero's is `700`.
         */
        'svc-band-title': ['45px', '1.3'],
        'svc-band-title-md': ['38px', '1.3'],
        'svc-band-title-sm': ['33px', '1.3'],
        'svc-band-title-xs': ['30px', '1.3'],
        'svc-band-title-xxs': ['25px', '1.3'],
        /** `.ai-service-heading .content` — the paragraph beside the statement. */
        'svc-band-lead': ['20px', '1.5'],
        /** `.ai-img-content .title` — the card caption inside the hover panel. */
        'svc-card-title': ['24px', '1.4'],
        'svc-card-title-lg': ['20px', '1.4'],
        'svc-card-title-md': ['18px', '1.4'],
        'svc-card-title-sm': ['22px', '1.4'],
      },
      letterSpacing: {
        /** `.hero-content .title` display tracking. */
        display: '-0.07em',
        /** Global body tracking set on `body` and nav links. */
        body: '-0.01em',
        /** `.hero-scroll-cue__text` label tracking. */
        cue: '0.28em',
        /**
         * `.ai-img-content .title` — tighter than the display tracking above.
         *
         * At `-0.1em` the caption is set noticeably closer than anything else on
         * the page. It is deliberate in the original and it is what lets a
         * three-word title hold one line inside a 250px card.
         */
        caption: '-0.1em',
      },
      maxWidth: {
        /** `.mxw-1650` — header and mega-menu outer bound. */
        shell: '1650px',
        /** Inline override on `.hero.hero-video .hero-content`. */
        'hero-content': '880px',
        /** `.hero-content .sub-title`. */
        'hero-sub': '678px',
        'hero-sub-lg': '650px',
      },
      spacing: {
        /** `.hero.hero-video .container` bottom inset, per breakpoint. */
        'hero-gutter': '110px',
        'hero-gutter-md': '80px',
        'hero-gutter-sm': '60px',
        /**
         * Top inset that clears the floating header capsule on interior pages.
         *
         * The header is absolutely positioned 24px into the page rather than
         * occupying flow, so every interior hero has to reserve the space itself.
         * Named here so the services hub and the eight detail pages cannot drift
         * apart by a few pixels — which is exactly what happens when the same
         * three values are retyped at each call site.
         */
        'svc-hero-top': '220px',
        'svc-hero-top-lg': '160px',
        'svc-hero-top-md': '130px',
      },
      borderRadius: {
        /** Glassmorphic header pill. */
        glass: '60px',
        'glass-sm': '22px',
        /** Desktop nav item pill. */
        pill: '23px',
        /** `.thm-btn` and `.agency-btn`. */
        cta: '30px',
      },
      boxShadow: {
        /** Glass header resting shadow. */
        glass: '0 10px 40px rgba(6, 8, 24, 0.28)',
        /** Sticky header shadow once pinned. */
        sticky: '0 3px 18px rgba(6, 27, 92, 0.09)',
        /** Desktop submenu elevation. */
        submenu: '0 0.5rem 1.875rem rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        glass: '18px',
      },
      backdropSaturate: {
        glass: '150%',
      },
      backgroundImage: {
        /**
         * Hero video scrim. Two stacked layers, exactly as authored: a vertical
         * darkening pass plus a radial vignette anchored to the lower-left where
         * the headline sits, guaranteeing text contrast over any video frame.
         */
        'hero-veil':
          'linear-gradient(180deg, rgba(10, 11, 20, 0.55) 0%, rgba(10, 11, 20, 0.12) 32%, rgba(10, 11, 20, 0.78) 100%), radial-gradient(130% 95% at 12% 100%, rgba(10, 11, 20, 0.85) 0%, rgba(10, 11, 20, 0) 58%)',
        /** Mega-menu bloom and hover ring gradient. */
        aurora: 'linear-gradient(52deg, #2c32fe 0%, #00a4af 49%, #00ff97 100%)',
        /** Glass header fill, also used as the service panel fill. */
        'glass-sheen':
          'linear-gradient(209deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)',
        /** Backdrop behind the services accordion. */
        'service-stage': "url('/assets/img/bg/service-bg.png')",
        /** Fine grain overlaid on each service panel. */
        'panel-noise': "url('/assets/img/service/noise.png')",
        /**
         * `.xb-border::after` — the 1px hairline that outlines service panels.
         * A gradient cannot be a real border, so it is painted into a masked
         * inset frame instead.
         */
        hairline:
          'linear-gradient(146deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 19.3%, rgba(255, 255, 255, 0.06) 62.02%, rgba(255, 255, 255, 0.4) 100%)',
        /** `.border-effect` — the underline that sweeps in on hover. */
        'sweep-underline': 'linear-gradient(transparent calc(100% - 2px), currentColor 1px)',
        /** Grain on the feature cards. */
        'feature-noise': "url('/assets/img/feature/noise.png')",
        /** Grain on the brand marquee's heading pill. */
        'brand-noise': "url('/assets/img/brand/noise.png')",
        /** `.xb-brand-wrap` fill — same 5% sheen as the panels, angled 215deg. */
        'glass-sheen-215':
          'linear-gradient(215deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)',
        /** Backdrops for the projects and industries stages. */
        'project-stage': "url('/assets/img/bg/project-bg.png')",
        'industries-stage': "url('/assets/img/bg/industries-bg02.png')",
        /** Grain on the project caption card. */
        'project-noise': "url('/assets/img/project/noise.png')",
        /** Contact section backdrop and its card grain. */
        'contact-stage': "url('/assets/img/bg/contact-bg.png')",
        'contact-noise': "url('/assets/img/contact/noise.png')",
        /** Rail gradient behind the AI stream — `.xb-gradiant-line span`. */
        'indus-rail':
          'linear-gradient(0deg, rgba(0, 164, 175, 0) 0%, rgba(0, 255, 151, 0.5) 50%, rgba(0, 164, 175, 0) 100%)',
        /** Halo behind the logo badge. */
        'indus-halo':
          'radial-gradient(circle, rgba(0, 255, 151, 0.4) 0%, rgba(0, 255, 151, 0) 65%)',
        /** Charge sweep masked onto the circuit traces. */
        'indus-charge':
          'linear-gradient(to bottom, transparent 40%, rgba(0, 255, 151, 0.95) 50%, transparent 60%)',
        /** `.svc-card` fill. */
        'svc-card': 'linear-gradient(180deg, rgba(20, 27, 43, 0.65), rgba(10, 14, 24, 0.55))',
        /** `.svc-card__sheen` — the diagonal edge-light revealed on hover. */
        'svc-sheen':
          'linear-gradient(130deg, transparent 30%, rgba(0, 255, 151, 0.7), transparent 70%)',
        /**
         * Service-detail hero backdrop.
         *
         * Drawn entirely in CSS rather than shipped as artwork: four accent-tinted
         * radial blooms plus a perspective grid weigh nothing, scale to any
         * viewport without a second asset, and re-theme per service by swapping a
         * single class. The grid is two repeating linear gradients — the cheapest
         * way to draw one — and is faded out by the hero's own mask rather than
         * being clipped, so it dissolves instead of ending on a hard edge.
         */
        'svc-bloom-mint':
          'radial-gradient(58% 46% at 50% 0%, rgba(0, 255, 151, 0.22) 0%, rgba(0, 255, 151, 0) 100%)',
        'svc-bloom-lime':
          'radial-gradient(58% 46% at 50% 0%, rgba(196, 240, 18, 0.2) 0%, rgba(196, 240, 18, 0) 100%)',
        'svc-bloom-violet':
          'radial-gradient(58% 46% at 50% 0%, rgba(167, 139, 250, 0.24) 0%, rgba(167, 139, 250, 0) 100%)',
        'svc-bloom-cyan':
          'radial-gradient(58% 46% at 50% 0%, rgba(34, 211, 238, 0.22) 0%, rgba(34, 211, 238, 0) 100%)',
        /**
         * `.hero.ai-marketing-hero` — the artwork framing the detail hero.
         *
         * Visible only in the 30px inset the section holds around its bordered
         * box, because the looping clip covers everything inside it. A 16 KB JPEG
         * for a 30px frame, which is why it stays a CSS background rather than
         * becoming another `next/image` layer.
         */
        'svc-hero-frame': "url('/assets/img/bg/hero-bg03.jpg')",
        /**
         * `.hero-style--three::before` — the scrim between the clip and the copy.
         *
         * The original loads `img/bg/hero-gradient.png` for this, and that file is
         * not among the extracted assets. Redrawn in CSS from the same vocabulary
         * the homepage's `hero-veil` uses — a vertical darkening pass plus a
         * lower-left vignette — so the headline keeps its contrast over any frame
         * of the video. Weighs nothing and needs no second request.
         */
        'svc-hero-scrim':
          'linear-gradient(180deg, rgba(0, 2, 15, 0.55) 0%, rgba(0, 2, 15, 0.25) 40%, rgba(0, 2, 15, 0.75) 100%), radial-gradient(120% 90% at 10% 100%, rgba(0, 2, 15, 0.8) 0%, rgba(0, 2, 15, 0) 60%)',
        /**
         * `.ai-about-wrap::before` — the mesh behind the overview panel.
         *
         * The genuine artwork, authored at 1860×607 — that height is not a
         * coincidence, it is `.ai-about-wrap`'s own `min-height`, so at the
         * panel's natural size the grid lands 1:1 with no resampling at all.
         *
         * Worth using rather than approximating. Measured from the file, its
         * cells are **52 × 38px** and its strokes are `#eeeeee` at an alpha of
         * 6–11 out of 255 — between 2.4% and 4.3%, and deliberately uneven
         * between the two axes. A CSS grid guessed at square cells and a flat
         * 4.5% reads as a visibly different texture.
         */
        'ai-about-net': "url('/assets/img/about/net-img.png')",
        /**
         * `.ai-award-wrap::before` — the mesh behind the "why choose us" panel.
         *
         * A second, taller cut of the same artwork (1860×906 against the overview's
         * 1860×607). Not interchangeable with it: both are drawn to their panel's
         * exact height so the grid lands 1:1 without resampling.
         */
        'ai-award-net': "url('/assets/img/award/net-img.png')",
        /** `.xb-process-step::before` — grain over the step card's glass. */
        'process-noise': "url('/assets/img/process/noise.png')",
        /** `#integration` backdrop and the comparison cards' fill. */
        'integrations-stage': "url('/assets/img/bg/integrations-bg.png')",
        'comparison-card': "url('/assets/img/bg/comparison-bg.png')",
        /** `.integration-logo::before` — the tile behind each platform mark. */
        'integration-tile': "url('/assets/img/integration/bg.png')",
        /** `.comparison-vs-logo::before` — the mint bloom behind the VS badge. */
        'vs-badge': 'radial-gradient(99.41% 174.01% at -2.12% 64.17%, #00ff97 0%, #00020f 100%)',
        /** Backdrops for the closing three bands. */
        'pricing-stage': "url('/assets/img/bg/pricing-bg.png')",
        'pricing-card': "url('/assets/img/bg/pricing-bg01.png')",
        'faq-stage': "url('/assets/img/bg/faq-bg.png')",
        'cta-stage': "url('/assets/img/bg/cta-bg.jpg')",
        /** `.ai-brand-content::before` — grain over the frosted client panel. */
        'brand-noise02': "url('/assets/img/brand/noise02.png')",
        /** `.choose-card__media::after` — the scrim that seats the card's caption. */
        'choose-card-scrim':
          'linear-gradient(180deg, rgba(11, 35, 54, 0) 55%, rgba(11, 35, 54, 0.85) 100%)',
        /** Perspective grid behind the detail hero. */
        'svc-grid':
          'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 72px), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 72px)',
        /** Testimonial and footer backdrops. */
        'testimonial-stage': "url('/assets/img/bg/testimonial-bg.png')",
        'footer-stage': "url('/assets/img/bg/footer-bg.png')",
        /** `.xb-project-content .xb-item--inner` fill. */
        'project-caption':
          'linear-gradient(209deg, rgba(0, 2, 15, 0.42) 0%, rgba(0, 2, 15, 0.42) 100%)',
        /** `.xb-project-item` desktop sheen. */
        'project-sheen':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        /** `.xb-served-card` fill. */
        'served-card':
          'linear-gradient(180deg, rgba(20, 27, 43, 0.92) 0%, rgba(11, 16, 28, 0.86) 100%)',
        /** `.xb-served-card__icon` fill. */
        'served-icon':
          'radial-gradient(circle at 50% 35%, rgba(0, 255, 151, 0.13) 0%, rgba(0, 2, 15, 0.6) 70%)',
        /** `.xb-served-card__icon::before` — the rotating accent arc. */
        'served-ring':
          'conic-gradient(from 0deg, transparent 0 68%, rgba(0, 255, 151, 0.95) 84%, transparent 100%)',
      },
      transitionTimingFunction: {
        /** `--easing` — the design system's house curve. */
        house: 'cubic-bezier(0.67, 0.04, 0.3, 0.91)',
        /** `.scale-animation` hero reveal curve. */
        reveal: 'cubic-bezier(0.55, 0.085, 0, 0.99)',
        /** Sticky header slide-in curve. */
        sticky: 'cubic-bezier(0.23, 0.76, 0.53, 0.99)',
        /** Mobile drawer / backdrop curve. */
        drawer: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        /** Scroll-cue travel curve. */
        cue: 'cubic-bezier(0.76, 0, 0.24, 1)',
        /** Menu affordances — close button, submenu chevron. */
        menu: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        /** `.border-effect` underline sweep on service headings. */
        underline: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      transitionDuration: {
        drawer: '400ms',
        sticky: '600ms',
        reveal: '1000ms',
        /** Menu affordance timing. */
        menu: '250ms',
        /** Glass header background/border cross-fade. */
        glass: '400ms',
        /** `.border-effect` underline sweep. */
        underline: '600ms',
        /** Service panel expand/collapse. */
        panel: '600ms',
        /** Service panel content fade-in. */
        'panel-content': '400ms',
        /** AI-stream pill hover. */
        pill: '350ms',
        /** Industry card hover. */
        card: '450ms',
        /** Industry card's accent-ring fade. */
        ring: '400ms',
      },
      transitionDelay: {
        /**
         * The service panel's staggered reveal — heading, then copy, then media.
         * Transcribed from `.xb-service-item.active .xb-item--*`.
         */
        'panel-head': '300ms',
        'panel-copy': '400ms',
        'panel-media': '500ms',
      },
      keyframes: {
        /** `@keyframes heroScroll` — the travelling highlight in the scroll cue. */
        'hero-scroll': {
          '0%': { top: '-50%' },
          '75%, 100%': { top: '100%' },
        },
        /**
         * Brand marquee. Travels exactly half the track's width, which is why
         * the logo list must be rendered twice — at -50% the second copy sits
         * precisely where the first started, so the loop point is invisible.
         */
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        /**
         * The vertical twin of `marquee-x`, for the integration logo columns.
         *
         * Same `-50%` contract and the same requirement: the column's contents
         * must be rendered twice, or the loop point jumps.
         */
        'marquee-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        /** `.xb-served-card__icon::before` — the accent arc's rotation. */
        'served-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        /**
         * `.xb-live-dot` — an expanding ring that fades out, read as a heartbeat.
         * Animating `box-shadow` spread rather than a scaled pseudo-element keeps
         * the dot itself crisp at 7px.
         */
        'live-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 255, 151, 0.7)' },
          '70%': { boxShadow: '0 0 0 7px rgba(0, 255, 151, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 255, 151, 0)' },
        },
        'live-pulse-red': {
          '0%': { boxShadow: '0 0 0 0 rgba(252, 1, 89, 0.7)' },
          '70%': { boxShadow: '0 0 0 7px rgba(252, 1, 89, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(252, 1, 89, 0)' },
        },
        /**
         * Footer email pill. The gradient is sized to 200% and its position
         * panned, so the colours drift across the pill rather than the pill
         * itself moving.
         */
        'gradient-pan': {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '100% 50%' },
        },
        /**
         * Service-detail hero bloom.
         *
         * A slow scale-and-fade so the accent wash behind the headline is never
         * quite static. Kept to `opacity` and `transform` only, which are the two
         * properties the compositor can animate without laying out or painting —
         * a 22s cycle on a full-bleed element would be visibly expensive
         * otherwise.
         */
        'svc-bloom': {
          '0%, 100%': { opacity: '0.75', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
        /** `.xb-gradiant-line span` — the faint vertical rails breathing. */
        'indus-twinkle': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        /**
         * The logo badge's halo. It idles dim for most of the cycle then flares
         * briefly at 88%, which is what makes it read as a pulse rather than a
         * steady throb.
         */
        'indus-logo-glow': {
          '0%, 70%, 100%': { opacity: '0.2', transform: 'translate(-50%, -50%) scale(0.85)' },
          '88%': { opacity: '0.95', transform: 'translate(-50%, -50%) scale(1.12)' },
        },
        'indus-logo-illum': {
          '0%, 70%, 100%': { filter: 'drop-shadow(0 0 2px rgba(0, 255, 151, 0.15))' },
          '88%': { filter: 'drop-shadow(0 0 24px rgba(0, 255, 151, 0.85))' },
        },
        /** Charge travelling up the circuit traces. */
        'indus-line-flow': {
          '0%': { backgroundPosition: '50% 120%', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { backgroundPosition: '50% -20%', opacity: '0' },
        },
        /** Terminal cursor in the telemetry panel header. */
        'xb-blink': {
          '50%': { opacity: '0' },
        },
        /**
         * `@keyframes widthScale` — the tint that sweeps across the active tab.
         *
         * Animates `width`, which is a layout property and normally the wrong
         * thing to animate. It is confined to an absolutely positioned overlay
         * inside a fixed-size button, so nothing around it can be reflowed by it,
         * and it is what the original does.
         */
        'width-scale': {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        /** `@keyframes ring2` — the lazy rocking of the first floating shape. */
        ring2: {
          '0%, 100%': { transform: 'rotate(0) scale(1) skew(1deg)' },
          '10%, 50%': { transform: 'rotate(-15deg) scale(1) skew(1deg)' },
          '20%, 70%': { transform: 'rotate(30deg) scale(1) skew(1deg)' },
        },
        /** `@keyframes zoominup` — the third shape breathing. */
        zoominup: {
          '0%, 100%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1)' },
        },
        /**
         * `@keyframes leftToRight` — dots travelling the security card's wire.
         *
         * A flat 257px, which is the wire's width in the original's desktop
         * layout. Five dots share the keyframe and are staggered two seconds
         * apart, so the wire reads as continuous traffic rather than five
         * synchronised dots.
         */
        'left-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(257px)' },
        },
        /**
         * `@keyframes fadeInUp`, transcribed from this project's own
         * `assets/css/animate.css`.
         *
         * Note the travel: **70px**, not Animate.css's stock
         * `translate3d(0, 100%, 0)`. The reference ships a customised build, and
         * a fixed rise is what keeps a tall block from launching itself off the
         * fold — see the known-issues note about `ScrollReveal`, which still
         * uses the stock 100%.
         */
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(70px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'hero-scroll': 'hero-scroll 2s cubic-bezier(0.76, 0, 0.24, 1) infinite',
        'marquee-x': 'marquee-x 25s linear infinite',
        /** Industries served strip — `.xb-served-track`. */
        'served-scroll': 'marquee-x 42s linear infinite',
        'served-scroll-sm': 'marquee-x 30s linear infinite',
        'served-spin': 'served-spin 3s linear infinite',
        /**
         * The two AI-stream rows. Their parent is rotated -90deg, so a
         * horizontal translate reads as vertical travel; the reverse direction
         * on the second row is what makes the two columns counter-scroll.
         */
        /**
         * Five rows, each on its own pace and direction. The mismatched
         * durations are what stop the columns reading as one moving block —
         * transcribed from the inline `animation-duration` on each row.
         */
        'stream-1': 'marquee-x 26s linear infinite',
        'stream-2': 'marquee-x 32s linear infinite reverse',
        'stream-3': 'marquee-x 22s linear infinite',
        'stream-4': 'marquee-x 30s linear infinite reverse',
        'stream-5': 'marquee-x 28s linear infinite',
        'live-pulse': 'live-pulse 1.6s ease-out infinite',
        'live-pulse-red': 'live-pulse-red 1.6s ease-out infinite',
        'gradient-pan': 'gradient-pan 5s ease-in-out infinite alternate',
        'svc-bloom': 'svc-bloom 22s ease-in-out infinite',
        /**
         * The dashed ring orbiting the detail-page showcase. Reuses Tailwind's
         * built-in `spin` keyframe at a much slower rate — a full turn every 28
         * seconds reads as drift rather than as a loading spinner.
         */
        'svc-orbit': 'spin 28s linear infinite',
        /** Counter-rotation, so content inside the ring stays upright. */
        'svc-orbit-reverse': 'spin 28s linear infinite reverse',
        'indus-twinkle': 'indus-twinkle 3.6s ease-in-out infinite',
        'indus-logo-glow': 'indus-logo-glow 3s ease-in-out infinite',
        'indus-logo-illum': 'indus-logo-illum 3s ease-in-out infinite',
        'indus-line-flow': 'indus-line-flow 3s linear infinite',
        'xb-blink': 'xb-blink 1s steps(1) infinite',
        /**
         * The reference's `wow fadeInUp` entrance, at its `data-wow-duration`.
         *
         * Deliberately a CSS animation rather than a Framer Motion reveal. The
         * service hero is above the fold, so WOW.js fires it on load rather than
         * on scroll — there is no intersection to observe and therefore no reason
         * to ship a client component to play it. As CSS it costs zero hydration,
         * it plays for visitors whose JavaScript never arrives, and
         * `prefers-reduced-motion` is already neutralised globally in
         * `globals.css`, which an inline motion style could not be.
         *
         * `both` fill mode is Animate.css's `.animated` default and is what holds
         * the element at `opacity: 0` through the delay — without it a staggered
         * child flashes at full opacity before its turn.
         */
        'fade-in-up': 'fade-in-up 600ms ease both',
        /**
         * `.ai-circle-img` — the ring drifting behind the overview panel.
         *
         * `animation: spin 70s linear infinite` in the original. Slow enough that
         * it never reads as a spinner; the artwork is 1326px square and sits
         * mostly above the panel, so only its lower arc is ever on screen.
         */
        'about-orbit': 'spin 70s linear infinite',
        'width-scale': 'width-scale 3s linear infinite',
        /** The two integration columns, counter-scrolling at different paces. */
        'marquee-y': 'marquee-y 30s linear infinite',
        'marquee-y-reverse': 'marquee-y 36s linear infinite reverse',
        ring2: 'ring2 20s ease-out infinite',
        zoominup: 'zoominup 5s linear infinite',
      },
      zIndex: {
        header: '3',
        drawer: '1010',
        backdrop: '999',
        preloader: '1100',
      },
    },
  },
  plugins: [animate, referenceBands],
};

export default config;
