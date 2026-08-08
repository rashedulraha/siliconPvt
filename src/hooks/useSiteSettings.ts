"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { SiteSettings } from "@/types";
import { apiFetch } from "@/lib/api-client";

export function useSiteSettings() {
	const { state, dispatch } = useCMS();

	const updateSettings = useCallback(
		async (data: Partial<SiteSettings>) => {
			dispatch({ type: "UPDATE_SITE_SETTINGS", payload: data });
			try {
				await apiFetch("/settings", {
					method: "PUT",
					body: JSON.stringify(data),
				});
			} catch (err) {
				console.error("[useSiteSettings] Failed to update site settings on backend DB:", err);
			}
		},
		[dispatch],
	);

	const updateSocial = useCallback(
		async (social: Partial<SiteSettings["social"]>) => {
			const updatedSocial = { ...state.siteSettings.social, ...social };
			dispatch({
				type: "UPDATE_SITE_SETTINGS",
				payload: { social: updatedSocial },
			});
			try {
				await apiFetch("/settings", {
					method: "PUT",
					body: JSON.stringify({ facebookUrl: updatedSocial.facebook, youtubeUrl: updatedSocial.youtube }),
				});
			} catch (err) {
				console.error("[useSiteSettings] Failed to update social settings on backend DB:", err);
			}
		},
		[state.siteSettings.social, dispatch],
	);

	return {
		settings: state.siteSettings,
		updateSettings,
		updateSocial,
	};
}

