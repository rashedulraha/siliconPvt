"use client";

import { ErrorFallback } from "@/components/feedback/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      resetErrorBoundary={reset}
      title="Something went wrong"
      description="We encountered an unexpected error. Please try again or return to the homepage."
    />
  );
}
