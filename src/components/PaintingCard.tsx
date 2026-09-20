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
        <div className="mt-3 flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="font-display text-base leading-snug text-charcoal sm:text-xl">{painting.title}</h3>
          <p className="whitespace-nowrap font-body text-xs text-gold sm:text-sm">
            ₹{painting.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Art form · origin */}
        <p className="mt-0.5 font-body text-[10px] uppercase tracking-wider text-charcoal/50 sm:text-xs sm:tracking-widest2">
          {painting.artForm} · {painting.origin}
        </p>

        {/* Compact status row — shown only when there's something to display */}
        {(isBulk || !isSold) && (
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {/* Bulk tag */}
              {isBulk && (
                <span className="whitespace-nowrap rounded-full border border-terracotta/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-terracotta sm:text-[10px] sm:tracking-widest2">
                  Avail in Bulk
                </span>
              )}

              {/* Stock status */}
              {!isSold && (
                <span className="whitespace-nowrap font-body text-[9px] uppercase tracking-wider text-charcoal/40 sm:text-[10px] sm:tracking-widest2">
                  Available
                </span>
              )}
            </div>

            {/* Buy cue — own line on mobile, right-aligned inline from sm up */}
            {!isSold && (
              <span className="self-end whitespace-nowrap font-body text-[9px] uppercase tracking-wider text-charcoal/50 transition-colors duration-200 group-hover:text-gold sm:ml-auto sm:self-auto sm:text-[10px] sm:tracking-widest2">
                Buy →
              </span>
            )}
          </div>
        )}

      </Link>
    </motion.div>
  );
}
