import { Link } from "react-router-dom";
import type { Supplier } from "../types";
import { PlaceholderArtwork } from "./PlaceholderArtwork";

export function SupplierCard({ supplier, index = 0 }: { supplier: Supplier; index?: number }) {
  const content = (
    <div className="group block">
      <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-beige">
        <div className="h-full w-full transition-transform duration-700 ease-gallery group-hover:scale-[1.03]">
          <PlaceholderArtwork
            title={supplier.name}
            artForm={supplier.artForm}
            palette={supplier.palette}
            seed={index + 10}
            className="h-full w-full"
          />
        </div>
        {supplier.comingSoon && (
          <span className="absolute left-3 top-3 bg-ivory/90 px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-charcoal">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal">{supplier.name}</h3>
      <p className="mt-1 font-body text-xs uppercase tracking-widest2 text-charcoal/50">{supplier.location}</p>
    </div>
  );

  if (supplier.comingSoon) {
    return <div className="cursor-default opacity-90">{content}</div>;
  }

  return (
    <Link to={`/suppliers/${supplier.slug}`} className="focus-ring">
      {content}
    </Link>
  );
}
