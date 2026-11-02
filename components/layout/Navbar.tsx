"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { 
  Sun, 
  Moon, 
  LogOut, 
  PlusCircle, 
  CalendarDays, 
  Heart, 
  LogIn, 
  Menu, 
  X 
} from "lucide-react";
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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const userInitial = session?.user?.name 
    ? session.user.name.charAt(0).toUpperCase() 
    : "U";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        <div className="flex items-center z-20">
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

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center z-10">
          <Link 
            href="/upcoming-events" 
            className="text-sm font-bold text-foreground/70 transition-all duration-300 hover:text-primary hover:bg-primary/10 px-6 py-2.5 rounded-full"
          >
            Upcoming Events
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 z-20">
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="relative rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <div className="hidden md:block transition-all duration-300 ease-in-out">
            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              
              <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
                  <span className="absolute inset-0 bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {session.user.name.split(" ")[0]}
                  </span>
                </PopoverTrigger>
                
                <PopoverContent 
                  align="end" 
                  className="w-64 p-0 mt-3 rounded-2xl overflow-hidden shadow-2xl border-border/50 animate-in fade-in slide-in-from-top-4 duration-300 ease-out"
                >
                  <div className="bg-muted/30 p-4 border-b border-border/50">
                    <p className="font-bold text-foreground truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => handleNavigation("/create-event")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-foreground"
                    >
                      <PlusCircle className="mr-3 h-4 w-4" /> Create Event
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation("/manage-events")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-foreground"
                    >
                      <CalendarDays className="mr-3 h-4 w-4" /> Manage Events
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation("/joined-events")}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-foreground"
                    >
                      <Heart className="mr-3 h-4 w-4" /> Joined Events
                    </button>
                  </div>

                  <div className="p-2 border-t border-border/50">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-bold rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-200 text-left"
                    >
                      <LogOut className="mr-3 h-4 w-4" /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

            ) : (
              
              <Link href="/sign-in">
                <Button className="font-bold shadow-lg shadow-primary/20 px-8 rounded-full animate-in fade-in zoom-in duration-300 hover:scale-105 transition-transform">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50 hover:bg-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

        </div>
        
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 shadow-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              href="/upcoming-events" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-foreground px-4 py-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors text-center"
            >
              Upcoming Events
            </Link>
            
            <div className="h-[1px] w-full bg-border/50" />

            {session ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                   <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                      {session.user.image ? (
                        <Image src={session.user.image} alt="User" fill className="object-cover" />
                      ) : (
                        <span className="text-primary font-bold text-lg">{userInitial}</span>
                      )}
                   </div>
                   <div>
                     <p className="font-bold text-foreground text-sm">{session.user.name}</p>
                     <p className="text-xs text-muted-foreground">{session.user.email}</p>
                   </div>
                </div>

                <Button variant="ghost" className="justify-start text-base font-semibold h-12 rounded-xl" onClick={() => handleNavigation("/create-event")}>
                  <PlusCircle className="mr-3 h-5 w-5" /> Create Event
                </Button>
                <Button variant="ghost" className="justify-start text-base font-semibold h-12 rounded-xl" onClick={() => handleNavigation("/manage-events")}>
                  <CalendarDays className="mr-3 h-5 w-5" /> Manage Events
                </Button>
                <Button variant="ghost" className="justify-start text-base font-semibold h-12 rounded-xl" onClick={() => handleNavigation("/joined-events")}>
                  <Heart className="mr-3 h-5 w-5" /> Joined Events
                </Button>
                <Button variant="ghost" className="justify-start text-base font-bold h-12 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="mr-3 h-5 w-5" /> Logout
                </Button>
              </div>
            ) : (
              <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button className="w-full font-bold h-12 rounded-xl shadow-lg shadow-primary/20">
                  <LogIn className="mr-2 h-5 w-5" /> Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}