"use client";

import { GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparison } from "@/hooks/useComparison";
import { cn } from "@/lib/utils";

interface CompareCheckboxProps {
  propertyId: string;
  className?: string;
}

export function CompareCheckbox({
  propertyId,
  className,
}: CompareCheckboxProps) {
  const { isCompared, toggleCompare, count, limit, isHydrated } =
    useComparison();
  const compared = isHydrated ? isCompared(propertyId) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(propertyId);
    if (!result.success && result.message) {
      alert(result.message);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        "rounded-full transition-all",
        compared
          ? "bg-primary/10 text-primary hover:bg-primary/20"
          : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-background",
        className,
      )}
      aria-label={compared ? "Remove from comparison" : "Add to comparison"}
      title={
        compared
          ? "Remove from comparison"
          : `Add to comparison (${count}/${limit})`
      }>
      <GitCompare className="h-4 w-4" />
    </Button>
  );
}
