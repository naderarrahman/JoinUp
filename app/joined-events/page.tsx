import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarDays, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import JoinedEventCard, { JoinedEventType } from "@/components/AvaterFunctionality/JoinedEventCard";
import { auth } from "@/lib/auth"; 
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const token = await getTokenFromServer();

  let events: JoinedEventType[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${session.user.email}`,
      { 
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        cache: "no-store" 
      }
    );
    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch joined events", error);
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <CalendarDays className="w-4 h-4" />
            My Schedule
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-foreground mb-4">
            Joined Events
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Here are all the community drives you have signed up for. Events are sorted by their upcoming dates.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-muted p-5 rounded-full mb-6">
              <HeartCrack className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">
              You haven&apos;t joined any events yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Explore upcoming events and join a cause that matters to you. Your journey to making a difference starts here!
            </p>
            <Link href="/upcoming-events">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                Explore Upcoming Events
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <JoinedEventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}