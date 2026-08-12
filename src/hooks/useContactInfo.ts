"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ContactInfoData {
	id?: string;
	heroTitle: string;
	heroDescription: string;
	address: string;
	phone: string;
	whatsapp: string;
	email: string;
	secondaryEmail?: string;
	website: string;
	businessHours: string;
	mapEmbedUrl: string;
	siteVisitNotice: string;
	imageUrl?: string;
	facebookUrl?: string;
	youtubeUrl?: string;
}

export const defaultContactInfo: ContactInfoData = {
	heroTitle: "Get in Touch with Us",
	heroDescription:
		"Have questions about our residential plots in Silicon City? Want to schedule a physical site visit or discuss membership guidelines? Reach out to our corporate help desk. We are here to help you secure your dream address.",
	address:
		"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207, Bangladesh",
	phone: "+880 12 345 678, +880 1234 567 890",
	whatsapp: "+880 12 345 678",
	email: "info@siliconrealestatepvtltd.com",
	secondaryEmail: "siliconrealestate@gmail.com",
	website: "siliconrealestatepvtltd.com",
	businessHours: "Saturday - Thursday: 9:00 AM – 5:00 PM | Friday: Closed",
	mapEmbedUrl:
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8973685412356!2d90.3621!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4f483c6d7d%3A0x6b4f74d6c6e18f2f!2sIqbal%20Rd%2C%20Dhaka%201207!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
	siteVisitNotice:
		'"Silicon City" is strategically located in Bara Badeshi Mouza, Savar, right next to the Turag River and adjacent to Mohammadpur Beribadh. We arrange physical site guided tours for our clients directly from our Corporate Office in Mohammadpur.',
	facebookUrl: "https://facebook.com",
	youtubeUrl: "https://youtube.com",
};

export function useContactInfo() {
	const [contactInfo, setContactInfo] = useState<ContactInfoData>(defaultContactInfo);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContactInfo = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{ success: boolean; contactInfo?: ContactInfoData }>(
				"/contact-info",
			);
			if (res && res.success && res.contactInfo) {
				setContactInfo({
					...defaultContactInfo,
					...res.contactInfo,
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

	const updateContactInfo = useCallback(async (data: Partial<ContactInfoData>) => {
		try {
			const res = await apiFetch<{ success: boolean; contactInfo?: ContactInfoData }>(
				"/contact-info",
				{
					method: "PUT",
					body: JSON.stringify(data),
				},
			);
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
	}, []);

	return {
		contactInfo,
		loading,
		error,
		refetch: fetchContactInfo,
		updateContactInfo,
	};
}
