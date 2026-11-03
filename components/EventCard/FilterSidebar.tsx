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
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
      
      <div className="w-full lg:w-1/5 space-y-6 hidden lg:block">
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

      <div className="w-full lg:w-4/5">
        
        <div className="lg:hidden mb-6 space-y-4">
          <div className="relative">
            <Input 
              placeholder="Search events..." 
              className="pl-10 h-12 bg-background rounded-xl text-sm border-border/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-background text-muted-foreground border-border/60 hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-background rounded-3xl p-8 lg:p-12 text-center border border-border/50 shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Search className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold mb-2">No Events Found</h3>
            <p className="text-sm lg:text-base text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any events matching your search or category.
            </p>
            <button 
              className="mt-6 text-sm text-primary font-bold hover:underline px-6 py-2 rounded-full hover:bg-primary/5 transition-colors"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}