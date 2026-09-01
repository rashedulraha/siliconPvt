"use client";

import React from "react";

export interface EditorGuardProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	mode?: "hide" | "disable";
	showLockTooltip?: boolean;
	className?: string;
}

/**
 * EditorGuard — Direct wrapper component allowing full access to edit controls.
 */
export function EditorGuard({
	children,
	className = "",
}: EditorGuardProps) {
	return <div className={`inline-flex items-center ${className}`}>{children}</div>;
}

/**
 * EditorOnly — Alias component for direct rendering.
 */
export const EditorOnly = EditorGuard;
