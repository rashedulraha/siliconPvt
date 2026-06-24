/**
 * Data Service — src/lib/data-service.ts
 *
 * Handles fetching properties and projects asynchronously.
 * Falls back to local public JSON files if the remote API fails or is inactive.
 * Supports both Client and Server component environments.
 */

import { apiFetch } from "./api-client";
import type { Property, Project } from "@/types";

/**
 * Reads local mock data.
 * Detects if running on server-side (Node.js) or client-side (browser)
 * to retrieve the file from filesystem or via network request respectively.
 */
async function getLocalMockData<T>(fileName: string): Promise<T> {
  if (typeof window === "undefined") {
    // Server-side: read directly from filesystem
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "data", fileName);
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileContent) as T;
    } catch (err) {
      console.error(`Error reading mock file ${fileName} on server:`, err);
      throw new Error(`Failed to load mock data: ${fileName}`);
    }
  } else {
    // Client-side: fetch relative path
    try {
      const response = await fetch(`/data/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (err) {
      console.error(`Error fetching mock file ${fileName} on client:`, err);
      throw new Error(`Failed to fetch mock data: ${fileName}`);
    }
  }
}

/**
 * Asynchronously fetches all properties, with automatic fallback to mock properties.json.
 */
export async function fetchProperties(): Promise<Property[]> {
  const hasApi = !!process.env.NEXT_PUBLIC_API_URL;
  if (hasApi) {
    try {
      return await apiFetch<Property[]>("/properties");
    } catch (error) {
      console.warn("API properties fetch failed, falling back to local JSON data:", error);
    }
  }
  return getLocalMockData<Property[]>("properties.json");
}

/**
 * Asynchronously fetches all projects, with automatic fallback to mock projects.json.
 */
export async function fetchProjects(): Promise<Project[]> {
  const hasApi = !!process.env.NEXT_PUBLIC_API_URL;
  if (hasApi) {
    try {
      return await apiFetch<Project[]>("/projects");
    } catch (error) {
      console.warn("API projects fetch failed, falling back to local JSON data:", error);
    }
  }
  return getLocalMockData<Project[]>("projects.json");
}
