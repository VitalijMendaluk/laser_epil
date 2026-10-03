# Lumière Laser Studio — Laser Hair Removal in Kutaisi

Premium trilingual (🇬🇪 ქართული / 🇺🇦 Українська / 🇬🇧 English) website for a laser hair removal studio in Kutaisi, Georgia, with a built-in admin panel / CMS.

> "Lumière Laser Studio", contacts and photos are **placeholders** — change them in `/admin`.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 4 · Framer Motion · next-intl · PostgreSQL · Prisma · JWT sessions (jose) · bcrypt · Zod · Cloudinary · Cloudflare Turnstile · Telegram Bot API

---

## Features

**Website** (`/ka` — default, `/uk`, `/en`)
- Home: Hero (Book Appointment + WhatsApp), About, Services catalog (women / men filter), Why choose us (5 advantages), How the procedure works (4 steps), Before / After (drag-to-compare slider), Testimonials carousel, FAQ, booking CTA, Contacts with Google Maps + Call / WhatsApp buttons
- `/prices` — price table (service · duration · price), grouped by women / men
- **Booking popup** — Name*, Phone*, Service*, Preferred date*, Preferred time* (slots from admin), Message → "Thank you! We will contact you soon."
- Floating WhatsApp + Instagram buttons, sticky "Book" button on mobile
- Marketing: Meta Pixel (`PageView`, `Lead` on booking, `Contact` on WhatsApp/phone/Instagram clicks, custom `BookingOpen`), Google Analytics 4 (`generate_lead`, `contact`, `booking_open`) — IDs are entered in the admin
- SEO per language: meta title / description / keywords, Open Graph, hreflang (`ka`, `uk`, `en`, `x-default`), canonical URLs, JSON-LD (`BeautySalon` with price catalog, `FAQPage`), `sitemap.xml`, `robots.txt`

**Admin panel** (`/admin`)
- Dashboard — total requests, new requests, upcoming visits, last 7 days, **popular services**, requests by status, latest requests
- Bookings — table with search, status filter (**New / Confirmed / Completed / Cancelled**), "Upcoming visits" view sorted by date, status change, delete, quick Call / WhatsApp
- Services & prices — CRUD (name & description in 3 languages, category, price, duration, photo, sort order, show/hide) + quick price/duration edit right in the list
- Testimonials — CRUD (photo, name, text in 3 languages, rating 1–5)
- Before / After — CRUD (before + after photo, caption in 3 languages)
- FAQ — CRUD (question & answer in 3 languages)
- Site texts — every text block in 3 languages: Hero, About, Services, Prices, Advantages, Process, Results, Testimonials, FAQ, Contacts, CTA, Footer
- Contacts & settings — phone, WhatsApp, email, Instagram, Facebook, Google Maps, booking time slots, studio name, currency, images, **Meta Pixel ID, GA4 ID**
- SEO — meta title / description / keywords for each page in each language, Open Graph image

**Security**
- Passwords hashed with bcrypt (cost 12); timing-safe login (dummy hash for unknown logins)
- Signed HTTP-only `SameSite=Lax` JWT cookie (`Secure` in production), 7-day expiry
- `/admin/*` protected by middleware **and** `requireAdmin()` in every page / server action
- Zod validation on every input (client + server); Prisma parameterised queries
- Spam protection on the booking form: **Cloudflare Turnstile** captcha (server-side verification) + honeypot + rate limit (5 requests / 10 min per IP)
- Login rate limit (5 / 15 min per login, 10 per IP); upload rate limit
- Uploads: max 8 MB, real type checked by magic bytes (JPG / PNG / WEBP / AVIF)
- Image URLs restricted to Cloudinary / Unsplash / own uploads; map iframe restricted to Google Maps; tracking IDs strictly validated before they reach inline scripts
- Security headers; admin is `noindex`

---

## Project structure

```
prisma/
  schema.prisma          # Admin, Service, Booking, Testimonial, BeforeAfter, FaqItem, SiteText (ka/uk/en), Setting
  migrations/            # SQL migrations
  seed.ts                # admin + default texts/settings + demo services, reviews, FAQ, before/after
scripts/create-admin.ts  # create admin / reset password
src/
  middleware.ts          # locale routing + admin protection
  i18n/                  # next-intl routing (ka, uk, en), navigation, request config
  messages/ka|uk|en.json # UI strings (buttons, form labels, errors)
  lib/
    content-schema.ts    # ⭐ list of all CMS texts & settings with defaults (3 languages)
    content.ts           # cached data access (texts, settings, services, reviews, FAQ, results)
    locales.ts           # locale metadata + translated-field fallback
    auth.ts, session.ts  # admin session (JWT)
    validation.ts        # Zod schemas
    telegram.ts          # booking notifications
    turnstile.ts         # captcha verification
    track.ts             # Meta Pixel / GA4 events (client)
    rate-limit.ts, upload.ts, seo.ts, utils.ts
  app/
    [locale]/            # public site: layout, home, /prices
    admin/               # login + (panel)/ dashboard, bookings, services, testimonials, results, faq, content, settings, seo
    admin/_actions/      # server actions (all call requireAdmin)
    api/bookings         # public booking endpoint (validation, captcha, rate limit, Telegram)
    api/admin/upload     # image upload (Cloudinary, or local in dev)
    sitemap.ts, robots.ts
  components/site|admin|ui
```

Two kinds of text:
- **UI strings** (buttons, form labels, errors) → `src/messages/*.json`
- **Content** (all sections, contacts, footer, SEO) → database, edited in `/admin`. To add a new editable text, add one entry to `src/lib/content-schema.ts` — it appears in the admin automatically.

Colours are Tailwind tokens in `src/app/globals.css` (`ivory`, `cream`, `nude`, `sand`, `cocoa`, `taupe`, `gold`) and are shared by the website and the admin panel.

---

## Local setup

Requirements: **Node.js 20+** and **PostgreSQL 14+**.

```bash
npm install
cp .env.example .env          # set DATABASE_URL (everything else is optional)
createdb laser_studio         # or create the DB in pgAdmin / your hosting panel
npx prisma migrate dev        # apply migrations (production: npx prisma migrate deploy)
npm run db:seed               # admin, default texts, demo content
npm run dev
```

- Site — http://localhost:3000 (redirects to `/ka`)
- Admin — http://localhost:3000/admin (default login `admin`, password `1`)

Change the admin password: `npm run admin:create -- admin "NewStrongPassword"`

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run typecheck` | TypeScript check |
| `npm run db:migrate` | Create & apply a new migration (dev) |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed (safe to re-run — never overwrites edits) |
| `npm run db:studio` | Prisma Studio (DB browser) |
| `npm run admin:create -- <login> "<password>"` | Create admin / reset password |

---

## Integrations

**Cloudinary (images, optional)** — create a free account at https://cloudinary.com → copy Cloud name, API Key, API Secret into `CLOUDINARY_*`. Without it, uploaded images are stored in PostgreSQL and served from `/media/<id>` (large photos are downscaled in the browser before upload).

**Cloudflare Turnstile (captcha)** — https://dash.cloudflare.com → Turnstile → Add site (add your domain and `localhost`) → put the keys into `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. If both are empty, the captcha is off (honeypot + rate limit still work).

**Telegram notifications** — create a bot with @BotFather → `TELEGRAM_BOT_TOKEN`. Write any message to the bot (or add it to a group), open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` → `TELEGRAM_CHAT_ID`. Each new booking is sent to that chat.

**Meta Pixel / Google Analytics 4** — paste the IDs in **Admin → Contacts & settings → Marketing & analytics**. No redeploy needed.

---

## Deployment

### Vercel (GitHub → Vercel) — no env vars required

The only thing the site needs is a PostgreSQL database. Everything else has safe defaults:
admin login `admin` / password `1`, session key derived from `DATABASE_URL`, site URL from the Vercel domain,
uploaded images stored in the database (no Cloudinary needed), captcha off until keys are added.

1. Push the project to GitHub (`.env`, `node_modules`, `.next` are git-ignored).
2. https://vercel.com → **Add New → Project** → import the repository → **Deploy**
   (the first build fails without a database — that's expected).
3. Project → **Storage → Create Database → Neon (Postgres)** → connect it to the project
   (this adds `DATABASE_URL` automatically).
4. **Deployments → ⋯ → Redeploy.** The `vercel-build` script runs `prisma migrate deploy` → seed
   (admin, texts, demo content — only if missing, never overwrites edits) → `next build`.
5. Open `https://<project>.vercel.app/ka` — site, `/admin` — admin panel (`admin` / `1`).

⚠️ Change the password right after the first login — anyone who knows the default can sign in:
run locally with the production `DATABASE_URL`: `npm run admin:create -- admin "NewStrongPassword"`,
or set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in Vercel **before** the first deploy.

Optional env vars (Settings → Environment Variables, then redeploy): `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` (own domain),
`CLOUDINARY_*`, `TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.

### VPS (Node + PostgreSQL)

```bash
npm ci
npx prisma migrate deploy
npm run db:seed
npm run build
npm start          # behind nginx / pm2, port 3000
```

### Notes
- The rate limiter is in-memory — fine for one server. For serverless / multiple instances, swap the store in `src/lib/rate-limit.ts` for Redis (e.g. Upstash).
- Content is cached and revalidated instantly after every save in the admin.
- Demo photos (services, reviews, before/after) are Unsplash placeholders — replace them with the studio's real photos in the admin. Before/after pairs in particular must be real client photos.
