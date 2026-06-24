"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
}

interface UserAuthContextValue {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (profile: UserProfile) => void;
  logout: () => void;
}

const USER_SESSION_KEY = "silicon_user_session";

const UserAuthContext = createContext<UserAuthContextValue | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(USER_SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function login(profile: UserProfile) {
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
    setUser(profile);
  }

  function logout() {
    sessionStorage.removeItem(USER_SESSION_KEY);
    setUser(null);
  }

  return (
    <UserAuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used inside UserAuthProvider");
  return ctx;
}
