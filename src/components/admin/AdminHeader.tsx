"use client";

import { Menu, Bell, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";

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
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground hidden sm:block">
              {description}
            </p>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-64" />
          </div>
        </div>

        {userEmail && (
          <span className="text-sm text-muted-foreground hidden md:block">
            {userEmail}
          </span>
        )}

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <ThemeToggle />

        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
