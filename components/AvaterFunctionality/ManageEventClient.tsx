"use client";

import { useState } from "react";
import { EventType } from "@/components/EventCard/EventCard";
import ManageEventCard from "@/components/AvaterFunctionality/ManageEventCard";
import DeleteEventModal from "../DeleteAndEditButton/DeleteEventModal";
import EditEventModal from "../DeleteAndEditButton/EditEventModal";

interface ManageEventClientProps {
  initialEvents: EventType[];
  userEmail: string;
}

export default function ManageEventClient({ initialEvents, userEmail }: ManageEventClientProps) {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = (id: string) => {
    setEvents(events.filter((e) => e._id !== id));
  };

  const handleEditSuccess = () => {
    window.location.reload(); 
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <ManageEventCard 
            key={event._id} 
            event={event} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
          />
        ))}
      </div>

      <DeleteEventModal 
        event={selectedEvent}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteSuccess={handleDeleteSuccess}
        userEmail={userEmail}
      />

      <EditEventModal 
        event={selectedEvent}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditSuccess={handleEditSuccess}
        userEmail={userEmail}
      />
    </>
  );
}