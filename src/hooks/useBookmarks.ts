"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";
import { useUserAuth } from "@/context/UserAuthContext";
import { toast } from "sonner";

export function useBookmarks() {
  const { isLoggedIn } = useUserAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = storage.get<string[]>(STORAGE_KEYS.BOOKMARKS, []);
    setBookmarks(saved);
    setIsHydrated(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setBookmarks(next);
    storage.set(STORAGE_KEYS.BOOKMARKS, next);
  }, []);

  const isBookmarked = useCallback(
    (postId: string) => bookmarks.includes(postId),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (postId: string) => {
      if (!isLoggedIn) {
        toast.warning("Please sign in to bookmark articles for later!");
        return false;
      }

      const exists = bookmarks.includes(postId);
      if (exists) {
        const next = bookmarks.filter((id) => id !== postId);
        persist(next);
        toast.success("Article removed from bookmarks.");
        return false;
      } else {
        const next = [postId, ...bookmarks];
        persist(next);
        toast.success("Article saved to your bookmarks.");
        return true;
      }
    },
    [bookmarks, isLoggedIn, persist],
  );

  const removeBookmark = useCallback(
    (postId: string) => {
      persist(bookmarks.filter((id) => id !== postId));
    },
    [bookmarks, persist],
  );

  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearAll,
    count: bookmarks.length,
    isHydrated,
  };
}
