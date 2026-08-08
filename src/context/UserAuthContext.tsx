"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { UserSession, UserAuthContextType } from "@/types/auth";
import { apiFetch } from "@/lib/api-client";

const USER_SESSION_KEY = "silicon_user_session";

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserSession | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const logoutLocalOnly = () => {
		if (typeof window !== "undefined") {
			try {
				sessionStorage.removeItem(USER_SESSION_KEY);
				localStorage.removeItem("silicon_jwt_token");
				localStorage.removeItem("silicon_admin_session");
			} catch (error) {
				console.error("Failed to purge local storage during logout:", error);
			}
		}
		setUser(null);
	};

	// Synchronizer that reads session data safely on client mount/initialization
	const checkAuthStatus = async () => {
		setIsLoading(true);

		// First, try to fetch the current session from the backend
		try {
			const response = await apiFetch<{
				success: boolean;
				user: {
					id: string;
					name: string;
					email: string;
					role: string;
					phoneNumber?: string;
					avatar?: string;
				};
			}>("/auth/me");

			if (response.success && response.user) {
				const sessionUser: UserSession = {
					uid: response.user.id,
					name: response.user.name,
					email: response.user.email,
					role: response.user.role as any,
					phoneNumber: response.user.phoneNumber,
					avatar: response.user.avatar,
				};
				setUser(sessionUser);
				if (typeof window !== "undefined") {
					sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionUser));
				}
				setIsLoading(false);
				return;
			}
		} catch (error: any) {
			// If it is a network error (status === 0), the server might be warming up.
			// Do not immediately clear the local cache to avoid jarring UX.
			if (error.status === 0) {
				console.warn(
					"Backend server is currently unreachable. Falling back to local cache.",
				);
			} else {
				// For 401, 403, or other explicit API errors, clear the session.
				console.log("Session verification failed. Clearing local auth state.");
				logoutLocalOnly();
				setIsLoading(false);
				return;
			}
		}

		// Fallback to local storage/session storage if backend is unreachable or during hydration
		if (typeof window !== "undefined") {
			try {
				const raw = sessionStorage.getItem(USER_SESSION_KEY);
				if (raw) {
					setUser(JSON.parse(raw));
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error(
					"Failed to sync authentication status from storage:",
					error,
				);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	};

	// Run on client mount to sync state and prevent SSR/hydration mismatch
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const login = (userData: UserSession, token?: string) => {
		if (typeof window !== "undefined") {
			try {
				sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
				if (token) {
					localStorage.setItem("silicon_jwt_token", token);
				}
			} catch (error) {
				console.error("Failed to write session storage during login:", error);
			}
		}
		setUser(userData);
	};

	const logout = async () => {
		logoutLocalOnly();
		try {
			// Best-effort logout call to backend to clear cookie
			await apiFetch("/auth/logout", { method: "POST" });
		} catch (error) {
			console.error("Failed to notify backend of logout:", error);
		}
	};

	return (
		<UserAuthContext.Provider
			value={{
				user,
				isLoggedIn: !!user,
				isLoading,
				login,
				logout,
				checkAuthStatus,
			}}
		>
			{children}
		</UserAuthContext.Provider>
	);
}

export function useUserAuth() {
	const ctx = useContext(UserAuthContext);
	if (!ctx) {
		throw new Error("useUserAuth must be used inside UserAuthProvider");
	}
	return ctx;
}
