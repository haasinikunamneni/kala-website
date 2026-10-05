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
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/artwork/${painting.slug}`} className="group flex h-full flex-col focus-ring">

        {/* Image */}
        <div className="relative aspect-4/5 overflow-hidden rounded-xs shadow-xs transition-shadow duration-500 group-hover:shadow-lg">
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

        {/*
          Information area — one structure for every card.
          Title/price and metadata sit at the top; the availability/action row is
          pushed to the bottom of the card (mt-auto) so its position depends on the
          card's height (stretched to the tallest card in the grid row), never on
          title length, price length or whether a bulk badge exists.
        */}
        <div className="flex flex-1 flex-col">
          {/* Title + price row — title reserves two lines so wrapping never shifts what follows */}
          <div className="mt-3 flex items-start justify-between gap-2 sm:gap-3">
            <h3 className="min-h-[2.8em] min-w-0 font-display text-base leading-snug text-charcoal sm:text-xl sm:leading-7">
              {painting.title}
            </h3>
            {/* Same line-height as the title so the price sits on the title's first baseline */}
            <p className="whitespace-nowrap font-body text-xs leading-snug text-gold sm:text-sm sm:leading-7">
              ₹{painting.price.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Art form · origin */}
          <p className="mt-0.5 font-body text-[10px] uppercase tracking-wider text-charcoal/50 sm:text-xs sm:tracking-widest2">
            {painting.artForm} · {painting.origin}
          </p>

          {/*
            Availability / action row — always rendered, fixed minimum height.
            Status and BUY share the first line; the bulk badge sits beneath on
            narrow cards and beside the status from sm up.
          */}
          <div className="mt-auto box-content flex h-11 items-start justify-between gap-x-2 pt-3 sm:h-6 sm:items-center">
            <div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-x-3">
              <span className="whitespace-nowrap font-body text-[9px] uppercase leading-4 tracking-wider text-charcoal/40 sm:text-[10px] sm:tracking-widest2">
                {isSold ? "" : "Available"}
              </span>
              {isBulk && (
                <span className="whitespace-nowrap rounded-full border border-terracotta/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-terracotta sm:text-[10px] sm:tracking-widest2">
                  Avail in Bulk
                </span>
              )}
            </div>

            {!isSold && (
              <span className="shrink-0 whitespace-nowrap font-body text-[9px] uppercase leading-4 tracking-wider text-charcoal/50 transition-colors duration-200 group-hover:text-gold sm:text-[10px] sm:tracking-widest2">
                Buy →
              </span>
            )}
          </div>
        </div>

      </Link>
    </motion.div>
  );
}
