import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Trash2, Info, Eye, Loader2, Check } from "lucide-react";
import { Toggle } from "../../../components/admin/Toggle";
import { frames as seedFrames, glassOptions as seedGlass } from "../../../data/placeholderData";
import { adminUpdateFrames, adminUpdateGlass } from "../../../lib/db";
import { supabase, isSupabaseConfigured as isConfigured } from "../../../lib/supabase";
import type { Frame, Glass } from "../../../types";

/* ─────────────────────────────────────────────────────────────────
   Extended local types (extra fields not persisted to backend yet)
───────────────────────────────────────────────────────────────── */
interface FrameLocal extends Frame {
  cornerPreviewUrl?: string;   // object URL from local upload
  unit: "sqm" | "sqft";
}

interface GlassLocal extends Glass {
  descriptionDraft: string;    // editable copy of description
}

interface CustomFrameImage {
  id: string;
  url: string;
  file?: File;
}

/* ─────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */
const inp  = "rounded-sm border border-charcoal/15 bg-beige px-3 py-2.5 font-body text-sm focus-ring";
const lbl  = "font-body text-[11px] uppercase tracking-widest2 text-charcoal/45";
const hint = "mt-1 font-body text-[11px] text-charcoal/35";

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <p className="font-display text-xl text-charcoal">{title}</p>
      <p className="mt-1 max-w-xl font-body text-sm text-charcoal/55">{description}</p>
    </div>
  );
}

function CustomerPreviewBadge({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3">
      <Eye className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" strokeWidth={1.5} />
      <p className="font-body text-xs text-charcoal/65">
        <span className="font-medium text-charcoal">Customer sees: </span>{text}
      </p>
    </div>
  );
}

function InfoNote({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-sm border border-charcoal/10 bg-beige px-4 py-3">
      <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-charcoal/40" strokeWidth={1.5} />
      <p className="font-body text-xs text-charcoal/55">{text}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export function AdminFrames() {
  const [frames, setFrames] = useState<FrameLocal[]>(
    seedFrames.map((f) => ({ ...f, unit: "sqm" as const }))
  );
  const [glassOpts, setGlassOpts] = useState<GlassLocal[]>(
    seedGlass.map((g) => ({ ...g, descriptionDraft: g.description }))
  );
  const [customImages, setCustomImages] = useState<CustomFrameImage[]>([]);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState<{ msg: string; ok: boolean } | null>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  /* Load from Supabase on mount */
  const load = useCallback(async () => {
    if (!isConfigured) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: fData } = await (supabase as any).from("frames").select("*").order("name");
    if (fData?.length) {
      setFrames(fData.map((f: Record<string, unknown>) => ({
        id: f.id as string,
        name: f.name as Frame["name"],
        pricePerSqM: f.price_per_sqm as number,
        available: f.available as boolean,
        cornerImageUrl: f.corner_image_url as string | undefined,
        unit: (f.unit as "sqm" | "sqft") ?? "sqm",
      })));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: gData } = await (supabase as any).from("glass_options").select("*").order("price_per_sqm");
    if (gData?.length) {
      setGlassOpts(gData.map((g: Record<string, unknown>) => ({
        id: g.id as string,
        name: g.name as Glass["name"],
        description: g.description as string,
        descriptionDraft: g.description as string,
        pricePerSqM: g.price_per_sqm as number,
        available: g.available as boolean,
      })));
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* Save all to Supabase */
  const saveAll = async () => {
    setSaving(true);
    const framesToSave: Frame[] = frames.map((f) => ({
      id: f.id,
      name: f.name,
      pricePerSqM: f.pricePerSqM,
      available: f.available,
      cornerImageUrl: f.cornerPreviewUrl ?? f.cornerImageUrl,
    }));
    const glassToSave: Glass[] = glassOpts.map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      pricePerSqM: g.pricePerSqM,
      available: g.available,
    }));
    const [fr, gr] = await Promise.all([
      adminUpdateFrames(framesToSave),
      adminUpdateGlass(glassToSave),
    ]);
    setSaving(false);
    if (fr.ok && gr.ok) showToast("Frames & glass saved.");
    else showToast("Save failed — try again.", false);
  };

  /* ── Frame helpers ── */
  const updateFrame = <K extends keyof FrameLocal>(id: string, key: K, val: FrameLocal[K]) =>
    setFrames((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: val } : f)));

  const setCornerImage = (id: string, file: File) =>
    updateFrame(id, "cornerPreviewUrl", URL.createObjectURL(file));

  const clearCornerImage = (id: string) =>
    updateFrame(id, "cornerPreviewUrl", undefined);

  /* ── Glass helpers ── */
  const updateGlass = <K extends keyof GlassLocal>(id: string, key: K, val: GlassLocal[K]) =>
    setGlassOpts((prev) => prev.map((g) => (g.id === id ? { ...g, [key]: val } : g)));

  const saveGlassDescription = (id: string) =>
    setGlassOpts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, description: g.descriptionDraft } : g))
    );

  /* ── Custom frame image helpers ── */
  const addCustomImages = (files: FileList | null) => {
    if (!files) return;
    const entries: CustomFrameImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `cf-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(f),
        file: f,
      }));
    setCustomImages((prev) => [...prev, ...entries]);
  };

  const removeCustomImage = (id: string) =>
    setCustomImages((prev) => prev.filter((i) => i.id !== id));

  /* ── Price display helper ── */
  const priceLabel = (unit: "sqm" | "sqft") =>
    unit === "sqm" ? "₹ per sq metre" : "₹ per sq foot";

  const editableGlass = glassOpts.filter((g) => g.name !== "None");

  return (
    <div className="space-y-14">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-sm px-5 py-3 font-body text-sm text-ivory shadow-lg ${toast.ok ? "bg-charcoal" : "bg-terracotta"}`}>
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Frames & Glass</h1>
          <p className="mt-1 font-body text-sm text-charcoal/50">
            Configure framing options shown to customers. Changes are saved when you click Save Changes.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 rounded-sm bg-charcoal px-5 py-2.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-60"
        >
          {saving
            ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            : <Check className="h-4 w-4" strokeWidth={1.5} />
          }
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — BASIC FRAMES
      ══════════════════════════════════════════════════════════ */}
      <section>
        <SectionHeader
          title="Basic Frames"
          description="Standard frame options customers can select on the artwork detail page. Each frame's cost is multiplied by the artwork's area to generate the price estimate."
        />

        <div className="space-y-5">
          {frames.map((f) => (
            <div
              key={f.id}
              className={`overflow-hidden rounded-sm border bg-ivory transition-colors ${
                f.available ? "border-charcoal/10" : "border-charcoal/6 opacity-60"
              }`}
            >
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-charcoal/8 bg-beige/60 px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Colour swatch */}
                  <div
                    className="h-5 w-5 rounded-full border border-charcoal/15 shadow-sm"
                    style={{ backgroundColor: f.name === "Black" ? "#1D1D1B" : "#7A5C3A" }}
                  />
                  <p className="font-body font-medium text-charcoal">{f.name} Frame</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-body text-xs ${f.available ? "text-green-600" : "text-charcoal/40"}`}>
                    {f.available ? "Available" : "Unavailable"}
                  </span>
                  <Toggle enabled={f.available} onChange={() => updateFrame(f.id, "available", !f.available)} />
                </div>
              </div>

              {/* Card body */}
              <div className="grid gap-8 p-6 sm:grid-cols-[1fr_1fr_auto]">

                {/* Pricing */}
                <div>
                  <p className={lbl}>Pricing</p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      min={0}
                      value={f.pricePerSqM}
                      onChange={(e) => updateFrame(f.id, "pricePerSqM", Number(e.target.value))}
                      className={`w-28 ${inp}`}
                    />
                    <select
                      value={f.unit}
                      onChange={(e) => updateFrame(f.id, "unit", e.target.value as "sqm" | "sqft")}
                      className={inp}
                    >
                      <option value="sqm">per sq m</option>
                      <option value="sqft">per sq ft</option>
                    </select>
                  </div>
                  <p className={hint}>{priceLabel(f.unit)} · used in customer price estimate</p>
                  {f.pricePerSqM > 0 && (
                    <p className="mt-2 font-body text-xs text-gold">
                      Example: 18×24in ≈ ₹{Math.round(f.pricePerSqM * 0.278).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                {/* Corner sample */}
                <div>
                  <p className={lbl}>Corner Sample Image</p>
                  <p className="mt-1 mb-3 font-body text-[11px] text-charcoal/40">
                    Small photo showing the frame's corner detail. Displayed on the artwork page.
                  </p>
                  {f.cornerPreviewUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={f.cornerPreviewUrl}
                        alt={`${f.name} frame corner`}
                        className="h-24 w-24 rounded-sm border border-charcoal/10 object-cover"
                      />
                      <button
                        onClick={() => clearCornerImage(f.id)}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-ivory shadow"
                        title="Remove image"
                      >
                        <Trash2 className="h-2.5 w-2.5" strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-charcoal/20 bg-beige transition-colors hover:border-gold/50">
                      <Upload className="h-5 w-5 text-charcoal/30" strokeWidth={1.5} />
                      <p className="mt-1.5 font-body text-[10px] text-charcoal/35">Upload</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setCornerImage(f.id, file);
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Customer preview */}
                <div className="sm:col-span-2">
                  <CustomerPreviewBadge
                    text={`Appears as a selectable chip labelled "${f.name}" on the artwork detail page.${f.available ? "" : " Currently hidden from customers."}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-charcoal/10" />

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — GLASS OPTIONS
      ══════════════════════════════════════════════════════════ */}
      <section>
        <SectionHeader
          title="Glass Options"
          description="Customers can add glass protection to any framed artwork. These options appear on the artwork detail page alongside the frame selector."
        />

        <div className="space-y-5">
          {editableGlass.map((g) => {
            const isEditing = g.descriptionDraft !== g.description;
            return (
              <div
                key={g.id}
                className={`overflow-hidden rounded-sm border bg-ivory transition-colors ${
                  g.available ? "border-charcoal/10" : "border-charcoal/6 opacity-60"
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-charcoal/8 bg-beige/60 px-6 py-4">
                  <p className="font-body font-medium text-charcoal">{g.name}</p>
                  <div className="flex items-center gap-3">
                    <span className={`font-body text-xs ${g.available ? "text-green-600" : "text-charcoal/40"}`}>
                      {g.available ? "Available" : "Unavailable"}
                    </span>
                    <Toggle enabled={g.available} onChange={() => updateGlass(g.id, "available", !g.available)} />
                  </div>
                </div>

                {/* Card body */}
                <div className="space-y-5 p-6">
                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className={lbl}>Description shown to customers</p>
                      {isEditing && (
                        <button
                          onClick={() => saveGlassDescription(g.id)}
                          className="font-body text-[11px] text-gold hover:underline"
                        >
                          Save description
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={g.descriptionDraft}
                      onChange={(e) => updateGlass(g.id, "descriptionDraft", e.target.value)}
                      className={`mt-1.5 w-full ${inp}`}
                    />
                    <p className={hint}>Shown beneath the glass selector chips when this option is active.</p>
                  </div>

                  {/* Pricing */}
                  <div>
                    <p className={lbl}>Price per square metre</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="font-body text-sm text-charcoal/40">₹</span>
                      <input
                        type="number"
                        min={0}
                        value={g.pricePerSqM}
                        onChange={(e) => updateGlass(g.id, "pricePerSqM", Number(e.target.value))}
                        className={`w-28 ${inp}`}
                      />
                      <span className="font-body text-xs text-charcoal/40">per sq metre</span>
                    </div>
                    {g.pricePerSqM > 0 && (
                      <p className="mt-1 font-body text-xs text-gold">
                        Example: 18×24in ≈ ₹{Math.round(g.pricePerSqM * 0.278).toLocaleString("en-IN")} added to estimate
                      </p>
                    )}
                  </div>

                  <CustomerPreviewBadge
                    text={`Chip labelled "${g.name}" · description shown on selection · cost added to price estimate`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <InfoNote text="The 'No Glass' option is always available and carries no cost. It does not need to be managed here." />
        </div>
      </section>

      <div className="border-t border-charcoal/10" />

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — CUSTOM FRAMES
      ══════════════════════════════════════════════════════════ */}
      <section>
        <SectionHeader
          title="Custom Frames"
          description="Upload example images of premium custom frames to inspire customers. These appear when the customer selects 'Custom Frame' on the artwork detail page."
        />

        {/* The exact message customers see */}
        <div className="mb-8 rounded-sm border border-charcoal/10 bg-beige p-6">
          <p className={`mb-2 ${lbl}`}>Message displayed to customers</p>
          <p className="font-body text-[15px] leading-relaxed text-charcoal">
            "This artwork can also be framed with a custom frame of your choice. Share a reference image while placing your enquiry and we'll help you find the closest available option."
          </p>
          <p className={`mt-3 ${hint}`}>
            This message is fixed. No price is shown for custom frames — pricing is confirmed during the order conversation.
          </p>
        </div>

        {/* Example image grid */}
        <div>
          <p className={`mb-3 ${lbl}`}>Example Frame Images ({customImages.length} uploaded)</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {customImages.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-sm border border-charcoal/10 bg-beige">
                <img src={img.url} alt="Custom frame example" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => removeCustomImage(img.id)}
                    className="flex items-center gap-1.5 rounded-sm bg-terracotta px-3 py-1.5 font-body text-xs text-ivory transition-opacity hover:bg-terracotta/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Upload tile */}
            <label
              className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-charcoal/20 bg-beige transition-colors hover:border-gold/50"
              onClick={() => customInputRef.current?.click()}
            >
              <Upload className="h-6 w-6 text-charcoal/30" strokeWidth={1.5} />
              <p className="mt-2 font-body text-[11px] text-charcoal/40">Add images</p>
              <input
                ref={customInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addCustomImages(e.target.files)}
              />
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <p className={hint}>
              Upload photos of ornate, premium, or unusual frames — gilded, carved, beaded, rustic timber, etc. These inspire customers and set expectations for what's possible.
            </p>
            <InfoNote text="Custom frames carry no fixed price. Cost is discussed and confirmed during the order enquiry conversation." />
          </div>
        </div>

        {/* How it works for customers */}
        <div className="mt-8 rounded-sm border border-charcoal/10 bg-ivory p-6">
          <p className={`mb-4 ${lbl}`}>How it works for customers</p>
          <ol className="space-y-2 font-body text-sm text-charcoal/70">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 font-body text-[11px] text-gold">1</span>
              Customer selects "Custom Frame" on the artwork detail page.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 font-body text-[11px] text-gold">2</span>
              The message above is shown, along with the example images you upload here.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 font-body text-[11px] text-gold">3</span>
              The price estimate block is replaced with a note that final pricing will be confirmed after frame selection.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 font-body text-[11px] text-gold">4</span>
              Customer submits their enquiry via WhatsApp, Instagram, or email. You confirm the frame and price in conversation.
            </li>
          </ol>
        </div>
      </section>

    </div>
  );
}
