"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface PathwayItem {
	num: string;
	title: string;
	desc: string;
	tag: string;
}

export interface TermItem {
	num: string;
	title: string;
	text: string;
	tag: string;
	highlights: string[];
}

export interface MembershipData {
	id?: string;
	heroTitle: string;
	heroDescription: string;
	formPdfUrl: string;
	applicationFee: string;
	landSharePercentage: string;
	soilElevationHeight: string;
	offlineNoticeText: string;
	contactHotline: string;
	pathways: PathwayItem[];
	termsAndConditions?: TermItem[];
}

export const DEFAULT_PATHWAYS: PathwayItem[] = [];

export const defaultMembershipData: MembershipData = {
	heroTitle: "",
	heroDescription: "",
	formPdfUrl: "",
	applicationFee: "",
	landSharePercentage: "",
	soilElevationHeight: "",
	offlineNoticeText: "",
	contactHotline: "",
	pathways: [],
};

export function useMembershipContent() {
	const [membershipData, setMembershipData] = useState<MembershipData>(
		defaultMembershipData,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContent = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				content?: any;
				data?: any;
			}>("/membership-content");
			const content = res?.content || res?.data;
			if (res && res.success && content) {
				let parsedPathways: PathwayItem[] = [];
				if (content.pathways) {
					try {
						parsedPathways =
							typeof content.pathways === "string"
								? JSON.parse(content.pathways)
								: content.pathways;
					} catch {
						parsedPathways = [];
					}
				}

				setMembershipData({
					...defaultMembershipData,
					...content,
					pathways: parsedPathways,
				});
			}
		} catch (err: any) {
			console.error(
				"[useMembershipContent] Failed to fetch membership content:",
				err,
			);
			setError(err.message || "Failed to load membership content");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContent();
	}, [fetchContent]);

	const updateMembershipContent = useCallback(
		async (data: Partial<MembershipData>) => {
			try {
				const payload = {
					...data,
					pathways: data.pathways ? JSON.stringify(data.pathways) : undefined,
				};

				const res = await apiFetch<{ success: boolean; content?: any }>(
					"/membership-content",
					{
						method: "PUT",
						body: JSON.stringify(payload),
					},
				);

				if (res && res.content) {
					setMembershipData((prev) => ({
						...prev,
						...data,
					}));
				} else {
					setMembershipData((prev) => ({
						...prev,
						...data,
					}));
				}
				return true;
			} catch (err: any) {
				console.error(
					"[useMembershipContent] Failed to update membership content:",
					err,
				);
				throw err;
			}
		},
		[],
	);

	return {
		membershipData,
		loading,
		error,
		refetch: fetchContent,
		updateMembershipContent,
	};
}
