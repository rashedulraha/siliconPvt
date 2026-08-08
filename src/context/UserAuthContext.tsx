"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UserAuthContextType, UserSession } from "@/types/auth";

const AUTH_STORAGE_KEY = "estatehub_user_auth";

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((userData: UserSession, token?: string) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } catch {
        // Ignore storage failures.
      }
      if (token) {
        window.localStorage.setItem("silicon_jwt_token", token);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.localStorage.removeItem("silicon_jwt_token");
      } catch {
        // Ignore storage failures.
      }
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserSession;
        setUser(parsed);
      }
    } catch {
      // Ignore invalid saved session.
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value = useMemo(
    () => ({
      user,
      currentUser: user,
      isLoggedIn: Boolean(user),
      isLoading,
      login,
      logout,
      checkAuthStatus,
    }),
    [user, isLoading, login, logout, checkAuthStatus],
  );

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used inside UserAuthProvider");
  }
  return context;
}
