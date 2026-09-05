"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "../ui/avatar";

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
		<header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur-md border-border/80 transition-colors duration-500 font-roboto">
			<div className="flex h-16 items-center gap-4 px-4 md:px-6">
				<Button
					variant="ghost"
					size="icon"
					className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
					onClick={onMenuClick}
					aria-label="Open menu"
				>
					<Menu className="h-5 w-5" />
				</Button>

				<div className="flex-1 text-left">
					<h1 className="text-lg sm:text-xl font-bold font-heading tracking-tight text-foreground">
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
						<div className="hidden md:flex flex-col items-end text-right">
							<span className="text-xs font-semibold font-heading text-foreground">
								Administrator
							</span>
							<span className="text-[11px] font-mono text-muted-foreground">
								{userEmail}
							</span>
						</div>
					)}
					<div className="relative">
						<Avatar className="h-10 w-10 border-2 border-primary/20 shadow-xs cursor-pointer hover:scale-105 transition-all">
							<AvatarImage
								src="/admin-avatar.jpg"
								alt="Admin Profile Photo"
								className="object-cover"
							/>
							<AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
								AD
							</AvatarFallback>
							<AvatarBadge className="bg-emerald-500 size-2.5 ring-2 ring-card" />
						</Avatar>
					</div>
				</div>
			</div>
		</header>
	);
}
