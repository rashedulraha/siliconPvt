"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useBlog } from "@/hooks/useBlog";
import type { useTeam } from "@/hooks/useTeam";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getPostBySlug, posts } = useBlog();
  const { getMemberById } = useTeam();

  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const author = getMemberById(post.authorId);
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <PageSEO
        title={`${post.title} - EstateHub Blog`}
        description={post.excerpt}
        ogImage={post.coverImage}
      />

      <Container className="py-8 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
          </Link>
        </Button>

        {/* Cover */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Tag className="h-3 w-3 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b">
          {author && (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>
                By <strong className="text-foreground">{author.name}</strong>
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mt-8 prose-headings:font-display prose-a:text-primary">
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            {post.excerpt}
          </p>
          <Separator className="my-8" />
          <div className="text-foreground leading-loose whitespace-pre-line">
            {post.content}
          </div>
        </article>

        {/* Author Bio */}
        {author && (
          <div className="mt-12 p-6 rounded-xl border bg-card">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-semibold text-lg">{author.name}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {author.role}
                </p>
                <p className="text-sm">{author.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Continue Reading
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard
                  key={p.id}
                  post={p}
                  author={getMemberById(p.authorId)}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
