import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getPaintingBySlug,
  getRelatedPaintings,
  getVariants,
} from "../data/placeholderData";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { PaintingCard } from "../components/PaintingCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useCart } from "../context/CartContext";

export function ArtworkDetails() {
  const { slug } = useParams();

  // Use local data directly — instant, no async, no Supabase dependency
  const painting = slug ? getPaintingBySlug(slug) : undefined;
  const relatedPaintings = painting ? getRelatedPaintings(painting) : [];
  const variants = painting ? getVariants(painting) : [];

  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!painting) return <Navigate to="/collections" replace />;
  /* ─────────────────────────────────────────────────────────────── */

  const handleAdd = () => {
    addToCart(painting, "None", "None", 0, false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const enquiryMessage =
    `Hi kalā, I'm interested in "${painting.title}" ` +
    `(₹${painting.price.toLocaleString("en-IN")}).` +
    ` Could you tell me more about availability?`;

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/40">
          <Link to="/collections" className="hover:text-gold">Collections</Link>
          {" / "}{painting.title}
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">

          {/* ── Image gallery ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const p = painting as any;
              const realImages: string[] = [
                ...(p.coverImageUrl ? [p.coverImageUrl as string] : []),
                ...((p.galleryImageUrls ?? []) as string[]).filter((u: string) => u !== p.coverImageUrl),
              ];
              const hasRealImages = realImages.length > 0;
              const activeUrl = realImages[activeImage] ?? realImages[0];
              return (
                <>
                  <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-lg">
                    {hasRealImages ? (
                      <img src={activeUrl} alt={painting.title} className="h-full w-full object-contain"
                        style={painting.imageRotation ? { transform: `rotate(${painting.imageRotation}deg)` } : undefined}
                      />
                    ) : (
                      <PlaceholderArtwork
                        title={painting.title}
                        artForm={painting.artForm}
                        palette={painting.palette}
                        seed={activeImage + painting.id.length + 1}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    {variants.length > 1 ? (
                      <>
                        <p className="mb-2 font-body text-xs uppercase tracking-widest2 text-charcoal/45">
                          Available Colours
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {variants.map((v) => (
                            <Link
                              key={v.id}
                              to={`/artwork/${v.slug}`}
                              className={`aspect-square overflow-hidden rounded-sm transition-all ${
                                v.id === painting.id
                                  ? "ring-2 ring-gold ring-offset-2"
                                  : "opacity-55 hover:opacity-80"
                              }`}
                              title={v.variantLabel}
                            >
                              {v.coverImageUrl ? (
                                <img
                                  src={v.coverImageUrl}
                                  alt={v.variantLabel ?? v.title}
                                  className="h-full w-full object-contain"
                                  style={v.imageRotation ? { transform: `rotate(${v.imageRotation}deg)` } : undefined}
                                />
                              ) : (
                                <PlaceholderArtwork
                                  title=""
                                  artForm=""
                                  palette={v.palette}
                                  seed={v.id.length}
                                  className="h-full w-full"
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      hasRealImages &&
                      realImages.length > 1 && (
                        <>
                          <p className="mb-2 font-body text-xs uppercase tracking-widest2 text-charcoal/45">
                            More Images
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            {realImages.map((img, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`aspect-square overflow-hidden rounded-sm transition-all ${
                                  activeImage === i
                                    ? "ring-2 ring-gold ring-offset-2"
                                    : "opacity-55 hover:opacity-80"
                                }`}
                              >
                                <img src={img as string} alt="" className="h-full w-full object-contain"
                                  style={painting.imageRotation ? { transform: `rotate(${painting.imageRotation}deg)` } : undefined}
                                />
                              </button>
                            ))}
                          </div>
                        </>
                      )
                    )}
                  </div>
                </>
              );
            })()}
          </motion.div>

          {/* ── Details panel ── */}
          <div>
            {painting.sold && (
              <span className="mb-4 inline-block bg-charcoal px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-ivory">
                Sold
              </span>
            )}

            <h1 className="font-display text-fluid-h2 leading-tight text-charcoal">
              {painting.title}
            </h1>
            <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-charcoal/50">
              {painting.artForm} · {painting.origin}
            </p>

            {/* Base price */}
            <p className="mt-5 font-display text-3xl text-gold">
              ₹{painting.price.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 font-body text-xs text-charcoal/40">Artwork price, before framing</p>

            <p className="mt-5 max-w-lg font-body text-[15px] leading-relaxed text-charcoal/70">
              {painting.description}
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8 font-body text-sm">
              <div>
                <p className="text-charcoal/40">Dimensions</p>
                <p className="mt-1 text-charcoal">{painting.dimensions}</p>
              </div>
              <div>
                <p className="text-charcoal/40">Art Form</p>
                <p className="mt-1 text-charcoal">{painting.artForm}</p>
              </div>
              <div>
                <p className="text-charcoal/40">Origin</p>
                <p className="mt-1 text-charcoal">{painting.origin}</p>
              </div>
              <div>
                <p className="text-charcoal/40">Availability</p>
                <p className={`mt-1 ${painting.sold ? "text-terracotta" : "text-charcoal"}`}>
                  {painting.sold ? "Sold" : "In Stock"}
                </p>
              </div>
            </div>

            {/* Framing */}
            {painting.frameAvailable && !painting.sold && (
              <div className="mt-8 border-t border-charcoal/10 pt-8">
                <p className="font-body text-sm text-charcoal/70">Provided with framing</p>
              </div>
            )}

            {/* CTA buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              {!painting.sold && (
                <button
                  onClick={handleAdd}
                  className="rounded-sm border border-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-ivory focus-ring"
                >
                  {added ? "Added ✓" : "Add To Cart"}
                </button>
              )}
              <WhatsAppButton message={enquiryMessage} label="DM To Order" />
            </div>

            {/* Bulk Gifting */}
            {painting.giftingCollection && (
              <div className="mt-8 rounded-sm border border-gold/30 bg-beige p-6">
                <p className="font-display text-lg text-charcoal">Available for Bulk Gifting</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/65">
                  This artwork is available for weddings, return gifts, corporate events, festivals and other
                  special occasions.
                </p>
                <Link
                  to={`/collections?gifting=${painting.giftingCollection}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-sm border border-charcoal/20 px-5 py-2.5 font-body text-[12px] uppercase tracking-widest2 text-charcoal transition-colors hover:border-gold hover:text-gold"
                >
                  View Bulk Gifting Collection
                </Link>
              </div>
            )}

            {/* Story */}
            <div className="mt-12 border-t border-charcoal/10 pt-8">
              <p className="font-display text-xl text-charcoal">The Story Behind This Artwork</p>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">
                {painting.story}
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {(relatedPaintings ?? []).length > 0 && (
          <div className="mt-24">
            <p className="font-display text-3xl text-charcoal">You May Also Like</p>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {(relatedPaintings ?? []).map((p, i) => (
                <PaintingCard painting={p} index={i} key={p.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
