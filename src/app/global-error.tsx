"use client";

import { ErrorFallback } from "@/components/feedback/ErrorFallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorFallback
          error={error}
          resetErrorBoundary={reset}
          title="Critical Error"
          description="A critical error occurred. Please refresh the page or contact support if the problem persists."
        />
      </body>
    </html>
  );
}
