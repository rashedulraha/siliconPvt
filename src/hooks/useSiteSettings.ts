"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { SiteSettings } from "@/types";

export function useSiteSettings() {
  const { state, dispatch } = useCMS();

  const updateSettings = useCallback(
    (data: Partial<SiteSettings>) => {
      dispatch({ type: "UPDATE_SITE_SETTINGS", payload: data });
    },
    [dispatch],
  );

  const updateSocial = useCallback(
    (social: Partial<SiteSettings["social"]>) => {
      dispatch({
        type: "UPDATE_SITE_SETTINGS",
        payload: { social: { ...state.siteSettings.social, ...social } },
      });
    },
    [state.siteSettings.social, dispatch],
  );

  return {
    settings: state.siteSettings,
    updateSettings,
    updateSocial,
  };
}
