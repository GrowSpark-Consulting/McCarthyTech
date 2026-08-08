# Phase 7 — Testimonials + Footer

The final two sections. **The homepage is now complete** — all ten sections plus
header and footer.

---

## 1. New files

```
src/
├── components/
│   ├── layout/
│   │   └── site-footer.tsx                 # 3-band footer, zero JS
│   ├── sections/testimonials/
│   │   ├── testimonials-section.tsx
│   │   ├── testimonial-carousel.tsx        # Embla, accessible
│   │   └── testimonial-card.tsx
│   └── ui/
│       ├── avatar-initials.tsx             # generated monogram avatars
│       └── google-glyph.tsx                # inline Google "G"
└── lib/
    ├── testimonials.ts
    └── footer.ts
```

**Modified:** `layout.tsx` (footer mounted below `<main>`), `page.tsx`,
`tailwind.config.ts`, `lib/utils.ts`.

---

## 2. Values transcribed

| Element | Value | Source |
|---|---|---|
| Testimonials section | `pb-150`, `testimonial-bg.png` | `.testimonial` |
| Heading ornament | `112px` wide, `z-index:-1` (sits behind the text); `75px` ≤767 | `.tes-sec-title .title img` |
| Review card | `padding 30px 36px 30px 30px`, `rounded:10px`, `blur(40px)` + hairline | `.xb-item--inner` |
| Rating chip | `#00020f`, `rounded:7px`, `padding 7px 10px`, `gap:9px` | `.xb-item--rating` |
| Star | `#d9ff43` | `.xb-item--rating li i` |
| Quote | `22px / 34px`, `500`, `-0.02em`, `margin 23px 0 64px` | `.xb-item--content` |
| Reviewer name | `21px`, capitalised | `.xb-item--name` |
| Footer | `pt-145`, `footer-bg.png`, inner `#00020f` `pt-50` | `.footer`, `.xb-footer-wrap` |
| Watermark | `347px`, `900`, `#121521`, `+0.02em`; `289 / 247 / 185 / 179 / 139 / 63 / 105px` | `.xb-footer-heading .title` |
| Email pill | `32px`, `padding 26px 40px`, `rounded:61px`, `left:50% top:38%` | `.mail` |
| Pill gradient | `52deg #2c32fe → #00a4af 49% → #00ff97`, `200%` size, `5s alternate` | `.mail::before` |
| Nav row | `padding 0 50px`, `margin-top:-30px`; `+5 / +20 / +40px` | `.xb-footer-nav` |
| Nav prompt | `700`, uppercase, `#b2b3b7`, `-0.02em` | `.sub-title` |
| Nav link | `42px`, `-0.03em`, underline wipe on hover; `30 / 28 / 22px` | `.title` |
| Social row | `padding 15.5px 15px 15.5px 20px`, lime wipe `width 0 → 100%` | `.xb-social-media-item` |
| Social grid | 3 columns, `border-y #262833`, `margin-top:85px`; 1 column ≤767 | `.xb-social-media-wrap` |
| Contact strip | `25% / 50% / 25%`, `min-height:91px`, `border-r #262833` | `.xb-footer-bottom` |
| Contact text | `24px`, display face, `-0.01em` | `.contact-method` |

---

## 3. Notable decisions

**The reviewer avatars are generated, not sourced.** `avatar/img01.jpg` and
`img02.jpg` **404 on the live site** — the reference's own photos are broken.
`AvatarInitials` derives a monogram from the reviewer's name and tints it from
the site's own palette, hashed off the name so a reviewer keeps their colour if
the list is reordered. Sourcing stock portraits would have put a stranger's face
next to a named real person's review.

Initials take the first *and last* word, so "Hyfa Muhammed Sha" reads **HS**, not
HM — the surname is the more identifying half.

**Embla instead of Swiper.** Far smaller, ships no CSS of its own, and leaves
slide layout to flexbox — so the responsive widths are plain Tailwind classes
rather than a JavaScript breakpoint config.

**The carousel is accessible; the reference's is not.** Added: a labelled
`role="group"` region with `aria-roledescription="carousel"`, per-slide position
announcements ("2 of 4"), real `<button>` controls that disable at the ends, and
arrow-key navigation.

**Reviews are `<figure>` + `<blockquote>` + `<figcaption>`.** The reference uses
`<p>` and `<div>`, which leaves a screen reader no way to connect a quote to its
attribution.

**The watermark is a `<p>`, not an `<h1>`.** The reference marks 347px of
decorative lettering as a top-level heading — the page's *second* `<h1>`. Here it
is `aria-hidden` decorative text. **Verified: exactly one `<h1>` on the page.**

**The footer ships zero JavaScript.** Every interaction — the underline wipe, the
lime sheet sweeping across each social row, the gradient pan — is CSS. The
gradient effect over-sizes the fill to 200% and animates its *position*, so the
pill never moves.

**Google's glyph is inline.** Lucide carries no brand marks, and a second icon
library for one logo is not worth the dependency. Painted in `currentColor` so it
inverts with its neighbours on hover.

---

## 4. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Home route | 15.2 → **23.5 kB**; First Load JS 202 → **211 kB** |
| Sections | **10** |
| `<h1>` count | **1** — watermark correctly demoted |
| `<footer>` | 1 |
| Reviews | 4 `<figure>` + 4 `<blockquote>`, all names correct |
| Footer prompts | all five present |
| Contact links | `mailto:altibix360@gmail.com`, `tel:+917306339274`, "Nilamel, Kerala, India" |
| Compiled CSS | `animate-gradient-pan` (5s alternate), `bg-footer-stage`, `bg-testimonial-stage`, `text-watermark` (`#121521`), `border-rule` (`#262833`), `fill-star` (`#d9ff43`) — all correct |
| `©` encoding | verified U+00A9 in both source and output (an earlier `Â©` reading was a PowerShell 5.1 console artifact, not a defect) |

---

## 5. The homepage is complete

| # | Section | Phase |
|---|---|---|
| — | Header + mega-menu + mobile drawer | 1 |
| 1 | Hero | 1 |
| 2 | About | 2 |
| 3 | Services accordion | 2 |
| 4 | Features | 3 |
| 5 | Client logo marquee | 3 |
| 6 | Projects (sticky stack) | 4 |
| 7 | AI traffic stream | 5 |
| 8 | Industries served | 5 |
| 9 | Contact + achievements | 6 |
| 10 | Testimonials | 7 |
| — | Footer | 7 |

**Fifteen assets** were referenced by the reference's stylesheet or markup but
absent from `exact_assets_checklist.md`. All recovered from the live site except
the two testimonial avatars, which 404 there too.

---

## 6. Known improvements

1. **First Load JS is 211 kB.** RHF + Zod + CountUp + Embla all load upfront for
   sections most visitors never reach. Dynamic-importing `ContactForm` and
   `TestimonialCarousel` would likely bring this back under 150 kB — the single
   highest-value change left.
2. **~33 MB of project video** remains the largest asset cost. Re-encoding to
   VP9/AV1 is still the top media optimisation.
3. **Lighthouse has never been run.** No headless Chrome here. Every lever is in
   place and the build is clean, but the score is unmeasured. Run
   `npx lighthouse http://localhost:3000 --view` against `npm start`.
4. **No automated tests.** Playwright visual-regression snapshots at all eight
   breakpoints plus axe-core assertions would lock in what is currently verified
   by inspection.
5. **Contact delivery still needs `CONTACT_WEBHOOK_URL`** and spam protection
   before going live — see [PHASE-6.md](PHASE-6.md).
6. **Inner routes are unbuilt.** `/services/*`, `/about`, `/team`, `/careers`,
   `/contact`, `/projects`, `/blog` all resolve to the 404 boundary. The sitemap
   deliberately lists only `/`.
