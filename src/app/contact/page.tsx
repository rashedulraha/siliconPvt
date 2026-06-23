"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";

export default function ContactPage() {
  const { state } = useCMS();
  const { siteSettings } = state;

  const info = [
    {
      icon: MapPin,
      label: "Visit Us",
      value: siteSettings.address,
      href: undefined,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: siteSettings.contactPhone,
      href: `tel:${siteSettings.contactPhone}`,
    },
    {
      icon: Mail,
      label: "Email Us",
      value: siteSettings.contactEmail,
      href: `mailto:${siteSettings.contactEmail}`,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: siteSettings.businessHours || "Mon - Fri: 9AM - 6PM",
      href: undefined,
    },
  ];

  return (
    <>
      <PageSEO
        title={state.seo.contact.title}
        description={state.seo.contact.description}
      />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <p className="text-sm font-medium text-secondary mb-3">
            GET IN TOUCH
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Let's Start a Conversation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Have a question or ready to begin your real estate journey? We'd
            love to hear from you.
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Info + Map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {info.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-lg border bg-card">
                    <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:text-primary transition-colors break-words">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted">
                  <iframe
                    title="Office Location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02,40.70,-73.95,40.78&layer=mapnik&marker=40.748817,-73.985428"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
