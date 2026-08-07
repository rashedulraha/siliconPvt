"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Home as HomeIcon,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/admin/StatCard";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { useProperties } from "@/hooks/useProperties";
import { useLeads } from "@/hooks/useLeads";
import { useTeam } from "@/hooks/useTeam";
import { useBlog } from "@/hooks/useBlog";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const { properties, stats: propStats } = useProperties();
  const { leads, stats: leadStats } = useLeads();
  const { team } = useTeam();
  const { posts } = useBlog();

  const totalRevenue = useMemo(() => {
    return properties
      .filter((p) => p.status === "sold" || p.status === "rented")
      .reduce((sum, p) => sum + p.price, 0);
  }, [properties]);

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // Simple bar chart data (properties by category)
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [properties]);

  const maxCategory = Math.max(...categoryData.map((d) => d.value), 1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* ── 1. Welcome Banner (Premium Control Plate) ── */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 dark:bg-neutral-900/60 p-6 md:p-8 border border-neutral-800 dark:border-neutral-800/40 text-white shadow-xs">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-primary text-[10px] font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Administrative Portal
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              Welcome back, Admin 👋
            </h2>
            <p className="text-neutral-300 text-sm font-light max-w-xl">
              Inspect properties, manage client leads, and customize content dynamically.
            </p>
          </div>
          <Button asChild variant="default" className="bg-white text-neutral-950 hover:bg-neutral-100 border border-transparent shadow-xs transition-all duration-300 rounded-xl h-11 px-6 font-medium text-xs tracking-wider uppercase shrink-0 self-start sm:self-auto cursor-pointer">
            <Link href="/admin/inventory">
              <Building2 className="h-4 w-4 mr-2" /> Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Admin Management Control Modules ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/manage-slides"
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-all text-left space-y-1 block">
          <span className="text-xs font-mono font-medium text-primary block">PAGE 13</span>
          <h3 className="text-base font-semibold font-heading text-foreground">Slider & Banner Manager</h3>
          <p className="text-xs text-muted-foreground font-light">Edit home hero carousel images & title headlines.</p>
        </Link>

        <Link
          href="/admin/site-settings"
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-all text-left space-y-1 block">
          <span className="text-xs font-mono font-medium text-primary block">PAGE 14</span>
          <h3 className="text-base font-semibold font-heading text-foreground">Site Content & Settings</h3>
          <p className="text-xs text-muted-foreground font-light">Edit corporate address, hotlines, email, and weekend hours.</p>
        </Link>

        <Link
          href="/admin/manage-content"
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-all text-left space-y-1 block">
          <span className="text-xs font-mono font-medium text-primary block">PAGE 15</span>
          <h3 className="text-base font-semibold font-heading text-foreground">Team & Content Manager</h3>
          <p className="text-xs text-muted-foreground font-light">Update Chairman/MD speeches and plot project blocks.</p>
        </Link>
      </div>

      {/* ── 2. Stats Grid (Conforming Box Alignment) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          label="Total Properties"
          value={propStats.total}
          icon={Building2}
          trend={{ value: "12% this month", positive: true }}
        />
        <StatCard
          label="Active Leads"
          value={leadStats.total}
          icon={Users}
          trend={{ value: `${leadStats.new} new`, positive: true }}
        />
        <StatCard
          label="Available Units"
          value={propStats.available}
          icon={HomeIcon}
          trend={{
            value: `${propStats.forSale} sale / ${propStats.forRent} rent`,
            positive: true,
          }}
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend={{ value: "Closed deals", positive: true }}
        />
      </div>

      {/* ── 3. Charts & Analytics Grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category bar chart */}
        <Card className="lg:col-span-2 border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
          <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-900/60 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground">Properties by Category</CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-light">
                Distribution metrics of listings across Dhaka
              </CardDescription>
            </div>
            <TrendingUp className="h-4.5 w-4.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-6">
            {categoryData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm font-light">
                No properties yet.
              </div>
            ) : (
              <div className="space-y-5">
                {categoryData.map((d) => (
                  <div key={d.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                      <span className="text-foreground/90">{d.name}</span>
                      <span className="text-muted-foreground font-mono text-sm">{d.value}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(d.value / maxCategory) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats Panel */}
        <Card className="border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
          <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-900/60">
            <CardTitle className="text-base font-bold text-foreground">Quick Stats</CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-light">System inventory totals</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs font-medium">
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Blog Posts</span>
              <span className="font-bold text-foreground font-mono">{posts.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Team Members</span>
              <span className="font-bold text-foreground font-mono">{team.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">New Leads</span>
              <span className="font-bold text-accent font-mono">{leadStats.new}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Qualified Leads</span>
              <span className="font-bold text-primary font-mono">{leadStats.qualified}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Closed Deals</span>
              <span className="font-bold text-accent font-mono">{leadStats.closed}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 4. Recent Activity Lists ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900/60">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Mail className="h-4.5 w-4.5 text-primary" />
                Recent Inquiries
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-light">Client submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted text-xs cursor-pointer">
              <Link href="/admin/leads" className="flex items-center gap-1">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {recentLeads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm font-light">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between gap-4 border-b border-border/20 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                          {lead.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Properties */}
        <Card className="border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs rounded-2xl bg-card overflow-hidden text-left">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900/60">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <HomeIcon className="h-4.5 w-4.5 text-primary" />
                Recent Listings
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-light">Lately created plots &amp; flats</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted text-xs cursor-pointer">
              <Link href="/admin/inventory" className="flex items-center gap-1">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {recentProperties.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm font-light">
                No properties in inventory.
              </div>
            ) : (
              <div className="space-y-4">
                {recentProperties.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 border-b border-border/20 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-11 w-11 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/40">
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <HomeIcon className="h-4.5 w-4.5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-semibold text-foreground truncate">{p.title}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(p.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize text-[9px] font-semibold border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded bg-muted/40 text-neutral-800 dark:text-neutral-200">
                      {p.type}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
