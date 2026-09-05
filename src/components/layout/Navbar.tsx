"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
	Menu,
	X,
	LayoutDashboard,
	LogOut,
	CalendarCheck,
	PhoneCall,
	Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCMS } from "@/context/CMSContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { SectionContainer } from "../ui/section-container";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { state } = useCMS();
	const { user, isLoggedIn, logout } = useUserAuth();
	const { isBn } = useLanguage();

	// Public nav links with conditional rendering
	const navItems = [
		{ label: isBn ? "হোম" : "HOME", href: "/" },
		{ label: isBn ? "আমাদের সম্পর্কে" : "ABOUT", href: "/about" },
		{ label: isBn ? "প্রকল্পসমূহ" : "PROJECTS", href: "/projects" },
		{ label: isBn ? "সেবাসমূহ" : "SERVICES", href: "/services" },
		{ label: isBn ? "যোগাযোগ" : "CONTACT", href: "/contact" },
		{
			label: isBn ? "শর্তাবলী ও নীতিমালা" : "PRIVACY & TERMS",
			href: "/privacy-terms",
		},
	];

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	// Lock body scroll when mobile side drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Close drawer on Escape key press
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	function handleLogout() {
		logout();
		router.push("/");
	}

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 w-full duration-300 ease-out border-b shadow-xs bg-background/90 backdrop-blur-md border-border/50">
				<SectionContainer>
					<div className="relative flex h-16 items-center justify-between gap-4">
						{/* ── 1. Left: Logo Section ───────────── */}
						<div className="flex items-center justify-start shrink-0">
							<Link href="/" className="flex items-center gap-3 group">
								<div
									className="
                    relative
                    h-11 w-11
                    overflow-hidden
                    rounded-full
                    border border-primary/20
                    bg-background/80
                    backdrop-blur-md
                    transition-all duration-300
                    group-hover:scale-[1.04]
                    group-hover:border-primary/40
                    group-hover:shadow-xs
                    flex items-center justify-center
                    shrink-0
                  "
								>
									<Image
										src="/silicon.png"
										alt={`${state.siteSettings.siteName} Logo`}
										width={44}
										height={44}
										priority
										sizes="44px"
										className="object-cover rounded-full overflow-hidden p-1 select-none"
									/>
								</div>

								<div className="hidden sm:flex flex-col text-left">
									<span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground group-hover:text-primary transition-colors">
										Silicon
									</span>
									<span className="text-[10px] tracking-[0.18em] uppercase font-medium leading-none text-muted-foreground">
										{isBn ? "রিয়েল এস্টেট প্রাঃ লিঃ" : "Real Estate Pvt. Ltd."}
									</span>
								</div>
							</Link>
						</div>

						{/* ── 2. Center: Navigation Links ─────────── */}
						<nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-1 px-3 py-1 bg-muted/40 backdrop-blur-xs rounded-full border border-border/50 shadow-2xs">
							{navItems.map((item) => {
								const isActive =
									pathname === item.href ||
									(item.href !== "/" && pathname?.startsWith(item.href));

								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 select-none cursor-pointer whitespace-nowrap",
											isActive
												? "bg-background text-primary border border-border/60 shadow-xs font-semibold"
												: "text-muted-foreground hover:text-foreground hover:bg-background/50",
										)}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>

						{/* ── 3. Right: Luxury Action Capsule ───── */}
						<div className="hidden lg:flex items-center justify-end gap-2.5 shrink-0">
							{/* Single Compact Language Toggle Button */}
							<LanguageToggle />

							{/* Conditional Action: Show Admin Portal ONLY when logged in; otherwise show Book Site Visit CTA */}
							{isLoggedIn ? (
								<div className="flex items-center gap-1.5 p-0.5 rounded-full bg-primary/5 border border-primary/20 shadow-2xs">
									<Link
										href="/admin"
										className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-heading hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
										title={isBn ? "এডমিন ড্যাশবোর্ডে যান" : "Go to Admin Dashboard"}
									>
										<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
										<LayoutDashboard className="w-3.5 h-3.5" />
										<span>{isBn ? "এডমিন ড্যাশবোর্ড" : "Dashboard"}</span>
									</Link>

									<button
										type="button"
										onClick={() => setShowLogoutModal(true)}
										className="w-8 h-8 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-all cursor-pointer"
										title={isBn ? "লগআউট" : "Sign Out"}
									>
										<LogOut className="w-3.5 h-3.5" />
									</button>
								</div>
							) : (
								<Link
									href="/contact"
									className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-heading hover:bg-primary/90 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
								>
									<CalendarCheck className="w-3.5 h-3.5" />
									<span>{isBn ? "সাইট ভিজিট বুক করুন" : "Book Site Visit"}</span>
								</Link>
							)}
						</div>

						{/* ── Mobile Right Actions ──────────────────────── */}
						<div className="flex lg:hidden items-center gap-2 ml-auto">
							<LanguageToggle compact />
							<button
								onClick={() => setIsOpen(!isOpen)}
								aria-label="Toggle menu"
								aria-expanded={isOpen}
								className="w-9 h-9 rounded-lg border border-border text-foreground hover:bg-muted flex items-center justify-center transition-all duration-300 cursor-pointer"
							>
								{isOpen ? (
									<X className="h-4 w-4" />
								) : (
									<Menu className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
				</SectionContainer>
			</header>

			{/* ── Backdrop Overlay ───────────────────────────── */}
			<div
				onClick={() => setIsOpen(false)}
				className={cn(
					"fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
					isOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
				)}
			/>

			{/* ── Mobile Side Drawer ───────────────────────────── */}
			<aside
				className={cn(
					"fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-background/95 backdrop-blur-2xl border-l border-border/60 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto",
					isOpen ? "translate-x-0" : "translate-x-full",
				)}
			>
				<div>
					{/* Drawer Top Header */}
					<div className="p-4 border-b border-border/40 flex items-center justify-between">
						<Link
							href="/"
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-2.5"
						>
							<div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/15 bg-background/60 flex items-center justify-center shrink-0">
								<Image
									src="/silicon.png"
									alt={`${state.siteSettings.siteName} Logo`}
									width={36}
									height={36}
									className="object-cover rounded-full p-0.5 select-none"
								/>
							</div>
							<div className="flex flex-col text-left">
								<span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
									Silicon
								</span>
								<span className="text-[9px] tracking-[0.18em] uppercase font-medium leading-none text-muted-foreground">
									{isBn ? "রিয়েল এস্টেট প্রাঃ লিঃ" : "Real Estate Pvt. Ltd."}
								</span>
							</div>
						</Link>
						<button
							onClick={() => setIsOpen(false)}
							aria-label="Close menu"
							className="w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-all cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>
					</div>

					{/* Navigation Links inside Drawer */}
					<div className="p-4 space-y-1">
						<div className="flex items-center justify-between px-3 mb-2">
							<p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-left">
								{isBn ? "মেনু" : "Navigation"}
							</p>
							<LanguageToggle compact />
						</div>

						{navItems.map((item) => {
							const isActive =
								pathname === item.href ||
								(item.href !== "/" && pathname?.startsWith(item.href));

							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={cn(
										"block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
										isActive
											? "bg-primary/10 text-primary font-semibold border border-primary/20"
											: "text-foreground/90 hover:bg-muted hover:text-foreground",
									)}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				</div>

				{/* Footer inside Drawer */}
				<div className="p-4 border-t border-border/40 space-y-3 bg-muted/20">
					<Link
						href="/contact"
						onClick={() => setIsOpen(false)}
						className="w-full bg-primary text-primary-foreground h-10 rounded-xl text-sm font-semibold font-heading inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-md"
					>
						<CalendarCheck className="w-4 h-4" />
						{isBn ? "সাইট ভিজিট বুক করুন" : "BOOK SITE VISIT"}
					</Link>

					{isLoggedIn ? (
						<div className="pt-2 border-t border-border/40 flex items-center gap-2">
							<Link
								href="/admin"
								onClick={() => setIsOpen(false)}
								className="flex-1 h-9 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground text-primary inline-flex items-center justify-center gap-1.5 text-xs font-semibold font-heading transition-all"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
								<LayoutDashboard className="w-3.5 h-3.5" />
								<span>{isBn ? "এডমিন ড্যাশবোর্ড" : "Dashboard"}</span>
							</Link>

							<button
								type="button"
								onClick={() => {
									setShowLogoutModal(true);
									setIsOpen(false);
								}}
								className="w-9 h-9 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 inline-flex items-center justify-center transition-all cursor-pointer"
								title={isBn ? "লগআউট" : "Sign Out"}
							>
								<LogOut className="w-4 h-4" />
							</button>
						</div>
					) : (
						<div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground px-1">
							<a
								href="tel:+88012345678"
								className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
							>
								<PhoneCall className="w-3.5 h-3.5 text-primary" />
								<span>+880 12 345 678</span>
							</a>
							<Link
								href="/admin/login"
								onClick={() => setIsOpen(false)}
								className="text-[11px] text-muted-foreground/70 hover:text-primary underline transition-colors"
							>
								{isBn ? "এডমিন লগইন" : "Admin Login"}
							</Link>
						</div>
					)}
				</div>
			</aside>

			{/* ── NAVBAR LOGOUT CONFIRMATION MODAL ── */}
			<ConfirmDialog
				open={showLogoutModal}
				onOpenChange={setShowLogoutModal}
				title={isBn ? "লগআউট নিশ্চিতকরণ" : "Confirm Sign Out"}
				description={
					isBn
						? "আপনি কি নিশ্চিত যে আপনি আপনার এডমিন একাউন্ট থেকে সাইন আউট করতে চান?"
						: "Are you sure you want to log out from the administrative session? You will need to log in again to access the dashboard."
				}
				confirmText={isBn ? "লগআউট করুন" : "Yes, Sign Out"}
				cancelText={isBn ? "বাতিল" : "Cancel"}
				variant="destructive"
				onConfirm={handleLogout}
			/>
		</>
	);
}
