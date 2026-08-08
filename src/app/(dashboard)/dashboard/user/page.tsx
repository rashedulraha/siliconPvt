"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Building2,
	Calendar,
	FileText,
	Heart,
	LogOut,
	ArrowRight,
	CheckCircle2,
	Clock,
	MapPin,
	Sparkles,
	User,
	HelpCircle,
	Phone,
	Mail,
	ArrowUpRight,
	Check,
	Download,
	Loader2,
	ShieldCheck,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import { useCMS } from "@/context/CMSContext";
import { ModeToggle } from "@/components/theme-toggle";
import {
	FadeInSlideUp,
	StaggerSectionContainer,
	StaggerItem,
	PremiumHoverCard,
} from "@/components/ui/FramerWrappers";

// Localized mock pipeline tracking steps
const PIPELINE_STEPS = [
	{
		key: "visit",
		label: "Site Visit Scheduled",
		desc: "Completed on June 25, 2026",
		date: "June 25, 2026",
		status: "completed",
	},
	{
		key: "legal",
		label: "Deed Verification & Khatian Audit",
		desc: "CS, SA, RS Khatian, Mutation & Registry checking",
		date: "In Progress",
		status: "active",
	},
	{
		key: "agreement",
		label: "Stamp Deed Drafting",
		desc: "Preparing 300 BDT stamp deed copy",
		date: "Pending",
		status: "pending",
	},
	{
		key: "registration",
		label: "Sub-Registry Office Transfer",
		desc: "Deed transfer & mutation registry registration",
		date: "Pending",
		status: "pending",
	},
];

// Mock installment history
const LEDGER_ITEMS = [
	{
		id: "INST-004",
		type: "Installment #4",
		date: "June 15, 2026",
		amount: 150000,
		status: "paid",
		method: "Bank Wire (SCB)",
	},
	{
		id: "INST-003",
		type: "Installment #3",
		date: "May 15, 2026",
		amount: 150000,
		status: "paid",
		method: "Bank Wire (SCB)",
	},
	{
		id: "INST-002",
		type: "Installment #2",
		date: "April 15, 2026",
		amount: 150000,
		status: "paid",
		method: "EFT Transfer",
	},
	{
		id: "INST-001",
		type: "Booking Money",
		date: "March 10, 2026",
		amount: 500000,
		status: "paid",
		method: "Pay Order (City Bank)",
	},
];

export default function UserDashboard() {
	const { user, isLoggedIn, logout, isLoading } = useUserAuth();
	const { favoriteIds } = useFavorites();
	const { state } = useCMS();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [downloadingId, setDownloadingId] = useState<string | null>(null);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Redirect to correct /auth/login route to prevent 404/redirect loops
	useEffect(() => {
		if (mounted && !isLoading) {
			if (!isLoggedIn || user?.role !== "user") {
				router.replace("/login");
			}
		}
	}, [mounted, isLoading, isLoggedIn, user, router]);

	if (!mounted || isLoading || !isLoggedIn || user?.role !== "user") {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<Loader2 className="w-6 h-6 text-primary animate-spin" />
					<p className="text-xs text-muted-foreground">
						Synchronizing secure terminal session...
					</p>
				</div>
			</div>
		);
	}

	// Filter properties that the user has saved/starred
	const savedPropertiesList = state.properties.filter((p) =>
		favoriteIds.includes(p.id),
	);

	// If user has no saved properties, show some featured Dhaka properties as recommendations
	const recommendedProperties = state.properties.slice(0, 2);

	function handleLogout() {
		logout();
		router.push("/");
	}

	const handleDownloadReceipt = (id: string) => {
		setDownloadingId(id);
		setTimeout(() => {
			setDownloadingId(null);
			setToastMessage(`Receipt ${id} downloaded successfully.`);
			setTimeout(() => setToastMessage(null), 3000);
		}, 1200);
	};

	// Metrics calculations
	const totalInvested = 950000;
	const targetInvestment = 3600000;
	const progressPercent = Math.round((totalInvested / targetInvestment) * 100);

	return (
		<div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B132B] text-foreground font-sans selection:bg-amber-100 dark:selection:bg-amber-900/30">
			{/* Dynamic Toast Notification */}
			{toastMessage && (
				<div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-3 rounded-xl border border-neutral-800 dark:border-neutral-100 flex items-center gap-2.5 shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-350">
					<Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
					<span className="text-xs font-medium">{toastMessage}</span>
				</div>
			)}

			{/* Mini top bar */}
			<header className="sticky top-0 z-40 bg-white/70 dark:bg-[#111E35]/70 backdrop-blur-md border-b border-border/40 shadow-xs h-14 flex items-center px-4 sm:px-6 md:px-8 justify-between">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="flex items-center gap-3 flex-shrink-0 group"
					>
						<div
							className="
            relative
            h-11 w-11
            overflow-hidden
            rounded-xl
            border border-primary/15
            bg-background/60
            backdrop-blur-md
            transition-all duration-300
            group-hover:scale-[1.03]
            group-hover:border-primary/30
            flex items-center justify-center
            shrink-0
          "
						>
							<Image
								src="/silicon.png"
								alt={`${state.siteSettings.siteName} Logo`}
								fill
								priority
								sizes="44px"
								className="
              object-contain
              p-[px]
              select-none
            "
							/>
						</div>

						<div className="hidden sm:flex flex-col">
							<span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
								{state.siteSettings.siteName}
							</span>

							<span className="text-[10px] tracking-[0.2em] uppercase font-medium leading-none text-muted-foreground">
								Realstate user console
							</span>
						</div>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
						<span className="text-[11px] text-muted-foreground font-medium hidden sm:inline">
							Active Session · {user.name}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<ModeToggle />
						<button
							onClick={handleLogout}
							className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
						>
							<LogOut className="w-3 h-3" /> Sign Out
						</button>
					</div>
				</div>
			</header>

			{/* Main Content Area */}
			<SectionContainer className="py-8 max-w-7xl space-y-8">
				{/* Welcome Header */}
				<FadeInSlideUp className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200/50 dark:border-neutral-800/40">
					<div className="space-y-1">
						<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/30 uppercase tracking-wider">
							✨ Premium Member
						</span>
						<h1 className="font-light text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
							Welcome back, <span className="font-medium">{user.name}</span>
						</h1>
						<p className="text-xs text-neutral-400 dark:text-neutral-500 font-light">
							Overview of your private land assets, legal title verification,
							and upcoming investments.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button
							asChild
							variant="outline"
							size="sm"
							className="rounded-lg text-xs h-9"
						>
							<Link href="/dashboard/user/membership-form">
								Form Preview (Page 10)
							</Link>
						</Button>
						<Button
							asChild
							size="sm"
							className="rounded-lg text-xs h-9 bg-primary text-primary-foreground hover:opacity-90"
						>
							<Link href="/dashboard/user/resources">Downloads (Page 11)</Link>
						</Button>
					</div>
				</FadeInSlideUp>

				{/* Core Layout Grid */}
				<StaggerSectionContainer className="grid lg:grid-cols-3 gap-8 items-start">
					{/* LEFT 2 COLUMNS — Investment Metrics & Financial Ledger */}
					<div className="lg:col-span-2 space-y-8">
						{/* 1. VIP Financial Overview Card */}
						<StaggerItem>
							<PremiumHoverCard
								glowColor="rgba(245, 158, 11, 0.15)"
								className="relative overflow-hidden rounded-2xl bg-neutral-900 dark:bg-[#070D1E] text-white p-6 sm:p-8 border border-neutral-800 dark:border-neutral-800/45 shadow-xl"
							>
								{/* Mesh background gradient lines */}
								<div className="absolute inset-0 bg-gradient-to-br from-neutral-800/10 via-transparent to-neutral-950/80 opacity-60 pointer-events-none" />
								<div
									className="absolute inset-0 opacity-[0.02] pointer-events-none"
									style={{
										backgroundImage:
											"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
										backgroundSize: "24px 24px",
									}}
								/>

								<div className="relative z-10 grid md:grid-cols-5 gap-6 items-center">
									{/* Net Invested Value */}
									<div className="md:col-span-3 space-y-4">
										<div className="space-y-1">
											<span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5">
												<ShieldCheck className="w-3.5 h-3.5 text-amber-500" />{" "}
												Secure Asset Valuation
											</span>
											<div className="text-4xl sm:text-5xl font-light font-mono tracking-tight text-white flex items-baseline gap-1">
												৳4,800,000
											</div>
											<div className="text-xs text-neutral-400 font-light flex items-center gap-2">
												<span>Total Booked Value: ৳6,000,000</span>
												<span className="w-1 h-1 bg-neutral-600 rounded-full" />
												<span className="text-amber-400 font-medium">
													{progressPercent}% Settled
												</span>
											</div>
										</div>

										{/* Upcoming Installment Ribbon inside VIP Area */}
										<div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex items-center justify-between gap-3 text-xs">
											<div className="flex items-center gap-2 text-amber-400 font-medium">
												<Clock className="w-3.5 h-3.5" />
												<span>Next Due: ৳150,000 on July 15, 2026</span>
											</div>
											<button className="text-[10px] font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer active:scale-98">
												Direct Deposit
											</button>
										</div>
									</div>

									{/* Minimalist SVG Progress Circle */}
									<div className="md:col-span-2 flex flex-col items-center justify-center p-2">
										<div className="relative w-28 h-28">
											{/* SVG Circle */}
											<svg
												className="w-full h-full transform -rotate-90"
												viewBox="0 0 100 100"
											>
												<circle
													cx="50"
													cy="50"
													r="42"
													className="stroke-neutral-800"
													strokeWidth="5"
													fill="transparent"
												/>
												<circle
													cx="50"
													cy="50"
													r="42"
													className="stroke-amber-400 transition-all duration-1000 ease-out"
													strokeWidth="6"
													strokeDasharray={2 * Math.PI * 42}
													strokeDashoffset={
														2 * Math.PI * 42 * (1 - progressPercent / 100)
													}
													strokeLinecap="round"
													fill="transparent"
												/>
											</svg>
											{/* Inner Text */}
											<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
												<span className="text-xs font-light text-neutral-400">
													Equity
												</span>
												<span className="text-lg font-bold font-mono text-white">
													{progressPercent}%
												</span>
											</div>
										</div>
										<span className="text-[10px] text-neutral-400 mt-2 font-mono">
											Portfolio: Silicon Orchard B-09
										</span>
									</div>
								</div>
							</PremiumHoverCard>
						</StaggerItem>

						{/* 2. Financial Ledger Table */}
						<StaggerItem>
							<PremiumHoverCard className="border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs rounded-2xl bg-white dark:bg-[#111E35] overflow-hidden p-3 md:p-5">
								<CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-900/60">
									<div className="flex items-center justify-between flex-wrap gap-2">
										<div>
											<CardTitle className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
												Financial Statement &amp; Payments
											</CardTitle>
											<CardDescription className="text-xs text-neutral-400 dark:text-neutral-500 font-light mt-0.5">
												Installment ledger history for transaction audits.
											</CardDescription>
										</div>
										<span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 font-mono">
											Currency: BDT (৳)
										</span>
									</div>
								</CardHeader>
								<CardContent className="p-0">
									<div className="overflow-x-auto">
										<table className="w-full text-left border-collapse">
											<thead>
												<tr className="border-b border-neutral-100 dark:border-neutral-900/60 bg-neutral-50/50 dark:bg-neutral-950/20 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
													<th className="py-3 px-5">Installment</th>
													<th className="py-3 px-5">Due / Paid Date</th>
													<th className="py-3 px-5 text-right">Amount</th>
													<th className="py-3 px-5">Reference Method</th>
													<th className="py-3 px-5">Status</th>
													<th className="py-3 px-5 text-center">Receipt</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-neutral-100 dark:divide-neutral-900/40 text-xs">
												{LEDGER_ITEMS.map((item) => (
													<tr
														key={item.id}
														className="hover:bg-neutral-50/30 dark:hover:bg-neutral-950/10 transition-colors"
													>
														<td className="py-4 px-5 font-medium text-neutral-800 dark:text-neutral-200">
															{item.type}
														</td>
														<td className="py-4 px-5 text-neutral-500 dark:text-neutral-400 font-light">
															{item.date}
														</td>
														<td className="py-4 px-5 text-right font-mono font-medium text-neutral-900 dark:text-neutral-100">
															৳{item.amount.toLocaleString()}
														</td>
														<td className="py-4 px-5 text-neutral-500 dark:text-neutral-400 font-light">
															{item.method}
														</td>
														<td className="py-4 px-5">
															<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/30">
																<span className="w-1 h-1 rounded-full bg-emerald-500" />
																Paid
															</span>
														</td>
														<td className="py-4 px-5 text-center">
															<button
																onClick={() => handleDownloadReceipt(item.id)}
																disabled={downloadingId !== null}
																className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-accent/40 text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors disabled:opacity-50 cursor-pointer"
																title="Download PDF"
															>
																{downloadingId === item.id ? (
																	<Loader2 className="w-3.5 h-3.5 animate-spin" />
																) : (
																	<Download className="w-3.5 h-3.5" />
																)}
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</PremiumHoverCard>
						</StaggerItem>
					</div>

					{/* RIGHT COLUMN — Timeline & Consultant Card */}
					<div className="space-y-8">
						{/* 3. Site Visit & Title Registry Tracker */}
						<StaggerItem>
							<PremiumHoverCard className="border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs rounded-2xl bg-white dark:bg-[#111E35] p-3 md:p-5">
								<CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-900/60">
									<div className="flex items-center justify-between ">
										<div>
											<CardTitle className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
												Lifecycle Track
											</CardTitle>
											<CardDescription className="text-xs text-neutral-400 dark:text-neutral-500 font-light mt-0.5">
												Silicon Orchard · Block B, Plot 09
											</CardDescription>
										</div>
										<span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wide">
											Legal Phase
										</span>
									</div>
								</CardHeader>

								<CardContent className="pt-5">
									<div className="relative pl-6 border-l-2 border-neutral-200/60 dark:border-neutral-800/60 ml-2 space-y-6 ">
										{PIPELINE_STEPS.map((step, idx) => {
											const isDone = step.status === "completed";
											const isActive = step.status === "active";

											return (
												<div key={step.key} className="relative group/step">
													{/* Dot indicator */}
													<div
														className={`absolute -left-[32px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#111E35] transition-all duration-300 ${
															isDone
																? "border-emerald-500 bg-emerald-500/10"
																: isActive
																	? "border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] bg-amber-500/5"
																	: "border-neutral-200 dark:border-neutral-800"
														}`}
													>
														{isDone && (
															<Check className="w-2.5 h-2.5 text-emerald-500 stroke-[3]" />
														)}
														{isActive && (
															<div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
														)}
													</div>

													<div className="space-y-0.5 transition-all duration-200 group-hover/step:translate-x-0.5">
														<div className="flex items-center justify-between gap-4">
															<h4
																className={`text-xs font-semibold ${
																	isDone
																		? "text-neutral-550 dark:text-neutral-450"
																		: isActive
																			? "text-neutral-900 dark:text-neutral-50 font-bold"
																			: "text-neutral-400 dark:text-neutral-600"
																}`}
															>
																{step.label}
															</h4>
															{isDone ? (
																<span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
																	Done
																</span>
															) : isActive ? (
																<span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
																	Active
																</span>
															) : (
																<span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-600">
																	Pending
																</span>
															)}
														</div>
														<p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-light leading-relaxed">
															{step.desc}
														</p>
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</PremiumHoverCard>
						</StaggerItem>

						{/* 4. Consultant Contact Card */}
						<StaggerItem>
							<PremiumHoverCard className="border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs rounded-2xl bg-white dark:bg-[#111E35] overflow-hidden p-3 md:p-5">
								<CardContent className="p-5 space-y-4">
									<div className="flex items-center gap-4">
										<div className="relative">
											<div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 ring-2 ring-amber-500/10">
												<Image
													src="https://images.unsplash.com/photo-1507152832244-10d49c7dd8f9?w=120"
													alt="Consultant Avatar"
													fill
													className="object-cover object-top"
												/>
											</div>
											<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111E35] shadow-sm animate-pulse" />
										</div>
										<div>
											<span className="text-[9px] text-amber-500 font-semibold uppercase tracking-wider block">
												Assigned Advisor
											</span>
											<h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-100">
												Md. Aminul Islam
											</h4>
											<p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light">
												Senior Relationship Manager
											</p>
										</div>
									</div>

									<div className="pt-3 border-t border-neutral-100 dark:border-neutral-900/60 grid grid-cols-2 gap-2 text-[10px]">
										<a
											href="tel:+8801712345678"
											className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/30 hover:bg-amber-50/10 dark:hover:bg-amber-950/10 text-neutral-700 dark:text-neutral-300 transition-all font-medium cursor-pointer active:scale-98"
										>
											<Phone className="w-3.5 h-3.5 text-amber-500" />
											Call Advisor
										</a>
										<a
											href="mailto:aminul@siliconrealestate.com"
											className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/30 hover:bg-amber-50/10 dark:hover:bg-amber-950/10 text-neutral-700 dark:text-neutral-300 transition-all font-medium cursor-pointer active:scale-98"
										>
											<Mail className="w-3.5 h-3.5 text-amber-500" />
											Email Advisor
										</a>
									</div>
								</CardContent>
							</PremiumHoverCard>
						</StaggerItem>

						{/* 5. Saved Wishlist Properties */}
						<StaggerItem>
							<PremiumHoverCard className="border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs rounded-2xl bg-white dark:bg-[#111E35] p-3 md:p-5">
								<CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-900/60">
									<CardTitle className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-1.5">
										<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />{" "}
										Bookmarked Properties ({savedPropertiesList.length})
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-4 px-4 space-y-4">
									{savedPropertiesList.length > 0 ? (
										savedPropertiesList.map((prop) => (
											<div
												key={prop.id}
												className="flex gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-950/20 last:border-0 last:pb-0 items-start group/wishlist"
											>
												<div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border/50">
													<Image
														src={
															prop.images[0] ||
															"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150"
														}
														alt={prop.title}
														fill
														className="object-cover transition-transform duration-500 group-hover/wishlist:scale-105"
													/>
												</div>
												<div className="flex-1 min-w-0 space-y-1">
													<Link
														href={`/properties/${prop.slug}`}
														className="font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:text-primary transition-colors block truncate"
													>
														{prop.title}
													</Link>
													<div className="flex items-center gap-1 text-[9px] text-neutral-400 dark:text-neutral-500 truncate">
														<MapPin className="w-2.5 h-2.5 flex-shrink-0 text-amber-500" />
														<span className="truncate">{prop.location}</span>
													</div>
													<div className="font-mono text-[11px] font-bold text-amber-500 dark:text-amber-400">
														৳{prop.price.toLocaleString()}
													</div>
												</div>
											</div>
										))
									) : (
										<div className="text-center py-6 px-4 flex flex-col items-center justify-center space-y-4">
											<div className="w-12 h-12 rounded-full bg-rose-500/5 border border-rose-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.05)]">
												<Heart className="w-5 h-5 text-rose-500 fill-rose-500/10" />
											</div>
											<div className="space-y-1 max-w-[220px]">
												<h5 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
													Wishlist is empty
												</h5>
												<p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light leading-relaxed">
													Save luxury developments to track their pricing, title
													registry, and construction schedules.
												</p>
											</div>
											<Button
												asChild
												size="sm"
												variant="outline"
												className="text-[11px] h-8 px-4 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-all cursor-pointer"
											>
												<Link
													href="/properties"
													className="flex items-center gap-1"
												>
													Explore Collection{" "}
													<ArrowRight className="w-3 h-3 ml-0.5" />
												</Link>
											</Button>
										</div>
									)}
								</CardContent>
							</PremiumHoverCard>
						</StaggerItem>

						{/* Recommended Properties */}
						<StaggerItem>
							<PremiumHoverCard className="border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs rounded-2xl bg-white dark:bg-[#111E35] p-3 md:p-5">
								<CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-900/60">
									<CardTitle className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-1.5">
										<Sparkles className="w-3.5 h-3.5 text-amber-500" /> Premium
										Recommendations
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-4 px-4 space-y-4 pb-6">
									{recommendedProperties.map((prop) => (
										<div
											key={prop.id}
											className="flex gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-950/20 last:border-0 last:pb-0 items-start group/recom"
										>
											<div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border/50">
												<Image
													src={
														prop.images[0] ||
														"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150"
													}
													alt={prop.title}
													fill
													className="object-cover transition-transform duration-500 group-hover/recom:scale-105"
												/>
											</div>
											<div className="flex-1 min-w-0 space-y-1">
												<Link
													href={`/properties/${prop.slug}`}
													className="font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:text-primary transition-colors block truncate flex items-center justify-between gap-1"
												>
													<span className="truncate">{prop.title}</span>
													<ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover/recom:opacity-100 transition-all duration-300 translate-y-0.5 group-hover/recom:translate-y-0 flex-shrink-0" />
												</Link>
												<div className="flex items-center gap-1 text-[9px] text-neutral-400 dark:text-neutral-500 truncate">
													<MapPin className="w-2.5 h-2.5 flex-shrink-0 text-amber-500" />
													<span className="truncate">{prop.location}</span>
												</div>
												<div className="font-mono text-xs font-semibold text-accent">
													৳{prop.price.toLocaleString()}
												</div>
											</div>
										</div>
									))}
								</CardContent>
							</PremiumHoverCard>
						</StaggerItem>
					</div>
				</StaggerSectionContainer>
			</SectionContainer>
		</div>
	);
}
