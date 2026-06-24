"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { useCMS } from "@/context/CMSContext";
import { formatCurrency } from "@/lib/utils";

interface ProjectDetailClientProps {
  slug: string;
}

const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  pending:   "bg-accent/15 text-accent border-accent/20",
  sold:      "bg-muted text-muted-foreground border-border",
  rented:    "bg-primary/10 text-primary border-primary/20",
};

const STATUS_LABELS: Record<string, string> = {
  available: "Ongoing",
  pending:   "Upcoming",
  sold:      "Completed",
  rented:    "Rented",
};

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { state } = useCMS();
  const project = state.properties.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
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
    <>
      {/* Breadcrumb bar */}
      <div className="pt-20 bg-background border-b border-border">
        <Container className="py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{project.title}</span>
          </nav>
        </Container>
      </div>

      <div className="bg-background min-h-screen">
        <Container className="py-8 lg:py-12">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent text-sm font-medium transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">

            {/* ── Main content ─────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">

              {/* Images grid */}
              {project.images.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 rounded-2xl overflow-hidden">
                  {project.images.slice(0, 4).map((src, i) => (
                    <div key={i} className={`relative overflow-hidden bg-muted rounded-xl ${i === 0 ? "sm:col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}>
                      <Image
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        priority={i === 0}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-[0.08em] uppercase border ${STATUS_STYLES[project.status] ?? ""}`}>
                    {STATUS_LABELS[project.status] ?? project.status}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-[0.08em] uppercase border border-border bg-secondary text-secondary-foreground capitalize">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="font-heading font-bold text-display-md text-foreground leading-[1.12]">
                      {project.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <div className="font-heading font-bold text-3xl md:text-4xl text-accent leading-none">
                      {formatCurrency(project.price)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Starting price</div>
                  </div>
                </div>

                <div className="divider-gold" />
              </div>

              {/* Description */}
              {project.description && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                  <h2 className="font-heading font-bold text-xl text-foreground mb-4">
                    About This Project
                  </h2>
                  <p className="text-muted-foreground leading-[1.8] text-sm whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {project.features.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                  <h2 className="font-heading font-bold text-xl text-foreground mb-5">Features</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* ── Sidebar ──────────────────────────── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-4 lg:sticky lg:top-24"
            >
              <div className="bg-card rounded-xl border border-border p-5 shadow-soft">
                <h3 className="font-heading font-bold text-foreground mb-4">Project Details</h3>
                <div className="space-y-0">
                  {[
                    ["Category",     project.category],
                    ["Status",       STATUS_LABELS[project.status] ?? project.status],
                    ["Area",         `${project.area.toLocaleString()} ft²`],
                    ["Listing ID",   project.id.slice(0, 8).toUpperCase()],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground text-sm">{label}</span>
                      <span className="font-medium capitalize text-sm text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="flex items-center justify-center gap-2 w-full h-12 rounded-xl gold-shimmer text-accent-foreground font-bold text-sm shadow-soft hover:brightness-110 hover:scale-[1.01] transition-all duration-300">
                <CalendarCheck className="h-4 w-4" />
                Book a Site Visit
              </Link>

              <div className="bg-card rounded-xl border border-border p-5 shadow-soft">
                <p className="font-heading font-semibold text-foreground mb-1">Enquire About This Project</p>
                <p className="text-xs text-muted-foreground mb-4">We&apos;ll respond within 24 hours.</p>
                <Button asChild className="w-full">
                  <Link href="/contact">Send Enquiry</Link>
                </Button>
              </div>
            </motion.aside>
          </div>
        </Container>
      </div>
    </>
  );
}
