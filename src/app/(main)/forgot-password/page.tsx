"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, Building2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

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
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">We will send you instructions to reset your password</p>
          </div>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-3xl p-7 shadow-soft-md">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-accent/12 rounded-full flex items-center justify-center mx-auto text-accent animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-foreground">Check your email</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We have sent a password reset link to <strong className="text-foreground">{email}</strong>.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:text-primary/70 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs px-3.5 py-2.5 rounded-xl font-medium animate-shake">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-heading font-semibold text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-input-surface border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:bg-primary/85 transition-all shadow-blue disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Back to sign in link */}
              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:text-primary/70 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
