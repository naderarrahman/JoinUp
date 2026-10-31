import { Mail, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-background rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-2xl border border-border/50 text-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-bl-[150px] -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-tr-[100px] -z-10" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 animate-bounce [animation-duration:3s]">
            <Mail className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">
            Stay in the <span className="text-primary">Loop</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about upcoming community drives, volunteering opportunities, and the impact we are making together.
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-6">
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="pl-12 h-14 rounded-full bg-muted/50 border-border/50 focus:bg-background text-base"
                required
              />
            </div>
            <Button type="button" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full font-bold shadow-lg shadow-primary/20 shrink-0 group">
              Subscribe 
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Join 2,500+ community members already subscribed.</span>
          </div>

        </div>
      </div>
    </section>
  );
}