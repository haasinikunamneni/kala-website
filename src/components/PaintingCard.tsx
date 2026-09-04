import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Painting } from "../types";
import { PlaceholderArtwork } from "./PlaceholderArtwork";

interface PaintingCardProps {
  painting: Painting;
  index?: number;
}

export function PaintingCard({ painting, index = 0 }: PaintingCardProps) {
  const isSold = painting.sold;
  const isBulk = !!painting.giftingCollection;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/artwork/${painting.slug}`} className="group block focus-ring">

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm transition-shadow duration-500 group-hover:shadow-lg">
          <div className="h-full w-full">
            {painting.coverImageUrl ? (
              <img
                src={painting.coverImageUrl}
                alt={painting.title}
                className="h-full w-full object-contain"
                style={painting.imageRotation ? { transform: `rotate(${painting.imageRotation}deg)` } : undefined}
              />
            ) : (
              <div className="h-full w-full transition-transform duration-700 ease-gallery group-hover:scale-[1.04]">
                <PlaceholderArtwork
                  title={painting.title}
                  artForm={painting.artForm}
                  palette={painting.palette}
                  seed={index + 1}
                  className="h-full w-full"
                />
              </div>
            )}
          </div>

          {/* Sold badge on image */}
          {isSold && (
            <span className="absolute left-3 top-3 bg-charcoal px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-ivory">
              Sold
            </span>
          )}
        </div>

        {/* Title + price row */}
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-charcoal">{painting.title}</h3>
          <p className="whitespace-nowrap font-body text-sm text-gold">
            ₹{painting.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Art form · origin */}
        <p className="mt-0.5 font-body text-xs uppercase tracking-widest2 text-charcoal/50">
          {painting.artForm} · {painting.origin}
        </p>

        {/* Compact status row — shown only when there's something to display */}
        {(isBulk || !isSold) && (
          <div className="mt-2 flex items-center gap-2">
            {/* Bulk tag */}
            {isBulk && (
              <span className="rounded-full border border-terracotta/40 px-2 py-0.5 font-body text-[10px] uppercase tracking-widest2 text-terracotta">
                Avail in Bulk
              </span>
            )}

            {/* Stock status */}
            {!isSold && (
              <span className="font-body text-[10px] uppercase tracking-widest2 text-charcoal/40">
                Available
              </span>
            )}

            {/* Spacer */}
            <span className="flex-1" />

            {/* Buy cue */}
            {!isSold && (
              <span className="font-body text-[10px] uppercase tracking-widest2 text-charcoal/50 transition-colors duration-200 group-hover:text-gold">
                Buy →
              </span>
            )}
          </div>
        )}

      </Link>
    </motion.div>
  );
}
