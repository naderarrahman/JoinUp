"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCard, { EventType } from "./EventCard";

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function FilterSidebar({ initialEvents }: { initialEvents: EventType[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = initialEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.eventType === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 space-y-6">
        <div className="bg-background rounded-2xl p-5 shadow-sm border border-border/50">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" /> Search
          </h3>
          <div className="relative">
            <Input 
              placeholder="Search..." 
              className="pl-9 h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-background rounded-2xl p-5 shadow-sm border border-border/50">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" /> Categories
          </h3>
          <div className="flex flex-col gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="w-full lg:w-4/5">
        {filteredEvents.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-border/50 shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Events Found</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any events matching your search or category.
            </p>
            <button 
              className="mt-6 text-sm text-primary font-semibold hover:underline"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}