import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { PaintingCard } from "../components/PaintingCard";
import { getGiftingCollectionMeta } from "../data/giftingCollections";
import { paintings as allPaintings } from "../data/placeholderData";
import { submitGiftingRequest } from "../lib/db";

export function GiftingCollectionDetail() {
  const { slug } = useParams();
  const collection = slug ? getGiftingCollectionMeta(slug) : undefined;

  if (!slug || !collection) return <Navigate to="/gifting" replace />;

  const paintings = allPaintings.filter((p: import("../types").Painting) => p.giftingCollection === slug);

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/40">
          <Link to="/gifting" className="hover:text-gold">Bulk Gifting</Link>
          {" / "}{collection.name}
        </p>

        <div className="mt-8">
          <SectionHeading
            eyebrow="Bulk Gifting Collection"
            title={collection.name}
            description={collection.description}
          />
          <p className="mt-3 font-body text-xs uppercase tracking-widest2 text-charcoal/40">
            Minimum order {10} pieces · All variations available
          </p>
        </div>

        {/* Paintings grid — same card as Collections, read-only */}
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {paintings.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <PaintingCard painting={p} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Gifting note */}
        <div className="mt-16 grid gap-6 rounded-sm border border-gold/30 bg-gold/5 p-8 sm:grid-cols-3">
          {[
            ["Any Quantity", `Minimum ${10} pieces. No upper limit — we coordinate directly with the artisan workshop.`],
            ["Custom Packaging", "Each piece wrapped in unbleached cotton and boxed in a signature kalā kraft box with a handwritten note."],
            ["Framing Available", "Black or Brown frame, or Custom frame on request. Confirmed during the order process."],
          ].map(([title, text]) => (
            <div key={title}>
              <div className="h-px w-8 bg-gold" />
              <p className="mt-4 font-display text-lg text-charcoal">{title}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">{text}</p>
            </div>
          ))}
        </div>

        {/* Enquiry form */}
        <div className="mt-16 border-t border-charcoal/10 pt-12">
          <p className="font-display text-2xl text-charcoal">Submit A Gifting Enquiry</p>
          <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-charcoal/60">
            Tell us your occasion, quantity, and budget — we'll come back within two business days with a proposal.
          </p>
          <GiftingEnquiryForm collectionName={collection.name} />
        </div>
      </div>
    </div>
  );
}

function GiftingEnquiryForm({ collectionName }: { collectionName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const inp = "w-full rounded-sm border border-charcoal/15 bg-beige px-4 py-3 font-body text-sm focus-ring placeholder:text-charcoal/40";

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
      requirements: `Collection: ${collectionName}. ${fd.get("requirements") ?? ""}`,
    });
    setBusy(false);
    if (result.ok) setSubmitted(true);
    else setError(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 max-w-xl rounded-sm border border-gold/40 bg-beige p-8">
        <p className="font-display text-2xl text-charcoal">Thank you</p>
        <p className="mt-2 font-body text-sm text-charcoal/70">
          We've received your enquiry for the {collectionName} collection and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
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
      <textarea name="requirements" placeholder="Any specific requirements — colour preferences, framing, packaging, delivery location" rows={4} className={inp} />
      {error && <p className="font-body text-xs text-terracotta">Something went wrong — please try again or reach us on WhatsApp.</p>}
      <button
        type="submit" disabled={busy}
        className="mt-2 w-fit rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
      >
        {busy ? "Submitting…" : "Submit Gifting Enquiry"}
      </button>
    </form>
  );
}
