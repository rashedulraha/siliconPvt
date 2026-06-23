export const STORAGE_KEYS = {
  CMS_DATA: "estatehub_cms_data",
  THEME: "estatehub_theme",
  FAVORITES: "estatehub_favorites",
  COMPARISON: "estatehub_comparison",
  ANALYTICS_CONSENT: "estatehub_analytics_consent",
} as const;

export const SITE_CONFIG = {
  MAX_WIDTH: 1280,
  PROPERTY_COMPARE_LIMIT: 3,
  FAVORITES_LIMIT: 50,
  WHATSAPP_NUMBER: "+15551234567", // Default — override via env
  GA_MEASUREMENT_ID: "", // Set via env
} as const;

export const PROPERTY_CATEGORIES = [
  "apartment",
  "house",
  "villa",
  "condo",
  "land",
  "commercial",
] as const;

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
] as const;
export const PROPERTY_STATUSES = [
  "available",
  "sold",
  "rented",
  "pending",
] as const;

export const CMS_EXPORT_VERSION = "1.0.0";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest First" },
] as const;
