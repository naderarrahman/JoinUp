"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Eye, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from "../EventCard/EventCard";

interface ManageEventCardProps {
  event: EventType;
  onEdit: (event: EventType) => void;
  onDelete: (event: EventType) => void;
}

export default function ManageEventCard({ event, onEdit, onDelete }: ManageEventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  return (
    <div className="group bg-background rounded-[2rem] border border-border/60 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 flex flex-col overflow-hidden relative">
      
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden p-3 pb-0">
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
          <Image
            src={event.thumbnail || "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
          
          {/* Event Type Badge */}
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 border border-white/20">
            <Users className="w-3.5 h-3.5" /> {event.eventType}
          </div>

          {/* Date Overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <CalendarDays className="w-3.5 h-3.5 text-primary" />
            {formatDate(event.eventDate)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold font-heading text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Action Buttons - Unique Floating Style */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => onEdit(event)}
              variant="outline" 
              size="icon"
              className="h-10 w-10 rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:scale-110"
              title="Edit Event"
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <Button 
              onClick={() => onDelete(event)}
              variant="outline"
              size="icon" 
              className="h-10 w-10 rounded-full border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/40 transition-all duration-300 hover:scale-110"
              title="Delete Event"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <Link href={`/events/${event._id}`}>
            <Button 
              variant="default" 
              className="rounded-full px-5 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              View <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}