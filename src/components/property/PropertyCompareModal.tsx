"use client";

import { X, Bed, Bath, Maximize, MapPin, Car, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useComparison } from "@/hooks/useComparison";
import { useProperties } from "@/hooks/useProperties";
import { formatCurrency } from "@/lib/utils";

interface PropertyCompareModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function PropertyCompareModal({
	open,
	onOpenChange,
}: PropertyCompareModalProps) {
	const { items, removeCompare } = useComparison();
	const { getPropertyById } = useProperties();

	const properties = items
		.map((i) => getPropertyById(i.propertyId))
		.filter(Boolean);

	if (properties.length === 0) return null;

	const rows = [
		{
			label: "Price",
			getValue: (p: any) => (
				<span className="font-bold text-primary">
					{formatCurrency(p.price)}
					{p.type === "rent" && (
						<span className="text-xs text-muted-foreground">/mo</span>
					)}
				</span>
			),
		},
		{
			label: "Location",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<MapPin className="h-3.5 w-3.5" /> {p.location}
				</span>
			),
		},
		{
			label: "Type",
			getValue: (p: any) => (
				<Badge variant="outline" className="capitalize">
					{p.type === "sale" ? "For Sale" : "For Rent"}
				</Badge>
			),
		},
		{
			label: "Category",
			getValue: (p: any) => <span className="capitalize">{p.category}</span>,
		},
		{
			label: "Bedrooms",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<Bed className="h-3.5 w-3.5" /> {p.bedrooms}
				</span>
			),
		},
		{
			label: "Bathrooms",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<Bath className="h-3.5 w-3.5" /> {p.bathrooms}
				</span>
			),
		},
		{
			label: "Area",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<Maximize className="h-3.5 w-3.5" /> {p.area.toLocaleString()} ft²
				</span>
			),
		},
		{
			label: "Garage",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<Car className="h-3.5 w-3.5" />{" "}
					{p.garage ? `${p.garage} Cars` : "N/A"}
				</span>
			),
		},
		{
			label: "Year Built",
			getValue: (p: any) => (
				<span className="flex items-center gap-1">
					<Calendar className="h-3.5 w-3.5" /> {p.yearBuilt || "N/A"}
				</span>
			),
		},
		{
			label: "Features",
			getValue: (p: any) => (
				<div className="flex flex-wrap gap-1">
					{p.features.slice(0, 4).map((f: string, i: number) => (
						<Badge key={i} variant="secondary" className="text-xs">
							{f}
						</Badge>
					))}
					{p.features.length > 4 && (
						<Badge variant="outline" className="text-xs">
							+{p.features.length - 4} more
						</Badge>
					)}
				</div>
			),
		},
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
				<DialogHeader>
					<DialogTitle>Compare Properties</DialogTitle>
				</DialogHeader>

				<ScrollArea className="flex-1 pr-4">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr>
									<th className="text-left p-3 text-sm font-medium text-muted-foreground w-32">
										Feature
									</th>
									{properties.map(
										(p) =>
											p && (
												<th key={p.id} className="p-3 min-w-[200px]">
													<div className="space-y-2">
														<div className="relative aspect-video rounded-md overflow-hidden bg-muted">
															{p.images[0] && (
																<img
																	src={p.images[0]}
																	alt=""
																	className="w-full h-full object-cover"
																/>
															)}
														</div>
														<p className="font-semibold text-sm line-clamp-2">
															{p.title}
														</p>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removeCompare(p.id)}
															className="h-7 text-xs"
														>
															<X className="h-3 w-3 mr-1" /> Remove
														</Button>
													</div>
												</th>
											),
									)}
								</tr>
							</thead>
							<tbody>
								{rows.map((row) => (
									<tr key={row.label} className="border-t">
										<td className="p-3 text-sm font-medium text-muted-foreground">
											{row.label}
										</td>
										{properties.map(
											(p) =>
												p && (
													<td key={p.id} className="p-3 text-sm">
														{row.getValue(p)}
													</td>
												),
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
