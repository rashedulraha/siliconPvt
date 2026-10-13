"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ContactInfoData {
	id?: string;
	heroTitle: string;
	heroTitleBn?: string;
	heroDescription: string;
	heroDescriptionBn?: string;
	address: string;
	addressBn?: string;
	phone: string;
	whatsapp: string;
	email: string;
	secondaryEmail?: string;
	website: string;
	businessHours: string;
	businessHoursBn?: string;
	mapEmbedUrl: string;
	siteVisitNotice: string;
	siteVisitNoticeBn?: string;
	imageUrl?: string;
	facebookUrl?: string;
	youtubeUrl?: string;
}

export const defaultContactInfo: ContactInfoData = {
	heroTitle: "",
	heroTitleBn: "",
	heroDescription: "",
	heroDescriptionBn: "",
	address: "",
	addressBn: "",
	phone: "",
	whatsapp: "",
	email: "",
	secondaryEmail: "",
	website: "",
	businessHours: "",
	businessHoursBn: "",
	mapEmbedUrl: "",
	siteVisitNotice: "",
	siteVisitNoticeBn: "",
	imageUrl: "",
	facebookUrl: "",
	youtubeUrl: "",
};

export function useContactInfo() {
	const [contactInfo, setContactInfo] =
		useState<ContactInfoData>(defaultContactInfo);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContactInfo = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				contactInfo?: ContactInfoData;
				contact?: ContactInfoData;
				data?: ContactInfoData;
			}>("/contact-info");
			const found = res?.contactInfo || res?.contact || res?.data;
			if (found) {
				setContactInfo({
					...defaultContactInfo,
					...found,
				});
			}
		} catch (err: any) {
			console.error("[useContactInfo] Failed to fetch contact info:", err);
			setError(err.message || "Failed to load contact info");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContactInfo();
	}, [fetchContactInfo]);

	const updateContactInfo = useCallback(
		async (data: Partial<ContactInfoData>) => {
			try {
				const res = await apiFetch<{
					success: boolean;
					contactInfo?: ContactInfoData;
				}>("/contact-info", {
					method: "PUT",
					body: JSON.stringify(data),
				});
				if (res && res.contactInfo) {
					setContactInfo((prev) => ({
						...prev,
						...res.contactInfo,
					}));
				} else {
					setContactInfo((prev) => ({
						...prev,
						...data,
					}));
				}
				return true;
			} catch (err: any) {
				console.error("[useContactInfo] Failed to update contact info:", err);
				throw err;
			}
		},
		[],
	);

	return {
		contactInfo,
		loading,
		error,
		refetch: fetchContactInfo,
		updateContactInfo,
	};
}
