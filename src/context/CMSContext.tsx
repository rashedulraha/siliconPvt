"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { cmsReducer } from "./CMSReducer";
import type { CMSState, CMSAction } from "@/types";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";
import { seedProperties, seedTeam, seedBlog, seedPages } from "@/utils/seed";

/* ============================================================
 *  INITIAL STATE (with seed data)
 * ============================================================ */
export const initialState: CMSState = {
  siteSettings: {
    siteName: "EstateHub",
    logo: "",
    contactEmail: "hello@estatehub.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Real Estate Ave, Suite 100, New York, NY 10001",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  menu: [
    { id: "1", label: "Home", href: "/", order: 1 },
    { id: "2", label: "Properties", href: "/properties", order: 2 },
    { id: "3", label: "About", href: "/about", order: 3 },
    { id: "4", label: "Blog", href: "/blog", order: 4 },
    { id: "5", label: "Careers", href: "/careers", order: 5 },
    { id: "6", label: "Contact", href: "/contact", order: 6 },
  ],
  properties: seedProperties,
  team: seedTeam,
  blog: seedBlog,
  pages: seedPages,
  theme: {
    primaryColor: "hsl(221, 83%, 24%)",
    secondaryColor: "hsl(40, 96%, 53%)",
    fontFamily: "Inter",
    mode: "system",
  },
  media: [],
  leads: [],
  seo: {
    home: {
      title: "EstateHub - Find Your Dream Home",
      description: "Premium real estate listings for modern living.",
    },
    about: {
      title: "About Us - EstateHub",
      description: "Learn about EstateHub's mission and team.",
    },
    properties: {
      title: "Properties - EstateHub",
      description: "Browse our curated collection of premium properties.",
    },
    blog: {
      title: "Blog - EstateHub",
      description: "Real estate tips, trends, and market insights.",
    },
    contact: {
      title: "Contact Us - EstateHub",
      description: "Get in touch with our real estate experts.",
    },
    careers: {
      title: "Careers - EstateHub",
      description: "Join our team of real estate professionals.",
    },
  },
};

/* ============================================================
 *  CONTEXT SHAPE
 * ============================================================ */
interface CMSContextType {
  state: CMSState;
  dispatch: (action: CMSAction) => void;
  isHydrated: boolean;
  /** Force-save current state to localStorage */
  persistNow: () => void;
  /** Reset CMS to initial state (clears localStorage) */
  resetAll: () => void;
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined);

/* ============================================================
 *  PROVIDER
 * ============================================================ */
export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cmsReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- Hydration: load from localStorage on mount ---------- */
  useEffect(() => {
    const saved = storage.get<CMSState | null>(STORAGE_KEYS.CMS_DATA, null);
    if (saved) {
      // Merge saved data with initial state to handle schema migrations
      // (new fields added in updates won't break old saved data)
      const merged = mergeWithDefaults(initialState, saved);
      dispatch({ type: "SET_STATE", payload: merged });
    }
    setIsHydrated(true);
  }, []);

  /* ---------- Auto-save: debounced localStorage persistence ---------- */
  useEffect(() => {
    if (!isHydrated) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      storage.set(STORAGE_KEYS.CMS_DATA, state);
    }, 300); // 300ms debounce

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [state, isHydrated]);

  /* ---------- Imperative helpers ---------- */
  const persistNow = useCallback(() => {
    storage.set(STORAGE_KEYS.CMS_DATA, state);
  }, [state]);

  const resetAll = useCallback(() => {
    storage.remove(STORAGE_KEYS.CMS_DATA);
    dispatch({ type: "SET_STATE", payload: initialState });
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, isHydrated, persistNow, resetAll }),
    [state, isHydrated, persistNow, resetAll],
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

/* ============================================================
 *  HOOK
 * ============================================================ */
export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}

/* ============================================================
 *  HELPERS
 * ============================================================ */
import { useState } from "react";

/**
 * Deep merge saved state with initial state to handle schema migrations.
 * Ensures new fields added in future versions don't break old saved data.
 */
function mergeWithDefaults(
  defaults: CMSState,
  saved: Partial<CMSState>,
): CMSState {
  return {
    siteSettings: { ...defaults.siteSettings, ...(saved.siteSettings || {}) },
    menu: saved.menu && saved.menu.length > 0 ? saved.menu : defaults.menu,
    properties: saved.properties || defaults.properties,
    team: saved.team || defaults.team,
    blog: saved.blog || defaults.blog,
    pages: saved.pages || defaults.pages,
    theme: { ...defaults.theme, ...(saved.theme || {}) },
    media: saved.media || defaults.media,
    leads: saved.leads || defaults.leads,
    seo: { ...defaults.seo, ...(saved.seo || {}) },
  };
}
