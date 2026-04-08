# Circuit Patterns — Design Spec
**Date:** 2026-04-08  
**Status:** Approved  
**Scope:** `landing-page/index.html`

---

## Overview

Add PCB-style circuit trace decorations to all four main sections using inline SVGs. Hero gets Style B (rising traces from bottom). The three content sections get Style C (full-atmosphere traces on all edges).

---

## Section Treatment

| Section | Style | Background | Trace opacity |
|---|---|---|---|
| `.hero` | B — Rising traces (bottom + top-right accent) | Cream `#f0ebe2` | `0.3` traces, `0.55` nodes, `0.7` glow dots |
| `.what-it-is` | C — Full atmosphere (all edges) | Cream `#f8f6f1` | `0.25` traces, `0.45` nodes |
| `.how-it-works` | C — Full atmosphere (all edges) | Dark `#0c0b09` | `0.45` traces, `0.65` nodes |
| `.skill-catalog` | C — Full atmosphere (all edges) | Cream `#f0ebe2` | `0.25` traces, `0.45` nodes |

---

## SVG Spec

### Shared properties (all SVGs)

```html
<svg class="circuit-traces" aria-hidden="true" focusable="false"
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"
     preserveAspectRatio="xMidYMid slice">
```

- `position: absolute; inset: 0; width: 100%; height: 100%`
- `pointer-events: none; z-index: 0`
- `preserveAspectRatio="xMidYMid slice"` — scales to fill section without distortion
- `aria-hidden="true"` — purely decorative

### Style B — Hero (Rising Traces)

Three clusters of branching traces rise from the **bottom edge** of the viewBox (y=700):

**Left cluster** (x: 80–200):
- Main vertical stem rises from bottom, branches left and right at two heights
- 2–3 right-angle turns per branch
- 2 filled node circles, 1 open endpoint ring

**Center cluster** (x: 480–720):
- Tallest cluster — reaches ~y=350 (mid-section)
- Central stem with 3 branches, one reaching higher with a prominent node
- 3 filled nodes, 2 open rings

**Right cluster** (x: 900–1100):
- Medium height, mirrors left cluster loosely
- 2 filled nodes, 1 open ring

**Top-right accent** (x: 950–1200, y: 0–120):
- Small cluster of 2–3 traces descending from top-right corner
- Matches the reference image's top-right detail

### Style C — Full Atmosphere (Content Sections)

Four edge clusters, lower density than Style B:

**Top edge**: 2 small traces descending from top-left and top-right corners (y: 0–100)  
**Bottom edge**: 2 clusters rising from bottom-left and bottom-right (y: 600–700)  
**Left edge**: 1 trace group on the left side (x: 0–80, y: 200–450)  
**Right edge**: 1 trace group on the right side (x: 1120–1200, y: 150–500)

---

## CSS Changes (~5 lines)

```css
/* Circuit trace SVGs */
.circuit-traces {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Ensure relative positioning for sections that don't have it */
.what-it-is,
.skill-catalog {
  position: relative;
}
```

---

## HTML Changes

One `<svg class="circuit-traces">` added as the **first child** inside each of the 4 sections, before any content wrappers. Sections already have content at `z-index: 1` (hero-inner, section-wrap) so layering is automatic.

---

## Acceptance Criteria

- [ ] Hero shows rising traces from bottom in 3 clusters + top-right accent
- [ ] What It Is, How It Works, Skill Catalog show edge traces on all sides
- [ ] Dark section (How It Works) traces are clearly visible against `#0c0b09`
- [ ] SVGs do not block clicks or hover interactions on any element
- [ ] No content is obscured by traces
- [ ] Traces do not overflow their sections (overflow: hidden already set on hero and how-it-works)
- [ ] Parallax and reveal animations still work correctly
