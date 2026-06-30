"use client";

import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useComparison } from "@/hooks/useComparison";
import { useProperties } from "@/hooks/useProperties";
import { SectionContainer } from "../ui/section-container";

export function PropertyCompareBar() {
  const { items, count, limit, removeCompare, clearAll, isHydrated } =
    useComparison();
  const { getPropertyById } = useProperties();

  if (!isHydrated || count === 0) return null;

  const selectedProperties = items
    .map((i) => getPropertyById(i.propertyId))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-md shadow-2xl">
        <SectionContainer className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Selected items */}
            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {count}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {count === 1 ? "property" : "properties"} to compare
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedProperties.map(
                  (p) =>
                    p && (
                      <div
                        key={p.id}
                        className="flex items-center gap-2 rounded-full border bg-muted/50 pl-1 pr-2 py-1">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-muted flex-shrink-0">
                          {p.images[0] && (
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="text-xs font-medium truncate max-w-[120px]">
                          {p.title}
                        </span>
                        <button
                          onClick={() => removeCompare(p.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ),
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear
              </Button>
              <Button asChild size="sm" disabled={count < 2}>
                <Link href="/compare">
                  Compare
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </motion.div>
    </AnimatePresence>
  );
}
