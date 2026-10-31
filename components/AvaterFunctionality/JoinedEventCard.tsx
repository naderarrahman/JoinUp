"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight, Users } from "lucide-react";

interface JoinedEventType {
  _id: string;
  eventId: string;
  userEmail: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  joinedAt: string;
}

interface JoinedEventCardProps {
  event: JoinedEventType;
}

export default function JoinedEventCard({ event }: JoinedEventCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="group bg-background rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative mt-6">
      
      {/* Image & Ribbon */}
      <div className="relative h-56 w-full">
        <div className="absolute inset-0 rounded-t-3xl overflow-hidden">
          <Image
            src={event.thumbnail || "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="absolute -bottom-4 left-5 bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg z-10 whitespace-nowrap">
          <Users className="w-4 h-4" />
          <span className="font-bold text-xs tracking-wider uppercase">{event.eventType}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-8 flex flex-col flex-1 bg-background">
        
        <div className="flex flex-col gap-2.5 text-sm text-foreground font-medium mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold font-heading text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-border/40">
          <Link 
            href={`/events/${event.eventId}`} 
            className="inline-flex items-center text-primary font-bold text-sm hover:underline hover:underline-offset-4"
          >
            View Event Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
}