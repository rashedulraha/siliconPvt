import { STORAGE_KEYS } from "./constants";

/**
 * Safe localStorage wrapper with error handling and quota management.
 */
export const storage = {
	get<T>(key: string, fallback: T): T {
		if (typeof window === "undefined") return fallback;
		try {
			const raw = window.localStorage.getItem(key);
			if (raw === null) return fallback;
			return JSON.parse(raw) as T;
		} catch (error) {
			console.error(`[storage] Failed to read key "${key}":`, error);
			return fallback;
		}
	},

	set<T>(key: string, value: T): boolean {
		if (typeof window === "undefined") return false;
		try {
			const serialized = JSON.stringify(value);
			window.localStorage.setItem(key, serialized);
			return true;
		} catch (error) {
			// Quota exceeded or serialization error
			console.error(`[storage] Failed to write key "${key}":`, error);
			if (
				error instanceof DOMException &&
				error.name === "QuotaExceededError"
			) {
				alert(
					"⚠️ Storage quota exceeded. Please delete some media items or export and reset your data.",
				);
			}
			return false;
		}
	},

	remove(key: string): void {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.error(`[storage] Failed to remove key "${key}":`, error);
		}
	},

	clear(): void {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.clear();
		} catch (error) {
			console.error("[storage] Failed to clear storage:", error);
		}
	},

	/**
	 * Estimate the size of stored data in bytes.
	 */
	estimateSize(key: string): number {
		if (typeof window === "undefined") return 0;
		try {
			const raw = window.localStorage.getItem(key);
			return raw ? new Blob([raw]).size : 0;
		} catch {
			return 0;
		}
	},

	/**
	 * Check if adding data would exceed a safe threshold (default 4MB).
	 */
	wouldExceedQuota(data: unknown, safeLimitBytes = 4 * 1024 * 1024): boolean {
		try {
			const serialized = JSON.stringify(data);
			const newSize = new Blob([serialized]).size;
			const currentSize = this.estimateSize(STORAGE_KEYS.CMS_DATA);
			return currentSize + newSize > safeLimitBytes;
		} catch {
			return false;
		}
	},
};

/**
 * Trigger a browser file download.
 */
export function downloadJSON(data: unknown, filename: string): void {
	if (typeof window === "undefined") return;
	try {
		const json = JSON.stringify(data, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("[storage] Failed to download JSON:", error);
	}
}

/**
 * Read a File as a base64 data URL (for image uploads).
 */
export function fileToDataURL(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
