import { useState, useEffect, useCallback } from "react";
import { Loader2, Mail, MailOpen } from "lucide-react";
import { adminFetchMessages, adminMarkMessageRead } from "../../../lib/db";

export function AdminMessages() {
  const [messages, setMessages] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await adminFetchMessages();
    setMessages(data as Record<string, unknown>[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    await adminMarkMessageRead(id);
  };

  const toggle = async (id: string) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.read) await markRead(id);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Messages</h1>
      <p className="mt-1 font-body text-sm text-charcoal/50">
        {loading ? "Loading…" : `${unread} unread · ${messages.length} total`}
      </p>

      {loading ? (
        <div className="mt-16 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} /></div>
      ) : messages.length === 0 ? (
        <div className="mt-16 rounded-sm border border-charcoal/10 bg-ivory p-10 text-center">
          <p className="font-body text-sm text-charcoal/50">No messages yet. They'll appear here when customers submit the contact form.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-2">
          {messages.map((m) => {
            const isOpen = expanded === (m.id as string);
            const isRead = m.read as boolean;
            return (
              <div
                key={m.id as string}
                className={`overflow-hidden rounded-sm border transition-colors ${
                  isOpen ? "border-gold/40 bg-beige" : isRead ? "border-charcoal/8 bg-ivory" : "border-charcoal/15 bg-ivory"
                }`}
              >
                <button
                  onClick={() => toggle(m.id as string)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  {isRead
                    ? <MailOpen className="h-4 w-4 flex-shrink-0 text-charcoal/30" strokeWidth={1.5} />
                    : <Mail className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.5} />
                  }
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className={`font-body text-sm ${isRead ? "text-charcoal/70" : "font-medium text-charcoal"}`}>
                        {m.name as string}
                      </p>
                      {!isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      )}
                    </div>
                    <p className="mt-0.5 font-body text-xs text-charcoal/45">{m.email as string}</p>
                  </div>
                  <p className="flex-shrink-0 font-body text-xs text-charcoal/35">
                    {new Date(m.created_at as string).toLocaleDateString("en-IN")}
                  </p>
                </button>

                {isOpen && (
                  <div className="border-t border-charcoal/10 px-5 pb-5 pt-4">
                    {m.phone ? (
                      <p className="mb-2 font-body text-xs text-charcoal/50">Phone: {String(m.phone)}</p>
                    ) : null}
                    <p className="font-body text-sm leading-relaxed text-charcoal/80">{String(m.message)}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={`mailto:${String(m.email)}?subject=Re: Your enquiry to kalā`}
                        className="inline-flex items-center rounded-sm border border-charcoal/15 px-4 py-2 font-body text-xs uppercase tracking-widest2 text-charcoal hover:border-gold hover:text-gold transition-colors"
                      >
                        Reply via Email
                      </a>
                      {m.phone ? (
                        <a
                          href={`https://wa.me/${String(m.phone).replace(/\D/g, "")}?text=Hi ${String(m.name)}, thanks for reaching out to kalā.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-sm border border-charcoal/15 px-4 py-2 font-body text-xs uppercase tracking-widest2 text-charcoal hover:border-gold hover:text-gold transition-colors"
                        >
                          Reply via WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
