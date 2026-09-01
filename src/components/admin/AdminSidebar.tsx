"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
	LayoutDashboard,
	Building2,
	Users,
	Image as ImageIcon,
	Briefcase,
	Home as HomeIcon,
	X,
	Settings,
	FileText,
	LogOut,
	Compass,
	ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { clearAdminSession } from "@/lib/admin-auth";
import { useUserAuth } from "@/context/UserAuthContext";

const navItems = [
	{ href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
	{
		href: "/admin/home-settings",
		label: "Home Page Settings",
		icon: HomeIcon,
	},
	{ href: "/admin/manage-slides", label: "Hero Banners", icon: ImageIcon },
	{
		href: "/admin/about-settings",
		label: "About & Leadership",
		icon: FileText,
	},
	{
		href: "/admin/projects-settings",
		label: "Projects & Townships",
		icon: Compass,
	},
	{
		href: "/admin/inventory",
		label: "Plots & Inventory",
		icon: Building2,
	},
	{
		href: "/admin/services-settings",
		label: "Services & Solutions",
		icon: Briefcase,
	},
	{
		href: "/admin/site-settings",
		label: "Site Contact & Info",
		icon: Settings,
	},
	{ href: "/admin/leads", label: "Client Inquiries", icon: Users },
];

interface AdminSidebarProps {
	open: boolean;
	onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { logout } = useUserAuth();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const handleLogout = () => {
		clearAdminSession();
		logout();
		router.push("/admin/login");
	};

	return (
		<>
			{/* Mobile overlay */}
			{open && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-64 border-r border-border/80 bg-card transition-transform lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between shrink-0 shadow-2xs font-roboto",
					open ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Top Header branding */}
				<div className="flex h-16 items-center justify-between px-5 border-b border-border/70 shrink-0">
					<Link href="/admin" className="flex items-center gap-2.5 group">
						<div className="relative h-9 w-9 rounded-full border border-primary/20 bg-background overflow-hidden flex items-center justify-center p-0.5 group-hover:scale-105 transition-all shadow-xs">
							<Image
								src="/silicon.png"
								alt="Silicon RE Logo"
								width={32}
								height={32}
								className="object-cover rounded-full"
							/>
						</div>
						<div className="text-left">
							<p className="font-heading text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
								Silicon RE
							</p>
							<p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
								Admin Console
							</p>
						</div>
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
						onClick={onClose}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>

				{/* Middle Navigation items */}
				<ScrollArea className="flex-1">
					<nav className="p-3.5 space-y-1 text-left">
						<p className="px-3 mb-2 text-[10px] font-bold uppercase font-mono text-muted-foreground/80 tracking-wider">
							Management
						</p>
						{navItems.map((item) => {
							const isActive =
								item.href === "/admin"
									? pathname === "/admin"
									: pathname.startsWith(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={onClose}
									className={cn(
										"flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium font-heading transition-all",
										isActive
											? "bg-primary text-primary-foreground font-bold shadow-xs"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}
								>
									<item.icon className="h-4 w-4 shrink-0" />
									<span>{item.label}</span>
								</Link>
							);
						})}
					</nav>
				</ScrollArea>

				{/* Bottom Fixed Footer Actions */}
				<div className="p-3.5 border-t border-border/70 space-y-2 shrink-0 bg-muted/20">
					<Link
						href="/"
						target="_blank"
						className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold font-heading text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
					>
						<span className="flex items-center gap-2">
							<Briefcase className="h-3.5 w-3.5" />
							<span>View Public Site</span>
						</span>
						<ArrowUpRight className="h-3 w-3 text-muted-foreground" />
					</Link>

					<button
						type="button"
						onClick={() => setShowLogoutModal(true)}
						className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold font-heading text-red-600 hover:bg-red-600/10 hover:text-red-700 transition-colors text-left cursor-pointer"
					>
						<LogOut className="h-3.5 w-3.5" />
						<span>Sign Out / Logout</span>
					</button>
				</div>
			</aside>

			{/* ── CLEAN MINIMAL LOGOUT CONFIRMATION MODAL ── */}
			<ConfirmDialog
				open={showLogoutModal}
				onOpenChange={setShowLogoutModal}
				title="Log out"
				description="Are you sure you want to log out from the admin dashboard?"
				confirmText="Log out"
				cancelText="Cancel"
				onConfirm={handleLogout}
			/>
		</>
	);
}
