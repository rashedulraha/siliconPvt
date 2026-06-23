"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useBlog } from "@/hooks/useBlog";

export function LatestInsights() {
  const { posts } = useBlog();
  const recent = posts.slice(0, 3);

  return (
    <section className="section-y bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/2 via-transparent to-primary/2 pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">Press & Insights</span>
            </div>
            <h2 className="font-serif text-display-md font-bold text-foreground leading-[1.12]">
              Latest{" "}
              <span className="text-gold">Insights</span> & News
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors duration-300 self-start sm:self-auto"
          >
            All Articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.13 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-card rounded-xl overflow-hidden border border-border card-lift shadow-luxury flex flex-col h-full">
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Date pill */}
                    <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[52px] shadow-luxury border border-border/50">
                      <div className="font-serif text-lg font-bold text-primary leading-none">
                        {new Date(post.publishedAt).getDate()}
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-accent mt-0.5">
                        {new Date(post.publishedAt).toLocaleString("default", { month: "short" })}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-base text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-light leading-relaxed mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.09em] text-accent group-hover:gap-2.5 transition-all duration-300">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
