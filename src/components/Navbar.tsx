import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import kalaLogo from "../assets/kala-logo-mark.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/categories", label: "Categories" },
  { to: "/suppliers", label: "Suppliers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // On the homepage the bar stays fully transparent until the hero has scrolled away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.85 : 24));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-gallery ${
        scrolled || open
          ? "bg-ivory/95 shadow-[0_1px_0_0_rgba(29,29,27,0.08)] backdrop-blur-[2px]"
          : "bg-transparent"
      }`}
    >
      <div className="relative">
        {/* Centre grid: equal side columns keep the logo on the true page centre. */}
        <nav
          aria-label="Primary"
          className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 py-3 md:px-6 lg:py-4"
        >
          <ul className="hidden items-center justify-end gap-4 pr-4 md:flex lg:gap-[30px] lg:pr-8">
            {links.slice(0, 3).map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
          </ul>

          <Link
            to="/"
            aria-label="Kalā home"
            className="col-start-1 row-start-1 flex items-center md:col-start-2 md:justify-center"
          >
            <img
              src={kalaLogo}
              alt="Kalā"
              className="h-16 w-16 object-contain mix-blend-multiply md:h-[88px] md:w-[88px] lg:h-24 lg:w-24"
            />
          </Link>

          <ul className="hidden items-center justify-start gap-4 pl-4 md:flex lg:gap-[30px] lg:pl-8">
            {links.slice(3).map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
          </ul>
        </nav>

        {/* Utility icons pinned to the page edge, independent of the centred grid. */}
        <div className="absolute inset-y-0 right-4 flex items-center gap-5 md:right-6 lg:right-10 lg:gap-6">
          <Link to="/collections" aria-label="Search collections" className="hidden focus-ring lg:block">
            <Search className="h-[18px] w-[18px] text-black" strokeWidth={1.4} />
          </Link>
          <Link to="/cart" aria-label="View cart" className="relative focus-ring">
            <ShoppingBag className="h-[18px] w-[18px] text-black" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] text-ivory">
                {count}
              </span>
            )}
          </Link>
          <Link to="/contact" aria-label="Account and contact" className="hidden focus-ring lg:block">
            <User className="h-[18px] w-[18px] text-black" strokeWidth={1.4} />
          </Link>
          <button
            className="focus-ring md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-charcoal/10 bg-ivory md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-xl text-charcoal"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `border-b pb-0.5 whitespace-nowrap font-display text-[13px] font-medium tracking-wide lg:text-[14px] text-black transition-opacity duration-300 hover:opacity-60 ${
            isActive ? "border-black" : "border-transparent"
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
