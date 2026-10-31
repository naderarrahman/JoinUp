import { CalendarPlus, Users, ShieldCheck, HeartHandshake } from "lucide-react";

const features = [
  {
    title: "Easy Event Creation",
    description: "Organize a social drive in your community within minutes with our simple form.",
    icon: <CalendarPlus className="w-6 h-6" />,
  },
  {
    title: "Join with One Click",
    description: "Find upcoming events near you and secure your spot instantly as a volunteer.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Secure & Verified",
    description: "Every event and organizer is verified, ensuring your contribution goes to the right place.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Make Real Impact",
    description: "Track your joined events, participate actively, and see the difference you make.",
    icon: <HeartHandshake className="w-6 h-6" />,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-4">
            Why Choose <span className="text-primary">JoinUs</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide the tools you need to connect, organize, and make a meaningful impact in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-muted/30 p-8 rounded-3xl border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-background w-14 h-14 rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}