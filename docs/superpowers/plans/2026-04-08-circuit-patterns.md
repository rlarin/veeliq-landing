# Circuit Patterns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add PCB-style circuit trace SVGs to all four main sections — Style B (rising traces) in the hero, Style C (full-atmosphere edge traces) in the three content sections.

**Architecture:** One inline `<svg class="circuit-traces">` added as the first child inside each section. All SVGs are `position: absolute; inset: 0; pointer-events: none; z-index: 0` so they sit behind content without blocking any interaction. No JS, no external files.

**Tech Stack:** Inline SVG, CSS. Vanilla HTML only.

---

## File Map

| File | Change |
|---|---|
| `landing-page/index.html` (CSS `<style>`) | Add `.circuit-traces` rule + `position: relative` to `.what-it-is` and `.skill-catalog` |
| `landing-page/index.html` (hero HTML) | Add Style B SVG as first child of `.hero` |
| `landing-page/index.html` (content sections HTML) | Add Style C SVGs as first child of `.what-it-is`, `.how-it-works`, `.skill-catalog` |

---

## Task 1: CSS — circuit-traces class + position fixes

**Files:**
- Modify: `landing-page/index.html` — CSS `<style>` block

- [ ] **Step 1: Add CSS**

Find the comment `/* ── Geometric decorations ── */` in the style block. Add the following block immediately **before** it:

```css
/* ── Circuit traces ── */
.circuit-traces {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}
```

Then find the existing `.what-it-is` rule:
```css
    .what-it-is {
      background: var(--bg-alt);
      padding: 5rem 0;
      border-top: 1px solid var(--border);
    }
```
Replace with:
```css
    .what-it-is {
      background: var(--bg-alt);
      padding: 5rem 0;
      border-top: 1px solid var(--border);
      position: relative;
    }
```

Then find the existing `.skill-catalog` rule and add `position: relative` to it. Search for:
```css
    .skill-catalog {
```
And add `position: relative;` inside that rule block.

- [ ] **Step 2: Verify**

Open `landing-page/index.html`. Page should look identical — CSS changes are invisible until the SVGs are added. No layout shift.

- [ ] **Step 3: Commit**

```bash
cd D:/WORK/Projects/VeelIQ/VeelIQ/VeelIQ/veeliq-main
git add landing-page/index.html
git commit -m "feat: add circuit-traces CSS class and position context to sections"
```

---

## Task 2: HTML — Hero circuit SVG (Style B: Rising Traces)

**Files:**
- Modify: `landing-page/index.html` — hero section, around the `<section class="hero">` tag

Style B has three bottom-edge clusters of branching traces + a top-right corner accent. Colors: `rgba(255,77,0,0.3)` for traces, `rgba(255,77,0,0.55)` for filled nodes, `rgba(255,77,0,0.7)` for glow dots. viewBox `0 0 1200 700`.

- [ ] **Step 1: Add the hero circuit SVG**

Find:
```html
  <section class="hero">
    <div class="hero-bg-text"
```
Replace with:
```html
  <section class="hero">
    <svg class="circuit-traces" aria-hidden="true" focusable="false"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"
         preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,77,0,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Left cluster -->
        <polyline points="80,700 80,580 120,580 120,540"/>
        <polyline points="80,625 50,625 50,595"/>
        <polyline points="120,580 155,580 155,552 190,552"/>
        <line x1="80" y1="580" x2="80" y2="558"/>
        <!-- Center cluster -->
        <polyline points="580,700 580,565 545,565 545,508 510,508 510,462"/>
        <polyline points="580,620 618,620 618,588 655,588 655,552"/>
        <polyline points="545,535 578,535 578,505"/>
        <polyline points="580,648 610,648 610,668 642,668"/>
        <!-- Right cluster -->
        <polyline points="962,700 962,602 998,602 998,562"/>
        <polyline points="962,652 928,652 928,618 902,618"/>
        <polyline points="998,582 1028,582 1028,550 1058,550"/>
        <!-- Top-right accent -->
        <polyline points="1200,58 1152,58 1152,92 1122,92"/>
        <polyline points="1178,0 1178,42 1145,42"/>
        <polyline points="1200,105 1168,105 1168,128 1140,128 1140,155"/>
      </g>
      <!-- Filled nodes at key junctions -->
      <g fill="rgba(255,77,0,0.55)">
        <circle cx="120" cy="540" r="4"/>
        <circle cx="190" cy="552" r="3.5"/>
        <circle cx="510" cy="462" r="4.5"/>
        <circle cx="655" cy="552" r="4"/>
        <circle cx="642" cy="668" r="3"/>
        <circle cx="998" cy="562" r="4"/>
        <circle cx="1058" cy="550" r="3.5"/>
        <circle cx="1145" cy="42" r="3.5"/>
        <circle cx="1140" cy="155" r="3"/>
      </g>
      <!-- Open endpoint rings -->
      <g fill="none" stroke="rgba(255,77,0,0.55)" stroke-width="1.5">
        <circle cx="50" cy="595" r="3.5"/>
        <circle cx="578" cy="505" r="3"/>
        <circle cx="902" cy="618" r="3.5"/>
        <circle cx="1122" cy="92" r="3"/>
      </g>
      <!-- Small glow dots on trace midpoints -->
      <g fill="rgba(255,77,0,0.7)">
        <circle cx="80" cy="558" r="2.5"/>
        <circle cx="580" cy="565" r="2"/>
        <circle cx="618" cy="588" r="2"/>
        <circle cx="962" cy="602" r="2"/>
        <circle cx="1152" cy="58" r="2"/>
        <circle cx="1168" cy="128" r="2"/>
      </g>
    </svg>
    <div class="hero-bg-text"
```

- [ ] **Step 2: Verify**

Open `landing-page/index.html`. The hero section should show orange circuit traces rising from the bottom edge in three clusters, plus a small trace cluster in the top-right corner. Traces should sit behind the "IQ" watermark text and geo-diamond decorations. The hero content (headline, CTAs) should be fully readable above the traces.

- [ ] **Step 3: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add Style B rising circuit traces to hero section"
```

---

## Task 3: HTML — Content section circuit SVGs (Style C: Full Atmosphere)

**Files:**
- Modify: `landing-page/index.html` — `.what-it-is`, `.how-it-works`, `.skill-catalog` sections

Style C places small trace clusters on all four edges (top-left, top-right, left-mid, right-mid, bottom-left, bottom-right). viewBox `0 0 1200 700`.

Light section colors: traces `rgba(255,77,0,0.25)`, nodes `rgba(255,77,0,0.45)`.
Dark section colors (how-it-works): traces `rgba(255,77,0,0.45)`, nodes `rgba(255,77,0,0.65)`.

### What It Is (light background)

- [ ] **Step 1: Add SVG to .what-it-is**

Find:
```html
  <section class="what-it-is">
    <div class="section-wrap">
```
Replace with:
```html
  <section class="what-it-is">
    <svg class="circuit-traces" aria-hidden="true" focusable="false"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"
         preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,77,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top-left -->
        <polyline points="0,38 42,38 42,75 72,75"/>
        <polyline points="22,0 22,28 52,28 52,58 80,58"/>
        <!-- Top-right -->
        <polyline points="1200,32 1158,32 1158,68 1128,68"/>
        <polyline points="1178,0 1178,48 1148,48"/>
        <!-- Left mid -->
        <polyline points="0,285 32,285 32,322 62,322"/>
        <polyline points="0,345 22,345 22,378 48,378 48,408"/>
        <!-- Right mid -->
        <polyline points="1200,255 1168,255 1168,292 1138,292"/>
        <polyline points="1200,318 1180,318 1180,355 1152,355 1152,385"/>
        <!-- Bottom-left -->
        <polyline points="58,700 58,652 88,652 88,618 118,618"/>
        <polyline points="28,700 28,668 8,668 8,638"/>
        <!-- Bottom-right -->
        <polyline points="1142,700 1142,648 1112,648 1112,612 1082,612"/>
        <polyline points="1172,700 1172,662 1192,662 1192,630"/>
      </g>
      <g fill="rgba(255,77,0,0.45)">
        <circle cx="72" cy="75" r="3.5"/>
        <circle cx="80" cy="58" r="3"/>
        <circle cx="62" cy="322" r="3.5"/>
        <circle cx="48" cy="408" r="3"/>
        <circle cx="118" cy="618" r="3.5"/>
        <circle cx="1128" cy="68" r="3.5"/>
        <circle cx="1148" cy="48" r="3"/>
        <circle cx="1138" cy="292" r="3.5"/>
        <circle cx="1152" cy="385" r="3"/>
        <circle cx="1082" cy="612" r="3.5"/>
      </g>
      <g fill="none" stroke="rgba(255,77,0,0.45)" stroke-width="1.5">
        <circle cx="8" cy="638" r="3"/>
        <circle cx="1192" cy="630" r="3"/>
      </g>
    </svg>
    <div class="section-wrap">
```

### How It Works (dark background — brighter traces)

- [ ] **Step 2: Add SVG to .how-it-works**

Find:
```html
  <section class="how-it-works" id="how-it-works">
    <div class="section-wrap">
```
Replace with:
```html
  <section class="how-it-works" id="how-it-works">
    <svg class="circuit-traces" aria-hidden="true" focusable="false"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"
         preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,77,0,0.45)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top-left -->
        <polyline points="0,42 45,42 45,78 78,78"/>
        <polyline points="25,0 25,32 58,32 58,62 88,62"/>
        <!-- Top-right -->
        <polyline points="1200,35 1155,35 1155,72 1122,72"/>
        <polyline points="1175,0 1175,50 1142,50"/>
        <!-- Left mid -->
        <polyline points="0,290 35,290 35,328 68,328"/>
        <polyline points="0,352 25,352 25,385 52,385 52,415"/>
        <!-- Right mid -->
        <polyline points="1200,262 1165,262 1165,298 1132,298"/>
        <polyline points="1200,325 1178,325 1178,360 1148,360 1148,392"/>
        <!-- Bottom-left -->
        <polyline points="62,700 62,655 95,655 95,620 128,620"/>
        <polyline points="32,700 32,672 12,672 12,642"/>
        <!-- Bottom-right -->
        <polyline points="1138,700 1138,652 1105,652 1105,615 1072,615"/>
        <polyline points="1168,700 1168,665 1188,665 1188,632"/>
      </g>
      <g fill="rgba(255,77,0,0.65)">
        <circle cx="78" cy="78" r="4"/>
        <circle cx="88" cy="62" r="3.5"/>
        <circle cx="68" cy="328" r="4"/>
        <circle cx="52" cy="415" r="3.5"/>
        <circle cx="128" cy="620" r="4"/>
        <circle cx="1122" cy="72" r="4"/>
        <circle cx="1142" cy="50" r="3.5"/>
        <circle cx="1132" cy="298" r="4"/>
        <circle cx="1148" cy="392" r="3.5"/>
        <circle cx="1072" cy="615" r="4"/>
      </g>
      <g fill="none" stroke="rgba(255,77,0,0.65)" stroke-width="1.5">
        <circle cx="12" cy="642" r="3.5"/>
        <circle cx="1188" cy="632" r="3.5"/>
      </g>
    </svg>
    <div class="section-wrap">
```

### Skill Catalog (light background)

- [ ] **Step 3: Add SVG to .skill-catalog**

Find:
```html
  <section class="skill-catalog" id="skills">
    <div class="section-wrap">
```
Replace with:
```html
  <section class="skill-catalog" id="skills">
    <svg class="circuit-traces" aria-hidden="true" focusable="false"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"
         preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,77,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top-left -->
        <polyline points="0,38 42,38 42,75 72,75"/>
        <polyline points="22,0 22,28 52,28 52,58 80,58"/>
        <!-- Top-right -->
        <polyline points="1200,32 1158,32 1158,68 1128,68"/>
        <polyline points="1178,0 1178,48 1148,48"/>
        <!-- Left mid -->
        <polyline points="0,285 32,285 32,322 62,322"/>
        <polyline points="0,345 22,345 22,378 48,378 48,408"/>
        <!-- Right mid -->
        <polyline points="1200,255 1168,255 1168,292 1138,292"/>
        <polyline points="1200,318 1180,318 1180,355 1152,355 1152,385"/>
        <!-- Bottom-left -->
        <polyline points="58,700 58,652 88,652 88,618 118,618"/>
        <polyline points="28,700 28,668 8,668 8,638"/>
        <!-- Bottom-right -->
        <polyline points="1142,700 1142,648 1112,648 1112,612 1082,612"/>
        <polyline points="1172,700 1172,662 1192,662 1192,630"/>
      </g>
      <g fill="rgba(255,77,0,0.45)">
        <circle cx="72" cy="75" r="3.5"/>
        <circle cx="80" cy="58" r="3"/>
        <circle cx="62" cy="322" r="3.5"/>
        <circle cx="48" cy="408" r="3"/>
        <circle cx="118" cy="618" r="3.5"/>
        <circle cx="1128" cy="68" r="3.5"/>
        <circle cx="1148" cy="48" r="3"/>
        <circle cx="1138" cy="292" r="3.5"/>
        <circle cx="1152" cy="385" r="3"/>
        <circle cx="1082" cy="612" r="3.5"/>
      </g>
      <g fill="none" stroke="rgba(255,77,0,0.45)" stroke-width="1.5">
        <circle cx="8" cy="638" r="3"/>
        <circle cx="1192" cy="630" r="3"/>
      </g>
    </svg>
    <div class="section-wrap">
```

- [ ] **Step 4: Verify all three content sections**

Open `landing-page/index.html`. Scroll through:
- "What It Is": subtle orange traces should appear on all four section edges — faint enough not to compete with the pillar cards
- "How It Works": same pattern but visibly brighter against the dark background — should feel like actual PCB atmosphere
- "Skill Catalog": same as What It Is

In all sections: content (text, cards, buttons) should be fully readable. No traces overlap the `.section-wrap` content area significantly (they're edge-only).

- [ ] **Step 5: Verify parallax and reveal still work**

Scroll slowly through all sections. Parallax depth effect and scroll-reveal animations (elements fading in from below) should work exactly as before. The SVGs are `z-index: 0` and `pointer-events: none` — they cannot interfere.

- [ ] **Step 6: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add Style C full-atmosphere circuit traces to content sections"
```

---

## Self-Review

- [x] **Spec coverage:** `.circuit-traces` CSS (Task 1) ✓, `position: relative` on `.what-it-is` + `.skill-catalog` (Task 1) ✓, Hero Style B with 3 bottom clusters + top-right accent (Task 2) ✓, Style C on all 3 content sections (Task 3) ✓, dark section brighter traces (Task 3 Step 2) ✓, `aria-hidden` + `pointer-events: none` on all SVGs ✓, `preserveAspectRatio="xMidYMid slice"` ✓.
- [x] **No placeholders:** All SVG markup is complete and ready to paste.
- [x] **Type consistency:** `circuit-traces` class name used consistently in CSS (Task 1) and all SVG elements (Tasks 2–3).
- [x] **Layering verified:** Hero geo-diamond at `z-index: 0` (same as SVG) — both are behind `.hero-inner` at `z-index: 1`. Since the SVG is inserted before the geo divs in DOM order, the geo divs paint on top. Correct.
