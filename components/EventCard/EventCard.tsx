"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Share2, Users } from "lucide-react";
import { toast } from "sonner";

export interface EventType {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
  createdAt: string;
}

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/events/${event._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title} on JoinUs!`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="group bg-background rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative mt-6">
      
      {/* Image & Ribbon */}
      <div className="relative h-60 w-full">
        <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
          <Image
            src={
              event.thumbnail ||
              "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"
            }
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="absolute -bottom-4 left-5 bg-primary text-primary-foreground px-4 py-2.5 rounded-md flex items-center gap-2 shadow-lg z-10">
          <Users className="w-4 h-4" />
          <span className="font-bold text-sm tracking-wider uppercase">
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 pt-8 flex flex-col flex-1 bg-background">
        
        {/* Date & Location Row (Fixed Alignment) */}
        <div className="flex items-center justify-between text-[13px] text-foreground font-medium mb-4 gap-2">
          <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-foreground mb-6 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Footer (View Event & Share) */}
        <div className="mt-auto flex items-center justify-between">
          <Link
            href={`/events/${event._id}`}
            className="text-primary font-bold text-sm hover:underline hover:underline-offset-4"
          >
            View Event
          </Link>
          <button
            onClick={handleShare}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            title="Share this event"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}