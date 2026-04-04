# VeelIQ Landing Page — Design Spec
**Date:** 2026-04-04  
**Output:** `landing-page/index.html` (single self-contained file)

---

## Overview

A full marketing landing page for VeelIQ. Light-themed, same design system as `coming-soon/index.html` (Unbounded + Epilogue fonts, `#ff4d00` orange accent, custom cursor, ticker strip). Key difference: cream base with dark contrast sections, not the dark-first coming-soon.

**Product positioning:** VeelIQ is a Skills as a Service platform. Skills appear as native MCP tools inside the user's existing AI client (Claude.ai, Cursor, or any MCP-compatible client). VeelIQ does NOT provide a chat UI, does NOT run its own AI model, and does NOT manage API keys. It only runs an MCP server that exposes subscribed skills as tools.

---

## Visual Design System

Inherit all tokens from the coming-soon page:

| Token | Value |
|-------|-------|
| `--bg` | `#f0ebe2` (cream — inverted from dark) |
| `--bg-alt` | `#f8f6f1` (warm off-white for alternating sections) |
| `--bg-dark` | `#0c0b09` (dark sections: How It Works, Footer) |
| `--bg-dark-2` | `#141310` (Footer CTA section) |
| `--surface` | `#ffffff` |
| `--orange` | `#ff4d00` |
| `--orange-2` | `#ff7733` |
| `--orange-dim` | `rgba(255,77,0,0.1)` |
| `--text` | `#0c0b09` |
| `--muted` | `rgba(12,11,9,0.45)` |
| `--border` | `rgba(12,11,9,0.1)` |
| `--border-dark` | `rgba(255,77,0,0.14)` |
| `--font-d` | `'Unbounded', sans-serif` |
| `--font-b` | `'Epilogue', sans-serif` |

**Keep from coming-soon:**
- Custom cursor (dot + ring, `cursor:none` on desktop)
- Animated top-line (orange gradient scan)
- Ticker strip at bottom
- BG watermark text (`IQ`) in hero
- `rotateSlow` geometric decorations
- Grain overlay (`body::after`)
- `fadeSlideDown / fadeSlideUp / lineReveal` entrance animations

---

## Page Structure

### ① Navigation
- **Layout:** fixed top, `position: sticky`
- **Left:** VeelIQ logo SVG (same as coming-soon)
- **Right:** nav links (`How It Works`, `Skills`) + primary CTA button `Get Started →`
- **CTA link:** `https://app.veeliq.com/`
- **Background:** cream `#f0ebe2` with subtle bottom border
- **Mobile:** hamburger menu hidden behind toggle; CTA button stays visible

### ② Hero
- **Layout:** 2-column grid (50/50) on desktop, stacked on mobile
- **Left col:** eyebrow line + headline
- **Right col:** subtext + CTA + note + client badges
- **Headline (3 lines, `lineReveal` animation):**
  - Line 1: `Give your` (cream text)
  - Line 2: `AI more` (orange `#ff4d00`)
  - Line 3: `IQ.` (outline stroke, orange)
- **Subtext:** *"Subscribe to expert skills that appear as native tools inside Claude.ai, Cursor, or any MCP-compatible AI client. No code. No setup. Just more intelligence."*
- **Primary CTA:** `Get Started →` → `https://app.veeliq.com/`
- **Secondary CTA:** `See all skills` (anchor link to skill catalog section)
- **Note below CTA:** *"No AI model needed. No API keys. Just one MCP URL."*
- **Client badges row:** `Works with` label + `Claude.ai` · `Cursor` · `+ any MCP client`
- **Background decoration:** `IQ` watermark text (outline, low opacity), rotating diamond geometrics

### ③ What It Is
- **Background:** warm off-white `#f8f6f1`
- **Eyebrow:** `What is VeelIQ?`
- **Title:** `Not another AI. An upgrade for yours.`
- **Layout:** 3-column grid of pillar cards (stacked on mobile)
- **Cards have orange top-border accent**
- **Pillar 1:** `No new AI. No new app.` — VeelIQ upgrades the AI you already have — it doesn't replace it. Keep using Claude.ai, Cursor, or whatever you love.
- **Pillar 2:** `Expert skills, on demand.` — CRM analyst, email agent, code reviewer — subscribe to only the skills you need. Add more anytime.
- **Pillar 3:** `MCP-native. Works everywhere.` — One MCP server URL. Works with Claude.ai, Cursor, and any MCP-compatible client. No lock-in.

### ④ How It Works
- **Background:** dark `#0c0b09` (matches coming-soon)
- **Eyebrow:** `How It Works`
- **Title:** `Three steps. That's it.` (cream text)
- **Layout:** 3-column step cards with `→` arrows between (stacked on mobile, arrows become `↓`)
- **Card style:** `rgba(255,77,0,0.06)` background, `rgba(255,77,0,0.18)` border — same as coming-soon dark surface
- **Step 01 — Browse & Subscribe:** Pick skills from the VeelIQ catalog. CRM, email, research, code — subscribe to what fits your workflow.
- **Step 02 — Connect Your AI Client:** Paste your personal MCP server URL into Claude.ai, Cursor, or any MCP-compatible AI client.
- **Step 03 — Skills Appear as Tools:** Your subscribed skills instantly appear as native tools inside your AI. Use them in any conversation.

### ⑤ Skill Catalog Preview
- **Background:** cream `#f0ebe2`
- **Eyebrow:** `Skill Catalog`
- **Title:** `50+ skills at launch.`
- **Subtitle:** *"From CRM intelligence to research agents — one subscription unlocks them all."*
- **Tag cloud:** featured skills in orange-tint pill (CRM Intelligence, Email Agent, Code Reviewer, Research Agent, Data Analyst), remaining in neutral pill (SEO Optimizer, Contract Reviewer, Meeting Summarizer, Social Media Writer, + 40 more)
- **Link:** `Browse all skills →` (links to `https://app.veeliq.com/`)

### ⑥ Footer CTA
- **Background:** `#141310`
- **Layout:** centered
- **Headline:** `More IQ. Instantly.` (orange on `IQ`)
- **Subtext:** *"Get started in under a minute. No credit card required to explore."*
- **CTA Button:** `Get Started at app.veeliq.com →`

### ⑦ Footer
- **Background:** `#0c0b09`
- **Left:** VeelIQ logo
- **Center:** `Privacy Policy` · `Terms of Service` links (pointing to `../coming-soon/privacy-policy.html` and `../coming-soon/terms-of-service.html`)
- **Right:** `© 2026 VeelIQ`

### ⑧ Ticker Strip
- Same as coming-soon: orange background, scrolling uppercase text
- Words: `VeelIQ` · `Skills as a Service` · `AI Intelligence` · `Plug & Play Skills` · `No Code Required` · `Claude.ai · Cursor · MCP`

---

## Favicon / Meta

Use assets from `../coming-soon/`:
```html
<link rel="icon" type="image/png" href="../coming-soon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="../coming-soon/favicon.svg" />
<link rel="shortcut icon" href="../coming-soon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="../coming-soon/apple-touch-icon.png" />
<link rel="manifest" href="../coming-soon/site.webmanifest" />
```

---

## Responsive / Mobile

Breakpoint: `max-width: 800px`

- `cursor: auto`, hide `.cursor` and `.cursor-ring`
- Nav: hide text links, keep logo + CTA button; add hamburger for links
- Hero: single column, stacked; headline font size `clamp(2.8rem, 13vw, 4.5rem)`
- What It Is pillars: single column stack
- How It Works steps: single column, arrows change from `→` to none
- Skill tags: wrap naturally (already flex-wrap)
- Footer: stack logo / links / copyright vertically

Breakpoint: `max-width: 400px`
- Headline: `2.5rem`

---

## Animations

All entrance animations from coming-soon apply:
- Header: `fadeSlideDown` delay 0.3s
- Eyebrow: `fadeSlideRight` delay 0.9s
- H1 lines: `lineReveal` staggered 1.4s / 1.75s / 2.1s
- Subtitle: `fadeSlideUp` delay 2.2s
- CTA area: `fadeSlideUp` delay 2.8s
- Skills tags: `fadeSlideUp` delay 3.4s

---

## Implementation Notes

- Single `landing-page/index.html` file, all CSS and JS inline (same pattern as coming-soon)
- No external JS dependencies
- Google Fonts: Unbounded + Epilogue (same `<link>` tags)
- Supabase integration: **not needed** (no waitlist form on this page)
- CTA buttons: plain `<a href="https://app.veeliq.com/">` tags styled as buttons
- `id` anchors on sections for nav smooth-scroll: `#how-it-works`, `#skills`
- Add `.superpowers/` to `.gitignore`
