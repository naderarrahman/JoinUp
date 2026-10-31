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
    <div className="group bg-background rounded-3xl border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.thumbnail || "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> {event.eventType}
        </div>

        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white/90 text-sm font-medium">
          <CalendarDays className="w-4 h-4" />
          {formatDate(event.eventDate)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold font-heading text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          <Link href={`/events/${event._id}`} className="w-full">
            <Button variant="outline" className="w-full rounded-xl px-0 text-foreground font-semibold hover:bg-muted">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button 
            onClick={() => onEdit(event)}
            variant="secondary" 
            className="w-full rounded-xl px-0 text-primary bg-primary/10 hover:bg-primary/20 font-semibold"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button 
            onClick={() => onDelete(event)}
            variant="destructive" 
            className="w-full rounded-xl px-0 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}