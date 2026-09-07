import { Link } from "react-router-dom";
import { Camera, Mail, Phone } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import kalaLogo from "../assets/kala-logo-mark.png";

export function Footer() {
  const { settings } = useSiteSettings();
  const igHandle = settings.instagram_handle.replace(/^@/, "");

  return (
    <footer className="border-t border-charcoal/10 bg-beige">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <img src={kalaLogo} alt="Kala" className="h-16 w-auto" />
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-charcoal/70">
            A curated gallery bringing India's living artistic heritage — hand-painted,
            sourced directly from artisan communities — into contemporary homes.
          </p>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/50">Explore</p>
          <ul className="mt-4 space-y-3 font-body text-sm text-charcoal/80">
            <li><Link to="/collections" className="hover:text-gold">Collections</Link></li>
            <li><Link to="/categories" className="hover:text-gold">Categories</Link></li>
            <li><Link to="/suppliers" className="hover:text-gold">Suppliers</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/50">Reach Us</p>
          <ul className="mt-4 space-y-3 font-body text-sm text-charcoal/80">
            <li className="flex items-center gap-2">
              <Camera className="h-4 w-4" strokeWidth={1.5} />
              <a href={`https://instagram.com/${igHandle}`} target="_blank" rel="noreferrer" className="hover:text-gold">
                {settings.instagram_handle}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              <a href={`mailto:${settings.email}`} className="hover:text-gold">{settings.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal/10 px-6 py-5 text-center font-body text-xs text-charcoal/50 md:px-10">
        © {new Date().getFullYear()} kalā. Heritage, framed for today.
      </div>
    </footer>
  );
}
