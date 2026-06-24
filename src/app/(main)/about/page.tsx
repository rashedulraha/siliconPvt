"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Users, Target, Heart, CheckCircle, ChevronRight, Sparkles, Shield, TrendingUp, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TeamCard } from "@/components/team/TeamCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";

export default function AboutPage() {
  const { state } = useCMS();

  const stats = [
    { value: "10+", label: "Years of Excellence", icon: Award },
    { value: "1,500+", label: "Happy Clients", icon: Users },
    { value: "25+", label: "Projects Delivered", icon: Building2 },
    { value: "800+", label: "Acres Developed", icon: TrendingUp },
  ];

  const values = [
    { icon: Shield, title: "Integrity", desc: "We operate with complete transparency and honesty in every transaction and documentation." },
    { icon: Award, title: "Excellence", desc: "We set the highest standards in service, legal compliance, and client support." },
    { icon: Heart, title: "Client-First", desc: "Your investment goals are our priority. We listen, advise, and deliver with precision." },
    { icon: Target, title: "Transparency", desc: "Every plot, every deed, every rupee — fully disclosed, no surprises." },
  ];

  const journey = [
    "RAJUK & Government Approved Projects",
    "100% Legal & Transparent Documentation",
    "Flexible Installment Payment Facilities",
    "Prime Locations with High ROI Potential",
    "Dedicated Support Team for Every Investor",
  ];

  return (
    <>
      <PageSEO title={state.seo.about.title} description={state.seo.about.description} />

      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-accent/4 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">About Silicon Real Estate</span>
            </div>
            <h1 className="font-serif font-bold text-white text-display-lg leading-[1.08] mb-5">
              Building <span className="text-gold">Trusted</span> Communities{" "}
              <br className="hidden sm:block" />Since 2013
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              We're more than a real estate company — we're long-term partners in your
              wealth creation journey, providing RAJUK-approved, legally verified land
              across Dhaka's highest-growth corridors.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Story + Image ─────────────────────────────── */}
      <section className="section-y bg-background">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-7">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <span className="text-label text-accent">Our Story</span>
              </div>
              <h2 className="font-serif font-bold text-display-md text-foreground leading-[1.12]">
                From Vision to{" "}
                <span className="text-gold">Industry Leader</span>
              </h2>
              <div className="divider-gold" />
              <div className="space-y-4 text-muted-foreground leading-[1.8] font-light text-base">
                <p>
                  Founded in 2013, Silicon Real Estate (Pvt.) Ltd. has grown from a boutique land
                  development firm into one of Dhaka's most trusted property brands. Our journey
                  began with a single mission: make legal, verified land investment accessible to
                  every Bangladeshi family.
                </p>
                <p>
                  Today, with over 1,500 satisfied clients and 25+ completed projects spanning
                  more than 800 acres, we remain committed to the same principles that built our
                  reputation — transparency, legal integrity, and exceptional client service.
                </p>
              </div>
              <ul className="space-y-3">
                {journey.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/contact" className="group inline-flex items-center gap-2 px-7 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-luxury">
                Get in Touch <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury-lg">
              <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" alt="Silicon Real Estate office and team" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><div className="font-serif font-bold text-2xl text-white">25+</div><div className="text-white/50 text-xs">Projects</div></div>
                  <div className="border-x border-white/10"><div className="font-serif font-bold text-2xl text-accent">1,500+</div><div className="text-white/50 text-xs">Clients</div></div>
                  <div><div className="font-serif font-bold text-2xl text-white">800+</div><div className="text-white/50 text-xs">Acres</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Stats Bar ─────────────────────────────────── */}
      <section className="py-16 bg-dark-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/25 transition-colors">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="font-serif font-bold text-3xl text-white">{s.value}</div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-[0.1em] mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Core Values ───────────────────────────────── */}
      <section className="section-y bg-secondary/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-5">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                <Award className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">Our Core Values</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="font-serif font-bold text-display-md text-foreground">
              What We <span className="text-gold">Stand For</span>
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-card rounded-xl p-7 border border-border card-lift shadow-luxury text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <v.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Team ──────────────────────────────────────── */}
      {state.team.length > 0 && (
        <section className="section-y bg-background">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-5">
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-label text-primary/70">Our People</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="font-serif font-bold text-display-md text-foreground">
                The Experts Behind <span className="text-gold">Every Visit</span>
              </motion.h2>
              <p className="text-muted-foreground text-lg font-light">Experienced professionals dedicated to making your property journey exceptional.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {state.team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
