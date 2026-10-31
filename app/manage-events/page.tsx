
"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarX2, PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EventType } from "@/components/EventCard/EventCard";
import ManageEventCard from "@/components/AvaterFunctionality/ManageEventCard";

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    const fetchMyEvents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/my-events/${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [session, isPending, router]);

  const handleEditClick = (event: EventType) => {
    console.log("Edit clicked for:", event.title);
    toast.info("Edit functionality will be added in the next step!");
  };

  const handleDeleteClick = (event: EventType) => {
    console.log("Delete clicked for:", event.title);
    toast.info("Delete functionality will be added soon!");
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-background p-8 rounded-3xl border border-border/50 shadow-sm">
          <div>
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <CalendarX2 className="w-4 h-4" /> Organizer Dashboard
            </span>
            <h1 className="text-3xl font-extrabold font-heading text-foreground">
              Manage My Events
            </h1>
            <p className="text-muted-foreground mt-2">
              View, edit, and manage the events you have created.
            </p>
          </div>
          <Link href="/create-event">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
              <PlusCircle className="w-5 h-5 mr-2" /> Create New Event
            </Button>
          </Link>
        </div>

        {/* Empty State / Grid */}
        {events.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm min-h-[400px] flex flex-col items-center justify-center">
            <div className="bg-muted p-5 rounded-full mb-6">
              <CalendarX2 className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">You haven&apos;t created any events yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Organize a community drive and make an impact. Your created events will appear here.
            </p>
            <Button size="lg" onClick={() => router.push("/create-event")} className="rounded-full">
              Create Your First Event
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <ManageEventCard 
                key={event._id} 
                event={event} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteClick} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}