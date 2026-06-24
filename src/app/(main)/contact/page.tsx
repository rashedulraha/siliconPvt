"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";

export default function ContactPage() {
  const { state } = useCMS();
  const { siteSettings } = state;

  const info = [
    { icon: MapPin,    label: "Visit Us",        value: siteSettings.address,        href: undefined },
    { icon: Phone,     label: "Call Us",          value: siteSettings.contactPhone,   href: `tel:${siteSettings.contactPhone}` },
    { icon: Mail,      label: "Email Us",         value: siteSettings.contactEmail,   href: `mailto:${siteSettings.contactEmail}` },
    { icon: Clock,     label: "Business Hours",   value: siteSettings.businessHours || "Sat – Thu: 9AM – 7PM", href: undefined },
    { icon: MessageCircle, label: "WhatsApp",     value: siteSettings.contactPhone,   href: `https://wa.me/${siteSettings.contactPhone?.replace(/\D/g, "")}` },
  ].filter((i) => i.value);

  const whyChoose = [
    { title: "Expert Guidance",  desc: "Get advice from experienced real estate professionals." },
    { title: "Quick Response",   desc: "We reply to all enquiries within 2 business hours." },
    { title: "Free Consultation", desc: "No-obligation free site visit and consultation." },
    { title: "Trusted Support",  desc: "Transparent process from inquiry to registration." },
  ];

  return (
    <>
      <PageSEO title={state.seo.contact.title} description={state.seo.contact.description} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/6 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Contact Us</span>
            </div>
            <h1 className="font-medium text-white text-display-lg leading-[1.08] mb-4">
              Let's Start a{" "}
              <span className="text-gold">Conversation</span>
            </h1>
            <p className="text-white/65 text-lg font-light max-w-xl leading-relaxed">
              Whether you're ready to invest or just exploring — our team is here to guide you
              every step of the way.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Content ───────────────────────────────────── */}
      <section className="section-y bg-background">
        <Container>
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-14 items-start">

            {/* LEFT — Contact Form */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="bg-card rounded-2xl border border-border shadow-luxury p-8">
                {/* Form header */}
                <div className="mb-6">
                  <h2 className="font-medium text-2xl text-foreground mb-1">Send Us a Message</h2>
                  <p className="text-muted-foreground text-sm">Fill out the form and we'll get back to you within 24 hours.</p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* RIGHT — Contact Info + Why */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-5">

              {/* Contact cards */}
              <div className="space-y-3">
                {info.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("https://wa") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card shadow-luxury hover:border-accent/40 hover:shadow-luxury-gold transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/12 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <item.icon className="h-4.5 w-4.5 text-accent h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-label text-muted-foreground mb-0.5">{item.label}</p>
                          <p className="font-medium text-foreground text-sm break-words group-hover:text-accent transition-colors">{item.value}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent ml-auto flex-shrink-0 mt-3 group-hover:translate-x-1 transition-all" />
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card shadow-luxury">
                        <div className="w-10 h-10 rounded-lg bg-accent/12 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-label text-muted-foreground mb-0.5">{item.label}</p>
                          <p className="font-medium text-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Why Contact Us */}
              <div className="bg-card rounded-2xl border border-border shadow-luxury p-6">
                <h3 className="font-medium text-foreground mb-4">Why Contact Us?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {whyChoose.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/60 border border-border">
                      <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl border border-border overflow-hidden shadow-luxury">
                <div className="aspect-[4/3] bg-muted">
                  <iframe
                    title="Office Location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=90.34,23.75,90.44,23.82&layer=mapnik"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm font-semibold text-foreground">{siteSettings.siteName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{siteSettings.address}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
