"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
	className?: string;
	compact?: boolean;
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
	const { toggleLanguage, isBn } = useLanguage();

	return (
		<button
			type="button"
			onClick={toggleLanguage}
			className={cn(
				"inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground shadow-2xs transition-all duration-200 hover:border-primary/40 select-none cursor-pointer",
				className,
			)}
			title={isBn ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন করুন"}
			aria-label={isBn ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন করুন"}
		>
			<span className="text-xs leading-none">{isBn ? "🇧🇩" : "🇬🇧"}</span>
			<span className={cn("text-xs", isBn ? "font-bengali font-bold" : "font-heading font-semibold")}>
				{isBn ? "বাংলা" : "EN"}
			</span>
		</button>
	);
}
