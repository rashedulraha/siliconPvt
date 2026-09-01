"use client";

import Link from "next/link";
import Image from "next/image";
import {
	Building2,
	Users,
	ArrowUpRight,
	Home as HomeIcon,
	Mail,
	Calendar,
	Sparkles,
	ImageIcon,
	Settings,
	FileText,
	Briefcase,
	Database,
	CheckCircle2,
	ChevronRight,
	Plus,
	Clock,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { useProperties } from "@/hooks/useProperties";
import { useLeads } from "@/hooks/useLeads";
import { useProjects } from "@/hooks/useProjects";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
	const { properties, stats: propStats } = useProperties();
	const { leads, stats: leadStats } = useLeads();
	const { projects } = useProjects();

	const recentLeads = [...leads]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	const recentProperties = [...properties]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	return (
		<div className="space-y-8 max-w-7xl mx-auto text-left pb-12">
			{/* ── 1. EXECUTIVE COMMAND BANNER ── */}
			<div className="relative overflow-hidden rounded-2xl bg-card border border-border/80 p-6 md:p-8 shadow-xs">
				<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="space-y-2">
						<div className="flex flex-wrap items-center gap-2">
							<span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary font-heading">
								<Sparkles className="h-3.5 w-3.5" /> Silicon RE Admin Console
							</span>
							<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 font-heading">
								<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								PostgreSQL Live Sync
							</span>
						</div>
						<h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
							Executive Dashboard Overview
						</h1>
						<p className="text-muted-foreground text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
							Manage your website&apos;s active pages, plot inventory, customer leads, and corporate content with instant live synchronization.
						</p>
					</div>

					{/* Quick Actions */}
					<div className="flex flex-wrap items-center gap-3 shrink-0">
						<Link
							href="/admin/inventory"
							className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-xs"
						>
							<Plus className="w-4 h-4" />
							<span>Add New Plot</span>
						</Link>
						<Link
							href="/"
							target="_blank"
							className="h-10 px-4 rounded-xl bg-muted/60 hover:bg-muted border border-border/80 text-foreground text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all"
						>
							<span>View Public Site</span>
							<ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
						</Link>
					</div>
				</div>
			</div>

			{/* ── 2. ESSENTIAL METRICS (4 KPIS) ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* KPI 1: Total Plots */}
				<div className="bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-heading">
							Total Land Inventory
						</span>
						<div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<Building2 className="w-4.5 h-4.5" />
						</div>
					</div>
					<div className="space-y-0.5">
						<div className="text-2xl font-bold font-heading text-foreground">
							{propStats.total}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							<span className="text-emerald-600 font-medium">
								{propStats.available} Available
							</span>{" "}
							for booking
						</p>
					</div>
				</div>

				{/* KPI 2: Portfolio Projects */}
				<div className="bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-heading">
							Township Projects
						</span>
						<div className="w-9 h-9 rounded-xl bg-accent/15 text-accent-foreground flex items-center justify-center">
							<HomeIcon className="w-4.5 h-4.5 text-primary" />
						</div>
					</div>
					<div className="space-y-0.5">
						<div className="text-2xl font-bold font-heading text-foreground">
							{projects.length || 1}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							Flagship development active
						</p>
					</div>
				</div>

				{/* KPI 3: Total Leads */}
				<div className="bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-heading">
							Customer Inquiries
						</span>
						<div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
							<Mail className="w-4.5 h-4.5" />
						</div>
					</div>
					<div className="space-y-0.5">
						<div className="text-2xl font-bold font-heading text-foreground">
							{leadStats.total}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							<span className="text-primary font-medium">
								{leadStats.new} new submissions
							</span>
						</p>
					</div>
				</div>

				{/* KPI 4: Pending Follow-ups */}
				<div className="bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-heading">
							Site Tour Bookings
						</span>
						<div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
							<Users className="w-4.5 h-4.5" />
						</div>
					</div>
					<div className="space-y-0.5">
						<div className="text-2xl font-bold font-heading text-foreground">
							{leadStats.contacted + leadStats.qualified}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							In-progress discussions
						</p>
					</div>
				</div>
			</div>

			{/* ── 3. PUBLIC PAGES MANAGEMENT MODULES ── */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-lg font-bold font-heading text-foreground">
							Public Page Content Managers
						</h2>
						<p className="text-xs text-muted-foreground font-light">
							Direct management modules for each public page of your website.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
					{/* 1. Home Page Settings */}
					<Link
						href="/admin/home-settings"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PAGE 1 • HOME
							</span>
							<HomeIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Home Page Content
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Edit headlines, trust counters, and home sections.
						</p>
					</Link>

					{/* 2. Hero Banners */}
					<Link
						href="/admin/manage-slides"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								HOME HERO SLIDER
							</span>
							<ImageIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Hero Slider Banners
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Update slider photos, slogans, and action buttons.
						</p>
					</Link>

					{/* 3. About Page */}
					<Link
						href="/admin/about-settings"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PAGE 2 • ABOUT
							</span>
							<FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							About & Leadership
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Company bio, mission, vision, and speeches.
						</p>
					</Link>

					{/* 4. Projects Page */}
					<Link
						href="/admin/projects-settings"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PAGE 3 • PROJECTS
							</span>
							<Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Projects & Townships
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Silicon City masterplan highlights and specifications.
						</p>
					</Link>

					{/* 5. Inventory */}
					<Link
						href="/admin/inventory"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PLOT INVENTORY
							</span>
							<Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Plots & Property Units
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Add, edit, or delete plot listings and pricing.
						</p>
					</Link>

					{/* 6. Services Page */}
					<Link
						href="/admin/services-settings"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PAGE 4 • SERVICES
							</span>
							<Briefcase className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Services & Solutions
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Real estate development, land sales & legal services.
						</p>
					</Link>

					{/* 7. Contact / Site Settings */}
					<Link
						href="/admin/site-settings"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								PAGE 5 • CONTACT
							</span>
							<Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Site Contact & Info
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							Update hotlines, WhatsApp, email, and address.
						</p>
					</Link>

					{/* 8. Client Leads */}
					<Link
						href="/admin/leads"
						className="bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4.5 transition-all text-left space-y-2 block group shadow-xs hover:shadow-sm"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
								INQUIRIES & LEADS
							</span>
							<Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors">
							Customer Inquiries
						</h3>
						<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
							View and manage booking requests and form inquiries.
						</p>
					</Link>
				</div>
			</div>

			{/* ── 4. LIVE ACTIVITY & RECENT ENTRIES (2 COLUMNS) ── */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Client Inquiries */}
				<Card className="border border-border/70 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40 px-5 pt-5">
						<div className="space-y-0.5">
							<CardTitle className="text-sm sm:text-base font-bold font-heading text-foreground flex items-center gap-2">
								<Mail className="h-4 w-4 text-primary" />
								Recent Client Inquiries
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground font-light">
								Inquiries received from website contact & booking forms
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="h-8 px-2.5 hover:bg-muted text-xs cursor-pointer"
						>
							<Link href="/admin/leads" className="flex items-center gap-1">
								<span>View all</span>
								<ArrowUpRight className="h-3 w-3" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-5">
						{recentLeads.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground text-xs font-light">
								No inquiries submitted yet.
							</div>
						) : (
							<div className="divide-y divide-border/30">
								{recentLeads.map((lead) => (
									<div
										key={lead.id}
										className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
									>
										<div className="flex items-center gap-3 min-w-0">
											<Avatar className="h-8.5 w-8.5 border border-border/60">
												<AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
													{lead.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0 text-left">
												<p className="text-xs sm:text-sm font-semibold text-foreground truncate">
													{lead.name}
												</p>
												<p className="text-[11px] text-muted-foreground font-light truncate">
													{lead.email || lead.phone}
												</p>
											</div>
										</div>
										<LeadStatusBadge status={lead.status} />
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Recent Plot Listings */}
				<Card className="border border-border/70 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40 px-5 pt-5">
						<div className="space-y-0.5">
							<CardTitle className="text-sm sm:text-base font-bold font-heading text-foreground flex items-center gap-2">
								<Building2 className="h-4 w-4 text-primary" />
								Recent Plot Listings
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground font-light">
								Active inventory listings shown on public website
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="h-8 px-2.5 hover:bg-muted text-xs cursor-pointer"
						>
							<Link href="/admin/inventory" className="flex items-center gap-1">
								<span>Manage</span>
								<ArrowUpRight className="h-3 w-3" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-5">
						{recentProperties.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground text-xs font-light">
								No properties in inventory.
							</div>
						) : (
							<div className="divide-y divide-border/30">
								{recentProperties.map((p) => (
									<div
										key={p.id}
										className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
									>
										<div className="flex items-center gap-3 min-w-0">
											<div className="h-9 w-9 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50 relative">
												{p.images && p.images[0] ? (
													<Image
														src={p.images[0]}
														alt={p.title}
														fill
														className="object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<Building2 className="h-4 w-4 text-muted-foreground" />
													</div>
												)}
											</div>
											<div className="min-w-0 text-left">
												<p className="text-xs sm:text-sm font-semibold text-foreground truncate">
													{p.title}
												</p>
												<p className="text-[11px] text-primary font-bold font-heading">
													{formatCurrency(p.price)}
												</p>
											</div>
										</div>
										<Badge
											variant="outline"
											className="capitalize text-[10px] font-semibold border-border px-2 py-0.5 rounded-lg bg-muted/40 text-foreground"
										>
											{p.category === "land" ? "Plot" : p.category}
										</Badge>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
