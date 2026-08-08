# Phase 6 — Contact + Achievements

The enquiry section: animated achievement counters on the left, a validated
contact form on the right.

This is the phase where `react-countup`, React Hook Form, and Zod finally earn
their place in the dependency list.

---

## 1. New files

```
src/
├── app/actions/
│   └── submit-enquiry.ts              # Server Action — re-validates + delivers
├── components/sections/contact/
│   ├── contact-section.tsx            # layout shell
│   ├── achievement-stats.tsx          # gradient card + scroll-triggered counters
│   └── contact-form.tsx               # RHF + Zod enquiry form
└── lib/
    └── contact.ts                     # schema, copy, stats, service list
```

**Modified:** `page.tsx`, `tailwind.config.ts`, `lib/utils.ts`,
`ui/arrow-glyph.tsx` (24-unit `compact` variant for the submit button).

**Asset added:** `contact/noise.png` — referenced by `main.css`, absent from the
checklist. That is the **twelfth** such file across the project.

---

## 2. Values transcribed

| Element | Value | Source |
|---|---|---|
| Section | `pt-150 pb-140`, `contact-bg.png` | `.contact-section` |
| Left column | `margin-top: -5px`, `margin-right: 100px`; `60 / 35 / 0px` | `.xb-content-wrap` |
| Heading | `62px / 1.3`, `-0.08em` | `.sec-title .title` + `.contact-sec-title` |
| Heading ornament | `165×50` pill-cropped GIF | `.title.horizontal-shape img` |
| Stats card | `linear-gradient(52deg, #2c32fe → #00a4af 49% → #00ff97)` | `.xb-contact-inner` |
| Stats padding | `140px 35px 40px`; `140px 20px 40px` ≤1023 | same |
| Stats block | `margin-top: 133px` | `.xb-contact-conent` |
| Counter | `55px`; `50 / 48px` | `.xb-item--number` |
| Counter label | `18px / 500` | `.xb-item--content` |
| Shape 1 | `top:-40% left:30%`; `26 / 35 / 16%` | `.shape--1` |
| Shape 2 | `top:-40% right:31%`, `z-index:-1`; `25 / 34 / 15%` | `.shape--2` |
| Form card | `padding 50px 40px`, `margin-left: -30px`, grain + hairline | `.xb-contact-form` |
| Form title | `32px`, `-0.03em`; `30 / 24px` | `.xb-contact-form .title` |
| Control | `60px` tall, `rounded:5px`, `#2b3d66`, `border rgba(255,255,255,.35)` | `.xb-input-field input` |
| Control padding | `10px 20px 10px 48px` | same |
| Floating label | `left:48px`, `rgba(255,255,255,.5)` → `translate(15px,-50%) opacity:0` | `.xb-input-field label` |
| Leading icon | `left:20px`, `brightness(100)` (black art → white) | `.xb-input-field img` |
| Textarea | `120px` tall, `padding 14px 20px 14px 48px`, label + icon at `top:30px` | `.xb-massage-field` |
| File chip | `top:19px left:48px`, `h:22px`, `rounded:20px`, `border #3b4d77` | `.xb-select-file span` |
| Submit | full width, `padding 15px 40px`, lime → white on hover | `.form-btn` |
| Submit arrows | `30px` circle, dual glyph swap at `(30,-30)` / `(-30,30)`, `100ms` delay | `.form-btn .xb-icon` |

---

## 3. Notable decisions

**One schema, enforced twice.** `contactEnquirySchema` lives in `lib/contact.ts`
and is used by both React Hook Form in the browser and the Server Action on the
server. The client pass is a convenience for the visitor; the server re-parses
because a crafted request bypasses the browser entirely.

**The form actually submits — and says so honestly.** The reference posts to
`action="#!"` and silently discards everything typed into it. Here the Server
Action forwards to `CONTACT_WEBHOOK_URL` (a mail relay, a CRM endpoint, a Slack
webhook — whatever you point it at). **If that variable is unset, the form
reports failure and directs the visitor to `altibix360@gmail.com`** rather than
showing a success message for a message nobody received.

> **To make it live:** set `CONTACT_WEBHOOK_URL` in your environment. Until then
> the form validates fully and then tells the visitor to email instead — which
> is still strictly better than the reference's silent discard.

**Attachments transmit a filename, not a file.** The input accepts, type-checks,
and size-checks a document (PDF / Word / PNG / JPEG, ≤5 MB) and shows the chosen
filename in the chip. Only the name is sent, because there is no storage bucket
configured. Silently dropping a file the visitor believes they attached would be
worse than the current behaviour.

**The floating label is CSS, not state.** Each control keeps `placeholder=" "`
so `peer-[:not(:placeholder-shown)]` drives the label, exactly as the
reference's `:valid + label` does. No re-render per keystroke.

**Counters announce their result, not their journey.** The ticking digits are
`aria-hidden`; an `sr-only` sibling carries "30+" and "100%". Without that, a
screen reader would read every intermediate number. The card also renders `0`
before the counter runs, so its height never changes.

**Native `<select>` instead of Nice Select.** The reference loads jQuery Nice
Select to restyle one dropdown. A native select styled with `appearance-none`
looks the same, keeps platform keyboard behaviour, and drops a dependency.

---

## 4. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | clean |
| `eslint --max-warnings 0` | clean |
| `next build` | clean, **zero warnings** |
| `prettier --check` | clean |
| Home route | 7.81 → **15.2 kB**; First Load JS 172 → **202 kB** |
| Sections | **9** |
| Form controls | 4 `<input>`, 1 `<select>`, 1 `<textarea>`, 4 `<label>` |
| Service options | "Select Service*", "AI - marketing", "AI consulting", "AI chatbot virtual" |
| Counters | both labels present, rendering `0` pre-scroll |
| Compiled CSS | `bg-contact-stage`, `bg-contact-noise`, `bg-field` (`#2b3d66`), `border-field-chip` (`#3b4d77`) — all correct |

**Accessibility fix applied during review:** the file input's `aria-describedby`
pointed only at its hint, so a screen-reader user hearing a rejected file was
told the rules but not *why* their file failed. It now references the error
message too.

---

## 5. Known improvements

1. **First Load JS jumped 30 kB.** React Hook Form + the Zod resolver + CountUp
   all land in the client bundle for a form most visitors never reach. Wrapping
   `ContactForm` in `next/dynamic` with a skeleton would defer that cost to the
   moment the section scrolls into view.
2. **No spam protection.** A public endpoint that forwards to a webhook will be
   found by bots. A honeypot field plus rate limiting on the action is the
   minimum before this goes live; a CAPTCHA if abuse persists.
3. **Attachment upload is not wired.** See above — needs a storage bucket and a
   presigned-upload step.
4. **`react-countup` restarts on remount.** `triggerOnce` prevents re-runs on
   scroll, but a fast-refresh in dev will replay it. Harmless in production.
5. **Service list is hard-coded to three options.** The mega-menu advertises
   nine. Worth reconciling with whoever owns the enquiry routing.

---

## 6. Still not built

Testimonials · Footer.

Reminder for the next phase: the reference's testimonial avatars
(`avatar/img01.jpg`, `avatar/img02.jpg`) **404 on the live site** — substitutes
will be needed. Testimonial names captured so far: Thoufeek. H, Anjana AS,
Hyfa Muhammed Sha, Mymoona.
