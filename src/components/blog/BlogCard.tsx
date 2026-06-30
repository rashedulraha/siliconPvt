"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Bookmark, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost, TeamMember } from "@/types";
import { formatDate } from "@/lib/utils";
import { useBookmarks } from "@/hooks/useBookmarks";

interface BlogCardProps {
  post: BlogPost;
  author?: TeamMember;
  featured?: boolean;
}

export function BlogCard({ post, author, featured = false }: BlogCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post.id);
  };

  const coverImg =
    post.coverImage ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <Card className="overflow-hidden grid md:grid-cols-2 hover:shadow-2xl transition-all duration-500 border border-border/80 bg-card/60 backdrop-blur-md">
          {/* Cover Image SectionContainer */}
          <div className="relative aspect-[16/10] md:aspect-auto bg-muted min-h-[300px] overflow-hidden">
            <Image
              src={coverImg}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge className="bg-primary/95 text-primary-foreground backdrop-blur-sm border-none shadow-md font-semibold text-[10px] tracking-wider uppercase">
                Featured
              </Badge>
              <Badge className="bg-accent/95 text-accent-foreground backdrop-blur-sm border-none shadow-md font-semibold text-[10px] tracking-wider uppercase">
                {post.category}
              </Badge>
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleBookmarkClick}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg group/btn"
              aria-label="Bookmark article">
              <Bookmark
                className={`h-4.5 w-4.5 transition-colors ${
                  bookmarked
                    ? "fill-accent text-accent"
                    : "text-white group-hover/btn:text-accent"
                }`}
              />
            </button>
          </div>

          {/* Content SectionContainer */}
          <div className="p-6 md:p-10 flex flex-col justify-center space-y-4">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>

            <p className="text-muted-foreground line-clamp-3 text-sm md:text-base font-light leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/60">
              {author && (
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted border border-border shadow-sm">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-foreground">
                      {author.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">
                      {author.role}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center text-xs font-semibold text-accent gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                Read Article
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border border-border/80 bg-card/60 backdrop-blur-md h-full flex flex-col">
        {/* Cover Image SectionContainer */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          <Image
            src={coverImg}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/95 text-primary-foreground backdrop-blur-sm border-none shadow-md font-semibold text-[9px] tracking-wider uppercase px-2 py-0.5">
              {post.category}
            </Badge>
          </div>

          {/* Bookmark button */}
          <button
            onClick={handleBookmarkClick}
            className="absolute top-3 right-3 z-10 w-8.5 h-8.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg group/btn"
            aria-label="Bookmark article">
            <Bookmark
              className={`h-4 w-4 transition-colors ${
                bookmarked
                  ? "fill-accent text-accent"
                  : "text-white group-hover/btn:text-accent"
              }`}
            />
          </button>
        </div>

        {/* Content SectionContainer */}
        <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light">
              {post.excerpt}
            </p>
          </div>

          <div className="space-y-3.5 pt-3.5 border-t border-border/60">
            {/* Author info */}
            {author && (
              <div className="flex items-center gap-2">
                <div className="relative h-7.5 w-7.5 rounded-full overflow-hidden bg-muted border border-border">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="30px"
                  />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-foreground leading-none">
                    {author.name}
                  </span>
                  <span className="block text-[9px] text-muted-foreground mt-0.5">
                    {author.role}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </span>
              </div>
              <span className="inline-flex items-center font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform duration-300">
                Read More
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
