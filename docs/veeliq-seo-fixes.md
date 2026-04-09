# VeelIQ.com - SEO Fix Instructions

> Instructions for Claude Code to implement all SEO improvements on the veeliq.com static site.
> All edits target `index.html` unless otherwise noted.

---

## 1. Add Meta Description

**File:** `index.html`

Inside `<head>`, add after the `<title>` tag:

```html
<meta name="description" content="VeelIQ gives your AI expert skills via MCP. Subscribe to 50+ on-demand skills that appear as native tools in Claude.ai, Cursor, or any MCP-compatible client. No code. No setup.">
```

Also add Open Graph and Twitter Card tags for social sharing:

```html
<meta property="og:title" content="VeelIQ - Skills as a Service for your AI">
<meta property="og:description" content="Subscribe to expert AI skills that appear as native tools in Claude.ai, Cursor, or any MCP-compatible client. No code. No setup.">
<meta property="og:url" content="https://www.veeliq.com/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://www.veeliq.com/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="VeelIQ - Skills as a Service for your AI">
<meta name="twitter:description" content="Subscribe to expert AI skills that appear as native tools in Claude.ai, Cursor, or any MCP-compatible client.">
```

---

## 2. Improve the Title Tag

**File:** `index.html`

Replace the current `<title>`:

```html
<!-- BEFORE -->
<title>Give your AI more IQ.</title>

<!-- AFTER -->
<title>VeelIQ - Expert AI Skills via MCP | Claude.ai & Cursor</title>
```

---

## 3. Add Structured Data (JSON-LD)

**File:** `index.html`

Add the following `<script>` block just before `</body>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.veeliq.com/#organization",
      "name": "VeelIQ",
      "url": "https://www.veeliq.com/",
      "logo": "https://www.veeliq.com/logo.png",
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://www.veeliq.com/#website",
      "url": "https://www.veeliq.com/",
      "name": "VeelIQ",
      "publisher": { "@id": "https://www.veeliq.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://app.veeliq.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "VeelIQ",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Skills as a Service for AI. Subscribe to expert skills that appear as native tools in Claude.ai, Cursor, or any MCP-compatible AI client.",
      "url": "https://www.veeliq.com/",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free to explore, no credit card required"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is VeelIQ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VeelIQ is a Skills as a Service platform. You subscribe to expert skills that appear as native tools inside Claude.ai, Cursor, or any MCP-compatible AI client - no code or setup required."
          }
        },
        {
          "@type": "Question",
          "name": "How does VeelIQ work with Claude.ai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VeelIQ provides a personal MCP server URL. You paste it into Claude.ai's connector settings, and your subscribed skills instantly appear as native tools in every conversation."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to write code to use VeelIQ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. VeelIQ requires zero lines of code. You connect by pasting one MCP server URL into your AI client."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 4. Create `robots.txt`

**File:** `robots.txt` (create in site root)

```
User-agent: *
Allow: /

Sitemap: https://www.veeliq.com/sitemap.xml
```

---

## 5. Create `sitemap.xml`

**File:** `sitemap.xml` (create in site root)

Update `lastmod` to today's date:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.veeliq.com/</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.veeliq.com/privacy-policy.html</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.veeliq.com/terms-of-service.html</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## 6. Add Canonical Tag

**File:** `index.html`

Inside `<head>`, add:

```html
<link rel="canonical" href="https://www.veeliq.com/">
```

Also ensure the site consistently redirects `http://` and `veeliq.com` (non-www) to `https://www.veeliq.com/`. If using a static host (Netlify, Vercel, etc.), add a redirect rule:

**Netlify (`_redirects`):**
```
http://veeliq.com/*  https://www.veeliq.com/:splat  301!
http://www.veeliq.com/*  https://www.veeliq.com/:splat  301!
https://veeliq.com/*  https://www.veeliq.com/:splat  301!
```

**Vercel (`vercel.json`):**
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "veeliq.com" }],
      "destination": "https://www.veeliq.com/$1",
      "permanent": true
    }
  ]
}
```

---

## 7. Add a FAQ Section to `index.html`

Add a visible FAQ section to the page (this feeds the FAQPage schema above and gives Google text to index). Place it before the final CTA section:

```html
<section id="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently Asked Questions</h2>

  <details>
    <summary>What is VeelIQ?</summary>
    <p>VeelIQ is a Skills as a Service platform. Subscribe to expert AI skills that appear as native tools inside Claude.ai, Cursor, or any MCP-compatible client - no code or setup required.</p>
  </details>

  <details>
    <summary>How does VeelIQ work with Claude.ai?</summary>
    <p>VeelIQ gives you a personal MCP server URL. Paste it into Claude.ai's connector settings and your subscribed skills instantly appear as native tools in every conversation.</p>
  </details>

  <details>
    <summary>Do I need to write code to use VeelIQ?</summary>
    <p>No. Zero lines of code required. Just paste one MCP URL into your AI client and you're set up in under a minute.</p>
  </details>

  <details>
    <summary>Which AI clients does VeelIQ support?</summary>
    <p>VeelIQ works with Claude.ai, Cursor, and any MCP-compatible AI client. One subscription, any client.</p>
  </details>

  <details>
    <summary>How many skills are available?</summary>
    <p>VeelIQ launches with 50+ expert skills covering CRM intelligence, email, code review, data analysis, SEO, research, and more.</p>
  </details>
</section>
```

---

## 8. Fix Image Alt Text

**File:** `index.html`

Check all `<img>` tags and ensure every one has a descriptive `alt` attribute. Example:

```html
<!-- BEFORE -->
<img src="logo.svg">

<!-- AFTER -->
<img src="logo.svg" alt="VeelIQ logo - Skills as a Service for AI">
```

---

## 9. Add `lang` Attribute to `<html>`

**File:** `index.html`

```html
<!-- BEFORE -->
<html>

<!-- AFTER -->
<html lang="en">
```

---

## 10. Verify and Submit to Google Search Console

After deploying all changes:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add and verify `https://www.veeliq.com/`
3. Submit the sitemap: `https://www.veeliq.com/sitemap.xml`
4. Use the URL Inspection tool to request indexing of the homepage

---

## Priority Order

| Priority | Task | Impact |
|---|---|---|
| 1 | Submit sitemap + GSC verification | Indexation |
| 2 | Meta description + title tag | CTR in SERPs |
| 3 | JSON-LD structured data | Rich results |
| 4 | Canonical tag + redirects | Crawl hygiene |
| 5 | FAQ section | Indexable content + featured snippets |
| 6 | `lang`, alt text, robots.txt | Technical compliance |
