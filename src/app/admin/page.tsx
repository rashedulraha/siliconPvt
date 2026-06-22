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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-linear-to-br from-primary to-primary/80 p-6 md:p-8 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Welcome back, Admin 👋
            </h2>
            <p className="mt-1 text-primary-foreground/80">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <Button asChild variant="secondary" size="lg">
            <Link href="/admin/inventory">
              <Building2 className="h-4 w-4 mr-2" /> Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          label="Available"
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

      {/* Charts + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Properties by Category</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Distribution of your listings
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No properties yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryData.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium capitalize">
                        {d.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {d.value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(d.value / maxCategory) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Blog Posts</span>
              <span className="font-semibold">{posts.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">
                Team Members
              </span>
              <span className="font-semibold">{team.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">New Leads</span>
              <span className="font-semibold text-accent">{leadStats.new}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Qualified</span>
              <span className="font-semibold text-primary">
                {leadStats.qualified}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Closed</span>
              <span className="font-semibold text-accent">
                {leadStats.closed}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads + Recent Properties */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" /> Recent Leads
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/leads">
                View all <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No leads yet. They&apos;ll appear here when clients submit
                inquiries.
              </div>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {lead.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.email}
                      </p>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" /> Recent Properties
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/inventory">
                View all <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentProperties.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No properties yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentProperties.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {p.images[0] ? (
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <HomeIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(p.createdAt)}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
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
