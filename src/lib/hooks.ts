import { useState, useEffect, useCallback } from "react";
import type { Painting, Supplier, Frame, Glass } from "../types";
import {
  fetchPaintings,
  fetchPaintingBySlug,
  fetchFeaturedPaintings,
  fetchRelatedPaintings,
  fetchSuppliers,
  fetchSupplierBySlug,
  fetchFrames,
  fetchGlassOptions,
} from "./db";
import {
  paintings as localPaintings,
  suppliers as localSuppliers,
  frames as localFrames,
  glassOptions as localGlass,
  getPaintingBySlug as localGetBySlug,
  getRelatedPaintings as localGetRelated,
} from "../data/placeholderData";

/* Generic async hook with local fallback */
function useAsyncWithFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  deps: unknown[] = []
): { data: T; loading: boolean } {
  const [data, setData]       = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 4000)
      );
      const result = await Promise.race([fetcher(), timeout]);
      // If Supabase returns empty/null, fall back to local data
      if (
        result === null ||
        result === undefined ||
        (Array.isArray(result) && (result as unknown[]).length === 0)
      ) {
        setData(fallback);
      } else {
        setData(result);
      }
    } catch {
      setData(fallback);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);

  return { data, loading };
}

/* ── Public hooks — always return local data if Supabase fails ── */

export function usePaintings() {
  return useAsyncWithFallback<Painting[]>(fetchPaintings, localPaintings);
}

export function usePainting(slug: string | undefined) {
  const localFallback = slug ? (localGetBySlug(slug) ?? null) : null;
  return useAsyncWithFallback<Painting | null>(
    () => slug ? fetchPaintingBySlug(slug).then(r => r ?? null) : Promise.resolve(null),
    localFallback,
    [slug]
  );
}

export function useFeaturedPaintings() {
  const featured = localPaintings.filter((p) => p.featured && !p.sold);
  return useAsyncWithFallback<Painting[]>(fetchFeaturedPaintings, featured);
}

export function useRelatedPaintings(current: Painting | null) {
  const localFallback = current ? localGetRelated(current) : [];
  return useAsyncWithFallback<Painting[]>(
    () => current ? fetchRelatedPaintings(current) : Promise.resolve([]),
    localFallback,
    [current?.id]
  );
}

export function useSuppliers() {
  return useAsyncWithFallback<Supplier[]>(fetchSuppliers, localSuppliers);
}

export function useSupplier(slug: string | undefined) {
  const localFallback = localSuppliers.find((s) => s.slug === slug) ?? null;
  return useAsyncWithFallback<Supplier | null>(
    () => slug ? fetchSupplierBySlug(slug).then(r => r ?? null) : Promise.resolve(null),
    localFallback,
    [slug]
  );
}

export function useFrames() {
  return useAsyncWithFallback<Frame[]>(fetchFrames, localFrames);
}

export function useGlassOptions() {
  return useAsyncWithFallback<Glass[]>(fetchGlassOptions, localGlass);
}
