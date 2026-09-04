import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase, isSupabaseConfigured as isConfigured } from "../lib/supabase";

interface AdminAuthContextValue {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* On mount — check if there's already an active Supabase session */
  useEffect(() => {
    if (!isConfigured) {
      /* Fallback: session-storage based auth for local dev */
      setIsAdmin(sessionStorage.getItem("kala_admin") === "1");
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setIsAdmin(!!data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!isConfigured) {
      /* Local dev fallback — single hardcoded credential */
      if (email === "admin@kala.art" && password === "kala-admin-2024") {
        sessionStorage.setItem("kala_admin", "1");
        setIsAdmin(true);
        return { ok: true };
      }
      return { ok: false, error: "Incorrect email or password." };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const logout = async () => {
    if (!isConfigured) {
      sessionStorage.removeItem("kala_admin");
      setIsAdmin(false);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
