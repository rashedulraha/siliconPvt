"use client";

import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/layout/Container";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import { useJobs } from "@/hooks/useJobs";
import { useLeads } from "@/hooks/useLeads";
import type { Job } from "@/types";

export default function CareersPage() {
  const { state } = useCMS();
  const { activeJobs } = useJobs();
  const { addLead } = useLeads();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    addLead({
      name: applyForm.name,
      email: applyForm.email,
      phone: applyForm.phone,
      message: `[Application: ${selectedJob.title}] ${applyForm.message}`,
      jobId: selectedJob.id,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
      setApplyForm({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  const perks = [
    "Competitive compensation",
    "Flexible work arrangements",
    "Health & wellness benefits",
    "Professional development",
    "Collaborative culture",
    "Impactful work",
  ];

  return (
    <>
      <PageSEO
        title={state.seo.careers.title}
        description={state.seo.careers.description}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>We&apos;re Hiring</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Build Your Career With Us
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/90 max-w-2xl">
              Join a team of passionate professionals reshaping the real estate
              industry. We&apos;re looking for talented people who share our
              commitment to excellence.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {perks.slice(0, 4).map((perk) => (
                <Badge
                  key={perk}
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                  <CheckCircle className="h-3 w-3 mr-1" /> {perk}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Jobs List */}
      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Open Positions
            </h2>
            <p className="mt-3 text-muted-foreground">
              {activeJobs.length}{" "}
              {activeJobs.length === 1 ? "opportunity" : "opportunities"}{" "}
              available
            </p>
          </div>

          {activeJobs.length === 0 ? (
            <div className="text-center py-16 rounded-xl border bg-muted/40">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Open Positions</h3>
              <p className="text-muted-foreground">
                Check back soon for new opportunities!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {job.type}
                          </Badge>
                        </div>
                        <h3 className="font-display text-xl font-semibold">
                          {job.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </span>
                          {job.salaryRange && (
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4" />{" "}
                              {job.salaryRange}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> Posted{" "}
                            {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedJob(job)}>
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Culture */}
      <section className="py-16 bg-muted/40">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-secondary mb-3">
                OUR CULTURE
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Where Great Work Happens
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At EstateHub, we believe the best results come from empowered
                teams. We foster a culture of collaboration, continuous
                learning, and celebration of wins — big and small.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-primary" />
                </div>
                <div className="aspect-[3/4] rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-secondary" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-accent" />
                </div>
                <div className="aspect-square rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Apply Dialog */}
      <Dialog
        open={!!selectedJob}
        onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Application Sent!</h3>
              <p className="text-muted-foreground">
                We&apos;ll review your application and get back to you soon.
              </p>
            </div>
          ) : selectedJob ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                <DialogDescription>
                  {selectedJob.location} • {selectedJob.type}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div>
                  <h4 className="font-semibold mb-2">About the Role</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-1.5 text-sm">
                    {selectedJob.requirements.map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedJob.benefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Benefits</h4>
                    <ul className="space-y-1.5 text-sm">
                      {selectedJob.benefits.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <form onSubmit={handleApply} className="space-y-3 pt-4 border-t">
                <h4 className="font-semibold">Your Information</h4>
                <div className="space-y-2">
                  <Label htmlFor="apply-name">Full Name *</Label>
                  <Input
                    id="apply-name"
                    value={applyForm.name}
                    onChange={(e) =>
                      setApplyForm({ ...applyForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="apply-email">Email *</Label>
                    <Input
                      id="apply-email"
                      type="email"
                      value={applyForm.email}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apply-phone">Phone</Label>
                    <Input
                      id="apply-phone"
                      type="tel"
                      value={applyForm.phone}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apply-message">
                    Why are you a great fit? *
                  </Label>
                  <Textarea
                    id="apply-message"
                    value={applyForm.message}
                    onChange={(e) =>
                      setApplyForm({ ...applyForm, message: e.target.value })
                    }
                    rows={4}
                    required
                    placeholder="Tell us about your experience and why you'd like to join our team..."
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
