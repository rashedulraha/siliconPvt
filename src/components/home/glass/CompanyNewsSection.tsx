"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { formatDate } from "@/lib/utils";

interface NewsPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	image: string;
	category: string;
	author: string;
	publishedAt: string;
}

const DEFAULT_NEWS: NewsPost[] = [
	{
		id: "news-1",
		title: "Turag River Bridge Processing Underway for Silicon City",
		slug: "turag-river-bridge-processing",
		excerpt:
			"Direct bridge connectivity from Mohammadpur Beribadh to Silicon City will reduce commute times to central Dhaka to just 10 minutes.",
		image:
			"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
		category: "Infrastructure",
		author: "Silicon Editorial",
		publishedAt: new Date().toISOString(),
	},
	{
		id: "news-2",
		title: "RAJUK Extended Masterplan Compliance Certified",
		slug: "rajuk-extended-masterplan-compliance",
		excerpt:
			"Silicon Real Estate secures full planning alignment with RAJUK's eco-township development guidelines.",
		image:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
		category: "Legal & Regulatory",
		author: "Legal Cell",
		publishedAt: new Date().toISOString(),
	},
	{
		id: "news-3",
		title: "Block A Handover Ceremony & Ready Registration Drive",
		slug: "block-a-handover-ceremony",
		excerpt:
			"Over 150 plot owners received instant registration deeds during Silicon Real Estate's annual customer appreciation day.",
		image:
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
		category: "Events",
		author: "PR Division",
		publishedAt: new Date().toISOString(),
	},
];

export function CompanyNewsSection() {
	const [posts, setPosts] = useState<NewsPost[]>(DEFAULT_NEWS);

	useEffect(() => {
		let isMounted = true;
		async function fetchNews() {
			try {
				const { apiFetch } = await import("@/lib/api-client");
				const res = await apiFetch<{ success: boolean; posts?: any[] }>(
					"/blog",
				);
				if (
					res &&
					res.success &&
					Array.isArray(res.posts) &&
					res.posts.length > 0 &&
					isMounted
				) {
					setPosts(res.posts);
				}
			} catch {
				// Fallback to default
			}
		}
		fetchNews();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<section className="py-20 bg-muted/30 text-foreground relative border-t border-border/50">
			<SectionContainer className="space-y-12">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
					<div className="space-y-2 max-w-2xl">
						<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
							COMPANY NEWS & UPDATES
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Latest Announcements & Articles
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Stay updated with project progress, bridge construction
							milestones, and corporate news.
						</p>
					</div>
					<Link
						href="/about"
						className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1 shrink-0"
					>
						Explore Company Story <ArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{posts.slice(0, 3).map((post) => (
						<div
							key={post.id}
							className="group bg-card border border-border/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
						>
							<div className="relative h-48 w-full overflow-hidden bg-muted">
								<img
									src={
										post.image ||
										"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
									}
									alt={post.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
									{post.category}
								</div>
							</div>

							<div className="p-6 space-y-3 text-left flex-1 flex flex-col justify-between">
								<div className="space-y-2">
									<div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
										<span className="flex items-center gap-1">
											<Calendar className="w-3 h-3 text-primary" />
											{formatDate(post.publishedAt)}
										</span>
										<span className="flex items-center gap-1">
											<User className="w-3 h-3 text-primary" />
											{post.author}
										</span>
									</div>
									<h3 className="text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2">
										{post.title}
									</h3>
									<p className="text-xs text-muted-foreground line-clamp-3 font-light">
										{post.excerpt}
									</p>
								</div>

								<div className="pt-4 border-t border-border/40">
									<Link
										href="/about"
										className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1"
									>
										Learn More <ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
