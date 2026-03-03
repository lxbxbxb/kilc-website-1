# CLAUDE.md — Developer Instructions for Claude Code

## Project Overview

**KILC Website** is a live Astro 5 static site (kilc.co.uk) with 44 pages, TypeScript, Tailwind CSS, and English + Chinese i18n.

- **Framework**: Astro 5 (static generation)
- **Styling**: Tailwind CSS 3.4.19 with custom brand tokens
- **i18n**: English (default `/en/*`) and Chinese (`/zh/*`) with alternate slugs
- **Analytics**: Umami (analytics.kilc.co.uk, embedded in BaseLayout.astro)
- **Status**: Production live

## Key Architecture

### Brand Colors (Tailwind Tokens)

Located in `tailwind.config.mjs` under `theme.extend.colors.brand`:

```
primary:   #C5A059 (gold/bronze)
secondary: #A8854A (deeper bronze)
dark:      #1C1A17 (near-black)
accent:    #C5A059 (gold/bronze)
light:     #F8F6F2 (warm off-white)
text:      #1C1A17 (body)
footer:    #E5E7EB (light slate gray)
```

Changes require testing all 44 pages locally before committing.

### i18n System

- **Files**: `src/i18n/en.json`, `src/i18n/zh.json`, `src/i18n/utils.ts`
- **Function**: `t(locale, 'key.path')` for nested translation lookup
- **Alternate Slugs**: ZH pages may have different URLs (e.g., `/global-market-navigation` → `/zh/global-market-strategy`)
- **Mapping**: See `zhSlugMap` and `enSlugMap` in `src/i18n/utils.ts`
- **SEO**: Hreflang links in BaseLayout.astro for lang-specific alternates

### Core Layouts & Components

- **BaseLayout.astro**: Master layout with Umami analytics script, hreflang tags, Open Graph meta
- **Global Styles**: `src/styles/global.css` (Tailwind directives + custom utilities)
- **Font**: `system-ui` primary, `Noto Sans SC` for Chinese glyphs (self-hosted woff2 in `/fonts/`)

## Development Workflow

### Before Coding

Always run type generation before TypeScript checks:

```bash
npx astro sync    # Generate .astro/ types
npx tsc --noEmit  # Type check (must succeed before commit)
```

### Code Changes

1. **Pages**: Add `.astro` files to `src/pages/` — Astro auto-routes by filename
2. **Components**: Extract reusable Astro components to `src/components/`
3. **Styling**: Use Tailwind classes; add custom utilities to `global.css` if needed
4. **i18n**: Add translation keys to `en.json` and `zh.json`

### Before Commit

```bash
npm run build          # Full production build (validates all pages)
npx astro sync && npx tsc --noEmit  # Type safety
git status            # Verify expected changes
```

**Never commit** if `npm run build` or `tsc` fail.

## What NOT to Touch

### Sacred Files (Design/DNS/Secrets)

- `tailwind.config.mjs` — Brand colors are production-locked; contact design team if changes needed
- `.github/workflows/deploy.yml` — Deployment pipeline; any changes require review
- Cloudflare DNS records (DKIM, SPF, DMARC) — Maintained externally; will break email
- `src/layouts/BaseLayout.astro` — Umami analytics ID hardcoded; changes affect tracking

### Hostinger Email

- MX records unchanged on Cloudflare
- Do not modify email forwarding rules
- DKIM/SPF/DMARC records managed via Cloudflare — breaking these breaks email

## Deployment Details

### GitHub Actions (`deploy.yml`)

Triggers on `push main`:

1. **Build Job**: `npx astro sync` → `tsc --noEmit` → `npm run build`
2. **Artifact**: `dist/` uploaded (1-day retention)
3. **Deploy Job**: SCP dist/ and nginx config to VPS, reload nginx

**Required GitHub Secrets**:
- `HETZNER_SSH_HOST`: 157.90.116.169
- `HETZNER_SSH_USER`: deploy
- `HETZNER_SSH_KEY`: Private SSH key (~/.ssh/kilc_hetzner locally)

### VPS Deployment Target

- **Host**: 157.90.116.169 (Hetzner)
- **User**: deploy
- **Static files**: ~/kilc-website/dist/ (SCP target)
- **Nginx config**: ~/kilc-platform/nginx/conf.d/kilc-website.conf
- **Docker**: kilc-nginx container (receives `docker exec kilc-nginx nginx -s reload`)

### Cloudflare

- Proxies kilc.co.uk → 157.90.116.169
- Full SSL mode
- Origin cert: ~/kilc-platform/nginx/certs/kilc-origin.pem (on VPS)

## i18n Guidelines

### Adding a New Translation

1. Add key to both `en.json` and `zh.json` (same structure)
2. Use in component: `t(locale, 'section.key')`
3. For alternate ZH slug, update `zhSlugMap` in `utils.ts`
4. Verify hreflang links work in browser devtools

### Alternate Slug Example

```typescript
const zhSlugMap: Record<string, string> = {
  "/page-name": "/zh/page-slug-in-chinese",
  // ...
};
```

- EN page at `/page-name` maps to ZH at `/zh/page-slug-in-chinese`
- Not all pages need alternate slugs (default: `/zh` + EN slug)

## Common Tasks

### Add a Blog Post

Blog posts live in `src/content/blog/en/` as `.md` files. Required frontmatter:

```yaml
---
title: "Post title"
date: "2026-01-01"
author: "Author name"        # optional
coverImage: "/images/..."    # optional
tags: ["Tag One", "Tag Two"] # optional
excerpt: "Card summary (1–2 sentences)."
featured: false              # true = pinned to top of /blogs
---
```

- EN: `src/content/blog/en/` → `/blogs` (CMS: **Blog Posts (English)**)
- ZH: `src/content/blog/zh/` → `/zh/blogs` (CMS: **Blog Posts (Chinese)**)
- Posts per locale are independent — no need to mirror across languages

### Add a New Page

```bash
# Create EN page
touch src/pages/new-page.astro

# Add translations
# → Edit src/i18n/en.json and src/i18n/zh.json

# Add to nav/menus in components (e.g., Header.astro)

# Test locally
npm run dev

# Build & deploy
npm run build
git add . && git commit -m "feat: add new-page" && git push
```

### Update Analytics

Umami script is in `src/layouts/BaseLayout.astro` (line 58). **Do not modify Website ID** (c3272e3b-c8cc-4770-9fa0-55f10d8a162c) unless instructed.

### Adjust Brand Colors

Edit `tailwind.config.mjs` under `theme.extend.colors.brand`. Rebuild and test all 44 pages locally before committing.

## Troubleshooting

### Build Fails

```bash
npx astro sync  # Regenerate types
npm run build   # Try again
```

### Type Errors

```bash
npx tsc --noEmit  # Detailed error messages
```

### i18n Links Broken

Check `src/i18n/utils.ts`:
- Does `getLocaleFromUrl()` detect locale correctly?
- Does `getAlternateUrl()` map alternate slugs?
- Are hreflang links in BaseLayout.astro pointing to correct paths?

### Email Not Sending

Do not modify Cloudflare DNS. Contact email provider (Hostinger) if MX records need updating.

## Related Documentation

- See `README.md` for quick-start and setup
- Astro docs: https://docs.astro.build
- Tailwind docs: https://tailwindcss.com
- This project does not have a separate API or backend — pure static site

## Contacts & Handoff

- Production domain: kilc.co.uk (Cloudflare)
- Analytics: https://analytics.kilc.co.uk (Umami)
- VPS host: Hetzner (157.90.116.169)
- Email: Hostinger (MX records on Cloudflare)
- Deploy key: ~/.ssh/kilc_hetzner (local development only)

---

**Last Updated**: March 3, 2026 (ZH blog added: /zh/blogs + /zh/blogs/[slug], blog-zh CMS collection; author optional; page count 42→44)
