import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Image, ShoppingBag, Frame as FrameIcon,
  Palette, Gift, MessageSquare, Settings, LogOut, Menu, ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { AdminOverview } from "./sections/AdminOverview";
import { AdminArtworks } from "./sections/AdminArtworks";
import { AdminOrders } from "./sections/AdminOrders";
import { AdminFrames } from "./sections/AdminFrames";
import { AdminCustomOrders } from "./sections/AdminCustomOrders";
import { AdminGifting } from "./sections/AdminGifting";
import { AdminMessages } from "./sections/AdminMessages";
import { AdminSettings } from "./sections/AdminSettings";

type Section =
  | "overview"
  | "artworks"
  | "orders"
  | "frames"
  | "custom-orders"
  | "gifting"
  | "messages"
  | "settings";

const nav: { id: Section; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "artworks", label: "Artworks", icon: Image },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "frames", label: "Frames & Glass", icon: FrameIcon },
  { id: "custom-orders", label: "Custom Orders", icon: Palette },
  { id: "gifting", label: "Gifting Requests", icon: Gift },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = nav.find((n) => n.id === section)!;

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Link to="/" className="font-display text-xl text-charcoal">
          क<span className="italic">âla</span>
        </Link>
        <p className="mt-0.5 font-body text-[10px] uppercase tracking-widest2 text-charcoal/40">Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => { setSection(item.id); setSidebarOpen(false); }}
            className={`mb-0.5 flex w-full items-center gap-3 rounded-sm px-3 py-2.5 font-body text-sm transition-colors ${
              section === item.id
                ? "bg-gold/15 text-gold"
                : "text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal"
            }`}
          >
            <item.icon className="h-4 w-4" strokeWidth={1.5} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-charcoal/10 px-3 py-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 font-body text-sm text-charcoal/50 transition-colors hover:text-terracotta"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-beige font-body">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 overflow-hidden border-r border-charcoal/10 bg-ivory lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-56 bg-ivory">{SidebarContent}</div>
          <button
            className="flex-1 bg-charcoal/30"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-charcoal/10 bg-ivory px-6 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2 font-body text-xs text-charcoal/40">
            <span>Admin</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal">{current.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              className="font-body text-xs uppercase tracking-widest2 text-charcoal/50 hover:text-gold"
            >
              View Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {section === "overview" && <AdminOverview onNavigate={setSection} />}
          {section === "artworks" && <AdminArtworks />}
          {section === "orders" && <AdminOrders />}
          {section === "frames" && <AdminFrames />}
          {section === "custom-orders" && <AdminCustomOrders />}
          {section === "gifting" && <AdminGifting />}
          {section === "messages" && <AdminMessages />}
          {section === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
