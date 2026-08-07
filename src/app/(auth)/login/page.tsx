"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { apiFetch } from "@/lib/api-client";

export default function LoginPage() {
  const { login, isLoggedIn, user: currentUser, isLoading } = useUserAuth();
  const router = useRouter();

  // If already logged in, redirect to appropriate dashboard immediately
  useEffect(() => {
    if (!isLoading && isLoggedIn && currentUser) {
      if (currentUser.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [isLoggedIn, currentUser, isLoading, router]);

  const [email, setEmail] = useState("client@silicon.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warmupMessage, setWarmupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const fillDemoAccount = (role: "client" | "admin") => {
    if (role === "client") {
      setEmail("client@silicon.com");
      setPassword("123456");
    } else {
      setEmail("admin@silicon.com");
      setPassword("123456");
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setWarmupMessage("");
    if (!validateForm()) return;

    setIsSubmitting(true);

    const timer1 = setTimeout(() => {
      setWarmupMessage("Connecting to server...");
    }, 4000);

    const timer2 = setTimeout(() => {
      setWarmupMessage("Server is waking up (Render free tier)... Please wait.");
    }, 15000);

    try {
      const response = await apiFetch<{
        success: boolean;
        message: string;
        user: {
          id: string;
          name: string;
          email: string;
          role: string;
          phoneNumber?: string;
          avatar?: string;
        };
        token?: string;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      setWarmupMessage("");

      if (response.success && response.user) {
        const sessionUser = {
          uid: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role as any,
          phoneNumber: response.user.phoneNumber,
          avatar: response.user.avatar,
        };
        login(sessionUser, response.token);
        setIsSuccess(true);
      } else {
        setError(response.message || "Invalid email or password.");
      }
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setWarmupMessage("");
      setError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess && currentUser) {
      const targetRoute = currentUser.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/user";
      const timer = setTimeout(() => {
        router.replace(targetRoute);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, currentUser, router]);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 bg-card border border-border/60 rounded-3xl p-6 shadow-md">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-medium font-heading text-foreground">
            Authentication Successful
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            Redirecting you to your portal dashboard...
          </p>
        </div>
        <div className="pt-1 flex items-center gap-2 text-xs font-mono text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Opening Dashboard</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Badge & Title (No Heavy Bold Fonts) */}
      <div className="space-y-1.5 text-left">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          CLIENT PORTAL SIGN IN
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium font-heading text-foreground tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-muted-foreground font-light">
          Sign in to access your saved plots, dashboard, and portfolio.
        </p>
      </div>

      {/* Quick Demo Fill Pills */}
      <div className="bg-muted/40 border border-border/60 rounded-2xl p-3.5 space-y-2">
        <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wider block">
          TEST DEMO CREDENTIALS (CLICK TO AUTO-FILL):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fillDemoAccount("client")}
            className="px-3 py-1 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-medium font-heading text-foreground flex items-center gap-1.5 transition-all shadow-xs cursor-pointer">
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            Client Account
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount("admin")}
            className="px-3 py-1 rounded-xl bg-card border border-border/60 hover:border-accent/40 text-xs font-medium font-heading text-foreground flex items-center gap-1.5 transition-all shadow-xs cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            Admin Account
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-light flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Warmup Message */}
      {warmupMessage && (
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-light flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{warmupMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email Address */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-medium font-heading text-foreground block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium font-heading text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline font-heading font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-card border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded-md border-border text-primary focus:ring-primary/20"
          />
          <label htmlFor="remember" className="text-xs text-muted-foreground font-light select-none">
            Keep me signed in on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all border border-white/10 shadow-xs gap-2 disabled:opacity-50 cursor-pointer">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              SIGN IN TO PORTAL
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Footer Register Prompt */}
      <div className="pt-3 border-t border-border/50 text-center text-xs text-muted-foreground font-light">
        Don't have an account yet?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline font-heading">
          Create Account
        </Link>
      </div>
    </div>
  );
}
