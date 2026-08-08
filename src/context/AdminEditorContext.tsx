"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AdminEditorContextType {
  isEditorUnlocked: boolean;
  unlockEditorMode: () => void;
  lockEditorMode: () => void;
}

const STORAGE_KEY = "estatehub_admin_editor";

const AdminEditorContext = createContext<AdminEditorContextType | undefined>(
  undefined,
);

export function AdminEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditorUnlocked, setIsEditorUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setIsEditorUnlocked(stored === "true");
    } catch {
      // Ignore storage failures.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(isEditorUnlocked),
      );
    } catch {
      // Ignore storage failures.
    }
  }, [isEditorUnlocked]);

  const unlockEditorMode = useCallback(() => setIsEditorUnlocked(true), []);
  const lockEditorMode = useCallback(() => setIsEditorUnlocked(false), []);

  const value = useMemo(
    () => ({ isEditorUnlocked, unlockEditorMode, lockEditorMode }),
    [isEditorUnlocked, unlockEditorMode, lockEditorMode],
  );

  return (
    <AdminEditorContext.Provider value={value}>
      {children}
    </AdminEditorContext.Provider>
  );
}

export function useAdminEditor() {
  const context = useContext(AdminEditorContext);
  if (!context) {
    throw new Error("useAdminEditor must be used inside AdminEditorProvider");
  }
  return context;
}
