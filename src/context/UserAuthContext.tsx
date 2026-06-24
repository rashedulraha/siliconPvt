"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { UserSession, UserAuthContextType } from "@/types/auth";

const USER_SESSION_KEY = "silicon_user_session";

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronizer that reads session data safely on client mount/initialization
  const checkAuthStatus = () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem(USER_SESSION_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to sync authentication status from storage:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // Run on client mount to sync state and prevent SSR/hydration mismatch
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (userData: UserSession) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to write session storage during login:", error);
      }
    }
    setUser(userData);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(USER_SESSION_KEY);
        // Clean up administrative overrides if stored in localStorage
        localStorage.removeItem("silicon_admin_session");
      } catch (error) {
        console.error("Failed to purge session storage during logout:", error);
      }
    }
    setUser(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) {
    throw new Error("useUserAuth must be used inside UserAuthProvider");
  }
  return ctx;
}
