"use client";

import Image from "next/image";
import { Award, Users, Target, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TeamCard } from "@/components/team/TeamCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";

export default function AboutPage() {
  const { state } = useCMS();
  const aboutPage = state.pages.find((p) => p.slug === "about");
  const storySection = aboutPage?.sections.find((s) => s.type === "content");

  const stats = [
    { value: "15+", label: "Years Experience", icon: Award },
    { value: "1,200+", label: "Properties Sold", icon: Target },
    { value: "950+", label: "Happy Clients", icon: Heart },
    { value: "40+", label: "Expert Agents", icon: Users },
  ];

  const values = [
    {
      title: "Integrity",
      desc: "We operate with complete transparency and honesty in every transaction.",
    },
    {
      title: "Excellence",
      desc: "We set the highest standards in service, knowledge, and results.",
    },
    {
      title: "Client-First",
      desc: "Your goals are our priority. We listen, advise, and deliver.",
    },
  ];

  return (
    <>
      <PageSEO
        title={state.seo.about.title}
        description={state.seo.about.description}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-secondary mb-3">
              ABOUT ESTATEHUB
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Redefining Real Estate Since 2010
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We're more than agents — we're your partners in finding not just a
              property, but a place where life's best moments unfold.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-secondary mb-3">
                OUR STORY
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {storySection?.data.title || "From Boutique to Industry Leader"}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {storySection?.data.content ||
                    "Founded in 2010, EstateHub has grown from a small boutique agency to one of the most trusted names in premium real estate."}
                </p>
                <p>
                  What started as a vision to bring personalized, expert service
                  to the luxury market has evolved into a full-service real
                  estate firm serving clients across 25+ cities. Our success is
                  built on deep market knowledge, an unwavering commitment to
                  our clients, and a team of exceptional professionals who share
                  our passion for excellence.
                </p>
                <p>
                  Today, we've helped over 950 families find their dream homes
                  and closed more than $2 billion in transactions. But numbers
                  only tell part of the story — the real measure of our success
                  is the lasting relationships we build and the trust our
                  clients place in us for life's biggest decisions.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10 mb-4">
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="font-display text-4xl font-bold">{s.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium text-secondary mb-3">
              OUR VALUES
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-secondary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {v.title}
                </h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium text-secondary mb-3">
              MEET THE TEAM
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              The Experts Behind EstateHub
            </h2>
            <p className="mt-3 text-muted-foreground">
              Passionate professionals dedicated to making your real estate
              journey exceptional.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
