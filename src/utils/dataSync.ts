import { Property } from "@/types";
import propertiesData from "../../public/data/properties.json";

/**
 * Centrally manages fetching Dhaka-based real estate properties (Plots and Flats).
 * Seamlessly falls back to local JSON seed data if the external API is offline or undefined.
 *
 * @param apiUrl Optional custom endpoint. Defaults to process.env.NEXT_PUBLIC_PROPERTIES_API_URL
 */
export async function fetchProperties(apiUrl?: string): Promise<Property[]> {
  const endpoint = apiUrl || process.env.NEXT_PUBLIC_PROPERTIES_API_URL;

  if (!endpoint) {
    console.warn("[DataSync] No properties API URL defined. Using local fallback seed data.");
    return propertiesData as Property[];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout limit

    const response = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR revalidation for Next.js
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      console.log(`[DataSync] Successfully synced ${data.length} properties from API.`);
      return data as Property[];
    } else {
      throw new Error("API response is not a valid array of properties");
    }
  } catch (error: any) {
    console.warn(
      `[DataSync] API inactive/offline (${error?.message || error}). Falling back to local seed data.`
    );
    return propertiesData as Property[];
  }
}
