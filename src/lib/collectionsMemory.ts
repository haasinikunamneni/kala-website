/**
 * Remembers where the visitor was on the Collections page (filters live in the
 * URL query string; scroll position is kept here) so that opening a painting
 * and coming back restores the exact same view.
 */
const KEY = "kala:collections-view";
const ORDER_KEY = "kala:collections-order";

type Memory = { search: string; scroll: number };

export function readCollectionsMemory(): Memory | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Memory) : null;
  } catch {
    return null;
  }
}

export function saveCollectionsMemory(patch: Partial<Memory>) {
  try {
    const prev = readCollectionsMemory() ?? { search: "", scroll: 0 };
    sessionStorage.setItem(KEY, JSON.stringify({ ...prev, ...patch }));
  } catch {
    /* storage unavailable (private mode) — fail silently */
  }
}

/** URL of the Collections page exactly as the visitor last left it. */
export function getCollectionsUrl(): string {
  return `/collections${readCollectionsMemory()?.search ?? ""}`;
}

/** Random order that stays the same for the whole browser session, even across reloads. */
export function sessionShuffle<T extends { id: string | number }>(list: T[]): T[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(ORDER_KEY) ?? "null") as (string | number)[] | null;
    if (Array.isArray(saved) && saved.length) {
      const byId = new Map(list.map((p) => [p.id, p]));
      const ordered = saved.map((id) => byId.get(id)).filter((p): p is T => !!p);
      const seen = new Set(ordered.map((p) => p.id));
      return [...ordered, ...list.filter((p) => !seen.has(p.id))];
    }
  } catch {
    /* ignore and reshuffle */
  }
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(copy.map((p) => p.id)));
  } catch {
    /* ignore */
  }
  return copy;
}
