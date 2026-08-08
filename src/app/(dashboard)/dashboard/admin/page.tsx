"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  DollarSign,
  LayoutGrid,
  Settings,
  Eye,
  Menu,
  LogOut,
  Plus,
  Trash2,
  Save,
  Globe,
  FileText,
  Sliders,
  Mail,
  CheckCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme-toggle";

export default function AdminDashboardUI() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for UI display
  const stats = {
    properties: 24,
    activeLeads: 12,
    salesWon: 8,
    totalRevenue: 87500000,
  };

  const leads = [
    {
      id: "lead-1",
      name: "Tanvir Ahmed",
      property: "Silicon Orchard - Plot 5",
      value: 4800000,
      status: "agreement",
    },
    {
      id: "lead-2",
      name: "Farhana Yasmin",
      property: "Silicon Royal Heights - Apt 3C",
      value: 13500000,
      status: "site_visit",
    },
    {
      id: "lead-3",
      name: "Imran Khan",
      property: "Silicon Commercial Square - Plot 12",
      value: 21000000,
      status: "new",
    },
    {
      id: "lead-4",
      name: "Ziaur Rahman",
      property: "Silicon Green Valley - Plot 22",
      value: 3200000,
      status: "contacted",
    },
    {
      id: "lead-5",
      name: "Sadia Chowdhury",
      property: "Silicon Vista - Penthouse 9B",
      value: 42000000,
      status: "won",
    },
  ];

  const properties = [
    {
      id: "prop-1",
      title: "Silicon Orchard - Plot 5",
      location: "Purbachal, Dhaka",
      price: 4800000,
      category: "land",
    },
    {
      id: "prop-2",
      title: "Silicon Royal Heights - Apt 3C",
      location: "Uttara, Dhaka",
      price: 13500000,
      category: "apartment",
    },
    {
      id: "prop-3",
      title: "Silicon Commercial Square - Plot 12",
      location: "Gulshan, Dhaka",
      price: 21000000,
      category: "land",
    },
  ];

  const siteSettings = {
    siteName: "Silicon Real Estate",
    contactPhone: "+880 1234 567890",
    contactEmail: "info@silicon.com",
    address: "Dhaka, Bangladesh",
    businessHours: "Sun–Thu: 9:00 AM – 6:00 PM",
  };

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      new: "bg-amber-500/10 text-amber-700 border-amber-500/20",
      contacted: "bg-sky-500/10 text-sky-700 border-sky-500/20",
      site_visit: "bg-violet-500/10 text-violet-700 border-violet-500/20",
      agreement: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
      won: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    };

    return colors[status] ?? "bg-gray-500/10 text-gray-700 border-gray-500/20";
  }

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = {
      new: "New Lead",
      contacted: "Contacted",
      site_visit: "Site Visit Scheduled",
      agreement: "Agreement / Legal",
      won: "Sale Won",
    };

    return labels[status] ?? status;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/60 shadow-xs h-14 flex items-center px-4 sm:px-6 md:px-8 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4.5 w-4.5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-60 p-4 pt-10 bg-card border-r border-border/50 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                    Management
                  </p>
                  <nav className="space-y-1">
                    {["overview", "leads", "properties", "cms"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                          activeTab === tab
                            ? "bg-primary/8 text-primary shadow-xs"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}>
                        {tab === "overview" && (
                          <LayoutGrid className="w-4 h-4" />
                        )}
                        {tab === "leads" && <Users className="w-4 h-4" />}
                        {tab === "properties" && (
                          <Building2 className="w-4 h-4" />
                        )}
                        {tab === "cms" && <Settings className="w-4 h-4" />}
                        {tab === "overview" && "Overview Dashboard"}
                        {tab === "leads" &&
                          `Client Pipelines (${leads.length})`}
                        {tab === "properties" &&
                          `Land & Flat Inventory (${properties.length})`}
                        {tab === "cms" && "Visual CMS Settings"}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="border-t border-border/60 pt-4">
                  <Link
                    href="/"
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Eye className="w-4 h-4" /> View Public Site
                  </Link>
                </div>
              </div>
              <div className="border-t border-border/60 pt-4 space-y-2">
                <span className="text-[10px] text-muted-foreground block px-2">
                  Session: Admin User
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive h-9 px-3">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-primary/15 bg-background/60 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.03] group-hover:border-primary/30 flex items-center justify-center shrink-0">
              <Image
                src="/silicon.png"
                alt="Logo"
                fill
                priority
                sizes="44px"
                className="object-contain p-[6px] select-none"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
                {siteSettings.siteName}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium leading-none text-muted-foreground">
                Realstate Admin console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Administrator: Admin User
          </span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 h-8">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-8xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-60 bg-card border-r border-border/50 p-4 space-y-2 flex-shrink-0 flex-col">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">
            Management
          </p>
          {["overview", "leads", "properties", "cms"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-primary/8 text-primary shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              {tab === "overview" && <LayoutGrid className="w-4 h-4" />}
              {tab === "leads" && <Users className="w-4 h-4" />}
              {tab === "properties" && <Building2 className="w-4 h-4" />}
              {tab === "cms" && <Settings className="w-4 h-4" />}
              {tab === "overview" && "Overview Dashboard"}
              {tab === "leads" && `Client Pipelines (${leads.length})`}
              {tab === "properties" &&
                `Land & Flat Inventory (${properties.length})`}
              {tab === "cms" && "Visual CMS Settings"}
            </button>
          ))}
          <div className="border-t border-border/60 my-4 pt-4">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
              <Eye className="w-4 h-4" /> View Public Site
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-background">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
                  Overview Dashboard
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Summary statistics of Silicon Real Estate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Properties",
                    value: stats.properties,
                    icon: Building2,
                    color: "text-primary",
                  },
                  {
                    label: "Active Pipelines",
                    value: stats.activeLeads,
                    icon: Users,
                    color: "text-emerald-500",
                  },
                  {
                    label: "Sales Won",
                    value: stats.salesWon,
                    icon: CheckCircle,
                    color: "text-amber-500",
                  },
                  {
                    label: "Total Sales Revenue",
                    value: `৳ ${stats.totalRevenue.toLocaleString("en-IN")}`,
                    icon: DollarSign,
                    color: "text-indigo-500",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="border border-border/50 shadow-xs rounded-xl bg-card">
                    <CardHeader className="p-4 pb-1 flex flex-row items-center justify-between">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </CardHeader>
                    <CardContent className="p-4 pt-1">
                      <div className="text-2xl font-bold text-foreground">
                        {item.value}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {index === 0 && "Ongoing, upcoming, sold"}
                        {index === 1 && "Leads currently in process"}
                        {index === 2 && "Closed deals"}
                        {index === 3 && "From closed leads"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-heading font-semibold text-foreground">
                    Active Client Pipeline Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/40 text-muted-foreground font-semibold uppercase tracking-wider">
                          <th className="p-4">Client Name</th>
                          <th className="p-4">Property</th>
                          <th className="p-4">Value (BDT)</th>
                          <th className="p-4">Stage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors">
                            <td className="p-4 font-semibold text-foreground">
                              {lead.name}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {lead.property}
                            </td>
                            <td className="p-4 font-mono font-medium text-foreground">
                              ৳ {lead.value.toLocaleString("en-IN")}
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[10px] uppercase border ${getStatusColor(
                                  lead.status,
                                )}`}>
                                {getStatusLabel(lead.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* LEADS TAB */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
                  Active Client Pipelines
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage deals and update tracking status for Dhaka-based
                  inquiries.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="border border-border/50 shadow-xs rounded-xl bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          ID: {lead.id}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[10px] uppercase border ${getStatusColor(
                            lead.status,
                          )}`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-heading font-bold text-foreground mt-1">
                        {lead.name}
                      </CardTitle>
                      <CardDescription className="text-xs text-primary font-medium">
                        {lead.property}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-2 text-xs">
                      <div className="border-t border-border/40" />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium text-foreground">
                          +880 1712 345678
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-foreground truncate max-w-[150px]">
                          {lead.name.toLowerCase().replace(" ", ".")}@gmail.com
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Contract Value:
                        </span>
                        <span className="font-semibold text-accent">
                          ৳ {lead.value.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* PROPERTIES TAB */}
          {activeTab === "properties" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
                  Land & Flat Inventory
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add, remove, or view current plots and flat listings in Dhaka.
                </p>
              </div>

              <Card className="border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary" /> Add New Listing
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Property Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Silicon Orchard - Phase 3"
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Price (BDT)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 5200000"
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Purbachal, Dhaka"
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-3 pt-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/95 text-white">
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Listing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-xs rounded-2xl bg-card overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-heading font-semibold text-foreground">
                    Active Listings ({properties.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/40 text-muted-foreground font-semibold uppercase tracking-wider">
                          <th className="p-4">Title</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((prop) => (
                          <tr
                            key={prop.id}
                            className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors">
                            <td className="p-4 font-semibold text-foreground">
                              {prop.title}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {prop.location}
                            </td>
                            <td className="p-4 font-mono font-medium text-foreground">
                              ৳ {prop.price.toLocaleString("en-IN")}
                            </td>
                            <td className="p-4 capitalize">{prop.category}</td>
                            <td className="p-4">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CMS TAB */}
          {activeTab === "cms" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">
                  Visual CMS Editor
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modify main website settings and text fields. Changes
                  dynamically propagate to public routes.
                </p>
              </div>

              <Card className="border-border/50 shadow-xs rounded-2xl bg-card">
                <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-heading font-semibold text-foreground">
                      Site & Contact Configurations
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Update values displayed in header, footer, and contact
                      sections.
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/95 text-white">
                    <Save className="w-3.5 h-3.5 mr-1" /> Save Changes
                  </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Company Site Name
                      </label>
                      <input
                        type="text"
                        value={siteSettings.siteName}
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Contact Hotline Phone
                      </label>
                      <input
                        type="text"
                        value={siteSettings.contactPhone}
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Official Email Address
                      </label>
                      <input
                        type="text"
                        value={siteSettings.contactEmail}
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Business Operating Hours
                      </label>
                      <input
                        type="text"
                        value={siteSettings.businessHours}
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Corporate HQ Address
                      </label>
                      <input
                        type="text"
                        value={siteSettings.address}
                        className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-xs rounded-2xl bg-card">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-heading font-semibold text-foreground">
                    Live Public Page Preview Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2 text-xs">
                  <p className="text-muted-foreground">
                    Click below to navigate directly to the respective pages and
                    view your CMS updates:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { href: "/", label: "Homepage", icon: Globe },
                      { href: "/about", label: "About Us", icon: FileText },
                      { href: "/projects", label: "Projects", icon: Sliders },
                      {
                        href: "/properties",
                        label: "Properties",
                        icon: Building2,
                      },
                      { href: "/contact", label: "Contact", icon: Mail },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        className="border border-border px-3 py-1.5 rounded-lg bg-background hover:bg-muted flex items-center gap-1.5 font-medium">
                        <link.icon className="w-3.5 h-3.5 text-primary" />{" "}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
