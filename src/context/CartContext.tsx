import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from "react";
import type { CartItem, Painting } from "../types";
import type { BasicFrame, GlassOption } from "../types";

const CART_STORAGE_KEY = "kala_cart_v1";

interface CartContextValue {
  items: CartItem[];
  addToCart: (painting: Painting, frame: BasicFrame | "None", glass: GlassOption, glassCost?: number, customFrame?: boolean) => void;
  removeFromCart: (paintingId: string) => void;
  updateQuantity: (paintingId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

  /* Persist to localStorage on every change — survives refresh, tab close, and return visits on the same browser. */
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* localStorage unavailable (private browsing, quota, etc.) — cart still works for the current session */
    }
  }, [items]);

  const addToCart = (
    painting: Painting,
    frame: BasicFrame | "None",
    glass: GlassOption,
    glassCost = 0,
    customFrame = false
  ) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.painting.id === painting.id);
      if (existing) {
        return prev.map((i) =>
          i.painting.id === painting.id
            ? { ...i, frame, glass, glassCost, customFrame, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { painting, frame, glass, glassCost, customFrame, quantity: 1 }];
    });
  };

  const removeFromCart = (paintingId: string) => setItems((prev) => prev.filter((i) => i.painting.id !== paintingId));
  const updateQuantity = (paintingId: string, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.painting.id === paintingId ? { ...i, quantity: Math.max(1, quantity) } : i)));
  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + (i.painting.price + i.glassCost) * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
