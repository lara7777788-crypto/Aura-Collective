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

      {/* Stats — terminal strip */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="font-mono">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  <span className="text-secondary">$</span> {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-secondary">
            // the stack
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            One platform for{" "}
            <span className="font-mono text-secondary">{"<models />"}</span>,{" "}
            <span className="font-mono text-secondary">{"<code />"}</span>, and{" "}
            <span className="font-mono text-secondary">{"<datasets />"}</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
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
              <Card className="group h-full border border-border transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-[6px_6px_0_hsl(var(--foreground))]">
                <CardHeader>
                  <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-foreground ${p.accent}`}>
                    <p.icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <CardTitle className="font-mono text-lg lowercase">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{p.desc}</CardDescription>
                  <div className="flex items-center gap-2 rounded-md border border-border bg-muted/60 px-3 py-2 font-mono text-[12px] text-foreground/80">
                    <Terminal className="h-3.5 w-3.5 text-secondary shrink-0" />
                    <code className="truncate">{p.cmd}</code>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending OSS from GitHub */}
      <section className="border-t bg-background">
        <TrendingRepos months={12} />
      </section>

      {/* Pricing — dev cards */}
      <section id="pricing" className="relative overflow-hidden border-y bg-muted/40 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-secondary">
              // pricing.json
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Pick your <span className="font-mono">tier</span>.
            </h2>
            <p className="mt-3 text-muted-foreground">No free tier. Pick a plan and ship.</p>
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
                  className={`relative h-full flex flex-col overflow-hidden rounded-xl border ${
                    t.highlight
                      ? "border-foreground bg-card shadow-[8px_8px_0_hsl(var(--foreground))]"
                      : "border-border bg-card"
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute right-3 top-3 rounded-md bg-foreground px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-background">
                      ★ recommended
                    </div>
                  )}
                  {/* Tier title bar */}
                  <div className="border-b border-border bg-muted/40 px-5 py-2 font-mono text-[11px] text-muted-foreground">
                    <span className="text-secondary">~/</span>tier/{t.name}.toml
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-2xl lowercase tracking-tight">
                      {t.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-foreground">{t.price}</span>
                      <span className="font-mono text-sm text-muted-foreground">/mo</span>
                    </div>
                    <CardDescription className="font-mono text-xs text-muted-foreground">
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
                            className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
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
                        className={`w-full gap-2 rounded-md font-mono text-sm ${
                          t.highlight
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        }`}
                      >
                        <Terminal className="h-3.5 w-3.5" />
                        {t.cta}
                      </Button>
                    ) : (
                      <Link to="/sign-up" className="block">
                        <Button
                          variant="outline"
                          className="w-full gap-2 rounded-md border-foreground/80 font-mono text-sm hover:bg-foreground hover:text-background"
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

      {/* CTA — terminal prompt */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="overflow-hidden rounded-xl border-2 border-foreground bg-[hsl(330_20%_6%)] text-white shadow-[8px_8px_0_hsl(var(--secondary))]">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[11px] text-white/50">join-the-collective.sh</span>
            <span />
          </div>
          <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="font-mono text-sm text-emerald-300">
              $ aura init <span className="text-white/50">--vibes=unicorns</span>
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">resonate</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Join thousands of builders shipping on the open, decentralized web.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="gap-2 rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  $ join --now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-md border-white/20 bg-transparent font-mono text-sm text-white hover:bg-white/10 hover:text-white"
                >
                  <GitBranch className="h-4 w-4" /> fork the org
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
