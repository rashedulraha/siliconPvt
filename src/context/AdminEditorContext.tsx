"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";
import { UnlockEditorModal } from "@/components/admin/UnlockEditorModal";

interface AdminEditorContextType {
	isEditorMode: boolean;
	isEditorUnlocked: boolean; // Alias for isEditorMode
	isModalOpen: boolean;
	justUnlocked: boolean;
	openUnlockModal: () => void;
	closeUnlockModal: () => void;
	validateAndUnlock: (password: string) => boolean;
	unlockEditorMode: () => void;
	lockEditorMode: () => void;
}

const STORAGE_KEY = "estatehub_admin_editor";

const AdminEditorContext = createContext<AdminEditorContextType | undefined>(
	undefined,
);

export function AdminEditorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isEditorMode, setIsEditorMode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored === "true") {
				setIsEditorMode(true);
			}
		} catch {
			// Ignore storage failures.
		}
	}, []);

	const openUnlockModal = useCallback(() => setIsModalOpen(true), []);
	const closeUnlockModal = useCallback(() => setIsModalOpen(false), []);

	const lockEditorMode = useCallback(() => {
		setIsEditorMode(false);
		setJustUnlocked(false);
		try {
			if (typeof window !== "undefined") {
				window.localStorage.setItem(STORAGE_KEY, "false");
			}
		} catch {
			// Ignore storage errors
		}
		toast.info("Editor Mode Locked", {
			description: "Dashboard is now in View-Only / Read-Only mode.",
		});
	}, []);

	const validateAndUnlock = useCallback((password: string): boolean => {
		const validPassword =
			process.env.NEXT_PUBLIC_ADMIN_EDITOR_PASSWORD || "admin123";

		// Accept configured env password, 'admin123', or 'admin'
		if (password === validPassword || password === "admin123" || password === "admin") {
			setIsEditorMode(true);
			setJustUnlocked(true);

			try {
				if (typeof window !== "undefined") {
					window.localStorage.setItem(STORAGE_KEY, "true");
				}
			} catch {
				// Ignore storage errors
			}

			toast.success("Editing Mode Unlocked! ✨", {
				description: "All edit, delete, and upload controls are now accessible.",
			});

			setTimeout(() => {
				setJustUnlocked(false);
			}, 2500);

			return true;
		}

		return false;
	}, []);

	const unlockEditorMode = useCallback(() => {
		if (isEditorMode) return;
		openUnlockModal();
	}, [isEditorMode, openUnlockModal]);

	const value = useMemo(
		() => ({
			isEditorMode,
			isEditorUnlocked: isEditorMode,
			isModalOpen,
			justUnlocked,
			openUnlockModal,
			closeUnlockModal,
			validateAndUnlock,
			unlockEditorMode,
			lockEditorMode,
		}),
		[
			isEditorMode,
			isModalOpen,
			justUnlocked,
			openUnlockModal,
			closeUnlockModal,
			validateAndUnlock,
			unlockEditorMode,
			lockEditorMode,
		],
	);

	return (
		<AdminEditorContext.Provider value={value}>
			{children}
			<UnlockEditorModal
				isOpen={isModalOpen}
				onClose={closeUnlockModal}
				onVerify={validateAndUnlock}
			/>
		</AdminEditorContext.Provider>
	);
}

/**
 * useEditorMode — Custom hook to access global Editor Mode state and actions.
 */
export function useEditorMode() {
	const context = useContext(AdminEditorContext);
	if (!context) {
		throw new Error("useEditorMode must be used inside AdminEditorProvider");
	}
	return context;
}

/**
 * useAdminEditor — Backward-compatible custom hook alias.
 */
export function useAdminEditor() {
	return useEditorMode();
}
