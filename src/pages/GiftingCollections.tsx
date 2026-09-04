import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { GiftingCollectionCard } from "../components/GiftingCollectionCard";
import { GIFTING_COLLECTIONS } from "../data/giftingCollections";

export function GiftingCollections() {
  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Bulk Gifting"
          title="Collections Available for Gifting"
          description="Every collection shown here is available for bulk orders — framed, individually packaged, and delivered. Browse the collections below, then submit a gifting enquiry."
        />

        {/* Collections grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GIFTING_COLLECTIONS.map((collection: import("../data/giftingCollections").GiftingCollectionMeta, i: number) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <GiftingCollectionCard collection={collection} />
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-20 border-t border-charcoal/10 pt-14">
          <p className="font-display text-2xl text-charcoal">How Bulk Gifting Works</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Browse", "Choose a collection and explore the available paintings — each available in multiple colour variations or finishes."],
              ["Enquire", "Submit your requirements — occasion, quantity, budget, and delivery date — and we'll come back with a proposal within two business days."],
              ["Receive", "Each piece is framed, individually wrapped in unbleached cotton, and delivered in a signature kalā kraft box with a handwritten note."],
            ].map(([title, text], i) => (
              <div key={title}>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 font-body text-xs text-gold">
                  {i + 1}
                </div>
                <p className="mt-4 font-display text-lg text-charcoal">{title}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
