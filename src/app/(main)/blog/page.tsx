"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, X } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { Container } from "@/components/layout/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";

export default function BlogPage() {
  const { posts, allTags, getFeaturedPosts } = useBlog();
  const { getMemberById } = useTeam();
  const { state } = useCMS();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const featured = getFeaturedPosts(1)[0];
  const restPosts = posts.filter((p) => p.id !== featured?.id);

  const filtered = useMemo(() => {
    let result = restPosts;
    if (activeTag) {
      result = result.filter((p) => p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [restPosts, activeTag, query]);

  const hasFilters = !!activeTag || !!query.trim();

  return (
    <>
      <PageSEO
        title={state.seo.blog.title}
        description={state.seo.blog.description}
      />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Insights & Knowledge</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-5">
              Blog &amp; <span className="text-gold">News</span>
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              Real estate tips, investment guides, Dhaka property news, and legal information —
              everything you need to make informed property decisions.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search articles, topics, tips…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-10 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/12 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Content ────────────────────────────────────── */}
      <section className="section-y bg-background">
        <Container className="space-y-14">

          {/* Featured Post */}
          {featured && !hasFilters && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-lg bg-accent/12 flex items-center justify-center">
                  <BookOpen className="h-3.5 w-3.5 text-accent" />
                </div>
                <h2 className="font-heading font-semibold text-xl text-foreground">Featured Story</h2>
              </div>
              <BlogCard
                post={featured}
                author={getMemberById(featured.authorId)}
                featured
              />
            </div>
          )}

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 h-8 rounded-full text-sm font-heading font-medium border transition-all ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                All Articles
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-4 h-8 rounded-full text-sm font-heading font-medium border transition-all ${
                    activeTag === tag
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {hasFilters && (
                <button
                  onClick={() => { setActiveTag(null); setQuery(""); }}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-muted text-muted-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">
                {activeTag ? `Articles tagged "${activeTag}"` : query ? `Results for "${query}"` : "Latest Articles"}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                {filtered.length}
              </span>
            </div>
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 rounded-2xl border border-border bg-muted/40"
                >
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground font-medium">No articles found.</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Try a different tag or search term.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTag + query}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      author={getMemberById(post.authorId)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  );
}
