"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useTeam } from "@/hooks/useTeam";

export function TeamSection() {
  const { team } = useTeam();
  const teamMembers = (team || []).slice(0, 4);

  if (teamMembers.length === 0) return null;

  return (
    <section className="py-32 bg-secondary/40">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/5 border border-primary/15">
            <UserCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Our People
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            The Team Behind Every{" "}
            <span className="text-accent">Site Visit</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member: any, i: number) => (
            <motion.div
              key={member.id ?? i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border mb-4">
                <Image
                  src={
                    member.image ||
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400"
                  }
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif font-bold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {member.designation || member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
