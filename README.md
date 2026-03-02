# KILC Website

Astro 5 static site with Tailwind CSS and TypeScript. 38 pages in English and Chinese (i18n). **Live at kilc.co.uk**

## Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:4321)
npm run dev

# Type checking (must run after code changes)
npx astro sync
npx tsc --noEmit

# Production build
npm run build

# Preview build locally
npm run preview
```

## Key Commands

- `npm run dev` — Start local dev server
- `npm run build` — Build static site to `dist/`
- `npx astro sync` — Generate `.astro/` types (run before `tsc`)
- `npx tsc --noEmit` — Type check (no emit)

## Brand Colors

Defined as Tailwind tokens in `tailwind.config.mjs`:

```
brand.primary:   #9A7B3C (warm gold) — links, hover, accents
brand.secondary: #7A5E28 (deep gold) — gradients, dark accents
brand.dark:      #1C1A17 (navy) — footer, strong headings
brand.accent:    #C4953A (bright gold) — CTA buttons
brand.light:     #F8F6F2 (off-white) — section backgrounds
brand.text:      #1C1A17 (body text)
```

## Project Structure

```
src/
├── pages/          (38 .astro files + i18n routes)
├── components/     (reusable Astro components)
├── layouts/        (BaseLayout.astro + analytics)
├── i18n/           (en.json, zh.json, utils.ts)
└── styles/         (global.css, Tailwind)
```

## i18n Setup

- Default route: `/en/*` (English)
- Chinese routes: `/zh/*` with alternate slugs (see `src/i18n/utils.ts`)
- Function `t(locale, 'key.path')` for translations
- Alternate hreflang links in BaseLayout for SEO

## Analytics

Umami tracking script in `src/layouts/BaseLayout.astro`:
- Site: https://analytics.kilc.co.uk
- Website ID: `c3272e3b-c8cc-4770-9fa0-55f10d8a162c`

## Deployment

**Automatic via GitHub Actions on push to `main`**

1. Run `npx astro sync && npx tsc && npm run build`
2. SCP `dist/` to VPS at `~/kilc-website/dist/`
3. SCP nginx config to `~/kilc-platform/nginx/conf.d/`
4. Reload nginx in Docker (`kilc-nginx`)

Requires secrets in GitHub: `HETZNER_SSH_HOST`, `HETZNER_SSH_USER`, `HETZNER_SSH_KEY`

**VPS Details**
- Host: 157.90.116.169
- SSH user: `deploy` (key: `~/.ssh/kilc_hetzner`)
- Docker container: `kilc-nginx`
- Cloudflare: Full SSL mode, origin cert at `~/kilc-platform/nginx/certs/kilc-origin.pem`

## Email & DNS

- Hosted on Hostinger (MX records unchanged)
- DKIM / SPF / DMARC in Cloudflare DNS — **do not modify**

## Learning Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- TypeScript config in `tsconfig.json`
