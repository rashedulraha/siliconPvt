"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  propertyId,
  className,
  size = "md",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();
  const favorited = isHydrated ? isFavorite(propertyId) : false;

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  const iconSize = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
      className={cn(
        "rounded-full transition-all",
        favorited
          ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
          : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-background",
        sizeClasses[size],
        className,
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}>
      <Heart
        className={cn(
          iconSize[size],
          "transition-all",
          favorited && "fill-current",
        )}
      />
    </Button>
  );
}
