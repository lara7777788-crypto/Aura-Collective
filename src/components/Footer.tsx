import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Logo from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email, tags: ["blog", "footer"] },
      });
      if (error) throw error;
      toast.success("Subscribed! See you next week ✨");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't subscribe — try again?");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="border-t border-lavender/40 bg-teal/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="font-bold text-foreground">Collective</span>
            </Link>
            <p className="text-sm text-foreground/70">
              The open infrastructure for Web4 developers. 🪐
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com/lara7777788-crypto/Aura-Collective" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium">GitHub</a>
              <a href="https://twitter.com/_AuraCollective" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium">Twitter</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link></li>
              <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Weekly blog</h4>
            <p className="text-xs text-foreground/70 mb-3">
              What's getting starred on GitHub, in your inbox every Monday.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                required
                placeholder="you@stardust.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm"
              />
              <Button type="submit" size="sm" disabled={subscribing}>
                {subscribing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Join"}
              </Button>
            </form>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/refunds" className="hover:text-foreground transition-colors">Refunds</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-lavender/40 pt-6 text-center text-xs text-foreground/60">
          ✦ Built on Vela Protocol · Open source forever ✧ · © {new Date().getFullYear()} AuraCollective
        </div>
      </div>
    </footer>
  );
};

export default Footer;
