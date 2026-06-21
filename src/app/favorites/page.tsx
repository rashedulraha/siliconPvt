"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { PageSEO } from "@/components/seo/PageSEO";
import { useFavorites } from "@/hooks/useFavorites";
import { useProperties } from "@/hooks/useProperties";

export default function FavoritesPage() {
  const { favoriteIds, clearAll, count, isHydrated } = useFavorites();
  const { properties } = useProperties();

  const favoriteProperties = properties.filter((p) =>
    favoriteIds.includes(p.id),
  );

  return (
    <>
      <PageSEO
        title="My Favorites - EstateHub"
        description="Properties you've saved for later."
      />

      <Container className="py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                My Favorites
              </h1>
            </div>
            <p className="text-muted-foreground">
              {count} {count === 1 ? "property" : "properties"} saved
            </p>
          </div>
          {count > 0 && (
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" /> Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {!isHydrated ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading...
          </div>
        ) : favoriteProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-xl border bg-muted/30">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start browsing properties and click the heart icon to save your
              favorites here.
            </p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}>
            <PropertyGrid properties={favoriteProperties} />
          </motion.div>
        )}
      </Container>
    </>
  );
}
