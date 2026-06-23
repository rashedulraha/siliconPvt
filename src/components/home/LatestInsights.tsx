"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { useBlog } from "@/hooks/useBlog";

export function LatestInsights() {
  const { posts } = useBlog();
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-32 bg-muted/40">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/5 border border-primary/15 mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Press & Media
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Latest <span className="text-accent">Insights</span> & News
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-primary/5 self-start sm:self-auto group rounded-md">
            <Link href="/blog" className="flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-card rounded-lg overflow-hidden border border-border group-hover:border-accent/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-card text-center px-3 py-2 rounded-md shadow-sm min-w-[52px]">
                      <div className="font-serif text-lg font-bold leading-none text-primary">
                        {new Date(post.publishedAt).getDate()}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mt-1">
                        {new Date(post.publishedAt).toLocaleString("default", {
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-3 mb-5 font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="text-sm font-semibold text-accent flex items-center gap-1.5 mt-auto group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
