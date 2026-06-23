"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";

import { cmsReducer } from "./CMSReducer";
import type { CMSState, CMSAction } from "@/types";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";
import {
  seedProperties,
  seedTeam,
  seedBlog,
  seedPages,
  seedTestimonials,
  seedJobs,
} from "@/utils/seed";

/* ============================================================
 *  INITIAL STATE
 * ============================================================ */
export const initialState: CMSState = {
  siteSettings: {
    siteName: "EstateHub",
    logo: "",
    contactEmail: "hello@estatehub.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Real Estate Ave, Suite 100, New York, NY 10001",
    businessHours: "Mon - Fri: 9:00 AM - 6:00 PM",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      youtube: "",
      pinterest: "",
      rss: "",
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
  testimonials: seedTestimonials,
  jobs: seedJobs,
  theme: {
    primaryColor: "hsl(150, 55%, 12%)",
    secondaryColor: "hsl(37, 85%, 52%)",
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
 *  CONTEXT & PROVIDER
 * ============================================================ */
interface CMSContextType {
  state: CMSState;
  dispatch: (action: CMSAction) => void;
  isHydrated: boolean;
  persistNow: () => void;
  resetAll: () => void;
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cmsReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydration: load from localStorage on mount
  useEffect(() => {
    const saved = storage.get<CMSState | null>(STORAGE_KEYS.CMS_DATA, null);
    if (saved) {
      const merged = mergeWithDefaults(initialState, saved);
      dispatch({ type: "SET_STATE", payload: merged });
    }
    setIsHydrated(true);
  }, []);

  // Auto-save: debounced localStorage persistence
  useEffect(() => {
    if (!isHydrated) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      storage.set(STORAGE_KEYS.CMS_DATA, state);
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, isHydrated]);

  const persistNow = useCallback(
    () => storage.set(STORAGE_KEYS.CMS_DATA, state),
    [state],
  );

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
 *  HOOK (This was missing/broken in your file)
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
    testimonials: saved.testimonials || defaults.testimonials,
    jobs: saved.jobs || defaults.jobs,
    theme: { ...defaults.theme, ...(saved.theme || {}) },
    media: saved.media || defaults.media,
    leads: saved.leads || defaults.leads,
    seo: { ...defaults.seo, ...(saved.seo || {}) },
  };
}
