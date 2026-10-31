"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Heart, Users, CalendarDays, CheckCircle2 } from "lucide-react";

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

  // Google Login Handler
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
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 via-background to-pink-100/50 dark:from-zinc-950 dark:via-background dark:to-zinc-900">
      
      {/* Left Side: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-md bg-background/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-zinc-800/50">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold font-heading text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue making a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12 bg-muted/50 rounded-xl" 
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10 h-12 bg-muted/50 rounded-xl" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold rounded-xl mt-6 shadow-lg shadow-primary/20 group" 
              disabled={loading}
            >
              {loading ? "Signing In..." : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Google Login Button */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/80 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button" 
            className="w-full h-12 rounded-xl"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Community Trust Design */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-gradient-to-tr from-primary/5 to-transparent">
        
        {/* Background Blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 w-full max-w-lg p-10">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold font-heading text-foreground mb-4">
              Good to see you again!
            </h2>
            <p className="text-muted-foreground text-lg">
              Your community has been waiting for your return. Let's continue creating positive change together.
            </p>
          </div>

          {/* Glass Card Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 dark:border-zinc-700/50">
              <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Upcoming Events</h3>
              <p className="text-xs text-muted-foreground">12 events this week</p>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 dark:border-zinc-700/50 mt-8">
              <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Volunteers</h3>
              <p className="text-xs text-muted-foreground">2,500+ active members</p>
            </div>

            <div className="col-span-2 bg-primary p-6 rounded-3xl shadow-xl shadow-primary/20 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Verified Organization
                </h3>
                <p className="text-sm text-white/80">All events are reviewed and verified.</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center items-center gap-3 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm py-3 px-6 rounded-full w-fit mx-auto border border-border/50">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Trusted by 10,000+ community members
          </div>

        </div>
      </div>
    </div>
  );
}