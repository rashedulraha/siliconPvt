"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Eye,
	EyeOff,
	Loader2,
	ArrowRight,
	Mail,
	Lock,
	CheckCircle2,
	AlertCircle,
	ShieldCheck,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { apiFetch } from "@/lib/api-client";
import { getAdminSession, setAdminSession } from "@/lib/admin-auth";

function getAdminEmail(): string {
	return (
		process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "info@siliconrealestatepvtltd.com"
	);
}

function getAdminPassword(): string {
	return process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "SiliconReal2026!";
}

export default function LoginPage() {
	const { login, isLoggedIn, currentUser, isLoading } = useUserAuth() as any;
	const router = useRouter();

	// Redirect to /admin if already logged in on mount
	useEffect(() => {
		const session = getAdminSession();
		if (session) {
			router.replace("/admin");
		}
	}, [router]);

	const [email, setEmail] = useState("admin@afiaholdingsltd.com");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const validateForm = () => {
		const newErrors: { email?: string; password?: string } = {};
		if (!email) {
			newErrors.email = "Email address is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Please enter a valid email address";
		}
		if (!password) {
			newErrors.password = "Password is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			const expectedEmail = getAdminEmail();
			const expectedPassword = getAdminPassword();

			let authSuccess = false;
			let sessionToken = "silicon-admin-token-2026";
			let userData = {
				uid: "admin-1",
				name: "Silicon Admin",
				email: email.trim(),
				role: "admin" as const,
			};

			try {
				const response = await apiFetch<{
					success: boolean;
					message?: string;
					user?: {
						id: string;
						name: string;
						email: string;
						role: string;
					};
					token?: string;
				}>("/auth/login", {
					method: "POST",
					body: JSON.stringify({ email: email.trim(), password }),
				});

				if (response.success && response.user) {
					authSuccess = true;
					if (response.token) sessionToken = response.token;
					userData = {
						uid: response.user.id,
						name: response.user.name,
						email: response.user.email,
						role: "admin",
					};
				}
			} catch (apiErr) {
				if (email.trim() === expectedEmail && password === expectedPassword) {
					authSuccess = true;
				}
			}

			if (
				!authSuccess &&
				email.trim() === expectedEmail &&
				password === expectedPassword
			) {
				authSuccess = true;
			}

			if (authSuccess) {
				setAdminSession({
					email: email.trim(),
					loggedInAt: new Date().toISOString(),
				});
				login(userData, sessionToken);
				setIsSuccess(true);
			} else {
				setError("Invalid email address or password. Please try again.");
			}
		} catch (err: any) {
			setError(
				err.message || "Failed to authenticate. Please check your credentials.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				router.replace("/admin");
			}, 800);
			return () => clearTimeout(timer);
		}
	}, [isSuccess, router]);

	if (isSuccess) {
		return (
			<div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 bg-card border border-border/60 rounded-3xl p-6 shadow-md">
				<div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xs">
					<CheckCircle2 className="w-7 h-7" />
				</div>
				<div className="space-y-1">
					<h2 className="text-xl font-medium font-heading text-foreground">
						Admin Access Granted
					</h2>
					<p className="text-xs text-muted-foreground font-light">
						Redirecting you to the management dashboard...
					</p>
				</div>
				<div className="pt-1 flex items-center gap-2 text-xs font-mono text-primary">
					<Loader2 className="w-4 h-4 animate-spin" />
					<span>Opening Admin Dashboard</span>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header Badge & Title */}
			<div className="space-y-1.5 text-left">
				<span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
					<ShieldCheck className="w-3.5 h-3.5" />
					ADMIN PORTAL SIGN IN
				</span>
				<h2 className="text-2xl sm:text-3xl font-medium font-heading text-foreground tracking-tight">
					Admin Sign In
				</h2>
				<p className="text-xs text-muted-foreground font-light">
					Sign in with your admin credentials to access the management portal.
				</p>
			</div>

			{/* Error Alert */}
			{error && (
				<div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-light flex items-start gap-2">
					<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
					<span>{error}</span>
				</div>
			)}

			{/* Login Form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Email Address */}
				<div className="space-y-1 text-left">
					<label className="text-xs font-medium font-heading text-foreground block">
						Email Address
					</label>
					<div className="relative">
						<Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="admin@afiaholdingsltd.com"
							className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
						/>
					</div>
					{errors.email && (
						<p className="text-[11px] text-destructive">{errors.email}</p>
					)}
				</div>

				{/* Password */}
				<div className="space-y-1 text-left">
					<label className="text-xs font-medium font-heading text-foreground block">
						Password
					</label>
					<div className="relative">
						<Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••••••••••"
							className="w-full h-11 pl-10 pr-10 rounded-xl bg-card border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showPassword ? (
								<EyeOff className="w-4 h-4" />
							) : (
								<Eye className="w-4 h-4" />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="text-[11px] text-destructive">{errors.password}</p>
					)}
				</div>

				{/* Remember Me */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="remember"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
						className="w-3.5 h-3.5 rounded-md border-border text-primary focus:ring-primary/20"
					/>
					<label
						htmlFor="remember"
						className="text-xs text-muted-foreground font-light select-none"
					>
						Keep me signed in on this device
					</label>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isSubmitting}
					className="group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all border border-white/10 shadow-xs gap-2 disabled:opacity-50 cursor-pointer"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							<span>Authenticating...</span>
						</>
					) : (
						<>
							SIGN IN TO ADMIN PORTAL
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</>
					)}
				</button>
			</form>
		</div>
	);
}
