"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { SEOConfig, SEOData } from "@/types";

export function useSEO() {
	const { state, dispatch } = useCMS();

	const updatePageSEO = useCallback(
		(page: keyof SEOConfig, data: SEOData) => {
			dispatch({ type: "UPDATE_SEO", payload: { page, data } });
		},
		[dispatch],
	);

	const getPageSEO = useCallback(
		(page: keyof SEOConfig): SEOData => state.seo[page],
		[state.seo],
	);

	return {
		seo: state.seo,
		updatePageSEO,
		getPageSEO,
	};
}
