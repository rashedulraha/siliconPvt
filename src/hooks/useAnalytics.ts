"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Analytics } from "@/lib/analytics";

/**
 * Hook to track page views on route changes.
 * Use once in root layout.
 */
export function useAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (pathname) {
			const url = searchParams.toString()
				? `${pathname}?${searchParams.toString()}`
				: pathname;
			Analytics.pageView(url);
		}
	}, [pathname, searchParams]);

	return { Analytics };
}
