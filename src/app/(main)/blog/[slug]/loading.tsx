import { SectionContainer } from "@/components/layout/SectionContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SectionContainer className="py-8 max-w-4xl space-y-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    </SectionContainer>
  );
}
