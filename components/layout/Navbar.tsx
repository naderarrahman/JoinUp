"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        {/* Left: Logo & Text */}
        <div className="flex items-center z-10">
          <Link href="/" className="group flex items-center gap-3">
            {/* Logo Image with subtle hover effect */}
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
            
            {/* Styled Text */}
            <span className="text-2xl font-extrabold tracking-tight text-foreground font-heading flex items-center gap-1">
              Join<span className="text-primary">Us</span>
            </span>
          </Link>
        </div>

        {/* Middle: Links (Absolutely Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 z-10">
          <Link 
            href="/events" 
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Right: Theme Toggle & Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
          
          {/* Theme Toggle Button */}
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

          {/* Login Button */}
          <Link href="/sign-in">
            <Button className="font-semibold shadow-md px-6 rounded-full">
              Sign In
            </Button>
          </Link>
        </div>
        
      </div>
    </nav>
  )
}