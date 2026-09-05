/**
 * Admin Auth — src/lib/admin-auth.ts
 *
 * Session utilities for the Silicon Real Estate admin RBAC dashboard.
 *
 * All functions access localStorage at call time only — this module
 * produces zero side-effects on import and does NOT carry "use client"
 * because it contains no React hooks or JSX. Callers that are React
 * components must be Client Components (add "use client" there).
 *
 * localStorage availability:
 *   Private browsing, storage quota exceeded, or SSR contexts can all
 *   throw when accessing localStorage. Every function that touches
 *   localStorage wraps the call in try/catch and handles failures
 *   gracefully (getAdminSession returns null; set/clear are no-ops on
 *   error rather than crashing the caller).
 *
 * Requirements: 5.1, 5.2, 5.4
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Minimal session record persisted to localStorage on successful login.
 *
 * `loggedInAt` is an ISO 8601 timestamp (e.g. `new Date().toISOString()`).
 */
export interface AdminSession {
  email: string;
  loggedInAt: string; // ISO 8601
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** The localStorage key under which the AdminSession JSON is stored. */
export const ADMIN_SESSION_KEY = "silicon_admin_session";

export const DEFAULT_ADMIN_EMAIL = "admin@siliconrealestatepvtltd.com";
export const DEFAULT_ADMIN_PASSWORD = "admin123456";

export function getAdminEmail(): string {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
}

export function getAdminPassword(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

// ---------------------------------------------------------------------------
// Session utilities
// ---------------------------------------------------------------------------

/**
 * Read and parse the admin session from localStorage.
 *
 * Returns `null` when:
 * - No session has been set
 * - The stored value is not valid JSON
 * - localStorage is unavailable (SSR, private browsing, quota exceeded)
 */
export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    // Validate the minimal shape before trusting it
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      "email" in parsed &&
      "loggedInAt" in parsed &&
      typeof (parsed as Record<string, unknown>)["email"] === "string" &&
      typeof (parsed as Record<string, unknown>)["loggedInAt"] === "string"
    ) {
      const session = parsed as AdminSession;
      // Auto-migrate legacy email to current brand email
      if (session.email.includes("afiaholdingsltd.com")) {
        session.email = DEFAULT_ADMIN_EMAIL;
        setAdminSession(session);
      }
      return session;
    }
    return null;
  } catch {
    // localStorage unavailable or JSON.parse failed — treat as no session
    return null;
  }
}

/**
 * Persist an admin session to localStorage.
 *
 * Serialises the session as JSON. Silently does nothing if localStorage
 * is unavailable or the write throws (e.g. storage quota exceeded).
 */
export function setAdminSession(session: AdminSession): void {
  try {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  } catch {
    // Storage unavailable or quota exceeded — caller will handle absence
    // of session on the next read
  }
}

/**
 * Remove the admin session from localStorage.
 *
 * Safe to call even when no session exists or localStorage is unavailable.
 */
export function clearAdminSession(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // localStorage unavailable — nothing to remove
  }
}
