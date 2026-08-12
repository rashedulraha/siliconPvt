"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center space-y-2">
				<div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
				<p className="text-sm text-muted-foreground">
					Redirecting to your dashboard...
				</p>
			</div>
		</div>
	);
}
