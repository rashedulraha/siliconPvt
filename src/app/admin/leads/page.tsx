"use client";

import { useState, useMemo } from "react";
import {
	Mail,
	Phone,
	Trash2,
	Search,
	MessageSquare,
	Users,
	CheckCircle2,
	Clock,
	ShieldCheck,
	ArrowUpRight,
	Calendar,
	Filter,
	Sparkles,
} from "lucide-react";
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

	const statCards = [
		{
			label: "Total Inquiries",
			value: stats.total,
			icon: Users,
			color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
		},
		{
			label: "New Leads",
			value: stats.new,
			icon: Mail,
			color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
			pulse: stats.new > 0,
		},
		{
			label: "Contacted",
			value: stats.contacted,
			icon: Phone,
			color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
		},
		{
			label: "Qualified",
			value: stats.qualified,
			icon: CheckCircle2,
			color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
		},
		{
			label: "Closed Deals",
			value: stats.closed,
			icon: ShieldCheck,
			color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
		},
	];

	return (
		<div className="space-y-6 max-w-7xl mx-auto text-left font-roboto">
			{/* ── 1. STAT CARDS ── */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
				{statCards.map((s) => {
					const Icon = s.icon;
					return (
						<div
							key={s.label}
							className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all space-y-2 group"
						>
							<div className="flex items-center justify-between">
								<span className="text-[11px] font-medium text-muted-foreground uppercase font-heading tracking-wider">
									{s.label}
								</span>
								<div
									className={`w-7 h-7 rounded-lg flex items-center justify-center border ${s.color}`}
								>
									<Icon className="w-3.5 h-3.5" />
								</div>
							</div>
							<div className="flex items-baseline gap-2">
								<p className="text-2xl font-semibold font-heading text-foreground">
									{s.value}
								</p>
								{s.pulse && (
									<span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* ── 2. SEARCH & FILTER CONTROLS ── */}
			<div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
				<div className="flex flex-col sm:flex-row items-center gap-3">
					<div className="relative flex-1 w-full">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							value={search}
							onChange={(e) => handleSearchChange(e.target.value)}
							placeholder="Search inquiries by name, email, or message keyword..."
							className="pl-10 h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm font-light"
						/>
					</div>
					<div className="w-full sm:w-56 shrink-0">
						<Select
							value={statusFilter}
							onValueChange={handleStatusFilterChange}
						>
							<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold font-heading">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Inquiries ({stats.total})
								</SelectItem>
								<SelectItem value="new">New ({stats.new})</SelectItem>
								<SelectItem value="contacted">
									Contacted ({stats.contacted})
								</SelectItem>
								<SelectItem value="qualified">
									Qualified ({stats.qualified})
								</SelectItem>
								<SelectItem value="closed">Closed ({stats.closed})</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* ── 3. DATA TABLE / LEADS LIST ── */}
			<div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs">
				{filtered.length === 0 ? (
					<div className="text-center py-16 px-4 space-y-3">
						<div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center mx-auto text-muted-foreground">
							<MessageSquare className="h-6 w-6" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-semibold font-heading text-foreground">
								No Customer Inquiries Found
							</p>
							<p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
								{search || statusFilter !== "all"
									? "Try clearing your search keyword or changing the status filter to see other results."
									: "When customers submit contact forms or book site visits, they will show up here live."}
							</p>
						</div>
					</div>
				) : (
					<>
						<Table>
							<TableHeader className="bg-muted/40 border-b border-border/60">
								<TableRow className="hover:bg-transparent">
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase py-3.5 pl-5">
										Customer Name
									</TableHead>
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase hidden md:table-cell">
										Contact Details
									</TableHead>
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase hidden lg:table-cell">
										Inquiry Message
									</TableHead>
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase">
										Lead Status
									</TableHead>
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase hidden sm:table-cell">
										Date Received
									</TableHead>
									<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase text-right pr-5">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="divide-y divide-border/40">
								{paginatedLeads.map((lead) => (
									<TableRow
										key={lead.id}
										data-lead-row="true"
										className="cursor-pointer hover:bg-muted/30 transition-colors"
										onClick={() => setSelectedLead(lead)}
									>
										<TableCell className="py-3.5 pl-5">
											<div className="flex items-center gap-3">
												<div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-xs border border-primary/20 shrink-0">
													{lead.name.charAt(0).toUpperCase()}
												</div>
												<div className="min-w-0">
													<p className="font-medium text-sm text-foreground truncate">
														{lead.name}
													</p>
													<p className="text-xs text-muted-foreground md:hidden truncate font-light">
														{lead.email}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell py-3.5">
											<div className="space-y-0.5">
												<p className="text-xs font-medium text-foreground">
													{lead.email}
												</p>
												{lead.phone && (
													<p className="text-[11px] text-muted-foreground font-mono">
														{lead.phone}
													</p>
												)}
											</div>
										</TableCell>
										<TableCell className="hidden lg:table-cell max-w-xs py-3.5">
											<p className="truncate text-xs text-muted-foreground font-light">
												{lead.message || "—"}
											</p>
										</TableCell>
										<TableCell className="py-3.5">
											<LeadStatusBadge status={lead.status} />
										</TableCell>
										<TableCell className="hidden sm:table-cell text-xs text-muted-foreground font-mono py-3.5">
											{formatDate(lead.createdAt)}
										</TableCell>
										<TableCell className="text-right py-3.5 pr-5">
											<div
												className="flex items-center justify-end gap-1"
												onClick={(e) => e.stopPropagation()}
											>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-lg"
													onClick={() => setDeleteId(lead.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{/* Pagination Controls */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground font-mono">
								<span>
									Showing {(safePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
									{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of{" "}
									{filtered.length} inquiries
								</span>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										className="h-8 px-3 rounded-lg text-xs"
										disabled={safePage <= 1}
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									>
										Previous
									</Button>
									<span className="px-2 font-medium text-foreground">
										{safePage} / {totalPages}
									</span>
									<Button
										variant="outline"
										size="sm"
										className="h-8 px-3 rounded-lg text-xs"
										disabled={safePage >= totalPages}
										onClick={() =>
											setCurrentPage((p) => Math.min(totalPages, p + 1))
										}
									>
										Next
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* ── 4. LEAD DETAIL SHEET ── */}
			<Sheet
				open={Boolean(selectedLead)}
				onOpenChange={(open) => !open && setSelectedLead(null)}
			>
				<SheetContent className="sm:max-w-md space-y-6 font-roboto">
					<SheetHeader className="text-left border-b border-border/50 pb-4">
						<SheetTitle className="font-heading text-lg font-semibold">
							Inquiry Details
						</SheetTitle>
					</SheetHeader>

					{selectedLead && (
						<div className="space-y-5 text-left text-xs sm:text-sm">
							<div className="space-y-1">
								<span className="text-[11px] font-mono text-muted-foreground uppercase">
									Lead Name
								</span>
								<p className="font-semibold text-base text-foreground">
									{selectedLead.name}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<span className="text-[11px] font-mono text-muted-foreground uppercase">
										Email
									</span>
									<a
										href={`mailto:${selectedLead.email}`}
										className="block font-medium text-primary hover:underline"
									>
										{selectedLead.email}
									</a>
								</div>
								<div className="space-y-1">
									<span className="text-[11px] font-mono text-muted-foreground uppercase">
										Phone
									</span>
									<a
										href={`tel:${selectedLead.phone}`}
										className="block font-medium text-foreground hover:underline"
									>
										{selectedLead.phone || "—"}
									</a>
								</div>
							</div>

							<div className="space-y-1.5">
								<span className="text-[11px] font-mono text-muted-foreground uppercase">
									Change Status
								</span>
								<Select
									value={selectedLead.status}
									onValueChange={(val) => {
										updateLeadStatus(selectedLead.id, val as any);
										setSelectedLead((prev) =>
											prev ? { ...prev, status: val as any } : null,
										);
									}}
								>
									<SelectTrigger className="h-10 rounded-xl bg-background border-border/80">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="new">New</SelectItem>
										<SelectItem value="contacted">Contacted</SelectItem>
										<SelectItem value="qualified">Qualified</SelectItem>
										<SelectItem value="closed">Closed</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-1.5">
								<span className="text-[11px] font-mono text-muted-foreground uppercase">
									Customer Message
								</span>
								<div className="p-4 rounded-xl bg-muted/40 border border-border/60 leading-relaxed font-light whitespace-pre-wrap">
									{selectedLead.message || "No message body provided."}
								</div>
							</div>

							<div className="space-y-1 text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/50">
								<span>Received: {formatDate(selectedLead.createdAt)}</span>
							</div>
						</div>
					)}
				</SheetContent>
			</Sheet>

			{/* ── 5. CONFIRM DELETE MODAL ── */}
			<ConfirmDialog
				open={Boolean(deleteId)}
				onOpenChange={(open) => !open && setDeleteId(null)}
				title="Delete Inquiry"
				description="Are you sure you want to delete this customer inquiry? This action cannot be undone."
				confirmText="Delete"
				onConfirm={() => {
					if (deleteId) {
						deleteLead(deleteId);
						setDeleteId(null);
					}
				}}
			/>
		</div>
	);
}
