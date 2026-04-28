import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GitFork, Terminal, Star, GitBranch, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import unicornMascot from "@/assets/unicorn-mascot.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const codeLines = [
  { n: 1, content: <><span className="text-pink-300">const</span> <span className="text-yellow-200">aura</span> <span className="text-white/60">=</span> <span className="text-pink-300">await</span> <span className="text-cyan-200">collective</span><span className="text-white/60">.</span><span className="text-cyan-200">ship</span><span className="text-white/60">({'{'}</span></> },
  { n: 2, content: <>  <span className="text-cyan-200">model</span><span className="text-white/60">:</span> <span className="text-emerald-200">'aura-llm-7b'</span><span className="text-white/60">,</span></> },
  { n: 3, content: <>  <span className="text-cyan-200">license</span><span className="text-white/60">:</span> <span className="text-emerald-200">'open'</span><span className="text-white/60">,</span></> },
  { n: 4, content: <>  <span className="text-cyan-200">vibes</span><span className="text-white/60">:</span> <span className="text-emerald-200">'cosmic'</span> <span className="text-white/40">// 🪐</span></> },
  { n: 5, content: <><span className="text-white/60">{'})'}</span></> },
  { n: 6, content: <></> },
  { n: 7, content: <><span className="text-white/40">{'// → shipped to mainnet ✨'}</span></> },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-white">
    {/* Soft floating blobs */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--teal)), transparent 70%)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full opacity-50 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--lavender)), transparent 70%)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--pink-soft)), transparent 70%)" }}
    />

    <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
      {/* Left */}
      <div className="relative">
        {/* Floating unicorn mascot */}
        <motion.img
          src={unicornMascot}
          alt="AuraCollective unicorn mascot"
          className="absolute -top-16 -left-4 h-24 w-24 sm:h-28 sm:w-28 select-none drop-shadow-[0_8px_20px_hsl(var(--lavender)/0.5)]"
          animate={{ y: [0, -8, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="pl-24 sm:pl-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-lavender/60 bg-lavender/30 px-3 py-1 font-mono text-[11px] font-medium text-foreground backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-foreground" />
            <span>v4.2.0</span>
            <span className="text-foreground/40">·</span>
            open source · peer-to-peer
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Build in the open.
          <br />
          Ship your{" "}
          <span className="relative inline-block">
            <span className="relative z-10">aura</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 h-3 -z-0 rounded-sm"
              style={{ background: "hsl(var(--gold))" }}
            />
          </span>
          . <span className="inline-block">✦</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-base text-foreground/70 sm:text-lg"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          AuraCollective is an{" "}
          <span className="font-mono text-foreground">open source</span>, peer-to-peer hub for
          models, code, and datasets.{" "}
          <span className="text-foreground">No telemetry. No middlemen. Your repo, your rules.</span>
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
              className="group w-full gap-2 rounded-full bg-foreground font-mono text-sm font-bold text-background hover:bg-foreground/90 sm:w-auto"
            >
              <Terminal className="h-4 w-4" /> $ ship some auras
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 rounded-full border-lavender bg-white font-mono text-sm text-foreground hover:bg-lavender/20 sm:w-auto"
            >
              <GitFork className="h-4 w-4" /> browse repos
            </Button>
          </Link>
        </motion.div>

        {/* Stats pills */}
        <motion.dl
          className="mt-10 flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          {[
            { icon: Star, label: "12.4k stars", bg: "bg-gold/40 border-gold" },
            { icon: GitBranch, label: "3.2k repos", bg: "bg-lavender/40 border-lavender" },
            { icon: Sparkles, label: "MIT licensed ✧", bg: "bg-pink-soft/40 border-pink-soft" },
          ].map((s) => (
            <div
              key={s.label}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs text-foreground ${s.bg}`}
            >
              <s.icon className="h-3.5 w-3.5" />
              <dt className="sr-only">{s.label}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Right: terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative"
      >
        <div
          aria-hidden
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-lavender/60 via-pink-soft/40 to-gold/50 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-2xl border-2 border-foreground bg-[hsl(240_25%_10%)] shadow-[8px_8px_0_hsl(var(--lavender))]">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-pink-soft" />
              <span className="h-3 w-3 rounded-full bg-gold" />
              <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
            </div>
            <span className="font-mono text-[11px] text-white/50">~/aura-collective/ship.ts</span>
            <span className="font-mono text-[10px] text-emerald-300/80">● live</span>
          </div>
          <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 text-white/90">
            {codeLines.map((line) => (
              <div key={line.n} className="flex">
                <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">{line.n}</span>
                <code className="block whitespace-pre">{line.content}</code>
              </div>
            ))}
            <div className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">8</span>
              <code className="flex items-center">
                <span className="text-emerald-300">›</span>
                <span className="ml-2 inline-block h-4 w-[7px] animate-pulse bg-gold" />
              </code>
            </div>
          </pre>
        </div>
        <div className="absolute -right-3 -top-3 rotate-6 rounded-full border-2 border-foreground bg-gold px-3 py-1 font-mono text-[10px] font-bold uppercase text-foreground shadow-[3px_3px_0_hsl(var(--lavender))]">
          ✦ web4 native
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
