export type UserRole = "user" | "admin";

export interface UserSession {
	uid: string;
	name: string;
	email: string;
	phoneNumber?: string;
	role: UserRole;
	avatar?: string;
}

export interface AuthState {
	user: UserSession | null;
	isLoggedIn: boolean;
	isLoading: boolean;
}

export interface UserAuthContextType {
	user: UserSession | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (userData: UserSession, token?: string) => void;
	logout: () => Promise<void> | void;
	checkAuthStatus: () => Promise<void> | void;
}
