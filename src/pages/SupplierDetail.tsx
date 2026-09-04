import { Navigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSupplier, usePaintings } from "../lib/hooks";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { PaintingCard } from "../components/PaintingCard";

export function SupplierDetail() {
  const { slug } = useParams();
  const { data: supplier, loading: supplierLoading } = useSupplier(slug);
  const { data: allPaintings, loading: paintingsLoading } = usePaintings();

  if (supplierLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-charcoal/30" strokeWidth={1.5} />
      </div>
    );
  }

  if (!supplier) return <Navigate to="/suppliers" replace />;

  const collection = (allPaintings ?? []).filter((p) => p.supplierSlug === supplier.slug);

  return (
    <div>
      <section className="relative flex h-[38vh] min-h-[320px] items-end overflow-hidden bg-walnut px-6 pb-10 pt-24 md:px-10">
        <div className="absolute inset-0 opacity-30">
          {supplier.coverImageUrl ? (
            <img src={supplier.coverImageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <PlaceholderArtwork title="" artForm="" palette={supplier.palette} seed={5} className="h-full w-full" />
          )}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="font-body text-xs uppercase tracking-widest2 text-gold">{supplier.artForm}</p>
          <h1 className="mt-3 font-display text-5xl text-ivory md:text-6xl">{supplier.name}</h1>
          <p className="mt-2 font-body text-sm text-ivory/70">{supplier.location}</p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <p className="font-display text-2xl text-charcoal">History & Tradition</p>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">{supplier.history}</p>
          </div>
          <div>
            <p className="font-display text-2xl text-charcoal">The Artisan Story</p>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">{supplier.artisanStory}</p>
          </div>
        </div>
      </section>

      {supplier.galleryImageUrls && supplier.galleryImageUrls.length > 0 && (
        <section className="bg-beige px-6 py-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-display text-3xl text-charcoal">In The Workshop</p>
            <p className="mt-2 max-w-2xl font-body text-[15px] leading-relaxed text-charcoal/65">
              A glimpse of each piece as it is painted, checked, and prepared by hand before it reaches you.
            </p>
            <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {supplier.galleryImageUrls.map((src, i) => (
                <div key={src + i} className="mb-4 break-inside-avoid overflow-hidden rounded-sm">
                  <img
                    src={src}
                    alt={`${supplier.name} artisan workshop ${i + 1}`}
                    className="w-full transition-transform duration-700 ease-gallery hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-beige px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-3xl text-charcoal">Current Collection</p>
          {paintingsLoading ? (
            <div className="mt-10 flex justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {collection.map((p, i) => <PaintingCard painting={p} index={i} key={p.id} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
