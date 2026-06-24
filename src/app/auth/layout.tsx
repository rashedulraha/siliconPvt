"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SkipToContent } from "@/components/feedback/SkipToContent";
import { FloatingSimulator } from "@/components/layout/FloatingSimulator";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Detect if current endpoint is an explicit identity flow route
  const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/register");

  if (isAuthPage) {
    return (
      <>
        <SkipToContent />
        <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_520px] font-sans antialiased selection:bg-neutral-100 text-foreground">
          
          {/* LEFT SIDE PANEL: Luxury Brand Context Panel (Visible on Desktop) */}
          <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-r border-border">
            {/* Soft grid overlay texture line work */}
            <div
              className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            
            {/* Micro Header Branding Token */}
            <div className="relative z-10 flex items-center gap-2">
               <div
                 className="
                   relative
                   h-11 w-11
                   overflow-hidden
                   rounded-xl
                   border border-primary/15
                   bg-background/60
                   backdrop-blur-md
                   transition-all duration-300
                   group-hover:scale-[1.03]
                   group-hover:border-primary/30
                   flex items-center justify-center
                   shrink-0
                 "
               >
                 <Link href="/">
                   <Image
                   src="/silicon.png"
                   alt={`Silicon Logo`}
                   fill
                   priority
                   sizes="44px"
                   className="
                     object-contain
                     p-[px]
                     select-none
                   "
                 />
                 </Link>
               </div>
              <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                Silicon Corporate Network
              </span>
            </div>

            {/* Middle Typographic Context Array */}
            <div className="relative z-10 max-w-md space-y-4 my-auto text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase bg-muted text-muted-foreground border border-border">
                <Star className="w-3 h-3 text-primary fill-primary" />
                Trusted Real Estate Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground leading-[1.15]">
                Manage Your Investments <br />
                <span className="font-medium text-neutral-400 dark:text-neutral-500">with Absolute Legality.</span>
              </h2>
              <div className="w-10 h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                Log in or register your verified dynamic credentials to bypass public tracking schemas and jump straight into secure asset inquiry pipelines.
              </p>
            </div>

            {/* Bottom Footer Regulatory Subtext */}
            <div className="relative z-10 text-[10px] text-muted-foreground/60 font-light">
              &copy; 2026 Silicon Real Estate (Pvt.) Ltd. All registry paths secured.
            </div>
          </div>

          {/* RIGHT SIDE PANEL: Core Dynamic Form Execution Canvas */}
          <main id="main-content" tabIndex={-1} className="flex flex-col justify-center items-center bg-background px-6 py-12 outline-none w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-w-sm"
            >
              {children}
            </motion.div>
          </main>

        </div>
      </>
    );
  }

  // STANDARD VIEW CONTAINER (For fallback public website layouts mapping safely)
  return (
    <>
      <SkipToContent />
      <div className="relative flex min-h-screen flex-col bg-background">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none">
          {children}
        </main>
        <Footer />
      </div>
      <FloatingActions />
      <FloatingSimulator />
      <ScrollToTop />
    </>
  );
}