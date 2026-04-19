import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Code2, Database, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Hero from "@/components/Hero";

const stats = [
  { label: "Developers", value: "12,400+" },
  { label: "Open Projects", value: "3,200+" },
  { label: "Models Hosted", value: "860+" },
  { label: "Contributions", value: "48,000+" },
];

const pillars = [
  { icon: Box, title: "Models", desc: "Host, version, and share AI models with built-in inference endpoints." },
  { icon: Code2, title: "Code", desc: "Publish projects, collaborate with pull requests, and ship faster." },
  { icon: Database, title: "Datasets", desc: "Store, discover, and share datasets for training and evaluation." },
];

const tiers = [
  {
    name: "Spark",
    price: "$0",
    desc: "Begin your aura",
    features: ["3 public projects", "Community access", "Basic model hosting", "1 GB storage"],
    cta: "Start Sparking",
    rotate: "-rotate-2",
    accent: "bg-primary",
  },
  {
    name: "Glow",
    price: "$9",
    desc: "For radiant builders",
    features: ["Unlimited projects", "Private repos", "Advanced analytics", "10 GB storage", "Priority support", "Glow badge"],
    cta: "Light it up",
    rotate: "rotate-1",
    accent: "bg-secondary",
    highlight: true,
  },
  {
    name: "Constellation",
    price: "$29",
    desc: "Move as a galaxy",
    features: ["Everything in Glow", "Org profiles", "Team collaboration", "50 GB storage", "Admin controls", "SSO support"],
    cta: "Form your galaxy",
    rotate: "-rotate-1",
    accent: "bg-foreground",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => (
  <>
    <Hero />

    {/* Stats */}
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Pillars */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Everything you need, <span className="italic font-serif text-secondary">open by default</span>
        </h2>
        <p className="mt-3 text-muted-foreground">One platform for models, code, and datasets — built for the decentralized era.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <Card className="h-full border-2 border-border hover:border-secondary/60 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_hsl(var(--secondary)/0.3)]">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary/40 text-foreground mb-2">
                  <p.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{p.desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Pricing — sticker cards */}
    <section id="pricing" className="relative overflow-hidden bg-muted/30 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary)), transparent 70%)" }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Pick your <span className="italic font-serif text-secondary">orbit</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Start free. Grow when the cosmos calls.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className={`${t.rotate} hover:rotate-0 transition-transform duration-300`}
            >
              <Card
                className={`h-full flex flex-col border-2 border-foreground rounded-2xl shadow-[6px_6px_0_hsl(var(--foreground))] ${
                  t.highlight ? "bg-gradient-to-br from-primary/30 to-secondary/10" : "bg-card"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-block h-3 w-3 rounded-full ${t.accent}`} />
                    {t.highlight && (
                      <span className="rounded-full bg-foreground px-3 py-0.5 text-xs font-semibold text-background">
                        ✦ most loved
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-serif italic">{t.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">{t.price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <CardDescription className="italic">{t.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-2.5 mb-6">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/sign-up" className="block">
                    <Button
                      className={`w-full font-semibold rounded-full border-2 border-foreground ${
                        t.highlight
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          : "bg-background text-foreground hover:bg-foreground hover:text-background"
                      }`}
                    >
                      {t.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
        Ready to <span className="italic font-serif text-secondary">resonate</span>?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Join thousands of builders shipping on the open, decentralized web.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/sign-up">
          <Button size="lg" className="bg-foreground text-background font-semibold hover:bg-foreground/90 gap-2 rounded-full px-8 shadow-[4px_4px_0_hsl(var(--secondary))] hover:shadow-[2px_2px_0_hsl(var(--secondary))] transition-all">
            Join the collective <Users className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </>
);

export default Index;
