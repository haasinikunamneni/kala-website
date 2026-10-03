# कâla — Launch Checklist

A practical, no-database launch plan. Items marked **[DONE]** were fixed directly in this
codebase. Items marked **[ACTION]** are things only you can do (accounts, domains, legal text,
business decisions). Items marked **[OPTIONAL]** are nice-to-haves you can skip for a v1 launch.

---

## 0. The question you asked: does the cart survive a customer leaving and coming back?

**Before this fix: no.** The cart lived only in React memory (`useState`). Any refresh, tab
close, or accidental navigation wiped it completely — a customer who added 3 paintings and came
back the next day would find an empty cart.

**[DONE]** The cart now saves to the browser's `localStorage` on every change and reloads from
it on page load (`src/context/CartContext.tsx`). I verified this in a real headless browser:
added an item → reloaded the page → item was still there with the correct subtotal.

**What this does and doesn't cover, so you can set expectations correctly:**
- ✅ Survives page refresh, closing the tab, and returning hours/days later — *on the same
  browser, same device*.
- ❌ Does **not** sync across devices (phone cart ≠ laptop cart) — that requires a real backend
  with user accounts, which you've said you don't want yet.
- ❌ Cleared if the customer clears their browser data, uses private/incognito mode, or switches
  browsers.
- ❌ Not visible to you (the shop owner) until the customer actually sends the WhatsApp/Instagram/
  email enquiry from the cart page — there is still no order database, so a cart that's abandoned
  and never sent is invisible to you. This is expected for a DM-to-order model and is fine for v1.

This is a completely reasonable trade-off for a "DM to order" business with no live payments —
just know it's *browser storage*, not a real order system, and don't be surprised if a customer
says "my cart was empty" after clearing their phone's browser data.

---

## 1. Security — do these before you share the URL publicly

### 🔴 Critical — fix before launch

- **[DONE] Admin login had a hardcoded password shipped in the public JS bundle.**
  `admin@kala.art` / `kala-admin-2024` was sitting in plain text in `AdminAuthContext.tsx`, which
  gets compiled into the JavaScript every visitor's browser downloads. Anyone could open DevTools
  → Sources, search "admin", and read it in about 10 seconds. This existed because Supabase isn't
  configured yet, and the code fell back to a hardcoded dev credential — which is fine for local
  testing, but was never meant to ship to production.
  **[ACTION REQUIRED]** You have two real options before launch, pick one:
  1. **Simplest for a no-database launch:** remove the `/admin/*` routes from the production
     build entirely (comment them out in `src/App.tsx`'s router). Since there's no database yet,
     the admin dashboard can't actually save anything permanently anyway — any edits made there
     only exist in that browser's memory for that session. Re-add the routes once Supabase is
     connected.
  2. **If you want to keep using the admin panel:** set up Supabase (or any real auth provider)
     before launch, so `isSupabaseConfigured` is `true` and the app uses real authentication
     instead of the hardcoded fallback. Change the fallback password too, just in case.

- **[ACTION REQUIRED] `.env.local` is not committed yet, but double-check.** I added a
  `.gitignore` (there wasn't one before) that excludes `.env`, `.env.local`, and `node_modules`.
  Before you `git init` / push anywhere: confirm `git status` doesn't show `.env.local`. If you've
  already pushed real Supabase keys to a public repo at any point, rotate those keys immediately —
  git history keeps old commits even after you delete the file.

### 🟡 Important — do soon after launch

- **No real payments happen on this site** — it's enquiry-only (WhatsApp/Instagram/email), so
  there's no PCI-DSS/payment-security surface to worry about. Keep it that way until you're ready
  to properly implement a payment gateway (Razorpay/Stripe) with server-side order verification —
  never accept payment details over WhatsApp/DM directly.
- **Rate-limit or monitor the contact/enquiry channels** informally — since there's no backend,
  there's no bot-spam protection on forms. Low risk for a small gallery site, but if you start
  getting spam DMs, consider adding a simple honeypot field or Google reCAPTCHA to any contact
  forms.
- **HTTPS is mandatory.** Any reasonable host (Vercel, Netlify, Cloudflare Pages) gives you this
  for free automatically — just don't disable it.
- **[OPTIONAL] Security headers.** If you self-host, set `Content-Security-Policy`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` headers at the
  CDN/host level. Vercel/Netlify let you do this via a `vercel.json` / `_headers` file.

---

## 2. Data & "database-less" behavior — know what's static vs. dynamic

Right now **all product, supplier, and site-settings data lives in `src/data/placeholderData.ts`
and `src/lib/siteSettingsDefaults.ts` — hardcoded in the code itself**, not a database. This means:

- ✅ Fast, free, no backend to maintain, works offline-first, zero database costs.
- ❌ **To add/edit/remove a painting, price, or photo, you need me (or a developer) to edit code
  and redeploy.** There is no "admin adds a product" flow that persists anywhere real right now —
  the admin dashboard exists in the code but can't save changes without Supabase configured.
- ❌ Inventory/"sold" status won't update live — if two customers DM about the same one-of-a-kind
  piece, you're resolving that manually over WhatsApp, not the website.

**[ACTION — decide]** This is fine for a small, slow-moving catalog you update every so often.
If you expect to add new pieces weekly/daily or want non-technical staff updating stock, you'll
want Supabase (or similar) connected sooner rather than later — the code is already structured
for it (`isSupabaseConfigured` check, `useAsyncWithFallback` hooks), so it's a matter of creating
tables and setting the two env vars, not a rewrite.

---

## 3. Pre-launch technical checklist

- **[DONE]** Compressed ~138MB of uploaded photos down to ~21MB — was causing real page-load lag.
- **[DONE]** Fixed a Supabase-URL detection bug that made every page silently try (and fail) to
  reach a fake database URL before falling back — was causing multi-second load stalls on every
  navigation.
- **[DONE]** Fixed a runtime crash (`sqM is not defined`) on artwork pages that blanked the entire
  site until a hard refresh.
- **[DONE]** Added `robots.txt` and Open Graph / Twitter meta tags to `index.html` so links shared
  on WhatsApp/Instagram/social show a proper preview card, and search engines can index the site.
- **[ACTION]** Replace the placeholder URLs I put in `index.html` (`https://kala.art/...`) with
  your real domain once you have one, and add a real `og-image.jpg` (1200×630px) to `/public`.
- **[ACTION]** Run `npm run build` locally once before deploying and click through the built site
  (`npm run preview`) — catches anything that only breaks in production mode.
- **[OPTIONAL] Add a `sitemap.xml`** once you have a real domain — low priority for a small
  catalog site, search engines will crawl fine without it initially.
- **[OPTIONAL] Add Google Analytics / Plausible / similar** if you want visitor data — currently
  there is zero analytics on the site.
- **[OPTIONAL] Favicon:** only an SVG favicon exists; add a `.ico`/`.png` fallback for older
  browsers and for the browser tab on some platforms that don't support SVG favicons well.

---

## 4. Legal / business basics (not code, but required before real customers)

- **[ACTION]** A short **Privacy Policy** page — even a DM-to-order site collects data (names,
  addresses, phone numbers via WhatsApp/email). State what you collect and how it's used.
- **[ACTION]** **Shipping & Returns policy** — especially important for framed art (breakage,
  custom framing is typically non-refundable, etc.) — set expectations before disputes happen.
- **[ACTION]** Decide and state your **payment & confirmation process** clearly on the Cart page
  (currently it says "no online payment yet, we'll confirm via WhatsApp" — make sure that matches
  how you actually plan to collect payment, e.g. UPI, bank transfer, COD).
- **[ACTION]** If you're a registered business, consider adding GST/business registration details
  in the footer or About page — builds trust, may be legally required depending on your state.

---

## 5. Long-term maintenance — what to expect ongoing

- **Dependency updates:** run `npm outdated` every few months and update packages, especially
  React Router, Framer Motion, and Vite. Run `npm audit` after updating.
- **Image growth:** every new artwork photo adds to bundle size. Keep compressing uploads before
  adding them (I've been doing this — resize to ~1800px max dimension, JPEG quality ~82) or the
  site will slowly creep back toward the 138MB problem we just fixed.
- **No database = no backups needed for content** (it's all in git), but if/when you add Supabase,
  set up automatic daily backups on the Supabase dashboard immediately — this is one click and
  easy to forget.
- **Domain/SSL renewal:** if you buy a domain, most registrars auto-renew — make sure the card on
  file doesn't expire, or you'll lose the domain unexpectedly.
- **Monitor uptime:** a free tool like UptimeRobot or Better Uptime can ping your site and email
  you if it goes down — takes 5 minutes to set up and catches hosting outages early.

---

## Summary — what's launch-blocking vs. not

| Item | Status |
|---|---|
| Cart persistence | ✅ Fixed |
| Hardcoded admin password exposed in bundle | 🔴 **You must decide: remove `/admin` routes or wire up real auth before going public** |
| `.env.local` secrets hygiene | ✅ `.gitignore` added — verify before pushing to git |
| Site performance (image bloat, fake-Supabase lag) | ✅ Fixed |
| Runtime crash on artwork pages | ✅ Fixed |
| SEO/social preview tags | ✅ Added — needs your real domain swapped in |
| Payment security | ✅ N/A — no payments processed on-site currently |
| Privacy policy / shipping policy | 🔴 **You need to write and add these pages** |
| Database for live inventory/admin editing | ⚪ Optional — works without it, but every catalog change needs a code update |
