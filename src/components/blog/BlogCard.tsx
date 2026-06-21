import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPost, TeamMember } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  author?: TeamMember;
  featured?: boolean;
}

export function BlogCard({ post, author, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden grid md:grid-cols-2 hover:shadow-xl transition-all">
          <div className="relative aspect-[16/10] md:aspect-auto bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge className="absolute top-4 left-4" variant="gold">
              Featured
            </Badge>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mt-3 text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
        <div className="relative aspect-[16/10] bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-display text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
            {author && <span>{author.name}</span>}
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
