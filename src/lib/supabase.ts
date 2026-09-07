import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/** Single source of truth for "is a real Supabase project wired up?"
 *  Catches the common placeholder patterns (empty, "placeholder", the
 *  literal "your-project-id" / "your-anon-key" template values) and
 *  validates the URL actually looks like a *.supabase.co host — so a
 *  half-filled-in .env.local correctly falls back to local data instead
 *  of silently trying (and slowly failing) to hit a fake endpoint. */
export const isSupabaseConfigured =
  !!supabaseUrl &&
  !!supabaseAnon &&
  !supabaseUrl.includes("placeholder") &&
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnon.includes("your-anon-key") &&
  /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(supabaseUrl.trim());

if (!isSupabaseConfigured) {
  console.warn(
    "[kalā] Supabase env vars missing or placeholder. Add real VITE_SUPABASE_URL and " +
    "VITE_SUPABASE_ANON_KEY to .env.local — falling back to placeholder data."
  );
}

export const supabase = createClient<Database>(
  supabaseUrl  || "https://placeholder.supabase.co",
  supabaseAnon || "placeholder"
);
