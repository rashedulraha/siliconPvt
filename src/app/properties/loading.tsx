import { Container } from "@/components/layout/Container";
import { PropertyGridSkeleton } from "@/components/feedback/LoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </Container>
      </section>
      <section className="py-10">
        <Container className="space-y-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <PropertyGridSkeleton />
        </Container>
      </section>
    </>
  );
}
