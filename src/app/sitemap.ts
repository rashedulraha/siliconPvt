import { MetadataRoute } from "next";
import { initialState } from "@/context/CMSContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://siliconrealestatepvtltd.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages = [
		"",
		"/about",
		"/projects",
		"/services",
		"/contact",
		"/privacy-terms",
		"/login",
	];

	const staticRoutes = staticPages.map((path) => ({
		url: `${SITE_URL}${path}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: path === "" ? 1.0 : 0.8,
	}));

	// Dynamic project routes
	const projectRoutes = (initialState.properties || []).map((property) => ({
		url: `${SITE_URL}/projects/${property.slug}`,
		lastModified: new Date(property.updatedAt),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...projectRoutes];
}

