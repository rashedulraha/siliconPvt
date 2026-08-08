/**
 * useAppData — src/hooks/useAppData.ts
 *
 * A typed data-fetching hook that implements the following state machine:
 *
 *   IDLE ──► LOADING ──► SUCCESS (data set)
 *                    └──► API_ERROR ──► FALLBACK_LOADING ──► FALLBACK_SUCCESS
 *                                                        └──► FALLBACK_ERROR
 *   ENV_ABSENT ──► ERROR (no fallback attempted)
 *
 * When NEXT_PUBLIC_API_URL is absent the hook returns an error state immediately
 * without attempting any fetch at all.
 *
 * When the env var is defined and the primary API call fails, the hook falls back
 * to fetch("/data/{key}.json") — the static JSON files in /public/data/.
 *
 * This hook uses React state and useEffect and can only run inside Client Components.
 * It does NOT carry a "use client" directive — that belongs on the consuming component.
 */

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AppDataKey = "site_settings" | "hero" | "projects";

export interface AppDataResult<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
}

// ---------------------------------------------------------------------------
// State machine states (internal)
// ---------------------------------------------------------------------------

type State<T> =
	| { phase: "IDLE" }
	| { phase: "LOADING" }
	| { phase: "SUCCESS"; data: T }
	| { phase: "API_ERROR" }
	| { phase: "FALLBACK_LOADING" }
	| { phase: "FALLBACK_SUCCESS"; data: T }
	| { phase: "FALLBACK_ERROR"; message: string }
	| { phase: "ENV_ABSENT" };

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Fetches typed data for the given key via the API client, with automatic
 * JSON fallback when the API is unavailable.
 *
 * @param key - One of "site_settings" | "hero" | "projects"
 * @returns { data: T | null, isLoading: boolean, error: string | null }
 */
export function useAppData<T>(key: AppDataKey): AppDataResult<T> {
	const [state, setState] = useState<State<T>>({ phase: "IDLE" });

	useEffect(() => {
		let cancelled = false;

		async function run() {
			// Literal property access so Next.js can inline the value at build time.
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;

			// ENV_ABSENT path — return error immediately, no fetch attempted.
			if (!apiUrl) {
				if (!cancelled) {
					setState({
						phase: "ENV_ABSENT",
					});
				}
				return;
			}

			// LOADING — attempt primary API fetch.
			if (!cancelled) setState({ phase: "LOADING" });

			try {
				const data = await apiFetch<T>(`/${key}`);
				if (!cancelled) setState({ phase: "SUCCESS", data });
			} catch {
				// API_ERROR — primary fetch failed; attempt JSON fallback.
				if (!cancelled) setState({ phase: "API_ERROR" });

				if (!cancelled) setState({ phase: "FALLBACK_LOADING" });

				try {
					const res = await fetch(`/data/${key}.json`);
					if (!res.ok) {
						throw new Error(`HTTP ${res.status}`);
					}
					const fallbackData = (await res.json()) as T;
					if (!cancelled)
						setState({ phase: "FALLBACK_SUCCESS", data: fallbackData });
				} catch {
					if (!cancelled) {
						setState({
							phase: "FALLBACK_ERROR",
							message: `Failed to load ${key} data`,
						});
					}
				}
			}
		}

		run();

		return () => {
			cancelled = true;
		};
	}, [key]);

	// ---------------------------------------------------------------------------
	// Map internal state → public AppDataResult
	// ---------------------------------------------------------------------------

	switch (state.phase) {
		case "IDLE":
			return { data: null, isLoading: false, error: null };

		case "LOADING":
		case "FALLBACK_LOADING":
			return { data: null, isLoading: true, error: null };

		case "SUCCESS":
			return { data: state.data, isLoading: false, error: null };

		case "FALLBACK_SUCCESS":
			return { data: state.data, isLoading: false, error: null };

		case "API_ERROR":
			// Transient — treated as still loading while fallback is about to start.
			return { data: null, isLoading: true, error: null };

		case "ENV_ABSENT":
			return {
				data: null,
				isLoading: false,
				error: `NEXT_PUBLIC_API_URL is not defined — cannot fetch ${key} data`,
			};

		case "FALLBACK_ERROR":
			return { data: null, isLoading: false, error: state.message };

		default: {
			// Exhaustiveness guard — should never be reached.
			const _exhaustive: never = state;
			return { data: null, isLoading: false, error: null };
		}
	}
}
