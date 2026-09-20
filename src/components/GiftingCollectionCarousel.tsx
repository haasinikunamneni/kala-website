import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
  rotation?: 0 | 90 | 180 | 270;
}

interface GiftingCollectionCarouselProps {
  slides: Slide[];
  intervalMs?: number;
}

/** Continuously auto-sliding image carousel used on Bulk Gifting collection
 *  cards. Loops infinitely, pauses on hover, and supports manual arrows —
 *  all images are passed in by the caller, pulled dynamically from whatever
 *  artworks are currently assigned to the collection. */
export function GiftingCollectionCarousel({ slides, intervalMs = 3200 }: GiftingCollectionCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length, intervalMs]);

  if (slides.length === 0) return null;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div
      className="group/carousel relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-charcoal/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-gallery"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="h-full w-full flex-shrink-0">
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-contain"
              style={s.rotation ? { transform: `rotate(${s.rotation}deg)` } : undefined}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-1.5 opacity-0 shadow-sm transition-opacity duration-300 hover:bg-ivory group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-1.5 opacity-0 shadow-sm transition-opacity duration-300 hover:bg-ivory group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-gold" : "w-1.5 bg-ivory/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
