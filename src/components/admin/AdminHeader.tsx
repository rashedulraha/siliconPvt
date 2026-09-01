"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

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
					<h1 className="text-xl font-bold font-heading tracking-tight text-foreground">
						{title}
					</h1>
					{description && (
						<p className="text-xs text-muted-foreground hidden sm:block font-light">
							{description}
						</p>
					)}
				</div>

				<div className="flex items-center gap-3">
					{userEmail && (
						<span className="text-xs font-mono text-muted-foreground hidden md:inline-block">
							{userEmail}
						</span>
					)}
					<Avatar className="h-9 w-9 border border-border/80">
						<AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
							AD
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
}
