"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Users, Share2, UserCircle2, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EventType {
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

interface DetailsEventCardProps {
  event: EventType;
}

export default function DetailsEventCard({ event }: DetailsEventCardProps) {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
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
    <div className="bg-background rounded-3xl overflow-hidden shadow-xl border border-border/50">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] sm:h-[400px]">
        <Image
          src={event.thumbnail || "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="bg-background/90 backdrop-blur-md text-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" /> {event.eventType}
          </span>
        </div>

        {/* Bottom Text on Image */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-4 leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base font-medium">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-primary" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <CalendarDays className="w-4 h-4 text-primary" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-10">
        
        {/* Action Bar (Volunteers & Join Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/40 p-4 rounded-2xl mb-10 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-foreground">0 Volunteers Joined</p>
              <p className="text-sm text-muted-foreground">Sign up to join hands for this drive</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleShare}
              className="rounded-full shrink-0 h-12 w-12 border-border/60"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            {/* Join Event Button (Placeholder for now) */}
            <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-12 shadow-lg shadow-primary/20 rounded-xl">
              Join Event
            </Button>
          </div>
        </div>

        {/* Main Grid: About & Organizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Side: About & Guidelines */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">About this Social Initiative</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            <div className="bg-muted/20 p-6 rounded-2xl border border-border/40">
              <h3 className="font-bold text-lg mb-3 text-foreground">Volunteer Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> Please arrive 15 minutes before the scheduled time at the designated location.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> Wear comfortable clothing suitable for physical social work and distribution.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> Bring any pre-coordinated relief packages or distribution items if requested.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Organizer Info */}
          <div className="lg:col-span-1">
            <div className="border border-border/60 p-6 rounded-3xl bg-background shadow-sm">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Initiative Organizer
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-foreground truncate">{event.organizerEmail.split('@')[0]}</p>
                  <p className="text-xs text-muted-foreground truncate">{event.organizerEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 dark:bg-green-950/30 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                Verified Platform Member
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}