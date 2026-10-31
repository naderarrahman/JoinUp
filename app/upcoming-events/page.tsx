import Link from "next/link";
import { CalendarDays, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from "@/components/EventCard/EventCard";
import FilterSidebar from "@/components/EventCard/FilterSidebar";

export default async function UpcomingEventsPage() {
  let events: EventType[] = [];

  try {
    const res = await fetch("http://localhost:5000/get-events", {
      cache: "no-store",
    });

    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <CalendarDays className="w-4 h-4" />
              Future Community Drives
            </span>
            <h1 className="text-4xl font-extrabold font-heading text-foreground mb-4">
              Upcoming Events
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Discover verified volunteer initiatives scheduled for upcoming dates. Past events are automatically excluded so you can focus on active drives.
            </p>
          </div>
          <Link href="/create-event">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
              <PlusCircle className="w-5 h-5 mr-2" /> Create Event
            </Button>
          </Link>
        </div>

        {/* Filter and Grid Area */}
        {events.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-primary/10 p-5 rounded-full mb-6">
              <CalendarDays className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">No Events Available Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              It looks like there are no upcoming events scheduled at the moment. Be the first to organize a community drive and make an impact!
            </p>
            <Link href="/create-event">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                <PlusCircle className="w-5 h-5 mr-2" /> Create the First Event
              </Button>
            </Link>
          </div>
        ) : (
          <FilterSidebar initialEvents={events} />
        )}

      </div>
    </div>
  );
}