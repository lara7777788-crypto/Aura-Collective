import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GitFork, Terminal, Star, GitBranch, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const codeLines = [
  { n: 1, content: <><span className="text-pink-400">const</span> <span className="text-yellow-300">aura</span> <span className="text-foreground/60">=</span> <span className="text-pink-400">await</span> <span className="text-cyan-300">collective</span><span className="text-foreground/60">.</span><span className="text-cyan-300">ship</span><span className="text-foreground/60">({'{'}</span></> },
  { n: 2, content: <>  <span className="text-cyan-300">model</span><span className="text-foreground/60">:</span> <span className="text-emerald-300">'aura-llm-7b'</span><span className="text-foreground/60">,</span></> },
  { n: 3, content: <>  <span className="text-cyan-300">license</span><span className="text-foreground/60">:</span> <span className="text-emerald-300">'open'</span><span className="text-foreground/60">,</span></> },
  { n: 4, content: <>  <span className="text-cyan-300">vibes</span><span className="text-foreground/60">:</span> <span className="text-emerald-300">'unicorns'</span> <span className="text-foreground/40">// 🦄</span></> },
  { n: 5, content: <><span className="text-foreground/60">{'})'}</span></> },
  { n: 6, content: <></> },
  { n: 7, content: <><span className="text-foreground/40">{'// → shipped to mainnet ✨'}</span></> },
];

const Hero = () => (
  <section className="relative overflow-hidden border-b border-border bg-[hsl(330_20%_6%)] text-white">
    {/* Subtle grid + glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(330 30% 18%) 1px, transparent 1px), linear-gradient(90deg, hsl(330 30% 18%) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--secondary)), transparent 70%)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
    />

    <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
      {/* Left: copy */}
      <div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] font-medium text-white/80 backdrop-blur-sm">
            <Circle className="h-2 w-2 fill-emerald-400 stroke-none" />
            <span className="text-emerald-300">v4.2.0</span>
            <span className="text-white/40">·</span>
            open source · peer-to-peer
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Build, ship, and{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              git push
            </span>
          </span>
          <br />
          your aura.
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-base text-white/70 sm:text-lg"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          AuraCollective is an{" "}
          <span className="font-mono text-yellow-300">open source</span>, peer-to-peer hub for
          models, code, and datasets.{" "}
          <span className="text-white">No telemetry. No middlemen. Your repo, your rules.</span>
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <Link to="/sign-up">
            <Button
              size="lg"
              className="group w-full gap-2 rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Terminal className="h-4 w-4" /> $ ship some auras
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 rounded-md border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <GitFork className="h-4 w-4" /> browse repos
            </Button>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-white/60"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          {[
            { icon: Star, label: "12.4k stars" },
            { icon: GitBranch, label: "3.2k repos" },
            { icon: Circle, label: "MIT licensed", iconClass: "fill-emerald-400 stroke-none h-2 w-2" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <s.icon className={s.iconClass ?? "h-3.5 w-3.5"} />
              <dt className="sr-only">{s.label}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Right: terminal / code window */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative"
      >
        {/* Glow behind */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-secondary/40 via-purple-500/20 to-primary/30 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[hsl(330_25%_8%)] shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[11px] text-white/50">~/aura-collective/ship.ts</span>
            <span className="font-mono text-[10px] text-emerald-300/80">● live</span>
          </div>
          {/* Code body */}
          <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 text-white/90">
            {codeLines.map((line) => (
              <div key={line.n} className="flex">
                <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">{line.n}</span>
                <code className="block whitespace-pre">{line.content}</code>
              </div>
            ))}
            {/* Blinking cursor line */}
            <div className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">8</span>
              <code className="flex items-center">
                <span className="text-emerald-400">›</span>
                <span className="ml-2 inline-block h-4 w-[7px] animate-pulse bg-yellow-300" />
              </code>
            </div>
          </pre>
        </div>
        {/* Floating sticker */}
        <div className="absolute -right-3 -top-3 rotate-6 rounded-lg border-2 border-foreground bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-primary-foreground shadow-[3px_3px_0_hsl(var(--secondary))]">
          🦄 web4 native
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
