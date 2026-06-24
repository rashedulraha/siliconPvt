"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, X, LayoutGrid } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { Container } from "@/components/layout/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { NewsletterSubscribe } from "@/components/blog/NewsletterSubscribe";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Buying Guide",
  "Selling Tips",
  "Market Trends",
  "Home Decor & Renovation",
  "Neighborhood Guides",
] as const;

export default function BlogPage() {
  const { posts } = useBlog();
  const { getMemberById } = useTeam();
  const { state } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Get the single featured post if no search or filter is active
  const featured = useMemo(() => {
    return posts.find((p) => p.featured);
  }, [posts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let result = posts;

    // If we're not filtering, we exclude the featured post from the grid
    if (!activeCategory && !query.trim() && featured) {
      result = result.filter((p) => p.id !== featured.id);
    }

    if (activeCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeCategory, query, featured]);

  const hasFilters = !!activeCategory || !!query.trim();

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

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
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Insights & Knowledge</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-5">
              Blog &amp; <span className="text-gold">News</span>
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              Real estate guides, investment trends, Dhaka property insights, legal taxes, and interior tips — everything you need for confident property decisions.
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
                placeholder="Search guides, trends, tips…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(6); // reset pagination on search
                }}
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
                <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-accent" />
                </div>
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Featured Story
                </h2>
              </div>
              <BlogCard
                post={featured}
                author={getMemberById(featured.authorId)}
                featured
              />
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
            <button
              onClick={() => {
                setActiveCategory(null);
                setVisibleCount(6);
              }}
              className={`px-4 h-9 rounded-full text-xs font-heading font-semibold border transition-all cursor-pointer ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/45 hover:text-foreground"
              }`}
            >
              All Articles
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(activeCategory === cat ? null : cat);
                  setVisibleCount(6);
                }}
                className={`px-4 h-9 rounded-full text-xs font-heading font-semibold border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border bg-card text-muted-foreground hover:border-accent/45 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setQuery("");
                  setVisibleCount(6);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/15 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>

          {/* Blog Grid */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                <LayoutGrid className="h-4 w-4 text-accent" />
              </div>
              <h2 className="font-heading font-semibold text-xl text-foreground">
                {activeCategory
                  ? `${activeCategory} Articles`
                  : query
                  ? `Search Results for "${query}"`
                  : "Latest Insights"}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                {filteredPosts.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/20"
                >
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4 animate-pulse" />
                  <p className="text-foreground font-semibold text-base">
                    No articles found
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto font-light">
                    Try searching for another topic or clear the current filters.
                  </p>
                  {hasFilters && (
                    <Button
                      onClick={() => {
                        setActiveCategory(null);
                        setQuery("");
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-5 rounded-lg border-accent/30 text-accent hover:bg-accent/5"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </motion.div>
              ) : (
                <div className="space-y-12">
                  <motion.div
                    key={activeCategory + query + visibleCount}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  >
                    {paginatedPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        author={getMemberById(post.authorId)}
                      />
                    ))}
                  </motion.div>

                  {/* Load More Button */}
                  {filteredPosts.length > visibleCount && (
                    <div className="flex justify-center pt-4">
                      <Button
                        onClick={handleLoadMore}
                        variant="outline"
                        className="rounded-xl px-8 h-11 border-border font-medium hover:border-accent hover:text-accent transition-all cursor-pointer shadow-sm hover:shadow-md"
                      >
                        Load More Articles
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Newsletter Box */}
          <div className="pt-8">
            <NewsletterSubscribe />
          </div>
        </Container>
      </section>
    </>
  );
}
