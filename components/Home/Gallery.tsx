import Image from "next/image";
import Link from "next/link";
import { EventType } from "@/components/EventCard/EventCard";
import { MapPin, Camera, ArrowUpRight } from "lucide-react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1593113565214-8ddc0bc1c2d4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
];

const isValidUrl = (url: string | undefined) => {
  if (!url) return false;
  if (url.includes("google.com")) return false;
  if (!url.startsWith("http")) return false;
  return true;
};

export default async function Gallery() {
  let pastEvents: EventType[] = [];

  try {
    const res = await fetch("http://localhost:5000/past-events", {
      cache: "no-store",
    });
    if (res.ok) {
      pastEvents = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch past events:", error);
  }

  const totalSlots = 7;
  const displaySlots = Array.from({ length: totalSlots }).map((_, index) => {
    const event = pastEvents[index];
    
    if (event) {
      const imageSrc = isValidUrl(event.thumbnail) 
        ? event.thumbnail 
        : fallbackImages[index % fallbackImages.length];
        
      return {
        isEvent: true,
        imageSrc,
        title: event.title,
        location: event.location,
        link: `/events/${event._id}`,
      };
    } else {
      return {
        isEvent: false,
        imageSrc: fallbackImages[index % fallbackImages.length],
        title: "Community Service Drive",
        location: "Local Community",
        link: "#",
      };
    }
  });

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Camera className="w-4 h-4" /> Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-4">
            Moments of Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            A glimpse into the community service events we've successfully completed together.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
          {displaySlots.map((slot, index) => {
            
            // প্রথম ছবিটি বড়, বাকিগুলো নরমাল
            let gridClass = "col-span-1 row-span-1";
            if (index === 0) gridClass = "md:col-span-2 md:row-span-2"; // বড় কার্ড
            if (index === 3) gridClass = "md:col-span-2 md:row-span-1"; // মাঝখানের চওড়া কার্ড
            if (index === 5) gridClass = "md:col-span-2 md:row-span-1"; // নিচের চওড়া কার্ড

            return (
              <Link 
                key={index} 
                href={slot.link}
                className={`relative rounded-3xl overflow-hidden group shadow-lg block ${gridClass}`}
              >
                <Image
                  src={slot.imageSrc}
                  alt={slot.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* ডার্ক গ্রেডিয়েন্ট ওভারলে (যাতে লেখা ফুটে ওঠে) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* লেখা এবং আইকন */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className={`text-white font-bold font-heading mb-2 line-clamp-2 ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {slot.title}
                    </h3>
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate max-w-[150px]">{slot.location}</span>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}