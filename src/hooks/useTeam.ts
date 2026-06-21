"use client";

import { useCallback } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useCMS } from "@/context/CMSContext";
import { ThemeConfig } from "@/types";

/**
 * Combined theme hook — merges next-themes (for dark/light mode)
 * with CMS theme config (colors, fonts).
 */
export function useTheme() {
  const nextTheme = useNextTheme();
  const { state, dispatch } = useCMS();

  const updateThemeConfig = useCallback(
    (data: Partial<ThemeConfig>) => {
      dispatch({ type: "UPDATE_THEME", payload: data });
    },
    [dispatch],
  );

  return {
    // next-themes
    theme: nextTheme.theme,
    setTheme: nextTheme.setTheme,
    resolvedTheme: nextTheme.resolvedTheme,
    // CMS theme config
    themeConfig: state.theme,
    updateThemeConfig,
  };
}
