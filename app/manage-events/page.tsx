import Link from "next/link";
import { CalendarX2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; 
import { EventType } from "@/components/EventCard/EventCard";
import ManageEventClient from "@/components/AvaterFunctionality/ManageEventClient";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function ManageEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const token = await getTokenFromServer();

  let events: EventType[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events/${session.user.email}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
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

        {events.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm min-h-[400px] flex flex-col items-center justify-center">
            <div className="bg-muted p-5 rounded-full mb-6">
              <CalendarX2 className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">You haven&apos;t created any events yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Organize a community drive and make an impact. Your created events will appear here.
            </p>
            <Link href="/create-event">
              <Button size="lg" className="rounded-full">
                Create Your First Event
              </Button>
            </Link>
          </div>
        ) : (
          <ManageEventClient initialEvents={events} userEmail={session.user.email} />
        )}

      </div>
    </div>
  );
}