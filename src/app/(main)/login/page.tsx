"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Building2, ArrowRight } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, user, login } = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [isLoggedIn, user, router]);

  async function handleUserLogin() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    login({
      name: "Rashedul Raha",
      email: "client@siliconrealestate.com",
      role: "user",
    });
    router.push("/dashboard/user");
    setIsSubmitting(false);
  }

  async function handleAdminLogin() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    try {
      localStorage.setItem("silicon_admin_session", JSON.stringify({
        email: "admin@siliconrealestate.com",
        loggedInAt: new Date().toISOString(),
      }));
    } catch {
      /* ignore */
    }
    login({
      name: "System Admin",
      email: "admin@siliconrealestate.com",
      role: "admin",
    });
    router.push("/dashboard/admin");
    setIsSubmitting(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    
    // Default standard credentials to user role
    const isDemoAdmin = email.trim().toLowerCase().includes("admin");
    const role = isDemoAdmin ? "admin" : "user";
    
    if (role === "admin") {
      try {
        localStorage.setItem("silicon_admin_session", JSON.stringify({
          email: email.trim(),
          loggedInAt: new Date().toISOString(),
        }));
      } catch {
        /* ignore */
      }
    }
    
    login({
      name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.trim(),
      role,
    });
    
    router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    setIsSubmitting(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-secondary/40 to-teal-light/30"
    >
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
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to access your dashboard</p>
          </div>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-3xl p-7 shadow-soft-md">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-heading font-semibold text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-11 px-4 rounded-xl bg-input-surface border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-heading font-semibold text-foreground">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/70 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-11 pl-4 pr-11 rounded-xl bg-input-surface border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-destructive bg-destructive/8 px-3 py-2 rounded-lg" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/85 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-blue"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-border/60"></div>
            <span className="flex-shrink mx-3 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Simulation Sandbox</span>
            <div className="flex-grow border-t border-border/60"></div>
          </div>

          {/* Simulation Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleUserLogin}
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-border bg-background hover:bg-secondary/40 hover:border-primary/20 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              User Login
            </button>
            <button
              type="button"
              onClick={handleAdminLogin}
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-border bg-background hover:bg-secondary/40 hover:border-primary/20 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              Admin Login
            </button>
          </div>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/contact" className="text-primary font-medium hover:text-primary/70 transition-colors">
              Contact us to register
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-[11px] text-muted-foreground">
          Demo: Use simulation buttons above to test role redirections
        </p>
      </div>
    </div>
  );
}
