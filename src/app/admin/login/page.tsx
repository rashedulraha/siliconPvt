"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAdminSession,
  setAdminSession,
} from "@/lib/admin-auth";

// ---------------------------------------------------------------------------
// Admin credentials — resolved at call time so env vars loaded after build
// ---------------------------------------------------------------------------
function getAdminEmail(): string {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@silicon.com";
}

function getAdminPassword(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "silicon2024";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminLoginPage() {
  const router = useRouter();

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Field-level errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  // Redirect to /admin if a valid session already exists on mount
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      router.replace("/admin");
    }
  }, [router]);

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  function validate(): boolean {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }

  // ---------------------------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------------------------
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate async credential check (keeps isSubmitting UX honest)
      await Promise.resolve();

      const expectedEmail = getAdminEmail();
      const expectedPassword = getAdminPassword();

      if (email.trim() === expectedEmail && password === expectedPassword) {
        setAdminSession({
          email: email.trim(),
          loggedInAt: new Date().toISOString(),
        });
        router.push("/admin");
      } else {
        setAuthError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Branding */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Silicon Real Estate
          </h1>
          <p className="text-sm text-muted-foreground">
            Admin Dashboard — sign in to continue
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          {/* Email field */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="admin@silicon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              disabled={isSubmitting}
            />
            {emailError && (
              <p
                id="email-error"
                className="text-xs text-destructive"
                data-error="email"
                role="alert"
              >
                {emailError}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "password-error" : undefined}
              disabled={isSubmitting}
            />
            {passwordError && (
              <p
                id="password-error"
                className="text-xs text-destructive"
                data-error="password"
                role="alert"
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* Generic auth error */}
          {authError && (
            <p
              className="text-xs text-destructive text-center"
              role="alert"
              data-error="auth"
            >
              {authError}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
