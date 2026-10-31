import Features from "@/components/Home/Features";
import Gallery from "@/components/Home/Gallery";
import Hero from "@/components/Home/Hero";
import Newsletter from "@/components/Home/Newsletter";
import RecentEvents from "@/components/Home/RecentEvents";

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </main>
  );
}