"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import { Eye, EyeOff, Loader2, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/auth";

export default function LoginForm() {
  const router = useRouter();
  const { isLoggedIn, user, login, isLoading } = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle post-auth redirect if already logged in
  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      if (user.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [isLoggedIn, user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const isDemoAdmin = email.trim().toLowerCase().includes("admin");
    const role: UserRole = isDemoAdmin ? "admin" : "user";

    const mockUserData = {
      uid: role === "admin" ? "admin-99" : "user-45",
      name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.trim(),
      role: role,
    };

    try {
      login(mockUserData);
      toast.success(`Authenticated securely as ${role === "admin" ? "Administrator" : "Client"}`);
      router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (err) {
      setError("An anomaly occurred during the authentication routing pipeline.");
      toast.error("Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateLogin = async (role: "user" | "admin") => {
    setIsSubmitting(true);
    setError("");

    if (role === "admin") {
      setEmail("admin@siliconrealestate.com");
      setPassword("SiliconAdmin2026!");
    } else {
      setEmail("client@siliconrealestate.com");
      setPassword("SiliconUser2026!");
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUserData = {
      uid: role === "admin" ? "admin-99" : "user-45",
      name: role === "admin" ? "Silicon Administrator" : "Md Rashedul Islam",
      email: role === "admin" ? "admin@siliconrealestate.com" : "client@siliconrealestate.com",
      role: role,
    };

    try {
      login(mockUserData);
      toast.success(`Authenticated securely as ${role === "admin" ? "Administrator" : "Client"}`);
      router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (err) {
      setError("Failed to simulate session authorization.");
      toast.error("Simulation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-light">Verifying credentials integrity...</p>
      </div>
    );
  }

  // If already logged in, show loading while router redirects
  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-light">Redirecting to session environment...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-normal tracking-tight text-neutral-900 dark:text-neutral-50">
          Sign In
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
          Access your verified assets portfolio dashboard using secure cryptographic identities.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
            >
              Password
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Password resetting via secure registered emails is under testing.");
              }}
              className="text-[10px] text-primary dark:text-primary-foreground hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-10 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="text-[11px] text-destructive bg-destructive/5 dark:bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-md"
            role="alert"
          >
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 rounded-lg text-xs font-medium bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Authenticating session...
            </>
          ) : (
            <>
              Authorize Identity
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </form>

      {/* Simulator Switcher Block */}
      <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
        <div className="text-center">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
            Developer simulation panel
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSimulateLogin("user")}
            disabled={isSubmitting}
            className="w-full h-9 rounded-lg text-xs font-normal border-border bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
            Simulate Regular User Login
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSimulateLogin("admin")}
            disabled={isSubmitting}
            className="w-full h-9 rounded-lg text-xs font-normal border-border bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
            Simulate Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
}
