"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps page content with a subtle fade + slide animation.
 * Uses pathname as key to trigger on route change.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
