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
  Check, 
  AlertCircle
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";

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
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Form validator
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

  // Perform mock auth login and route to user or admin dashboard
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate elegant connection verification
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
    const role = email.includes("admin") ? "admin" : "user";
    login({
      uid: role === "admin" ? "admin-1" : "user-1",
      name: role === "admin" ? "S. M. Ahsan" : "Al-Amin Rahman",
      email: email,
      role: role,
      avatar: role === "admin" 
        ? "https://images.unsplash.com/photo-1507152832244-10d49c7dd8f9?w=100" 
        : "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Redirect client side after success state renders
  useEffect(() => {
    if (isSuccess) {
      const targetRoute = email.includes("admin") ? "/dashboard/admin" : "/dashboard/user";
      const timer = setTimeout(() => {
        router.replace(targetRoute);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, email, router]);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Check className="w-6 h-6 text-emerald-500 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
            Access Authorized
          </h2>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 max-w-[260px] mx-auto font-light leading-relaxed">
            Establishing secure encrypted session. Redirecting you to the private portfolio...
          </p>
        </div>
        <div className="w-6 h-1 bg-emerald-500/30 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-1/2 animate-[shimmer_1.5s_infinite_linear] rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Brand & Introduction */}
      <div className="space-y-2 text-center lg:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/40 dark:border-amber-900/30 mb-1 shadow-xs">
          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
          VIP Portfolio Access
        </div>
        <h1 className="text-3xl font-light tracking-tight text-neutral-900 dark:text-neutral-50">
          Client <span className="font-semibold text-neutral-800 dark:text-neutral-200">Sign In</span>
        </h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light leading-relaxed">
          Access your land investment portfolios, statements, and site visit schedules.
        </p>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              Registered Email
            </label>
            <span className="text-[9px] text-neutral-400/80 dark:text-neutral-600 hover:text-accent cursor-pointer transition-colors" onClick={() => setEmail("admin@silicon.com")}>
              (Use admin credentials)
            </span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500 transition-colors group-focus-within:text-accent">
              <Mail className="w-4 h-4 stroke-[1.5]" />
            </div>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              disabled={isSubmitting}
              className={`w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-neutral-950/40 border transition-all duration-300 text-xs focus:outline-hidden text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                errors.email 
                  ? "border-destructive/60 focus:border-destructive focus:ring-1 focus:ring-destructive/20" 
                  : "border-neutral-200 dark:border-neutral-800 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/10 dark:focus:ring-accent/5 shadow-xs"
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1 text-[10px] text-destructive mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              Passcode
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] text-neutral-400 dark:text-neutral-500 hover:text-accent transition-colors"
            >
              Recover?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500 transition-colors group-focus-within:text-accent">
              <Lock className="w-4 h-4 stroke-[1.5]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              disabled={isSubmitting}
              className={`w-full h-11 pl-10 pr-10 rounded-xl bg-white dark:bg-neutral-950/40 border transition-all duration-300 text-xs focus:outline-hidden text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                errors.password 
                  ? "border-destructive/60 focus:border-destructive focus:ring-1 focus:ring-destructive/20" 
                  : "border-neutral-200 dark:border-neutral-800 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/10 dark:focus:ring-accent/5 shadow-xs"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5 stroke-[1.5]" /> : <Eye className="w-4.5 h-4.5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <label className="relative flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 peer-checked:bg-accent peer-checked:border-accent flex items-center justify-center transition-all duration-200">
              <Check className="w-3 h-3 text-white dark:text-neutral-950 opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-200 stroke-[3]" />
            </div>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
              Trust this device for secure access
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl text-xs font-medium bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center gap-2 transition-all duration-300 border border-neutral-800 dark:border-white/90 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Authorize Secure Connection
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Access matrix rule indicator */}
      <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900/60 flex justify-between items-center text-[9px] text-neutral-400 dark:text-neutral-600 select-none font-mono tracking-tight">
        <span>🔐 SSL ENCRYPTED AES-256</span>
        <span>SECURITY LEVEL: VIP v3.0</span>
      </div>
    </div>
  );
}