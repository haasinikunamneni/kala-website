import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { adminFetchOrders, adminUpdateOrderStatus } from "../../../lib/db";

type OrderStatus = "Pending" | "Confirmed" | "Sold" | "Delivered";

const statusColors: Record<OrderStatus, string> = {
  Pending:   "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Sold:      "bg-terracotta/15 text-terracotta",
  Delivered: "bg-green-100 text-green-700",
};

export function AdminOrders() {
  const [orders, setOrders]   = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await adminFetchOrders();
    setOrders(data as Record<string, unknown>[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    const { ok } = await adminUpdateOrderStatus(id, status);
    if (!ok) { showToast("Failed to update status."); await load(); }
  };

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-sm bg-terracotta px-5 py-3 font-body text-sm text-ivory shadow-lg">{toast}</div>
      )}
      <h1 className="font-display text-3xl text-charcoal">Orders</h1>
      <p className="mt-1 font-body text-sm text-charcoal/50">Track and manage artwork enquiries and confirmed orders.</p>

      {loading ? (
        <div className="mt-16 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} /></div>
      ) : orders.length === 0 ? (
        <div className="mt-16 rounded-sm border border-charcoal/10 bg-ivory p-10 text-center">
          <p className="font-body text-sm text-charcoal/50">No orders yet. They'll appear here when customers send enquiries via WhatsApp, Instagram, or email.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => {
            const framing = [
              o.frame !== "None" && o.frame,
              o.glass !== "None" && o.glass,
            ].filter(Boolean).join(" · ") || "No framing";
            return (
              <div key={o.id as string} className="rounded-sm border border-charcoal/10 bg-ivory p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-body font-medium text-charcoal">{o.customer_name as string}</p>
                    <p className="mt-1 font-body text-sm text-charcoal/70">{o.artwork_title as string}</p>
                    <p className="mt-0.5 font-body text-xs text-charcoal/45">{framing} · via {o.channel as string}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-lg text-gold">₹{Number(o.price).toLocaleString("en-IN")}</p>
                    <p className="font-body text-xs text-charcoal/40">{new Date(o.created_at as string).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 font-body text-[11px] ${statusColors[o.status as OrderStatus]}`}>{o.status as string}</span>
                  <select
                    value={o.status as string}
                    onChange={(e) => updateStatus(o.id as string, e.target.value as OrderStatus)}
                    className="rounded-sm border border-charcoal/15 bg-beige px-3 py-1.5 font-body text-xs focus-ring"
                  >
                    {(["Pending", "Confirmed", "Sold", "Delivered"] as OrderStatus[]).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
