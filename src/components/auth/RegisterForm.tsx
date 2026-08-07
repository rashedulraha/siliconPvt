"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function RegisterForm() {
  const router = useRouter();
  const { isLoggedIn, user, login, isLoading } = useUserAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warmupMessage, setWarmupMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
    setWarmupMessage("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
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
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setWarmupMessage("");
      setError(err.message || "An unexpected error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      const targetRoute = user.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/user";
      const timer = setTimeout(() => {
        router.replace(targetRoute);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, user, router]);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 bg-card border border-border/60 rounded-3xl p-6 shadow-md">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-medium font-heading text-foreground">
            Account Created Successfully!
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            Welcome to Silicon Real Estate. Redirecting to your dashboard...
          </p>
        </div>
        <div className="pt-1 flex items-center gap-2 text-xs font-mono text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Setting up Client Portal</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header Badge & Title */}
      <div className="space-y-1 text-left">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          NEW CLIENT REGISTRATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium font-heading text-foreground tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs text-muted-foreground font-light">
          Register to save plot preferences and access instant legal documentation.
        </p>
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

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* Full Name */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-medium font-heading text-foreground block">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="MD. Ahmed Kabir"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
            />
          </div>
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 text-left">
            <label className="text-xs font-medium font-heading text-foreground block">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1712 345 678"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-card border border-border/60 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
              />
            </div>
          </div>

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
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-card border border-border/60 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
              />
            </div>
          </div>
        </div>

        {/* Password Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 text-left">
            <label className="text-xs font-medium font-heading text-foreground block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-9 rounded-xl bg-card border border-border/60 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-medium font-heading text-foreground block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-9 rounded-xl bg-card border border-border/60 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-light"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all border border-white/10 shadow-xs gap-2 disabled:opacity-50 cursor-pointer pt-0.5">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              CREATE ACCOUNT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Footer Login Link */}
      <div className="pt-2 border-t border-border/50 text-center text-xs text-muted-foreground font-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline font-heading">
          Sign In
        </Link>
      </div>
    </div>
  );
}
