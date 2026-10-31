import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="relative flex flex-col items-center z-10">
        
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin [animation-duration:1.5s]"></div>
          
          <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center shadow-inner">
            <span className="text-4xl font-extrabold text-primary font-heading animate-pulse">
              J
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold font-heading text-foreground tracking-tight flex items-center gap-2">
          Join<span className="text-primary">Us</span>
        </h2>
        <p className="text-sm font-medium text-muted-foreground mt-2 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          Preparing your community...
        </p>

      </div>
    </div>
  );
}