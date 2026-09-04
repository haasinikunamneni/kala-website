import { useState, useRef } from "react";
import { Camera, Mail, MessageCircle, Clock } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { submitContactMessage } from "../lib/db";
import { useSiteSettings } from "../context/SiteSettingsContext";

export function Contact() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [busy, setBusy]           = useState(false);
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const phoneRef   = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const inp = "rounded-sm border border-charcoal/15 bg-ivory px-4 py-3 font-body text-sm focus-ring";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const result = await submitContactMessage({
      name:    nameRef.current?.value ?? "",
      email:   emailRef.current?.value ?? "",
      phone:   phoneRef.current?.value || undefined,
      message: messageRef.current?.value ?? "",
    });
    setBusy(false);
    if (result.ok) setSubmitted(true);
    else setError(true);
  };

  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Most orders are completed over WhatsApp or Instagram — reach out any time and we'll respond within one business day."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="font-display text-2xl text-charcoal">Send Us A Message</p>
            {submitted ? (
              <div className="mt-6 rounded-sm border border-gold/40 bg-beige p-8">
                <p className="font-display text-xl text-charcoal">Message sent</p>
                <p className="mt-2 font-body text-sm text-charcoal/70">
                  We'll get back to you by email or WhatsApp within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input ref={nameRef}  required placeholder="Name"  className={inp} />
                  <input ref={emailRef} required type="email" placeholder="Email" className={inp} />
                </div>
                <input ref={phoneRef} placeholder="Phone (optional)" className={inp} />
                <textarea ref={messageRef} required placeholder="Your message" rows={5} className={inp} />
                {error && <p className="font-body text-xs text-terracotta">Something went wrong — please try again or reach us on WhatsApp.</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="mt-2 w-fit rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
                >
                  {busy ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-7">
            <p className="font-display text-2xl text-charcoal">Contact Details</p>
            <ContactRow icon={Camera}      label="Instagram"      value={settings.instagram_handle} href={`https://instagram.com/${settings.instagram_handle.replace(/^@/, "")}`} />
            <ContactRow icon={MessageCircle} label="WhatsApp"    value={`+${settings.whatsapp_number}`}   href={`https://wa.me/${settings.whatsapp_number}`} />
            <ContactRow icon={Mail}        label="Email"          value={settings.email}            href={`mailto:${settings.email}`} />
            <ContactRow icon={Clock}       label="Business Hours" value={settings.business_hours} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string; value: string; href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/40">
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/40">{label}</p>
        <p className="font-body text-sm text-charcoal">{value}</p>
      </div>
    </div>
  );
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className="block transition-opacity hover:opacity-70">{content}</a>
    : <div>{content}</div>;
}
