import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all">
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="font-heading text-xl font-bold">{member.name}</h3>
          <p className="text-sm text-white/90">{member.role}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {member.bio}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {member.social.linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.email && (
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${member.email}`} aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.phone && (
            <Button variant="ghost" size="icon" asChild>
              <a href={`tel:${member.phone}`} aria-label="Phone">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
