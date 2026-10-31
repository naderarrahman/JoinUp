"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus, LogOut } from "lucide-react";
import { EventType } from "../EventCard/EventCard";

interface JoinEventButtonProps {
  event: EventType;
}

export default function JoinEventButton({ event }: JoinEventButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [joinedRecordId, setJoinedRecordId] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!session?.user) {
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/check-join-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: event._id, userEmail: session.user.email }),
        });
        
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setIsJoined(data.isJoined);
            if (data.isJoined) {
              setJoinedRecordId(data.recordId);
            }
          }
        }
      } catch (error) {
        console.error("Status check failed", error);
      } finally {
        if (isMounted) {
          setCheckingStatus(false);
        }
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, [session, event._id]);

  const handleJoin = async () => {
    if (!session?.user) {
      toast.error("Please login to join.");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joinedData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Successfully joined the event!");
        setIsJoined(true);
        setJoinedRecordId(data.data._id);
      } else {
        toast.error(data.error || "Failed to join event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!joinedRecordId) return;
    
    setIsJoining(true);
    try {
      const res = await fetch(`http://localhost:5000/leave-event/${joinedRecordId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("You have left the event.");
        setIsJoined(false);
        setJoinedRecordId(null);
        router.refresh(); 
      } else {
        toast.error("Failed to leave event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsJoining(false);
    }
  };

  if (isPending || (session?.user && checkingStatus)) {
    return (
      <Button disabled size="lg" className="w-full sm:w-auto font-bold px-8 h-12 rounded-xl">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        Checking...
      </Button>
    );
  }

  return (
    <>
      {isJoined ? (
        <Button
          onClick={handleLeave}
          disabled={isJoining}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto font-bold px-8 h-12 rounded-xl border-destructive text-destructive hover:bg-destructive/10"
        >
          {isJoining ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Leaving...
            </>
          ) : (
            <>
              <LogOut className="w-5 h-5 mr-2" />
              Leave Event
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleJoin}
          disabled={isJoining}
          size="lg"
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
      )}
    </>
  );
}