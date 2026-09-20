import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { isSupabaseConfigured as isConfigured } from "../../lib/supabase";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [busy, setBusy]         = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error ?? "Incorrect credentials.");
      setPassword("");
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-3xl text-charcoal">
          क<span className="italic">âla</span>
        </Link>
        <p className="mt-1.5 font-body text-xs uppercase tracking-widest2 text-charcoal/45">
          Admin Dashboard
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-widest2 text-charcoal/45">
              Email
            </label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="admin@kala.art"
              className="w-full rounded-sm border border-charcoal/15 bg-ivory px-4 py-3 font-body text-sm focus-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-widest2 text-charcoal/45">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full rounded-sm border border-charcoal/15 bg-ivory px-4 py-3 font-body text-sm focus-ring"
            />
          </div>

          {error && (
            <p className="font-body text-xs text-terracotta">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-sm bg-charcoal py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {!isConfigured && (
          <div className="mt-6 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3">
            <p className="font-body text-xs text-charcoal/60">
              <span className="font-medium text-charcoal">Local dev mode.</span> Use{" "}
              <code className="rounded bg-beige px-1 py-0.5 text-[11px]">admin@kala.art</code> /{" "}
              <code className="rounded bg-beige px-1 py-0.5 text-[11px]">kala-admin-2024</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
