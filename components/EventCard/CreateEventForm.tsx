"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { CalendarDays, Image as ImageIcon, MapPin, Type, AlignLeft, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function CreateEventForm() {
  const router = useRouter(); 
  const [eventType, setEventType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const createdData = {
        title: formData.get("title") as string,
        eventType: eventType, 
        eventDate: formData.get("eventDate") as string,
        location: formData.get("location") as string,
        thumbnail: formData.get("thumbnail") as string,
        description: formData.get("description") as string,
        organizerEmail: session?.user?.email || "Unknown User", 
        createdAt: new Date().toISOString(), 
      };

      const selectedDate = new Date(createdData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      if (selectedDate < today) {
        toast.error("You cannot select a past date. Please choose a future date.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(createdData),
      });
      
      if (res.ok) {
        toast.success("Event Created Successfully!");
        form.reset();
        router.push("/upcoming-events"); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to create event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50/50 via-background to-pink-100/30 dark:from-zinc-950 dark:via-background dark:to-zinc-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl w-full bg-background/80 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 dark:border-zinc-800/50 z-10">
        
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Social Service Drive
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mb-3">
            Create a Community Event
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Organize a local relief effort, environmental cleanup, or community support drive. Fill out the details below to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2.5">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">Event Title <span className="text-primary">*</span></Label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input type="text" id="title" name="title" placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka" className="pl-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label htmlFor="eventType" className="text-sm font-semibold text-foreground">Event Type <span className="text-primary">*</span></Label>
              <Select onValueChange={(value) => setEventType(value || "")} value={eventType}>
                <SelectTrigger className="h-14 text-base bg-muted/40 border-border/50 focus:ring-primary/20 focus:border-primary/50 rounded-xl transition-all">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50">
                  <SelectItem value="Cleanup">Cleanup</SelectItem>
                  <SelectItem value="Plantation">Plantation</SelectItem>
                  <SelectItem value="Donation">Donation</SelectItem>
                  <SelectItem value="Winter Relief">Winter Relief</SelectItem>
                  <SelectItem value="Food Drive">Food Drive</SelectItem>
                  <SelectItem value="Health Camp">Health Camp</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="eventDate" className="text-sm font-semibold text-foreground">Event Date <span className="text-primary">*</span></Label>
              <div className="relative group">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input type="date" id="eventDate" name="eventDate" min={today} className="pl-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl block w-full transition-all" required />
              </div>
              <p className="text-xs text-muted-foreground">Dates must be in the future.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="location" className="text-sm font-semibold text-foreground">Event Location <span className="text-primary">*</span></Label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input type="text" id="location" name="location" placeholder="e.g. Mirpur 10, Dhaka" className="pl-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" required />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="thumbnail" className="text-sm font-semibold text-foreground">Thumbnail Image URL <span className="text-primary">*</span></Label>
            <div className="relative group">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input type="url" id="thumbnail" name="thumbnail" placeholder="https://images.unsplash.com/photo-..." className="pl-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" required />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Event Description <span className="text-primary">*</span></Label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Textarea id="description" name="description" placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..." className="pl-12 min-h-[140px] text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl resize-none pt-4 transition-all" required />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl mt-4 shadow-lg shadow-primary/25 group transition-all duration-300 hover:scale-[1.02]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Event...
              </>
            ) : (
              "Create Event"
            )}
          </Button>
        </form>

      </div>
    </div>
  );
}