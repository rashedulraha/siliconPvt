"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate premium OAuth / API check
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-500 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-medium text-neutral-900 dark:text-neutral-50">
            Access Granted
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[280px]">
            Synchronizing secure session credentials. Welcome to the estatehub private collection.
          </p>
        </div>
        <div className="w-8 h-1 bg-emerald-500 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Brand & Intro */}
      <div className="space-y-2 text-center lg:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50 mb-1">
          🛡️ Secure Portal
        </div>
        <h1 className="text-3xl font-heading font-light tracking-tight text-neutral-900 dark:text-neutral-50">
          Welcome to <span className="font-semibold text-neutral-800 dark:text-neutral-200">estatehub</span>
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
          Sign in to access your luxury real estate investments and private property catalogs.
        </p>
      </div>

      {/* Social Login Area */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setIsSubmitting(true);
            setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1500);
          }}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.78 3.02,-4.4 3.02,-7.4C21.65,11.8 21.54,11.4 21.35,11.1z" fill="#4285F4" />
              <path d="M12,20.6c2.7,0 4.96,-0.9 6.62,-2.4l-3.29,-2.6c-0.9,0.6 -2.06,1 -3.33,1c-2.56,0 -4.73,-1.73 -5.5,-4.07H3.1v2.7C4.75,18.5 8.13,20.6 12,20.6z" fill="#34A853" />
              <path d="M6.5,12.53c-0.2,-0.6 -0.31,-1.24 -0.31,-1.9c0,-0.66 0.11,-1.3 0.31,-1.9V6.03H3.1c-0.67,1.34 -1.06,2.85 -1.06,4.47c0,1.6 0.39,3.12 1.06,4.46l3.4,-2.67z" fill="#FBBC05" />
              <path d="M12,5.43c1.47,0 2.78,0.5 3.82,1.5l2.87,-2.87C16.95,2.4 14.7,1.4 12,1.4C8.13,1.4 4.75,3.5 3.1,6.8L6.5,9.47C7.27,7.16 9.44,5.43 12,5.43z" fill="#EA4335" />
            </g>
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSubmitting(true);
            setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1500);
          }}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-98"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          GitHub
        </button>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
        <span className="flex-shrink mx-4 text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-medium">Or continue with</span>
        <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
              <Mail className="w-4 h-4" />
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
              className={`w-full h-11 pl-10 pr-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border transition-all duration-300 text-xs focus:outline-hidden text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                errors.email 
                  ? "border-destructive/60 focus:border-destructive focus:ring-1 focus:ring-destructive/20" 
                  : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900/10 dark:focus:ring-white/10"
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
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
              <Lock className="w-4 h-4" />
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
              className={`w-full h-11 pl-10 pr-10 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border transition-all duration-300 text-xs focus:outline-hidden text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                errors.password 
                  ? "border-destructive/60 focus:border-destructive focus:ring-1 focus:ring-destructive/20" 
                  : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900/10 dark:focus:ring-white/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1 text-[10px] text-destructive mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.password}</span>
            </div>
          )}
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
            <div className="w-4.5 h-4.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 peer-checked:bg-neutral-900 dark:peer-checked:bg-neutral-100 peer-checked:border-neutral-900 dark:peer-checked:border-neutral-100 flex items-center justify-center transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/20 dark:peer-focus-visible:ring-white/20">
              <Check className="w-3 h-3 text-white dark:text-neutral-900 opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-300 stroke-[3]" />
            </div>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              Remember me on this secure device
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-950 flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-neutral-900/10 dark:shadow-none cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Access matrix rule indicator */}
      <div className="pt-5 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center text-[10px] text-neutral-400 dark:text-neutral-500 select-none">
        <span>🔐 End-to-End Encryption</span>
        <span>RBAC Profile v2.1</span>
      </div>
    </div>
  );
}