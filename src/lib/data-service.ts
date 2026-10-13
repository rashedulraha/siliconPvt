/**
 * Data Service — src/lib/data-service.ts
 *
 * Handles fetching properties and projects directly from database API endpoints.
 * No mock data or hardcoded files.
 */

import { apiFetch } from "./api-client";
import type { Property, Project } from "@/types";

/**
 * Asynchronously fetches all properties from the backend API.
 */
export async function fetchProperties(): Promise<Property[]> {
	try {
		const res = await apiFetch<any>("/properties");
		if (Array.isArray(res)) return res;
		if (res && Array.isArray(res.properties)) return res.properties;
		return [];
	} catch (error) {
		console.error("[DataService] Error fetching properties from API:", error);
		return [];
	}
}

/**
 * Asynchronously fetches all projects from the backend API.
 */
export async function fetchProjects(): Promise<Project[]> {
	try {
		const res = await apiFetch<any>("/projects");
		if (Array.isArray(res)) return res;
		if (res && Array.isArray(res.projects)) return res.projects;
		return [];
	} catch (error) {
		console.error("[DataService] Error fetching projects from API:", error);
		return [];
	}
}
