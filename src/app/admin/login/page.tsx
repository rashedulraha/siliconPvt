"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
	ArrowLeft,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { apiFetch } from "@/lib/api-client";
import {
	getAdminSession,
	setAdminSession,
	getAdminEmail,
	getAdminPassword,
} from "@/lib/admin-auth";

export default function AdminLoginPage() {
	const { login } = useUserAuth();
	const router = useRouter();

	// Redirect to /admin if a valid session already exists on mount
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

	return (
		<div className="h-screen max-h-screen overflow-hidden bg-background grid grid-cols-1 lg:grid-cols-12 font-sans antialiased text-foreground">
			{/* ── LEFT SIDE: EXECUTIVE BRAND SHOWCASE ── */}
			<div className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-8 sm:p-10 xl:p-12 overflow-hidden bg-dark-hero text-white">
				{/* Subtle Dot Grid */}
				<div
					className="absolute inset-0 opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				{/* Header Branding Row */}
				<div className="relative z-10 flex items-center justify-between gap-4">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
							<Image
								src="/silicon.png"
								alt="Silicon Logo"
								width={32}
								height={32}
								className="object-contain"
							/>
						</div>
						<div>
							<span className="text-sm font-medium font-heading text-white block tracking-tight">
								Silicon Real Estate
							</span>
							<span className="text-[10px] font-mono text-white/60 uppercase tracking-widest block">
								Management Portal
							</span>
						</div>
					</Link>

					<Link
						href="/"
						className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/15 text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all"
					>
						<ArrowLeft className="w-3.5 h-3.5" />
						Back to Home
					</Link>
				</div>

				{/* Center Brand Context */}
				<div className="relative z-10 max-w-lg space-y-5 my-auto">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium font-heading text-accent">
						<ShieldCheck className="w-3.5 h-3.5 text-accent" />
						ADMINISTRATION & CONTROL DESK
					</div>

					<h1 className="text-3xl sm:text-4xl xl:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
						Secure Gateway to Your <br />
						<span className="text-accent font-medium">Property Management</span>
					</h1>

					<p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
						Sign in with your administrative credentials to manage inventory,
						update banner slides, review client leads, and edit site settings.
					</p>

					{/* Feature Highlights */}
					<div className="space-y-2.5 pt-1">
						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
							<span>Instant inventory management & plot updates</span>
						</div>

						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
							<span>Client inquiries tracking & lead CRM status</span>
						</div>

						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
							<span>Dynamic homepage slider & CMS editor</span>
						</div>
					</div>
				</div>

				{/* Footer Subtext */}
				<div className="relative z-10 flex items-center justify-between text-xs text-white/50 font-heading border-t border-white/10 pt-4">
					<span>
						&copy; {new Date().getFullYear()} Silicon Real Estate (Pvt.) Ltd.
					</span>
					<span className="flex items-center gap-1 text-white/60">
						<Lock className="w-3 h-3" /> SSL 256-Bit Encrypted
					</span>
				</div>
			</div>

			{/* ── RIGHT SIDE: FORM EXECUTION CANVAS ── */}
			<main className="lg:col-span-6 xl:col-span-5 h-full overflow-hidden flex flex-col justify-center items-center p-6 sm:p-10 bg-background relative">
				<div className="w-full max-w-md mx-auto space-y-6">
					{isSuccess ? (
						<div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 bg-card border border-border/60 rounded-3xl p-8 shadow-md">
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
					) : (
						<div className="bg-card border border-border/60 rounded-3xl p-8 shadow-md space-y-6">
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
									Sign in with your admin credentials to access the management
									portal.
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
										<p className="text-[11px] text-destructive">
											{errors.email}
										</p>
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
										<p className="text-[11px] text-destructive">
											{errors.password}
										</p>
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
					)}
				</div>
			</main>
		</div>
	);
}
