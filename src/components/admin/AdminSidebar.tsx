"use client";

import Link from "next/link";
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
	FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
		icon: Building2,
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
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between shrink-0",
					open ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Top Header branding */}
				<div className="flex h-16 items-center justify-between px-6 border-b shrink-0">
					<Link href="/admin" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<HomeIcon className="h-4 w-4" />
						</div>
						<div>
							<p className="font-heading text-base font-bold leading-none">
								Silicon RE
							</p>
							<p className="text-xs text-muted-foreground">Admin Panel</p>
						</div>
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={onClose}
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Middle Navigation items */}
				<ScrollArea className="flex-1">
					<nav className="p-4 space-y-1">
						<p className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
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
										"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
										isActive
											? "bg-primary text-primary-foreground font-semibold"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}
								>
									<item.icon className="h-4 w-4" />
									{item.label}
								</Link>
							);
						})}
					</nav>
				</ScrollArea>

				{/* Bottom Fixed Footer Actions */}
				<div className="p-4 border-t space-y-2 shrink-0 bg-card/50">
					<Link
						href="/"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
					>
						<Briefcase className="h-4 w-4" />
						View Public Site
					</Link>

					<Separator className="my-1" />

					<button
						type="button"
						onClick={handleLogout}
						className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left cursor-pointer"
					>
						<LogOut className="h-4 w-4" />
						Sign Out / Logout
					</button>
				</div>
			</aside>
		</>
	);
}
