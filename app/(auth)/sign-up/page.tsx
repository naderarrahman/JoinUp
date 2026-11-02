"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Mail, Image as ImageIcon, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle, ShieldCheck, Heart, Users, Star } from "lucide-react";

export default function RegisterPage() { 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;
  
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const photoURL = formData.get("photoURL") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoURL,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
      } else {
        toast.success("Registration successful! Welcome to JoinUs.");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong.");
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

          <div className="w-full max-w-[480px] bg-background/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 dark:border-zinc-800/50">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold font-heading text-foreground mb-2">
                Join <span className="text-primary">JoinUs</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Create an account to start your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input id="name" name="name" placeholder="Tanvir Ahmed" className="pl-12 h-13 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-12 h-13 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoURL" className="text-sm font-semibold">Photo URL (Optional)</Label>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input id="photoURL" name="photoURL" type="url" placeholder="https://images.unsplash.com/..." className="pl-12 h-13 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-12 pr-12 h-13 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="confirmPassword" 
                    type={showPassword ? "text" : "password"} 
                    className={`pl-12 h-13 text-base bg-muted/40 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-xl transition-all ${confirmPassword && !passwordsMatch ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <XCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
                {passwordsMatch && (
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Passwords match
                  </p>
                )}
              </div>

              <div className="pt-1 grid grid-cols-2 gap-1.5">
                <div className={`flex items-center gap-1.5 text-xs transition-colors ${hasUppercase ? "text-green-500" : "text-muted-foreground"}`}>
                  {hasUppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} Uppercase
                </div>
                <div className={`flex items-center gap-1.5 text-xs transition-colors ${hasLowercase ? "text-green-500" : "text-muted-foreground"}`}>
                  {hasLowercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} Lowercase
                </div>
                <div className={`flex items-center gap-1.5 text-xs transition-colors ${hasMinLength ? "text-green-500" : "text-muted-foreground"}`}>
                  {hasMinLength ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} 6+ Characters
                </div>
              </div>

              <Button type="submit" className="w-full h-13 text-base font-bold rounded-xl mt-4 shadow-lg shadow-primary/25 group transition-all duration-300 hover:scale-[1.02]" disabled={loading}>
                {loading ? "Creating Account..." : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-7">
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
              className="w-full h-13 text-base rounded-xl font-semibold border-border/50 hover:bg-muted/50 transition-colors"
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
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Modern Floating Cards */}
        <div className="hidden lg:flex w-full relative items-center justify-center overflow-hidden bg-muted/30 border-l border-border/50">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>

          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000" />

          <div className="relative z-10 w-full max-w-lg p-10">
            
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                <Heart className="w-4 h-4" /> Join the Movement
              </span>
              <h2 className="text-4xl font-extrabold font-heading text-foreground mb-4">
                Make an Impact
              </h2>
              <p className="text-muted-foreground text-lg">
                Connect with like-minded individuals and create positive change in your community.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="bg-background/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/60 dark:border-zinc-700/60 flex items-center gap-5 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">Join Our Community</h3>
                  <p className="text-sm text-muted-foreground">Be part of a growing network of 2,500+ volunteers.</p>
                </div>
              </div>

              <div className="bg-background/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/60 dark:border-zinc-700/60 flex items-center gap-5 transform hover:-translate-y-1 transition-transform duration-300 ml-8">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">Lives Impacted</h3>
                  <p className="text-sm text-muted-foreground">Together we&apos;ve impacted over 50,000 lives.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-[2rem] shadow-2xl shadow-primary/30 flex items-center justify-between transform hover:scale-[1.02] transition-transform duration-300">
                <div>
                  <h3 className="font-bold text-white text-lg mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> Verified Events
                  </h3>
                  <p className="text-sm text-white/90">100% of our events are reviewed and verified.</p>
                </div>
                <div className="flex gap-1 text-yellow-300">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}