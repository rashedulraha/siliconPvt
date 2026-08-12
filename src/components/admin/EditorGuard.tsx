"use client";

import React from "react";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export interface EditorGuardProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	mode?: "hide" | "disable";
	showLockTooltip?: boolean;
	className?: string;
}

/**
 * EditorGuard — Reusable wrapper component for admin dashboard.
 *
 * Automatically guards edit buttons, delete actions, upload inputs, and form controls.
 * When in View-Only mode:
 *   - mode="hide" (default): Renders fallback if provided, or hides content.
 *   - mode="disable": Renders content in a disabled/read-only container with an optional Lock tooltip.
 * When in Editor Mode:
 *   - Seamlessly reveals controls with a subtle glow transition.
 */
export function EditorGuard({
	children,
	fallback = null,
	mode = "hide",
	showLockTooltip = true,
	className = "",
}: EditorGuardProps) {
	const { isEditorMode, openUnlockModal, justUnlocked } = useAdminEditor();

	if (isEditorMode) {
		return (
			<motion.div
				initial={justUnlocked ? { opacity: 0.7, scale: 0.98 } : false}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className={`inline-flex items-center ${
					justUnlocked ? "ring-2 ring-emerald-500/40 rounded-xl transition-all duration-700" : ""
				} ${className}`}
			>
				{children}
			</motion.div>
		);
	}

	// Read-Only state: Custom fallback provided
	if (fallback) {
		return <>{fallback}</>;
	}

	// Read-Only state: Disable mode
	if (mode === "disable") {
		const disabledContent = (
			<div
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					openUnlockModal();
				}}
				className={`inline-flex items-center gap-1.5 opacity-50 cursor-pointer pointer-events-auto select-none ${className}`}
				role="button"
				tabIndex={0}
				aria-disabled="true"
			>
				<Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
				{children}
			</div>
		);

		if (showLockTooltip) {
			return (
				<Tooltip>
					<TooltipTrigger asChild>{disabledContent}</TooltipTrigger>
					<TooltipContent className="text-xs bg-popover border border-border">
						Unlock Editor Mode to perform this action
					</TooltipContent>
				</Tooltip>
			);
		}

		return disabledContent;
	}

	// Default: Hide content
	return null;
}

/**
 * EditorOnly — Alias component for simple conditional rendering of edit-only UI elements.
 */
export const EditorOnly = EditorGuard;
