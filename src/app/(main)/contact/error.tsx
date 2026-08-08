// Pattern for error.tsx (identical for all routes)
"use client";
import { ErrorFallback } from "@/components/feedback/ErrorFallback";
export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
