import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem, Palette, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { PaintingCard } from "../components/PaintingCard";
import { GiftingCollectionCarousel } from "../components/GiftingCollectionCarousel";
import { usePaintings } from "../lib/hooks";
import { submitCommissionRequest, submitGiftingRequest } from "../lib/db";
import { getGiftingCollectionMeta } from "../data/giftingCollections";
import type { Painting } from "../types";

/* ─────────────────────────────────────────────────────────────────
   Three category entry cards — same as the first draft
───────────────────────────────────────────────────────────────── */
const categories = [
  {
    id: "unique",
    icon: Gem,
    title: "Unique Handcrafted Pieces",
    description:
      "Ready-to-purchase, one-of-one artworks. Once a piece sells, it stays visible with a Sold badge — a record of the artisan's work.",
  },
  {
    id: "commission",
    icon: Palette,
    title: "Commission An Artwork",
    description:
      "Request a custom piece. We coordinate directly with the artisan on subject, scale, and framing.",
  },
  {
    id: "gifting",
    icon: Gift,
    title: "Corporate & Ceremony Gifting",
    description:
      "Bulk gifting for weddings, housewarmings, corporate events, and festivals — with custom packaging and framing.",
  },
] as const;

type Section = "unique" | "commission" | "gifting";

/* ─────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────── */
export function Categories() {
  const [active, setActive] = useState<Section | null>(null);

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Categories"
          title="Three Ways To Collect"
          description="Whichever path you choose, every piece is sourced, framed, and curated with the same care."
        />

        {/* Entry cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {categories.map((cat) => {
            const isOpen = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(isOpen ? null : cat.id)}
                className={`group flex flex-col justify-between rounded-sm border px-8 py-8 text-left transition-all duration-500 focus-ring ${
                  isOpen
                    ? "border-gold/60 bg-beige shadow-md"
                    : "border-charcoal/10 bg-ivory hover:border-gold/40 hover:shadow-sm"
                }`}
              >
                <div>
                  <cat.icon
                    className={`h-7 w-7 transition-colors duration-300 ${isOpen ? "text-gold" : "text-charcoal/40 group-hover:text-gold/70"}`}
                    strokeWidth={1.25}
                  />
                  <h3 className="mt-6 font-display text-2xl text-charcoal">{cat.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/60">{cat.description}</p>
                </div>
                <span
                  className={`mt-8 inline-flex items-center font-body text-xs uppercase tracking-widest2 transition-all duration-300 ${
                    isOpen ? "text-gold" : "text-terracotta group-hover:translate-x-1"
                  }`}
                >
                  {isOpen ? "Close ↑" : "Explore →"}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Sections — revealed on card click, no accordion chrome ── */}
        {active === "unique" && (
          <motion.div
            key="unique"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 border-t border-charcoal/10 pt-16"
          >
            <UniqueSection />
          </motion.div>
        )}

        {active === "commission" && (
          <motion.div
            key="commission"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 border-t border-charcoal/10 pt-16"
          >
            <CommissionSection />
          </motion.div>
        )}

        {active === "gifting" && (
          <motion.div
            key="gifting"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 border-t border-charcoal/10 pt-16"
          >
            <GiftingSection />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section: Unique Handcrafted Pieces
───────────────────────────────────────────────────────────────── */
function UniqueSection() {
  const { data } = usePaintings();
  const all = (data ?? []).filter((p) => p.status === "Published" || p.status === "Sold");
  return (
    <div>
      <SectionHeading
        eyebrow="Unique Pieces"
        title="One of One"
        description="Only one of each piece ever exists. Once sold it stays visible in the archive — a permanent record of the artisan's work."
      />
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((p, i) => (
          <PaintingCard painting={p} index={i} key={p.id} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section: Commission An Artwork
───────────────────────────────────────────────────────────────── */
const commissionSteps = [
  {
    stage: "Reference",
    description: "Share a subject, a reference image, or simply a feeling — the deity, motif, or story you want captured.",
  },
  {
    stage: "Design",
    description: "The artisan sketches a preliminary layout. We share it for your approval before painting begins.",
  },
  {
    stage: "Painting",
    description: "Painted over several days in natural pigments. Each layer dried and burnished before the next is applied.",
  },
  {
    stage: "Framed",
    description: "Professionally framed in your chosen style with a certificate of authenticity included.",
  },
  {
    stage: "Delivered",
    description: "Packed in archival tissue, boxed in the signature kalā crate, and couriered to your door.",
  },
];

function CommissionSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [busy, setBusy]           = useState(false);
  const inp = "w-full rounded-sm border border-charcoal/15 bg-beige px-4 py-3 font-body text-sm focus-ring placeholder:text-charcoal/40";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const result = await submitCommissionRequest({
      name:             fd.get("name") as string,
      email:            fd.get("email") as string,
      phone:            fd.get("phone") as string,
      dimensions:       (fd.get("dimensions") as string) || undefined,
      budget:           (fd.get("budget") as string) || undefined,
      frame_preference: (fd.get("frame") as string) || undefined,
      message:          fd.get("message") as string,
    });
    setBusy(false);
    if (result.ok) setSubmitted(true);
    else setError(true);
  };

  return (
    <div>
      <SectionHeading
        eyebrow="Commission"
        title="An Artwork Made For You"
        description="Tell us what you have in mind. We coordinate directly with the artisan on subject, scale, and framing — from your first reference to delivery at your door."
      />

      {/* Process steps */}
      <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {commissionSteps.map((step, i) => (
          <motion.div
            key={step.stage}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-gold/8 font-body text-xs text-gold">
              {i + 1}
            </div>
            <p className="mt-4 font-display text-lg text-charcoal">{step.stage}</p>
            <p className="mt-2 font-body text-[13px] leading-relaxed text-charcoal/60">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-16 border-t border-charcoal/10 pt-12">
        <p className="font-display text-2xl text-charcoal">Start Your Commission</p>
        {submitted ? (
          <FormSuccess />
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid max-w-2xl gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="name"  placeholder="Name"  className={inp} />
              <input required name="email" type="email" placeholder="Email" className={inp} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="phone"      placeholder="Phone"               className={inp} />
              <input         name="dimensions"  placeholder="Preferred Dimensions" className={inp} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <input name="budget" placeholder="Budget (₹)" className={inp} />
              <select name="frame" className={inp} defaultValue="No Preference">
                {["No Preference", "Black Frame", "Brown Frame", "Custom Frame"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <label className="font-body text-xs uppercase tracking-widest2 text-charcoal/45">
              Reference Image (optional)
              <input type="file" accept="image/*" className="mt-2 block w-full font-body text-sm text-charcoal/50" />
            </label>
            <textarea required name="message" placeholder="Tell us about the piece — subject, mood, occasion, anything that matters to you" rows={4} className={inp} />
            {error && <p className="font-body text-xs text-terracotta">Something went wrong — please try again or reach us on WhatsApp.</p>}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 w-fit rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit Commission Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section: Corporate & Ceremony Gifting
   Shows available paintings + enquiry form — clean, no inspiration
   deck, no occasion cards.
───────────────────────────────────────────────────────────────── */
function GiftingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [busy, setBusy]           = useState(false);
  const { data } = usePaintings();
  const giftable = (data ?? []).filter((p) => p.status === "Published" && !p.sold && p.giftingCollection);
  const inp = "w-full rounded-sm border border-charcoal/15 bg-beige px-4 py-3 font-body text-sm focus-ring placeholder:text-charcoal/40";

  // Group giftable artworks by collection id — dynamic, no manual selection.
  const collectionMap = new Map<string, Painting[]>();
  for (const p of giftable) {
    const id = p.giftingCollection as string;
    if (!collectionMap.has(id)) collectionMap.set(id, []);
    collectionMap.get(id)!.push(p);
  }
  const collections = Array.from(collectionMap.entries()).map(([id, items]) => ({
    meta: getGiftingCollectionMeta(id),
    items,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const result = await submitGiftingRequest({
      company:      fd.get("company") as string,
      event_type:   fd.get("event_type") as string,
      quantity:     Number(fd.get("quantity")),
      budget:       (fd.get("budget") as string) || undefined,
      required_by:  (fd.get("required_by") as string) || undefined,
      requirements: (fd.get("requirements") as string) || undefined,
    });
    setBusy(false);
    if (result.ok) setSubmitted(true);
    else setError(true);
  };

  return (
    <div>
      <SectionHeading
        eyebrow="Gifting"
        title="Available Collections"
        description="Curated collections available for bulk gifting — weddings, return gifts, corporate events, and festivals. Browse a collection, then tell us what you need."
      />

      {/* Available collections */}
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map(({ meta, items }, i) => (
          <GiftingCollectionCard key={meta.id} meta={meta} items={items} index={i} />
        ))}
      </div>

      {collections.length === 0 && (
        <p className="mt-10 font-body text-sm text-charcoal/50">
          No gifting collections are available right now — check back soon or get in touch directly.
        </p>
      )}

      {/* Gifting note */}
      <div className="mt-16 border-t border-charcoal/10 pt-12">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Custom Packaging", "Each piece is wrapped in unbleached cotton and boxed in a signature kalā kraft box with a handwritten note on handmade paper."],
            ["Bulk Pricing", "Pricing is tiered by quantity. Share your order size and we'll confirm a per-piece rate that works for your budget."],
            ["Any Occasion", "Weddings, housewarmings, Diwali, corporate events, awards, and product launches — we've helped with all of them."],
          ].map(([title, text]) => (
            <div key={title}>
              <div className="h-px w-8 bg-gold" />
              <p className="mt-4 font-display text-lg text-charcoal">{title}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry form */}
      <div className="mt-16 border-t border-charcoal/10 pt-12">
        <p className="font-display text-2xl text-charcoal">Submit A Gifting Enquiry</p>
        <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-charcoal/60">
          Tell us about your event — occasion, quantity, budget, and timeline — and we'll come back within two business days.
        </p>
        {submitted ? (
          <FormSuccess />
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid max-w-2xl gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="company" placeholder="Name / Company" className={inp} />
              <select name="event_type" className={inp} defaultValue="Wedding">
                {["Wedding", "Return Gifts", "Housewarming", "Corporate Event", "Festival", "Award", "Custom Event"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="quantity" type="number" min={1} placeholder="Quantity needed" className={inp} />
              <input name="budget" placeholder="Budget (₹)" className={inp} />
            </div>
            <input name="required_by" type="date" className={inp} aria-label="Required by date" />
            <textarea name="requirements" placeholder="Any specific requirements — sizes, subjects, packaging, delivery" rows={4} className={inp} />
            {error && <p className="font-body text-xs text-terracotta">Something went wrong — please try again or reach us on WhatsApp.</p>}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 w-fit rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit Gifting Enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Bulk Gifting collection card — premium carousel preview
───────────────────────────────────────────────────────────────── */
function GiftingCollectionCard({
  meta,
  items,
  index,
}: {
  meta: { id: string; name: string; description: string };
  items: Painting[];
  index: number;
}) {
  const navigate = useNavigate();
  const slides = items
    .filter((p) => p.coverImageUrl)
    .map((p) => ({ src: p.coverImageUrl as string, alt: p.title, rotation: p.imageRotation }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col overflow-hidden rounded-sm border border-charcoal/10 bg-ivory shadow-sm transition-shadow duration-500 hover:shadow-lg"
    >
      <GiftingCollectionCarousel slides={slides} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-charcoal">{meta.name}</h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-charcoal/60">{meta.description}</p>
        <p className="mt-4 font-body text-xs uppercase tracking-widest2 text-charcoal/40">
          {items.length} {items.length === 1 ? "artwork" : "artworks"}
        </p>
        <button
          onClick={() => navigate(`/collections?gifting=${meta.id}`)}
          className="mt-5 flex w-fit items-center gap-2 rounded-sm border border-charcoal/20 px-5 py-2.5 font-body text-[12px] uppercase tracking-widest2 text-charcoal transition-colors hover:border-gold hover:text-gold"
        >
          View Collection
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Shared
───────────────────────────────────────────────────────────────── */
function FormSuccess() {
  return (
    <div className="mt-8 max-w-xl rounded-sm border border-gold/40 bg-beige p-8">
      <p className="font-display text-2xl text-charcoal">Thank you</p>
      <p className="mt-2 font-body text-sm text-charcoal/70">
        We've received your request and will reach out by email or WhatsApp shortly.
      </p>
    </div>
  );
}
