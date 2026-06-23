"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CreditCard, UserCheck, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";

const features = [
  {
    icon: Shield,
    title: "Legal Security",
    description:
      "All projects are legally verified & approved by relevant authorities.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description:
      "Strategically located in high-growth areas with strong future potential.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description:
      "Flexible installment facilities to make your investment easier.",
  },
  {
    icon: UserCheck,
    title: "Expert Team",
    description:
      "Experienced professionals ready to support you at every step.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/5 border border-primary/15">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Core Advantages
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Premium <span className="text-accent">Investment</span> Features
          </h2>
          <p className="text-muted-foreground font-light text-lg">
            We focus on disciplined, well-documented development — not just
            attractive renders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 rounded-lg bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
