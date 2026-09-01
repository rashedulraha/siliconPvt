/**
 * API Client — src/lib/api-client.ts
 *
 * A typed HTTP utility for the Silicon Real Estate platform.
 * Reads NEXT_PUBLIC_API_URL at call time (not at import time) so this
 * module produces zero side-effects on import.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Shape thrown by apiFetch on every failure path.
 *
 * - status === 0   → network error (fetch rejected before a response arrived)
 * - status === N   → HTTP error (server returned a non-2xx status code N)
 */
export interface ApiError {
	/** 0 for network errors, HTTP status code otherwise */
	status: number;
	/** Human-readable description of the failure */
	message: string;
	/** The path that was requested, for diagnostics / error boundary display */
	path: string;
}

// ---------------------------------------------------------------------------
// Helper — narrow an unknown thrown value to a message string
// ---------------------------------------------------------------------------

function toMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	return "An unexpected error occurred";
}

// ---------------------------------------------------------------------------
// apiFetch<T>
// ---------------------------------------------------------------------------

/**
 * Typed HTTP client.
 *
 * Reads `process.env.NEXT_PUBLIC_API_URL` at **call time** (not at module
 * load time) to avoid import-time side-effects and to pick up the value
 * correctly in both server and client rendering contexts.
 *
 * When the env var is defined, the final URL is `${NEXT_PUBLIC_API_URL}${path}`.
 * When it is absent, `path` is used as-is (relative or absolute).
 *
 * @throws {ApiError} with `status: 0`   on network errors
 * @throws {ApiError} with `status: N`   on non-2xx HTTP responses
 *
 * @example
 * const data = await apiFetch<Project[]>("/projects");
 */
export async function apiFetch<T>(
	path: string,
	options?: RequestInit,
): Promise<T> {
	// Fallback to the production server if NEXT_PUBLIC_API_URL is not configured
	let baseUrl = (
		process.env.NEXT_PUBLIC_API_URL ||
		"https://silicon-pvt-server.onrender.com/api/v1"
	)
		.trim()
		.replace(/\/+$/, "");

	// Normalize baseUrl if missing /api/v1 or /api when path doesn't start with /api
	if (
		!baseUrl.endsWith("/api/v1") &&
		!baseUrl.endsWith("/api") &&
		!path.startsWith("/api")
	) {
		baseUrl = `${baseUrl}/api/v1`;
	}

	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	const url = path.startsWith("http") ? path : `${baseUrl}${cleanPath}`;

	// Prepare headers
	const headers = new Headers(options?.headers);
	if (options?.body && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}

	// Fallback: Attach JWT if present in localStorage (in case cookies are blocked/fail)
	if (typeof window !== "undefined") {
		try {
			const token = localStorage.getItem("silicon_jwt_token");
			if (token && !headers.has("Authorization")) {
				headers.set("Authorization", `Bearer ${token}`);
			}
		} catch (error) {
			console.error("Failed to read token from localStorage:", error);
		}
	}

	const fetchOptions: RequestInit = {
		credentials: "include", // Enable cross-origin HTTP-only cookies
		...options,
		headers,
	};

	let response: Response;

	try {
		response = await fetch(url, fetchOptions);
	} catch (networkErr: unknown) {
		// fetch() itself rejected — no HTTP response was received.
		const error: ApiError = {
			status: 0,
			message: toMessage(networkErr),
			path,
		};
		throw error;
	}

	if (!response.ok) {
		// Server responded with a non-2xx status code.
		let message: string;
		try {
			// Attempt to extract a message from the response body (text or JSON).
			const text = await response.text();
			try {
				const json = JSON.parse(text) as Record<string, unknown>;
				message =
					typeof json["message"] === "string"
						? json["message"]
						: typeof json["error"] === "string"
							? json["error"]
							: text || response.statusText;
			} catch {
				message = text || response.statusText;
			}
		} catch {
			message = response.statusText;
		}

		const error: ApiError = {
			status: response.status,
			message,
			path,
		};
		throw error;
	}

	// 2xx — parse the JSON body.
	const data = (await response.json()) as T;

	// Fallback: If response contains a token, save it to localStorage for cross-origin cookie fallback
	if (
		data &&
		typeof data === "object" &&
		"token" in data &&
		typeof (data as any).token === "string"
	) {
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem("silicon_jwt_token", (data as any).token);
			} catch (error) {
				console.error("Failed to write token to localStorage:", error);
			}
		}
	}

	return data;
}
