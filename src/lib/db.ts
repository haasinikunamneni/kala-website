/**
 * kala data layer
 *
 * All data access goes through this file.
 * When VITE_SUPABASE_URL is set, queries hit the live database.
 * When it's missing (local dev without Supabase), they fall back to
 * placeholder data so the site still renders correctly.
 */

import { supabase } from "./supabase";
import { isSupabaseConfigured as isConfigured } from "./supabase";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any; // used only for insert/update/upsert where strict generics fight us
import {
  paintings as placeholderPaintings,
  suppliers as placeholderSuppliers,
  frames as placeholderFrames,
  glassOptions as placeholderGlass,
} from "../data/placeholderData";
import type { Painting, Supplier, Frame, Glass } from "../types";

/** Uploads a single artwork image to the `artwork-images` storage bucket
 *  and returns its public URL. Requires the bucket to exist (see
 *  supabase/migrations/004_storage_buckets.sql) and the admin session
 *  to be authenticated (RLS on storage.objects). */
export async function uploadArtworkImage(file: File, slug: string): Promise<{ url: string | null; error?: string }> {
  if (!isConfigured) return { url: null, error: "Supabase not configured" };
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("artwork-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) {
    console.error("[kalā] uploadArtworkImage:", uploadError.message);
    return { url: null, error: uploadError.message };
  }
  const { data } = supabase.storage.from("artwork-images").getPublicUrl(path);
  return { url: data.publicUrl };
}

/* ─────────────────────────────────────────────────────────────────
   Row → domain type mappers
───────────────────────────────────────────────────────────────── */
function rowToPainting(row: Record<string, unknown>): Painting {
  return {
    id:             row.id as string,
    slug:           row.slug as string,
    title:          row.title as string,
    price:          row.price as number,
    description:    row.description as string,
    story:          row.story as string,
    origin:         row.origin as string,
    supplierSlug:   row.supplier_slug as string,
    artForm:        row.art_form as Painting["artForm"],
    theme:          (row.theme as Painting["theme"]) ?? "Patra",
    giftingCollection: (row.gifting_collection as string | null) ?? null,
    dimensions:     row.dimensions as string,
    frameAvailable: row.frame_available as boolean,
    inStock:        row.in_stock as boolean,
    sold:           row.sold as boolean,
    featured:       row.featured as boolean,
    status:         row.status as Painting["status"],
    palette:      ((row.palette as string[]) ?? ["#B95D3F", "#B6905A", "#EFE8DD"]) as [string, string, string],
    coverImageUrl:      (row.cover_image_url as string | undefined) ?? undefined,
    galleryImageUrls:   (row.gallery_image_urls as string[] | undefined) ?? undefined,
  };
}

function rowToSupplier(row: Record<string, unknown>): Supplier {
  return {
    slug:         row.slug as string,
    name:         row.name as string,
    location:     row.location as string,
    artForm:      row.art_form as Supplier["artForm"],
    history:      row.history as string,
    artisanStory: row.artisan_story as string,
    comingSoon:   row.coming_soon as boolean,
    palette:      ((row.palette as string[]) ?? ["#B95D3F", "#B6905A", "#1D1D1B"]) as [string, string, string],
  };
}

function rowToFrame(row: Record<string, unknown>): Frame {
  return {
    id:             row.id as string,
    name:           row.name as Frame["name"],
    pricePerSqM:    row.price_per_sqm as number,
    available:      row.available as boolean,
    cornerImageUrl: row.corner_image_url as string | undefined,
  };
}

function rowToGlass(row: Record<string, unknown>): Glass {
  return {
    id:          row.id as string,
    name:        row.name as Glass["name"],
    description: row.description as string,
    pricePerSqM: row.price_per_sqm as number,
    available:   row.available as boolean,
  };
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC QUERIES
───────────────────────────────────────────────────────────────── */

export async function fetchPaintings(): Promise<Painting[]> {
  if (!isConfigured) return placeholderPaintings;
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .in("status", ["Published", "Sold"])
    .order("created_at", { ascending: false });
  if (error) { console.error("[kalā] fetchPaintings:", error.message); return placeholderPaintings; }
  return (data ?? []).map(rowToPainting);
}

export async function fetchPaintingBySlug(slug: string): Promise<Painting | undefined> {
  if (!isConfigured) return placeholderPaintings.find((p) => p.slug === slug);
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) { console.error("[kalā] fetchPaintingBySlug:", error.message); return undefined; }
  return data ? rowToPainting(data as Record<string, unknown>) : undefined;
}

export async function fetchFeaturedPaintings(): Promise<Painting[]> {
  if (!isConfigured) return placeholderPaintings.filter((p) => p.featured && !p.sold);
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("featured", true)
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(6);
  if (error) { console.error("[kalā] fetchFeaturedPaintings:", error.message); return []; }
  return (data ?? []).map(rowToPainting);
}

export async function fetchRelatedPaintings(current: Painting, count = 3): Promise<Painting[]> {
  if (!isConfigured) {
    return placeholderPaintings
      .filter((p) => p.id !== current.id && p.artForm === current.artForm)
      .slice(0, count);
  }
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("art_form", current.artForm)
    .eq("status", "Published")
    .neq("id", current.id)
    .limit(count);
  if (error) { console.error("[kalā] fetchRelatedPaintings:", error.message); return []; }
  return (data ?? []).map(rowToPainting);
}

export async function fetchSuppliers(): Promise<Supplier[]> {
  if (!isConfigured) return placeholderSuppliers.filter((s) => !s.comingSoon);
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("coming_soon", false)
    .order("name");
  if (error) { console.error("[kalā] fetchSuppliers:", error.message); return placeholderSuppliers; }
  return (data ?? []).map(rowToSupplier);
}

export async function fetchSupplierBySlug(slug: string): Promise<Supplier | undefined> {
  if (!isConfigured) return placeholderSuppliers.find((s) => s.slug === slug);
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) { console.error("[kalā] fetchSupplierBySlug:", error.message); return undefined; }
  return data ? rowToSupplier(data as Record<string, unknown>) : undefined;
}

export async function fetchFrames(): Promise<Frame[]> {
  if (!isConfigured) return placeholderFrames;
  const { data, error } = await supabase
    .from("frames")
    .select("*")
    .order("name");
  if (error) { console.error("[kalā] fetchFrames:", error.message); return placeholderFrames; }
  return (data ?? []).map(rowToFrame);
}

export async function fetchGlassOptions(): Promise<Glass[]> {
  if (!isConfigured) return placeholderGlass;
  const { data, error } = await supabase
    .from("glass_options")
    .select("*")
    .order("price_per_sqm");
  if (error) { console.error("[kalā] fetchGlassOptions:", error.message); return placeholderGlass; }
  return (data ?? []).map(rowToGlass);
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC MUTATIONS (forms → database)
───────────────────────────────────────────────────────────────── */

export async function submitContactMessage(payload: {
  name: string; email: string; phone?: string; message: string;
}) {
  if (!isConfigured) { console.log("[kalā] Contact form (no DB):", payload); return { ok: true }; }
  const { error } = await db.from("messages").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? null,
    body: payload.message,
    read: false,
  });
  if (error) { console.error("[kalā] submitContactMessage:", error.message); return { ok: false }; }
  return { ok: true };
}

export async function submitCommissionRequest(payload: {
  name: string; email: string; phone: string; dimensions?: string;
  budget?: string; frame_preference?: string; message: string;
  reference_image_url?: string;
}) {
  if (!isConfigured) { console.log("[kalā] Commission (no DB):", payload); return { ok: true }; }
  const { error } = await db.from("custom_orders").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    dimensions: payload.dimensions ?? null,
    budget: payload.budget ?? null,
    frame_pref: payload.frame_preference ?? null,
    ref_image_url: payload.reference_image_url ?? null,
    status: "New",
  });
  if (error) { console.error("[kalā] submitCommissionRequest:", error.message); return { ok: false }; }
  return { ok: true };
}

export async function submitGiftingRequest(payload: {
  company: string; event_type: string; quantity: number;
  budget?: string; required_by?: string; requirements?: string;
}) {
  if (!isConfigured) { console.log("[kalā] Gifting (no DB):", payload); return { ok: true }; }
  const { error } = await db.from("gifting_requests").insert({
    company: payload.company,
    event_type: payload.event_type,
    quantity: payload.quantity,
    budget: payload.budget ?? null,
    delivery_date: payload.required_by ?? null,
    requirements: payload.requirements ?? null,
    status: "New",
  });
  if (error) { console.error("[kalā] submitGiftingRequest:", error.message); return { ok: false }; }
  return { ok: true };
}

/* ─────────────────────────────────────────────────────────────────
   ADMIN QUERIES
───────────────────────────────────────────────────────────────── */

export async function adminFetchAllArtworks() {
  if (!isConfigured) return { data: placeholderPaintings.map(p => ({ ...p })), error: null };
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: (data ?? []).map(rowToPainting), error };
}

export async function adminUpsertArtwork(painting: Partial<Painting> & { id?: string }) {
  if (!isConfigured) return { ok: true };

  const row = {
    slug:            painting.slug,
    title:           painting.title,
    price:           painting.price,
    description:     painting.description,
    story:           painting.story,
    origin:          painting.origin,
    supplier_slug:   painting.supplierSlug,
    art_form:        painting.artForm,
    dimensions:      painting.dimensions,
    frame_available: painting.frameAvailable,
    in_stock:        painting.inStock,
    sold:            painting.sold,
    featured:        painting.featured,
    status:          painting.status,
    palette:         painting.palette,
    gifting_collection: painting.giftingCollection ?? null,
  };

  // A real Supabase UUID looks like: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  const isRealUUID = painting.id
    ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(painting.id)
    : false;

  if (isRealUUID) {
    // Editing an existing artwork — UPDATE
    const { error } = await db.from("paintings").update(row).eq("id", painting.id);
    if (error) console.error("[kalā] adminUpsertArtwork (update):", error.message);
    return { ok: !error, error };
  } else {
    // New artwork — INSERT and let Supabase generate the UUID
    const { error } = await db.from("paintings").insert(row as never);
    if (error) console.error("[kalā] adminUpsertArtwork (insert):", error.message);
    return { ok: !error, error };
  }
}

export async function adminDeleteArtwork(id: string) {
  if (!isConfigured) return { ok: true };
  const { error } = await supabase.from("paintings").delete().eq("id", id);
  return { ok: !error, error };
}

export async function adminFetchOrders() {
  if (!isConfigured) return { data: [], error: null };
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data ?? [], error };
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  if (!isConfigured) return { ok: true };
  const { error } = await db.from("orders").update({ status }).eq("id", id);
  return { ok: !error, error };
}

export async function adminFetchCustomOrders() {
  if (!isConfigured) return { data: [], error: null };
  const { data, error } = await supabase
    .from("custom_orders")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data ?? [], error };
}

export async function adminUpdateCustomOrderStatus(id: string, status: string) {
  if (!isConfigured) return { ok: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await db.from("custom_orders").update({ status } as any).eq("id", id);
  return { ok: !error, error };
}

export async function adminFetchGiftingRequests() {
  if (!isConfigured) return { data: [], error: null };
  const { data, error } = await supabase
    .from("gifting_requests")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data ?? [], error };
}

export async function adminFetchMessages() {
  if (!isConfigured) return { data: [], error: null };
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data ?? [], error };
}

export async function adminMarkMessageRead(id: string) {
  if (!isConfigured) return { ok: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await db.from("messages").update({ read: true } as any).eq("id", id);
  return { ok: !error, error };
}

export async function adminUpdateFrames(frames: Frame[]) {
  if (!isConfigured) return { ok: true };
  const rows = frames.map((f) => ({
    id: f.id,
    name: f.name,
    price_per_sqm: f.pricePerSqM,
    available: f.available,
    corner_image_url: f.cornerImageUrl ?? null,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await db.from("frames").upsert(rows as any);
  return { ok: !error, error };
}

export async function adminUpdateGlass(glass: Glass[]) {
  if (!isConfigured) return { ok: true };
  const rows = glass.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
    price_per_sqm: g.pricePerSqM,
    available: g.available,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await db.from("glass_options").upsert(rows as any);
  return { ok: !error, error };
}

export async function adminGetSetting(key: string): Promise<string | null> {
  if (!isConfigured) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("settings").select("value").eq("key", key).single() as any);
  return (data as { value: string } | null)?.value ?? null;
}

export async function adminSetSetting(key: string, value: string) {
  if (!isConfigured) return { ok: true };
  const { error } = await supabase
    .from("settings")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert({ key, value } as any, { onConflict: "key" });
  return { ok: !error, error };
}

/** Public read of all site settings — used by Footer, WhatsApp buttons, Contact page, etc.
 *  Falls back to defaults for any key not yet saved (or if Supabase isn't configured). */
export async function fetchSiteSettings(): Promise<Record<string, string>> {
  if (!isConfigured) return {};
  const { data, error } = await supabase.from("settings").select("key, value");
  if (error) { console.error("[kalā] fetchSiteSettings:", error.message); return {}; }
  const out: Record<string, string> = {};
  for (const row of (data ?? []) as { key: string; value: string }[]) {
    out[row.key] = row.value;
  }
  return out;
}
