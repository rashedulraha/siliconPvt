"use client";

import { Menu, Lock, Unlock, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ModeToggle } from "../theme-toggle";
import { useEditorMode } from "@/context/AdminEditorContext";

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
	const { isEditorMode, openUnlockModal, lockEditorMode, justUnlocked } =
		useEditorMode();

	return (
		<header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-md border-border/80 transition-colors duration-500">
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
					<div className="flex items-center gap-2">
						<h1 className="text-xl font-bold font-heading tracking-tight text-foreground">
							{title}
						</h1>
						{!isEditorMode && (
							<span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1">
								<Eye className="w-3 h-3" /> View Only
							</span>
						)}
					</div>
					{description && (
						<p className="text-xs text-muted-foreground hidden sm:block font-light">
							{description}
						</p>
					)}
				</div>

				{/* ── EDITOR MODE UNLOCK BUTTON ── */}
				{isEditorMode ? (
					<button
						onClick={lockEditorMode}
						className={`px-3.5 py-1.5 rounded-full bg-emerald-500/10 border text-emerald-500 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-xs ${
							justUnlocked
								? "ring-2 ring-emerald-500/50 border-emerald-500 animate-pulse"
								: "border-emerald-500/30"
						}`}
						title="Click to lock Editor Mode and return to View-Only"
					>
						<Unlock className="w-3.5 h-3.5" />
						<span>Editor Mode Active</span>
					</button>
				) : (
					<button
						onClick={openUnlockModal}
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
