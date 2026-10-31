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
        toast.success("Registration successful! Please Sign In.");
        router.push("/sign-in");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 via-background to-pink-100/50 dark:from-zinc-950 dark:via-background dark:to-zinc-900">
      
      {/* Left Side: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-md bg-background/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-zinc-800/50">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold font-heading text-foreground mb-2">
              Join <span className="text-primary">JoinUs</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Create an account to start your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="name" name="name" placeholder="Tanvir Ahmed" className="pl-10 h-12 bg-muted/50 rounded-xl" required />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 h-12 bg-muted/50 rounded-xl" required />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <Label htmlFor="photoURL" className="text-sm font-semibold">Photo URL (Optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="photoURL" name="photoURL" type="url" placeholder="https://images.unsplash.com/..." className="pl-10 h-12 bg-muted/50 rounded-xl" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10 h-12 bg-muted/50 rounded-xl" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  id="confirmPassword" 
                  type={showPassword ? "text" : "password"} 
                  className={`pl-10 h-12 bg-muted/50 rounded-xl ${confirmPassword && !passwordsMatch ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
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

            {/* Password Validation UI */}
            <div className="pt-1 grid grid-cols-2 gap-1">
              <div className={`flex items-center gap-1 text-[11px] transition-colors ${hasUppercase ? "text-green-500" : "text-muted-foreground"}`}>
                {hasUppercase ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Uppercase
              </div>
              <div className={`flex items-center gap-1 text-[11px] transition-colors ${hasLowercase ? "text-green-500" : "text-muted-foreground"}`}>
                {hasLowercase ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Lowercase
              </div>
              <div className={`flex items-center gap-1 text-[11px] transition-colors ${hasMinLength ? "text-green-500" : "text-muted-foreground"}`}>
                {hasMinLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} 6+ Characters
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold rounded-xl mt-4 shadow-lg shadow-primary/20 group" disabled={loading}>
              {loading ? "Creating Account..." : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Modern Floating Cards (Unique Design) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        {/* Floating Glass Card 1 */}
        <div className="absolute top-[20%] left-[10%] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-zinc-700/50 shadow-2xl animate-bounce [animation-duration:6s]">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Lives Impacted</p>
              <p className="text-2xl font-extrabold text-foreground">50,000+</p>
            </div>
          </div>
        </div>

        {/* Floating Glass Card 2 (Center Big) */}
        <div className="relative z-10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/50 dark:border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-sm text-center">
          <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-heading mb-2">Join Our Community</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Be part of a growing network of volunteers dedicated to making the world a better place.
          </p>
          
          {/* Avatar Stack */}
          <div className="flex justify-center -space-x-4 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="volunteer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            <span className="text-sm text-muted-foreground ml-2">Rated 4.9/5</span>
          </div>
        </div>

        {/* Floating Glass Card 3 (Bottom) */}
        <div className="absolute bottom-[15%] right-[10%] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-zinc-700/50 shadow-2xl animate-bounce [animation-duration:5s] [animation-delay:1s]">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Verified Events</p>
              <p className="text-2xl font-extrabold text-foreground">100%</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}