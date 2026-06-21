"use client";

import { useState, useMemo } from "react";
import { useCMS } from "@/context/CMSContext";
import { Container } from "@/components/layout/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";

export default function BlogPage() {
  const { posts, allTags, getFeaturedPosts, getRecentPosts } = useBlog();
  const { getMemberById } = useTeam();
  const { state } = useCMS();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featured = getFeaturedPosts(1)[0];
  const restPosts = posts.filter((p) => p.id !== featured?.id);

  const filtered = useMemo(() => {
    if (!activeTag) return restPosts;
    return restPosts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()),
    );
  }, [restPosts, activeTag]);

  return (
    <>
      <PageSEO
        title={state.seo.blog.title}
        description={state.seo.blog.description}
      />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <p className="text-sm font-medium text-secondary mb-3">
            THE ESTATEHUB JOURNAL
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Insights & Stories
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Expert advice, market trends, and inspiring stories from the world
            of real estate.
          </p>
        </Container>
      </section>

      <Container className="py-12 space-y-12">
        {/* Featured Post */}
        {featured && (
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">
              Featured Story
            </h2>
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
            <Button
              variant={activeTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTag(null)}>
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTag(tag)}>
                {tag}
              </Button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-6">
            {activeTag ? `Posts tagged "${activeTag}"` : "Latest Articles"}
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No posts found for this tag.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  author={getMemberById(post.authorId)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
