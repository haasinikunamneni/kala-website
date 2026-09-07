import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { adminFetchGiftingRequests } from "../../../lib/db";
import { supabase } from "../../../lib/supabase";

type GiftingStatus = "New" | "Quoted" | "Confirmed" | "Delivered" | "Closed";

const statusColors: Record<GiftingStatus, string> = {
  New:       "bg-blue-100 text-blue-700",
  Quoted:    "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Closed:    "bg-charcoal/10 text-charcoal/50",
};

export function AdminGifting() {
  const [requests, setRequests] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await adminFetchGiftingRequests();
    setRequests(data as Record<string, unknown>[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateStatus = async (id: string, status: GiftingStatus) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("gifting_requests").update({ status }).eq("id", id);
    if (error) { showToast("Failed to update status."); await load(); }
  };

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-sm bg-terracotta px-5 py-3 font-body text-sm text-ivory shadow-lg">{toast}</div>
      )}
      <h1 className="font-display text-3xl text-charcoal">Gifting Requests</h1>
      <p className="mt-1 font-body text-sm text-charcoal/50">Corporate and ceremony bulk gifting enquiries.</p>

      {loading ? (
        <div className="mt-16 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} /></div>
      ) : requests.length === 0 ? (
        <div className="mt-16 rounded-sm border border-charcoal/10 bg-ivory p-10 text-center">
          <p className="font-body text-sm text-charcoal/50">No gifting requests yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {requests.map((r) => (
            <div key={r.id as string} className="rounded-sm border border-charcoal/10 bg-ivory p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-body font-medium text-charcoal">{r.company as string}</p>
                  <p className="mt-0.5 font-body text-sm text-charcoal/55">{r.event_type as string} · {r.quantity as number} pieces</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 font-body text-[11px] ${statusColors[r.status as GiftingStatus]}`}>
                  {r.status as string}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div><p className="font-body text-xs text-charcoal/40">Budget</p><p className="font-body text-sm text-charcoal">{(r.budget as string) || "—"}</p></div>
                <div><p className="font-body text-xs text-charcoal/40">Required by</p><p className="font-body text-sm text-charcoal">{(r.required_by as string) || "—"}</p></div>
                <div><p className="font-body text-xs text-charcoal/40">Received</p><p className="font-body text-sm text-charcoal">{new Date(r.created_at as string).toLocaleDateString("en-IN")}</p></div>
              </div>
              {r.requirements ? (
                <div className="mt-3">
                  <p className="font-body text-xs text-charcoal/40">Requirements</p>
                  <p className="mt-1 font-body text-sm text-charcoal/75">{String(r.requirements)}</p>
                </div>
              ) : null}
              <div className="mt-4">
                <select
                  value={r.status as string}
                  onChange={(e) => updateStatus(r.id as string, e.target.value as GiftingStatus)}
                  className="rounded-sm border border-charcoal/15 bg-beige px-3 py-1.5 font-body text-xs focus-ring"
                >
                  {(["New", "Quoted", "Confirmed", "Delivered", "Closed"] as GiftingStatus[]).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
