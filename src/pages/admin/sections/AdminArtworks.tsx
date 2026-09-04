import { useState, useRef, useCallback, useEffect } from "react";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Upload,
  Star, GripVertical, RefreshCw, Check, AlertCircle, Loader2,
} from "lucide-react";
import { suppliers } from "../../../data/placeholderData";
import { GIFTING_COLLECTIONS } from "../../../data/giftingCollections";
import {
  adminFetchAllArtworks,
  adminUpsertArtwork,
  adminDeleteArtwork,
  uploadArtworkImage,
} from "../../../lib/db";
import type { Painting, ArtworkStatus } from "../../../types";

/* ─────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────── */
interface ImageEntry {
  id: string;
  url: string;        // object URL (local preview) or remote URL
  isCover: boolean;
  file?: File;        // only present for freshly uploaded images
}

interface ArtworkForm {
  id?: string;
  title: string;
  price: number | "";
  supplierSlug: string;
  origin: string;
  description: string;
  story: string;
  dimensions: string;
  inStock: boolean;
  stockCount: number | "";
  featured: boolean;
  frameAvailable: boolean;
  status: ArtworkStatus;
  giftingCollection: string; // "" = None
  images: ImageEntry[];
}

type EditorTab = "details" | "images" | "publishing";

/* ─────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────── */
const STATUS_STYLES: Record<ArtworkStatus, string> = {
  Published: "bg-green-100 text-green-700",
  Draft:     "bg-charcoal/10 text-charcoal/60",
  Hidden:    "bg-yellow-100 text-yellow-700",
  Sold:      "bg-terracotta/15 text-terracotta",
};

const STATUS_DESCRIPTIONS: Record<ArtworkStatus, string> = {
  Draft:     "Not visible on the public site. Work in progress.",
  Published: "Visible on the Collections page and available to purchase.",
  Hidden:    "Not visible on the public site. Preserved in the admin.",
  Sold:      "Marked as sold. Displayed with a Sold badge on the public site.",
};

const emptyForm = (): ArtworkForm => ({
  title: "",
  price: "",
  supplierSlug: suppliers[0]?.slug ?? "odisha-pattachitra",
  origin: "",
  description: "",
  story: "",
  dimensions: "",
  inStock: true,
  stockCount: 1,
  featured: false,
  frameAvailable: true,
  status: "Draft",
  giftingCollection: "",
  images: [],
});

const inp = "w-full rounded-sm border border-charcoal/15 bg-beige px-3 py-2.5 font-body text-sm focus-ring placeholder:text-charcoal/35";
const lbl = "block font-body text-xs uppercase tracking-widest2 text-charcoal/50 mb-1.5";
const fieldHint = "mt-1 font-body text-[11px] text-charcoal/35";

/* ─────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */
function paintingToForm(p: Painting): ArtworkForm {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    supplierSlug: p.supplierSlug,
    origin: p.origin,
    description: p.description,
    story: p.story,
    dimensions: p.dimensions,
    inStock: p.inStock,
    stockCount: 1,
    featured: p.featured,
    frameAvailable: p.frameAvailable,
    status: p.status,
    giftingCollection: p.giftingCollection ?? "",
    images: [
      ...((p as any).coverImageUrl ? [{ id: `existing-cover`, url: (p as any).coverImageUrl, isCover: true }] : []),
      ...((p as any).galleryImageUrls ?? [])
        .filter((u: string) => u !== (p as any).coverImageUrl)
        .map((u: string, i: number) => ({ id: `existing-${i}`, url: u, isCover: false })),
    ],
  };
}

function formToPainting(form: ArtworkForm, existing?: Painting): Painting {
  const baseSlug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // For new artworks, append a short timestamp to prevent slug collisions
  const slug = form.id ? baseSlug : `${baseSlug}-${Date.now().toString(36)}`;
  return {
    ...(existing ?? {}),
    // Only carry id forward if editing an existing artwork (real UUID from Supabase).
    // For new artworks leave it out — Supabase generates the UUID on insert.
    ...(form.id ? { id: form.id } : {}),
    slug,
    title: form.title,
    price: Number(form.price) || 0,
    supplierSlug: form.supplierSlug,
    origin: form.origin,
    description: form.description,
    story: form.story,
    dimensions: form.dimensions,
    inStock: form.inStock,
    featured: form.featured,
    frameAvailable: form.frameAvailable,
    status: form.status,
    sold: form.status === "Sold",
    giftingCollection: form.giftingCollection || null,
    artForm: existing?.artForm ?? "Pattachitra",
    palette: existing?.palette ?? ["#B95D3F", "#B6905A", "#EFE8DD"],
  } as Painting;
}

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export function AdminArtworks() {
  const [artworks, setArtworks] = useState<Painting[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [editing, setEditing]   = useState<ArtworkForm | null>(null);
  const [search, setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState<ArtworkStatus | "all">("all");
  const [toast, setToast]       = useState<{ msg: string; ok: boolean } | null>(null);

  /* ── Load from Supabase on mount ── */
  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await adminFetchAllArtworks();
    setArtworks(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  /* Table filtering */
  const filtered = artworks.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  /* Open editor */
  const openNew  = () => setEditing(emptyForm());
  const openEdit = (a: Painting) => setEditing(paintingToForm(a));

  /* Save → Supabase */
  const save = async (form: ArtworkForm) => {
    if (!form.title.trim()) return;
    setSaving(true);

    // Try to upload freshly-added images — but if upload fails,
    // save the artwork anyway without the image rather than blocking.
    const folderKey = form.id ?? `new-${Date.now()}`;
    const uploadedImages: { url: string; isCover: boolean }[] = [];
    let imageWarning = false;

    for (const img of form.images) {
      if (img.file) {
        const { url, error: uploadError } = await uploadArtworkImage(img.file, folderKey);
        if (!url) {
          console.warn("[kalā] Image upload failed:", uploadError ?? "unknown error");
          imageWarning = true;
          // Skip this image but continue — don't block the artwork save
        } else {
          uploadedImages.push({ url, isCover: img.isCover });
        }
      } else {
        uploadedImages.push({ url: img.url, isCover: img.isCover });
      }
    }

    const existing = artworks.find((a) => a.id === form.id);
    const painting = formToPainting(form, existing);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (painting as any).coverImageUrl = uploadedImages.find((i) => i.isCover)?.url ?? uploadedImages[0]?.url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (painting as any).galleryImageUrls = uploadedImages.map((i) => i.url);

    const { ok, error } = await adminUpsertArtwork(painting);
    if (!ok) {
      showToast(error?.message ?? "Failed to save. Check browser console for details.", false);
      setSaving(false);
      return;
    }

    if (imageWarning) {
      showToast("Artwork saved — but some images failed to upload. Set up Supabase Storage to enable image uploads.", false);
    } else {
      showToast(form.id ? "Artwork updated." : "Artwork added.");
    }
    await load();
    setSaving(false);
    setEditing(null);
  };

  /* Delete → Supabase */
  const remove = async (id: string) => {
    if (!window.confirm("Remove this artwork from the gallery?")) return;
    const { ok } = await adminDeleteArtwork(id);
    if (!ok) { showToast("Failed to delete artwork.", false); return; }
    showToast("Artwork removed.");
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  /* Quick status toggle → Supabase */
  const cycleStatus = async (id: string) => {
    const nextStatus: Record<ArtworkStatus, ArtworkStatus> = {
      Published: "Hidden",
      Hidden:    "Published",
      Draft:     "Published",
      Sold:      "Draft",
    };
    const artwork = artworks.find((a) => a.id === id);
    if (!artwork) return;
    const next = nextStatus[artwork.status];
    const updated = { ...artwork, status: next, sold: next === "Sold" };
    // Optimistic update
    setArtworks((prev) => prev.map((a) => (a.id === id ? updated : a)));
    const { ok } = await adminUpsertArtwork(updated);
    if (!ok) {
      showToast("Failed to update status.", false);
      await load(); // revert
    }
  };

  /* Quick featured toggle → Supabase */
  const toggleFeatured = async (id: string) => {
    const artwork = artworks.find((a) => a.id === id);
    if (!artwork) return;
    const updated = { ...artwork, featured: !artwork.featured };
    setArtworks((prev) => prev.map((a) => (a.id === id ? updated : a)));
    const { ok } = await adminUpsertArtwork(updated);
    if (!ok) {
      showToast("Failed to update featured status.", false);
      await load();
    }
  };

  const counts = {
    all:       artworks.length,
    Published: artworks.filter((a) => a.status === "Published").length,
    Draft:     artworks.filter((a) => a.status === "Draft").length,
    Hidden:    artworks.filter((a) => a.status === "Hidden").length,
    Sold:      artworks.filter((a) => a.status === "Sold").length,
  };

  return (
    <div>
      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-sm px-5 py-3 font-body text-sm text-ivory shadow-lg transition-all ${toast.ok ? "bg-charcoal" : "bg-terracotta"}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Artworks</h1>
          <p className="mt-1 font-body text-sm text-charcoal/50">
            {counts.Published} published · {counts.Draft} draft · {counts.Sold} sold
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-sm bg-charcoal px-5 py-2.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} /> Add Artwork
        </button>
      </div>

      {/* ── Filter bar ── */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search artworks…"
          className="w-64 rounded-sm border border-charcoal/15 bg-ivory px-4 py-2 font-body text-sm focus-ring"
        />
        <div className="flex gap-1.5">
          {(["all", "Published", "Draft", "Hidden", "Sold"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1 font-body text-xs capitalize transition-colors ${
                statusFilter === s
                  ? "border-gold bg-gold text-ivory"
                  : "border-charcoal/15 text-charcoal/55 hover:border-charcoal/30"
              }`}
            >
              {s} {s !== "all" && <span className="ml-0.5 opacity-60">({counts[s]})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="mt-5 overflow-hidden rounded-sm border border-charcoal/10 bg-ivory">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-charcoal/10 bg-beige">
                {["Artwork", "Price", "Stock", "Status", "Featured", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-body text-[11px] uppercase tracking-widest2 text-charcoal/40">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} />
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center font-body text-sm text-charcoal/40">
                    No artworks match your search.
                  </td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id} className="group border-b border-charcoal/6 last:border-0 hover:bg-beige/40 transition-colors">
                  {/* Title + meta */}
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium text-charcoal">{a.title}</p>
                    <p className="mt-0.5 font-body text-[11px] text-charcoal/40">
                      {a.artForm} · {a.dimensions || "—"}
                    </p>
                  </td>
                  {/* Price */}
                  <td className="px-4 py-3 font-body text-sm text-charcoal">
                    ₹{a.price.toLocaleString("en-IN")}
                  </td>
                  {/* Stock */}
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs ${a.inStock && !a.sold ? "text-green-600" : "text-terracotta"}`}>
                      {a.sold ? "Sold" : a.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  {/* Status badge */}
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 font-body text-[11px] ${STATUS_STYLES[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  {/* Featured */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(a.id)}
                      title={a.featured ? "Remove from featured" : "Add to featured"}
                      className={`transition-colors ${a.featured ? "text-gold" : "text-charcoal/20 hover:text-gold/60"}`}
                    >
                      <Star className="h-4 w-4" fill={a.featured ? "currentColor" : "none"} strokeWidth={1.5} />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(a)} title="Edit" className="text-charcoal/35 hover:text-charcoal transition-colors">
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <button onClick={() => cycleStatus(a.id)} title="Toggle visibility" className="text-charcoal/35 hover:text-gold transition-colors">
                        {a.status === "Published"
                          ? <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                          : <Eye className="h-4 w-4" strokeWidth={1.5} />
                        }
                      </button>
                      <button onClick={() => remove(a.id)} title="Delete" className="text-charcoal/35 hover:text-terracotta transition-colors">
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Full-screen editor ── */}
      {editing && (
        <ArtworkEditor
          form={editing}
          onSave={save}
          onClose={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Full-screen Artwork Editor
───────────────────────────────────────────────────────────────── */
function ArtworkEditor({
  form: initial,
  onSave,
  onClose,
  saving,
}: {
  form: ArtworkForm;
  onSave: (f: ArtworkForm) => Promise<void>;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm]   = useState<ArtworkForm>(initial);
  const [tab, setTab]     = useState<EditorTab>("details");
  const [errors, setErrors] = useState<Partial<Record<keyof ArtworkForm, string>>>({});

  const set = <K extends keyof ArtworkForm>(k: K, v: ArtworkForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.title.trim())      e.title = "Title is required.";
    if (!form.price || form.price <= 0) e.price = "A valid price is required.";
    if (!form.dimensions.trim()) e.dimensions = "Dimensions are required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  const isNew = !form.id;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-charcoal/10 bg-ivory px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal transition-colors">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div>
            <p className="font-display text-xl text-charcoal">
              {isNew ? "Add New Artwork" : `Editing: ${form.title || "Untitled"}`}
            </p>
            <p className="font-body text-xs text-charcoal/40">
              {isNew ? "Fill in the details below and save when ready." : "Changes are saved when you click Save Artwork."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-2.5 py-1 font-body text-[11px] ${STATUS_STYLES[form.status]}`}>
            {form.status}
          </span>
          <button
            onClick={onClose}
            className="rounded-sm border border-charcoal/15 px-5 py-2 font-body text-[13px] uppercase tracking-widest2 text-charcoal/60 hover:border-charcoal/30 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-sm bg-charcoal px-5 py-2 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-60"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />}
            {saving ? "Saving…" : "Save Artwork"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-charcoal/10 bg-ivory px-6">
        <div className="flex gap-0">
          {(["details", "images", "publishing"] as EditorTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border-b-2 px-5 py-3 font-body text-[13px] capitalize transition-colors ${
                tab === t
                  ? "border-gold text-charcoal"
                  : "border-transparent text-charcoal/45 hover:text-charcoal/70"
              }`}
            >
              {t === "details" ? "Artwork Details"
               : t === "images" ? "Images"
               : "Publishing"}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-10">

          {/* ── TAB: Details ── */}
          {tab === "details" && (
            <div className="space-y-8">

              {/* Core info */}
              <Section title="Core Information">
                <div className="space-y-5">
                  <div>
                    <label className={lbl}>Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) => set("title", e.target.value)}
                      placeholder="e.g. The Jagannath Trinity"
                      className={inp}
                    />
                    {errors.title && <p className="mt-1 font-body text-xs text-terracotta">{errors.title}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={lbl}>Price (₹) *</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => set("price", e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder="18500"
                        className={inp}
                      />
                      {errors.price && <p className="mt-1 font-body text-xs text-terracotta">{errors.price}</p>}
                    </div>
                    <div>
                      <label className={lbl}>Dimensions *</label>
                      <input
                        value={form.dimensions}
                        onChange={(e) => set("dimensions", e.target.value)}
                        placeholder="18in x 24in"
                        className={inp}
                      />
                      {errors.dimensions && <p className="mt-1 font-body text-xs text-terracotta">{errors.dimensions}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={lbl}>Supplier</label>
                      <select
                        value={form.supplierSlug}
                        onChange={(e) => set("supplierSlug", e.target.value)}
                        className={inp}
                      >
                        {suppliers.map((s) => (
                          <option key={s.slug} value={s.slug}>{s.name} — {s.artForm}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Origin</label>
                      <input
                        value={form.origin}
                        onChange={(e) => set("origin", e.target.value)}
                        placeholder="Raghurajpur, Odisha"
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* Description */}
              <Section title="Description">
                <div>
                  <label className={lbl}>Short Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="A brief description shown in listings and search results."
                    className={inp}
                  />
                  <p className={fieldHint}>Shown on collection cards and in search. Keep under 200 characters.</p>
                </div>
              </Section>

              {/* Story */}
              <Section title="Story Behind the Artwork">
                <div>
                  <textarea
                    rows={6}
                    value={form.story}
                    onChange={(e) => set("story", e.target.value)}
                    placeholder="Describe the artisan's process, the subject's significance, the time taken, the pigments used — the story that gives this piece its meaning."
                    className={inp}
                  />
                  <p className={fieldHint}>This appears on the artwork detail page beneath the framing options. Write it as you would a label in a gallery.</p>
                </div>
              </Section>

              {/* Availability */}
              <Section title="Availability & Stock">
                <div className="space-y-4">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={lbl}>Stock Count</label>
                      <input
                        type="number"
                        min={0}
                        value={form.stockCount}
                        onChange={(e) => set("stockCount", e.target.value === "" ? "" : Number(e.target.value))}
                        className={inp}
                      />
                      <p className={fieldHint}>For one-of-one Pattachitra pieces, this will typically be 1.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    <label className="flex items-center gap-2 font-body text-sm text-charcoal/75">
                      <input
                        type="checkbox"
                        checked={form.inStock}
                        onChange={(e) => set("inStock", e.target.checked)}
                        className="h-4 w-4 accent-gold"
                      />
                      In Stock
                    </label>
                    <label className="flex items-center gap-2 font-body text-sm text-charcoal/75">
                      <input
                        type="checkbox"
                        checked={form.frameAvailable}
                        onChange={(e) => set("frameAvailable", e.target.checked)}
                        className="h-4 w-4 accent-gold"
                      />
                      Framing Available
                    </label>
                    <label className="flex items-center gap-2 font-body text-sm text-charcoal/75">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => set("featured", e.target.checked)}
                        className="h-4 w-4 accent-gold"
                      />
                      Featured on Homepage
                    </label>
                  </div>
                </div>
              </Section>
            </div>
          )}

          {/* ── TAB: Images ── */}
          {tab === "images" && (
            <ImageManager
              images={form.images}
              onChange={(imgs) => set("images", imgs)}
            />
          )}

          {/* ── TAB: Publishing ── */}
          {tab === "publishing" && (
            <div className="space-y-8">
              <Section title="Publish Status">
                <div className="space-y-3">
                  {(["Draft", "Published", "Hidden", "Sold"] as ArtworkStatus[]).map((s) => (
                    <label
                      key={s}
                      className={`flex cursor-pointer items-start gap-4 rounded-sm border p-4 transition-colors ${
                        form.status === s
                          ? "border-gold/50 bg-gold/5"
                          : "border-charcoal/10 hover:border-charcoal/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={form.status === s}
                        onChange={() => set("status", s)}
                        className="mt-0.5 accent-gold"
                      />
                      <div>
                        <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] ${STATUS_STYLES[s]}`}>{s}</span>
                        <p className="mt-1.5 font-body text-sm text-charcoal/65">{STATUS_DESCRIPTIONS[s]}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Section>

              <Section title="Bulk Gifting Collection">
                <label className={lbl}>Bulk Gifting Collection</label>
                <select
                  value={form.giftingCollection}
                  onChange={(e) => set("giftingCollection", e.target.value)}
                  className={inp}
                >
                  <option value="">None (Default)</option>
                  {GIFTING_COLLECTIONS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <p className={fieldHint}>
                  Optional. Assigning a collection automatically surfaces this artwork on the Bulk Gifting page,
                  adds a "Bulk" badge on its card, and lists it under that collection — it still appears everywhere
                  it already does today (Collections, Unique Handcrafted Pieces). No duplicate entries are created.
                </p>
              </Section>

              <Section title="Summary">
                <div className="space-y-2 font-body text-sm">
                  {[
                    ["Title",      form.title     || "—"],
                    ["Price",      form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : "—"],
                    ["Dimensions", form.dimensions || "—"],
                    ["Supplier",   suppliers.find((s) => s.slug === form.supplierSlug)?.name ?? "—"],
                    ["Origin",     form.origin    || "—"],
                    ["In Stock",   form.inStock   ? "Yes" : "No"],
                    ["Featured",   form.featured  ? "Yes" : "No"],
                    ["Images",     `${form.images.length} uploaded`],
                    ["Status",     form.status],
                    ["Bulk Gifting", form.giftingCollection
                      ? GIFTING_COLLECTIONS.find((c) => c.id === form.giftingCollection)?.name ?? form.giftingCollection
                      : "None"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-charcoal/6 py-2">
                      <span className="text-charcoal/45">{k}</span>
                      <span className="text-charcoal">{v}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-sm bg-charcoal px-7 py-3 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta"
                >
                  <Check className="h-4 w-4" strokeWidth={1.5} />
                  Save Artwork
                </button>
                <button
                  onClick={onClose}
                  className="rounded-sm border border-charcoal/15 px-7 py-3 font-body text-[13px] uppercase tracking-widest2 text-charcoal/55 hover:border-charcoal/30 transition-colors"
                >
                  Discard
                </button>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-start gap-2 rounded-sm border border-terracotta/30 bg-terracotta/5 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-medium text-terracotta">Please fix the following before saving:</p>
                    <ul className="mt-1 list-inside list-disc font-body text-sm text-terracotta/80">
                      {Object.values(errors).map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Image Manager — upload, reorder, cover, delete, replace
───────────────────────────────────────────────────────────────── */
function ImageManager({
  images,
  onChange,
}: {
  images: ImageEntry[];
  onChange: (imgs: ImageEntry[]) => void;
}) {
  const fileInputRef   = useRef<HTMLInputElement>(null);
  const replaceRef     = useRef<HTMLInputElement>(null);
  const replaceTarget  = useRef<string | null>(null);
  const dragItem       = useRef<number | null>(null);
  const dragOverItem   = useRef<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  /* Add images via file picker or drop */
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const entries: ImageEntry[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(f),
        file: f,
        isCover: false,
      }));
    const merged = [...images, ...entries];
    // Auto-assign cover if none set
    if (!merged.some((i) => i.isCover) && merged.length > 0) {
      merged[0].isCover = true;
    }
    onChange(merged);
  }, [images, onChange]);

  /* Drop zone handlers */
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  /* Delete */
  const remove = (id: string) => {
    let updated = images.filter((i) => i.id !== id);
    // Re-assign cover if the deleted image was cover
    if (!updated.some((i) => i.isCover) && updated.length > 0) {
      updated = updated.map((i, idx) => ({ ...i, isCover: idx === 0 }));
    }
    onChange(updated);
  };

  /* Set cover */
  const setCover = (id: string) =>
    onChange(images.map((i) => ({ ...i, isCover: i.id === id })));

  /* Replace */
  const openReplace = (id: string) => {
    replaceTarget.current = id;
    replaceRef.current?.click();
  };
  const onReplaceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replaceTarget.current) return;
    onChange(
      images.map((img) =>
        img.id === replaceTarget.current
          ? { ...img, url: URL.createObjectURL(file), file }
          : img
      )
    );
    e.target.value = "";
    replaceTarget.current = null;
  };

  /* Drag-to-reorder */
  const onDragStart = (_e: React.DragEvent, idx: number) => {
    dragItem.current = idx;
  };
  const onDragEnter = (_e: React.DragEvent, idx: number) => {
    dragOverItem.current = idx;
  };
  const onDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const reordered = [...images];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, moved);
    dragItem.current = null;
    dragOverItem.current = null;
    onChange(reordered);
  };

  const cover = images.find((i) => i.isCover);

  return (
    <div className="space-y-8">
      <Section title="Gallery Images">
        <p className="mb-5 font-body text-[13px] leading-relaxed text-charcoal/55">
          Upload multiple images for this artwork. Drag to reorder them. The first image in
          the list will appear as the main image in listings unless you choose a cover below.
          Once connected to Cloudinary, images are stored permanently — for now, previews
          are local to this session.
        </p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed py-12 transition-colors ${
            isDragOver
              ? "border-gold bg-gold/5"
              : "border-charcoal/20 bg-beige hover:border-gold/50 hover:bg-gold/3"
          }`}
        >
          <Upload className="h-7 w-7 text-charcoal/30" strokeWidth={1.5} />
          <p className="mt-3 font-body text-sm text-charcoal/50">
            Drop images here, or <span className="text-gold underline underline-offset-2">click to browse</span>
          </p>
          <p className="mt-1 font-body text-[11px] text-charcoal/30">PNG, JPG, WebP · Up to 10 MB each · Multiple allowed</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
        {/* Hidden replace input */}
        <input
          ref={replaceRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onReplaceFile}
        />

        {/* Image grid */}
        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                draggable
                onDragStart={(e) => onDragStart(e, idx)}
                onDragEnter={(e) => onDragEnter(e, idx)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="group relative aspect-square overflow-hidden rounded-sm border border-charcoal/10 bg-beige"
              >
                <img
                  src={img.url}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Cover badge */}
                {img.isCover && (
                  <div className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 font-body text-[10px] uppercase tracking-widest2 text-ivory">
                    Cover
                  </div>
                )}

                {/* Drag handle */}
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-5 w-5 text-ivory drop-shadow-md" strokeWidth={1.5} />
                </div>

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 flex flex-col items-end justify-end gap-1.5 bg-charcoal/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {!img.isCover && (
                    <button
                      onClick={() => setCover(img.id)}
                      title="Set as cover"
                      className="flex items-center gap-1 rounded-sm bg-gold px-2 py-1 font-body text-[10px] text-ivory transition-opacity hover:bg-gold/80"
                    >
                      <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} /> Cover
                    </button>
                  )}
                  <button
                    onClick={() => openReplace(img.id)}
                    title="Replace image"
                    className="flex items-center gap-1 rounded-sm bg-charcoal/80 px-2 py-1 font-body text-[10px] text-ivory hover:bg-charcoal"
                  >
                    <RefreshCw className="h-3 w-3" strokeWidth={1.5} /> Replace
                  </button>
                  <button
                    onClick={() => remove(img.id)}
                    title="Delete image"
                    className="flex items-center gap-1 rounded-sm bg-terracotta px-2 py-1 font-body text-[10px] text-ivory hover:bg-terracotta/80"
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={1.5} /> Delete
                  </button>
                </div>

                {/* Position badge */}
                <div className="absolute bottom-1.5 right-1.5 rounded-full bg-charcoal/60 px-1.5 py-0.5 font-body text-[10px] text-ivory">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <p className="mt-3 font-body text-[11px] text-charcoal/35">
            Drag images to reorder. Hover over any image for cover, replace, and delete options.
          </p>
        )}
      </Section>

      {/* Cover image summary */}
      {cover && (
        <Section title="Cover Image">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-charcoal/10">
              <img src={cover.url} alt="Cover" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-body text-sm text-charcoal">This image appears in collection grids and listing cards.</p>
              <p className="mt-1 font-body text-xs text-charcoal/45">To change the cover, hover over any gallery image and click Cover.</p>
            </div>
          </div>
        </Section>
      )}

      {images.length === 0 && (
        <div className="rounded-sm border border-charcoal/10 bg-beige px-5 py-4">
          <p className="font-body text-sm text-charcoal/55">
            No images uploaded yet. Upload at least one image before publishing this artwork.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-5 font-body text-xs uppercase tracking-widest2 text-charcoal/40">{title}</p>
      <div className="rounded-sm border border-charcoal/10 bg-ivory p-6">{children}</div>
    </div>
  );
}
