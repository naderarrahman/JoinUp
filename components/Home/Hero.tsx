"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight, Plus, Clock } from "lucide-react";

interface HeroProps {
  nextEvent: {
    _id: string;
    title: string;
    eventDate: string;
  } | null;
}

export default function Hero({ nextEvent }: HeroProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    if (!nextEvent) return;

    const calculateCountdown = () => {
      const eventTime = new Date(nextEvent.eventDate).getTime();
      const now = new Date().getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setCountdown({ days, hours });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000 * 60);
    return () => clearInterval(interval);
  }, [nextEvent]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-zinc-950 dark:via-background dark:to-zinc-900 py-16 lg:py-24 flex items-center">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col justify-center text-center lg:text-left z-10">
            
            {nextEvent && (
              <Link 
                href={`/events/${nextEvent._id}`}
                className="group inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-primary/20 backdrop-blur-md text-primary font-medium mb-8 w-fit mx-auto lg:mx-0 shadow-sm hover:bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform" />
                <span className="text-sm">Next Event: <strong className="text-foreground group-hover:text-primary transition-colors">{nextEvent.title}</strong> in {countdown.days}d {countdown.hours}h</span>
              </Link>
            )}
            
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading leading-[1.15] mb-6">
              Join Us to Make a <br className="hidden lg:block" />
              <span className="text-primary relative inline-block">
                Difference
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>{" "}
              Together
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover, create, and join social service events around you. From winter clothes distribution to plantation drives, be the change you want to see in your community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/upcoming-events">
                <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-14 text-base shadow-lg shadow-primary/20 group transition-all duration-300 hover:scale-105 hover:shadow-primary/40">
                  Explore Upcoming Events
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/create-event">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold px-8 h-14 text-base border-primary/30 hover:bg-primary/5 text-primary transition-all duration-300 hover:scale-105">
                  <Plus className="mr-2 w-5 h-5" />
                  Create an Event
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[480px] w-full flex justify-center items-center mt-12 lg:mt-0">
            
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5 -z-10 mix-blend-overlay rounded-full blur-sm" />

            <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] bg-white/40 dark:bg-zinc-800/40 backdrop-blur-2xl border-2 border-white/50 dark:border-zinc-700/50 rounded-[3rem] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-10 transition-transform duration-500 hover:-translate-y-2">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5z_OUVUHLz0BVwjVjDYut5OajokVcCDSJ-6FwdQ-dZA&s=10" 
                  alt="Community Service" 
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <Link href="/upcoming-events" className="absolute top-8 left-0 sm:left-4 lg:-left-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border/50 z-20 flex items-center gap-3 animate-bounce [animation-duration:4s] hover:scale-105 transition-transform cursor-pointer">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Upcoming Events</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Explore options <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </Link>

            <Link href="/upcoming-events" className="absolute bottom-12 right-0 sm:right-4 lg:-right-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border/50 z-20 flex items-center gap-4 animate-bounce [animation-duration:5s] [animation-delay:1s] hover:scale-105 transition-transform cursor-pointer">
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
            </Link>

            {nextEvent && (
              <Link href={`/events/${nextEvent._id}`} className="absolute top-2 right-0 sm:right-4 lg:-right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-border/50 z-20 w-[180px] hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Starts In</span>
                </div>
                <p className="text-xl font-extrabold text-foreground">{countdown.days}d : {countdown.hours}h</p>
                <p className="text-xs text-primary font-semibold mt-1 truncate">{nextEvent.title}</p>
              </Link>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}