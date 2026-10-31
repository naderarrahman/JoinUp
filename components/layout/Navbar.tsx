"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut, PlusCircle, CalendarDays, Heart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const userInitial = session?.user?.name 
    ? session.user.name.charAt(0).toUpperCase() 
    : "U";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        {/* Left: Logo */}
        <div className="flex items-center z-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo/logo.png" 
                alt="JoinUs Logo" 
                width={48} 
                height={48} 
                className="h-11 w-11 object-contain" 
                priority
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground font-heading flex items-center gap-1">
              Join<span className="text-primary">Us</span>
            </span>
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 z-10">
          <Link 
            href="/events" 
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 z-10">
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="relative rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Auth Logic */}
          <div className="transition-all duration-300 ease-in-out">
            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              
              /* Logged In State: Popover without asChild */
              <Popover>
                
                <PopoverTrigger className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 focus:outline-none group cursor-pointer flex items-center justify-center bg-primary/10">
                  {session.user.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-primary font-bold text-lg">
                      {userInitial}
                    </span>
                  )}
                  {/* Hover Name Tooltip */}
                  <span className="absolute inset-0 bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {session.user.name.split(" ")[0]}
                  </span>
                </PopoverTrigger>
                
                {/* Popover Menu Content */}
                <PopoverContent align="end" className="w-64 p-0 mt-2 rounded-xl overflow-hidden shadow-xl border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* User Info Header */}
                  <div className="bg-muted/50 p-4 border-b border-border/50">
                    <p className="font-bold text-foreground truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-2 space-y-1">
                    <Link 
                      href="/create-event"
                      className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary/10 hover:text-primary transition-colors text-foreground"
                    >
                      <PlusCircle className="mr-3 h-4 w-4" /> Create Event
                    </Link>
                    
                    <Link 
                      href="/manage-events"
                      className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary/10 hover:text-primary transition-colors text-foreground"
                    >
                      <CalendarDays className="mr-3 h-4 w-4" /> Manage Events
                    </Link>
                    
                    <Link 
                      href="/joined-events"
                      className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary/10 hover:text-primary transition-colors text-foreground"
                    >
                      <Heart className="mr-3 h-4 w-4" /> Joined Events
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="p-2 border-t border-border/50">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors text-left"
                    >
                      <LogOut className="mr-3 h-4 w-4" /> Logout
                    </button>
                  </div>

                </PopoverContent>
              </Popover>

            ) : (
              
              /* Logged Out State: Sign In Button */
              <Link href="/sign-in">
                <Button className="font-semibold shadow-md px-6 rounded-full animate-in fade-in duration-300">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
      </div>
    </nav>
  );
}