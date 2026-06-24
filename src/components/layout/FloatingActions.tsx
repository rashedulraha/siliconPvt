"use client";

import { MessageCircle, Heart, GitCompare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useComparison } from "@/hooks/useComparison";
import { PropertyCompareBar } from "@/components/property/PropertyCompareBar";
import { useCMS } from "@/context/CMSContext";
import Link from "next/link";

export function FloatingActions() {
  const { state } = useCMS();
  const { count: favCount } = useFavorites();
  const { count: compareCount } = useComparison();

  // Derive the contact phone: CMS value takes priority, env var is the fallback
  const contactPhone =
    state.siteSettings.contactPhone ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  // Strip all non-digit characters for the wa.me URL
  const digits = contactPhone ? contactPhone.replace(/\D/g, "") : "";

  const whatsappUrl = `https://wa.me/${digits}?text=Hello%2C%20I%20am%20interested%20in%20your%20properties.`;

  return (
    <>
      {/* Compare bar at bottom */}
      <PropertyCompareBar />

      {/* Floating action buttons (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {/* Favorites shortcut */}
        <AnimatePresence>
          {favCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}>
              <Button
                asChild
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-background hover:bg-muted border"
                aria-label="View favorites">
                <Link href="/favorites">
                  <Heart className="h-5 w-5 text-destructive fill-destructive" />
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs bg-destructive text-destructive-foreground border-0">
                    {favCount}
                  </Badge>
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compare shortcut */}
        <AnimatePresence>
          {compareCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}>
              <Button
                asChild
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                aria-label="Compare properties">
                <Link href="/compare">
                  <GitCompare className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs bg-secondary text-secondary-foreground border-0">
                    {compareCount}
                  </Badge>
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp button — only rendered when a phone number is available */}
        {digits && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-14 w-14 rounded-full bg-whatsapp hover:bg-whatsapp/85 text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group"
            aria-label="Chat on WhatsApp">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-background px-3 py-1.5 text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with us
            </span>
          </motion.a>
        )}
      </div>
    </>
  );
}
