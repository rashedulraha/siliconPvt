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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useLeads } from "@/hooks/useLeads";
import { formatDate } from "@/lib/utils";
import type { Lead } from "@/types";

const ITEMS_PER_PAGE = 10;

export default function LeadsPage() {
  const { leads, stats, updateLeadStatus, deleteLead } = useLeads();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    // Reset page whenever filters change
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

  // Reset to page 1 when filters/search change by deriving page from filtered length
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedLeads = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusFilterChange(value: string) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

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
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by name, email, or message..."
                className="pl-9"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}>
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
                {paginatedLeads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    data-lead-row="true"
                    className="cursor-pointer"
                    onClick={() => setSelectedLead(lead)}>
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                data-page={pageNum}
                variant={safePage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}>
                {pageNum}
              </Button>
            ),
          )}
        </div>
      )}

      {/* Lead Detail Sheet */}
      <Sheet
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent side="right" className="overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  {selectedLead.name}
                </SheetTitle>
              </SheetHeader>

              <div className="px-4 pb-6 space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      {selectedLead.email}
                    </a>
                    {selectedLead.phone && (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        {selectedLead.phone}
                      </a>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Message
                  </h3>
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Date</p>
                      <p>{formatDate(selectedLead.createdAt)}</p>
                    </div>
                    {selectedLead.propertyId && (
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Property ID
                        </p>
                        <p className="truncate">{selectedLead.propertyId}</p>
                      </div>
                    )}
                    {selectedLead.jobId && (
                      <div>
                        <p className="text-muted-foreground text-xs">Job ID</p>
                        <p className="truncate">{selectedLead.jobId}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Update Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["new", "contacted", "qualified", "closed"] as const
                    ).map((s) => (
                      <Button
                        key={s}
                        variant={
                          selectedLead.status === s ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          updateLeadStatus(selectedLead.id, s);
                          setSelectedLead({ ...selectedLead, status: s });
                        }}
                        className="capitalize">
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

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
