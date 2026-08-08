import { SectionContainer } from "@/components/layout/SectionContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<SectionContainer className="py-8">
			<Skeleton className="h-4 w-40 mb-6" />
			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<Skeleton className="aspect-[16/9] w-full rounded-xl" />
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-6 w-1/2" />
					<div className="grid grid-cols-4 gap-3">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-20" />
						))}
					</div>
					<Skeleton className="h-40" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-32" />
					<Skeleton className="h-64" />
				</div>
			</div>
		</SectionContainer>
	);
}
