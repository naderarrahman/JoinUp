"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { EventType } from "../EventCard/EventCard";

interface JoinEventButtonProps {
  event: EventType;
}

export default function JoinEventButton({ event }: JoinEventButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinButton = async () => {
    if (!session?.user) {
      toast.error("Please login to join this event.");
      router.push("/sign-in");
      return;
    }

    setIsJoining(true);

    const joinedData = {
      eventId: event._id,
      userEmail: session.user.email,
      title: event.title,
      eventType: event.eventType,
      eventDate: event.eventDate,
      location: event.location,
      thumbnail: event.thumbnail,
      joinedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/join-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinedData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Successfully joined the event!");
      } else {
        toast.error(data.error || "Failed to join event.");
      }
    } catch (error) {
      console.error("Join Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Button
      onClick={handleJoinButton}
      size="lg"
      disabled={isJoining}
      className="w-full sm:w-auto font-bold px-8 h-12 shadow-lg shadow-primary/20 rounded-xl"
    >
      {isJoining ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Joining...
        </>
      ) : (
        <>
          <UserPlus className="w-5 h-5 mr-2" />
          Join Event
        </>
      )}
    </Button>
  );
}