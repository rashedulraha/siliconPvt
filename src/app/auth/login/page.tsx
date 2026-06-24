"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950 px-4 py-16 rounded-xl">
      <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-md p-6 sm:p-8 text-left space-y-6">
        <LoginForm />
        
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