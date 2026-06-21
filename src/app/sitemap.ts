import { MetadataRoute } from "next";
import { initialState } from "@/context/CMSContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://estatehub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/properties",
    "/blog",
    "/contact",
    "/careers",
    "/calculator",
  ];

  const staticRoutes = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Dynamic property routes
  const propertyRoutes = initialState.properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = initialState.blog.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
