"use client";

import { useState } from "react";
import { Filter, Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      
      <div className="w-full lg:w-1/5 space-y-4 lg:space-y-6">
        
        <div className="bg-background rounded-2xl p-4 lg:p-5 shadow-sm border border-border/50">
          <h3 className="font-bold text-base mb-3 hidden lg:flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" /> Search
          </h3>
          <div className="relative">
            <Input 
              placeholder="Search events..." 
              className="pl-10 h-12 lg:h-10 text-sm bg-muted/30 lg:bg-transparent rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="lg:hidden">
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl flex items-center justify-between px-4 border-border/60 bg-background"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="w-4 h-4 text-primary" /> 
              Filter Categories
            </div>
            {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <div className={`bg-background rounded-2xl p-4 lg:p-5 shadow-sm border border-border/50 ${isFilterOpen ? "block animate-in slide-in-from-top-2 duration-200" : "hidden"} lg:block`}>
          <h3 className="font-bold text-base mb-3 hidden lg:flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" /> Categories
          </h3>
          
          <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  if (window.innerWidth < 1024) setIsFilterOpen(false);
                }}
                className={`text-left px-4 py-2 lg:py-2.5 rounded-xl lg:rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted/50 lg:bg-transparent hover:bg-muted text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-4/5">
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