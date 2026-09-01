import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check for admin session cookie
	const token =
		request.cookies.get("silicon_jwt")?.value ||
		request.cookies.get("silicon_jwt_token")?.value ||
		request.cookies.get("token")?.value;

	// Protect all /admin routes except /admin/login
	if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
		if (!token) {
			const loginUrl = new URL("/admin/login", request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	// If already authenticated and trying to visit /admin/login, redirect to /admin
	if (pathname === "/admin/login") {
		if (token) {
			const adminUrl = new URL("/admin", request.url);
			return NextResponse.redirect(adminUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
