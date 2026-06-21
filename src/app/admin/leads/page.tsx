"use client";

import { useState, useMemo } from "react";
import { Mail, Phone, Trash2, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useLeads } from "@/hooks/useLeads";
import { formatDate } from "@/lib/utils";
import type { Lead } from "@/types";

export default function LeadsPage() {
  const { leads, stats, updateLeadStatus, deleteLead } = useLeads();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...leads];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.message.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "all")
      result = result.filter((l) => l.status === statusFilter);
    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [leads, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-muted" },
          {
            label: "New",
            value: stats.new,
            color: "bg-blue-500/10 text-blue-600",
          },
          {
            label: "Contacted",
            value: stats.contacted,
            color: "bg-amber-500/10 text-amber-600",
          },
          {
            label: "Qualified",
            value: stats.qualified,
            color: "bg-purple-500/10 text-purple-600",
          },
          {
            label: "Closed",
            value: stats.closed,
            color: "bg-green-500/10 text-green-600",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground font-medium">
                {s.label}
              </p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or message..."
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No leads found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Contact
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Message
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <>
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-0.5">
                          <p className="text-sm">{lead.email}</p>
                          {lead.phone && (
                            <p className="text-xs text-muted-foreground">
                              {lead.phone}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-xs">
                        <p className="truncate text-sm text-muted-foreground">
                          {lead.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <LeadStatusBadge status={lead.status} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(lead.id);
                            }}
                            className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedId === lead.id && (
                      <TableRow key={`${lead.id}-expanded`}>
                        <TableCell colSpan={6} className="bg-muted/30">
                          <div className="p-4 space-y-3">
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs mb-1">
                                  Email
                                </p>
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="flex items-center gap-1.5 hover:text-primary">
                                  <Mail className="h-3.5 w-3.5" /> {lead.email}
                                </a>
                              </div>
                              {lead.phone && (
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">
                                    Phone
                                  </p>
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="flex items-center gap-1.5 hover:text-primary">
                                    <Phone className="h-3.5 w-3.5" />{" "}
                                    {lead.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs mb-1">
                                Message
                              </p>
                              <p className="text-sm whitespace-pre-line">
                                {lead.message}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs mb-2">
                                Update Status
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {(
                                  [
                                    "new",
                                    "contacted",
                                    "qualified",
                                    "closed",
                                  ] as const
                                ).map((s) => (
                                  <Button
                                    key={s}
                                    variant={
                                      lead.status === s ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => updateLeadStatus(lead.id, s)}
                                    className="capitalize">
                                    {s}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Lead"
        description="Are you sure you want to delete this lead? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => {
          if (deleteId) deleteLead(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
