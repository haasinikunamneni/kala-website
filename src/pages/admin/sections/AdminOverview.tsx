import { useEffect, useState } from "react";
import { Image, ShoppingBag, MessageSquare, Palette, Gift, TrendingUp } from "lucide-react";
import {
  adminFetchAllArtworks,
  adminFetchOrders,
  adminFetchCustomOrders,
  adminFetchGiftingRequests,
  adminFetchMessages,
} from "../../../lib/db";

type Section = "artworks" | "orders" | "frames" | "custom-orders" | "gifting" | "messages" | "settings";

interface ActivityItem {
  text: string;
  time: string;
  sortKey: string;
}

interface DashboardData {
  totalArtworks: number;
  availableArtworks: number;
  activeOrders: number;
  pendingOrders: number;
  customRequests: number;
  awaitingCustomRequests: number;
  giftingInquiries: number;
  unreadMessages: number;
  revenue: number;
  activity: ActivityItem[];
}

function timeAgo(iso: string | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString();
}

const emptyData: DashboardData = {
  totalArtworks: 0,
  availableArtworks: 0,
  activeOrders: 0,
  pendingOrders: 0,
  customRequests: 0,
  awaitingCustomRequests: 0,
  giftingInquiries: 0,
  unreadMessages: 0,
  revenue: 0,
  activity: [],
};

export function AdminOverview({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const [artworksRes, ordersRes, customRes, giftingRes, messagesRes] = await Promise.all([
        adminFetchAllArtworks(),
        adminFetchOrders(),
        adminFetchCustomOrders(),
        adminFetchGiftingRequests(),
        adminFetchMessages(),
      ]);
      if (cancelled) return;

      const artworks = artworksRes.data ?? [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orders = (ordersRes.data ?? []) as any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customOrders = (customRes.data ?? []) as any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gifting = (giftingRes.data ?? []) as any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages = (messagesRes.data ?? []) as any[];

      const activeOrders = orders.filter((o) => o.status !== "Delivered");
      const pendingOrders = orders.filter((o) => o.status === "Pending");
      const awaitingCustom = customOrders.filter((c) => c.status === "New" || c.status === "In Review");
      const unreadMessages = messages.filter((m) => !m.read);
      const revenue = orders
        .filter((o) => o.status === "Confirmed" || o.status === "Delivered" || o.status === "Sold")
        .reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);

      const activity: ActivityItem[] = [
        ...messages.map((m) => ({
          text: `Contact form: message from ${m.name ?? "a visitor"}`,
          time: timeAgo(m.created_at),
          sortKey: m.created_at ?? "",
        })),
        ...customOrders.map((c) => ({
          text: `New commission request from ${c.name ?? "a customer"}${c.dimensions ? ` — ${c.dimensions}` : ""}`,
          time: timeAgo(c.created_at),
          sortKey: c.created_at ?? "",
        })),
        ...gifting.map((g) => ({
          text: `Corporate gifting inquiry — ${g.quantity ?? "?"} pieces for ${g.event_type ?? "an event"}`,
          time: timeAgo(g.created_at),
          sortKey: g.created_at ?? "",
        })),
        ...orders.map((o) => ({
          text: `Order ${o.status?.toLowerCase() ?? "update"}: ${o.customer ?? o.id}`,
          time: timeAgo(o.created_at),
          sortKey: o.created_at ?? "",
        })),
      ]
        .sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1))
        .slice(0, 6);

      setData({
        totalArtworks: artworks.length,
        availableArtworks: artworks.filter((a) => a.inStock && !a.sold).length,
        activeOrders: activeOrders.length,
        pendingOrders: pendingOrders.length,
        customRequests: customOrders.length,
        awaitingCustomRequests: awaitingCustom.length,
        giftingInquiries: gifting.length,
        unreadMessages: unreadMessages.length,
        revenue,
        activity,
      });
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const stats = [
    {
      label: "Total Artworks",
      value: String(data.totalArtworks),
      icon: Image,
      sub: `${data.availableArtworks} available`,
      section: "artworks" as Section,
    },
    {
      label: "Active Orders",
      value: String(data.activeOrders),
      icon: ShoppingBag,
      sub: `${data.pendingOrders} pending confirmation`,
      section: "orders" as Section,
    },
    {
      label: "Custom Requests",
      value: String(data.customRequests),
      icon: Palette,
      sub: `${data.awaitingCustomRequests} awaiting response`,
      section: "custom-orders" as Section,
    },
    {
      label: "Gifting Inquiries",
      value: String(data.giftingInquiries),
      icon: Gift,
      sub: "Total received",
      section: "gifting" as Section,
    },
    {
      label: "Unread Messages",
      value: String(data.unreadMessages),
      icon: MessageSquare,
      sub: "From contact form",
      section: "messages" as Section,
    },
    {
      label: "Revenue",
      value: `₹${data.revenue.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      sub: "Confirmed + delivered orders",
      section: "orders" as Section,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>
      <p className="mt-1 font-body text-sm text-charcoal/55">Welcome back. Here's what's happening with kalā today.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onNavigate(s.section)}
            className="group rounded-sm border border-charcoal/10 bg-ivory p-5 text-left transition-all hover:border-gold/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/45">{s.label}</p>
                <p className="mt-2 font-display text-3xl text-charcoal">{loading ? "…" : s.value}</p>
                <p className="mt-1 font-body text-xs text-charcoal/50">{s.sub}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/8">
                <s.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-charcoal/10 bg-ivory">
        <div className="border-b border-charcoal/10 px-5 py-4">
          <p className="font-body text-sm font-medium text-charcoal">Recent Activity</p>
        </div>
        {loading ? (
          <p className="px-5 py-6 font-body text-sm text-charcoal/50">Loading…</p>
        ) : data.activity.length === 0 ? (
          <p className="px-5 py-6 font-body text-sm text-charcoal/50">No activity yet.</p>
        ) : (
          <ul>
            {data.activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between border-b border-charcoal/6 px-5 py-3.5 last:border-0">
                <p className="font-body text-sm text-charcoal/80">{a.text}</p>
                <span className="ml-4 flex-shrink-0 font-body text-xs text-charcoal/40">{a.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
