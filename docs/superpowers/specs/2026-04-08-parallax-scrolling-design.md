# Parallax Scrolling — Design Spec
**Date:** 2026-04-08  
**Status:** Approved  
**Scope:** `landing-page/index.html`

---

## Overview

Add a free-scroll parallax system to the VeelIQ landing page so that:

1. Every main content section occupies full viewport height (`min-height: 100vh`).
2. Elements within each section move at different speeds relative to scroll, creating depth.
3. The hero section additionally responds to mouse position (mouse-drift, option C from brainstorm).
4. No scroll-jacking — the user scrolls freely; parallax is purely a visual transform overlay.

---

## Sections in Scope

Apply `min-height: 100vh` + parallax to these sections (in DOM order):

| Selector | Section name |
|---|---|
| `.hero` | Hero |
| `.what-it-is` | What It Is |
| `.how-it-works` | How It Works |
| `.skills` | Skills |
| `.pricing` | Pricing |

Footer and footer-CTA remain `auto` height — no parallax applied.

---

## Core Scroll Mechanic

### Progress value

For every section near the viewport, compute once per frame:

```
sectionRect = section.getBoundingClientRect()
progress    = -sectionRect.top / window.innerHeight
```

| progress | Meaning |
|---|---|
| `-1` | Section top is one viewport below fold (entering) |
| `0` | Section top is exactly at viewport top |
| `+1` | Section has scrolled fully above viewport (exiting) |

### Per-element transform

```
targetY[el] = progress × el.dataset.parallaxY
```

Apply with lerp for easing:

```
currentY[el] += (targetY[el] - currentY[el]) × 0.10
el.style.transform = `translateY(${currentY[el]}px)`
```

Lerp factor `0.10` gives a natural, non-sluggish follow.

### Performance

- Single `requestAnimationFrame` loop; passive `scroll` listener triggers the rAF.
- `IntersectionObserver` marks sections as active/inactive — the rAF skips inactive sections entirely.
- All parallax elements get `will-change: transform` in CSS.
- `transform` only — no `top`/`left`/`margin` mutations (avoids layout thrash).

---

## Layer Depth Map

Positive `N` = element lags behind scroll (appears deep/far).  
Negative `N` = element outruns scroll (appears close/foreground).

### Hero

| Element | `data-parallax-y` | Notes |
|---|---|---|
| `.hero-bg-text` ("IQ") | `60` | Deepest background |
| `.geo-diamond` | `40` | Mid background |
| `.geo-diamond-sm` | `50` | Mid background |
| `.geo-dot` | `45` | Mid background |
| `.hero-left` (headline) | `20` | Slightly slow |
| `.hero-right` (subtitle/CTA) | `25` | Slightly slow |

### What It Is

| Element | `data-parallax-y` | Notes |
|---|---|---|
| `.what-header` | `20` | Title group |
| `.pillar:nth-child(1)` | `15` | Card 1 — closest |
| `.pillar:nth-child(2)` | `22` | Card 2 — mid |
| `.pillar:nth-child(3)` | `30` | Card 3 — deepest |

### How It Works

| Element | `data-parallax-y` | Notes |
|---|---|---|
| How-it-works eyebrow + title group | `20` | |
| `.step:nth-child(1)` | `18` | |
| `.step:nth-child(3)` | `26` | |
| `.step:nth-child(5)` | `34` | |

### Skills, Pricing

| Element | `data-parallax-y` | Notes |
|---|---|---|
| Section header group | `20` | Consistent rhythm |
| Content blocks (cards, grid rows) | `15`–`30` staggered | Same stagger pattern |

---

## Mouse Drift (Hero Only)

Layered on top of scroll parallax using a separate transform variable. Each layer stores two independent values:

```
el._scrollY   (from scroll parallax)
el._mouseX/Y  (from mouse drift)
```

Combined in the rAF loop:

```
el.style.transform = `translate(${mouseX}px, ${scrollY + mouseY}px)`
```

### Depth multipliers (mouse)

| Element | Mouse sensitivity |
|---|---|
| `.hero-bg-text` | `÷14` (slowest) |
| `.geo-diamond` | `÷8` |
| `.geo-diamond-sm` | `÷6` |
| `.geo-dot` | `÷10` |
| `.hero-left` | `÷24` (barely moves) |
| `.hero-right` | `÷28` |

Global sensitivity constant: `0.018`. Mouse offset = `(mouseX - heroCenterX) × 0.018 / divisor`.

### Scroll-fade on hero exit

As the hero scrolls away (`progress` 0 → 1):

```
.hero-inner   opacity: clamp(0, 1 - progress × 1.2, 1)
              transform: scale(clamp(0.96, 1 - progress × 0.04, 1))
bg elements   opacity: clamp(0, 1 - progress × 1.6, 1)
```

Applied via inline style, not CSS classes, so it composites with the parallax transform.

---

## CSS Changes

```css
/* Sections — full viewport height */
.hero,
.what-it-is,
.how-it-works,
.skills,
.pricing {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Parallax performance hint */
[data-parallax-y] {
  will-change: transform;
}
```

Existing `padding` on sections is preserved inside the flex container via their inner `.section-wrap` / `.hero-inner` wrappers.

---

## HTML Changes

1. Add `data-parallax-y="N"` attributes to the elements listed in the Layer Depth Map above.
2. No structural changes to markup — attributes are additive.

---

## JS Architecture (~80 lines)

```
// 1. Query all [data-parallax-y] elements and group by parent section
// 2. IntersectionObserver — mark sections active when within 1× rootMargin
// 3. Passive scroll listener — sets a dirty flag, calls rAF if not already queued
// 4. rAF loop:
//    a. For each active section: compute progress
//    b. For each [data-parallax-y] in section: lerp currentY toward targetY
//    c. For hero bg elements: apply scroll-fade opacity/scale
//    d. write transforms
// 5. mousemove on .hero — lerp mouseX/Y toward raw offset, combine with scrollY in rAF
// 6. All state in plain arrays (no framework dependency)
```

Placed in a `<script>` tag at the end of `<body>`, after existing particle/cursor scripts.

---

## Out of Scope

- Mobile: parallax disabled below 768px (motion-heavy effects are distracting on touch; sections still get `min-height: 100vh`).
- `prefers-reduced-motion`: when set, all parallax transforms are skipped (accessibility).
- No GSAP, ScrollTrigger, or other libraries — vanilla JS only.

---

## Acceptance Criteria

- [ ] All 5 main sections fill the viewport on desktop.
- [ ] Scroll parallax is visible and smooth on Chrome, Firefox, Safari.
- [ ] Hero mouse drift works and stacks correctly on top of scroll parallax.
- [ ] Hero elements fade as hero exits viewport.
- [ ] No layout shift, content clipping, or overflow bleed.
- [ ] Parallax is disabled on mobile (< 768px) and when `prefers-reduced-motion` is set.
- [ ] No JS errors in console.
