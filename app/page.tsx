import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";
import Features from "@/components/Home/Features";
import Gallery from "@/components/Home/Gallery";
import Newsletter from "@/components/Home/Newsletter";

export default async function Page() {
  let nextEvent = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/next-event`, {
      cache: "no-store",
    });
    if (res.ok) {
      nextEvent = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch next event:", error);
  }

  return (
    <main className="w-full overflow-hidden">
      <Hero nextEvent={nextEvent} />
      <RecentEvents />
      <Features />
      <Gallery />
      <Newsletter />
    </main>
  );
}