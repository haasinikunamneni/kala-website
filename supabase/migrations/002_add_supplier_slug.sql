-- ═══════════════════════════════════════════════════════════════
--  Add supplier_slug to paintings
--  The app reads/writes suppliers by slug (not the supplier_id FK
--  from 001_initial_schema.sql), so paintings needs a matching
--  column for adminUpsertArtwork / rowToPainting to work.
-- ═══════════════════════════════════════════════════════════════

alter table paintings
  add column if not exists supplier_slug text references suppliers(slug);
