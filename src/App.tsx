import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { ArtworkDetails } from "./pages/ArtworkDetails";
import { Categories } from "./pages/Categories";
import { Suppliers } from "./pages/Suppliers";
import { SupplierDetail } from "./pages/SupplierDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  useLayoutEffect(() => {
    // POP = browser back/forward button — leave scroll position alone so
    // going back to Collections resumes where you left off instead of
    // jumping to the top. Only reset on PUSH/REPLACE (normal link clicks).
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
  return null;
}

/** Wrap a route so only authenticated admins can access it */
function AdminRoute() {
  const { isAdmin, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige">
        <p className="font-body text-xs uppercase tracking-widest2 text-charcoal/40">Loading…</p>
      </div>
    );
  }
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}

/** Public pages — wrapped with Navbar + Footer */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory font-body text-charcoal">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/artwork/:slug" element={<ArtworkDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:slug" element={<SupplierDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SiteSettingsProvider>
      <AdminAuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* Admin — no Navbar/Footer */}
            <Route path="/admin" element={<AdminRoute />} />
            {/* All public routes */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </CartProvider>
      </AdminAuthProvider>
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
