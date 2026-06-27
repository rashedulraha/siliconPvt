"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserCheck, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useTeam } from "@/hooks/useTeam";
import Link from "next/link";

export function TeamSection() {
  const { team } = useTeam();
  const members = (team || []).slice(0, 4);

  if (members.length === 0) return null;

  return (
    <section className="section-y bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-transparent pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-primary" />
            </div>
            <span className="text-label text-primary/70">Our People</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-display-md font-medium text-foreground"
          >
            The Team Behind Every{" "}
            <span className="text-gold">Site Visit</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 lg:gap-7">
          {members.map((member: any, i: number) => (
            <motion.div
              key={member.id ?? i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-luxury border border-border mb-4 group-hover:shadow-luxury-lg transition-all duration-500">
                <Image
                  src={member.image || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400"}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Hover overlay with social icons */}
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center hover:bg-accent/80 transition-colors duration-300 cursor-pointer">
            <a href="https://www.linkedin.com/in/rashedulraha/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center hover:bg-accent/80 transition-colors duration-300 cursor-pointer">
                   <a href="mailto:rashedulraha.bd@gmail.com?subject=Project Inquiry&body=Hello Rashedul,"
                className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center hover:bg-accent/80 transition-colors duration-300">
                <Mail className="h-4 w-4 text-white" />
              </a>
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-foreground text-sm leading-snug">
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {member.designation || member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
