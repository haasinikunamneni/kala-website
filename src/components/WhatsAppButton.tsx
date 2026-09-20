import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";

interface WhatsAppButtonProps {
  message: string;
  className?: string;
  label?: string;
}

export function WhatsAppButton({ message, className = "", label = "Enquire on WhatsApp" }: WhatsAppButtonProps) {
  const { settings } = useSiteSettings();
  const href = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-sm border border-charcoal/15 bg-charcoal px-6 py-3 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:bg-terracotta focus-ring ${className}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
      {label}
    </a>
  );
}
