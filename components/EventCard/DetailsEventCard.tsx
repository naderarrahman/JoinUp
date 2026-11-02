"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Users, Share2, UserCircle2, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import JoinEventButton from "../AvaterFunctionality/JoinEventButton";

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
      
      <div className="relative w-full h-[300px] sm:h-[400px]">
        <Image
          src={event.thumbnail || "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
          <span className="bg-background/90 backdrop-blur-md text-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" /> {event.eventType}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-3 sm:mb-4 leading-tight line-clamp-3">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-base font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg backdrop-blur-sm">
              <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 md:p-10">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-muted/40 p-4 sm:p-5 rounded-2xl mb-8 sm:mb-10 border border-border/50">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-primary/10 p-2.5 sm:p-3 rounded-xl text-primary shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm sm:text-base">0 Volunteers Joined</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Sign up to join hands for this drive</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleShare}
              className="rounded-full shrink-0 h-12 w-12 border-border/60"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            <div className="flex-1 sm:flex-none">
              <JoinEventButton event={event} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-3 sm:mb-4 text-foreground">About this Social Initiative</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            <div className="bg-muted/20 p-5 sm:p-6 rounded-2xl border border-border/40">
              <h3 className="font-bold text-base sm:text-lg mb-3 text-foreground">Volunteer Guidelines</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span> 
                  Please arrive 15 minutes before the scheduled time at the designated location.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span> 
                  Wear comfortable clothing suitable for physical social work and distribution.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span> 
                  Bring any pre-coordinated relief packages or distribution items if requested.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border/60 p-5 sm:p-6 rounded-3xl bg-background shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Initiative Organizer
              </p>
              
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <UserCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-foreground text-sm sm:text-base truncate">{event.organizerEmail.split('@')[0]}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{event.organizerEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 font-medium bg-green-50 dark:bg-green-950/30 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Verified Platform Member
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}