# SendSure landing page

A responsive Next.js App Router landing page for SendSure, a pre-launch professional email quality-control product. Product capabilities are described as planned; the page makes no platform, customer, security, pricing, or launch-date claims.

## Run locally

Requirements: Node.js 18.17+ and npm (or pnpm).

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` and then `npm run start`.

## Waitlist setup (Supabase)

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor. It creates `public.waitlist` with a unique email constraint and row-level security enabled. No client access policy is created.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and optionally `NEXT_PUBLIC_SITE_URL` to the real production origin.
4. Keep `SUPABASE_SECRET_KEY` server-side. The API route at `/api/waitlist` validates email and inserts through Supabase REST. Duplicate addresses are treated as successful signup; the unique constraint prevents duplicate rows. A hidden honeypot provides basic spam protection.
5. Restart the development server after changing environment variables.

Without Supabase credentials, the form displays a setup error and does not simulate a saved signup.

## SEO

Title: `SendSure | Email Checklist for Executive Assistants`

Description: `Review important emails and meeting invitations with a structured pre-send checklist. SendSure helps executive assistants reduce repetitive checking and send with greater confidence.`

The page uses one H1, semantic section headings, descriptive anchors, Open Graph and Twitter metadata, and a canonical URL controlled by `NEXT_PUBLIC_SITE_URL`. The primary phrase is “email checklist for executive assistants”; related terms appear naturally in copy. Structured product data is omitted because launch status, integrations, and available features are not verified.

## Before launch

- Supply the actual domain and set `NEXT_PUBLIC_SITE_URL`.
- Confirm feature availability and the first supported email platform.
- Supply approved privacy language and a privacy policy URL.
- Configure Supabase credentials and verify production email collection.
- Confirm product availability and launch timing.
- Add founder name/photo only if desired and supplied.
# SendSure-Site
