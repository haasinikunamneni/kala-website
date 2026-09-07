import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { GiftingCollectionCarousel } from "../components/GiftingCollectionCarousel";
import { useSuppliers } from "../lib/hooks";

export function Suppliers() {
  const { data, loading } = useSuppliers();
  const active = data ?? [];

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Suppliers"
          title="The Artisans Behind The Gallery"
          description="Every piece in kalā is traceable to the hands that made it. We celebrate our artisan partners, and this architecture is built to grow with new suppliers through the admin dashboard."
        />

        {loading ? (
          <div className="mt-20 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-charcoal/30" strokeWidth={1.5} />
          </div>
        ) : active.length === 1 ? (
          (() => {
            const s = active[0];
            const slides = (s.galleryImageUrls && s.galleryImageUrls.length > 0
              ? s.galleryImageUrls
              : s.coverImageUrl ? [s.coverImageUrl] : []
            ).map((src) => ({ src, alt: s.name }));

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14 grid gap-10 md:grid-cols-2 md:items-center md:gap-14"
              >
                <Link to={`/suppliers/${s.slug}`} className="group block focus-ring">
                  {slides.length > 0 ? (
                    <GiftingCollectionCarousel slides={slides} />
                  ) : (
                    <div className="aspect-[4/3] overflow-hidden rounded-sm bg-charcoal/5">
                      <PlaceholderArtwork title={s.name} artForm={s.artForm} palette={s.palette} seed={10} className="h-full w-full" />
                    </div>
                  )}
                </Link>
                <div>
                  <h3 className="font-display text-3xl text-charcoal">{s.name}</h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest2 text-charcoal/50">{s.location}</p>
                  <p className="mt-5 font-body text-[15px] leading-relaxed text-charcoal/70">{s.history}</p>
                  <Link
                    to={`/suppliers/${s.slug}`}
                    className="mt-6 inline-flex items-center font-body text-xs uppercase tracking-widest2 text-terracotta transition-transform duration-300 hover:translate-x-1"
                  >
                    View Collection →
                  </Link>
                </div>
              </motion.div>
            );
          })()
        ) : (
          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {active.map((s, i) => {
              const slides = (s.galleryImageUrls && s.galleryImageUrls.length > 0
                ? s.galleryImageUrls
                : s.coverImageUrl ? [s.coverImageUrl] : []
              ).map((src) => ({ src, alt: s.name }));

              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/suppliers/${s.slug}`} className="group block focus-ring">
                    {slides.length > 0 ? (
                      <GiftingCollectionCarousel slides={slides} />
                    ) : (
                      <div className="aspect-[5/4] overflow-hidden rounded-sm bg-charcoal/5">
                        <PlaceholderArtwork title={s.name} artForm={s.artForm} palette={s.palette} seed={i + 10} className="h-full w-full" />
                      </div>
                    )}
                    <h3 className="mt-5 font-display text-2xl text-charcoal">{s.name}</h3>
                    <p className="mt-1 font-body text-xs uppercase tracking-widest2 text-charcoal/50">{s.location}</p>
                    <p className="mt-3 font-body text-[14px] leading-relaxed text-charcoal/65 line-clamp-2">{s.history}</p>
                    <span className="mt-4 inline-flex items-center font-body text-xs uppercase tracking-widest2 text-terracotta transition-transform duration-300 group-hover:translate-x-1">
                      View Collection →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
