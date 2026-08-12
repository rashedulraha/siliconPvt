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

export const DEFAULT_PATHWAYS: PathwayItem[] = [
	{
		num: "01",
		title: "By Inheritance / Succession",
		desc: "Direct landowners or legal heirs of land situated within the Silicon City project boundary can apply for official membership following the company's prescribed rules.",
		tag: "Inheritance",
	},
	{
		num: "02",
		title: "By Direct Purchase from Company",
		desc: "Clients who have purchased plots or land directly from Silicon Real Estate (Pvt.) Ltd. can apply for membership to complete their plot allocation and handover.",
		tag: "Direct Allotment",
	},
	{
		num: "03",
		title: "By Purchase from Other Sources",
		desc: "Individuals who have purchased land inside the project boundary from third-party owners can also apply for membership under established guidelines to integrate into the township.",
		tag: "Third-Party Transfer",
	},
];

export const defaultMembershipData: MembershipData = {
	heroTitle: "Silicon City Membership Guidelines",
	heroDescription:
		"Review our official offline membership process, download the printable application form, and understand the terms and conditions required to secure your plot ownership in Silicon City.",
	formPdfUrl: "/assets/silicon-membership-form.pdf",
	applicationFee: "BDT 1,000",
	landSharePercentage: "25% - 30%",
	soilElevationHeight: "16 to 18 Feet",
	offlineNoticeText:
		"Download the printable PDF application form, attach your NID copies and photographs, and submit it at our Mohammadpur Corporate Office with the BDT 1,000 application fee.",
	contactHotline: "+880 12 345 678 / +880 1712 345 678",
	pathways: DEFAULT_PATHWAYS,
};

export function useMembershipContent() {
	const [membershipData, setMembershipData] =
		useState<MembershipData>(defaultMembershipData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContent = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{ success: boolean; content?: any }>(
				"/membership-content",
			);
			if (res && res.success && res.content) {
				let parsedPathways = DEFAULT_PATHWAYS;
				if (res.content.pathways) {
					try {
						parsedPathways =
							typeof res.content.pathways === "string"
								? JSON.parse(res.content.pathways)
								: res.content.pathways;
					} catch {
						parsedPathways = DEFAULT_PATHWAYS;
					}
				}

				setMembershipData({
					...defaultMembershipData,
					...res.content,
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
					pathways: data.pathways
						? JSON.stringify(data.pathways)
						: undefined,
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
