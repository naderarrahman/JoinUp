import Features from "@/components/Home/Features";
import Gallery from "@/components/Home/Gallery";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Features />
      <RecentEvents />
      <Gallery />
    </main>
  );
}