"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { EventType } from "@/components/EventCard/EventCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = ["Donation", "Cleanup", "Plantation", "Winter Relief", "Food Drive", "Health Camp", "Education"];

interface EditEventModalProps {
  event: EventType | null;
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  userEmail: string;
}

export default function EditEventModal({ event, isOpen, onClose, onEditSuccess, userEmail }: EditEventModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [prevEventId, setPrevEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EventType>>({});
  const [eventType, setEventType] = useState("");

  if (event && event._id !== prevEventId) {
    setPrevEventId(event._id);
    setFormData(event);
    setEventType(event.eventType);
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    
    setIsUpdating(true);
    const token = await getTokenFromClient();

    if (!token) {
      toast.error("Authentication failed. Please login again.");
      setIsUpdating(false);
      return;
    }

    const updatedData = {
      ...formData,
      eventType: eventType,
      userEmail: userEmail,
    };

    try {
      const res = await fetch(`http://localhost:5000/update-event/${event._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Event updated successfully!");
        onEditSuccess();
        onClose();
      } else {
        toast.error("Failed to update event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading flex items-center gap-2">
            Edit Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input 
              value={formData.title || ""} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select onValueChange={(value) => setEventType(value || "")} value={eventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Event Date</Label>
              <Input 
                type="date"
                value={formData.eventDate ? new Date(formData.eventDate).toISOString().split("T")[0] : ""} 
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                value={formData.location || ""} 
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input 
                value={formData.thumbnail || ""} 
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={formData.description || ""} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="min-h-[100px] resize-none"
              required 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="bg-primary">
              {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}