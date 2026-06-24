"use client";

import React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-secondary/40 to-teal-light/30">
      {/* Ambient blobs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-teal/6 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-primary/12 border border-primary/20 flex items-center justify-center group-hover:bg-primary/18 transition-all">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-heading font-bold text-foreground text-lg block leading-tight">Silicon Real Estate</span>
              <span className="text-xs text-muted-foreground">Your Trusted Partner</span>
            </div>
          </Link>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-3xl p-7 shadow-soft-md bg-card/75 border border-border/80 backdrop-blur-md">
          <RegisterForm />
          <div className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:text-primary/70 transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Access Matrix Rule Badge */}
        <div className="pt-4 border-t border-border/60 text-[10px] text-muted-foreground flex items-center justify-center gap-4 font-light select-none">
          <span>🔒 Cryptographic Pipeline</span>
          <span className="w-px h-2.5 bg-border" />
          <span>RBAC Scope V2</span>
        </div>
      </div>
    </div>
  );
}
