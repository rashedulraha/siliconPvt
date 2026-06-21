"use client";

import { useState, useCallback } from "react";
import { CMSContext, initialState } from "@/context/CMSContext";
import type { CMSAction } from "@/types";

export function CMSProvider({ children }: { children: React.ReactNode }) {
  // Phase 1: Static state. Phase 2 will add reducer, localStorage, CRUD.
  const [state] = useState(initialState);
  const dispatch = useCallback((_action: CMSAction) => {
    // No-op in Phase 1 — Phase 2 will implement the reducer
  }, []);

  return (
    <CMSContext.Provider value={{ state, dispatch }}>
      {children}
    </CMSContext.Provider>
  );
}
