"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EventType } from "@/components/EventCard/EventCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeleteEventModalProps {
  event: EventType | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (id: string) => void;
  userEmail: string;
}

export default function DeleteEventModal({ event, isOpen, onClose, onDeleteSuccess, userEmail }: DeleteEventModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!event) return;

    setIsDeleting(true);
    const token = await getTokenFromClient();

    if (!token) {
      toast.error("Authentication failed. Please login again.");
      setIsDeleting(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-event/${event._id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail }),
      });

      if (res.ok) {
        toast.success("Event deleted successfully!");
        onDeleteSuccess(event._id);
        onClose();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to delete event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <DialogTitle className="text-2xl font-bold font-heading mb-2">
            Delete Event?
          </DialogTitle>
          
          <DialogDescription className="text-muted-foreground mb-8">
            Are you sure you want to delete <strong className="text-foreground">{event?.title}</strong>? This action cannot be undone.
          </DialogDescription>
          
          <div className="flex flex-row gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-12" 
              onClick={onClose} 
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1 rounded-xl h-12 bg-red-600 hover:bg-red-700 text-white" 
              onClick={handleDeleteConfirm} 
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}