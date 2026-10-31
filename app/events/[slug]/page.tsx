import DetailsEventCard from "@/components/EventCard/DetailsEventCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  let event = null;

  try {
    const res = await fetch(`http://localhost:5000/get-events/${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      event = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch event details:", error);
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The event you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/events"
          className="text-primary font-semibold hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          href="/upcoming-events"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Upcoming Events
        </Link>

        <DetailsEventCard event={event} />
        
      </div>
    </div>
  );
}