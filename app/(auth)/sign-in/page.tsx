"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Heart, Users, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
      } else {
        toast.success("Welcome back! Logged in successfully.");
        router.push("/");
        router.refresh(); 
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full flex justify-center bg-gradient-to-br from-pink-50/50 via-background to-pink-100/30 dark:from-zinc-950 dark:via-background dark:to-zinc-900">
      
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Form Section */}
        <div className="w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 z-10 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="w-full max-w-[440px] bg-background/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 dark:border-zinc-800/50">
            
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold font-heading text-foreground mb-3">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Sign in to continue making a difference.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-12 pr-12 h-14 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold rounded-xl mt-4 shadow-lg shadow-primary/25 group transition-all duration-300 hover:scale-[1.02]" 
                disabled={loading}
              >
                {loading ? "Signing In..." : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-muted-foreground border border-border/40 font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button" 
              className="w-full h-14 text-base rounded-xl font-semibold border-border/50 hover:bg-muted/50 transition-colors"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>

            <p className="mt-8 text-center text-sm sm:text-base text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Community Impact */}
        <div className="hidden lg:flex w-full relative items-center justify-center overflow-hidden bg-muted/30 border-l border-border/50">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse delay-1000" />

          <div className="relative z-10 w-full max-w-lg p-10 perspective-1000">
            
            <div className="text-center mb-12 transform translate-z-10">
              <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4" /> Community Impact
              </span>
              <h2 className="text-4xl font-extrabold font-heading text-foreground mb-4">
                Good to see you again!
              </h2>
              <p className="text-muted-foreground text-lg">
                Your community has been waiting for your return. Let&apos;s continue creating positive change together.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-background/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/60 dark:border-zinc-700/60 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <CalendarDays className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1">Upcoming Events</h3>
                <p className="text-sm text-muted-foreground">12 events this week</p>
              </div>

              <div className="bg-background/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/60 dark:border-zinc-700/60 mt-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1">Volunteers</h3>
                <p className="text-sm text-muted-foreground">2,500+ active members</p>
              </div>

              <div className="col-span-2 bg-gradient-to-br from-primary to-primary/80 p-6 rounded-[2rem] shadow-2xl shadow-primary/30 flex items-center justify-between transform hover:scale-[1.02] transition-transform duration-300">
                <div>
                  <h3 className="font-bold text-white text-lg mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> Verified Organization
                  </h3>
                  <p className="text-sm text-white/90">All events are reviewed and verified.</p>
                </div>
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <Heart className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center items-center gap-3 text-sm font-medium text-foreground bg-background/60 backdrop-blur-md py-3 px-8 rounded-full w-fit mx-auto border border-border/50 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Trusted by 10,000+ community members
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}