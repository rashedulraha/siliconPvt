"use client";

import { Menu, Bell, Search, Lock, Unlock, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { ModeToggle } from "../theme-toggle";
import { useAdminEditor } from "@/context/AdminEditorContext";

interface AdminHeaderProps {
	title: string;
	description?: string;
	onMenuClick: () => void;
	userEmail?: string;
}

export function AdminHeader({
	title,
	description,
	onMenuClick,
	userEmail,
}: AdminHeaderProps) {
	const { isEditorUnlocked, unlockEditorMode, lockEditorMode } =
		useAdminEditor();

	return (
		<header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-md border-border/80">
			<div className="flex h-16 items-center gap-4 px-4 md:px-6">
				<Button
					variant="ghost"
					size="icon"
					className="lg:hidden"
					onClick={onMenuClick}
					aria-label="Open menu"
				>
					<Menu className="h-5 w-5" />
				</Button>

				<div className="flex-1 text-left">
					<h1 className="text-xl font-bold font-heading tracking-tight text-foreground">
						{title}
					</h1>
					{description && (
						<p className="text-xs text-muted-foreground hidden sm:block font-light">
							{description}
						</p>
					)}
				</div>

				{/* ── EDITOR MODE UNLOCK BUTTON ── */}
				{isEditorUnlocked ? (
					<button
						onClick={lockEditorMode}
						className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-xs"
					>
						<Unlock className="w-3.5 h-3.5 animate-pulse" />
						<span>Editor Unlocked</span>
					</button>
				) : (
					<button
						onClick={unlockEditorMode}
						className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold font-heading uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-md"
					>
						<Lock className="w-3.5 h-3.5" />
						<span>Unlock Editor Mode</span>
					</button>
				)}

				<ModeToggle />

				<Avatar className="h-9 w-9 border border-border/80">
					<AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
						AD
					</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
