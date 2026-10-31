import EventCard, { EventType } from "@/components/EventCard/EventCard";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function RecentEvents() {
  let recentEvents: EventType[] = [];

  try {
    const res = await fetch("http://localhost:5000/recent-events", {
      cache: "no-store",
    });
    if (res.ok) {
      recentEvents = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch recent events:", error);
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <CalendarDays className="w-4 h-4" />
              Don&apos;t Miss Out
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">
              Recent Upcoming Events
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto md:mx-0">
              Discover the newest community drives happening soon. Join hands and make a difference!
            </p>
          </div>
          <Link href="/upcoming-events">
            <Button variant="outline" className="rounded-full">
              View All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm">
            <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground mb-6">Be the first to create an event in your community.</p>
            <Link href="/create-event">
              <Button>Create Event</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}