"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TooltipProvider } from "@/components/ui/tooltip";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Dashboard",
    description: "Overview of your real estate business",
  },
  "/admin/inventory": {
    title: "Inventory",
    description: "Manage your property listings",
  },
  "/admin/leads": {
    title: "Leads",
    description: "Track and manage client inquiries",
  },
  "/admin/menu": {
    title: "Menu Builder",
    description: "Customize your site navigation",
  },
  "/admin/theme": {
    title: "Theme",
    description: "Customize colors and typography",
  },
  "/admin/seo": { title: "SEO", description: "Manage meta tags for each page" },
  "/admin/media": {
    title: "Media Library",
    description: "Upload and manage images",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const meta = pageMeta[pathname] || { title: "Admin", description: "" };

  return (
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
          />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
