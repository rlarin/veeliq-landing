# Parallax Scrolling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full-page scroll parallax with mouse drift to `landing-page/index.html` — each main section is 100vh, elements move at different speeds on scroll, hero also responds to mouse position.

**Architecture:** A single vanilla-JS IIFE at the end of `<body>` owns all motion. It uses a continuous `requestAnimationFrame` loop with lerped values for smooth easing. The CSS `translate` property (separate from `transform`) is used for parallax offsets so it stacks cleanly on top of existing CSS `transform` animations on the geo-diamond elements. `IntersectionObserver` skips off-screen sections for performance.

**Tech Stack:** Vanilla HTML/CSS/JS — no libraries. CSS `translate` individual property (Chrome 104+, Firefox 103+, Safari 15.4+).

---

## File Map

| File | Change |
|---|---|
| `landing-page/index.html` (CSS block ~line 16) | Add section heights, parallax will-change, mobile/motion overrides |
| `landing-page/index.html` (HTML ~line 825) | Add `data-parallax-y` + `data-mouse-div` attributes to hero elements |
| `landing-page/index.html` (HTML ~line 866) | Add `data-parallax-y` to what-it-is, how-it-works, skill-catalog elements |
| `landing-page/index.html` (JS ~line 1100) | Add parallax IIFE before closing `</script>` |

---

## Task 1: CSS — Section heights + parallax hints

**Files:**
- Modify: `landing-page/index.html` — CSS block inside `<style>`

- [ ] **Step 1: Add section height + parallax CSS**

Find the comment `/* ── Navigation ── */` in the `<style>` block. Add the following block immediately **before** it (around line 209):

```css
/* ── Full-viewport sections ── */
.hero,
.what-it-is,
.how-it-works,
.skill-catalog {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Parallax performance hint */
[data-parallax-y] {
  will-change: translate;
}

/* Disable parallax on mobile — layout still 100vh */
@media (max-width: 767px) {
  [data-parallax-y] { will-change: auto; }
}

/* Disable parallax animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-parallax-y] { will-change: auto; }
}
```

- [ ] **Step 2: Verify sections fill viewport**

Open `landing-page/index.html` in a browser. Each of the four main sections (hero, What It Is, How It Works, Skill Catalog) should occupy the full viewport height. Scroll through the page — sections should fill the screen edge to edge vertically. Content inside each section should be vertically centered.

- [ ] **Step 3: Commit**

```bash
cd landing-page
git add index.html
git commit -m "feat: set main sections to 100vh with flex centering"
```

---

## Task 2: HTML — Hero parallax data attributes

**Files:**
- Modify: `landing-page/index.html` — hero section HTML (~line 825)

Each hero layer needs two attributes:
- `data-parallax-y="N"` — scroll speed (higher = slower/deeper)
- `data-mouse-div="N"` — mouse drift divisor (higher = subtler drift)

- [ ] **Step 1: Add attributes to hero-bg-text**

Find:
```html
    <div class="hero-bg-text">IQ</div>
```
Replace with:
```html
    <div class="hero-bg-text" data-parallax-y="60" data-mouse-div="14">IQ</div>
```

- [ ] **Step 2: Add attributes to geo-diamond**

Find:
```html
    <div class="geo geo-diamond"></div>
```
Replace with:
```html
    <div class="geo geo-diamond" data-parallax-y="40" data-mouse-div="8"></div>
```

- [ ] **Step 3: Add attributes to geo-diamond-sm**

Find:
```html
    <div class="geo geo-diamond-sm"></div>
```
Replace with:
```html
    <div class="geo geo-diamond-sm" data-parallax-y="50" data-mouse-div="6"></div>
```

- [ ] **Step 4: Add attributes to geo-dot**

Find:
```html
    <div class="geo geo-dot"></div>
```
Replace with:
```html
    <div class="geo geo-dot" data-parallax-y="45" data-mouse-div="10"></div>
```

- [ ] **Step 5: Add attributes to hero-left**

Find:
```html
      <div class="hero-left">
```
Replace with:
```html
      <div class="hero-left" data-parallax-y="20" data-mouse-div="24">
```

- [ ] **Step 6: Add attributes to hero-right**

Find:
```html
      <div class="hero-right">
```
Replace with:
```html
      <div class="hero-right" data-parallax-y="25" data-mouse-div="28">
```

- [ ] **Step 7: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add parallax data attributes to hero elements"
```

---

## Task 3: HTML — Remaining sections parallax data attributes

**Files:**
- Modify: `landing-page/index.html` — what-it-is, how-it-works, skill-catalog sections

### What It Is section

- [ ] **Step 1: Add attribute to what-header**

Find:
```html
      <div class="what-header">
```
Replace with:
```html
      <div class="what-header" data-parallax-y="20">
```

- [ ] **Step 2: Add staggered attributes to pillar cards**

Find (first pillar):
```html
        <div class="pillar">
          <div class="pillar-title">No new AI. No new app.</div>
```
Replace with:
```html
        <div class="pillar" data-parallax-y="15">
          <div class="pillar-title">No new AI. No new app.</div>
```

Find (second pillar):
```html
        <div class="pillar">
          <div class="pillar-title">Expert skills, on demand.</div>
```
Replace with:
```html
        <div class="pillar" data-parallax-y="22">
          <div class="pillar-title">Expert skills, on demand.</div>
```

Find (third pillar):
```html
        <div class="pillar">
          <div class="pillar-title">MCP-native. Works everywhere.</div>
```
Replace with:
```html
        <div class="pillar" data-parallax-y="30">
          <div class="pillar-title">MCP-native. Works everywhere.</div>
```

### How It Works section

- [ ] **Step 3: Add attribute to how-it-works eyebrow**

Find:
```html
      <div class="eyebrow"><span>How It Works</span></div>
      <h2 class="section-title how-title">Three steps. That's it.</h2>
```
Replace with:
```html
      <div class="eyebrow" data-parallax-y="20"><span>How It Works</span></div>
      <h2 class="section-title how-title" data-parallax-y="20">Three steps. That's it.</h2>
```

- [ ] **Step 4: Add staggered attributes to step cards**

Find (step 01):
```html
        <div class="step">
          <div class="step-num">Step 01</div>
```
Replace with:
```html
        <div class="step" data-parallax-y="18">
          <div class="step-num">Step 01</div>
```

Find (step 02):
```html
        <div class="step">
          <div class="step-num">Step 02</div>
```
Replace with:
```html
        <div class="step" data-parallax-y="26">
          <div class="step-num">Step 02</div>
```

Find (step 03):
```html
        <div class="step">
          <div class="step-num">Step 03</div>
```
Replace with:
```html
        <div class="step" data-parallax-y="34">
          <div class="step-num">Step 03</div>
```

### Skill Catalog section

- [ ] **Step 5: Add attributes to skill-catalog elements**

Find:
```html
      <div class="catalog-header eyebrow"><span>Skill Catalog</span></div>
      <h2 class="section-title catalog-title">50+ skills at launch.</h2>
      <p class="catalog-sub">From CRM intelligence to research agents — one subscription unlocks them all.</p>
      <div class="skill-tags">
```
Replace with:
```html
      <div class="catalog-header eyebrow" data-parallax-y="20"><span>Skill Catalog</span></div>
      <h2 class="section-title catalog-title" data-parallax-y="20">50+ skills at launch.</h2>
      <p class="catalog-sub" data-parallax-y="25">From CRM intelligence to research agents — one subscription unlocks them all.</p>
      <div class="skill-tags" data-parallax-y="15">
```

- [ ] **Step 6: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add parallax data attributes to content sections"
```

---

## Task 4: JS — Parallax system (scroll + mouse drift + hero fade)

**Files:**
- Modify: `landing-page/index.html` — JS block at end of `<body>` (~line 1100)

- [ ] **Step 1: Add the parallax IIFE**

Find the closing `</script>` tag at the end of the existing script block (just before `</body>`):
```js
    }
  </script>
</body>
```
Replace with:
```js
    }

    // ── Parallax System (scroll + mouse drift + hero fade) ──
    (function () {
      // Guards
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 768) return;

      const SCROLL_LERP = 0.10;
      const MOUSE_LERP  = 0.08;
      const MOUSE_SENS  = 0.018;

      // Build layer registry — group parallax elements by parent section
      const sections = [];
      document.querySelectorAll('.hero, .what-it-is, .how-it-works, .skill-catalog').forEach(section => {
        const isHero = section.classList.contains('hero');
        const items  = Array.from(section.querySelectorAll('[data-parallax-y]')).map(el => ({
          el,
          speed:    parseFloat(el.dataset.parallaxY),
          mouseDiv: parseFloat(el.dataset.mouseDiv || 0),
          scrollY:  0,   // current lerped scroll offset
          mouseX:   0,   // current lerped mouse X offset
          mouseY:   0,   // current lerped mouse Y offset
        }));
        if (items.length) sections.push({ section, items, isHero, active: false });
      });

      // Hero fade targets (elements outside .hero-inner)
      const hero      = document.querySelector('.hero');
      const heroInner = hero && hero.querySelector('.hero-inner');
      const heroBgEls = hero ? [
        hero.querySelector('.hero-bg-text'),
        hero.querySelector('.geo-diamond'),
        hero.querySelector('.geo-diamond-sm'),
        hero.querySelector('.geo-dot'),
      ].filter(Boolean) : [];

      // IntersectionObserver — activate sections within ±1 viewport of edge
      const io = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          const s = sections.find(s => s.section === target);
          if (s) s.active = isIntersecting;
        });
      }, { rootMargin: '100% 0px 100% 0px' });
      sections.forEach(s => io.observe(s.section));

      // Mouse state — updated on mousemove, consumed in rAF loop
      let rawMouseX = 0, rawMouseY = 0;
      if (hero) {
        document.addEventListener('mousemove', e => {
          const r = hero.getBoundingClientRect();
          rawMouseX = (e.clientX - (r.left + r.width  / 2)) * MOUSE_SENS;
          rawMouseY = (e.clientY - (r.top  + r.height / 2)) * MOUSE_SENS;
        });
      }

      // Main rAF loop — runs continuously; skips inactive sections
      function tick() {
        const vh = window.innerHeight;

        sections.forEach(({ section, items, isHero, active }) => {
          if (!active) return;
          const rect     = section.getBoundingClientRect();
          const progress = -rect.top / vh; // -1 entering, 0 at top, +1 exited

          items.forEach(item => {
            // Scroll parallax — lerp toward target
            item.scrollY += (progress * item.speed - item.scrollY) * SCROLL_LERP;

            // Mouse drift — hero elements only, when data-mouse-div is set
            if (isHero && item.mouseDiv) {
              item.mouseX += (rawMouseX / item.mouseDiv - item.mouseX) * MOUSE_LERP;
              item.mouseY += (rawMouseY / item.mouseDiv - item.mouseY) * MOUSE_LERP;
            }

            // Write via CSS `translate` property — does NOT conflict with
            // CSS `transform` animations (e.g. rotateSlow on geo-diamond)
            item.el.style.translate = `${item.mouseX}px ${item.scrollY + item.mouseY}px`;
          });

          // Hero scroll fade — applied when hero exits upward
          if (isHero) {
            const p = Math.max(0, Math.min(1, progress));
            if (heroInner) {
              heroInner.style.opacity   = String(Math.max(0, 1 - p * 1.2));
              heroInner.style.transform = `scale(${Math.max(0.96, 1 - p * 0.04)})`;
            }
            heroBgEls.forEach(el => {
              el.style.opacity = String(Math.max(0, 1 - p * 1.6));
            });
          }
        });

        requestAnimationFrame(tick);
      }

      tick(); // start loop immediately
    })();
  </script>
</body>
```

- [ ] **Step 2: Open in browser and verify scroll parallax**

Open `landing-page/index.html`. Scroll slowly through the page:
- In each section, elements should drift at slightly different rates — content visible but offset from where it would be without parallax.
- The stagger between pillars (what-it-is) and steps (how-it-works) should be visible — further right card appears slightly lower/higher than the left card as the section moves through the viewport.
- No JS errors in the browser console (F12).

- [ ] **Step 3: Verify mouse drift on hero**

Move the mouse slowly across the hero section. The "IQ" watermark should drift very slightly in the direction of the mouse (barely perceptible). The geo diamonds should drift a bit more. The headline should barely move. All movement should feel smooth and eased, not snappy.

- [ ] **Step 4: Verify hero scroll fade**

Scroll slowly past the hero into the "What It Is" section. The hero headline and CTAs (`.hero-inner`) should fade out and very slightly scale down. The "IQ" watermark and geometric decorations should fade faster.

- [ ] **Step 5: Verify geo-diamond rotation is unaffected**

While scrolling, the `.geo-diamond` should still rotate continuously via its CSS animation AND drift via parallax simultaneously. Both effects should be visible at the same time.

- [ ] **Step 6: Verify mobile guard**

Open DevTools, set viewport to 375px width (iPhone), reload. Scroll through the page — there should be NO parallax motion (elements scroll at normal rate). Sections should still be full-height (min-height: 100vh applies regardless).

- [ ] **Step 7: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add scroll parallax, mouse drift, and hero fade system"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 5 spec requirements covered — section heights (Task 1), scroll parallax (Task 4), mouse drift (Task 4), hero scroll fade (Task 4), mobile + reduced-motion guards (Task 1 CSS + Task 4 JS).
- [x] **No placeholders:** All steps contain exact code to paste.
- [x] **Type consistency:** `data-parallax-y` / `data-mouse-div` attribute names match between HTML tasks (2, 3) and JS task (4). `dataset.parallaxY` / `dataset.mouseDiv` camelCase access is correct for those hyphenated attribute names.
- [x] **CSS `translate` vs `transform`:** Geo-diamond uses `transform: rotate()` via CSS animation; parallax uses `el.style.translate` (separate property) — no conflict.
- [x] **heroInner scope:** `heroInner` uses `transform: scale()` (not `translate`), and hero parallax items use `el.style.translate` — no conflict.
- [x] **Footer sections excluded:** `.footer-cta` and `<footer>` have no `min-height: 100vh` and no `data-parallax-y` attributes — correct per spec.
