"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Menu as MenuIcon,
  Palette,
  Search,
  Image as ImageIcon,
  Briefcase,
  Home as HomeIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/menu", label: "Menu", icon: MenuIcon },
  { href: "/admin/theme", label: "Theme", icon: Palette },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

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
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform lg:translate-x-0 lg:static",
          open ? "translate-x-0" : "-translate-x-full",
        )}>
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HomeIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-none">
                EstateHub
              </p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
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
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            <Separator className="my-4" />

            <p className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Quick Access
            </p>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Briefcase className="h-4 w-4" />
              View Public Site
            </Link>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
