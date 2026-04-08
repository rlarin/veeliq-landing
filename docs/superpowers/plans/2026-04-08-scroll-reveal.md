# Scroll-Reveal Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate content section elements from hidden/offset-down to visible when their section scrolls into the viewport, with a staggered cascade.

**Architecture:** Two additions to `landing-page/index.html` — a CSS rule pair (`.reveal-up` / `.reveal-up.is-visible`) and a small JS IIFE that marks elements hidden at DOM-ready then reveals them via `IntersectionObserver`. The reveal uses CSS `opacity` + `transform: translateY()`, which is separate from the parallax system's CSS `translate` individual property — no conflict.

**Tech Stack:** Vanilla HTML/CSS/JS. `IntersectionObserver` (all modern browsers). No libraries.

---

## File Map

| File | Change |
|---|---|
| `landing-page/index.html` (CSS `<style>` block) | Add 8-line `.reveal-up` / `.reveal-up.is-visible` rule pair |
| `landing-page/index.html` (JS `<script>` block, end of body) | Add ~25-line scroll-reveal IIFE after the existing parallax IIFE |

---

## Task 1: CSS — Reveal-up rules

**Files:**
- Modify: `landing-page/index.html` — `<style>` block

- [ ] **Step 1: Add the CSS**

Find the comment `/* ── Scroll reveal ── */` — it does not exist yet. Find the comment `/* ── Entrance animations ── */` (around line 167) and add the new block immediately **before** it:

```css
/* ── Scroll reveal ── */
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

```

- [ ] **Step 2: Verify in browser**

Open `landing-page/index.html`. The page should look identical to before — `.reveal-up` is only applied by JS (Task 2). No visible change yet.

- [ ] **Step 3: Commit**

```bash
cd D:/WORK/Projects/VeelIQ/VeelIQ/VeelIQ/veeliq-main
git add landing-page/index.html
git commit -m "feat: add scroll-reveal CSS animation rules"
```

---

## Task 2: JS — Scroll-reveal IIFE

**Files:**
- Modify: `landing-page/index.html` — `<script>` block at end of `<body>`

- [ ] **Step 1: Add the scroll-reveal IIFE**

Find the very end of the existing `<script>` block. It currently ends with:

```js
      tick(); // start loop immediately

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
        } else {
          tick();
        }
      });
    })();
  </script>
```

Replace with:

```js
      tick(); // start loop immediately

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
        } else {
          tick();
        }
      });
    })();

    // ── Scroll Reveal ──
    (function () {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const revealSections = document.querySelectorAll('.what-it-is, .how-it-works, .skill-catalog');

      // Collect [data-parallax-y] elements per section
      const groups = Array.from(revealSections).map(section => ({
        section,
        els: Array.from(section.querySelectorAll('[data-parallax-y]')),
      }));

      // Respect reduced motion — leave elements fully visible, skip animation
      if (reducedMotion) return;

      // Mark elements hidden before first paint
      groups.forEach(({ els }) => {
        els.forEach(el => el.classList.add('reveal-up'));
      });

      // Reveal on section entry — fires once per section, then unobserves
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const group = groups.find(g => g.section === target);
          if (!group) return;
          group.els.forEach((el, i) => {
            el.style.transitionDelay = `${i * 80}ms`;
            el.classList.add('is-visible');
          });
          observer.unobserve(target);
        });
      }, { threshold: 0.15 });

      groups.forEach(({ section }) => io.observe(section));
    })();
  </script>
```

- [ ] **Step 2: Verify reveal animation fires**

Open `landing-page/index.html` in a browser. Scroll past the hero into the "What It Is" section. The three pillar cards and section header should animate upward and fade in with a cascade (each card slightly after the previous). Verify:
- Elements start invisible before the section is in view
- They reveal as the section enters (not all at once — staggered ~80ms apart)
- Scrolling back up does NOT re-hide them

- [ ] **Step 3: Verify other sections**

Scroll into "How It Works" and "Skill Catalog" — same reveal behavior. All `[data-parallax-y]` elements in each section should stagger in.

- [ ] **Step 4: Verify hero is unaffected**

The hero section should show its existing entrance animations as before. No `.reveal-up` class should appear on hero elements. Inspect the hero in DevTools to confirm.

- [ ] **Step 5: Verify parallax still works after reveal**

After elements have revealed, continue scrolling slowly. The parallax depth effect (elements drifting at different speeds) should still work normally — the reveal class does not interfere with `el.style.translate`.

- [ ] **Step 6: Verify reduced-motion**

Open DevTools → Rendering → Enable "Emulate CSS media feature prefers-reduced-motion". Reload. All content section elements should be immediately visible (no `.reveal-up` class, no animation).

- [ ] **Step 7: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add scroll-triggered reveal animation to content sections"
```

---

## Self-Review

- [x] **Spec coverage:** CSS rules (Task 1) ✓, JS IIFE with `IntersectionObserver` (Task 2) ✓, `threshold: 0.15` ✓, stagger `i * 80ms` ✓, `unobserve` after reveal ✓, `reducedMotion` guard ✓, hero excluded ✓, sections `.what-it-is .how-it-works .skill-catalog` ✓.
- [x] **No placeholders:** All steps have exact code to paste.
- [x] **Type consistency:** `groups`, `els`, `reveal-up`, `is-visible` used consistently between Task 1 CSS and Task 2 JS.
- [x] **Coexistence verified in plan:** Note in architecture that CSS `transform: translateY()` (reveal) and CSS `translate` property (parallax) are separate and non-conflicting.
