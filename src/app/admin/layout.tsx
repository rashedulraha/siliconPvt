"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAdminSession, ADMIN_SESSION_KEY } from "@/lib/admin-auth";
import type { AdminSession } from "@/lib/admin-auth";

const pageMeta: Record<string, { title: string; description: string }> = {
	"/admin": {
		title: "Dashboard",
		description: "Overview of your real estate business",
	},
	"/admin/home-settings": {
		title: "Home Page Settings",
		description: "Manage Home page hero, stats, and sections",
	},
	"/admin/manage-slides": {
		title: "Hero Banners",
		description: "Manage home page hero banner slides",
	},
	"/admin/about-settings": {
		title: "About & Leadership",
		description: "Manage corporate story, mission, and leadership speeches",
	},
	"/admin/projects-settings": {
		title: "Projects & Townships",
		description: "Manage flagship projects and township highlights",
	},
	"/admin/inventory": {
		title: "Plots & Inventory",
		description: "Manage land plot and property listings",
	},
	"/admin/services-settings": {
		title: "Services & Solutions",
		description: "Manage corporate services and real estate offerings",
	},
	"/admin/site-settings": {
		title: "Site Contact & Info",
		description: "Manage corporate address, hotlines, emails, and social links",
	},
	"/admin/leads": {
		title: "Client Inquiries",
		description: "Track and manage client submissions & site visit requests",
	},
};

import { AdminEditorProvider } from "@/context/AdminEditorContext";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [session, setSession] = useState<AdminSession | null>(null);
	const pathname = usePathname();
	const router = useRouter();
	const meta = pageMeta[pathname] || { title: "Admin", description: "" };

	useEffect(() => {
		if (pathname === "/admin/login") return;
		const s = getAdminSession();
		if (!s) {
			router.replace("/admin/login");
		} else {
			setSession(s);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ADMIN_SESSION_KEY, pathname, router]);

	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	return (
		<AdminEditorProvider>
			<TooltipProvider>
				<div className="flex min-h-screen bg-background">
					<AdminSidebar
						open={sidebarOpen}
						onClose={() => setSidebarOpen(false)}
					/>
					<div className="flex-1 flex flex-col min-w-0">
						<AdminHeader
							title={meta.title}
							description={meta.description}
							onMenuClick={() => setSidebarOpen(true)}
							userEmail={session?.email}
						/>
						<main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
					</div>
				</div>
			</TooltipProvider>
		</AdminEditorProvider>
	);
}
