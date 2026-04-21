import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GitFork, Sparkles, Heart, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Starfield from "./Starfield";
import ShootingStar from "./ShootingStar";
import AnimatedUnicorn from "./AnimatedUnicorn";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const promises = [
  { icon: Heart, label: "Teaching the internet to love" },
  { icon: Lock, label: "No data collection. Ever." },
  { icon: Globe, label: "Open source · Web4 native" },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/40">
    {/* Cosmic backdrop layers */}
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Drifting gradient blobs */}
      <div
        className="absolute -top-24 -left-20 h-80 w-80 rounded-full opacity-50 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.7), transparent 70%)" }}
      />
      <div
        className="absolute top-10 right-0 h-96 w-96 rounded-full opacity-50 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, hsl(280 85% 65% / 0.6), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.7), transparent 70%)", animationDelay: "-12s" }}
      />
      {/* Starfield (parallax) */}
      <Starfield density={70} />
      {/* Shooting stars — multiple staggered streaks */}
      <ShootingStar initialDelay={300} minDelay={700} maxDelay={1800} />
      <ShootingStar initialDelay={900} minDelay={900} maxDelay={2200} />
      <ShootingStar initialDelay={1700} minDelay={1100} maxDelay={2600} />
      <ShootingStar initialDelay={2500} minDelay={1300} maxDelay={2800} />
      <ShootingStar initialDelay={3400} minDelay={1500} maxDelay={3000} />
      <ShootingStar initialDelay={4500} minDelay={1700} maxDelay={3400} />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>

    {/* Floating unicorns */}
    <AnimatedUnicorn size={64} delay={0} className="absolute left-[6%] top-[18%] hidden md:block opacity-90" />
    <AnimatedUnicorn size={56} delay={1.5} flip className="absolute right-[8%] top-[28%] hidden md:block opacity-90" />
    <AnimatedUnicorn size={44} delay={0.8} className="absolute right-[10%] bottom-[10%] block md:hidden opacity-80" />
    <AnimatedUnicorn size={40} delay={1.2} flip className="absolute left-[8%] bottom-[14%] block md:hidden opacity-80" />

    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold text-secondary ring-1 ring-secondary/30 mb-6">
          <Sparkles className="h-3 w-3" /> Web4 · Open source · Peer-to-peer
        </span>
      </motion.div>

      <motion.h1
        className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        Let's{" "}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
            ship something
          </span>
          <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
            <path d="M2 8 Q 50 2, 100 6 T 198 5" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </span>
        .
        <br />
        We're <span className="italic font-serif">teaching the internet to love</span>.
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        AuraCollective is a new direction for the web — open source, peer-to-peer, no data collection. Build,
        share, and govern together. Your data stays yours, always.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <Link to="/sign-up">
          <Button
            size="lg"
            className="bg-foreground text-background font-semibold hover:bg-foreground/90 gap-2 w-full sm:w-auto rounded-full px-8 shadow-[4px_4px_0_hsl(var(--secondary))] hover:shadow-[2px_2px_0_hsl(var(--secondary))] transition-all"
          >
            Let's ship some auras <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/explore">
          <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto rounded-full px-8 border-2">
            Wander the collective <GitFork className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Promise tags */}
      <motion.ul
        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
      >
        {promises.map((p) => (
          <li
            key={p.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm sm:text-sm"
          >
            <p.icon className="h-3.5 w-3.5 text-secondary" />
            {p.label}
          </li>
        ))}
      </motion.ul>
    </div>
  </section>
);

export default Hero;
