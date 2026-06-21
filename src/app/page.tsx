import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex items-center rounded-full border bg-secondary/10 px-4 py-1.5 text-sm text-secondary">
        ✨ Phase 1 Complete
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Foundation Ready
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        The project architecture, design tokens, theming, layout, and CMS
        context are all in place. Pages will be built in Phase 3.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {["Architecture", "Theming", "Layout", "CMS Context"].map((item) => (
          <div
            key={item}
            className="rounded-lg border bg-card p-4 text-sm font-medium text-card-foreground">
            ✓ {item}
          </div>
        ))}
      </div>
    </Container>
  );
}
