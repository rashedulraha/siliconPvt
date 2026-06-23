"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { useCMS } from "@/context/CMSContext";
import { formatCurrency } from "@/lib/utils";

interface ProjectDetailClientProps {
  slug: string;
}

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  available: "default",
  pending: "secondary",
  sold: "destructive",
  rented: "outline",
};

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { state } = useCMS();

  const project = state.properties.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">
          Project not found
        </h1>
        <p className="text-muted-foreground mb-6">
          The project you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
        </Link>
      </Button>

      <div className="space-y-8">
        {/* Images grid */}
        {project.images.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted"
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={STATUS_VARIANT[project.status] ?? "outline"}
              className="capitalize"
            >
              {project.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                {project.title}
              </h1>
              <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                {formatCurrency(project.price)}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div>
            <h2 className="font-display text-xl font-semibold mb-3">
              About This Project
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
