# Contributing to KILC Website

## Stack

- **Astro 5** — static site generator, file-based routing
- **Tailwind CSS 3** — utility-first styling with custom brand tokens
- **TypeScript** — strict type checking via `tsconfig.json`
- **i18n** — English (`/`) + Chinese (`/zh/`) with alternate slugs

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:4321 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npx astro sync` | Generate `.astro/` types (run before `tsc`) |
| `npx tsc --noEmit` | Type check without emitting files |

## Development Workflow

1. `npm run dev` — start local server
2. Make changes — Astro hot-reloads
3. `npx astro sync && npx tsc --noEmit` — confirm types pass
4. `npm run build` — confirm 38 pages build with zero errors
5. Commit and push to `main` — CI deploys automatically

## Adding a New Page

```bash
# 1. Create the EN page
touch src/pages/new-page.astro

# 2. Create the ZH page
touch src/pages/zh/new-page.astro

# 3. Add translation keys to both i18n files
# src/i18n/en.json + src/i18n/zh.json

# 4. If the ZH slug differs from EN, add to zhSlugMap in src/i18n/utils.ts

# 5. Build to validate
npm run build
```

## Adding a Translation Key

1. Add the key to `src/i18n/en.json`
2. Add the same key to `src/i18n/zh.json`
3. Use in any `.astro` file: `t(locale, 'section.key')`

## Hero Images

Each page must have a **unique** hero background image. Available images are in `public/images/hero/` and `public/images/services/`. When adding a page, assign a unique image not already used by another page via the `backgroundImage` prop on `<Hero>`.

## Styling

- Use Tailwind utility classes for all styling
- Use named brand tokens (`bg-brand-primary`, `text-brand-dark`, etc.) — never hardcode hex values in templates
- Custom utilities go in `src/styles/global.css`

## Before Committing

```bash
npm run build              # Must succeed — no warnings, 38 pages
npx astro sync
npx tsc --noEmit           # Must succeed — zero type errors
git status                 # Review changed files
```

Never commit if either check fails.
