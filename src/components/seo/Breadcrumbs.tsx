import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbsJsonLd } from "./JsonLd";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	const fullItems = [{ label: "Home", href: "/" }, ...items];

	return (
		<>
			<BreadcrumbsJsonLd
				items={fullItems.map((item) => ({
					name: item.label,
					url:
						typeof window !== "undefined"
							? `${window.location.origin}${item.href || ""}`
							: item.href || "",
				}))}
			/>
			<nav aria-label="Breadcrumb" className="border-b bg-muted/30">
				<SectionContainer className="py-3">
					<ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
						{fullItems.map((item, i) => (
							<li key={i} className="flex items-center gap-1.5">
								{i > 0 && (
									<ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
								)}
								{i === 0 ? (
									<Home className="h-3.5 w-3.5" aria-hidden="true" />
								) : null}
								{item.href ? (
									<Link
										href={item.href}
										className="hover:text-foreground transition-colors"
									>
										{item.label}
									</Link>
								) : (
									<span
										className="text-foreground font-medium"
										aria-current="page"
									>
										{item.label}
									</span>
								)}
							</li>
						))}
					</ol>
				</SectionContainer>
			</nav>
		</>
	);
}
