"use client";

import { useState } from "react";
import { CalendarDays, Image as ImageIcon, MapPin, Type, AlignLeft, Sparkles } from "lucide-react";
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

export default function CreateEventPage() {
  const [eventType, setEventType] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const createdData = {
      title: formData.get("title") as string,
      eventType: eventType, 
      eventDate: formData.get("eventDate") as string,
      location: formData.get("location") as string,
      thumbnail: formData.get("thumbnail") as string,
      description: formData.get("description") as string,
    };

    const selectedDate = new Date(createdData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
      alert("Error: You cannot select a past date. Please choose a future date.");
      return;
    }

    console.log("Created Data:", createdData);
    alert("Event Created Successfully!");
    
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl bg-background rounded-3xl p-6 sm:p-10 shadow-xl border border-border/50">
        
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Event Title */}
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

          {/* Grid: Event Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Event Type */}
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-semibold">Event Type <span className="text-primary">*</span></Label>
              <Select onValueChange={(value) => setEventType(value || "")}  value={eventType} required>
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

            {/* Event Date */}
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

          {/* Location */}
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

          {/* Thumbnail URL */}
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

          {/* Description */}
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

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20">
            Create Event
          </Button>
        </form>

      </div>
    </div>
  );
}