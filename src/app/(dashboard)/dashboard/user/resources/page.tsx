"use client";

import React from "react";
import Link from "next/link";
import {
	Download,
	ArrowLeft,
	FileText,
	Map,
	ShieldCheck,
	FileCheck,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

const RESOURCES = [
	{
		id: "res-1",
		title: "Silicon City High-Res Masterplan",
		type: "PDF Layout Map",
		size: "14.2 MB",
		desc: "Complete 3D masterplan map showing 30ft & 40ft internal road networks, mosque, school, green parks, and residential plot zoning.",
		link: "/assets/silicon-masterplan.pdf",
	},
	{
		id: "res-2",
		title: "Official Membership Application Form",
		type: "Printable PDF Form",
		size: "2.4 MB",
		desc: "Official 2-page printable membership application form required for offline office submission at Mohammadpur Corporate HQ.",
		link: "/assets/silicon-membership-form.pdf",
	},
	{
		id: "res-3",
		title: "Silicon City Corporate Project Brochure",
		type: "PDF Brochure",
		size: "8.8 MB",
		desc: "Comprehensive company overview brochure featuring soil development photos, RAJUK clearance notes, and plot specifications.",
		link: "/assets/silicon-brochure.pdf",
	},
];

export default function MemberResourcesPage() {
	return (
		<div className="bg-background text-foreground min-h-screen pb-24">
			{/* Top Navigation Bar */}
			<div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 py-4">
				<SectionContainer>
					<div className="flex items-center justify-between">
						<Link
							href="/dashboard/user"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Dashboard
						</Link>
						<span className="text-xs font-mono font-medium text-primary">
							MEMBER RESOURCES PORTAL
						</span>
					</div>
				</SectionContainer>
			</div>

			{/* Main Content */}
			<SectionContainer className="py-10">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="space-y-2 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							DIGITAL ASSET LIBRARY
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Member Resources & Downloads
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
							Access high-resolution project documents, printable application
							forms, and masterplan layout maps.
						</p>
					</div>

					{/* Resources List */}
					<div className="space-y-4">
						{RESOURCES.map((res) => (
							<div
								key={res.id}
								className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/40 transition-all"
							>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-medium font-heading text-primary">
											{res.type}
										</span>
										<span className="text-xs font-mono text-muted-foreground">
											{res.size}
										</span>
									</div>
									<h3 className="text-lg font-semibold font-heading text-foreground">
										{res.title}
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed max-w-xl">
										{res.desc}
									</p>
								</div>

								<div className="shrink-0">
									<a
										href={res.link}
										download
										className="group bg-primary text-primary-foreground h-11 px-6 rounded-xl text-xs font-medium font-heading inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xs"
									>
										DOWNLOAD PDF
										<Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</SectionContainer>
		</div>
	);
}
