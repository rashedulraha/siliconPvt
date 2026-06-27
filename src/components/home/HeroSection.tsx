"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Landmark, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroStats = [
  { value: "25+", label: "Projects Delivered" },
  { value: "1,500+", label: "Happy Clients" },
  { value: "800+", label: "Acres Developed" },
];

const trustBadges = [
  { icon: Shield, label: "RAJUK Approved" },
  { icon: Landmark, label: "Bank Partnered" },
  { icon: CheckCircle, label: "Zero Hidden Costs" },
];

export function HeroSection() {
  return (
    <section className="relative w-full text-foreground py-8 md:py-16 overflow-hidden bg-transparent">
      
      {/* ── Outer Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        
        {/* ── Apple Premium Device Frame ── */}
        <div className="relative w-full rounded-[38px] p-1.5 border border-neutral-200/40 dark:border-white/10 bg-neutral-100/50 dark:bg-neutral-900/10 backdrop-blur-3xl shadow-2xl transition-all duration-500">
          
          <div className="relative w-full rounded-[32px] overflow-hidden bg-neutral-950 min-h-[640px] sm:min-h-[680px] lg:min-h-[740px] flex items-center justify-center">
            
            {/* 1. Local Public Drone Video Component */}
            <video
              src="/siliconpvtvideo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 scale-100"
            />
            
            {/* 2. Full-Frame Opacity Mask & Blur (Increases Text Readability) */}
            <div className="absolute inset-0 z-10 bg-black/55 backdrop-blur-[1px] pointer-events-none" />

            {/* 3. Floating Live Indicator Token */}
            <div className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center gap-2 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-semibold tracking-widest uppercase text-neutral-200">
                Live Drone Scan
              </span>
            </div>

            {/* 4. Inside Centered Content Elements */}
            <div className="relative z-20 w-full max-w-4xl px-6 sm:px-12 lg:px-16 py-16 flex flex-col items-center text-center space-y-10 text-white">
              
              {/* Identity Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/10 text-neutral-200">
                  Silicon Real Estate (Pvt.) Ltd.
                </span>
              </motion.div>

              {/* Apple Minimalist Typography */}
              <div className="space-y-4 max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight leading-[1.1]"
                >
                  Build Your Legacy <br />
                  <span className="font-light bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 bg-clip-text text-transparent">on Verified Land.</span>
                </motion.h1>

                {/* Description Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-neutral-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
                >
                  Secure, fully-documented premium plots with 100% transparent deeds in prime Dhaka corridors. 
                  Plan your future in master-planned communities designed around real growth.
                </motion.p>
              </div>

              {/* Symmetric Micro Trust Badges Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap justify-center gap-3"
              >
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-neutral-200 text-xs font-light tracking-wide"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-300" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Centered Action Matrix Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              >
                <Link href="/properties" className="w-full sm:w-auto">
                  <Button variant="default" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl font-medium text-xs tracking-widest uppercase bg-white text-neutral-950 hover:bg-neutral-100 border border-transparent shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out cursor-pointer group">
                    Explore Plots <ArrowRight className="h-3.5 w-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl font-medium text-xs tracking-widest uppercase bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all duration-300 ease-out cursor-pointer">
                    <Phone className="h-3.5 w-3.5 mr-2" /> Contact Advisors
                  </Button>
                </Link>
              </motion.div>

              {/* Symmetric Bottom Stats Array */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="grid grid-cols-3 gap-8 sm:gap-20 pt-8 border-t border-white/10 w-full max-w-2xl justify-center mt-8"
              >
                {heroStats.map(({ value, label }) => (
                  <div key={label} className="space-y-1.5">
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
                      {value}
                    </span>
                    <span className="block text-[9px] font-semibold tracking-widest text-neutral-400 uppercase leading-none">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}