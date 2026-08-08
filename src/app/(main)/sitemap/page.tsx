import Link from "next/link";
import type { Metadata } from "next";
import {
	Home,
	Users,
	Briefcase,
	Building2,
	TrendingUp,
	Settings,
	Camera,
	BookOpen,
	Phone,
	Gavel,
	Star,
	MapPin,
	FileText,
	Download,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Sitemap — Silicon Real Estate",
	description:
		"A complete list of all pages and routes on the Silicon Real Estate website for easy navigation.",
};

/* ── All routes categorized ─────────────────────────────────────────── */
const sections = [
	{
		title: "Home",
		icon: Home,
		color: "bg-blue-50 text-blue-600 border-blue-100",
		dot: "bg-blue-500",
		links: [{ label: "Homepage", href: "/", desc: "Main landing page" }],
	},
	{
		title: "About Us",
		icon: Users,
		color: "bg-teal-50 text-teal-600 border-teal-100",
		dot: "bg-teal-500",
		links: [
			{ label: "Company Overview", href: "/about", desc: "Who we are" },
			{
				label: "Mission & Vision",
				href: "/about#mission",
				desc: "Our purpose",
			},
			{
				label: "Chairman Message",
				href: "/about#chairman",
				desc: "Leadership message",
			},
			{ label: "Our Team", href: "/about#team", desc: "Meet the team" },
			{
				label: "Achievements",
				href: "/about#achievements",
				desc: "Company milestones",
			},
			{
				label: "Client Trust",
				href: "/about#trust",
				desc: "Certifications & trust",
			},
		],
	},
	{
		title: "Projects",
		icon: Briefcase,
		color: "bg-indigo-50 text-indigo-600 border-indigo-100",
		dot: "bg-indigo-500",
		links: [
			{ label: "All Projects", href: "/projects", desc: "Browse all projects" },
			{
				label: "Ongoing Projects",
				href: "/projects?status=ongoing",
				desc: "Currently active",
			},
			{
				label: "Upcoming Projects",
				href: "/projects?status=upcoming",
				desc: "Coming soon",
			},
			{
				label: "Completed Projects",
				href: "/projects?status=completed",
				desc: "Delivered projects",
			},
			{
				label: "Project Detail",
				href: "/projects/[slug]",
				desc: "Individual project page",
			},
		],
	},
	{
		title: "Properties",
		icon: Building2,
		color: "bg-amber-50 text-amber-700 border-amber-100",
		dot: "bg-amber-500",
		links: [
			{ label: "All Properties", href: "/properties", desc: "Browse listings" },
			{
				label: "Residential Plots",
				href: "/properties?category=residential",
				desc: "Home plots",
			},
			{
				label: "Commercial Plots",
				href: "/properties?category=commercial",
				desc: "Business plots",
			},
			{
				label: "Ready Flats",
				href: "/properties?category=flat",
				desc: "Apartment units",
			},
			{
				label: "Property Detail",
				href: "/properties/[slug]",
				desc: "Full property page",
			},
		],
	},
	{
		title: "Investment",
		icon: TrendingUp,
		color: "bg-green-50 text-green-700 border-green-100",
		dot: "bg-green-500",
		links: [
			{
				label: "Why Invest in Land",
				href: "/investment",
				desc: "Investment overview",
			},
			{
				label: "Investment Benefits",
				href: "/investment#benefits",
				desc: "Key advantages",
			},
			{
				label: "ROI & Growth",
				href: "/investment#roi",
				desc: "Return analysis",
			},
			{
				label: "Payment Plans",
				href: "/investment#payment",
				desc: "Flexible installments",
			},
			{
				label: "Consultancy",
				href: "/investment#consult",
				desc: "Expert guidance",
			},
			{
				label: "EMI Calculator",
				href: "/calculator",
				desc: "Calculate payments",
			},
		],
	},
	{
		title: "Services",
		icon: Settings,
		color: "bg-purple-50 text-purple-700 border-purple-100",
		dot: "bg-purple-500",
		links: [
			{ label: "All Services", href: "/services", desc: "Overview" },
			{
				label: "Land Buying",
				href: "/services#land-buying",
				desc: "Purchase guidance",
			},
			{
				label: "Plot Sales",
				href: "/services#plot-sales",
				desc: "Plot transactions",
			},
			{
				label: "Property Consultation",
				href: "/services#consultation",
				desc: "Expert advice",
			},
			{
				label: "Legal Documentation",
				href: "/services#legal",
				desc: "Legal support",
			},
			{
				label: "Real Estate Marketing",
				href: "/services#marketing",
				desc: "Market your property",
			},
		],
	},
	{
		title: "Gallery",
		icon: Camera,
		color: "bg-pink-50 text-pink-700 border-pink-100",
		dot: "bg-pink-500",
		links: [
			{ label: "All Gallery", href: "/gallery", desc: "Photo collection" },
			{
				label: "Project Gallery",
				href: "/gallery?cat=project",
				desc: "Project photos",
			},
			{
				label: "Construction Gallery",
				href: "/gallery?cat=construction",
				desc: "Build progress",
			},
			{
				label: "Event Gallery",
				href: "/gallery?cat=event",
				desc: "Events & ceremonies",
			},
			{
				label: "Office Gallery",
				href: "/gallery?cat=office",
				desc: "Our office",
			},
			{
				label: "Video Gallery",
				href: "/gallery?cat=video",
				desc: "Video tours",
			},
		],
	},
	{
		title: "Blog & News",
		icon: BookOpen,
		color: "bg-sky-50 text-sky-700 border-sky-100",
		dot: "bg-sky-500",
		links: [
			{ label: "All Articles", href: "/blog", desc: "Latest posts" },
			{
				label: "Real Estate Tips",
				href: "/blog?cat=tips",
				desc: "Buying & selling tips",
			},
			{
				label: "Investment Guides",
				href: "/blog?cat=guides",
				desc: "In-depth guides",
			},
			{
				label: "Dhaka Property News",
				href: "/blog?cat=news",
				desc: "Market updates",
			},
			{
				label: "Legal Information",
				href: "/blog?cat=legal",
				desc: "Regulatory info",
			},
			{
				label: "Awareness Articles",
				href: "/blog?cat=awareness",
				desc: "Consumer awareness",
			},
			{ label: "Article Detail", href: "/blog/[slug]", desc: "Full post" },
		],
	},
	{
		title: "Contact & Careers",
		icon: Phone,
		color: "bg-orange-50 text-orange-700 border-orange-100",
		dot: "bg-orange-500",
		links: [
			{ label: "Contact Us", href: "/contact", desc: "Get in touch" },
			{ label: "Current Openings", href: "/careers", desc: "Job listings" },
			{
				label: "Apply Online",
				href: "/careers#apply",
				desc: "Submit application",
			},
			{
				label: "Internship Program",
				href: "/careers#intern",
				desc: "Internship info",
			},
			{ label: "HR Contact", href: "/careers#hr", desc: "HR department" },
		],
	},
	{
		title: "User Features",
		icon: Star,
		color: "bg-red-50 text-red-700 border-red-100",
		dot: "bg-red-500",
		links: [
			{ label: "Saved Properties", href: "/favorites", desc: "Your wishlist" },
			{
				label: "Compare Properties",
				href: "/compare",
				desc: "Side-by-side view",
			},
			{ label: "Dashboard", href: "/dashboard", desc: "Logged-in area" },
			{ label: "Sign In", href: "/login", desc: "User login" },
		],
	},
	{
		title: "Legal Pages",
		icon: Gavel,
		color: "bg-gray-50 text-gray-700 border-gray-200",
		dot: "bg-gray-500",
		links: [
			{
				label: "Privacy Policy",
				href: "/privacy-policy",
				desc: "Data handling",
			},
			{ label: "Terms & Conditions", href: "/terms", desc: "Usage terms" },
			{ label: "Refund Policy", href: "/refund-policy", desc: "Refund rules" },
			{ label: "Cookie Policy", href: "/cookie-policy", desc: "Cookie usage" },
		],
	},
];

const navFlow = [
	{ step: "Visitor", icon: "👤" },
	{ step: "Homepage", icon: "🏠" },
	{ step: "Browse Projects / Properties", icon: "🏗️" },
	{ step: "View Details", icon: "📋" },
	{ step: "Inquiry / Chat / Site Visit", icon: "💬" },
	{ step: "Consultation & Assistance", icon: "🤝" },
	{ step: "Booking / Investment", icon: "📝" },
	{ step: "Happy Customer", icon: "😊" },
];

export default function SitemapPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* ── Page Header ──────────────────────────── */}
			<div className="relative pt-28 pb-16 overflow-hidden bg-dark-hero">
				<div className="absolute inset-0 bg-dot-pattern opacity-30" />
				<div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
						<Link href="/" className="hover:text-white transition-colors">
							Home
						</Link>
						<span>/</span>
						<span className="text-white">Sitemap</span>
					</nav>
					<div className="flex items-start justify-between flex-wrap gap-6">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
									<MapPin className="w-5 h-5 text-accent" />
								</div>
								<span className="text-label text-accent text-[11px]">
									Silicon Real Estate
								</span>
							</div>
							<h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-3 tracking-tight">
								Website Sitemap
							</h1>
							<p className="text-white/55 text-lg font-light max-w-xl">
								A complete map of all pages and routes — find everything on our
								website at a glance.
							</p>
						</div>
						<a
							href="/sitemap.xml"
							download
							className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-heading font-medium hover:bg-white/18 transition-all"
						>
							<Download className="w-4 h-4" />
							Download Sitemap
						</a>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
				{/* ── Navigation Flow ───────────────────── */}
				<div className="glass-card rounded-2xl p-6">
					<h2 className="font-heading font-semibold text-foreground mb-5 text-lg">
						Website Navigation Flow
					</h2>
					<div className="flex flex-wrap items-center gap-2">
						{navFlow.map((step, i) => (
							<div key={i} className="flex items-center gap-2">
								<div className="flex flex-col items-center gap-1">
									<div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl">
										{step.icon}
									</div>
									<span className="text-[10px] text-muted-foreground font-heading font-medium text-center max-w-16 leading-tight">
										{step.step}
									</span>
								</div>
								{i < navFlow.length - 1 && (
									<div className="w-6 h-px bg-border mt-[-1rem]" />
								)}
							</div>
						))}
					</div>
				</div>

				{/* ── Sitemap Grid ─────────────────────── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{sections.map((section) => (
						<div
							key={section.title}
							className="glass-card rounded-2xl overflow-hidden card-lift"
						>
							{/* Card header */}
							<div
								className={`px-5 py-4 border-b flex items-center gap-3 ${section.color}`}
							>
								<section.icon className="w-4 h-4" />
								<h3 className="font-heading font-semibold text-sm">
									{section.title}
								</h3>
								<span className="ml-auto text-xs opacity-60">
									{section.links.length} pages
								</span>
							</div>
							{/* Links */}
							<div className="p-4 space-y-1">
								{section.links.map((link) => (
									<Link
										key={link.label}
										href={link.href.includes("[slug]") ? "#" : link.href}
										className="flex items-start gap-2.5 px-2 py-2 rounded-xl hover:bg-secondary transition-colors group"
									>
										<div
											className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${section.dot}`}
										/>
										<div>
											<span className="text-sm text-foreground group-hover:text-primary transition-colors font-medium block leading-snug">
												{link.label}
											</span>
											<span className="text-xs text-muted-foreground leading-snug">
												{link.desc}
											</span>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				{/* ── Legend ───────────────────────────── */}
				<div className="glass-card rounded-2xl p-6">
					<h2 className="font-heading font-semibold text-foreground mb-4">
						Sitemap Legend
					</h2>
					<div className="flex flex-wrap gap-6">
						<div className="flex items-center gap-2.5">
							<div className="w-3 h-3 rounded-full bg-blue-500" />
							<span className="text-sm text-muted-foreground">
								Main Pages — Primary sections of the website
							</span>
						</div>
						<div className="flex items-center gap-2.5">
							<div className="w-3 h-3 rounded-full bg-indigo-400" />
							<span className="text-sm text-muted-foreground">
								Sub Pages — Pages under main sections
							</span>
						</div>
						<div className="flex items-center gap-2.5">
							<div className="w-3 h-3 rounded-full bg-amber-500" />
							<span className="text-sm text-muted-foreground">
								Feature Pages — Key functional or important pages
							</span>
						</div>
					</div>
				</div>

				{/* ── Commitment card ──────────────────── */}
				<div className="rounded-2xl p-8 text-primary-foreground text-center bg-gradient-to-br from-primary via-primary/90 to-teal">
					<div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
						<FileText className="w-6 h-6" />
					</div>
					<h3 className="font-heading font-bold text-xl mb-2">
						Our Commitment
					</h3>
					<p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed">
						Delivering transparent, secure and profitable land investment
						opportunities with trust and excellence.
					</p>
				</div>
			</div>
		</div>
	);
}
