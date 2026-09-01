"use client";

import React, { useState, useEffect } from "react";
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
	ShieldCheck,
	TrendingUp,
	Layers,
	Eye,
	Activity,
	Compass,
	Server,
	Cpu,
	Lock,
	PhoneCall,
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
import { useSlides } from "@/hooks/useSlides";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
	const { properties, stats: propStats } = useProperties();
	const { leads, stats: leadStats } = useLeads();
	const { projects } = useProjects();
	const { slides } = useSlides();
	const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		const now = new Date();
		setCurrentDate(
			now.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		);
	}, []);

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

	// Quick Management Modules Configuration
	const managementModules = [
		{
			title: "Home Page Content",
			description:
				"Manage hero titles, statistics counters, trust features, and sections.",
			href: "/admin/home-settings",
			icon: HomeIcon,
			tag: "PAGE 1 • HOME",
			badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
			accentColor: "group-hover:border-blue-500/40",
		},
		{
			title: "Hero Banner Slides",
			description:
				"Manage 3D rotating cylinder slides, photo assets, badges, and CTAs.",
			href: "/admin/manage-slides",
			icon: ImageIcon,
			tag: "3D CAROUSEL",
			badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
			accentColor: "group-hover:border-amber-500/40",
			stat: `${slides.length || 6} Slides Active`,
		},
		{
			title: "About & Leadership",
			description:
				"Corporate backstory, vision, mission, and Managing Director addresses.",
			href: "/admin/about-settings",
			icon: FileText,
			tag: "PAGE 2 • ABOUT",
			badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
			accentColor: "group-hover:border-emerald-500/40",
		},
		{
			title: "Projects & Townships",
			description:
				"Silicon City masterplan details, township specs, and location maps.",
			href: "/admin/projects-settings",
			icon: Compass,
			tag: "PAGE 3 • PROJECTS",
			badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
			accentColor: "group-hover:border-purple-500/40",
			stat: `${projects.length || 1} Mega Project`,
		},
		{
			title: "Plots & Inventory",
			description:
				"Add, edit, and organize residential plots, pricing per katha, and status.",
			href: "/admin/inventory",
			icon: Building2,
			tag: "PLOT INVENTORY",
			badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
			accentColor: "group-hover:border-indigo-500/40",
			stat: `${propStats.total || 0} Plots in Stock`,
		},
		{
			title: "Services & Solutions",
			description:
				"Corporate land sales, legal vetting, registration, and consultancy.",
			href: "/admin/services-settings",
			icon: Briefcase,
			tag: "PAGE 4 • SERVICES",
			badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20",
			accentColor: "group-hover:border-teal-500/40",
		},
		{
			title: "Site Contact & Info",
			description:
				"Manage corporate office address, hotlines, WhatsApp, and Google Map.",
			href: "/admin/site-settings",
			icon: Settings,
			tag: "PAGE 5 • CONTACT",
			badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
			accentColor: "group-hover:border-rose-500/40",
		},
		{
			title: "Client Inquiries CRM",
			description:
				"Review booking inquiries, site visit requests, and customer contact leads.",
			href: "/admin/leads",
			icon: Users,
			tag: "LEADS & CRM",
			badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
			accentColor: "group-hover:border-cyan-500/40",
			stat: `${leadStats.total || 0} Inquiries Received`,
		},
	];

	return (
		<div className="space-y-8 max-w-7xl mx-auto text-left pb-16 font-roboto">
			{/* ── 1. EXECUTIVE COMMAND BANNER ── */}
			<div className="relative overflow-hidden rounded-3xl bg-dark-hero text-white p-6 sm:p-8 md:p-10 border border-white/10 shadow-xl">
				{/* Ambient Background Glows & Dot Matrix */}
				<div
					className="absolute inset-0 opacity-[0.08] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/25 rounded-full blur-[100px] pointer-events-none" />

				<div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
					<div className="space-y-3">
						<div className="flex flex-wrap items-center gap-2.5">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-accent font-heading backdrop-blur-md">
								<ShieldCheck className="h-3.5 w-3.5 text-accent" />
								Executive Administration Console
							</span>
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 font-mono backdrop-blur-md">
								<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
								PostgreSQL Neon Connected
							</span>
						</div>

						<h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
							Silicon Real Estate Control Center
						</h1>

						<p className="text-white/75 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
							Welcome back. Direct command of your plot inventory, public CMS
							pages, customer leads, and corporate settings with live real-time
							sync.
						</p>

						{currentDate && (
							<p className="text-xs font-mono text-white/50 flex items-center gap-1.5 pt-1">
								<Clock className="w-3.5 h-3.5 text-accent" />
								<span>{currentDate}</span>
							</p>
						)}
					</div>

					{/* Quick Action Buttons */}
					<div className="flex flex-wrap items-center gap-3 shrink-0">
						<Link
							href="/admin/inventory"
							className="h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold font-heading inline-flex items-center gap-2 transition-all shadow-md shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
						>
							<Plus className="w-4 h-4" />
							<span>Add New Plot</span>
						</Link>

						<Link
							href="/admin/manage-slides"
							className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold font-heading inline-flex items-center gap-2 transition-all backdrop-blur-md"
						>
							<ImageIcon className="w-3.5 h-3.5 text-accent" />
							<span>Manage Slides</span>
						</Link>

						<Link
							href="/"
							target="_blank"
							className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold font-heading inline-flex items-center gap-2 transition-all backdrop-blur-md"
						>
							<span>Public Website</span>
							<ArrowUpRight className="w-3.5 h-3.5 text-accent" />
						</Link>
					</div>
				</div>
			</div>

			{/* ── 2. ESSENTIAL METRICS (4 KPIS) ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* KPI 1: Total Plots */}
				<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 group text-left">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
							Plot Inventory
						</span>
						<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
							<Building2 className="w-5 h-5" />
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-3xl font-extrabold font-heading text-foreground">
							{propStats.total}
						</div>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span className="text-emerald-600 font-semibold">
								{propStats.available} Available
							</span>
							<span className="text-amber-600 font-medium">
								{propStats.total - propStats.available} Booked / In Process
							</span>
						</div>
					</div>
				</div>

				{/* KPI 2: Township Projects */}
				<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 group text-left">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
							Township Projects
						</span>
						<div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
							<Compass className="w-5 h-5" />
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-3xl font-extrabold font-heading text-foreground">
							{projects.length || 1}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							<span className="text-primary font-semibold">Silicon City</span> •
							Mega Township Active
						</p>
					</div>
				</div>

				{/* KPI 3: Total Leads */}
				<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 group text-left">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
							Client Inquiries
						</span>
						<div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
							<Mail className="w-5 h-5" />
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-3xl font-extrabold font-heading text-foreground">
							{leadStats.total}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							<span className="text-amber-600 font-semibold">
								{leadStats.new} new unreviewed
							</span>{" "}
							submissions
						</p>
					</div>
				</div>

				{/* KPI 4: Pending Follow-ups */}
				<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 group text-left">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
							Site Tour Pipeline
						</span>
						<div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
							<Users className="w-5 h-5" />
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-3xl font-extrabold font-heading text-foreground">
							{leadStats.contacted + leadStats.qualified}
						</div>
						<p className="text-xs text-muted-foreground font-light">
							<span className="text-emerald-600 font-semibold">
								In discussion
							</span>{" "}
							with buyers
						</p>
					</div>
				</div>
			</div>

			{/* ── 3. PUBLIC PAGES MANAGEMENT MODULES (BENTO MATRIX) ── */}
			<div className="space-y-4 text-left">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
					<div>
						<h2 className="text-xl font-bold font-heading text-foreground tracking-tight">
							Live Website Content Managers
						</h2>
						<p className="text-xs text-muted-foreground font-light">
							Manage the public pages, banner carousels, and content settings of
							your site.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{managementModules.map((module) => {
						const Icon = module.icon;
						return (
							<Link
								key={module.href}
								href={module.href}
								className={`bg-card border border-border/70 rounded-2xl p-5 transition-all text-left space-y-3 block group shadow-xs hover:shadow-md hover:border-primary/40 ${module.accentColor}`}
							>
								<div className="flex items-center justify-between">
									<span
										className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${module.badgeColor}`}
									>
										{module.tag}
									</span>
									<div className="w-8 h-8 rounded-lg bg-muted/60 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary flex items-center justify-center transition-colors">
										<Icon className="w-4 h-4" />
									</div>
								</div>

								<div className="space-y-1">
									<h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
										<span>{module.title}</span>
										<ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
										{module.description}
									</p>
								</div>

								{module.stat && (
									<div className="pt-1 border-t border-border/40 text-[11px] font-mono text-primary font-medium">
										{module.stat}
									</div>
								)}
							</Link>
						);
					})}
				</div>
			</div>

			{/* ── 4. LIVE ACTIVITY & RECENT ENTRIES (2 COLUMNS) ── */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Client Inquiries */}
				<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40 px-5 pt-5">
						<div className="space-y-0.5">
							<CardTitle className="text-sm sm:text-base font-bold font-heading text-foreground flex items-center gap-2">
								<Mail className="h-4 w-4 text-primary" />
								<span>Recent Client Inquiries</span>
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
											<Avatar className="h-9 w-9 border border-border/60 shrink-0">
												<AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
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
				<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40 px-5 pt-5">
						<div className="space-y-0.5">
							<CardTitle className="text-sm sm:text-base font-bold font-heading text-foreground flex items-center gap-2">
								<Building2 className="h-4 w-4 text-primary" />
								<span>Recent Plot Listings</span>
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

			{/* ── 5. SYSTEM ARCHITECTURE & ENGINE HEALTH STATUS ── */}
			<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Server className="w-4 h-4 text-primary" />
						<span>Next.js 16 Turbo Engine</span>
					</div>
					<span>•</span>
					<div className="flex items-center gap-2">
						<Database className="w-4 h-4 text-emerald-500" />
						<span>PostgreSQL Neon DB Active</span>
					</div>
				</div>

				<div className="flex items-center gap-2 text-foreground font-medium">
					<Lock className="w-3.5 h-3.5 text-emerald-500" />
					<span>SSL 256-Bit Authenticated Session</span>
				</div>
			</div>
		</div>
	);
}
