"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import { User, Shield, LogOut, ChevronUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingSimulator() {
	const { isLoggedIn, user, login, logout } = useUserAuth();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	function simulateUser() {
		login({
			uid: "user-sim-1",
			name: "Tanvir Ahmed",
			email: "tanvir@gmail.com",
			role: "user",
		});
		router.push("/dashboard/user");
	}

	function simulateAdmin() {
		login({
			uid: "admin-sim-1",
			name: "System Admin",
			email: "admin@siliconrealestate.com",
			role: "admin",
		});
		router.push("/dashboard/admin");
	}

	function simulateGuest() {
		logout();
		router.push("/");
	}

	return (
		<div
			className={cn(
				"fixed bottom-6 left-6 z-50 flex flex-col gap-2 rounded-2xl bg-card/90 border border-border/80 p-3 shadow-soft-lg backdrop-blur-md select-none transition-all duration-300 max-w-65",
				isExpanded ? "scale-100" : "scale-95 opacity-85 hover:opacity-100",
			)}
		>
			{/* Header (collapsible) */}
			<button
				onClick={() => setIsExpanded((v) => !v)}
				className="flex items-center justify-between gap-3 text-left w-full text-foreground hover:opacity-80 transition-opacity"
			>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
						<Layers className="w-3.5 h-3.5 text-primary" />
					</div>
					<div>
						<span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block leading-none">
							Dev Sandbox
						</span>
						<span className="text-xs font-semibold text-foreground mt-0.5 block">
							RBAC Simulator
						</span>
					</div>
				</div>
				<ChevronUp
					className={cn(
						"w-4 h-4 text-muted-foreground transition-transform duration-300",
						isExpanded && "rotate-180",
					)}
				/>
			</button>

			{/* Expanded Actions */}
			{isExpanded && (
				<div className="pt-2 mt-2 border-t border-border/60 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
					{/* Active status */}
					<div className="bg-muted/50 rounded-xl px-2.5 py-1.5 border border-border/40 text-[10px] text-muted-foreground">
						<span className="font-medium text-foreground block">
							Session State:
						</span>
						{isLoggedIn && user ? (
							<span className="mt-0.5 block truncate text-primary font-semibold">
								{user.role === "admin" ? "👑 Admin" : "👤 User"}: {user.name}
							</span>
						) : (
							<span className="mt-0.5 block text-muted-foreground">
								🌐 Guest / Public Visitor
							</span>
						)}
					</div>

					{/* Quick switches */}
					<div className="grid grid-cols-1 gap-1.5">
						<button
							onClick={simulateUser}
							className={cn(
								"h-8 px-2.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all cursor-pointer",
								isLoggedIn && user?.role === "user"
									? "bg-primary text-primary-foreground border-primary"
									: "bg-muted hover:bg-muted/80 text-foreground border-border/40",
							)}
						>
							<User className="w-3.5 h-3.5" />
							Simulate Client
						</button>
						<button
							onClick={simulateAdmin}
							className={cn(
								"h-8 px-2.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all cursor-pointer",
								isLoggedIn && user?.role === "admin"
									? "bg-primary text-primary-foreground border-primary"
									: "bg-muted hover:bg-muted/80 text-foreground border-border/40",
							)}
						>
							<Shield className="w-3.5 h-3.5" />
							Simulate Admin
						</button>
						<button
							onClick={simulateGuest}
							className="h-8 px-2.5 rounded-lg text-xs font-medium flex items-center gap-2 bg-destructive/10 hover:bg-destructive/15 text-destructive border border-destructive/20 transition-all cursor-pointer"
						>
							<LogOut className="w-3.5 h-3.5" />
							Reset (Guest)
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
