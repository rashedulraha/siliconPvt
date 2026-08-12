"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from "react";
import { apiFetch } from "@/lib/api-client";
import { STORAGE_KEYS } from "@/utils/constants";
import { storage } from "@/utils/storage";
import { initialState } from "./cms-state";
import type { CMSAction, CMSState } from "@/types";
export { initialState } from "./cms-state";
interface CMSContextType {
	state: CMSState;
	dispatch: React.Dispatch<CMSAction>;
	resetAll: () => void;
	refetchProperties: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function cmsReducer(state: CMSState, action: CMSAction): CMSState {
	switch (action.type) {
		case "SET_STATE":
			return action.payload;
		case "RESET_STATE":
			return initialState;
		case "UPDATE_SITE_SETTINGS":
			return {
				...state,
				siteSettings: {
					...state.siteSettings,
					...action.payload,
				},
			};
		case "ADD_MENU_ITEM":
			return {
				...state,
				menu: [...state.menu, action.payload],
			};
		case "UPDATE_MENU_ITEM":
			return {
				...state,
				menu: state.menu.map((item) =>
					item.id === action.payload.id ? action.payload : item,
				),
			};
		case "DELETE_MENU_ITEM":
			return {
				...state,
				menu: state.menu.filter((item) => item.id !== action.payload),
			};
		case "REORDER_MENU":
			return {
				...state,
				menu: action.payload,
			};
		case "ADD_PROPERTY":
			return {
				...state,
				properties: [...state.properties, action.payload],
			};
		case "UPDATE_PROPERTY":
			return {
				...state,
				properties: state.properties.map((property) =>
					property.id === action.payload.id ? action.payload : property,
				),
			};
		case "DELETE_PROPERTY":
			return {
				...state,
				properties: state.properties.filter(
					(property) => property.id !== action.payload,
				),
			};
		case "ADD_TEAM_MEMBER":
			return {
				...state,
				team: [...state.team, action.payload],
			};
		case "UPDATE_TEAM_MEMBER":
			return {
				...state,
				team: state.team.map((member) =>
					member.id === action.payload.id ? action.payload : member,
				),
			};
		case "DELETE_TEAM_MEMBER":
			return {
				...state,
				team: state.team.filter((member) => member.id !== action.payload),
			};
		case "ADD_BLOG_POST":
			return {
				...state,
				blog: [...state.blog, action.payload],
			};
		case "UPDATE_BLOG_POST":
			return {
				...state,
				blog: state.blog.map((post) =>
					post.id === action.payload.id ? action.payload : post,
				),
			};
		case "DELETE_BLOG_POST":
			return {
				...state,
				blog: state.blog.filter((post) => post.id !== action.payload),
			};
		case "ADD_LEAD":
			return {
				...state,
				leads: [...state.leads, action.payload],
			};
		case "UPDATE_LEAD":
			return {
				...state,
				leads: state.leads.map((lead) =>
					lead.id === action.payload.id ? { ...lead, ...action.payload } : lead,
				),
			};
		case "DELETE_LEAD":
			return {
				...state,
				leads: state.leads.filter((lead) => lead.id !== action.payload),
			};
		case "ADD_MEDIA":
			return {
				...state,
				media: [...state.media, action.payload],
			};
		case "DELETE_MEDIA":
			return {
				...state,
				media: state.media.filter((item) => item.id !== action.payload),
			};
		case "UPDATE_THEME":
			return {
				...state,
				theme: {
					...state.theme,
					...action.payload,
				},
			};
		case "UPDATE_SEO":
			return {
				...state,
				seo: {
					...state.seo,
					[action.payload.page]: {
						...state.seo[action.payload.page],
						...action.payload.data,
					},
				},
			};
		case "UPDATE_PAGE":
			return {
				...state,
				pages: state.pages.map((page) =>
					page.id === action.payload.id ? action.payload : page,
				),
			};
		case "ADD_TESTIMONIAL":
			return {
				...state,
				testimonials: [...state.testimonials, action.payload],
			};
		case "UPDATE_TESTIMONIAL":
			return {
				...state,
				testimonials: state.testimonials.map((testimonial) =>
					testimonial.id === action.payload.id ? action.payload : testimonial,
				),
			};
		case "DELETE_TESTIMONIAL":
			return {
				...state,
				testimonials: state.testimonials.filter(
					(testimonial) => testimonial.id !== action.payload,
				),
			};
		case "ADD_JOB":
			return {
				...state,
				jobs: [...state.jobs, action.payload],
			};
		case "UPDATE_JOB":
			return {
				...state,
				jobs: state.jobs.map((job) =>
					job.id === action.payload.id ? action.payload : job,
				),
			};
		case "DELETE_JOB":
			return {
				...state,
				jobs: state.jobs.filter((job) => job.id !== action.payload),
			};
		default:
			return state;
	}
}

export function CMSProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cmsReducer, initialState);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const storedState = storage.get<CMSState>(
			STORAGE_KEYS.CMS_DATA,
			initialState,
		);
		dispatch({ type: "SET_STATE", payload: storedState });
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		storage.set(STORAGE_KEYS.CMS_DATA, state);
	}, [hydrated, state]);

	const resetAll = useCallback(() => {
		storage.remove(STORAGE_KEYS.CMS_DATA);
		dispatch({ type: "RESET_STATE" });
	}, []);

	const refetchProperties = useCallback(async () => {
		try {
			const response = await apiFetch<unknown>("/properties");
			const properties = Array.isArray((response as any).properties)
				? (response as any).properties
				: Array.isArray(response)
					? (response as any)
					: undefined;

			if (properties) {
				dispatch({ type: "SET_STATE", payload: { ...state, properties } });
			}
		} catch (error) {
			console.error("[CMSContext] Failed to fetch properties:", error);
		}
	}, [state]);

	const value = useMemo(
		() => ({ state, dispatch, resetAll, refetchProperties }),
		[state, dispatch, resetAll, refetchProperties],
	);

	return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS() {
	const context = useContext(CMSContext);
	if (!context) {
		throw new Error("useCMS must be used inside CMSProvider");
	}
	return context;
}
