"use client";

import { useMemo } from "react";
import Link from "next/link";
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
	Lock,
	Unlock,
	Database,
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
import { StatCard } from "@/components/admin/StatCard";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { useProperties } from "@/hooks/useProperties";
import { useLeads } from "@/hooks/useLeads";
import { formatDate } from "@/lib/utils";
import { useAdminEditor } from "@/context/AdminEditorContext";

export default function AdminDashboard() {
	const { properties, stats: propStats } = useProperties();
	const { leads, stats: leadStats } = useLeads();
	const { isEditorUnlocked, unlockEditorMode, lockEditorMode } = useAdminEditor();

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
		<div className="space-y-6 max-w-7xl mx-auto text-left">
			{/* ── 1. FUTURISTIC EXECUTIVE COMMAND CENTER HEADER ── */}
			<div className="relative overflow-hidden rounded-[32px] bg-card border border-border/80 p-6 md:p-8 shadow-none backdrop-blur-xl">
				{/* Ambient Ambient Glow */}
				<div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
				<div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

				<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								<Sparkles className="h-3.5 w-3.5 text-primary" /> EXECUTIVE COMMAND CENTER
							</span>
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-widest text-emerald-500 font-heading">
								<Database className="h-3.5 w-3.5 text-emerald-500" /> PostgreSQL DB Live
							</span>
						</div>
						<h2 className="font-heading text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
							Welcome to Silicon RE Console 👋
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light max-w-xl">
							Manage land plots, hero banners, site hotlines, and blog posts with live PostgreSQL database synchronization.
						</p>
					</div>

					{/* Lock / Unlock Quick Action */}
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
						{isEditorUnlocked ? (
							<button
								onClick={lockEditorMode}
								className="px-5 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold font-heading uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-none"
							>
								<Unlock className="w-4 h-4 animate-pulse" />
								<span>Lock Editor Mode</span>
							</button>
						) : (
							<button
								onClick={unlockEditorMode}
								className="px-6 h-11 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold font-heading uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-none"
							>
								<Lock className="w-4 h-4" />
								<span>Unlock Editor Mode</span>
							</button>
						)}
					</div>
				</div>
			</div>

			{/* ── 2. Direct Page Management Modules ── */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Link
					href="/admin/inventory"
					className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/50 transition-all text-left space-y-2 block group relative overflow-hidden shadow-none"
				>
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
							PLOTS & INVENTORY
						</span>
						<Building2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
					</div>
					<h3 className="text-base font-bold font-heading text-foreground">
						Properties & Land Plots
					</h3>
					<p className="text-xs text-muted-foreground font-light">
						Add, edit, or remove land plot listings and pricing.
					</p>
				</Link>

				<Link
					href="/admin/manage-slides"
					className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/50 transition-all text-left space-y-2 block group relative overflow-hidden shadow-none"
				>
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
							HERO SLIDER
						</span>
						<ImageIcon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
					</div>
					<h3 className="text-base font-bold font-heading text-foreground">
						Home Hero Banners
					</h3>
					<p className="text-xs text-muted-foreground font-light">
						Update hero headlines, slogans, and photos.
					</p>
				</Link>

				<Link
					href="/admin/site-settings"
					className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/50 transition-all text-left space-y-2 block group relative overflow-hidden shadow-none"
				>
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
							CONTACT & SETTINGS
						</span>
						<Settings className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
					</div>
					<h3 className="text-base font-bold font-heading text-foreground">
						Corporate Settings
					</h3>
					<p className="text-xs text-muted-foreground font-light">
						Edit hotline 16222, email, and office address.
					</p>
				</Link>

				<Link
					href="/admin/manage-content"
					className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/50 transition-all text-left space-y-2 block group relative overflow-hidden shadow-none"
				>
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
							NEWS & BLOG
						</span>
						<FileText className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
					</div>
					<h3 className="text-base font-bold font-heading text-foreground">
						Company Articles & News
					</h3>
					<p className="text-xs text-muted-foreground font-light">
						Publish corporate news and announcements.
					</p>
				</Link>
			</div>

			{/* ── 3. Corporate Metrics ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				<StatCard
					label="Total Land & Property Listings"
					value={propStats.total}
					icon={Building2}
					trend={{ value: "Managed in DB", positive: true }}
				/>
				<StatCard
					label="Active Client Inquiries"
					value={leadStats.total}
					icon={Mail}
					trend={{ value: `${leadStats.new} new submissions`, positive: true }}
				/>
				<StatCard
					label="Available Plots & Units"
					value={propStats.available}
					icon={HomeIcon}
					trend={{
						value: `${propStats.available} available for allotment`,
						positive: true,
					}}
				/>
			</div>

			{/* ── 4. Recent Activity Lists ── */}
			<div className="grid lg:grid-cols-2 gap-6">
				{/* Recent Client Inquiries */}
				<Card className="border border-border/80 shadow-none rounded-3xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
						<div className="space-y-1">
							<CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
								<Mail className="h-4.5 w-4.5 text-primary" />
								Recent Client Inquiries
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground font-light">
								Submissions received from website contact forms
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="hover:bg-muted text-xs cursor-pointer"
						>
							<Link href="/admin/leads" className="flex items-center gap-1">
								View all <ArrowUpRight className="h-3 w-3" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-6">
						{recentLeads.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground text-sm font-light">
								No inquiries submitted yet.
							</div>
						) : (
							<div className="space-y-4">
								{recentLeads.map((lead) => (
									<div
										key={lead.id}
										className="flex items-center justify-between gap-4 border-b border-border/20 last:border-0 pb-3 last:pb-0"
									>
										<div className="flex items-center gap-3 min-w-0">
											<Avatar className="h-9 w-9">
												<AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
													{lead.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0 text-left">
												<p className="text-sm font-semibold text-foreground truncate">
													{lead.name}
												</p>
												<p className="text-xs text-muted-foreground truncate">
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

				{/* Recent Property Listings */}
				<Card className="border border-border/80 shadow-none rounded-3xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
						<div className="space-y-1">
							<CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
								<Mail className="h-4.5 w-4.5 text-primary" />
								Recent Client Inquiries
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground font-light">
								Submissions received from website contact forms
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="hover:bg-muted text-xs cursor-pointer"
						>
							<Link href="/admin/leads" className="flex items-center gap-1">
								View all <ArrowUpRight className="h-3 w-3" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-6">
						{recentLeads.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground text-sm font-light">
								No inquiries submitted yet.
							</div>
						) : (
							<div className="space-y-4">
								{recentLeads.map((lead) => (
									<div
										key={lead.id}
										className="flex items-center justify-between gap-4 border-b border-border/20 last:border-0 pb-3 last:pb-0"
									>
										<div className="flex items-center gap-3 min-w-0">
											<Avatar className="h-9 w-9">
												<AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
													{lead.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0 text-left">
												<p className="text-sm font-semibold text-foreground truncate">
													{lead.name}
												</p>
												<p className="text-xs text-muted-foreground truncate">
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

				{/* Recent Property Listings */}
				<Card className="border border-border/80 shadow-xs rounded-3xl bg-card overflow-hidden text-left">
					<CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
						<div className="space-y-1">
							<CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
								<HomeIcon className="h-4.5 w-4.5 text-primary" />
								Recent Plot Listings
							</CardTitle>
							<CardDescription className="text-xs text-muted-foreground font-light">
								Active listings on public website
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="hover:bg-muted text-xs cursor-pointer"
						>
							<Link href="/admin/inventory" className="flex items-center gap-1">
								View all <ArrowUpRight className="h-3 w-3" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-6">
						{recentProperties.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground text-sm font-light">
								No properties in inventory.
							</div>
						) : (
							<div className="space-y-4">
								{recentProperties.map((p) => (
									<div
										key={p.id}
										className="flex items-center justify-between gap-4 border-b border-border/20 last:border-0 pb-3 last:pb-0"
									>
										<div className="flex items-center gap-3 min-w-0">
											<div className="h-11 w-11 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/40">
												{p.images[0] ? (
													<img
														src={p.images[0]}
														alt=""
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<HomeIcon className="h-4.5 w-4.5 text-muted-foreground" />
													</div>
												)}
											</div>
											<div className="min-w-0 text-left">
												<p className="text-sm font-semibold text-foreground truncate">
													{p.title}
												</p>
												<p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
													<Calendar className="h-3 w-3" />
													{formatDate(p.createdAt)}
												</p>
											</div>
										</div>
										<Badge
											variant="outline"
											className="capitalize text-[9px] font-semibold border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded bg-muted/40 text-neutral-800 dark:text-neutral-200"
										>
											{p.category}
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


