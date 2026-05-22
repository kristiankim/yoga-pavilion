# Handoff: Yoga Pavilion with Pilates — Full Website

## Overview
A polished, single-page marketing and booking website for **Yoga Pavilion with Pilates**, a Pilates and yoga studio at 2020 Central Rd, 2nd Floor, Fort Lee, NJ 07024. The site's primary goal is converting visitors into booked class participants, with a secondary goal of membership retention.

---

## About the Design Files
The files in this bundle are **high-fidelity design references created in HTML/CSS/JSX** — they are working prototypes showing the intended look, layout, copy, and interactive behavior. They are **not** production code to copy directly.

The task is to **recreate these designs in the target codebase's environment** — React + Next.js (or similar) using its established component patterns, routing, and libraries. Apply the design tokens (colors, type, spacing) exactly as documented below, but use your codebase's native patterns for state, routing, and API integration.

---

## Fidelity
**High-fidelity.** Colors, typography, spacing, interactions, and copy are all final (or close to final — studio photography and WellnessLiving booking URLs are still placeholders). Recreate the UI pixel-precisely using the design tokens in this document.

---

## Page Structure (Single Page, Anchor Navigation)

The site is one scrollable HTML page with seven anchored sections. Navigation links scroll to `#about`, `#classes`, `#schedule`, `#pricing`, `#instructors`, `#contact`.

```
<header>  Sticky topbar
<main>
  .hero-wrap         Hero (video/image background + headline + stats)
  #about             Studio intro (2-col: photo left, content right)
  #classes           Class cards mosaic grid
  #schedule          Dark-band weekly schedule with filter chips
  #pricing           4-tier pricing cards
  #instructors       5-card instructor grid
  #book              Intro offer / email capture (warm clay band)
  FAQ                Accordion
  #contact           Contact card + map
<footer>             Large editorial footer
```

---

## Design Tokens

### Colors (CSS custom properties)
```css
--bg:           #efe9dd   /* Page background — warm cream */
--bg-soft:      #e7dfd0   /* Subtle surface */
--bg-deep:      #1f2a22   /* Dark sections (schedule, footer) */
--ink:          #1f2a22   /* Primary text */
--ink-soft:     #3b4a3f   /* Secondary text */
--ink-muted:    #6c7568   /* Tertiary / labels */
--line:         #cdc2ad   /* Borders / dividers */
--accent:       #6e7a5a   /* Sage green accent */
--accent-deep:  #4b5640   /* Deep sage (hover states) */
--warm:         #b88863   /* Warm terracotta — CTAs, highlights */
--paper:        #f6f1e7   /* Light text on dark backgrounds */
```

Four palette variants exist (Sage default, Forest, Charcoal, Clay) — all defined as `[data-palette="x"]` overrides on `<body>` in `styles.css`.

### Typography
```
Serif:   Instrument Serif (Google Fonts) — headings, quotes, display
Sans:    DM Sans (Google Fonts) — body, UI, labels
Mono:    JetBrains Mono (Google Fonts) — timestamps, index numbers
```

**Type scale (CSS clamp):**
```css
--display: clamp(44px, 7.5vw, 128px)   /* Hero headline */
--h1:      clamp(44px, 7vw, 96px)
--h2:      clamp(34px, 4.6vw, 64px)    /* Section headings */
--h3:      clamp(24px, 2.4vw, 32px)    /* Card titles */
--eyebrow: 11px / 500 / 0.16em / uppercase
```

### Spacing
```css
--gutter:    clamp(20px, 4vw, 64px)      /* Horizontal page padding */
--section-y: clamp(72px, 10vw, 144px)   /* Vertical section padding */
```

### Other tokens
```
Border radius:  4px (cards), 6px (pricing cards), 999px (pills/buttons)
Max content width: 1440px
```

---

## Sections — Detailed Spec

### 1. Topbar (sticky, `position: fixed`)
- Height: ~60px
- Background: `color-mix(in oklab, --bg, transparent 12%)` + `backdrop-filter: blur(14px)`
- Border-bottom: `1px solid` at 8% ink opacity
- **Left:** Brand mark (28px filled circle with inner ring) + "Yoga Pavilion" in Instrument Serif 22px
- **Center:** Nav links — About · Classes · Schedule · Pricing · Instructors · Contact (14px DM Sans, hide at ≤1024px)
- **Right:** "View schedule" ghost pill button + "Book a class →" filled pill button
- Buttons: `border-radius: 999px`, padding `10px 16px`, font-size 13px

### 2. Hero
**Background layer (`.hero-wrap`):**
- Full-bleed image: `uploads/pilates_studio.png`, `background-size: cover`, `background-position: center 30%`
- Overlay gradient: cream `rgba(239,233,221)` from 42% opacity at top → 100% at bottom (approx 62% height)
- On scroll: fade out the background layer opacity as user scrolls past the first 55% of hero height

**Content (`.hero.container`):**
- Eyebrow row (border-bottom): left "Yoga Pavilion · est. 2025 · Fort Lee, NJ" / right "Modern & classical pilates — bilingual instruction" — both in 11px uppercase tracked caps, `--ink-muted`
- H1 (Instrument Serif, `--display` size, line-height 0.88): "A quiet place / to *move*, breathe, / and become." — italic on "move,"
- Below h1: 2-col grid — left: lead paragraph (18–22px, `--ink-soft`); right: "View schedule" + "Book a class →" pill buttons
- **Image grid** (below text): 3 cols `2.2fr 1fr 1fr` × 540px tall — left big slot, right two stacked. Use `<image-slot>` components or `<img>` tags; drag-and-drop replaceable.
- **Marquee strip** (border top/bottom, 22px padding): infinite-scroll serif text "Mat Pilates · Reformer · Vinyasa Yoga · Prenatal & Postnatal · Private 1:1 · TRIO 1:3" with warm dot separators. Font: Instrument Serif clamp(28px → 44px). Animation: `translateX` loop 36s.
- **Stats strip** (4-col grid, `gap: 1px`, `background: --line`):
  - 4.8★ ClassPass rating · 18 reviews
  - 5 Certified instructors
  - 600+ Classical Pilates training hours
  - 3 Languages spoken
  - Stat numbers: Instrument Serif clamp(40px → 64px); labels: 13px `--ink-muted`

### 3. About (`#about`)
Two-column grid (`1fr 1fr`, gap clamp 40–80px, `align-items: start`):

**Left column:**
- Eyebrow index "— 01 / Studio" (11px mono, `--ink-muted`)
- H2: "Welcome to *Pavilion Pilates.*" (Instrument Serif italic on "Pavilion Pilates.")
- Studio photo below (aspect-ratio 4/5, border-radius 4px) — `uploads/pilates_studio.png` placeholder; use image-slot

**Right column:**
- "OUR STORY" label (11px uppercase, `--warm`)
- 3 paragraphs in 16px `--ink-soft`, line-height 1.65
- "WHAT MAKES US DIFFERENT" label
- 7-item ruled list: `border-top/bottom: 1px solid --line` per item, 6px warm dot marker, 15px body text, padding 14px 0
- Joseph Pilates quote at bottom: Instrument Serif italic clamp(32–56px), with `— Joseph Pilates` attribution in 13px uppercase `--ink-muted`

### 4. Classes (`#classes`) — `— 02 / Practice`
12-column CSS grid, `gap: 14px`. Each card: `position: relative`, `border-radius: 4px`, flex column, photo as `background-image` or absolutely-positioned element, `z-index: -2`. Gradient overlay: `linear-gradient(180deg, transparent 30%, rgba(20,25,18,0.7) 100%)`.

| Card | Columns | Aspect ratio | Photo | Tag |
|------|---------|-------------|-------|-----|
| TRIO 1:3 Premium Pilates | 7 | 3/4 | `uploads/Trio_1-3.webp` | Signature |
| Private 1:1 Pilates & Yoga | 5 | 3/4 | `uploads/Private_1-1.webp` | Private |
| Slow Flow Vinyasa | 4 | 1/1.1 | gradient placeholder | Yoga |
| Mama Movement | 4 | 1/1.1 | gradient placeholder | Pre & Postnatal |
| Classical Reformer | 4 | 1/1.1 | gradient placeholder | Pilates |
| Grounded Vinyasa & Breath | 8 | 16/10 | gradient placeholder | Yoga |
| Apparatus Lab | 12 | 21/9 | gradient placeholder | Workshop |

Cards with real photos use stronger gradient: `rgba(20,25,18,0.12) → 0.55 → 0.88`.

Each card has: tag pill (top-left, 11px, cream bg), level label (top-right, mono 11px, cream), h3 title (Instrument Serif clamp 26–34px, cream), meta row (duration · format · price, 13px, cream 78% opacity).

On mobile (≤880px): all cards span 12 columns, aspect-ratio 4/3.

### 5. Schedule (`#schedule`) — `— 03 / This week`
Dark band: `background: --bg-deep`, `color: --paper`, border-radius 4px, inner container padding clamp(20–56px).

**Filter chips row:** 7 chips — All · Yoga · Pilates · Beginner-friendly · Pre/Postnatal · Morning · Evening. Pill shape, `border: 1px solid rgba(paper, 0.18)`, active state: `background: --paper; color: --ink`.

**Schedule grid:** 2-col `80px 1fr`. Left: day label (mono 12px date number in Instrument Serif 28px). Right: class rows.

Each class row (`display: grid`, `grid-template-columns: 90px 1.6fr 1.2fr 0.6fr auto`, `gap: 24px`):
- Time (mono 14px)
- Class name (Instrument Serif 20px) + pillar sub-label (sans 11px uppercase, 45% opacity)
- Teacher name (14px, 70% opacity)
- Level (12px, 55% opacity)
- Reserve/Waitlist button (12px pill, `background: --paper`, `color: --ink`, hover: `background: --warm`)

**Mobile (≤880px):** Single-row grid `64px 1fr auto auto` — time | name | teacher | CTA all on one line. Hide level and pillar sub-label.

**Booking drawer** (slides in from right, `width: min(480px, 100vw)`):
- Step 1: Class detail (photo, date/time, instructor chip, price box, description, special instructions, "Reserve my spot" CTA bar)
- Step 2: Sign in (email + password fields, Google SSO button, "powered by WellnessLiving")
- Step 3: Confirmation (checkmark circle, booking summary card, Done button)
- Overlay darkens page to `rgba(20,25,18,0.42)`
- Transition: `translateX(100%) → 0`, 420ms `cubic-bezier(0.32, 0, 0.08, 1)`

### 6. Pricing (`#pricing`) — `— 04 / Pricing`
4-col grid (2-col on ≤1000px, 1-col on ≤560px), `gap: 14px`.

| Plan | Price | Featured |
|------|-------|---------|
| Single class (drop-in) | $55/class | No |
| Intro offer (new client) | $50/first class | **Yes** (dark bg) |
| 5-class credits pack | $250/pack | No |
| Unlimited monthly | $320/month | No |

Card spec: `border: 1px solid --line`, `border-radius: 6px`, padding 28px 26px, min-height 380px. Featured card: `background: --ink; color: --paper`. Price number: Instrument Serif 56px. CTA pill: full-width border pill, hover fills.

### 7. Instructors (`#instructors`) — `— 05 / Team`
5-col grid (3-col ≤1100px, 2-col ≤700px, 1-col ≤480px), `gap: 14px`.

| Name | Role | Languages | Photo |
|------|------|-----------|-------|
| Scarlett | Yoga & Pilates · Pre/Postnatal | EN · 中文 | `uploads/Team_Scarlette.webp` |
| Sydney | Pilates · Balanced Body | EN · 中文 | `uploads/Team_Sydney.webp` |
| Julia | Yoga & Pilates · Vinyasa | EN | `uploads/Team_Julia.webp` |
| Cindy | Pilates · Classical | EN · 中文 | `uploads/Team_Cindy.webp` |
| Judy | Pilates · Romana lineage | EN · 한국어 | `uploads/Team_Judy.webp` |

Card: photo (aspect-ratio 3/4, border-radius 4px, `object-fit: cover; object-position: center top`), language badge (absolute bottom-left, mono 10px, blurred dark pill), index number (absolute top-right, 10px), name (Instrument Serif 26px), role (13px `--ink-muted`), bio (13.5px `--ink-soft`).

### 8. Intro Offer / Email Capture (`#book`)
2-col grid `1.4fr 1fr` (`background: --warm`, padding clamp 40–80px, border-radius 4px). Left: eyebrow + H2 italic + subtext. Right: email form — pill container (`background: --paper`), text input + submit button inside. Fine print: 11px, 75% opacity.

### 9. FAQ Accordion
`<details>/<summary>` pattern. Border-top on container. Each item has border-bottom. Summary: Instrument Serif clamp(20–26px), `+` icon in 32px circle that rotates 45° when open. Answer: 15px `--ink-soft`, max-width 70ch.

6 entries:
1. What to bring to first class
2. Is TRIO right for beginners?
3. Prenatal/postnatal sessions
4. Cancellation policy
5. Parking
6. Languages other than English

### 10. Contact (`#contact`) — `— 07 / Visit`
2-col grid `1.1fr 1fr`, `gap: clamp(24–60px)`.

**Left — contact card** (`background: --ink; color: --paper`, padding clamp 36–64px):
- H3: "Yoga Pavilion / with Pilates." (Instrument Serif clamp 36–64px)
- DL rows (4): Address · Phone · Email · Hours — each `grid-template-columns: 96px 1fr`
- CTA: "Get directions →" pill (`background: --paper`, hover: `--warm`)

**Right — map:** SVG street map of Fort Lee NJ (Central Rd, Lemoine Ave, Anderson Ave, Constitution Park) with animated pulsing pin (`box-shadow` keyframe animation) and label pill.

### 11. Footer (`background: --bg-deep; color: --paper`)
- Large display title "Yoga / Pavilion ." (Instrument Serif clamp 72–220px, italic dot in `--warm`)
- 4-col footer grid (`2fr 1fr 1fr 1fr`): Studio info · Practice links · Studio links · Policy links
- Base row: copyright + rating

---

## Interactions & Behavior

### Booking Drawer
- Opens when any `Reserve` or `Waitlist` button is clicked in the schedule
- Dispatches a `CustomEvent('open-booking-drawer', { detail: classData })` on `window`
- Class data includes: `name, pillar, time, day, teacher, level, dur, full (boolean), tags[]`
- 3-step flow: Detail → Sign In → Confirmed
- Body scroll locked while open (`document.body.style.overflow = 'hidden'`)
- Clicking overlay closes drawer
- The sign-in step is a **UI mock** — wire to real WellnessLiving OAuth / API in production

### Schedule Filters
- Filter chips toggle `aria-pressed` attribute
- Active chip: `background: --paper; color: --ink`
- Re-renders the schedule day rows on each filter change
- Days with zero matching classes are hidden entirely

### Hero background fade on scroll
```js
const progress = Math.min(1, Math.max(0, scrolled / (heroHeight * 0.55)));
heroBg.style.opacity = 1 - progress;
```
`scrolled` = how far the hero wrap has moved above viewport top.

### FAQ Accordion
Native `<details>/<summary>` — no JS needed. The `+` icon rotates via `[open] .faq__plus { transform: rotate(45deg) }`.

### Marquee
Pure CSS animation on `.marquee__track`: `animation: marquee 36s linear infinite`. Content is duplicated so the loop is seamless.

---

## State Management

| State | Where | Notes |
|-------|-------|-------|
| Active schedule filter | JS variable `activeFilter` | Re-renders schedule on change |
| Booking drawer open/closed | React state in `BookingDrawer` | Controlled by CustomEvent |
| Drawer step (0/1/2) | React state `step` | 0=detail, 1=signin, 2=confirmed |
| Selected class data | React state `cls` | Set when drawer opens |
| Email / password fields | React state | Local form state only |
| Palette (Tweaks) | `data-palette` on `<body>` | Persisted via EDITMODE-BEGIN block |

---

## WellnessLiving Integration (Placeholder)
The sign-in step in the booking drawer is a UI mock. In production:
- Replace the email/password form with WellnessLiving's embedded widget **or** OAuth redirect
- The "Reserve" / "Waitlist" buttons should deep-link to the specific class in WellnessLiving
- The "Open full WellnessLiving schedule" CTA should link to the business's public schedule URL
- Booking confirmation should come from the WellnessLiving API response

---

## Assets

| File | Usage |
|------|-------|
| `uploads/pilates_studio.png` | Hero background + About section placeholder |
| `uploads/Trio_1-3.webp` | TRIO 1:3 class card |
| `uploads/Private_1-1.webp` | Private 1:1 class card |
| `uploads/Team_Scarlette.webp` | Instructor card — Scarlett |
| `uploads/Team_Sydney.webp` | Instructor card — Sydney |
| `uploads/Team_Julia.webp` | Instructor card — Julia |
| `uploads/Team_Cindy.webp` | Instructor card — Cindy |
| `uploads/Team_Judy.webp` | Instructor card — Judy |

All other class card photos are CSS gradient placeholders — replace with real studio photography.

---

## Files in This Package

| File | Purpose |
|------|---------|
| `index.html` | Complete single-page design reference |
| `styles.css` | All design tokens, layout, and component styles |
| `booking-drawer.jsx` | React/Babel booking drawer component (3-step flow) |
| `image-slot.js` | Drag-and-drop image placeholder web component |
| `uploads/` | All photos and assets used in the design |

---

## Local SEO Notes (for `<head>`)
Target keywords: "yoga Fort Lee", "Pilates Fort Lee", "yoga classes Fort Lee NJ". Include in:
- `<title>`: "Yoga Pavilion with Pilates — Fort Lee, NJ"
- `<meta name="description">`: Fort Lee, Pilates, yoga, prenatal
- Schema.org `LocalBusiness` structured data with address, phone, hours
- Google Analytics 4 tag

---

## Contact Info (for forms and footer)
```
Business name:  Yoga Pavilion with Pilates / Pavilion Pilates
Address:        2020 Central Road, 2nd Floor, Fort Lee, NJ 07024
Phone:          +1 (551) 333-5081
Email:          pavilionpilatesnj@gmail.com
ClassPass:      4.8★ · 18 reviews
WellnessLiving: [Insert business URL]
```
