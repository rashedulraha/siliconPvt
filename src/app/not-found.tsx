import Link from "next/link";
import { Home, Search, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <Container className="py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 illustration */}
        <div className="relative">
          <div className="font-heading text-[10rem] md:text-[14rem] font-bold leading-none text-primary/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-destructive" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/properties">
              <Search className="h-4 w-4 mr-2" />
              Browse Properties
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/contact">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/", label: "Home" },
              { href: "/properties", label: "Properties" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-muted">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
