# VeelIQ Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `landing-page/index.html` — a fully responsive, light-themed VeelIQ marketing landing page that matches the coming-soon design system and drives sign-ups to `https://app.veeliq.com/`.

**Architecture:** Single self-contained HTML file with all CSS and JS inline — no build step, no dependencies, identical pattern to `coming-soon/index.html`. Sections: Nav → Hero → What It Is → How It Works (dark) → Skill Catalog → Footer CTA (dark) → Footer → Ticker.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, keyframe animations), vanilla JS, Google Fonts (Unbounded + Epilogue).

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `landing-page/index.html` | Create | The entire page — HTML, CSS, JS all inline |

No other files are created or modified (favicons are referenced from `../coming-soon/`).

---

### Task 1: Scaffold — `<head>`, CSS custom properties, resets, global styles, and all `@keyframes`

**Files:**
- Create: `landing-page/index.html`

- [ ] **Step 1: Create the file with the complete `<head>` and CSS foundation**

Create `landing-page/index.html` with the following content. This establishes all design tokens, resets, base body styles, cursor CSS, top-line animation, grain overlay, ticker CSS, and all `@keyframes` used throughout the page. The `<body>` contains only the persistent chrome elements (cursor, top-line) and a `<script>` stub for later JS.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VeelIQ — Skills as a Service for your AI</title>
  <meta name="description" content="Subscribe to expert skills that appear as native tools inside Claude.ai, Cursor, or any MCP-compatible AI client. No code. No setup. Just more intelligence." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="../coming-soon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="../coming-soon/favicon.svg" />
  <link rel="shortcut icon" href="../coming-soon/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="../coming-soon/apple-touch-icon.png" />
  <link rel="manifest" href="../coming-soon/site.webmanifest" />
  <style>

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:          #f0ebe2;
      --bg-alt:      #f8f6f1;
      --bg-dark:     #0c0b09;
      --bg-dark-2:   #141310;
      --surface:     #ffffff;
      --orange:      #ff4d00;
      --orange-2:    #ff7733;
      --orange-dim:  rgba(255,77,0,0.1);
      --orange-glow: rgba(255,77,0,0.25);
      --text:        #0c0b09;
      --muted:       rgba(12,11,9,0.45);
      --border:      rgba(12,11,9,0.1);
      --border-dark: rgba(255,77,0,0.14);
      --font-d:      'Unbounded', sans-serif;
      --font-b:      'Epilogue', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-b), sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      cursor: none;
    }

    /* ── Grain overlay ── */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 100;
    }

    /* ── Custom cursor ── */
    .cursor {
      position: fixed;
      width: 12px; height: 12px;
      background: var(--orange);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s;
      mix-blend-mode: multiply;
    }
    .cursor-ring {
      position: fixed;
      width: 36px; height: 36px;
      border: 1px solid var(--orange);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      opacity: 0.4;
    }

    /* ── Top scan line ── */
    .top-line {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--orange), var(--orange-2), var(--orange), transparent);
      background-size: 200% 100%;
      animation: scanline 15s linear infinite;
      z-index: 200;
    }
    @keyframes scanline {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Ticker ── */
    .ticker-wrap {
      position: relative;
      height: 20px;
      background: var(--orange);
      overflow: hidden;
      display: flex;
      align-items: center;
      z-index: 10;
    }
    .ticker-track {
      display: flex;
      white-space: nowrap;
      animation: tickerMove 40s linear infinite;
    }
    .ticker-item {
      font-family: var(--font-d), sans-serif;
      font-weight: 700;
      font-size: 0.6rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--bg-dark);
      padding: 0 2rem;
    }
    .ticker-sep { color: rgba(12,11,9,0.35); padding: 0 0.5rem; }
    @keyframes tickerMove {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── Geometric decorations ── */
    .geo { position: absolute; pointer-events: none; }
    .geo-diamond {
      width: 260px; height: 260px;
      border: 1px solid rgba(255,77,0,0.08);
      transform: rotate(45deg);
      top: 8%; right: 6%;
      animation: rotateSlow 45s linear infinite;
    }
    .geo-diamond-sm {
      width: 130px; height: 130px;
      border: 1px solid rgba(255,77,0,0.05);
      transform: rotate(45deg);
      top: calc(8% + 65px); right: calc(6% + 65px);
      animation: rotateSlow 28s linear infinite reverse;
    }
    .geo-dot {
      width: 6px; height: 6px;
      background: var(--orange);
      border-radius: 50%;
      opacity: 0.4;
      top: 50%; right: 8%;
      animation: pulseDot 3s ease infinite;
    }
    @keyframes rotateSlow { to { transform: rotate(405deg); } }
    @keyframes pulseDot {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50%       { opacity: 0.9; transform: scale(1.8); }
    }

    /* ── Entrance animations ── */
    @keyframes fadeSlideDown {
      from { opacity: 0; transform: translateY(-16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideRight {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes lineReveal {
      to { transform: translateY(0); }
    }

    /* ── Section shared helpers ── */
    .section-wrap {
      max-width: 1200px;
      margin-inline: auto;
      padding-inline: 3.5rem;
    }
    .eyebrow {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .eyebrow-line { width: 28px; height: 1px; background: var(--orange); flex-shrink: 0; }
    .section-title {
      font-family: var(--font-d), sans-serif;
      font-weight: 900;
      letter-spacing: -0.05em;
      line-height: 1;
    }

  </style>
</head>
<body>

  <div class="cursor" id="cursor"></div>
  <div class="cursor-ring" id="ring"></div>
  <div class="top-line"></div>

  <!-- sections added in subsequent tasks -->

  <script>
    // Cursor tracking
    const cur = document.getElementById('cursor');
    const rng = document.getElementById('ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      rng.style.left = rx + 'px'; rng.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .skill-tag, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.style.width = '20px'; cur.style.height = '20px'; });
      el.addEventListener('mouseleave', () => { cur.style.width = '12px'; cur.style.height = '12px'; });
    });

    // Ticker
    const tk = document.getElementById('tk');
    if (tk) {
      const words = ['VeelIQ', 'Skills as a Service', 'AI Intelligence', 'Plug & Play Skills', 'No Code Required', 'Claude.ai · Cursor · MCP', 'More IQ for your AI', 'One URL. All Skills.'];
      const row = words.map(w => `<span class="ticker-item">${w}</span><span class="ticker-item ticker-sep">—</span>`).join('');
      tk.innerHTML = row + row;
    }
  </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify scaffold**

Open `landing-page/index.html` directly in a browser (double-click the file or use a local server).

Expected:
- Page background is cream (`#f0ebe2`) ✓
- Custom orange cursor dot follows the mouse ✓
- Orange ring follows cursor with slight lag ✓
- Animated orange gradient line sweeps across the top ✓
- No JS console errors ✓
- Favicon shows in browser tab ✓

- [ ] **Step 3: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: scaffold landing page — head, CSS tokens, cursor, animations"
```

---

### Task 2: Navigation

**Files:**
- Modify: `landing-page/index.html` — add nav HTML after `<div class="top-line">` and nav CSS inside `<style>`

- [ ] **Step 1: Add nav CSS inside the `<style>` block** (paste before the closing `</style>` tag)

```css
/* ── Navigation ── */
nav {
  position: sticky;
  top: 0;
  z-index: 150;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  opacity: 0;
  animation: fadeSlideDown 1s ease 0.2s forwards;
}
.nav-inner {
  max-width: 1200px;
  margin-inline: auto;
  padding: 1.2rem 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
.nav-link {
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--text); }
.btn-nav {
  display: inline-block;
  background: var(--orange);
  color: #fff;
  text-decoration: none;
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.7rem 1.4rem;
  border-radius: 2px;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-nav:hover { background: var(--orange-2); }

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}
.hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Mobile nav drawer */
.nav-drawer {
  display: none;
  flex-direction: column;
  gap: 0;
  background: var(--bg);
  border-top: 1px solid var(--border);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
}
.nav-drawer.open {
  max-height: 300px;
  padding: 1rem 0;
}
.nav-drawer .nav-link {
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 0.78rem;
  border-bottom: 1px solid var(--border);
}
.nav-drawer .btn-nav {
  margin: 0.75rem 1.5rem 0;
  display: inline-block;
  width: calc(100% - 3rem);
  text-align: center;
}
```

- [ ] **Step 2: Add nav HTML** — replace the comment `<!-- sections added in subsequent tasks -->` with:

```html
  <nav id="main-nav">
    <div class="nav-inner">
      <a href="/" class="logo">
        <svg width="120" height="28" viewBox="0 0 280 64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 14,0 20,56 6,56" fill="#0c0b09"/>
          <polygon points="20,56 32,56 46,0 32,0" fill="#ff4d00"/>
          <text x="58" y="50" font-family="Unbounded, sans-serif" font-weight="900" font-size="46" letter-spacing="-2">
            <tspan fill="#0c0b09">Veel</tspan><tspan fill="#ff4d00">IQ</tspan>
          </text>
        </svg>
      </a>
      <div class="nav-links" id="nav-links-desktop">
        <a href="#how-it-works" class="nav-link">How It Works</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="https://app.veeliq.com/" class="btn-nav" target="_blank" rel="noopener">Get Started →</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-drawer" id="nav-drawer">
      <a href="#how-it-works" class="nav-link">How It Works</a>
      <a href="#skills" class="nav-link">Skills</a>
      <a href="https://app.veeliq.com/" class="btn-nav" target="_blank" rel="noopener">Get Started →</a>
    </div>
  </nav>

  <!-- sections added in subsequent tasks -->
```

- [ ] **Step 3: Add hamburger JS** — paste inside the `<script>` block, after the ticker block:

```js
// Hamburger
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('nav-drawer');
if (hamburger && navDrawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navDrawer.classList.toggle('open');
  });
  // Close drawer when a link is clicked
  navDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
    });
  });
}
```

- [ ] **Step 4: Open in browser and verify nav**

Expected:
- Sticky nav stays at top when scrolling ✓
- Logo renders in dark ink + orange ✓
- "How It Works" and "Skills" links visible ✓
- "Get Started →" orange button visible ✓
- Resize browser to < 800px: hamburger icon appears, links hide ✓
- Tap hamburger: drawer slides open/closed ✓

- [ ] **Step 5: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add sticky navigation with mobile hamburger drawer"
```

---

### Task 3: Hero Section

**Files:**
- Modify: `landing-page/index.html` — add hero CSS + HTML

- [ ] **Step 1: Add hero CSS** (paste inside `<style>` before `</style>`)

```css
/* ── Hero ── */
.hero {
  background: var(--bg);
  position: relative;
  overflow: hidden;
  padding: 5rem 0 4rem;
}
.hero-inner {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 3.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* BG watermark */
.hero-bg-text {
  position: absolute;
  top: 50%; right: -2rem;
  transform: translateY(-52%);
  font-family: var(--font-d), sans-serif;
  font-weight: 900;
  font-size: clamp(18vw, 22vw, 28vw);
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,77,0,0.055);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  letter-spacing: -0.06em;
}

/* Hero left — eyebrow + headline */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeSlideRight 1.2s ease 0.9s forwards;
}
.hero-eyebrow .eyebrow-line { width: 36px; }

h1 {
  font-family: var(--font-d), sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 6.5vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.065em;
}
.line-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}
.line-inner {
  display: block;
  transform: translateY(110%);
  animation: lineReveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards;
}
.line-mask:nth-child(1) .line-inner { animation-delay: 1.4s; }
.line-mask:nth-child(2) .line-inner { animation-delay: 1.75s; color: var(--orange); }
.line-mask:nth-child(3) .line-inner {
  animation-delay: 2.1s;
  color: transparent;
  -webkit-text-stroke: 2px var(--orange);
}

/* Hero right — subtitle, CTAs, badges */
.hero-right {
  display: flex;
  flex-direction: column;
}
.hero-subtitle {
  font-size: 0.9rem;
  line-height: 1.9;
  color: var(--muted);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeSlideUp 1.4s ease 2.2s forwards;
}
.hero-cta-wrap {
  opacity: 0;
  animation: fadeSlideUp 1.4s ease 2.8s forwards;
}
.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.8rem;
}
.btn-primary {
  display: inline-block;
  background: var(--orange);
  color: #fff;
  text-decoration: none;
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: 2px;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-primary:hover { background: var(--orange-2); }
.btn-ghost {
  font-size: 0.68rem;
  color: var(--orange);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255,77,0,0.4);
  transition: text-decoration-color 0.2s;
}
.btn-ghost:hover { text-decoration-color: var(--orange); }
.hero-note {
  font-size: 0.64rem;
  color: var(--muted);
  font-style: italic;
  margin-bottom: 1.4rem;
}
.client-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.client-label {
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.client-badge {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 0.3rem 0.7rem;
  font-size: 0.62rem;
  font-weight: 500;
  color: rgba(12,11,9,0.65);
  letter-spacing: 0.02em;
}
```

- [ ] **Step 2: Add hero HTML** — replace `<!-- sections added in subsequent tasks -->` with:

```html
  <section class="hero">
    <div class="hero-bg-text">IQ</div>
    <div class="geo geo-diamond"></div>
    <div class="geo geo-diamond-sm"></div>
    <div class="geo geo-dot"></div>
    <div class="hero-inner">
      <!-- Left: eyebrow + headline -->
      <div class="hero-left">
        <div class="hero-eyebrow eyebrow">
          <div class="eyebrow-line"></div>
          <span>Skills as a Service</span>
        </div>
        <h1>
          <span class="line-mask"><span class="line-inner">Give your</span></span>
          <span class="line-mask"><span class="line-inner">AI more</span></span>
          <span class="line-mask"><span class="line-inner">IQ.</span></span>
        </h1>
      </div>
      <!-- Right: subtitle + CTAs + badges -->
      <div class="hero-right">
        <p class="hero-subtitle">
          Subscribe to expert skills that appear as native tools inside Claude.ai,
          Cursor, or any MCP-compatible AI client. No code. No setup. Just more intelligence.
        </p>
        <div class="hero-cta-wrap">
          <div class="hero-cta-row">
            <a href="https://app.veeliq.com/" class="btn-primary" target="_blank" rel="noopener">Get Started →</a>
            <a href="#skills" class="btn-ghost">See all skills</a>
          </div>
          <p class="hero-note">No AI model needed. No API keys. Just one MCP URL.</p>
          <div class="client-row">
            <span class="client-label">Works with</span>
            <span class="client-badge">Claude.ai</span>
            <span class="client-badge">Cursor</span>
            <span class="client-badge">+ any MCP client</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- sections added in subsequent tasks -->
```

- [ ] **Step 3: Open in browser and verify hero**

Expected:
- Cream background with faint `IQ` watermark behind hero ✓
- Headline animates in line-by-line with stagger ✓
- Line 1 `Give your` — dark text ✓
- Line 2 `AI more` — orange `#ff4d00` ✓
- Line 3 `IQ.` — orange outline (transparent fill) ✓
- Subtitle fades in after headline ✓
- Orange "Get Started →" button and ghost "See all skills" link visible ✓
- Client badges: Claude.ai, Cursor, + any MCP client ✓
- Rotating diamond geometry visible top-right ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add hero section with headline animation and CTA"
```

---

### Task 4: What It Is Section (3 Pillars)

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Add What It Is CSS** (inside `<style>`)

```css
/* ── What It Is ── */
.what-it-is {
  background: var(--bg-alt);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}
.what-header {
  margin-bottom: 3rem;
}
.what-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: var(--text);
  margin-top: 0.4rem;
}
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.pillar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid var(--orange);
  border-radius: 3px;
  padding: 2rem 1.8rem;
  transition: box-shadow 0.3s, transform 0.3s;
}
.pillar:hover {
  box-shadow: 0 8px 40px rgba(255,77,0,0.08);
  transform: translateY(-2px);
}
.pillar-title {
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}
.pillar-body {
  font-size: 0.78rem;
  line-height: 1.8;
  color: var(--muted);
  font-weight: 300;
}
```

- [ ] **Step 2: Add What It Is HTML** — replace `<!-- sections added in subsequent tasks -->` with:

```html
  <section class="what-it-is">
    <div class="section-wrap">
      <div class="what-header">
        <div class="eyebrow"><span>What is VeelIQ?</span></div>
        <h2 class="section-title what-title">Not another AI.<br>An upgrade for yours.</h2>
      </div>
      <div class="pillars">
        <div class="pillar">
          <div class="pillar-title">No new AI. No new app.</div>
          <p class="pillar-body">VeelIQ upgrades the AI you already have — it doesn't replace it. Keep using Claude.ai, Cursor, or whatever you love.</p>
        </div>
        <div class="pillar">
          <div class="pillar-title">Expert skills, on demand.</div>
          <p class="pillar-body">CRM analyst, email agent, code reviewer — subscribe to only the skills you need. Add more anytime, cancel anytime.</p>
        </div>
        <div class="pillar">
          <div class="pillar-title">MCP-native. Works everywhere.</div>
          <p class="pillar-body">One MCP server URL. Works with Claude.ai, Cursor, and any MCP-compatible client. No lock-in.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- sections added in subsequent tasks -->
```

- [ ] **Step 3: Open in browser and verify**

Expected:
- Warm off-white (`#f8f6f1`) background for this section ✓
- Eyebrow "What is VeelIQ?" in orange ✓
- Title "Not another AI. An upgrade for yours." ✓
- 3 cards in a row, each with orange top border ✓
- Cards lift slightly on hover ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add What It Is section with 3 differentiation pillars"
```

---

### Task 5: How It Works Section (Dark)

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Add How It Works CSS** (inside `<style>`)

```css
/* ── How It Works ── */
.how-it-works {
  background: var(--bg-dark);
  padding: 5rem 0;
  border-top: 2px solid var(--orange);
  position: relative;
  overflow: hidden;
}
.how-it-works .eyebrow { color: var(--orange); }
.how-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: #f0ebe2;
  margin-top: 0.4rem;
  margin-bottom: 3rem;
}
.steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 0;
}
.step {
  background: rgba(255,77,0,0.05);
  border: 1px solid rgba(255,77,0,0.16);
  border-radius: 3px;
  padding: 2rem 1.8rem;
  transition: background 0.3s;
}
.step:hover { background: rgba(255,77,0,0.09); }
.step-num {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 0.8rem;
}
.step-title {
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: -0.02em;
  color: #f0ebe2;
  margin-bottom: 0.6rem;
  line-height: 1.3;
}
.step-body {
  font-size: 0.78rem;
  line-height: 1.8;
  color: rgba(240,235,226,0.5);
  font-weight: 300;
}
.step-arrow {
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  margin-top: 2rem;
  color: var(--orange);
  font-size: 1.4rem;
  opacity: 0.5;
}
```

- [ ] **Step 2: Add How It Works HTML** — replace `<!-- sections added in subsequent tasks -->`:

```html
  <section class="how-it-works" id="how-it-works">
    <div class="section-wrap">
      <div class="eyebrow"><span>How It Works</span></div>
      <h2 class="section-title how-title">Three steps. That's it.</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">Step 01</div>
          <div class="step-title">Browse &amp; Subscribe</div>
          <p class="step-body">Pick skills from the VeelIQ catalog. CRM, email, research, code — subscribe to what fits your workflow.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-num">Step 02</div>
          <div class="step-title">Connect Your AI Client</div>
          <p class="step-body">Paste your personal MCP server URL into Claude.ai, Cursor, or any MCP-compatible AI client.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-num">Step 03</div>
          <div class="step-title">Skills Appear as Tools</div>
          <p class="step-body">Your subscribed skills instantly appear as native tools inside your AI. Use them in any conversation.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- sections added in subsequent tasks -->
```

- [ ] **Step 3: Open in browser and verify**

Expected:
- Dark background (`#0c0b09`) with orange top border ✓
- Orange eyebrow, cream title ✓
- 3 step cards in a row with `→` arrows between them ✓
- Cards have subtle orange-tinted background ✓
- Scrolling to `#how-it-works` via nav link works ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add How It Works dark section with 3-step flow"
```

---

### Task 6: Skill Catalog Preview Section

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Add Skill Catalog CSS** (inside `<style>`)

```css
/* ── Skill Catalog ── */
.skill-catalog {
  background: var(--bg);
  padding: 5rem 0;
  border-top: 1px solid var(--border);
}
.catalog-header {
  margin-bottom: 0.4rem;
}
.catalog-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: var(--text);
  margin-top: 0.4rem;
  margin-bottom: 0.6rem;
}
.catalog-sub {
  font-size: 0.82rem;
  color: var(--muted);
  font-style: italic;
  margin-bottom: 2rem;
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.skill-tag {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 0.4rem 0.9rem;
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: rgba(12,11,9,0.55);
  transition: border-color 0.25s, color 0.25s, background 0.25s;
  cursor: default;
}
.skill-tag:hover {
  border-color: var(--orange);
  color: var(--text);
  background: rgba(255,77,0,0.04);
}
.skill-tag.featured {
  background: rgba(255,77,0,0.07);
  border-color: rgba(255,77,0,0.3);
  color: var(--orange);
}
.skill-tag.featured:hover {
  background: rgba(255,77,0,0.12);
  border-color: var(--orange);
}
.catalog-link {
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255,77,0,0.35);
  transition: text-decoration-color 0.2s;
}
.catalog-link:hover { text-decoration-color: var(--orange); }
```

- [ ] **Step 2: Add Skill Catalog HTML** — replace `<!-- sections added in subsequent tasks -->`:

```html
  <section class="skill-catalog" id="skills">
    <div class="section-wrap">
      <div class="catalog-header eyebrow"><span>Skill Catalog</span></div>
      <h2 class="section-title catalog-title">50+ skills at launch.</h2>
      <p class="catalog-sub">From CRM intelligence to research agents — one subscription unlocks them all.</p>
      <div class="skill-tags">
        <span class="skill-tag featured">CRM Intelligence</span>
        <span class="skill-tag featured">Email Agent</span>
        <span class="skill-tag featured">Code Reviewer</span>
        <span class="skill-tag featured">Research Agent</span>
        <span class="skill-tag featured">Data Analyst</span>
        <span class="skill-tag">SEO Optimizer</span>
        <span class="skill-tag">Contract Reviewer</span>
        <span class="skill-tag">Meeting Summarizer</span>
        <span class="skill-tag">Social Media Writer</span>
        <span class="skill-tag">Lead Qualifier</span>
        <span class="skill-tag">Invoice Extractor</span>
        <span class="skill-tag">Support Triage</span>
        <span class="skill-tag">+ 40 more</span>
      </div>
      <a href="https://app.veeliq.com/" class="catalog-link" target="_blank" rel="noopener">Browse all skills →</a>
    </div>
  </section>

  <!-- sections added in subsequent tasks -->
```

- [ ] **Step 3: Open in browser and verify**

Expected:
- Cream background, orange eyebrow ✓
- Featured tags (CRM Intelligence etc.) appear in orange-tinted pill ✓
- Regular tags appear in neutral white pill ✓
- Tags wrap naturally on resize ✓
- Scrolling to `#skills` via "See all skills" hero link works ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add Skill Catalog preview section with featured tags"
```

---

### Task 7: Footer CTA + Footer + Ticker Strip

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Add Footer CSS** (inside `<style>`)

```css
/* ── Footer CTA ── */
.footer-cta {
  background: var(--bg-dark-2);
  padding: 6rem 0;
  text-align: center;
  border-top: 1px solid rgba(255,77,0,0.12);
}
.footer-cta-headline {
  font-family: var(--font-d), sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.05em;
  color: #f0ebe2;
  line-height: 1;
  margin-bottom: 1rem;
}
.footer-cta-headline .c-orange { color: var(--orange); }
.footer-cta-sub {
  font-size: 0.84rem;
  color: rgba(240,235,226,0.4);
  font-style: italic;
  margin-bottom: 2.5rem;
}
.btn-cta-large {
  display: inline-block;
  background: var(--orange);
  color: #fff;
  text-decoration: none;
  font-family: var(--font-d), sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1.1rem 2.4rem;
  border-radius: 2px;
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-cta-large:hover {
  background: var(--orange-2);
  box-shadow: 0 0 40px rgba(255,77,0,0.3);
}

/* ── Footer ── */
footer {
  background: var(--bg-dark);
  padding: 2rem 0;
  border-top: 1px solid rgba(255,77,0,0.08);
}
.footer-inner {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-logo svg text tspan:first-child { fill: #f0ebe2; }
.footer-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.footer-link {
  font-size: 0.62rem;
  color: rgba(240,235,226,0.3);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.footer-link:hover { color: rgba(240,235,226,0.7); }
.footer-copy {
  font-size: 0.6rem;
  color: rgba(240,235,226,0.2);
  letter-spacing: 0.04em;
}
```

- [ ] **Step 2: Add Footer CTA + Footer + Ticker HTML** — replace `<!-- sections added in subsequent tasks -->`:

```html
  <section class="footer-cta">
    <div class="section-wrap">
      <h2 class="footer-cta-headline">More <span class="c-orange">IQ.</span><br>Instantly.</h2>
      <p class="footer-cta-sub">Get started in under a minute. No credit card required to explore.</p>
      <a href="https://app.veeliq.com/" class="btn-cta-large" target="_blank" rel="noopener">Get Started at app.veeliq.com →</a>
    </div>
  </section>

  <footer>
    <div class="footer-inner">
      <a href="/" class="logo footer-logo">
        <svg width="100" height="24" viewBox="0 0 280 64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 14,0 20,56 6,56" fill="#f0ebe2"/>
          <polygon points="20,56 32,56 46,0 32,0" fill="#ff4d00"/>
          <text x="58" y="50" font-family="Unbounded, sans-serif" font-weight="900" font-size="46" letter-spacing="-2">
            <tspan fill="#f0ebe2">Veel</tspan><tspan fill="#ff4d00">IQ</tspan>
          </text>
        </svg>
      </a>
      <div class="footer-links">
        <a href="../coming-soon/privacy-policy.html" class="footer-link">Privacy Policy</a>
        <a href="../coming-soon/terms-of-service.html" class="footer-link">Terms of Service</a>
      </div>
      <span class="footer-copy">© 2026 VeelIQ</span>
    </div>
  </footer>

  <div class="ticker-wrap">
    <div class="ticker-track" id="tk"></div>
  </div>
```

- [ ] **Step 3: Open in browser and verify**

Expected:
- Dark (`#141310`) footer CTA section with orange headline accent ✓
- CTA button glows on hover ✓
- Dark footer with cream logo, muted links, copyright ✓
- Ticker strip at very bottom with scrolling orange text ✓
- Privacy Policy + Terms links resolve (they open the existing pages) ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add Footer CTA, footer, and ticker strip"
```

---

### Task 8: Mobile Responsive Styles

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Add mobile CSS** (inside `<style>`, at the very end before `</style>`)

```css
/* ════════════════════════════════
   RESPONSIVE — 800px
   ════════════════════════════════ */
@media (max-width: 800px) {

  body { cursor: auto; }
  .cursor, .cursor-ring { display: none; }

  /* Nav */
  .nav-inner { padding: 1rem 1.5rem; }
  .nav-links#nav-links-desktop { display: none; }
  .hamburger { display: flex; }
  .nav-drawer { display: flex; }

  /* Hero */
  .hero { padding: 3rem 0 2.5rem; }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-inline: 1.5rem;
  }
  .hero-bg-text { font-size: 38vw; right: -1rem; }
  .geo-diamond, .geo-diamond-sm { display: none; }
  h1 {
    font-size: clamp(2.8rem, 13vw, 4.5rem);
    letter-spacing: -0.05em;
  }
  .line-mask:nth-child(3) .line-inner { -webkit-text-stroke-width: 1.5px; }
  .hero-subtitle { font-size: 0.84rem; }
  .hero-cta-row { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
  .btn-primary { width: 100%; text-align: center; }

  /* Section padding */
  .section-wrap { padding-inline: 1.5rem; }
  .what-it-is, .how-it-works, .skill-catalog, .footer-cta { padding: 3.5rem 0; }

  /* What It Is */
  .pillars { grid-template-columns: 1fr; gap: 1rem; }

  /* How It Works */
  .steps { grid-template-columns: 1fr; }
  .step-arrow { display: none; }

  /* Footer CTA */
  .footer-cta-headline { font-size: clamp(1.8rem, 8vw, 2.6rem); }
  .btn-cta-large { width: 100%; text-align: center; }

  /* Footer */
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    padding-inline: 1.5rem;
    gap: 0.8rem;
  }

  /* Ticker */
  .ticker-item { font-size: 0.55rem; padding: 0 1.2rem; }
}

/* ════════════════════════════════
   RESPONSIVE — 400px
   ════════════════════════════════ */
@media (max-width: 400px) {
  h1 { font-size: 2.5rem; }
  .hero-bg-text { display: none; }
}
```

- [ ] **Step 2: Open in browser and verify at 375px (iPhone SE)**

Use browser DevTools → responsive mode → 375px wide.

Expected:
- Hamburger icon visible in nav, desktop links hidden ✓
- Hero: single column, headline stacked above subtitle ✓
- "Get Started" button full-width ✓
- "What It Is" pillars stacked vertically ✓
- "How It Works" steps stacked vertically, arrows hidden ✓
- Ticker still scrolls at bottom ✓
- No horizontal scroll at 375px ✓

- [ ] **Step 3: Verify at 800px breakpoint boundary**

Resize browser to exactly 800px wide.

Expected:
- Hamburger just appears (desktop nav just disappears) ✓
- Hero 2-column collapses to 1-column ✓

- [ ] **Step 4: Commit**

```bash
git add landing-page/index.html
git commit -m "feat: add mobile responsive styles — 800px and 400px breakpoints"
```

---

### Task 9: Final Smoke Test

**Files:**
- No code changes — verification only

- [ ] **Step 1: Full desktop pass (1280px wide)**

Open `landing-page/index.html` in Chrome. Check each section:

| Section | Check |
|---------|-------|
| Nav | Sticky, logo + links + CTA button. Clicking "How It Works" smooth-scrolls. Clicking "Skills" smooth-scrolls. "Get Started →" opens `https://app.veeliq.com/` in new tab. |
| Hero | 2-column layout. Headline animates in 3 lines. Line 2 orange, line 3 orange outline. Cursor dot + ring follow mouse. CTA buttons both work. |
| What It Is | 3-column pillars. Orange top border. Hover lift effect. |
| How It Works | Dark background. 3 steps + arrows. |
| Skill Catalog | Orange-tinted featured tags. All tags wrap cleanly. "Browse all skills" link works. |
| Footer CTA | Dark. CTA glow on hover. Button links to app. |
| Footer | Logo cream. Privacy Policy link opens `../coming-soon/privacy-policy.html`. Terms link opens `../coming-soon/terms-of-service.html`. |
| Ticker | Orange strip scrolling at bottom. |
| Top line | Orange gradient sweeping across very top of page. |

- [ ] **Step 2: Mobile pass (375px)**

DevTools responsive mode at 375px:

| Check | Expected |
|-------|---------|
| No horizontal scroll | ✓ |
| Hamburger opens/closes | ✓ |
| Hero single column | ✓ |
| Pillars stacked | ✓ |
| Steps stacked | ✓ |
| All buttons tappable | ✓ |

- [ ] **Step 3: Check browser console for errors**

Open DevTools → Console. Zero errors, zero warnings on page load.

- [ ] **Step 4: Fix any issues found, then commit**

```bash
git add landing-page/index.html
git commit -m "fix: landing page smoke test fixes"
```

If no issues found:

```bash
git commit --allow-empty -m "chore: landing page smoke test passed — no issues"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in |
|-----------------|-----------|
| Cream + dark contrast sections | Tasks 1, 5, 7 |
| Nav — sticky, logo, links, CTA | Task 2 |
| Nav — mobile hamburger | Tasks 2, 8 |
| Hero — 2-col, lineReveal animation | Task 3 |
| Hero — eyebrow, subtitle, client badges | Task 3 |
| Hero — BG watermark "IQ", geometrics | Task 3 |
| What It Is — 3 pillars, orange top border | Task 4 |
| How It Works — dark, 3 steps, arrows | Task 5 |
| Skill Catalog — featured tags, link | Task 6 |
| Footer CTA — dark, centered, CTA btn | Task 7 |
| Footer — logo, privacy/terms links | Task 7 |
| Ticker strip | Task 7 |
| Favicons from `../coming-soon/` | Task 1 |
| All entrance animations | Tasks 1, 3 |
| Mobile 800px breakpoint | Task 8 |
| Mobile 400px breakpoint | Task 8 |
| CTA links to `https://app.veeliq.com/` | Tasks 2, 3, 6, 7 |
| Smooth-scroll `#how-it-works`, `#skills` | Tasks 2, 5, 6 |
| Cursor tracking JS | Task 1 |
| Ticker JS | Task 1 |
| Hamburger JS | Task 2 |

All spec requirements are covered. No gaps found.
