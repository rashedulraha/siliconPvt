"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { apiFetch } from "@/lib/api-client";

interface NewsPost {
	id: string;
	title: string;
	titleBn?: string;
	slug: string;
	excerpt: string;
	excerptBn?: string;
	image: string;
	category: string;
	author: string;
	publishedAt: string;
}

export function CompanyNewsSection() {
	const { isBn } = useLanguage();
	const [posts, setPosts] = useState<NewsPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		async function loadPosts() {
			try {
				setLoading(true);
				const res = await apiFetch<any>("/blog");
				const items = Array.isArray(res?.posts)
					? res.posts
					: Array.isArray(res?.data)
						? res.data
						: Array.isArray(res)
							? res
							: [];
				if (isMounted) {
					setPosts(items);
				}
			} catch (err) {
				console.error("[CompanyNewsSection] Failed to load news from DB:", err);
				if (isMounted) setPosts([]);
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		loadPosts();
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
							{isBn ? "কোম্পানি সংবাদ ও আপডেট" : "COMPANY NEWS & UPDATES"}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							{isBn
								? "সর্বশেষ ঘোষণা ও উন্নয়ন সংবাদ"
								: "Latest Announcements & Articles"}
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							{isBn
								? "সিলিকন সিটির উন্নয়ন অগ্রগতি, নদী সংযোগ সেতু এবং কর্পোরেট খবরাখবর জানুন।"
								: "Stay updated with project progress, bridge construction milestones, and corporate news."}
						</p>
					</div>
					<Link
						href="/about"
						className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1 shrink-0"
					>
						{isBn ? "আমাদের গল্প দেখুন" : "Explore Company Story"}{" "}
						<ArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[1, 2, 3].map((n) => (
							<div
								key={n}
								className="h-64 rounded-3xl bg-muted/50 animate-pulse border border-border/50"
							/>
						))}
					</div>
				) : posts.length === 0 ? (
					<div className="py-16 text-center border border-dashed border-border/70 rounded-3xl bg-card/50 flex flex-col items-center justify-center space-y-3">
						<Newspaper className="w-10 h-10 text-muted-foreground/50 animate-pulse" />
						<p className="text-sm font-medium text-muted-foreground">
							{isBn
								? "ডাটাবেজে বর্তমানে কোনো প্রকাশিত সংবাদ বা ঘোষণা পাওয়া যায়নি।"
								: "No published news articles or announcements found in the database."}
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{posts.slice(0, 3).map((post) => {
							const displayTitle = isBn
								? post.titleBn || post.title
								: post.title;
							const displayExcerpt = isBn
								? post.excerptBn || post.excerpt
								: post.excerpt;

							return (
								<div
									key={post.id}
									className="group bg-card border border-border/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
								>
									{post.image && (
										<div className="relative h-48 w-full overflow-hidden bg-muted">
											<img
												src={post.image}
												alt={displayTitle}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-foreground uppercase tracking-wider border border-border/40">
												{post.category}
											</div>
										</div>
									)}

									<div className="p-6 flex flex-col flex-grow justify-between space-y-4">
										<div className="space-y-2">
											<div className="flex items-center gap-3 text-[11px] text-muted-foreground">
												<span className="flex items-center gap-1">
													<Calendar className="w-3.5 h-3.5" />
													{formatDate(
														post.publishedAt || new Date().toISOString(),
													)}
												</span>
												<span className="flex items-center gap-1">
													<User className="w-3.5 h-3.5" />
													{post.author}
												</span>
											</div>
											<h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
												{displayTitle}
											</h3>
											<p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
												{displayExcerpt}
											</p>
										</div>

										<div className="pt-2 border-t border-border/40 flex items-center justify-between">
											<span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
												{isBn ? "বিস্তারিত পড়ুন" : "Read More"}
												<ArrowRight className="w-3.5 h-3.5" />
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</SectionContainer>
		</section>
	);
}
