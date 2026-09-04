-- ═══════════════════════════════════════════════════════════════════
--  कâla — Complete Supabase Setup
--  HOW TO USE:
--  1. Go to supabase.com → your project → SQL Editor
--  2. Click "New query"
--  3. Paste this entire file
--  4. Click "Run"
--  Done. All tables, security rules, and starter data will be created.
-- ═══════════════════════════════════════════════════════════════════

-- Drop existing tables if you're starting over (safe to run multiple times)
drop table if exists settings cascade;
drop table if exists messages cascade;
drop table if exists gifting_requests cascade;
drop table if exists custom_orders cascade;
drop table if exists orders cascade;
drop table if exists custom_frame_images cascade;
drop table if exists glass_options cascade;
drop table if exists frames cascade;
drop table if exists paintings cascade;
drop table if exists suppliers cascade;
drop function if exists set_updated_at cascade;

create extension if not exists "pgcrypto";

-- ── SUPPLIERS ────────────────────────────────────────────────────
create table suppliers (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  location      text not null default '',
  art_form      text not null default '',
  history       text not null default '',
  artisan_story text not null default '',
  coming_soon   boolean not null default false,
  palette       text[] not null default array['#B95D3F','#B6905A','#1D1D1B'],
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── PAINTINGS (artworks) ─────────────────────────────────────────
create table paintings (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  title               text not null,
  price               numeric(12,2) not null default 0,
  description         text not null default '',
  story               text not null default '',
  origin              text not null default '',
  supplier_slug       text references suppliers(slug) on delete restrict,
  art_form            text not null default 'Pattachitra',
  dimensions          text not null default '',
  frame_available     boolean not null default true,
  in_stock            boolean not null default true,
  sold                boolean not null default false,
  featured            boolean not null default false,
  status              text not null default 'Draft'
                        check (status in ('Draft','Published','Hidden','Sold')),
  palette             text[] not null default array['#B95D3F','#B6905A','#EFE8DD'],
  cover_image_url     text,
  gallery_image_urls  text[] not null default array[]::text[],
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── FRAMES ───────────────────────────────────────────────────────
create table frames (
  id                uuid primary key default gen_random_uuid(),
  name              text unique not null,
  price_per_sqm     numeric(10,2) not null default 0,
  available         boolean not null default true,
  corner_image_url  text,
  unit              text not null default 'sqm' check (unit in ('sqm','sqft')),
  created_at        timestamptz not null default now()
);

-- ── GLASS OPTIONS ─────────────────────────────────────────────────
create table glass_options (
  id            uuid primary key default gen_random_uuid(),
  name          text unique not null,
  description   text not null default '',
  price_per_sqm numeric(10,2) not null default 0,
  available     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ── CUSTOM FRAME IMAGES ───────────────────────────────────────────
create table custom_frame_images (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  label       text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ── ORDERS ────────────────────────────────────────────────────────
create table orders (
  id              uuid primary key default gen_random_uuid(),
  customer_name   text not null,
  customer_email  text,
  customer_phone  text,
  artwork_id      uuid references paintings(id) on delete set null,
  artwork_title   text not null,
  frame           text not null default 'None',
  glass           text not null default 'None',
  custom_frame    boolean not null default false,
  price           numeric(12,2) not null default 0,
  status          text not null default 'Pending'
                    check (status in ('Pending','Confirmed','Sold','Delivered')),
  channel         text not null default 'WhatsApp'
                    check (channel in ('WhatsApp','Instagram','Email')),
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── COMMISSION REQUESTS ───────────────────────────────────────────
create table custom_orders (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  email                text not null,
  phone                text not null default '',
  dimensions           text,
  budget               text,
  frame_preference     text,
  message              text not null,
  reference_image_url  text,
  status               text not null default 'New'
                         check (status in ('New','In Review','In Progress','Completed','Declined')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ── GIFTING REQUESTS ──────────────────────────────────────────────
create table gifting_requests (
  id               uuid primary key default gen_random_uuid(),
  company          text not null,
  event_type       text not null,
  quantity         int not null default 1,
  budget           text,
  required_by      date,
  requirements     text,
  gifting_available boolean not null default true,
  status           text not null default 'New'
                     check (status in ('New','Quoted','Confirmed','Delivered','Closed')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── CONTACT MESSAGES ──────────────────────────────────────────────
create table messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── SETTINGS ──────────────────────────────────────────────────────
create table settings (
  id         uuid primary key default gen_random_uuid(),
  key        text unique not null,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

-- ── AUTO-UPDATE TIMESTAMPS ────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger suppliers_updated_at    before update on suppliers    for each row execute procedure set_updated_at();
create trigger paintings_updated_at    before update on paintings    for each row execute procedure set_updated_at();
create trigger orders_updated_at       before update on orders       for each row execute procedure set_updated_at();
create trigger custom_orders_updated_at before update on custom_orders for each row execute procedure set_updated_at();
create trigger gifting_updated_at      before update on gifting_requests for each row execute procedure set_updated_at();
create trigger settings_updated_at     before update on settings     for each row execute procedure set_updated_at();

-- ═══════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
--  This controls who can read/write each table.
-- ═══════════════════════════════════════════════════════════════════

alter table paintings            enable row level security;
alter table suppliers            enable row level security;
alter table frames               enable row level security;
alter table glass_options        enable row level security;
alter table custom_frame_images  enable row level security;
alter table orders               enable row level security;
alter table custom_orders        enable row level security;
alter table gifting_requests     enable row level security;
alter table messages             enable row level security;
alter table settings             enable row level security;

-- Anyone can view published paintings
create policy "Public read published paintings"
  on paintings for select using (status in ('Published','Sold'));

-- Logged-in admin can do everything with paintings
create policy "Admin full access paintings"
  on paintings for all using (auth.role() = 'authenticated');

-- Anyone can view active suppliers
create policy "Public read suppliers"
  on suppliers for select using (coming_soon = false);
create policy "Admin full access suppliers"
  on suppliers for all using (auth.role() = 'authenticated');

-- Anyone can view available frames & glass
create policy "Public read frames"
  on frames for select using (available = true);
create policy "Admin full access frames"
  on frames for all using (auth.role() = 'authenticated');

create policy "Public read glass"
  on glass_options for select using (available = true);
create policy "Admin full access glass"
  on glass_options for all using (auth.role() = 'authenticated');

-- Anyone can view custom frame images
create policy "Public read custom frame images"
  on custom_frame_images for select using (true);
create policy "Admin manage custom frame images"
  on custom_frame_images for all using (auth.role() = 'authenticated');

-- Settings: anyone can read (for WhatsApp/email/Instagram on public site)
create policy "Public read settings"
  on settings for select using (true);
create policy "Admin write settings"
  on settings for all using (auth.role() = 'authenticated');

-- Forms: anyone can submit, only admin can read
create policy "Anyone can submit commission"
  on custom_orders for insert with check (true);
create policy "Admin manage commissions"
  on custom_orders for all using (auth.role() = 'authenticated');

create policy "Anyone can submit gifting"
  on gifting_requests for insert with check (true);
create policy "Admin manage gifting"
  on gifting_requests for all using (auth.role() = 'authenticated');

create policy "Anyone can submit message"
  on messages for insert with check (true);
create policy "Admin manage messages"
  on messages for all using (auth.role() = 'authenticated');

-- Orders: admin only
create policy "Admin only orders"
  on orders for all using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════════
--  STARTER DATA
--  This pre-fills the tables so the site works immediately.
-- ═══════════════════════════════════════════════════════════════════

insert into suppliers (slug, name, location, art_form, history, artisan_story, coming_soon, palette)
values (
  'odisha-pattachitra',
  'Odisha',
  'Raghurajpur & Puri, Odisha',
  'Pattachitra',
  'For over a thousand years, the artisans of Raghurajpur have hand-painted scrolls of cloth and dried palm leaf using pigments drawn from stone, conch shell, and lampblack. Each painting begins with a canvas of cotton cloth coated in chalk and gum, burnished smooth before the first line is drawn.',
  'Our current collection is hand-painted by a family workshop in Raghurajpur, a heritage crafts village where the art form is passed from parent to child. Every piece is painted entirely by hand, with no two works ever identical.',
  false,
  array['#B95D3F','#B6905A','#1D1D1B']
);

insert into frames (name, price_per_sqm, available, unit) values
  ('Black', 1200, true, 'sqm'),
  ('Brown', 1400, true, 'sqm');

insert into glass_options (name, description, price_per_sqm, available) values
  ('None',         'No glass — artwork only.',                                                              0,   true),
  ('Normal Glass', 'Standard clear glass with UV-resistant coating. Suitable for most interiors.',         600, true),
  ('Flexi Glass',  'Lightweight shatter-resistant acrylic — ideal for couriered pieces and large formats.', 900, true);

insert into settings (key, value) values
  ('brand_name',       'कâla'),
  ('tagline',          'Heritage, Framed for Today'),
  ('instagram_handle', '@kala.heritage'),
  ('whatsapp_number',  '910000000000'),
  ('email',            'hello@kala.art'),
  ('business_hours',   'Monday – Saturday, 10am – 7pm IST');
