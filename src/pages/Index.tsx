import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box, Code2, Database, Users, Star, GitFork, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stats = [
  { label: "Developers", value: "12,400+" },
  { label: "Open Projects", value: "3,200+" },
  { label: "Models Hosted", value: "860+" },
  { label: "Contributions", value: "48,000+" },
];

const pillars = [
  {
    icon: Box,
    title: "Models",
    desc: "Host, version, and share AI models with built-in inference endpoints.",
  },
  {
    icon: Code2,
    title: "Code",
    desc: "Publish projects, collaborate with pull requests, and ship faster.",
  },
  {
    icon: Database,
    title: "Datasets",
    desc: "Store, discover, and share datasets for training and evaluation.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with the essentials",
    features: ["3 public projects", "Community access", "Basic model hosting", "1 GB storage"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    desc: "For serious builders",
    features: ["Unlimited projects", "Private repos", "Advanced analytics", "10 GB storage", "Priority support", "Pro badge"],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$29",
    desc: "Scale with your team",
    features: ["Everything in Pro", "Org profiles", "Team collaboration", "50 GB storage", "Admin controls", "SSO support"],
    cta: "Start Team Trial",
    highlight: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => (
  <>
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20 mb-6">
            <Star className="h-3 w-3" /> Open Source · Web4 Native
          </span>
        </motion.div>
        <motion.h1
          className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          The Open Infrastructure for{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Web4 Developers
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          Ship models, share code, and collaborate on the decentralized web — no gatekeepers.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
        >
          <Link to="/sign-up">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 gap-2 w-full sm:w-auto">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Explore Projects <GitFork className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Pillars */}
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Everything you need, open by default</h2>
        <p className="mt-3 text-muted-foreground">One platform for models, code, and datasets — built for the decentralized era.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <Card className="h-full border-border/60 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-2">
                  <p.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{p.desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Pricing */}
    <section id="pricing" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Simple, transparent pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Scale when you're ready.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className={`h-full flex flex-col ${t.highlight ? "border-secondary ring-2 ring-secondary/20 shadow-lg" : "border-border/60"}`}>
                <CardHeader>
                  {t.highlight && (
                    <span className="mb-2 inline-block w-fit rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">
                      Most Popular
                    </span>
                  )}
                  <CardTitle className="text-xl">{t.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-foreground">{t.price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <CardDescription>{t.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-2.5 mb-6">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-secondary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full font-semibold ${
                      t.highlight
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {t.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ready to build the future?</h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Join thousands of developers shipping on the open, decentralized web.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/sign-up">
          <Button size="lg" className="bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 gap-2">
            Join AuraCollective <Users className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </>
);

export default Index;
