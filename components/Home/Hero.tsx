import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, ArrowRight, Plus, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-background to-pink-100/50 dark:from-zinc-950 dark:via-background dark:to-zinc-900 pt-10 pb-16 lg:pt-16 lg:pb-24 flex items-center">
      
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left z-10">
            
            {/* Dynamic Countdown Badge */}
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/60 dark:bg-zinc-800/60 border border-primary/20 backdrop-blur-sm text-primary font-medium mb-6 w-fit mx-auto lg:mx-0 shadow-sm">
              <CalendarDays className="w-5 h-5" />
              <span>Next Event Starts In: <strong className="text-foreground">12 Days, 04 Hours</strong></span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading leading-[1.15] mb-6">
              Join Us to Make a <br className="hidden lg:block" />
              <span className="text-primary relative inline-block">
                Difference
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span> Together
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover, create, and join social service events around you. From winter clothes distribution to plantation drives, be the change you want to see in your community.
            </p>
            
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/upcoming-events">
                <Button size="lg" className="w-full sm:w-auto font-semibold px-8 h-14 text-base shadow-lg shadow-primary/25 group transition-all hover:scale-105">
                  Explore Upcoming Events
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/create-event">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 h-14 text-base border-primary/30 hover:bg-primary/5 text-primary transition-all hover:scale-105">
                  <Plus className="mr-2 w-5 h-5" />
                  Create an Event
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[480px] w-full flex justify-center items-center mt-10 lg:mt-0">
            
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5 -z-10 mix-blend-overlay"></div>

            {/* Main Image Container (Glassmorphism Frame) */}
            <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] bg-white/30 dark:bg-zinc-800/30 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/50 rounded-[3rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 transition-transform duration-500 hover:-translate-y-2">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5z_OUVUHLz0BVwjVjDYut5OajokVcCDSJ-6FwdQ-dZA&s=10" 
                  alt="Community Service" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating Card 1 (Top Left) */}
            <div className="absolute top-6 left-0 sm:left-6 lg:-left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 z-20 flex items-center gap-3 animate-bounce [animation-duration:4s]">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Upcoming Events</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Explore options <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </div>

            {/* Floating Card 2 (Bottom Right) */}
            <div className="absolute bottom-10 right-0 sm:right-6 lg:-right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 z-20 flex items-center gap-4 animate-bounce [animation-duration:5s] [animation-delay:1s]">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="volunteer" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                  +40
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Join & Volunteer</h3>
                <p className="text-xs text-muted-foreground">Be a part of change</p>
              </div>
            </div>

            {/* Floating Card 3 (Top Right - Countdown) */}
            <div className="absolute top-4 right-0 sm:right-4 lg:-right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-border/50 z-20 w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Starts In</span>
              </div>
              <p className="text-xl font-extrabold text-foreground">12d : 04h</p>
              <p className="text-xs text-primary font-medium mt-1">Winter Clothes Drive</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}