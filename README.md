# riyad-tech

The public site. Next.js 15, TypeScript, Tailwind v4.

Every page is static. Content comes from `riyad-api` at build time and is
rebuilt when the admin panel saves something — so a visitor is served a file,
and **the site stays up even when the API is down**. It simply stops showing
new edits, which is the correct failure mode for a marketing site.

## Running it

```bash
npm install
cp .env.local.example .env.local
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

With `API_URL` empty the site builds from `content/site.ts` alone. That is not
a fallback bolted on later — it is how the site was built, and it is why
Vercel can deploy it before the API exists.

## Environment

| Variable | What it does |
| --- | --- |
| `API_URL` | Where riyad-api is, read at build time only |
| `NEXT_PUBLIC_API_URL` | Same address, read in the browser by the forms and the portal |
| `NEXT_PUBLIC_SITE_URL` | This site's own address, used in the sitemap and metadata |
| `REVALIDATE_SECRET` | Must match the value in riyad-api, or saving in the admin will not refresh the site |

## Structure

```
app/            routes; every page a server component
components/     sections of the site
components/ui/  primitives with no content of their own
content/site.ts every string that is not in the database
lib/api.ts      the only file that knows riyad-api exists
lib/portal.ts   the browser's connection for the customer portal
```

## Conventions

- Colour comes only from the eight tokens in `app/globals.css`. No others.
- `--marker` is a highlight background, never text and never a button fill —
  it fails contrast on `--paper`.
- No animation library. CSS transitions and one IntersectionObserver.
- Content that lives in the database is passed down as props; components never
  reach for it themselves.