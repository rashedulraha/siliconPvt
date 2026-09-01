"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ArrowRight } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useLanguage } from "@/context/LanguageContext";

export function OfflineMembershipGlassBanner() {
	const { data } = useHomeContent();
	const { isBn } = useLanguage();

	return (
		<section className="relative py-20 sm:py-24 bg-muted/30 border-t border-border/50 overflow-hidden">
			{/* Subtle Dot Grid Background Pattern */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-10 relative overflow-hidden"
				>
					{/* Subtle Dot Grid Overlay */}
					<div
						className="absolute inset-0 opacity-[0.08] pointer-events-none"
						style={{
							backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
							backgroundSize: "24px 24px",
						}}
					/>

					<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/15 pb-8">
						<div className="lg:col-span-8 space-y-3 text-left">
							<span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
								{isBn ? "অফলাইন মেম্বারশিপ ও বুকিং গাইড" : "OFFLINE MEMBERSHIP GUIDE"}
							</span>
							<h2 className="text-2xl sm:text-3xl font-semibold font-heading text-white tracking-tight">
								{isBn
									? "সিলিকন সিটিতে আপনার প্লট বুক করতে প্রস্তুত?"
									: (data.ctaTitle || "Ready to Secure Your Plot in Silicon City?")}
							</h2>
							<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
								{isBn
									? "আমাদের ৩ ধাপের সহজ অফিস বুকিং গাইড অনুসরণ করুন অথবা মোহাম্মদপুর কর্পোরেট অফিস থেকে ফ্রি পরিবহনে সাইট ভিজিট করুন।"
									: (data.ctaDesc ||
										"Follow our simple 3-step physical office registration guide or schedule a physical site visit with free transport from our Mohammadpur corporate office.")}
							</p>
						</div>

						<div className="lg:col-span-4 flex justify-start lg:justify-end">
							<Link
								href={data.ctaButtonLink || "/contact?type=visit"}
								className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-md gap-2"
							>
								{isBn ? "অফিস ভিজিট বুক করুন" : (data.ctaButtonText || "SCHEDULE OFFICE VISIT")}
								<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
							</Link>
						</div>
					</div>

					{/* 3 Step Timeline */}
					<div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
						<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
							<span className="text-xs font-mono font-medium text-accent block">
								{isBn ? "ধাপ ০১" : "STEP 01"}
							</span>
							<h3 className="text-sm font-semibold font-heading text-white">
								{isBn ? "আবেদন ফরম সংগ্রহ" : "Download PDF Form"}
							</h3>
							<p className="text-xs text-white/70 font-light leading-relaxed">
								{isBn
									? "অফিসিয়াল মেম্বারশিপ ও প্লট বরাদ্দ আবেদন ফরমটি সংগ্রহ করুন বা প্রিন্ট করুন।"
									: "Download and print out the official plot application & membership form."}
							</p>
						</div>

						<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
							<span className="text-xs font-mono font-medium text-accent block">
								{isBn ? "ধাপ ০২" : "STEP 02"}
							</span>
							<h3 className="text-sm font-semibold font-heading text-white">
								{isBn ? "তথ্য পূরণ ও কাগজপত্র" : "Fill Form Details"}
							</h3>
							<p className="text-xs text-white/70 font-light leading-relaxed">
								{isBn
									? "এনআইডি কার্ডের কপি, ছবি এবং নমিনির তথ্য দিয়ে ফরমটি সঠিকভাবে পূরণ করুন।"
									: "Fill out the form with NID number, representative/nominee details, and desired plot category."}
							</p>
						</div>

						<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
							<span className="text-xs font-mono font-medium text-accent block">
								{isBn ? "ধাপ ০৩" : "STEP 03"}
							</span>
							<h3 className="text-sm font-semibold font-heading text-white">
								{isBn ? "অফিসে জমা ও প্লট বরাদ্দ" : "Office Submission"}
							</h3>
							<p className="text-xs text-white/70 font-light leading-relaxed">
								{isBn
									? "আমাদের মোহাম্মদপুর কর্পোরেট অফিসে জমা দিয়ে আপনার প্লটের আনুষ্ঠানিক বরাদ্দ নিশ্চিত করুন।"
									: "Bring photographs, NID copies, and visit our Mohammadpur Corporate Office to finalize your plot allotment."}
							</p>
						</div>
					</div>
				</motion.div>
			</SectionContainer>
		</section>
	);
}
