"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import { Eye, EyeOff, Loader2, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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

    // Field validations
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
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUserData = {
      uid: "user-" + Math.floor(Math.random() * 1000),
      name: name.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
      role: "user" as const,
    };

    try {
      login(mockUserData);
      toast.success("Account created and authenticated successfully!");
      router.push("/dashboard/user");
    } catch (err) {
      setError("Failed to route session credentials securely.");
      toast.error("Registration failed.");
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
          Create Account
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
          Register your verified credentials to access our premium real estate asset network.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <User className="w-4.5 h-4.5" />
            </div>
            <input
              id="name"
              type="text"
              placeholder="Rashedul Islam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Phone className="w-4.5 h-4.5" />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="+880 1700-000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Email Address */}
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
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
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

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-neutral-800 dark:text-neutral-200"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-10 pl-9 pr-10 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border text-xs focus:outline-hidden focus:border-primary/50 dark:focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
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
              Creating profile...
            </>
          ) : (
            <>
              Register Credentials
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
