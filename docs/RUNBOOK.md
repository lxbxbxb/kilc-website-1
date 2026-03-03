# KILC Website — Runbook

## Infrastructure

| Component | Details |
|-----------|---------|
| Domain | kilc.co.uk (Cloudflare proxy) |
| VPS | Hetzner 157.90.116.169 |
| SSH user | `deploy` (key: `~/.ssh/kilc_hetzner`) |
| Static files | `~/kilc-website/dist/` on VPS |
| Web server | nginx in Docker container `kilc-nginx` |
| Nginx config | `~/kilc-platform/nginx/conf.d/kilc-website.conf` |
| SSL | Cloudflare Full mode + origin cert at `~/kilc-platform/nginx/certs/kilc-origin.pem` |
| Analytics | Umami at https://analytics.kilc.co.uk |
| Email | Hostinger (MX via Cloudflare) |

## Deployment

### Normal Deploy (automatic)

Push to `main` — GitHub Actions runs:
1. `npx astro sync` → `tsc --noEmit` → `npm run build`
2. Uploads `dist/` artifact (1-day retention)
3. SCPs `dist/` to `~/kilc-website/dist/` on VPS
4. SCPs nginx config to `~/kilc-platform/nginx/conf.d/`
5. Runs `docker exec kilc-nginx nginx -s reload`

**Required GitHub Secrets**: `HETZNER_SSH_HOST`, `HETZNER_SSH_USER`, `HETZNER_SSH_KEY`

### Manual Deploy

```bash
npm run build
scp -r dist/ deploy@157.90.116.169:~/kilc-website/dist/
ssh deploy@157.90.116.169 "docker exec kilc-nginx nginx -s reload"
```

### Rollback

Re-run a previous successful GitHub Actions workflow via the Actions UI, or:

```bash
git revert HEAD
git push
# CI deploys the reverted build automatically
```

## CMS OAuth Proxy (Cloudflare Worker)

The CMS login (`/admin/`) uses a self-hosted OAuth proxy instead of Netlify.

| Component | Details |
|-----------|---------|
| Worker name | `sveltia-cms-auth` |
| Worker URL | `https://sveltia-cms-auth.shy-star-b244.workers.dev` |
| Cloudflare account | `shy-star-b244.workers.dev` subdomain |
| GitHub OAuth App | **KILC CMS** (under kilc-uk org) |
| Secrets | Stored as Cloudflare Worker secrets — never in git |

### Rotating the GitHub OAuth secret

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → KILC CMS**
2. Click **Generate a new client secret** — save the new value
3. Update the Worker secret: `wrangler secret put GITHUB_CLIENT_SECRET` (run from `/tmp/sveltia-cms-auth`)
4. The old secret is immediately invalid

### Re-deploying the Worker

```bash
cd /tmp/sveltia-cms-auth   # or re-clone: git clone https://github.com/sveltia/sveltia-cms-auth.git
npm install
wrangler login
wrangler deploy
```

## Monitoring

- **Site up?** Visit https://kilc.co.uk
- **Analytics?** https://analytics.kilc.co.uk (Umami dashboard)
- **Build status?** GitHub Actions tab → `deploy.yml`

## Common Issues

### Site shows old content

nginx may be caching. Reload nginx:
```bash
ssh deploy@157.90.116.169 "docker exec kilc-nginx nginx -s reload"
```

### Build fails in CI

Check the Actions log. Common causes:
- Type error → run `npx tsc --noEmit` locally to reproduce
- Missing i18n key → add to both `en.json` and `zh.json`
- Broken import → run `npx astro sync` then rebuild
- Invalid blog frontmatter → ensure every `.md` in `src/content/blog/en/` and `src/content/blog/zh/` has required fields (`title`, `date`, `excerpt`)

### SSL certificate error

Origin cert at `~/kilc-platform/nginx/certs/kilc-origin.pem` on VPS. Managed by Cloudflare — do not regenerate without updating Cloudflare settings.

### CMS login fails / 404 on GitHub consent

- Confirm callback URL in **GitHub → OAuth Apps → KILC CMS** is exactly:
  `https://sveltia-cms-auth.shy-star-b244.workers.dev/callback`
- Confirm the user is a collaborator on `kilc-uk/kilc-website`
- Check Worker is live: `curl https://sveltia-cms-auth.shy-star-b244.workers.dev`
- Check `public/admin/config.yml` has `base_url: https://sveltia-cms-auth.shy-star-b244.workers.dev`

### Email broken

Do **not** modify Cloudflare DNS. Contact Hostinger support if MX records need updating. DKIM/SPF/DMARC records are in Cloudflare — any change breaks email delivery.

### nginx 502 / blank page

```bash
ssh deploy@157.90.116.169 "docker ps"          # confirm kilc-nginx is running
ssh deploy@157.90.116.169 "docker logs kilc-nginx --tail 50"
```

If container is stopped:
```bash
ssh deploy@157.90.116.169 "cd ~/kilc-platform && docker compose up -d kilc-nginx"
```
