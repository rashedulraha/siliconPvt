"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Building2,
	Users,
	DollarSign,
	TrendingUp,
	Mail,
	Phone,
	MapPin,
	Plus,
	Edit3,
	Trash2,
	Save,
	LogOut,
	CheckCircle2,
	ChevronRight,
	Sliders,
	Settings,
	Globe,
	Eye,
	FileText,
	LayoutGrid,
	CheckCircle,
	Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUserAuth } from "@/context/UserAuthContext";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCMS } from "@/context/CMSContext";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import {
	FadeInSlideUp,
	StaggerSectionContainer,
	StaggerItem,
	PremiumHoverCard,
} from "@/components/ui/FramerWrappers";

// Mock Pipeline States
const PIPELINE_STATUSES = [
	{ key: "new", label: "New Lead" },
	{ key: "contacted", label: "Contacted" },
	{ key: "site_visit", label: "Site Visit Scheduled" },
	{ key: "agreement", label: "Agreement / Legal" },
	{ key: "won", label: "Sale Won" },
];

interface MockLead {
	id: string;
	name: string;
	phone: string;
	email: string;
	property: string;
	status: string;
	value: number;
}

export default function AdminDashboard() {
	const { user, isLoggedIn, logout, isLoading } = useUserAuth();
	const { state, dispatch } = useCMS();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [activeTab, setActiveTab] = useState<
		"overview" | "leads" | "properties" | "cms"
	>("overview");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// CMS Settings States
	const [siteName, setSiteName] = useState(state.siteSettings.siteName);
	const [phoneVal, setPhoneVal] = useState(state.siteSettings.contactPhone);
	const [emailVal, setEmailVal] = useState(state.siteSettings.contactEmail);
	const [addrVal, setAddrVal] = useState(state.siteSettings.address);
	const [hoursVal, setHoursVal] = useState(
		typeof state.siteSettings.businessHours === "string"
			? state.siteSettings.businessHours
			: "Sun–Thu: 9:00 AM – 6:00 PM",
	);

	// New Property Form States
	const [newProp, setNewProp] = useState({
		title: "",
		price: "",
		location: "",
		address: "",
		category: "land",
		type: "sale",
		area: "",
		features: "",
		images: "",
	});

	// Local state for active client pipeline leads (seeded with realistic Dhaka-based leads)
	const [leads, setLeads] = useState<MockLead[]>([
		{
			id: "lead-1",
			name: "Tanvir Ahmed",
			phone: "01712345678",
			email: "tanvir@gmail.com",
			property: "Silicon Orchard - Plot 5",
			status: "agreement",
			value: 4800000,
		},
		{
			id: "lead-2",
			name: "Farhana Yasmin",
			phone: "01819234567",
			email: "farhana.y@outlook.com",
			property: "Silicon Royal Heights - Apt 3C",
			status: "site_visit",
			value: 13500000,
		},
		{
			id: "lead-3",
			name: "Imran Khan",
			phone: "01911987654",
			email: "imran.khan@dhaka.io",
			property: "Silicon Commercial Square - Plot 12",
			status: "new",
			value: 21000000,
		},
		{
			id: "lead-4",
			name: "Ziaur Rahman",
			phone: "01511223344",
			email: "zia@yahoo.com",
			property: "Silicon Green Valley - Plot 22",
			status: "contacted",
			value: 3200000,
		},
		{
			id: "lead-5",
			name: "Sadia Chowdhury",
			phone: "01612344321",
			email: "sadia.c@gmail.com",
			property: "Silicon Vista - Penthouse 9B",
			status: "won",
			value: 42000000,
		},
	]);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted && !isLoading) {
			if (!isLoggedIn || user?.role !== "admin") {
				router.replace("/login");
			}
		}
	}, [mounted, isLoading, isLoggedIn, user, router]);

	// Sync settings states when state hydrates
	useEffect(() => {
		setSiteName(state.siteSettings.siteName);
		setPhoneVal(state.siteSettings.contactPhone);
		setEmailVal(state.siteSettings.contactEmail);
		setAddrVal(state.siteSettings.address);
		setHoursVal(
			typeof state.siteSettings.businessHours === "string"
				? state.siteSettings.businessHours
				: "Sun–Thu: 9:00 AM – 6:00 PM",
		);
	}, [state.siteSettings]);

	const totalRevenue = useMemo(() => {
		return leads
			.filter((l) => l.status === "won")
			.reduce((sum, l) => sum + l.value, 0);
	}, [leads]);

	if (!mounted || isLoading || !isLoggedIn || user?.role !== "admin") {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<p className="text-sm text-muted-foreground">
					Checking authentication...
				</p>
			</div>
		);
	}

	function handleLogout() {
		logout();
		router.push("/");
	}

	// Save CMS configurations
	function handleSaveCMS() {
		dispatch({
			type: "UPDATE_SITE_SETTINGS",
			payload: {
				siteName,
				contactPhone: phoneVal,
				contactEmail: emailVal,
				address: addrVal,
				businessHours: hoursVal,
			},
		});
		toast.success("CMS configurations saved successfully! Changes are live.");
	}

	// Add new property listing
	function handleAddProperty(e: React.FormEvent) {
		e.preventDefault();
		if (!newProp.title || !newProp.price || !newProp.location) {
			toast.error("Please enter a title, price, and location.");
			return;
		}

		const priceNum = parseFloat(newProp.price);
		const areaNum = parseFloat(newProp.area) || 0;

		dispatch({
			type: "ADD_PROPERTY",
			payload: {
				id: "prop-" + Date.now(),
				title: newProp.title,
				slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				description: `Premium newly listed development plot or ready flat in ${newProp.location}. Features RAJUK-approved boundaries and immediate registration.`,
				price: priceNum,
				location: newProp.location,
				address: newProp.address || newProp.location + ", Dhaka",
				bedrooms: newProp.category === "apartment" ? 3 : 0,
				bathrooms: newProp.category === "apartment" ? 3 : 0,
				area: areaNum,
				type: newProp.type as "sale" | "rent",
				category: newProp.category as any,
				images: newProp.images
					? [newProp.images]
					: [
							"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
						],
				features: newProp.features
					? newProp.features.split(",").map((f) => f.trim())
					: ["RAJUK Approved", "Demarcated Boundary"],
				agentId: "agent-1",
				status: "available",
				yearBuilt: 2026,
				garage: 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		});

		toast.success("Property listing added successfully!");
		setNewProp({
			title: "",
			price: "",
			location: "",
			address: "",
			category: "land",
			type: "sale",
			area: "",
			features: "",
			images: "",
		});
	}

	// Delete property listing
	function handleDeleteProperty(id: string) {
		dispatch({ type: "DELETE_PROPERTY", payload: id });
		toast.success("Property listing deleted.");
	}

	// Update status of a lead in local state pipeline
	function handleUpdateLeadStatus(leadId: string, newStatus: string) {
		setLeads((prev) =>
			prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
		);
		toast.success("Lead status updated in pipeline.");
	}

	return (
		<div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
			{/* Top Header */}
			<header className="sticky top-0 z-40 bg-card border-b border-border/60 shadow-xs h-14 flex items-center px-4 sm:px-6 md:px-8 justify-between shrink-0">
				<div className="flex items-center gap-3">
					{/* Mobile Sidebar Trigger */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-4.5 w-4.5" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="w-60 p-4 pt-10 bg-card border-r border-border/50 flex flex-col justify-between"
						>
							<div className="space-y-6">
								<div>
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">
										Management
									</p>
									<nav className="space-y-1">
										<button
											onClick={() => {
												setActiveTab("overview");
												setIsMobileMenuOpen(false);
											}}
											className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
												activeTab === "overview"
													? "bg-primary/8 text-primary shadow-xs"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											<LayoutGrid className="w-4 h-4" /> Overview Dashboard
										</button>
										<button
											onClick={() => {
												setActiveTab("leads");
												setIsMobileMenuOpen(false);
											}}
											className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
												activeTab === "leads"
													? "bg-primary/8 text-primary shadow-xs"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											<Users className="w-4 h-4" /> Client Pipelines (
											{leads.length})
										</button>
										<button
											onClick={() => {
												setActiveTab("properties");
												setIsMobileMenuOpen(false);
											}}
											className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
												activeTab === "properties"
													? "bg-primary/8 text-primary shadow-xs"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											<Building2 className="w-4 h-4" /> Land &amp; Flat
											Inventory ({state.properties.length})
										</button>
										<button
											onClick={() => {
												setActiveTab("cms");
												setIsMobileMenuOpen(false);
											}}
											className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
												activeTab === "cms"
													? "bg-primary/8 text-primary shadow-xs"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											<Settings className="w-4 h-4" /> Visual CMS Settings
										</button>
									</nav>
								</div>

								<div className="border-t border-border/60 pt-4">
									<Link
										href="/"
										onClick={() => setIsMobileMenuOpen(false)}
										className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
									>
										<Eye className="w-4 h-4" /> View Public Site
									</Link>
								</div>
							</div>

							<div className="border-t border-border/60 pt-4 space-y-2">
								<span className="text-[10px] text-muted-foreground block px-2">
									Session: {user.name}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setIsMobileMenuOpen(false);
										handleLogout();
									}}
									className="w-full justify-start text-xs gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive h-9 px-3"
								>
									<LogOut className="w-4 h-4" /> Sign Out
								</Button>
							</div>
						</SheetContent>
					</Sheet>

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
								Realstate Admin console
							</span>
						</div>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<span className="text-xs text-muted-foreground hidden sm:inline">
						Administrator: {user.name}
					</span>

					<div className="flex items-center gap-2">
						<ModeToggle />
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLogout}
							className="text-xs gap-1.5 h-8"
						>
							<LogOut className="w-3.5 h-3.5" /> Sign Out
						</Button>
					</div>
				</div>
			</header>

			{/* Admin Panel Main SectionContainer */}
			<div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-8xl mx-auto w-full">
				{/* Left Side Navigation (Tabs) */}
				<aside className="hidden md:flex md:w-60 bg-card border-r border-border/50 p-4 space-y-2 flex-shrink-0 flex-col">
					<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">
						Management
					</p>
					<button
						onClick={() => setActiveTab("overview")}
						className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
							activeTab === "overview"
								? "bg-primary/8 text-primary shadow-xs"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						<LayoutGrid className="w-4 h-4" /> Overview Dashboard
					</button>
					<button
						onClick={() => setActiveTab("leads")}
						className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
							activeTab === "leads"
								? "bg-primary/8 text-primary shadow-xs"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						<Users className="w-4 h-4" /> Client Pipelines ({leads.length})
					</button>
					<button
						onClick={() => setActiveTab("properties")}
						className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
							activeTab === "properties"
								? "bg-primary/8 text-primary shadow-xs"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						<Building2 className="w-4 h-4" /> Land &amp; Flat Inventory (
						{state.properties.length})
					</button>
					<button
						onClick={() => setActiveTab("cms")}
						className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
							activeTab === "cms"
								? "bg-primary/8 text-primary shadow-xs"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						<Settings className="w-4 h-4" /> Visual CMS Settings
					</button>

					<div className="border-t border-border/60 my-4 pt-4">
						<Link
							href="/"
							target="_blank"
							className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
						>
							<Eye className="w-4 h-4" /> View Public Site
						</Link>
					</div>
				</aside>

				{/* Right Side Content Pane */}
				<main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-background">
					{/* TAB 1: OVERVIEW */}
					{activeTab === "overview" && (
						<div className="space-y-6">
							{/* Summary welcome header */}
							<FadeInSlideUp>
								<h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
									Overview Dashboard
								</h2>
								<p className="text-xs text-muted-foreground mt-0.5">
									Summary statistics of Silicon Real Estate.
								</p>
							</FadeInSlideUp>

							{/* Stats Cards */}
							<StaggerSectionContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								<StaggerItem>
									<PremiumHoverCard className="border border-border/50 shadow-xs rounded-xl bg-card">
										<CardHeader className="p-4 pb-1 flex flex-row items-center justify-between">
											<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
												Properties
											</span>
											<Building2 className="w-4 h-4 text-primary" />
										</CardHeader>
										<CardContent className="p-4 pt-1">
											<div className="text-2xl font-bold text-foreground">
												{state.properties.length}
											</div>
											<p className="text-[10px] text-muted-foreground mt-1">
												Ongoing, upcoming, sold
											</p>
										</CardContent>
									</PremiumHoverCard>
								</StaggerItem>

								<StaggerItem>
									<PremiumHoverCard className="border border-border/50 shadow-xs rounded-xl bg-card">
										<CardHeader className="p-4 pb-1 flex flex-row items-center justify-between">
											<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
												Active Pipelines
											</span>
											<Users className="w-4 h-4 text-emerald-500" />
										</CardHeader>
										<CardContent className="p-4 pt-1">
											<div className="text-2xl font-bold text-foreground">
												{leads.filter((l) => l.status !== "won").length}
											</div>
											<p className="text-[10px] text-muted-foreground mt-1">
												Leads currently in process
											</p>
										</CardContent>
									</PremiumHoverCard>
								</StaggerItem>

								<StaggerItem>
									<PremiumHoverCard className="border border-border/50 shadow-xs rounded-xl bg-card">
										<CardHeader className="p-4 pb-1 flex flex-row items-center justify-between">
											<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
												Sales Won
											</span>
											<CheckCircle className="w-4 h-4 text-amber-500" />
										</CardHeader>
										<CardContent className="p-4 pt-1">
											<div className="text-2xl font-bold text-foreground">
												{leads.filter((l) => l.status === "won").length}
											</div>
											<p className="text-[10px] text-muted-foreground mt-1">
												Closed deals
											</p>
										</CardContent>
									</PremiumHoverCard>
								</StaggerItem>

								<StaggerItem>
									<PremiumHoverCard className="border border-border/50 shadow-xs rounded-xl bg-card">
										<CardHeader className="p-4 pb-1 flex flex-row items-center justify-between">
											<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
												Total Sales Revenue
											</span>
											<DollarSign className="w-4 h-4 text-indigo-500" />
										</CardHeader>
										<CardContent className="p-4 pt-1">
											<div className="text-2xl font-bold text-foreground">
												৳ {totalRevenue.toLocaleString("en-IN")}
											</div>
											<p className="text-[10px] text-muted-foreground mt-1">
												From closed leads
											</p>
										</CardContent>
									</PremiumHoverCard>
								</StaggerItem>
							</StaggerSectionContainer>

							{/* Recent Active Leads */}
							<FadeInSlideUp delay={0.15}>
								<PremiumHoverCard className="border border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
									<CardHeader className="pb-3 border-b border-border/40">
										<CardTitle className="text-sm font-heading font-semibold text-foreground">
											Active Client Pipeline Summary
										</CardTitle>
									</CardHeader>
									<CardContent className="p-0">
										<div className="overflow-x-auto">
											<table className="w-full text-left text-xs border-collapse">
												<thead>
													<tr className="bg-muted/30 border-b border-border/40 text-muted-foreground font-semibold uppercase tracking-wider">
														<th className="p-4">Client Name</th>
														<th className="p-4">Property</th>
														<th className="p-4">Value (BDT)</th>
														<th className="p-4">Stage</th>
													</tr>
												</thead>
												<tbody>
													{leads.map((lead) => (
														<tr
															key={lead.id}
															className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors"
														>
															<td className="p-4 font-semibold text-foreground">
																{lead.name}
															</td>
															<td className="p-4 text-muted-foreground">
																{lead.property}
															</td>
															<td className="p-4 font-mono font-medium text-foreground">
																৳ {lead.value.toLocaleString("en-IN")}
															</td>
															<td className="p-4">
																<span
																	className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[10px] uppercase border ${
																		lead.status === "won"
																			? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
																			: lead.status === "agreement"
																				? "bg-indigo-500/10 text-indigo-700 border-indigo-500/20"
																				: "bg-amber-500/10 text-amber-700 border-amber-100"
																	}`}
																>
																	{PIPELINE_STATUSES.find(
																		(s) => s.key === lead.status,
																	)?.label || lead.status}
																</span>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</CardContent>
								</PremiumHoverCard>
							</FadeInSlideUp>
						</div>
					)}

					{/* TAB 2: LEADS PIPELINE */}
					{activeTab === "leads" && (
						<div className="space-y-6">
							<FadeInSlideUp>
								<h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
									Active Client Pipelines
								</h2>
								<p className="text-xs text-muted-foreground mt-0.5">
									Manage deals and update tracking status for Dhaka-based
									inquiries.
								</p>
							</FadeInSlideUp>

							<StaggerSectionContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{leads.map((lead) => (
									<StaggerItem key={lead.id}>
										<PremiumHoverCard className="border border-border/50 shadow-xs rounded-xl bg-card">
											<CardHeader className="pb-2">
												<div className="flex items-center justify-between">
													<span className="text-[10px] font-mono text-muted-foreground">
														ID: {lead.id}
													</span>
													<select
														value={lead.status}
														onChange={(e) =>
															handleUpdateLeadStatus(lead.id, e.target.value)
														}
														className="text-[10px] font-semibold border border-border rounded px-1.5 py-0.5 bg-background focus:outline-none"
													>
														{PIPELINE_STATUSES.map((s) => (
															<option key={s.key} value={s.key}>
																{s.label}
															</option>
														))}
													</select>
												</div>
												<CardTitle className="text-sm font-heading font-bold text-foreground mt-1">
													{lead.name}
												</CardTitle>
												<CardDescription className="text-xs text-primary font-medium">
													{lead.property}
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-3 pt-2 text-xs">
												<div className="divider-gold opacity-30" />
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">Phone:</span>
													<span className="font-medium text-foreground">
														{lead.phone}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">Email:</span>
													<span className="font-medium text-foreground truncate max-w-[150px]">
														{lead.email}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">
														Contract Value:
													</span>
													<span className="font-semibold text-accent">
														৳ {lead.value.toLocaleString("en-IN")}
													</span>
												</div>
											</CardContent>
										</PremiumHoverCard>
									</StaggerItem>
								))}
							</StaggerSectionContainer>
						</div>
					)}

					{/* TAB 3: INVENTORY MANAGEMENT */}
					{activeTab === "properties" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
									Land &amp; Flat Inventory
								</h2>
								<p className="text-xs text-muted-foreground mt-0.5">
									Add, remove, or view current plots and flat listings in Dhaka.
								</p>
							</div>

							{/* Add Property Form */}
							<Card className="border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
								<CardHeader className="pb-3 border-b border-border/40">
									<CardTitle className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
										<Plus className="w-4 h-4 text-primary" /> Add New Listing
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-5">
									<form
										onSubmit={handleAddProperty}
										className="grid sm:grid-cols-3 gap-4"
									>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Property Title
											</label>
											<input
												type="text"
												placeholder="e.g. Silicon Orchard - Phase 3"
												value={newProp.title}
												onChange={(e) =>
													setNewProp((p) => ({ ...p, title: e.target.value }))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Price (BDT)
											</label>
											<input
												type="number"
												placeholder="e.g. 5200000"
												value={newProp.price}
												onChange={(e) =>
													setNewProp((p) => ({ ...p, price: e.target.value }))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												General Location
											</label>
											<input
												type="text"
												placeholder="e.g. Purbachal, Dhaka"
												value={newProp.location}
												onChange={(e) =>
													setNewProp((p) => ({
														...p,
														location: e.target.value,
													}))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Detailed Address
											</label>
											<input
												type="text"
												placeholder="e.g. Block K, Road 4, Uttara Sector 15"
												value={newProp.address}
												onChange={(e) =>
													setNewProp((p) => ({ ...p, address: e.target.value }))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Category
											</label>
											<select
												value={newProp.category}
												onChange={(e) =>
													setNewProp((p) => ({
														...p,
														category: e.target.value,
													}))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											>
												<option value="land">
													Residential/Commercial Plot (Land)
												</option>
												<option value="apartment">
													Ready Flat (Apartment)
												</option>
											</select>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Area (sqft or decimals)
											</label>
											<input
												type="number"
												placeholder="e.g. 2160"
												value={newProp.area}
												onChange={(e) =>
													setNewProp((p) => ({ ...p, area: e.target.value }))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1 sm:col-span-3">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Features (Comma separated)
											</label>
											<input
												type="text"
												placeholder="e.g. RAJUK Approved, Corner Plot, 30ft access road"
												value={newProp.features}
												onChange={(e) =>
													setNewProp((p) => ({
														...p,
														features: e.target.value,
													}))
												}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="sm:col-span-3 pt-2">
											<Button
												type="submit"
												size="sm"
												className="bg-primary hover:bg-primary/95 text-white"
											>
												<Plus className="w-3.5 h-3.5 mr-1" /> Add Listing
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>

							{/* Property Inventory List */}
							<Card className="border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
								<CardHeader className="pb-3 border-b border-border/40">
									<CardTitle className="text-sm font-heading font-semibold text-foreground">
										Active Listings ({state.properties.length})
									</CardTitle>
								</CardHeader>
								<CardContent className="p-0">
									<div className="overflow-x-auto">
										<table className="w-full text-left text-xs border-collapse">
											<thead>
												<tr className="bg-muted/30 border-b border-border/40 text-muted-foreground font-semibold uppercase tracking-wider">
													<th className="p-4">Title</th>
													<th className="p-4">Location</th>
													<th className="p-4">Price</th>
													<th className="p-4">Category</th>
													<th className="p-4">Actions</th>
												</tr>
											</thead>
											<tbody>
												{state.properties.map((prop) => (
													<tr
														key={prop.id}
														className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors"
													>
														<td className="p-4 font-semibold text-foreground">
															{prop.title}
														</td>
														<td className="p-4 text-muted-foreground">
															{prop.location}
														</td>
														<td className="p-4 font-mono font-medium text-foreground">
															৳ {prop.price.toLocaleString("en-IN")}
														</td>
														<td className="p-4 capitalize">{prop.category}</td>
														<td className="p-4">
															<Button
																variant="ghost"
																size="icon"
																className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg"
																onClick={() => handleDeleteProperty(prop.id)}
															>
																<Trash2 className="w-3.5 h-3.5" />
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* TAB 4: VISUAL CMS BUILDER */}
					{activeTab === "cms" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
									Visual CMS Editor
								</h2>
								<p className="text-xs text-muted-foreground mt-0.5">
									Modify main website settings and text fields. Changes
									dynamically propagate to public routes.
								</p>
							</div>

							<Card className="border-border/50 shadow-xs rounded-2xl bg-card">
								<CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
									<div>
										<CardTitle className="text-sm font-heading font-semibold text-foreground">
											Site &amp; Contact Configurations
										</CardTitle>
										<CardDescription className="text-xs">
											Update values displayed in header, footer, and contact
											sections.
										</CardDescription>
									</div>
									<Button
										size="sm"
										onClick={handleSaveCMS}
										className="bg-primary hover:bg-primary/95 text-white"
									>
										<Save className="w-3.5 h-3.5 mr-1" /> Save Changes
									</Button>
								</CardHeader>
								<CardContent className="pt-6 space-y-4">
									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-1.5">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Company Site Name
											</label>
											<input
												type="text"
												value={siteName}
												onChange={(e) => setSiteName(e.target.value)}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Contact Hotline Phone
											</label>
											<input
												type="text"
												value={phoneVal}
												onChange={(e) => setPhoneVal(e.target.value)}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Official Email Address
											</label>
											<input
												type="text"
												value={emailVal}
												onChange={(e) => setEmailVal(e.target.value)}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Business Operating Hours
											</label>
											<input
												type="text"
												value={hoursVal}
												onChange={(e) => setHoursVal(e.target.value)}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
										<div className="space-y-1.5 sm:col-span-2">
											<label className="text-[10px] font-bold text-muted-foreground uppercase">
												Corporate HQ Address
											</label>
											<input
												type="text"
												value={addrVal}
												onChange={(e) => setAddrVal(e.target.value)}
												className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Homepage Hero Settings section */}
							<Card className="border-border/50 shadow-xs rounded-2xl bg-card">
								<CardHeader className="pb-3 border-b border-border/40">
									<CardTitle className="text-sm font-heading font-semibold text-foreground">
										Live Public Page Preview Links
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-4 space-y-2 text-xs">
									<p className="text-muted-foreground">
										Click below to navigate directly to the respective pages and
										view your CMS updates:
									</p>
									<div className="flex flex-wrap gap-2 pt-2">
										<Link
											href="/"
											target="_blank"
											className="border border-border px-3 py-1.5 rounded-lg bg-background hover:bg-muted flex items-center gap-1.5 font-medium"
										>
											<Globe className="w-3.5 h-3.5 text-primary" /> Homepage
										</Link>
										<Link
											href="/about"
											target="_blank"
											className="border border-border px-3 py-1.5 rounded-lg bg-background hover:bg-muted flex items-center gap-1.5 font-medium"
										>
											<FileText className="w-3.5 h-3.5 text-primary" /> About Us
										</Link>
										<Link
											href="/projects"
											target="_blank"
											className="border border-border px-3 py-1.5 rounded-lg bg-background hover:bg-muted flex items-center gap-1.5 font-medium"
										>
											<Sliders className="w-3.5 h-3.5 text-primary" /> Projects
										</Link>
										<Link
											href="/properties"
											target="_blank"
											className="border border-border px-3 py-1.5 rounded-lg bg-background hover:bg-muted flex items-center gap-1.5 font-medium"
										>
											<Building2 className="w-3.5 h-3.5 text-primary" />{" "}
											Properties
										</Link>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
