import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6 md:p-8 h-full flex flex-col relative">
      <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      {/* Quote */}
      <p className="text-foreground leading-relaxed flex-1 italic">
        "{testimonial.quote}"
      </p>
      {/* Author */}
      <div className="mt-6 flex items-center gap-3 pt-6 border-t">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  );
}
