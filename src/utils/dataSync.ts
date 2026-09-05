import { Property } from "@/types";
import { apiFetch } from "@/lib/api-client";
import { seedProperties } from "./seed";

/**
 * Maps the backend's property structure to the client's flat Property structure.
 */
export function mapApiPropertyToProperty(apiProp: any): Property {
	if (!apiProp) return {} as Property;

	const featuresList: string[] = Array.isArray(apiProp.features)
		? apiProp.features
		: ["30ft Wide Road", "Ready Registration", "Gas & Electricity"];

	// Detect block from location if not explicitly present
	let block = apiProp.block || "";
	if (!block && apiProp.location) {
		const match = apiProp.location.match(/Block-[A-D]|Main Boulevard/i);
		if (match) block = match[0];
	}
	if (!block) block = "Block-A";

	const katha =
		apiProp.katha ?? (apiProp.bedrooms && apiProp.bedrooms > 0 ? apiProp.bedrooms : 3);

	return {
		id: apiProp.id || String(Math.random()),
		title: apiProp.title || "",
		slug: apiProp.slug || "",
		description: apiProp.description || "",
		price:
			typeof apiProp.price === "number"
				? apiProp.price
				: Number(apiProp.price || 0),
		location: apiProp.location || "Silicon City, Savar, Dhaka",
		address: apiProp.address || apiProp.location || "Silicon City, Savar, Dhaka",
		bedrooms: katha,
		bathrooms: apiProp.bathrooms ?? 0,
		area: apiProp.areaSqFt ?? apiProp.area ?? katha * 720,
		garage: apiProp.garage ?? 0,
		type: (apiProp.type === "rent" ? "rent" : "sale") as "sale" | "rent",
		category: (apiProp.category || "land") as Property["category"],
		images:
			Array.isArray(apiProp.images) && apiProp.images.length > 0
				? apiProp.images
				: [
						"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
					],
		features: featuresList,
		agentId: apiProp.agentId || "agent-1",
		status: apiProp.status || "available",
		yearBuilt: apiProp.yearBuilt,
		block,
		katha,
		roadWidth: apiProp.roadWidth || "30ft Avenue",
		facing: apiProp.facing || "South Facing",
		featured: Boolean(apiProp.featured),
		createdAt: apiProp.createdAt || new Date().toISOString(),
		updatedAt: apiProp.updatedAt || new Date().toISOString(),
	};
}

export async function fetchProperties(apiUrl?: string): Promise<Property[]> {
	try {
		const response = await apiFetch<{
			success: boolean;
			properties?: any[];
		}>("/properties");

		if (response && response.success && Array.isArray(response.properties)) {
			const mapped = response.properties.map(mapApiPropertyToProperty);
			return mapped.length > 0 ? mapped : seedProperties;
		}
		return seedProperties;
	} catch (error: any) {
		console.warn(
			`[DataSync] Backend offline or fallback to local seed data: ${error?.message || error}`,
		);
		return seedProperties;
	}
}
