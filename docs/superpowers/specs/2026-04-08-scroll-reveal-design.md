# Scroll-Reveal Animations — Design Spec
**Date:** 2026-04-08  
**Status:** Approved  
**Scope:** `landing-page/index.html`

---

## Overview

Add scroll-triggered reveal animations to the three content sections below the hero. When a section enters the viewport, its elements animate from `opacity: 0, translateY(30px)` to their natural position with a staggered cascade. Fires once per section, then never again.

---

## Sections in Scope

| Section | Elements targeted |
|---|---|
| `.what-it-is` | All `[data-parallax-y]` children (4 elements) |
| `.how-it-works` | All `[data-parallax-y]` children (5 elements) |
| `.skill-catalog` | All `[data-parallax-y]` children (4 elements) |

**Hero section is excluded** — it already has CSS entrance animations (`lineReveal`, `fadeSlideUp`, `fadeSlideRight`) that serve the same purpose.

---

## Animation Spec

### Initial state (hidden)

Applied via a `.reveal-up` class added by JS at DOM-ready (before scroll):

```css
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Revealed state

Applied by adding `.is-visible` when section enters viewport:

```css
.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Stagger

Each element in a section gets an inline `transition-delay` based on its index within the section's parallax elements:

```
transition-delay = index × 80ms
```

Max stagger for 5 elements: 320ms. This keeps the cascade tight and fast.

---

## Trigger Mechanic

A dedicated `IntersectionObserver` (separate from the parallax scroll observer) watches the 3 content sections:

- **Threshold:** `0.15` — reveal fires when 15% of the section is visible
- **rootMargin:** `0px` — no pre-loading
- **Once only:** section is `unobserve()`d immediately after reveal fires — no toggle on scroll back up

### Sequence per section

1. **At DOM-ready:** add `.reveal-up` class to all `[data-parallax-y]` elements in the 3 sections (sets initial hidden state)
2. **On intersection:** add `.is-visible` class to each element with staggered `transition-delay`
3. **Unobserve** the section immediately

---

## Accessibility

When `prefers-reduced-motion: reduce` is set:
- Skip adding `.reveal-up` entirely — elements start visible at their natural state
- No JS transition runs

---

## Coexistence with Parallax System

The reveal uses `opacity` + CSS `transform: translateY()`. The parallax system uses the CSS `translate` *individual property* (`el.style.translate`). These are **separate CSS properties** in the cascade and do not interfere.

One exception: the parallax system writes `el.style.opacity` to `heroBgEls` (`.hero-bg-text`, `.geo-diamond`, `.geo-diamond-sm`) for the hero scroll fade. Since those hero elements are excluded from the reveal, there is no conflict.

---

## CSS Changes (~10 lines)

Add two new rules to the `<style>` block:

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

---

## JS Changes (~20 lines)

Add a new IIFE immediately after the parallax IIFE (before `</script>`):

```js
// ── Scroll Reveal ──
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSections = document.querySelectorAll('.what-it-is, .how-it-works, .skill-catalog');

  // Collect elements per section
  const groups = Array.from(revealSections).map(section => ({
    section,
    els: Array.from(section.querySelectorAll('[data-parallax-y]')),
  }));

  if (reducedMotion) return; // skip: elements already visible at natural state

  // Set initial hidden state before first paint
  groups.forEach(({ els }) => {
    els.forEach(el => el.classList.add('reveal-up'));
  });

  // Reveal on intersection — fires once per section
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
```

---

## Acceptance Criteria

- [ ] Elements in `.what-it-is`, `.how-it-works`, `.skill-catalog` start invisible on page load.
- [ ] Elements reveal upward with a staggered cascade as the section scrolls into view.
- [ ] Reveal fires once — scrolling back up does not re-hide elements.
- [ ] Hero section is unaffected.
- [ ] Parallax motion still works after reveal completes.
- [ ] `prefers-reduced-motion` users see elements at full opacity immediately.
- [ ] No JS errors in console.
