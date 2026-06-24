"use client";

import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    toast.success("Thank you for subscribing! You'll receive our weekly insights.");
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-primary px-6 py-10 md:p-12 text-center shadow-2xl">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-2xl mx-auto space-y-5">
        <div className="inline-flex p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm mx-auto">
          <Mail className="h-5 w-5 text-accent" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
            Weekly Market Insights
          </h3>
          <p className="text-white/70 max-w-md mx-auto text-xs md:text-sm">
            Get the latest Dhaka property trends, buying guides, and exclusive market insights sent straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-xs focus:outline-none focus:border-accent/60 focus:bg-white/12 transition-all disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/95 font-medium text-xs transition-all flex items-center justify-center gap-1.5 group flex-shrink-0"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
