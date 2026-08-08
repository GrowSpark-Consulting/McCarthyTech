# 🔍 Complete Website Analysis Report: altibixcodelab.com

> **NOTE:** This report contains every technical and design detail needed to replicate the website from scratch.

---

## 1. Tech Stack & Framework

| Layer | Technology | Evidence |
|-------|-----------|----------|
| **Frontend Framework** | **Next.js (App Router + Turbopack)** | `/_next/static/chunks/turbopack-*.js` scripts in `<head>`, React-style hydration markers (`<!--$--><!--/$-->`), `charSet` JSX attribute |
| **React** | React 18+ (Server Components) | `<div hidden=""><!--$--><!--/$--></div>` hydration boundary |
| **Bundler** | **Turbopack** (Next.js native) | `turbopack-3n8qeox6k9q31.js` chunk loaded |
| **CSS Framework** | **Bootstrap 5** (grid/utilities) | `bootstrap.min.css` loaded, class names: `container`, `row`, `col-lg-*`, `col-xl-*`, `col-md-*`, `p-0`, `mt-30`, `mb-0`, `text-center`, `d-inline`, `d-lg-none` |
| **Custom CSS** | BEM-style custom stylesheet | `main.css?v=13` — primary stylesheet with BEM naming (`xb-item--title`, `xb-item--icon`, `xb-border`, `xb-mouseenter`) |
| **Language** | HTML5 + JavaScript (ES6+) | `<html lang="en">`, semantic HTML5 elements |
| **Routing** | Next.js file-based routing | Clean URLs: `/services`, `/about`, `/team`, `/careers`, `/contact`, `/blog`, `/projects` |
| **Hosting** | Likely Vercel (Next.js default) | Turbopack usage and Next.js conventions suggest Vercel deployment |

---

## 2. CSS Libraries & Stylesheets (Load Order)

All stylesheets are served from `/assets/css/`:

| # | Stylesheet | Purpose |
|---|-----------|---------|
| 1 | `bootstrap.min.css` | Grid system, responsive utilities, spacing classes |
| 2 | `fontawesome.css` | Icon font library (Font Awesome) |
| 3 | `animate.css` | CSS animation library (WOW.js compatible — `fadeInUp`, `zoomIn`) |
| 4 | `swiper.min.css` | Swiper.js carousel/slider styles |
| 5 | `odometer.css` | Animated number counter (odometer effect for stats) |
| 6 | `mousecursor.css` | Custom mouse cursor effects |
| 7 | `nice-select.css` | jQuery Nice Select dropdown styling |
| 8 | `custom-fonts.css` | Custom @font-face declarations (custom typography) |
| 9 | `magnific-popup.css` | Lightbox/popup gallery styles |
| 10 | `jquery-ui.css` | jQuery UI component styles |
| 11 | `main.css?v=13` | **Primary custom stylesheet** — all site-specific styles, BEM naming |
| 12 | Inline `<style>` block | Glassmorphic nav, hero video, scroll cue, mobile fixes |

---

## 3. JavaScript Libraries

| Library | Purpose | Evidence |
|---------|---------|----------|
| **Next.js Runtime** | SSR/SSG, routing, hydration | `/_next/static/chunks/*.js` files |
| **jQuery** | DOM manipulation, plugin dependency | Required by nice-select, jQuery UI |
| **jQuery UI** | UI interactions (sliders, accordions) | `jquery-ui.css` loaded |
| **Swiper.js** | Touch-enabled carousels/sliders | `swiper.min.css`, testimonials & industries carousel |
| **WOW.js / Animate.css** | Scroll-triggered animations | `animate.css` + `data-wow-delay`, `data-wow-duration` attributes, class `wow fadeInUp`, `wow zoomIn` |
| **Odometer.js** | Animated number counters | `odometer.css`, stats section (30+, 100%) |
| **Nice Select** | Custom styled `<select>` dropdowns | `nice-select.css`, contact form dropdown |
| **Magnific Popup** | Lightbox/image popup gallery | `magnific-popup.css` loaded |
| **Custom Mouse Cursor** | Custom cursor animation | `mousecursor.css` loaded |

---

## 4. Typography & Fonts

| Property | Detail |
|----------|--------|
| **Font Source** | Custom fonts via `custom-fonts.css` (self-hosted @font-face) |
| **Heading Font** | Premium serif/display font (used in large headings like "Tailored for every industry", "Comprehensive Digital Solutions") — likely **Playfair Display** or a custom serif |
| **Body Font** | Clean modern sans-serif — appears similar to **Inter**, **Plus Jakarta Sans**, or **DM Sans** |
| **Icon Font** | **Font Awesome** (loaded via `fontawesome.css`) — classes like `far fa-search` |
| **Text Colors** | White (`#ffffff`), Light gray (`#b1b1b1`), Cyan/teal accents |
| **Heading Style** | Large, editorial-style with mixed serif/sans-serif, inline animated GIF decorations |

> **IMPORTANT:** The exact font names are defined in `/assets/css/custom-fonts.css` — this file contains `@font-face` declarations with self-hosted font files. The heading font has a distinctive calligraphic/serif style.

---

## 5. Color Palette

| Role | Color | Hex/RGBA |
|------|-------|----------|
| **Primary Background** | Very dark navy/charcoal | `rgba(10, 11, 20)` / `#0a0b14` |
| **Secondary Background** | Dark blue-gray | `rgba(17, 18, 29)` / `#11121d` |
| **Primary Accent** | **Lime/Chartreuse Green** | `#c8ff00` / `#d4ff00` (neon yellow-green) |
| **Secondary Accent** | **Cyan/Teal Gradient** | Gradient from `#00b4d8` → `#00f5a0` (blue to mint) |
| **Text Primary** | White | `#ffffff` |
| **Text Secondary** | Light gray | `#b1b1b1` |
| **Border/Divider** | Subtle white alpha | `rgba(255, 255, 255, 0.12)` |
| **Glassmorphism BG** | Frosted dark | `rgba(17, 18, 29, 0.28)` with `blur(18px)` |
| **Card Background** | Dark with subtle borders | Semi-transparent dark with `1px solid rgba(255,255,255,0.08)` |
| **CTA Button** | Lime green with dark text | Bright chartreuse `#c8ff00` |
| **Footer Email Pill** | Cyan-to-teal gradient | Blue-to-green gradient capsule |

---

## 6. Design Patterns & Effects

### Glassmorphism
- **Navigation header**: `background: rgba(17, 18, 29, 0.28)` + `backdrop-filter: blur(18px) saturate(150%)` + `border: 1px solid rgba(255, 255, 255, 0.12)` + `border-radius: 60px`
- **Sticky header**: Additional frosted glass effect on scroll

### Animations
- **WOW.js + Animate.css**: `fadeInUp`, `zoomIn` with staggered delays (`100ms`, `200ms`, `300ms`)
- **Custom scroll cue**: CSS keyframe animation `heroScroll` — a line moving top-to-bottom infinitely
- **Scale animations**: `.scale-animation` class on hero text
- **Odometer counters**: Animated number counting (30+, 100%)
- **Hover effects**: Service items expand on hover with video previews
- **Custom cursor**: Mouse cursor animation via `mousecursor.css`

### Layout Patterns
- **Full-viewport video hero**: `min-height: 100vh` with `object-fit: cover` video background
- **Video overlay**: Multi-layer gradient overlay over hero video
- **Accordion-style services**: Expandable service items with vertical text labels
- **Feature grid**: 3-column layout with center featured image (cyan/green gradient sphere)
- **Mega menu navigation**: Full-width dropdown with icon-boxes in a 3x3 grid

---

## 7. Complete Image & Media Asset Inventory

### Logo
| Asset | Path | Type |
|-------|------|------|
| Altibix Logo | `/assets/img/logo/altibix-logos/altibix log.png` | PNG |
| Logo Light Variant | `/assets/img/logo/logo-2-light.png` | PNG |
| Favicon | `/assets/img/logo/altibix-logos/favicon.png` | PNG |

### Hero Section
| Asset | Path | Type |
|-------|------|------|
| Hero Background | `/assets/img/bg/hero_bg.png` | PNG (video poster) |
| Hero Video | `/assets/img/video/development.mp4` | MP4 (auto-playing) |

### Animated GIF Decorations (inline in headings)
| Asset | Path | Type |
|-------|------|------|
| GIF Icon 1 | `/assets/img/icon/original-66948a0d81d.gif` | GIF |
| GIF Icon 2 | `/assets/img/icon/0deec720000b2066289b.gif` | GIF |
| GIF Icon 3 | `/assets/img/icon/b10c3e43e836d32554bf.gif` | GIF |
| Diamond Icon | `/assets/img/icon/diamond-icon02.gif` | GIF |
| Animated GIF 3 | `/assets/img/icon/animated-gif03.gif` | GIF |

### Service Section Videos
| Service | Path | Type |
|---------|------|------|
| App Development | `/assets/img/video/app-developoment.mp4` | MP4 |
| Web Development | `/assets/img/video/web-dev.mp4` | MP4 |
| UI/UX Design | `/assets/img/video/ui-ux.mp4` | MP4 |
| AI Implementation | `/assets/img/video/ai-implementation.mp4` | MP4 |
| Branding | `/assets/img/video/branding-new.mp4` | MP4 |
| Digital Marketing | `/assets/img/video-assets/digital-marketing.mp4` | MP4 |
| Custom Software | `/assets/img/video/custom-software.mp4` | MP4 |
| AI Main (menu) | `/assets/img/video-assets/ai-main.mp4` | MP4 |

### SVG Icons
| Icon | Path |
|------|------|
| Arrow (black) | `/assets/img/icon/rotate-arrow-black.svg` |
| Arrow (black 02) | `/assets/img/icon/rotate-arrow-black02.svg` |
| Menu Icon m_01 | `/assets/img/icon/m_01.svg` |
| Menu Icon m_02 | `/assets/img/icon/m_02.svg` |
| Menu Icon m_03 | `/assets/img/icon/m_03.svg` |
| Menu Icon m_04 | `/assets/img/icon/m_04.svg` |
| Menu Icon m_05 | `/assets/img/icon/m_05.svg` |
| Service Icon 01 | `/assets/img/icon/service-icon01.svg` |
| Service Icon 02 | `/assets/img/icon/service-icon02.svg` |
| Service Icon 03 | `/assets/img/icon/service-icon03.svg` |
| Service Icon 04 | `/assets/img/icon/service-icon04.svg` |
| Service Icon 05 | `/assets/img/icon/service-icon05.svg` |
| Service Icon 06 | `/assets/img/icon/service-icon06.svg` |
| Service Icon 07 | `/assets/img/icon/service-icon07.svg` |
| Feature Icon 01 | `/assets/img/icon/fea-small-icon01.svg` |
| Feature Icon 02 | `/assets/img/icon/fea-small-icon02.svg` |
| Feature Icon 03 | `/assets/img/icon/fea-small-icon03.svg` |
| Feature Icon 04 | `/assets/img/icon/fea-small-icon04.svg` |
| Feature Icon 05 | `/assets/img/icon/fea-small-icon05.svg` |
| Feature Icon 06 | `/assets/img/icon/fea-small-icon06.svg` |
| User Icon | `/assets/img/icon/user-balck-icon.svg` |
| SMS Icon | `/assets/img/icon/sms-balck-icon.svg` |
| Call Icon | `/assets/img/icon/call-icon.svg` |
| Call Icon 02 | `/assets/img/icon/call-icon02.svg` |
| Upload Icon | `/assets/img/icon/upload-icon.svg` |
| List Icon | `/assets/img/icon/list-icon.svg` |
| Messages Icon | `/assets/img/icon/messages-icon.svg` |
| Email Icon | `/assets/img/icon/email-icon.svg` |
| Location Icon | `/assets/img/icon/location-icon.svg` |

### Inline SVG Icons
- **Arrow button icon**: Custom diagonal arrow made of rotated SVG `<rect>` elements (used in all CTA buttons)
- **Hamburger menu icon**: SVG with 3 horizontal lines

### Background & Shape Images
| Asset | Path | Type |
|-------|------|------|
| Service BG | `/assets/img/bg/service-bg.png` | PNG |
| Features Gradient BG | `/assets/img/bg/features-gradient-bg.png` | PNG |
| Industry Shape | `/assets/img/shape/indus-shape.png` | PNG |
| Contact Shape 01 | `/assets/img/shape/contact-shape01.png` | PNG |
| Contact Shape 02 | `/assets/img/shape/contact-shape02.png` | PNG |
| Industries Gradient | `/assets/img/industries/gradient.png` | PNG |
| Industries Gradient 02 | `/assets/img/industries/gradient02.png` | PNG |
| Industries Logo | `/assets/img/industries/indus-logo.png` | PNG |

### Client/Brand Logos
| Brand | Path |
|-------|------|
| Client 6 (Tysense) | `/assets/img/brand/client6.png` |
| Client 22 White (TVS) | `/assets/img/brand/client22white.png` |
| Mahindra | `/assets/img/brand/MAHINDRA.png` |
| Panda | `/assets/img/brand/panda logo.png` |
| Logo 06 (Cambridge) | `/assets/img/brand/logo06.png` |

### Avatar/People Images
| Asset | Path |
|-------|------|
| Avatar 01 | `/assets/img/avatar/img01.jpg` |
| Avatar 02 | `/assets/img/avatar/img02.jpg` |

### Feature Images
| Asset | Path |
|-------|------|
| Feature Image 01 | `/assets/img/feature/feature-img01.png` |

---

## 8. Page Structure & Sections (Homepage)

```
+---------------------------------------------------+
|  HEADER (Glassmorphic, sticky, border-radius:60px) |
|  Logo | Home | Services | About | Team |           |
|  Careers | Contact | [JOIN NOW] (lime btn)          |
+---------------------------------------------------+
|  HERO SECTION (full-viewport video background)     |
|  - Auto-playing MP4 video (development.mp4)        |
|  - Gradient overlay (multi-layer)                   |
|  - H2: "Empowering Businesses Through              |
|    Innovative Technology Solutions"                 |
|  - P: "Premium IT solutions from Kerala..."        |
|  - CTA: [Start Your Project] (lime btn)            |
|  - Scroll Cue (animated line + "SCROLL" text)      |
+---------------------------------------------------+
|  ABOUT SECTION                                      |
|  - Subtitle: "About Us"                             |
|  - H2 with inline animated GIF decorations          |
|    "Bridging the gap between [gif] visionary        |
|    ideas and [gif] functional technology..."        |
|  - Description paragraph                            |
+---------------------------------------------------+
|  SERVICES SECTION                                   |
|  - H2: "Comprehensive Digital Solutions"            |
|  - CTA: [VIEW MORE SERVICES] (lime btn)            |
|  - Subtitle: "Our Expertise"                        |
|  - Accordion-style service items (7 total):         |
|    1. App Development (video hover)                 |
|    2. Web Development (video hover)                 |
|    3. UI/UX Design (video hover)                    |
|    4. AI Implementation (video hover)               |
|    5. Branding (video hover)                        |
|    6. Digital Marketing (video hover)               |
|    7. Custom Software (video hover)                 |
+---------------------------------------------------+
|  FEATURES SECTION ("Why businesses choose us")     |
|  - Left column (3 items, right-aligned):            |
|    Global Footprint | Kerala Roots | Client-        |
|    Centric Approach                                 |
|  - Center: Feature image (gradient sphere/shape)    |
|  - Right column (3 items, left-aligned):            |
|    Expert Team | Full-Stack Innovation |             |
|    End-to-End Support                               |
+---------------------------------------------------+
|  CLIENT LOGOS MARQUEE                               |
|  "World's Best 30+ Companies Work With Us"          |
|  TYSENSE | TVS | Hero | Mahindra | Panda |          |
|  Cambridge | Multy                                  |
+---------------------------------------------------+
|  INDUSTRIES SECTION                                 |
|  - H2: "Tailored for every industry"               |
|  - CTA: [VIEW MORE PROJECTS]                       |
|  - Industry cards with numbered pagination:         |
|    Healthcare | E-commerce | Logistics |             |
|    Marketing | Finance | Manufacturing |             |
|    Education                                        |
+---------------------------------------------------+
|  CONTACT/CTA SECTION                               |
|  - Left: Stats card (gradient blue-to-green)        |
|    30+ Projects | 100% Satisfaction                 |
|  - Right: Contact form                              |
|    Name | Email | Phone | Service dropdown |         |
|    Message | [SUBMIT HERE] (lime btn)               |
+---------------------------------------------------+
|  TESTIMONIALS SECTION                               |
|  - "Hear from our happy customers"                  |
|  - Swiper carousel with customer reviews            |
|    (Anjana AS, Hyfa, Mymoona, Thoufeek)             |
+---------------------------------------------------+
|  FOOTER                                             |
|  - Large "ALTIBIX" watermark text in background     |
|  - Email pill: altibix360@gmail.com (gradient)      |
|  - Footer nav columns:                              |
|    Services | About Us | Contact Us |                |
|    Our Project | Blog                               |
|  - Social links bar:                                |
|    LinkedIn | Instagram | Google                     |
|  - Bottom bar:                                       |
|    Location: Nilamel, Kerala, India                  |
|    Copyright 2025 Altibix Codelab Pvt. Ltd.         |
|    Phone: +91 7306 339 274                           |
+---------------------------------------------------+
```

---

## 9. Navigation & Mega Menu Structure

### Desktop Navigation
- **Style**: Glassmorphic pill-shaped header with `border-radius: 60px`
- **Items**: Home | Services (mega dropdown) | About Us | Team | Careers | Contact Us
- **CTA**: "JOIN NOW" button in lime green

### Services Mega Menu (3x3 grid + sidebar)
| Service | Link | Icon |
|---------|------|------|
| App Development | `/services/app-development` | `m_01.svg` |
| Web Development | `/services/web-development` | `m_02.svg` |
| UI/UX Design | `/services/ui-ux-design` | `m_03.svg` |
| Branding | `/services/branding` | `m_05.svg` |
| Digital Marketing | `/services/digital-marketing` | `service-icon05.svg` |
| AI Implementation | `/services/ai-implementation` | `service-icon01.svg` |
| AI Chatbot | `/services/ai-chatbot` | `service-icon03.svg` |
| AI Marketing | `/services/ai-marketing` | `service-icon02.svg` |
| View All Services | `/services` | `m_04.svg` |

**Sidebar**: Video preview (`ai-main.mp4`) + "Looking for custom AI solutions?" + CTA button

### Mobile Navigation
- Hamburger menu (3-line SVG icon)
- Side drawer with search bar
- Additional items: Blog, Projects

---

## 10. SEO & Meta Tags

| Meta | Content |
|------|---------|
| **Title** | Altibix Codelab \| Premium IT Solutions |
| **Description** | Altibix Codelab offers premium IT solutions, AI implementation, and full-stack development. Bridging the gap between visionary ideas and functional technology. |
| **Charset** | UTF-8 |
| **Viewport** | width=device-width, initial-scale=1 |
| **IE Compat** | ie=edge |
| **Favicon** | `/favicon.ico` (256x256) + `/assets/img/logo/altibix-logos/favicon.png` |
| **Language** | English (`lang="en"`) |

### Other Page Titles
- Projects: "Our Projects — Altibix Codelab Portfolio"
- Contact: "Contact Altibix Codelab"

---

## 11. Contact Information

| Detail | Value |
|--------|-------|
| **Email** | altibix360@gmail.com |
| **Phone** | +91 7306 339 274 |
| **Location** | Nilamel, Kerala, India |
| **LinkedIn** | https://www.linkedin.com/company/altibix-codelab-pvt-ltd |
| **Instagram** | https://www.instagram.com/altibix/ |
| **Google** | https://share.google/zZw0x8Q0XfgnaXSFq |
| **Copyright** | Copyright 2025 Altibix Codelab Pvt. Ltd., All rights reserved. |

---

## 12. Key CSS Techniques (from inline styles)

### Glassmorphic Navigation
```css
background: rgba(17, 18, 29, 0.28);
backdrop-filter: blur(18px) saturate(150%);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 60px;
box-shadow: 0 10px 40px rgba(6, 8, 24, 0.28);
```

### Hero Video Overlay (Multi-layer gradient)
```css
background:
  linear-gradient(180deg, rgba(10,11,20,0.55) 0%, rgba(10,11,20,0.12) 32%, rgba(10,11,20,0.78) 100%),
  radial-gradient(130% 95% at 12% 100%, rgba(10,11,20,0.85) 0%, rgba(10,11,20,0) 58%);
```

### Scroll Cue Animation
```css
@keyframes heroScroll {
  0% { top: -50%; }
  75%, 100% { top: 100%; }
}
/* 2s infinite cubic-bezier(0.76, 0, 0.24, 1) */
```

### Sticky Header Frost Effect
```css
#xb-header-area .xb-header-area-sticky {
    background-color: rgba(17, 18, 29, 0.6) !important;
    backdrop-filter: blur(18px) saturate(150%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 13. Site Pages & Routes

| Page | URL |
|------|-----|
| Home | `/` |
| Services | `/services` |
| App Development | `/services/app-development` |
| Web Development | `/services/web-development` |
| UI/UX Design | `/services/ui-ux-design` |
| AI Implementation | `/services/ai-implementation` |
| AI Chatbot | `/services/ai-chatbot` |
| AI Marketing | `/services/ai-marketing` |
| Branding | `/services/branding` |
| Digital Marketing | `/services/digital-marketing` |
| About Us | `/about` |
| Team | `/team` |
| Careers | `/careers` |
| Contact Us | `/contact` |
| Projects | `/projects` |
| Blog | `/blog` |

---

## 14. Summary for Replication

To replicate this site, you need:

1. **Next.js 14+** with App Router and Turbopack
2. **Bootstrap 5** for grid and responsive utilities
3. **Custom CSS** with BEM naming convention (main.css)
4. **Swiper.js** for carousels (testimonials, industries)
5. **WOW.js + Animate.css** for scroll-triggered animations
6. **Odometer.js** for animated number counters
7. **Nice Select** for custom dropdowns
8. **Magnific Popup** for lightboxes
9. **Custom fonts** (serif display + modern sans-serif body)
10. **Glassmorphism** technique for navigation
11. **Auto-playing video backgrounds** in hero and service hover previews
12. **Inline animated GIFs** as heading decorations
13. **Custom SVG arrow icons** in all CTA buttons
14. **Dark theme** with lime green accent (`#c8ff00`) and cyan-teal gradients
15. **Font Awesome** for utility icons
