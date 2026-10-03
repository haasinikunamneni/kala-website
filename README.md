# कâla — Heritage Art Gallery (Frontend)

A production-ready React + TypeScript + Tailwind frontend for कâla, a curated digital
gallery for handcrafted Indian heritage art. Built from the project specification:
museum-quiet visual language, WhatsApp/Instagram/email enquiry flow instead of online
checkout, and an architecture designed to support unlimited future suppliers.

## What's included

- **Home** — full-screen hero, featured supplier collections, "Why कâla," featured
  paintings, artisan spotlight, Instagram preview grid
- **Collections** — searchable, filterable masonry-style grid (supplier, availability,
  frame, price)
- **Artwork Details** — gallery, frame selector, story section, add to cart, DM-to-order
  via WhatsApp, related artwork
- **Categories** — the three category types: Unique Handcrafted Pieces, Commission an
  Artwork (with reference-image upload), Corporate & Ceremony Gifting (bulk enquiry form)
- **Suppliers + Supplier Detail** — artisan-first profile pages, built to add unlimited
  future suppliers (Madhubani, Warli, Kalamkari, etc. are seeded as "Coming Soon")
- **About**, **Contact** (inquiry form + business hours + map placeholder)
- **Cart** — no online payment; builds a formatted enquiry and sends it via WhatsApp,
  Instagram, or email

## Design system

- **Colors**: Warm Ivory `#F7F3EC`, Soft Beige `#EFE8DD`, Charcoal `#1D1D1B`, Muted Gold
  `#B6905A`, Terracotta `#B95D3F`, Dark Walnut `#4A3427` — set in `tailwind.config.js`
- **Type**: Cormorant Garamond (display) + Inter (body), loaded via Google Fonts in
  `index.html`
- **Signature motif**: a Pattachitra-inspired vine-and-dot border (`PattaBorder`,
  `PattaCorner` in `src/components/ornaments/`) referencing the painted borders
  traditional to the art form itself — used to frame the hero and corners of every
  artwork card
- Subtle Framer Motion fade/scale-in on scroll, respects `prefers-reduced-motion`

## Placeholder artwork

Real photography isn't available yet, so every painting and supplier uses a
**generative placeholder** (`PlaceholderArtwork.tsx`) — a deterministic SVG "canvas"
in the artwork's palette with a soft mandala motif and the painting's title, framed by
the same border ornament used elsewhere. Swap these for real photography by replacing
the `PlaceholderArtwork` usage with an `<img>` once the admin/CMS is wired up — the
component API (`title`, `artForm`, `palette`) maps directly to fields already in
`src/types/index.ts`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

## Project structure

```
src/
  components/        Navbar, Footer, cards, forms, ornaments
  context/            CartContext (in-memory cart, no backend yet)
  data/               placeholderData.ts — swap with real CMS/API data
  pages/              one file per route
  types/              Painting, Supplier, CartItem, FrameOption
```

## Editing the WhatsApp / Instagram / email contact details

Update the placeholder number and handles in:
- `src/components/WhatsAppButton.tsx` (`WHATSAPP_NUMBER`)
- `src/components/Footer.tsx`, `src/pages/Contact.tsx`, `src/pages/Cart.tsx`

## Not yet built (next steps)

This pass is frontend-only, using placeholder data, per the spec's instruction to use
data "that can easily be replaced later through the admin dashboard." Not included yet:

- **Backend / database** (Supabase) — products, suppliers, orders, frames, messages
- **Admin dashboard** — protected CRUD for products, suppliers, orders, frames
- **Image storage** (Cloudinary) — once real artwork photography exists
- **Online payments**, accounts, wishlist, multi-currency (listed as future expansion
  in the spec)

Happy to build any of these next — the data models in `src/types/index.ts` already
mirror the spec's data model section, so a Supabase schema can be generated directly
from them.
