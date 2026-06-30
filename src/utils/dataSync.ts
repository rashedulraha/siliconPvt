import { Property } from "@/types";
import { seedProperties } from "./seed";

/**
 * Maps the backend's nested API property structure (IProperty)
 * back to the client's flat Property structure.
 */
export function mapApiPropertyToProperty(apiProp: any): Property {
  if (!apiProp) return {} as Property;

  // Extract nested features and location if present, otherwise fall back to top-level fields
  const featuresObj = apiProp.features || {};
  const locationObj = apiProp.location || {};

  // Reconstruct a features list of strings for the client UI
  const featuresList: string[] = [];
  if (featuresObj.hasPool || apiProp.hasPool) featuresList.push("Swimming Pool");
  if (featuresObj.hasGarden || apiProp.hasGarden) featuresList.push("Garden / Terrace");
  const parking = featuresObj.parkingSpaces ?? apiProp.parkingSpaces;
  if (parking && parking > 0) {
    featuresList.push(`${parking} Parking Space${parking > 1 ? "s" : ""}`);
  }

  // Determine property type (sale / rent)
  const statusVal = apiProp.status || "available";
  const type = statusVal === "rented" ? "rent" : "sale";

  // Infer category from slug or title
  let category: Property["category"] = "apartment";
  const slug = (apiProp.slug || "").toLowerCase();
  const title = (apiProp.title || "").toLowerCase();
  
  if (slug.includes("plot") || slug.includes("land") || slug.includes("valley") || title.includes("plot") || title.includes("land")) {
    category = "land";
  } else if (slug.includes("commercial") || slug.includes("office") || slug.includes("shop") || title.includes("commercial")) {
    category = "commercial";
  } else if (slug.includes("penthouse") || slug.includes("villa") || slug.includes("duplex") || title.includes("penthouse") || title.includes("villa")) {
    category = "villa";
  }

  return {
    id: apiProp.id || String(Math.random()),
    title: apiProp.title || "",
    slug: apiProp.slug || "",
    description: apiProp.description || "",
    price: typeof apiProp.price === "number" ? apiProp.price : Number(apiProp.price || 0),
    location: locationObj.city || apiProp.city || "Dhaka",
    address: locationObj.address || apiProp.address || "",
    bedrooms: featuresObj.bedrooms ?? apiProp.bedrooms ?? 0,
    bathrooms: featuresObj.bathrooms ?? apiProp.bathrooms ?? 0,
    area: featuresObj.areaSqFt ?? apiProp.areaSqFt ?? apiProp.area ?? 0,
    garage: featuresObj.parkingSpaces ?? apiProp.parkingSpaces ?? apiProp.garage ?? 0,
    type: type as "sale" | "rent",
    category: category,
    images: Array.isArray(apiProp.images) ? apiProp.images : [],
    features: featuresList.length > 0 ? featuresList : ["Modern Fittings", "Secured boundary"],
    agentId: apiProp.agentId || "agent-1",
    status: statusVal,
    yearBuilt: featuresObj.yearBuilt ?? apiProp.yearBuilt,
    createdAt: apiProp.createdAt || new Date().toISOString(),
    updatedAt: apiProp.updatedAt || new Date().toISOString(),
  };
}

/**
 * Centrally manages fetching Dhaka-based real estate properties (Plots and Flats).
 * Seamlessly falls back to local TS seed data if the external API is offline or undefined.
 *
 * @param apiUrl Optional custom endpoint. Defaults to process.env.NEXT_PUBLIC_PROPERTIES_API_URL
 */
export async function fetchProperties(apiUrl?: string): Promise<Property[]> {
  const endpoint = apiUrl || process.env.NEXT_PUBLIC_PROPERTIES_API_URL;

  if (!endpoint) {
    console.log("[DataSync] No properties API URL defined. Using local fallback seed data.");
    return seedProperties;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout limit for Render cold starts

    const response = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR revalidation for Next.js
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    
    // Support both direct array response or wrapped response { success: true, properties: [...] }
    let rawProperties: any[] = [];
    if (Array.isArray(data)) {
      rawProperties = data;
    } else if (data && typeof data === "object" && Array.isArray(data.properties)) {
      rawProperties = data.properties;
    } else if (data && typeof data === "object" && Array.isArray(data.data)) {
      rawProperties = data.data;
    } else {
      throw new Error("API response does not contain a valid array of properties");
    }

    const mappedProperties = rawProperties.map(mapApiPropertyToProperty);
    console.log(`[DataSync] Successfully synced ${mappedProperties.length} properties from API.`);
    return mappedProperties;
  } catch (error: any) {
    console.warn(
      `[DataSync] API inactive/offline (${error?.message || error}). Falling back to local seed data.`
    );
    return seedProperties;
  }
}
