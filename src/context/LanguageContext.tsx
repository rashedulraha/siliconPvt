"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";

export type Language = "bn" | "en";

interface LanguageContextType {
	language: Language;
	isBn: boolean;
	setLanguage: (lang: Language) => void;
	toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

const STORAGE_KEY = "silicon_preferred_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>("bn");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
			if (saved === "en" || saved === "bn") {
				setLanguageState(saved);
			} else {
				// Default is Bangla (bn)
				setLanguageState("bn");
				localStorage.setItem(STORAGE_KEY, "bn");
			}
		} catch {
			setLanguageState("bn");
		}
		setMounted(true);
	}, []);

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.lang = language;
			document.documentElement.setAttribute("data-lang", language);
		}
	}, [language]);

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang);
		try {
			localStorage.setItem(STORAGE_KEY, lang);
		} catch (e) {
			console.error("Failed to save language preference:", e);
		}
	}, []);

	const toggleLanguage = useCallback(() => {
		setLanguageState((prev) => {
			const next = prev === "bn" ? "en" : "bn";
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch (e) {
				console.error("Failed to save language preference:", e);
			}
			return next;
		});
	}, []);

	const isBn = language === "bn";

	return (
		<LanguageContext.Provider
			value={{
				language,
				isBn,
				setLanguage,
				toggleLanguage,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		// Provide a fallback so components rendering outside provider won't crash
		return {
			language: "bn" as Language,
			isBn: true,
			setLanguage: () => {},
			toggleLanguage: () => {},
		};
	}
	return context;
}
