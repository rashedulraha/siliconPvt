"use client";

import React, { createContext, useContext, useMemo } from "react";

interface AdminEditorContextType {
	isEditorMode: boolean;
	isEditorUnlocked: boolean;
	isModalOpen: boolean;
	justUnlocked: boolean;
	openUnlockModal: () => void;
	closeUnlockModal: () => void;
	validateAndUnlock: (password: string) => boolean;
	unlockEditorMode: () => void;
	lockEditorMode: () => void;
}

const AdminEditorContext = createContext<AdminEditorContextType>({
	isEditorMode: true,
	isEditorUnlocked: true,
	isModalOpen: false,
	justUnlocked: false,
	openUnlockModal: () => {},
	closeUnlockModal: () => {},
	validateAndUnlock: () => true,
	unlockEditorMode: () => {},
	lockEditorMode: () => {},
});

export function AdminEditorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const value = useMemo(
		() => ({
			isEditorMode: true,
			isEditorUnlocked: true,
			isModalOpen: false,
			justUnlocked: false,
			openUnlockModal: () => {},
			closeUnlockModal: () => {},
			validateAndUnlock: () => true,
			unlockEditorMode: () => {},
			lockEditorMode: () => {},
		}),
		[],
	);

	return (
		<AdminEditorContext.Provider value={value}>
			{children}
		</AdminEditorContext.Provider>
	);
}

/**
 * useEditorMode — Custom hook to access global Editor Mode state and actions.
 */
export function useEditorMode() {
	return useContext(AdminEditorContext);
}

/**
 * useAdminEditor — Backward-compatible custom hook alias.
 */
export function useAdminEditor() {
	return useContext(AdminEditorContext);
}
