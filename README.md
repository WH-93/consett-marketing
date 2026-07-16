# Ross Webster Tree Services — Static Site

Static export of the Ross Webster Tree Services brochure site. Deployed to AWS S3 + CloudFront. Domain management via CloudFlare.

Source repo (full version with backend): `tree-surgeon-test-1`

## Architecture

```
                          DEMO PHASE (now)
              Users → CloudFront (d123.cloudfront.net) → S3

                          WITH DOMAIN (future)
    Users → CloudFlare DNS → CloudFront (rosswebstertreeservices.co.uk) → S3
```

- **S3**: Static website files. Private — accessible only via CloudFront OAI.
- **CloudFront**: HTTPS, edge caching, free CloudFront URL for demo.
- **CloudFlare**: Domain registrar and DNS (not used yet — no domain purchased).

## Local Development

```bash
npm install
npm run dev        # Next.js dev server on :3000
npm run build      # Static export to out/
```

## Deployment

Triggered automatically on push to `main` via GitHub Actions.

Manual deploy:
```bash
npm ci
npm run build
aws s3 sync out/ s3://ross-webster-static --delete
```

## Adding a Domain

1. Ross buys domain via CloudFlare (e.g. `rosswebstertreeservices.co.uk`)
2. Request ACM certificate for the domain in `eu-west-2`
3. Add domain as alternate name on CloudFront distribution
4. Point CloudFlare DNS CNAME at the CloudFront distribution URL
5. Verify HTTPS resolves correctly

## Tech Stack

- Next.js 14 (static export)
- Tailwind CSS
- TypeScript

## Files Stripped (from source repo)

- `src/app/api/` — API routes (not needed for static)
- `src/app/admin/` — Admin panel (not needed for static)
- `src/app/jobs/` — Job listings (not needed for static)
- `prisma/` — Database (not needed for static)

Full version preserved in `tree-surgeon-test-1` for when a backend is needed.
