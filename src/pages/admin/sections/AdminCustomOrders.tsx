import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { adminFetchCustomOrders, adminUpdateCustomOrderStatus } from "../../../lib/db";

type CommissionStatus = "New" | "In Review" | "In Progress" | "Completed" | "Declined";

const statusColors: Record<CommissionStatus, string> = {
  "New":         "bg-blue-100 text-blue-700",
  "In Review":   "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-purple-100 text-purple-700",
  "Completed":   "bg-green-100 text-green-700",
  "Declined":    "bg-charcoal/10 text-charcoal/50",
};

export function AdminCustomOrders() {
  const [requests, setRequests] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await adminFetchCustomOrders();
    setRequests(data as Record<string, unknown>[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateStatus = async (id: string, status: CommissionStatus) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    const { ok } = await adminUpdateCustomOrderStatus(id, status);
    if (!ok) { showToast("Failed to update status."); await load(); }
  };

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-sm bg-terracotta px-5 py-3 font-body text-sm text-ivory shadow-lg">{toast}</div>
      )}
      <h1 className="font-display text-3xl text-charcoal">Custom Orders</h1>
      <p className="mt-1 font-body text-sm text-charcoal/50">Commission requests submitted via the Categories page.</p>

      {loading ? (
        <div className="mt-16 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} /></div>
      ) : requests.length === 0 ? (
        <div className="mt-16 rounded-sm border border-charcoal/10 bg-ivory p-10 text-center">
          <p className="font-body text-sm text-charcoal/50">No commission requests yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {requests.map((r) => (
            <div key={r.id as string} className="rounded-sm border border-charcoal/10 bg-ivory p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-body font-medium text-charcoal">{r.name as string}</p>
                  <p className="mt-0.5 font-body text-sm text-charcoal/55">{r.email as string} · {r.phone as string}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 font-body text-[11px] ${statusColors[r.status as CommissionStatus]}`}>
                  {r.status as string}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div><p className="font-body text-xs text-charcoal/40">Dimensions</p><p className="font-body text-sm text-charcoal">{(r.dimensions as string) || "—"}</p></div>
                <div><p className="font-body text-xs text-charcoal/40">Budget</p><p className="font-body text-sm text-charcoal">{(r.budget as string) || "—"}</p></div>
                <div><p className="font-body text-xs text-charcoal/40">Frame</p><p className="font-body text-sm text-charcoal">{(r.frame_preference as string) || "—"}</p></div>
              </div>
              <div className="mt-3">
                <p className="font-body text-xs text-charcoal/40">Message</p>
                <p className="mt-1 font-body text-sm text-charcoal/75">{r.message as string}</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <select
                  value={r.status as string}
                  onChange={(e) => updateStatus(r.id as string, e.target.value as CommissionStatus)}
                  className="rounded-sm border border-charcoal/15 bg-beige px-3 py-1.5 font-body text-xs focus-ring"
                >
                  {(["New", "In Review", "In Progress", "Completed", "Declined"] as CommissionStatus[]).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="font-body text-xs text-charcoal/35">
                  {new Date(r.created_at as string).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
