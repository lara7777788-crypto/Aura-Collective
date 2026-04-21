import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CosmicBackdrop from "@/components/CosmicBackdrop";
import AnimatedUnicorn from "@/components/AnimatedUnicorn";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";

const perks = [
  "Private model & dataset hosting",
  "Advanced project analytics",
  "Members-only community channels",
  "Priority builds & support",
  "Your Glow badge across the collective",
];

const MembersPaywall = () => {
  const { openCheckout, loading } = usePaddleCheckout();

  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      <CosmicBackdrop />

      <AnimatedUnicorn size={56} delay={0} className="absolute left-[8%] top-[14%] hidden md:block opacity-90" />
      <AnimatedUnicorn size={48} delay={1.4} flip className="absolute right-[10%] top-[22%] hidden md:block opacity-90" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold text-secondary ring-1 ring-secondary/30 mb-6">
            <Lock className="h-3 w-3" /> Members only
          </span>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your{" "}
            <span className="bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
              members orbit
            </span>{" "}
            awaits.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            The members area is where the collective ships together — private projects, deeper analytics,
            and the tools that make Web4 feel inevitable. Pick an orbit to unlock it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-12"
        >
          <Card className="mx-auto max-w-2xl border-2 border-foreground rounded-2xl shadow-[6px_6px_0_hsl(var(--foreground))] bg-gradient-to-br from-primary/20 to-secondary/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-secondary" />
                <span className="text-sm font-semibold text-foreground">What you unlock</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" strokeWidth={3} />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => openCheckout("glow_monthly")}
                  disabled={loading}
                  className="w-full font-semibold rounded-full border-2 border-foreground bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
                >
                  Light it up · $9/mo <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => openCheckout("constellation_monthly")}
                  disabled={loading}
                  className="w-full font-semibold rounded-full border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background gap-2"
                >
                  Form your galaxy · $29/mo <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Cancel anytime. Test mode is active in the preview — no real charges.
              </p>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Just want to wander?{" "}
            <Link to="/explore" className="text-secondary font-medium underline-offset-4 hover:underline">
              Explore the collective
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MembersPaywall;
