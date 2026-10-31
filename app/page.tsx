import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <RecentEvents />
    </main>
  );
}