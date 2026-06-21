"use client";

import Link from "next/link";
import { GitCompare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { PropertyCompareModal } from "@/components/property/PropertyCompareModal";
import { PageSEO } from "@/components/seo/PageSEO";
import { useComparison } from "@/hooks/useComparison";
import { useState } from "react";

export default function ComparePage() {
  const { count, isHydrated } = useComparison();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      <PageSEO
        title="Compare Properties - EstateHub"
        description="Compare up to 3 properties side by side."
      />

      <Container className="py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/properties">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
          </Link>
        </Button>

        {!isHydrated ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading...
          </div>
        ) : count === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-xl border bg-muted/30">
            <GitCompare className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No Properties to Compare
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Browse properties and click the compare icon to add them here. You
              can compare up to 3 properties at once.
            </p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </motion.div>
        ) : count === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-xl border bg-muted/30">
            <GitCompare className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Add More Properties</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You need at least 2 properties to compare. Add one more to get
              started.
            </p>
            <Button asChild>
              <Link href="/properties">Add More Properties</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Opening comparison view for {count} properties...
            </p>
            <Button asChild>
              <Link href="/properties">Back to Properties</Link>
            </Button>
          </div>
        )}
      </Container>

      {count >= 2 && (
        <PropertyCompareModal open={modalOpen} onOpenChange={setModalOpen} />
      )}
    </>
  );
}
