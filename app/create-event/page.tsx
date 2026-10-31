"use client";

import { useState } from "react";
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
import { redirect } from "next/navigation";

export default function CreateEventPage() {
  const [eventType, setEventType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

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
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdData),
      });
      
      if (res.ok) {
        toast.success("Event Created Successfully!");
        form.reset();
        redirect("/upcoming-events");
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      toast.error("Network Error: Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl bg-background rounded-3xl p-6 sm:p-10 shadow-xl border border-border/50">
        
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Social Service Drive
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mb-2">
            Create a Community Event
          </h1>
          <p className="text-muted-foreground">
            Organize a local relief effort, environmental cleanup, or community support drive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Event Title <span className="text-primary">*</span></Label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka" 
                className="pl-10 h-12 bg-muted/50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-semibold">Event Type <span className="text-primary">*</span></Label>
              <Select onValueChange={(value) => setEventType(value || "")} value={eventType}>
                <SelectTrigger className="h-12 bg-muted/50">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
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

            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-sm font-semibold">Event Date <span className="text-primary">*</span></Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  min={today} 
                  className="pl-10 h-12 bg-muted/50 block w-full"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Dates must be in the future.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold">Event Location <span className="text-primary">*</span></Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Mirpur 10, Dhaka" 
                className="pl-10 h-12 bg-muted/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-sm font-semibold">Thumbnail Image URL <span className="text-primary">*</span></Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="url"
                id="thumbnail"
                name="thumbnail"
                placeholder="https://images.unsplash.com/photo-..." 
                className="pl-10 h-12 bg-muted/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Event Description <span className="text-primary">*</span></Label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
              <Textarea 
                id="description"
                name="description"
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..." 
                className="pl-10 min-h-[120px] bg-muted/50 resize-none pt-3"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" 
            disabled={isSubmitting}
          >
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