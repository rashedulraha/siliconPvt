import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://siliconrealestatepvtltd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages = [
		"",
		"/about",
		"/projects",
		"/services",
		"/contact",
		"/privacy-terms",
	];

	const staticRoutes: MetadataRoute.Sitemap = staticPages.map((path) => ({
		url: `${SITE_URL}${path}`,
		lastModified: new Date(),
		changeFrequency: path === "" ? "daily" : ("weekly" as const),
		priority: path === "" ? 1.0 : 0.8,
	}));

	let propertyRoutes: MetadataRoute.Sitemap = [];
	let blogRoutes: MetadataRoute.Sitemap = [];

	try {
		const properties = await prisma.property.findMany({
			select: { slug: true, updatedAt: true },
		});
		propertyRoutes = properties.map((property) => ({
			url: `${SITE_URL}/projects/${property.slug}`,
			lastModified: property.updatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		}));

		const blogPosts = await prisma.blogPost.findMany({
			select: { slug: true, updatedAt: true },
		});
		blogRoutes = blogPosts.map((post) => ({
			url: `${SITE_URL}/about#blog-${post.slug}`,
			lastModified: post.updatedAt,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		}));
	} catch (error) {
		console.warn("[Sitemap] Could not fetch dynamic items from DB:", error);
	}

	return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
