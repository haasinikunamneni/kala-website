import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { PaintingCard } from "../components/PaintingCard";
import { paintings as localPaintings } from "../data/placeholderData";
import { getGiftingCollectionMeta } from "../data/giftingCollections";

const THEMES = ["Patra", "Krishna", "Ganesha", "Buddha", "Durga", "Saraswati", "Garuda", "Rama", "Vishnu", "Lakshmi", "Jagannath"] as const;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Shuffled once at module load, not per-mount — so the order stays stable
// when navigating away to an artwork and back to Collections.
const shuffledPaintings = shuffle(localPaintings);

export function Collections() {
  const paintings = shuffledPaintings;
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep-link support: /collections?gifting=natya-ganapati opens Collections
  // pre-filtered to that one gifting collection (used by "View Collection").
  const giftingCollectionId = searchParams.get("gifting");
  const giftingMeta = giftingCollectionId ? getGiftingCollectionMeta(giftingCollectionId) : null;

  // Deep-link support: /collections?theme=Krishna opens Collections pre-filtered
  // to that theme (used by the "Discover the Collection" homepage section).
  const initialTheme = searchParams.get("theme") ?? "";

  const priceCeiling = useMemo(
    () => Math.max(50000, ...paintings.map((p) => p.price)),
    [paintings]
  );

  const [query, setQuery] = useState("");
  const [bulkGiftingOnly, setBulkGiftingOnly] = useState(!!giftingCollectionId);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const clearGiftingCollection = () => {
    searchParams.delete("gifting");
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(() => {
    return paintings.filter((p) => {
      if (p.status === "Draft" || p.status === "Hidden") return false;
      if (
        query &&
        !p.title.toLowerCase().includes(query.toLowerCase()) &&
        !(p.tags ?? []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
        return false;
      if (giftingCollectionId) {
        if (p.giftingCollection !== giftingCollectionId) return false;
      } else if (bulkGiftingOnly && !p.giftingCollection) {
        return false;
      }
      if (theme && p.theme !== theme) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [paintings, query, bulkGiftingOnly, giftingCollectionId, theme, maxPrice]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/50">Gifting</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            disabled={!!giftingCollectionId}
            onClick={() => setBulkGiftingOnly((v) => !v)}
            className={`w-fit rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              bulkGiftingOnly || giftingCollectionId
                ? "border-gold bg-gold text-ivory"
                : "border-charcoal/15 text-charcoal/70 hover:border-gold/60"
            }`}
          >
            Avail for Bulk
          </button>
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/50">Theme</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {THEMES.map((d) => (
            <button
              key={d}
              onClick={() => setTheme((v) => (v === d ? "" : d))}
              className={`w-fit rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors ${
                theme === d
                  ? "border-gold bg-gold text-ivory"
                  : "border-charcoal/15 text-charcoal/70 hover:border-gold/60"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/50">
          Max Price: ₹{maxPrice.toLocaleString("en-IN")}
        </p>
        <input
          type="range"
          min={10000}
          max={priceCeiling}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between font-body text-[11px] text-charcoal/40">
          <span>₹10,000</span>
          <span>₹{priceCeiling.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={giftingMeta ? "Bulk Gifting" : "The Collection"}
          title={giftingMeta ? giftingMeta.name : "Available Artwork"}
          description={
            giftingMeta
              ? giftingMeta.description
              : "Each piece is one of one — sourced directly from artisan hands, and held in the gallery only once."
          }
        />
        {giftingMeta && (
          <button
            onClick={clearGiftingCollection}
            className="mt-3 font-body text-xs uppercase tracking-widest2 text-charcoal/45 underline decoration-charcoal/20 underline-offset-4 hover:text-gold"
          >
            ← View all collections
          </button>
        )}

        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          <aside className="hidden w-fit min-w-[11rem] max-w-[14rem] flex-shrink-0 lg:block">{FilterPanel}</aside>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" strokeWidth={1.5} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search paintings..."
                  className="w-full rounded-sm border border-charcoal/15 bg-ivory py-3 pl-10 pr-4 font-body text-sm focus-ring"
                />
              </div>
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded-sm border border-charcoal/15 px-4 py-3 font-body text-xs uppercase tracking-widest2 hover:border-gold/60 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filters
              </button>
            </div>

            <p className="mt-6 font-body text-xs uppercase tracking-widest2 text-charcoal/40">
              {`${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`}
            </p>

            {filtered.length === 0 ? (
              <p className="mt-16 text-center font-body text-charcoal/60">
                No artwork matches those filters yet — try widening your search.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <PaintingCard painting={p} index={i} key={p.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/40 lg:hidden">
          <div className="h-full w-80 overflow-y-auto bg-ivory p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl">Filters</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6">{FilterPanel}</div>
          </div>
        </div>
      )}
    </div>
  );
}
