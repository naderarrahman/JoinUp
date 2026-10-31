import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-background to-pink-100/50 dark:from-zinc-950 dark:via-background dark:to-zinc-900 px-4">
      <div className="relative z-10 w-full max-w-lg text-center">
        
        <div className="mx-auto w-32 h-32 mb-8 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="relative bg-background border-4 border-primary/20 w-full h-full rounded-full flex items-center justify-center shadow-lg">
            <SearchX className="w-14 h-14 text-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold font-heading text-foreground mb-4">
          4<span className="text-primary">0</span>4
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-12 rounded-xl shadow-lg shadow-primary/20">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/upcoming-events">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold px-8 h-12 rounded-xl">
              Explore Events
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}