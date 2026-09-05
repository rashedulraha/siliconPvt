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
	Sparkles,
	Building2,
	Layers,
	Users,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { apiFetch } from "@/lib/api-client";
import {
	getAdminSession,
	setAdminSession,
	getAdminEmail,
	getAdminPassword,
} from "@/lib/admin-auth";

export default function AdminLoginPage() {
	const { login } = useUserAuth();
	const { isBn } = useLanguage();
	const router = useRouter();

	// Redirect to /admin if a valid session already exists on mount
	useEffect(() => {
		const session = getAdminSession();
		if (session) {
			router.replace("/admin");
		}
	}, [router]);

	const [email, setEmail] = useState("admin@siliconrealestatepvtltd.com");
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
			newErrors.email = isBn
				? "ইমেইল এড্রেস প্রয়োজন"
				: "Email address is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = isBn
				? "সঠিক ইমেইল এড্রেস লিখুন"
				: "Please enter a valid email address";
		}
		if (!password) {
			newErrors.password = isBn ? "পাসওয়ার্ড প্রয়োজন" : "Password is required";
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
				if (typeof document !== "undefined") {
					document.cookie = `silicon_jwt=${sessionToken}; path=/; max-age=604800; SameSite=Lax`;
					document.cookie = `silicon_jwt_token=${sessionToken}; path=/; max-age=604800; SameSite=Lax`;
				}
				login(userData, sessionToken);
				setIsSuccess(true);
			} else {
				setError(
					isBn
						? "ভুল ইমেইল এড্রেস বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।"
						: "Invalid email address or password. Please try again.",
				);
			}
		} catch (err: any) {
			setError(
				err.message ||
					(isBn
						? "অথেনটিকেশন ব্যর্থ হয়েছে। আপনার ক্রেডেনশিয়াল পরীক্ষা করুন।"
						: "Failed to authenticate. Please check your credentials."),
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
		<div className="h-screen max-h-screen w-full overflow-hidden bg-background text-foreground grid grid-cols-1 lg:grid-cols-12 font-sans select-none">
			{/* ── LEFT SIDE: RICH BRAND & EXECUTIVE AUTH SHOWCASE (Full Height) ── */}
			<section className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-8 sm:p-10 xl:p-12 overflow-hidden bg-dark-hero text-white border-r border-white/10">
				{/* Ambient Glows & Dot Grid */}
				<div
					className="absolute inset-0 opacity-[0.07] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

				{/* 1. Header Branding & Quick Return */}
				<div className="relative z-10 flex items-center justify-between gap-4">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="relative w-11 h-11 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center shrink-0 border border-white/25 shadow-md group-hover:scale-105 transition-all">
							<Image
								src="/silicon.png"
								alt="Silicon Real Estate Logo"
								width={36}
								height={36}
								className="object-contain rounded-full"
							/>
						</div>
						<div className="text-left">
							<span className="text-base font-bold font-heading text-white block tracking-tight leading-tight">
								Silicon
							</span>
							<span className="text-[10px] font-mono text-accent uppercase tracking-widest block font-medium">
								{isBn ? "রিয়েল এস্টেট প্রাঃ লিঃ" : "Real Estate Pvt. Ltd."}
							</span>
						</div>
					</Link>

					<div className="flex items-center gap-2.5">
						<LanguageToggle />

						<Link
							href="/"
							className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
						>
							<ArrowLeft className="w-3.5 h-3.5" />
							<span>{isBn ? "ওয়েবসাইটে ফিরুন" : "Back to Home"}</span>
						</Link>
					</div>
				</div>

				{/* 2. Center Narrative & Feature Pillars */}
				<div className="relative z-10 max-w-xl space-y-6 my-auto text-left">
					<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold font-heading text-accent shadow-xs">
						<ShieldCheck className="w-4 h-4 text-accent" />
						<span>
							{isBn
								? "এডমিন সিকিউরিটি ও কন্ট্রোল ডেস্ক"
								: "EXECUTIVE ADMINISTRATION PORTAL"}
						</span>
					</div>

					<h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold font-heading text-white tracking-tight leading-tight">
						{isBn ? (
							<>
								আপনার প্রপার্টি ও টাউনশিপ পরিচালনার{" "}
								<span className="text-accent">নিরাপদ গেটওয়ে</span>
							</>
						) : (
							<>
								Secure Gateway to Your{" "}
								<span className="text-accent">Property Management</span>
							</>
						)}
					</h1>

					<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
						{isBn
							? "সিলিকন সিটির প্লট ইনভেন্টরি, হোমপেজ ব্যানার স্লাইডার, ক্লায়েন্ট লিড অনুসন্ধান ও সাইট কন্টেন্ট নিয়ন্ত্রণ করতে আপনার এডমিন তথ্য দিয়ে সাইন ইন করুন।"
							: "Sign in with your administrative credentials to manage inventory, update banner slides, review client leads, and edit site settings."}
					</p>

					{/* 3 Executive Feature Pillars */}
					<div className="space-y-3 pt-2">
						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<CheckCircle2 className="w-3.5 h-3.5 text-accent" />
							</div>
							<span>
								{isBn
									? "তাৎক্ষণিক প্লট ইনভেন্টরি ও রিয়েল এস্টেট লিস্টিং ব্যবস্থাপনা"
									: "Instant plot inventory & property listing management"}
							</span>
						</div>

						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<CheckCircle2 className="w-3.5 h-3.5 text-accent" />
							</div>
							<span>
								{isBn
									? "ক্লায়েন্ট অনুসন্ধান ট্র্যাকিং ও সাইট ভিজিট লিড সিআরএম"
									: "Client inquiries tracking & site visit leads CRM status"}
							</span>
						</div>

						<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
							<div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<CheckCircle2 className="w-3.5 h-3.5 text-accent" />
							</div>
							<span>
								{isBn
									? "ডায়নামিক হোম ব্যানার স্লাইডার ও সিএমএস কন্ট্রোল"
									: "Dynamic homepage slider & full CMS control desk"}
							</span>
						</div>
					</div>
				</div>

				{/* 3. Footer Subtext & Security Cert */}
				<div className="relative z-10 flex items-center justify-between text-xs text-white/60 font-mono border-t border-white/10 pt-4">
					<span>
						&copy; {new Date().getFullYear()}{" "}
						{isBn
							? "সিলিকন রিয়েল এস্টেট প্রাঃ লিঃ"
							: "Silicon Real Estate (Pvt.) Ltd."}
					</span>
					<span className="flex items-center gap-1.5 text-white/80">
						<Lock className="w-3.5 h-3.5 text-emerald-400" />
						<span>{isBn ? "২৫৬-বিট এনক্রিপ্টেড" : "SSL 256-Bit Encrypted"}</span>
					</span>
				</div>
			</section>

			{/* ── RIGHT SIDE: DEDICATED FULL-HEIGHT LOGIN CANVAS (Centered Content) ── */}
			<main className="lg:col-span-6 xl:col-span-5 h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-background relative">
				{/* Mobile Top Bar with Logo & Language Switcher */}
				<div className="flex lg:hidden items-center justify-between gap-4 pb-6 border-b border-border/40">
					<Link href="/" className="flex items-center gap-2.5">
						<div className="relative h-9 w-9 rounded-full border border-primary/20 overflow-hidden flex items-center justify-center p-0.5">
							<Image
								src="/silicon.png"
								alt="Silicon Logo"
								width={32}
								height={32}
								className="object-cover rounded-full"
							/>
						</div>
						<span className="font-heading font-bold text-sm text-foreground">
							Silicon Admin
						</span>
					</Link>

					<div className="flex items-center gap-2">
						<LanguageToggle compact />
						<Link
							href="/"
							className="p-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground"
							title={isBn ? "হোমে ফিরুন" : "Back to Home"}
						>
							<ArrowLeft className="w-4 h-4" />
						</Link>
					</div>
				</div>

				{/* Center: The Actual Form Execution Container */}
				<div className="w-full max-w-md mx-auto my-auto py-6">
					{isSuccess ? (
						<div className="flex flex-col items-center justify-center text-center space-y-4 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
							<div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-xs">
								<CheckCircle2 className="w-8 h-8" />
							</div>
							<div className="space-y-1.5">
								<h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
									{isBn ? "এডমিন এক্সেস অনুমোদিত" : "Admin Access Granted"}
								</h2>
								<p className="text-xs sm:text-sm text-muted-foreground font-light">
									{isBn
										? "ম্যানেজমেন্ট ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে..."
										: "Redirecting you to the management dashboard..."}
								</p>
							</div>
							<div className="pt-2 flex items-center gap-2 text-xs font-mono text-primary">
								<Loader2 className="w-4 h-4 animate-spin" />
								<span>
									{isBn ? "ড্যাশবোর্ড লোড হচ্ছে..." : "Opening Admin Dashboard..."}
								</span>
							</div>
						</div>
					) : (
						<div className="bg-card border border-border/80 rounded-3xl p-7 sm:p-9 shadow-xl space-y-6 text-left">
							{/* Form Badge & Title */}
							<div className="space-y-2">
								<span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold font-heading text-primary">
									<ShieldCheck className="w-3.5 h-3.5 text-primary" />
									<span>{isBn ? "এডমিন পোর্টাল" : "ADMIN PORTAL SIGN IN"}</span>
								</span>
								<h2 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
									{isBn ? "এডমিন সাইন ইন" : "Admin Sign In"}
								</h2>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{isBn
										? "ম্যানেজমেন্ট পোর্টালে প্রবেশ করতে আপনার এডমিন তথ্য দিয়ে সাইন ইন করুন।"
										: "Sign in with your admin credentials to access the management portal."}
								</p>
							</div>

							{/* Error Alert */}
							{error && (
								<div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-start gap-2">
									<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
									<span>{error}</span>
								</div>
							)}

							{/* Form */}
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Email Input */}
								<div className="space-y-1.5">
									<label className="text-xs font-semibold font-heading text-foreground block">
										{isBn ? "ইমেইল এড্রেস" : "Email Address"}
									</label>
									<div className="relative">
										<Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="admin@siliconrealestatepvtltd.com"
											className="w-full h-11 pl-10 pr-4 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
										/>
									</div>
									{errors.email && (
										<p className="text-[11px] text-destructive font-medium">
											{errors.email}
										</p>
									)}
								</div>

								{/* Password Input */}
								<div className="space-y-1.5">
									<label className="text-xs font-semibold font-heading text-foreground block">
										{isBn ? "পাসওয়ার্ড" : "Password"}
									</label>
									<div className="relative">
										<Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
										<input
											type={showPassword ? "text" : "password"}
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="••••••••••••••••"
											className="w-full h-11 pl-10 pr-10 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
										>
											{showPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									{errors.password && (
										<p className="text-[11px] text-destructive font-medium">
											{errors.password}
										</p>
									)}
								</div>

								{/* Remember Me */}
								<div className="flex items-center gap-2 pt-1">
									<input
										type="checkbox"
										id="remember"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className="w-4 h-4 rounded-md border-border text-primary focus:ring-primary/20 cursor-pointer"
									/>
									<label
										htmlFor="remember"
										className="text-xs text-muted-foreground font-light select-none cursor-pointer"
									>
										{isBn
											? "এই ডিভাইসে লগইন মনে রাখুন"
											: "Keep me signed in on this device"}
									</label>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={isSubmitting}
									className="group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
								>
									{isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 animate-spin" />
											<span>
												{isBn ? "যাচাই করা হচ্ছে..." : "Authenticating..."}
											</span>
										</>
									) : (
										<>
											<span>
												{isBn
													? "এডমিন প্যানেলে প্রবেশ করুন"
													: "SIGN IN TO ADMIN PORTAL"}
											</span>
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</>
									)}
								</button>
							</form>
						</div>
					)}
				</div>

				{/* Right Side Bottom Notice */}
				<div className="text-center text-[11px] font-mono text-muted-foreground pt-4">
					<span>
						&copy; {new Date().getFullYear()}{" "}
						{isBn
							? "সিলিকন রিয়েল এস্টেট প্রাঃ লিঃ"
							: "Silicon Real Estate (Pvt.) Ltd."}
					</span>
				</div>
			</main>
		</div>
	);
}
