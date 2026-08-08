import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<
	Lead["status"],
	{ label: string; className: string }
> = {
	new: {
		label: "New",
		className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
	},
	contacted: {
		label: "Contacted",
		className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
	},
	qualified: {
		label: "Qualified",
		className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
	},
	closed: {
		label: "Closed",
		className: "bg-green-500/10 text-green-600 border-green-500/20",
	},
};

interface LeadStatusBadgeProps {
	status: Lead["status"];
	className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
	const config = statusConfig[status];
	return (
		<Badge
			variant="outline"
			className={cn("font-medium", config.className, className)}
		>
			{config.label}
		</Badge>
	);
}
