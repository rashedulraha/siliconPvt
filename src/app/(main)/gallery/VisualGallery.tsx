import { SectionContainer } from "@/components/layout/SectionContainer";

export default function VisualGallery() {
	return (
		<section className="relative pt-32 pb-24 overflow-hidden">
			<div
				className="absolute inset-0 -z-10"
				style={{
					background:
						"radial-gradient(ellipse 120% 80% at 50% 0%, hsl(var(--primary)/0.08) 0%, transparent 70%)",
				}}
			/>
			{/* Full Section Dot Grid */}
			<div
				className="absolute inset-0 -z-10 opacity-[0.15] dark:opacity-[0.25] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(hsl(var(--foreground)) 1.2px, transparent 1.2px)`,
					backgroundSize: "24px 24px",
				}}
			/>
			{/* Decorative corner dot clusters */}
			<div
				className="hidden md:block absolute top-16 left-10 w-32 h-32 opacity-20 pointer-events-none -z-10"
				style={{
					backgroundImage: `radial-gradient(hsl(var(--primary)) 2px, transparent 2px)`,
					backgroundSize: "16px 16px",
				}}
			/>
			<div
				className="hidden md:block absolute bottom-10 right-10 w-32 h-32 opacity-20 pointer-events-none -z-10"
				style={{
					backgroundImage: `radial-gradient(hsl(var(--primary)) 2px, transparent 2px)`,
					backgroundSize: "16px 16px",
				}}
			/>
			<SectionContainer>
				<div className="max-w-3xl text-center mx-auto space-y-6">
					<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border/60 bg-muted/40 text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
						<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
						Visual Gallery
					</div>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
						Visualizing Your
						<br />
						<span className="text-primary">Dream Community</span>
					</h1>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Take a visual tour of Silicon City. Explore our high-resolution site
						photos, ongoing soil development works, planned amenities, and our
						corporate office environment.
					</p>
				</div>
			</SectionContainer>
		</section>
	);
}
