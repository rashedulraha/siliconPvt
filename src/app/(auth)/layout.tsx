"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, ArrowLeft, Lock } from "lucide-react";
import { SkipToContent } from "@/components/feedback/SkipToContent";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SkipToContent />
			<div className="h-screen max-h-screen overflow-hidden bg-background grid grid-cols-1 lg:grid-cols-12 font-sans antialiased text-foreground">
				{/* ── LEFT SIDE: CLEAN EXECUTIVE BRAND SHOWCASE (NO SCROLL, NO LOGO OVERFLOW) ── */}
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
							{/* Perfectly Contained Logo Box (NO OVERFLOW) */}
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
									Corporate Portal
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
							100% REGULATORY & LEGAL PROTECTION
						</div>

						<h1 className="text-3xl sm:text-4xl xl:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Secure Gateway to Your <br />
							<span className="text-accent font-medium">
								Property Investments
							</span>
						</h1>

						<p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
							Log in to manage plot allocations, view real-time site development
							milestones, and access 100% verified legal land documentation.
						</p>

						{/* Feature Highlights */}
						<div className="space-y-2.5 pt-1">
							<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
								<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
								<span>Instant access to live verified plot inventories</span>
							</div>

							<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
								<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
								<span>Real-time soil filling & milestone tracking</span>
							</div>

							<div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-light">
								<CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
								<span>Direct relationship manager communication desk</span>
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

				{/* ── RIGHT SIDE: FORM EXECUTION CANVAS (NO SCROLLING) ── */}
				<main
					id="main-content"
					tabIndex={-1}
					className="lg:col-span-6 xl:col-span-5 h-full overflow-hidden flex flex-col justify-center items-center p-6 sm:p-10 bg-background relative focus:outline-hidden"
				>
					<div className="w-full max-w-md mx-auto">{children}</div>
				</main>
			</div>
		</>
	);
}
