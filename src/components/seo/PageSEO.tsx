"use client";

import { useEffect } from "react";

interface PageSEOProps {
	title: string;
	description: string;
	keywords?: string[];
	ogImage?: string;
}

/**
 * Client-side SEO component. Updates document.title and meta tags.
 * For full SSR SEO, consider moving CMS to server-side in production.
 */
export function PageSEO({
	title,
	description,
	keywords,
	ogImage,
}: PageSEOProps) {
	useEffect(() => {
		const originalTitle = document.title;
		document.title = title;

		const setMeta = (name: string, content: string, property = false) => {
			const attr = property ? "property" : "name";
			let el = document.querySelector(
				`meta[${attr}="${name}"]`,
			) as HTMLMetaElement | null;
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(attr, name);
				document.head.appendChild(el);
			}
			el.content = content;
		};

		setMeta("description", description);
		if (keywords?.length) setMeta("keywords", keywords.join(", "));
		setMeta("og:title", title, true);
		setMeta("og:description", description, true);
		if (ogImage) setMeta("og:image", ogImage, true);
		setMeta("twitter:card", "summary_large_image");
		setMeta("twitter:title", title);
		setMeta("twitter:description", description);
		if (ogImage) setMeta("twitter:image", ogImage);

		return () => {
			document.title = originalTitle;
		};
	}, [title, description, keywords, ogImage]);

	return null;
}
