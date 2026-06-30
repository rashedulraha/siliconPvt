"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag, Clock, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { RelatedPropertiesCarousel } from "@/components/blog/RelatedPropertiesCarousel";
import { NewsletterSubscribe } from "@/components/blog/NewsletterSubscribe";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";
import { useBookmarks } from "@/hooks/useBookmarks";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getPostBySlug, posts } = useBlog();
  const { getMemberById } = useTeam();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const author = getMemberById(post.authorId);
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkToggle = () => {
    toggleBookmark(post.id);
  };

  return (
    <>
      <PageSEO
        title={`${post.title} — EstateHub`}
        description={post.excerpt}
        ogImage={post.coverImage}
      />

      <SectionContainer className="py-24 max-w-4xl space-y-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hover:text-accent">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Blog
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleBookmarkToggle}
            className={`rounded-xl border-border hover:border-accent hover:text-accent gap-1.5 transition-all shadow-sm ${
              bookmarked ? "bg-accent/5 border-accent text-accent" : ""
            }`}>
            <Bookmark
              className={`h-4 w-4 ${bookmarked ? "fill-accent" : ""}`}
            />
            {bookmarked ? "Saved" : "Save Article"}
          </Button>
        </div>

        {/* Cover */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 75vw, 100vw"
          />
        </div>

        {/* Meta & Title */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-accent/15 text-accent border-none hover:bg-accent/20">
              <Tag className="h-3 w-3 mr-1" /> {post.category}
            </Badge>
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-muted text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground pt-4 pb-6 border-b border-border/80">
            {author && (
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted border">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span>
                  By{" "}
                  <strong className="text-foreground font-medium">
                    {author.name}
                  </strong>
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-accent leading-loose whitespace-pre-line text-foreground/80 font-light">
          <p className="text-xl text-foreground leading-relaxed font-normal">
            {post.excerpt}
          </p>
          <Separator className="my-8" />
          <div className="space-y-6">{post.content}</div>
        </article>

        {/* Linked Properties Carousel Section */}
        {post.relatedPropertyIds && post.relatedPropertyIds.length > 0 && (
          <div className="pt-8 border-t border-border/60">
            <RelatedPropertiesCarousel propertyIds={post.relatedPropertyIds} />
          </div>
        )}

        {/* Author Bio Card */}
        {author && (
          <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted flex-shrink-0 border shadow-sm">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-accent leading-none">
                  About the Author
                </p>
                <p className="font-heading font-semibold text-base text-foreground">
                  {author.name}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {author.role}
                </p>
                <p className="text-sm text-muted-foreground/90 font-light leading-relaxed pt-1.5">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-border/60 space-y-6">
            <h2 className="font-heading font-semibold text-2xl text-foreground">
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

        {/* Newsletter Subscription Box */}
        <div className="pt-10">
          <NewsletterSubscribe />
        </div>
      </SectionContainer>
    </>
  );
}
