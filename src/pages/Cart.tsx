import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Camera } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SectionHeading } from "../components/SectionHeading";
import { useSiteSettings } from "../context/SiteSettingsContext";

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { settings } = useSiteSettings();
  const igHandle = settings.instagram_handle.replace(/^@/, "");

  if (items.length === 0) {
    return (
      <div className="px-6 pb-24 pt-32 text-center md:px-10">
        <SectionHeading eyebrow="Your Cart" title="Your cart is empty" align="center" />
        <Link
          to="/collections"
          className="mt-8 inline-flex items-center rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory hover:bg-terracotta"
        >
          Explore The Collection
        </Link>
      </div>
    );
  }

  const artworkNames = items
    .map((i) => `${i.painting.title}${i.quantity > 1 ? ` x${i.quantity}` : ""}`)
    .join(", ");

  const enquiryMessage = `To place an order, simply WhatsApp us with:\n\nYour name: \nArtwork Name: ${artworkNames}\nQuantity: \nCity & PIN Code: \n\nOur team will get back to you with availability, pricing, shipping details, and payment instructions.\nLet's bring a piece of India's living heritage home. 🤎`;

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Your Cart"
          title="Review Your Enquiry"
          description="There's no online payment yet — review your selection, then send it to us to complete the order."
        />

        <div className="mt-12 divide-y divide-charcoal/10">
          {items.map((i) => {
            const framing = [
              i.frame !== "None" ? `${i.frame} frame` : null,
              i.glass !== "None" ? i.glass : null,
              i.customFrame ? "Custom frame enquiry" : null,
            ].filter(Boolean).join(" · ");

            return (
              <div key={`${i.painting.id}-${i.frame}-${i.glass}`} className="flex gap-5 py-7">
                <Link to={`/artwork/${i.painting.slug}`} className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                  {i.painting.coverImageUrl ? (
                    <img
                      src={i.painting.coverImageUrl as string}
                      alt={i.painting.title}
                      className="h-full w-full object-cover"
                      style={i.painting.imageRotation ? { transform: `rotate(${i.painting.imageRotation}deg)` } : undefined}
                    />
                  ) : (
                    <PlaceholderArtwork title="" artForm="" palette={i.painting.palette} seed={i.painting.id.length} className="h-full w-full" />
                  )}
                </Link>
                <div className="flex-1">
                  <Link to={`/artwork/${i.painting.slug}`} className="font-display text-xl text-charcoal hover:text-gold">
                    {i.painting.title}
                  </Link>
                  {framing && (
                    <p className="mt-1 font-body text-xs uppercase tracking-widest2 text-charcoal/45">{framing}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(i.painting.id, i.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:border-gold"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                    <span className="font-body text-sm">{i.quantity}</span>
                    <button
                      onClick={() => updateQuantity(i.painting.id, i.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:border-gold"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm text-gold">
                    ₹{((i.painting.price + i.glassCost) * i.quantity).toLocaleString("en-IN")}
                  </p>
                  {i.glassCost > 0 && (
                    <p className="mt-0.5 font-body text-[11px] text-charcoal/45">
                      incl. ₹{(i.glassCost * i.quantity).toLocaleString("en-IN")} glass
                    </p>
                  )}
                  <button
                    onClick={() => removeFromCart(i.painting.id)}
                    className="mt-3 text-charcoal/30 transition-colors hover:text-terracotta"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-charcoal/10 pt-6">
          <p className="font-display text-2xl text-charcoal">Subtotal</p>
          <p className="font-display text-2xl text-gold">₹{total.toLocaleString("en-IN")}</p>
        </div>
        <p className="mt-2 font-body text-xs text-charcoal/45">
          Frame costs, if applicable, will be calculated and confirmed during the order process.
        </p>

        <div className="mt-10 rounded-sm border border-charcoal/10 bg-beige px-6 py-6">
          <p className="font-display text-lg text-charcoal">To place an order, simply WhatsApp us with:</p>
          <ul className="mt-4 space-y-1.5 font-body text-sm text-charcoal/75">
            <li><span className="text-charcoal/50">Your name:</span> <span className="italic text-charcoal/40">to be filled by you</span></li>
            <li><span className="text-charcoal/50">Artwork Name:</span> {artworkNames}</li>
            <li><span className="text-charcoal/50">Quantity:</span> <span className="italic text-charcoal/40">to be filled by you</span></li>
            <li><span className="text-charcoal/50">City &amp; PIN Code:</span> <span className="italic text-charcoal/40">to be filled by you</span></li>
          </ul>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/65">
            Our team will get back to you with availability, pricing, shipping details, and payment instructions.
            <br />Let's bring a piece of India's living heritage home. 🤎
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <WhatsAppButton message={enquiryMessage} label="Send via WhatsApp" />
          <a
            href={`https://instagram.com/${igHandle}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-charcoal/15 px-6 py-3 font-body text-[13px] uppercase tracking-widest2 text-charcoal transition-colors hover:border-gold hover:text-gold"
          >
            <Camera className="h-4 w-4" strokeWidth={1.5} />
            Send via Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
