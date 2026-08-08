# Section Re-Audit

Triggered by the AI stream turning out to have **two** separate under-extractions.
Every other section was extracted the same way — by reading the first chunk of
markup and assuming the pattern held — so all of them needed re-checking.

---

## Method

Reading markup by hand is what caused the misses in the first place, so this was
done mechanically instead:

1. Re-fetched the live page. **Byte-identical** to the copy used for the build
   (343,781 bytes), confirming every discrepancy is an extraction error on my
   side, not a change upstream.
2. Sliced the reference into its sections.
3. Stripped tags from each slice and extracted **every distinct visible string**.
4. Asserted each string appears somewhere in my rendered output.

That last step is the one that matters: it is exactly what would have caught the
AI stream. Rows 3–5 contained unique strings (`/rag/retrieve`,
`/gpu/utilisation`, `Skilled Developers`) that were simply absent from my build.

A count-based comparison was also attempted and **abandoned as unreliable** — the
reference HTML embeds duplicated React flight data and carries both the desktop
and mobile mega-menus, so raw element counts do not line up on either side.

---

## Result: all sections clean

| Region | Result |
|---|---|
| Header + mega-menu | ✅ |
| Hero | ✅ |
| About | ✅ |
| Services accordion | ✅ |
| Features | ✅ |
| Brand marquee | ✅ |
| Projects | ✅ |
| AI stream | ✅ (after the earlier fix) |
| Industries Served | ✅ |
| Contact | ⚠️ one real finding — fixed, below |
| Testimonials | ✅ |
| Footer | ✅ |

**No further under-extractions.** The AI stream was the only section affected.

### Reported-but-not-real

Four flagged strings were artifacts of the diff, verified individually:

- `<section`, `id="about" class=...` — slice boundaries leaking into the text dump.
- `Industry:` / `Focus:` — React emits a comment node between `{fact.label}` and
  the literal `:`, so the two never form one contiguous string in the HTML. Both
  render correctly.
- `Copyright © 2025` — same cause, `{year}` split from the literal.

### Cosmetic difference, left as-is

Testimonial quotes use typographic quotes (`“…”`); the reference uses straight
(`"…"`). Say the word if you want them matched exactly.

---

## The one real finding

**The entire contact form was missing from the served HTML.**

Phase 8 code-split `ContactForm` with `ssr: false` to keep React Hook Form and
Zod out of the initial bundle. That worked — but the whole card went with it,
including content that is not part of the form at all:

- "Ready to collaborate with us?"
- "Who knows where a single message might lead you."
- Every field label: Your Name*, Email Address*, Contact No*, Attach file…,
  Select Service*, Your Message.., submit here
- All three service options

None of it was in the HTML. Not crawlable, and nothing for a visitor without
JavaScript.

**Fix.** The card chrome and heading block moved up into `ContactSection`, which
is a Server Component. Only the form *controls* stay behind `ssr: false`.

The heading and subheading are now server-rendered (**verified present in the
built HTML**), the bundle saving is retained, and the skeleton no longer
duplicates the card chrome.

The field labels remain client-only — they are form affordances rather than
content, and they carry no SEO value. That is a deliberate trade, unlike the
heading, which was lost by accident.

---

## Verification

| Check | Result |
|---|---|
| `tsc --noEmit` | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, zero warnings |
| Playwright suite | **45 passed · 0 failed** |
| Contact copy in SSR HTML | present |

---

## Still outstanding

- Visual-regression baselines remain `test.fixme` — see [PHASE-9.md](PHASE-9.md).
- ffmpeg re-encode — disk is at ~0.9 GB free.
- `LazyMotion` refactor for mobile TBT (860 ms).
