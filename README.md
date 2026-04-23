# ApplyBot

> One form. Thousand applications.

Fill out your profile once. Our AI finds and applies to every job that fits, with tailored cover letters included.

**Status:** v0 skeleton — landing page + profile/apply demo route. Real AI submission not yet wired.

**Landing:** https://applybot.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 apply form — name, email, top 3 skills → mocked application status list |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real AI application submission behind `/try`
- Integrate ATS connectors (Ashby, Greenhouse, Lever, Workday, Taleo)
- Auth + per-user application tracking dashboard
