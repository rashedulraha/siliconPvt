"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS, SITE_CONFIG } from "@/utils/constants";
import { Analytics } from "@/lib/analytics";
import type { Favorite } from "@/types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = storage.get<Favorite[]>(STORAGE_KEYS.FAVORITES, []);
    setFavorites(saved);
    setIsHydrated(true);
  }, []);

  const persist = useCallback((next: Favorite[]) => {
    setFavorites(next);
    storage.set(STORAGE_KEYS.FAVORITES, next);
  }, []);

  const isFavorite = useCallback(
    (propertyId: string) => favorites.some((f) => f.propertyId === propertyId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (propertyId: string) => {
      const exists = favorites.some((f) => f.propertyId === propertyId);
      if (exists) {
        const next = favorites.filter((f) => f.propertyId !== propertyId);
        persist(next);
        Analytics.favoriteToggle(propertyId, "remove");
        return false;
      } else {
        if (favorites.length >= SITE_CONFIG.FAVORITES_LIMIT) {
          alert(
            `⚠️ You've reached the limit of ${SITE_CONFIG.FAVORITES_LIMIT} favorites.`,
          );
          return true;
        }
        const next = [
          { propertyId, addedAt: new Date().toISOString() },
          ...favorites,
        ];
        persist(next);
        Analytics.favoriteToggle(propertyId, "add");
        return true;
      }
    },
    [favorites, persist],
  );

  const removeFavorite = useCallback(
    (propertyId: string) => {
      persist(favorites.filter((f) => f.propertyId !== propertyId));
    },
    [favorites, persist],
  );

  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  const favoriteIds = favorites.map((f) => f.propertyId);

  return {
    favorites,
    favoriteIds,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAll,
    count: favorites.length,
    isHydrated,
  };
}
