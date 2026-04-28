import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Code2, Database, ArrowRight, Check, Terminal, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Hero from "@/components/Hero";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { TrendingRepos } from "@/components/TrendingRepos";

const stats = [
  { value: "12,400+", label: "developers" },
  { value: "3,200+", label: "open repos" },
  { value: "860+", label: "models" },
  { value: "48k+", label: "commits" },
];

const pillars = [
  {
    icon: Box,
    title: "Models",
    cmd: "aura model push aura-llm-7b",
    desc: "Host, version, and serve AI models with built-in inference endpoints.",
    iconBg: "bg-gold",
  },
  {
    icon: Code2,
    title: "Code",
    cmd: "git remote add aura …",
    desc: "Publish projects, open PRs, ship faster. Git-compatible from day one.",
    iconBg: "bg-pink-soft",
  },
  {
    icon: Database,
    title: "Datasets",
    cmd: "aura dataset pull --tag nlp",
    desc: "Discover, fork, and version datasets for training and evaluation.",
    iconBg: "bg-lavender",
  },
];

const tiers = [
  {
    name: "starter",
    price: "$3",
    desc: "// for solo hackers",
    features: ["5 public repos", "Community access", "Basic model hosting", "2 GB storage"],
    cta: "git push --tier starter",
    priceId: "starter_monthly",
  },
  {
    name: "glow",
    price: "$9",
    desc: "// for radiant builders",
    features: [
      "Unlimited repos",
      "Private projects",
      "Advanced analytics",
      "10 GB storage",
      "Priority support",
      "Glow badge",
    ],
    cta: "git push --tier glow",
    priceId: "glow_monthly",
    highlight: true,
  },
  {
    name: "constellation",
    price: "$29",
    desc: "// for whole galaxies",
    features: [
      "Everything in glow",
      "Org profiles",
      "Team collaboration",
      "50 GB storage",
      "Admin controls",
      "SSO support",
    ],
    cta: "deploy team",
    priceId: "constellation_monthly",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { openCheckout, loading } = usePaddleCheckout();
  return (
    <>
      <Hero />

      {/* Stats — soft teal strip */}
      <section className="bg-teal/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="font-mono">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  <span className="text-foreground/40">✦</span> {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-foreground/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars — white */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-foreground/50">
              ✦ the stack
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              One platform for{" "}
              <span className="font-mono text-foreground bg-gold/50 px-1.5 rounded">{"<models />"}</span>,{" "}
              <span className="font-mono text-foreground bg-lavender/60 px-1.5 rounded">{"<code />"}</span>, and{" "}
              <span className="font-mono text-foreground bg-pink-soft/60 px-1.5 rounded">{"<datasets />"}</span>.
            </h2>
            <p className="mt-3 text-foreground/60">
              Built for the decentralized era. CLI-first, browser-friendly, and made to play nice
              with the tools you already love.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="group h-full rounded-2xl border-2 border-lavender/60 bg-white transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-[6px_6px_0_hsl(var(--lavender))]">
                  <CardHeader>
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${p.iconBg} text-foreground`}>
                      <p.icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <CardTitle className="font-mono text-lg lowercase text-foreground">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed text-foreground/70">{p.desc}</CardDescription>
                    <div className="flex items-center gap-2 rounded-lg border border-lavender/40 bg-lavender/10 px-3 py-2 font-mono text-[12px] text-foreground/80">
                      <Terminal className="h-3.5 w-3.5 text-foreground/60 shrink-0" />
                      <code className="truncate">{p.cmd}</code>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending OSS from GitHub — soft teal */}
      <section className="bg-teal/30">
        <TrendingRepos months={12} />
      </section>

      {/* Pricing — soft white with lavender accents */}
      <section id="pricing" className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--lavender)), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-foreground/50">
              ✦ pricing.json
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pick your <span className="bg-gold/60 px-2 rounded">tier</span>.
            </h2>
            <p className="mt-3 text-foreground/60">No free tier. Pick a plan and ship. 🪐</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card
                  className={`relative h-full flex flex-col overflow-hidden rounded-2xl border-2 ${
                    t.highlight
                      ? "border-foreground bg-white shadow-[8px_8px_0_hsl(var(--gold))]"
                      : "border-lavender/60 bg-white shadow-[4px_4px_0_hsl(var(--lavender)/0.4)]"
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute right-3 top-3 rounded-full border border-foreground bg-gold px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-foreground">
                      ✦ recommended
                    </div>
                  )}
                  <div className={`border-b px-5 py-2 font-mono text-[11px] ${
                    t.highlight ? "border-foreground/20 bg-gold/30 text-foreground" : "border-lavender/40 bg-lavender/20 text-foreground/70"
                  }`}>
                    <span className="text-foreground/50">~/</span>tier/{t.name}.toml
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-2xl lowercase tracking-tight text-foreground">
                      {t.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-foreground">{t.price}</span>
                      <span className="font-mono text-sm text-foreground/50">/mo</span>
                    </div>
                    <CardDescription className="font-mono text-xs text-foreground/50">
                      {t.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="mb-6 flex-1 space-y-2.5">
                      {t.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 font-mono text-[13px] text-foreground/80"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                            strokeWidth={3}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {t.priceId ? (
                      <Button
                        onClick={() => openCheckout(t.priceId!)}
                        disabled={loading}
                        className={`w-full gap-2 rounded-full font-mono text-sm ${
                          t.highlight
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-lavender text-foreground hover:bg-lavender/80"
                        }`}
                      >
                        <Terminal className="h-3.5 w-3.5" />
                        {t.cta}
                      </Button>
                    ) : (
                      <Link to="/sign-up" className="block">
                        <Button
                          variant="outline"
                          className="w-full gap-2 rounded-full border-foreground/80 font-mono text-sm hover:bg-foreground hover:text-background"
                        >
                          <Terminal className="h-3.5 w-3.5" />
                          {t.cta}
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — terminal on soft teal */}
      <section className="bg-teal/40 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border-2 border-foreground bg-[hsl(240_25%_10%)] text-white shadow-[8px_8px_0_hsl(var(--lavender))]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-pink-soft" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[11px] text-white/50">join-the-collective.sh</span>
              <span />
            </div>
            <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
              <p className="font-mono text-sm text-emerald-300">
                $ aura init <span className="text-white/50">--vibes=unicorns</span>
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to <span className="bg-gradient-to-r from-gold via-pink-soft to-lavender bg-clip-text text-transparent">resonate</span>? ✦
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/70">
                Join thousands of builders shipping on the open, decentralized web.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/sign-up">
                  <Button
                    size="lg"
                    className="gap-2 rounded-full bg-gold font-mono text-sm font-bold text-foreground hover:bg-gold/90"
                  >
                    $ join --now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 rounded-full border-white/20 bg-transparent font-mono text-sm text-white hover:bg-white/10 hover:text-white"
                  >
                    <GitBranch className="h-4 w-4" /> fork the org
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
