"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  description?: string;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  title = "Something went wrong",
  description = "We're sorry, but an unexpected error occurred. Please try again.",
}: ErrorFallbackProps) {
  return (
    <Container className="py-20">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {process.env.NODE_ENV === "development" && error && (
          <details className="text-left rounded-lg border bg-muted/40 p-4">
            <summary className="cursor-pointer text-sm font-medium">
              Error Details (dev only)
            </summary>
            <pre className="mt-2 text-xs overflow-auto max-h-40">
              {error.message}
              {"\n"}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          {resetErrorBoundary && (
            <Button onClick={resetErrorBoundary}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
