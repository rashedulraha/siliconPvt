import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex min-h-24 w-full rounded-xl border border-border/80 bg-background px-3.5 py-3 text-sm text-foreground shadow-2xs transition-all outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 font-light leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
