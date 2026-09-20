import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { GiftingCollectionMeta } from "../data/giftingCollections";
import { paintings } from "../data/placeholderData";
import { PlaceholderArtwork } from "./PlaceholderArtwork";

interface GiftingCollectionCardProps {
  collection: GiftingCollectionMeta;
}

export function GiftingCollectionCard({ collection }: GiftingCollectionCardProps) {
  const paintingsInCollection = paintings.filter((p) => p.giftingCollection === collection.id);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  /* Auto-advance every 2.5 s */
  useEffect(() => {
    if (paintingsInCollection.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % paintingsInCollection.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [paintingsInCollection.length]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const activePainting = paintingsInCollection[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="group overflow-hidden rounded-sm border border-charcoal/10 bg-ivory transition-shadow duration-500 hover:shadow-lg">
      {/* Sliding image carousel */}
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activePainting?.coverImageUrl ? (
              <img
                src={activePainting.coverImageUrl}
                alt={activePainting.title}
                className="h-full w-full object-contain"
                style={
                  activePainting.imageRotation
                    ? { transform: `rotate(${activePainting.imageRotation}deg)` }
                    : undefined
                }
              />
            ) : activePainting ? (
              <PlaceholderArtwork
                title={activePainting.title}
                artForm={activePainting.artForm}
                palette={activePainting.palette}
                seed={current + 1}
                className="h-full w-full"
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Slide indicator dots */}
        {paintingsInCollection.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {paintingsInCollection.map((_: unknown, i: number) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-4 bg-gold" : "w-1.5 bg-ivory/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Variant count badge */}
        <div className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-ivory backdrop-blur-sm">
          {paintingsInCollection.length} variations
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <p className="font-body text-[10px] uppercase tracking-widest2 text-terracotta">
          Bulk Gifting Collection
        </p>
        <h3 className="mt-2 font-display text-2xl text-charcoal">{collection.name}</h3>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-charcoal/60 line-clamp-2">
          {collection.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-4">
          <p className="font-body text-xs text-charcoal/40">
            Min. order {10} pieces
          </p>
          <Link
            to={`/gifting/${collection.id}`}
            className="font-body text-xs uppercase tracking-widest2 text-terracotta transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
          >
            View Collection →
          </Link>
        </div>
      </div>
    </div>
  );
}
