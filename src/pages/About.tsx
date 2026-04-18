import { motion } from "framer-motion";
import { Shield, Users, Lock, Eye, Heart, Scale, Handshake, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  { icon: Lock, title: "Your Data Is Your Own", desc: "We don't sell or use your data — ever. We don't store data without permission, and you can remove it at any time." },
  { icon: Eye, title: "No Tracking, No Cookies", desc: "We don't use cookies and we don't track our users. Privacy isn't a feature — it's a promise." },
  { icon: Shield, title: "Safety & Integrity", desc: "Nobody steals on this platform. We share a common understanding of respect, integrity, and trust." },
  { icon: Scale, title: "Governance & Transparency", desc: "We are committed to open governance — building Web4 on peer-to-peer collaboration, not gatekeeping." },
  { icon: Handshake, title: "Mediation Over Punishment", desc: "Disputes are handled through mediation. We don't ban people except in cases of abuse or theft." },
  { icon: Heart, title: "No Discrimination", desc: "We protect our community and welcome everyone. We're building a better internet, together." },
];

const promises = [
  "We will never sell your data.",
  "We will never store data without your explicit permission.",
  "You can delete your data at any time, no questions asked.",
  "We will not use cookies or tracking technologies.",
  "We will not discriminate against any user.",
  "We will only act against accounts engaged in abuse or theft.",
  "We will offer mediation for any dispute on our platform.",
  "We will be transparent about how the platform is governed.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const About = () => (
  <>
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20 mb-6">
            <Sparkles className="h-3 w-3" /> Our Agreement With You
          </span>
        </motion.div>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          Building a better internet,{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">together</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          AuraCollective is the open infrastructure for Web4 — a decentralized web built on peer-to-peer governance, collaboration, and a single core value: <strong className="text-foreground">your data is your own.</strong>
        </motion.p>
      </div>
    </section>

    {/* Values */}
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">What we stand for</h2>
        <p className="mt-3 text-muted-foreground">Six principles that shape every decision we make.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <Card className="h-full border-border/60 hover:border-secondary/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    {/* User Agreement */}
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">The User Agreement</h2>
          <p className="mt-3 text-muted-foreground">A plain-language agreement between us and you.</p>
        </div>

        <Card className="border-border/60">
          <CardContent className="pt-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" /> Our Promises To You
              </h3>
              <ul className="space-y-2.5">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" /> What We Ask Of You
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                In return, we ask every member of AuraCollective to uphold the same values that we do:
              </p>
              <ul className="space-y-2.5">
                {[
                  "Respect every other user — without exception.",
                  "Be polite in feedback and inquiries, even with those who are still learning or who see things differently.",
                  "Do not steal code, models, datasets, or ideas from other members.",
                  "Do not engage in abuse, harassment, or discriminatory behavior.",
                  "Resolve disagreements through dialogue and mediation when possible.",
                  "Help us build a community aligned with our shared values.",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-secondary" /> Disputes & Enforcement
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Any user can request mediation for a dispute on the platform. We do not ban members except in cases of <strong className="text-foreground">abuse or theft</strong>. We do not discriminate, and we are committed to protecting every member of our community equally.
              </p>
            </div>

            <div className="border-t pt-6">
              <p className="text-xs text-muted-foreground italic">
                This agreement evolves with our community. Governance happens in the open — proposals, changes, and decisions are all transparent and peer-driven. By using AuraCollective, you join us in building a better internet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </>
);

export default About;
