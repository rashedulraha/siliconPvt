// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ============================================================
 *  CLASSNAME MERGING
 * ============================================================ */

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ============================================================
 *  FORMATTING UTILITIES
 * ============================================================ */

/**
 * Format a number as currency.
 *
 * @example
 * formatCurrency(2500000)        // "$2,500,000"
 * formatCurrency(3500, "EUR")    // "€3,500"
 * formatCurrency(1234.56)        // "$1,235" (rounded)
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as compact currency (e.g. "$2.5M", "$850K").
 *
 * @example
 * formatCompactCurrency(2500000) // "$2.5M"
 * formatCompactCurrency(850000)  // "$850K"
 * formatCompactCurrency(1500)    // "$1.5K"
 */
export function formatCompactCurrency(
  amount: number,
  currency = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Format an ISO date string to a human-readable format.
 *
 * @example
 * formatDate("2026-06-22T10:00:00Z") // "June 22, 2026"
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format an ISO date string to a short format.
 *
 * @example
 * formatShortDate("2026-06-22T10:00:00Z") // "Jun 22, 2026"
 */
export function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format an ISO date string to relative time (e.g. "2 hours ago").
 *
 * @example
 * formatRelativeTime("2026-06-22T08:00:00Z") // "2 hours ago"
 */
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek === 1 ? "" : "s"} ago`;
  if (diffMonth < 12)
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
  return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`;
}

/**
 * Format a number with commas (e.g. 1500 → "1,500").
 *
 * @example
 * formatNumber(1500) // "1,500"
 * formatNumber(1500.5) // "1,500.5"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/* ============================================================
 *  STRING UTILITIES
 * ============================================================ */

/**
 * Convert a string to a URL-friendly slug.
 *
 * @example
 * slugify("Modern Downtown Penthouse") // "modern-downtown-penthouse"
 * slugify("Hello, World!")             // "hello-world"
 * slugify("  Multiple   spaces  ")     // "multiple-spaces"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

/**
 * Capitalize the first letter of a string.
 *
 * @example
 * capitalize("hello") // "Hello"
 * capitalize("for sale") // "For sale"
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert a string to title case.
 *
 * @example
 * toTitleCase("hello world") // "Hello World"
 */
export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
}

/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * @example
 * truncate("Hello World", 5) // "Hello..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/* ============================================================
 *  ID GENERATION
 * ============================================================ */

/**
 * Generate a unique ID using timestamp + random string.
 * Format: "{timestamp}-{random}"
 *
 * @example
 * generateId() // "1719043200000-abc1234"
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a UUID v4.
 *
 * @example
 * generateUUID() // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* ============================================================
 *  VALIDATION UTILITIES
 * ============================================================ */

/**
 * Validate an email address.
 *
 * @example
 * isValidEmail("test@example.com") // true
 * isValidEmail("invalid")          // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a phone number (basic international format).
 *
 * @example
 * isValidPhone("+1 (555) 123-4567") // true
 * isValidPhone("abc")               // false
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate a URL.
 *
 * @example
 * isValidUrl("https://example.com") // true
 * isValidUrl("not-a-url")           // false
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
 *  ARRAY UTILITIES
 * ============================================================ */

/**
 * Remove duplicate items from an array by a key.
 *
 * @example
 * uniqueBy([{id: 1}, {id: 1}, {id: 2}], "id") // [{id: 1}, {id: 2}]
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Shuffle an array (Fisher-Yates algorithm).
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Group an array by a key.
 *
 * @example
 * groupBy([{type: "sale"}, {type: "rent"}], "type")
 * // { sale: [...], rent: [...] }
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const value = String(item[key]);
      if (!groups[value]) groups[value] = [];
      groups[value].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

/* ============================================================
 *  OBJECT UTILITIES
 * ============================================================ */

/**
 * Deep clone an object (JSON-safe only).
 *
 * @example
 * const copy = deepClone(obj);
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Pick specific keys from an object.
 *
 * @example
 * pick({a: 1, b: 2, c: 3}, ["a", "c"]) // {a: 1, c: 3}
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}

/**
 * Omit specific keys from an object.
 *
 * @example
 * omit({a: 1, b: 2, c: 3}, ["b"]) // {a: 1, c: 3}
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

/* ============================================================
 *  ASYNC UTILITIES
 * ============================================================ */

/**
 * Delay execution for a specified time.
 *
 * @example
 * await delay(1000); // Wait 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce a function.
 *
 * @example
 * const debouncedSearch = debounce(search, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle a function.
 *
 * @example
 * const throttledScroll = throttle(onScroll, 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/* ============================================================
 *  MATH UTILITIES
 * ============================================================ */

/**
 * Clamp a number between min and max.
 *
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-10, 0, 100) // 0
 * clamp(50, 0, 100)  // 50
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage.
 *
 * @example
 * percentage(50, 200) // 25
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Round to a specific number of decimal places.
 *
 * @example
 * roundTo(3.14159, 2) // 3.14
 */
export function roundTo(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/* ============================================================
 *  BROWSER UTILITIES
 * ============================================================ */

/**
 * Copy text to clipboard.
 *
 * @example
 * await copyToClipboard("Hello World");
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        textArea.remove();
        return true;
      } catch (error) {
        textArea.remove();
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}

/**
 * Check if code is running in browser.
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Check if code is running on server.
 */
export const isServer = typeof window === "undefined";

/**
 * Get user's preferred language.
 */
export function getPreferredLanguage(): string {
  if (typeof navigator === "undefined") return "en";
  return navigator.language || "en";
}

/* ============================================================
 *  TYPE GUARDS
 * ============================================================ */

/**
 * Check if a value is not null or undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Check if a value is a plain object.
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
