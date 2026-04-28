import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Users, Lock, Eye, Heart, Scale, Handshake, Sparkles, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CosmicBackdrop from "@/components/CosmicBackdrop";
import velaWatermark from "@/assets/vela-watermark.png";

const values = [
  {
    icon: Lock,
    title: "Your Data Is Your Own",
    desc: "We don't sell or use your data — ever. We don't store data without permission, and you can remove it at any time.",
    standards: [
      "We never sell, rent, license, or share your personal data with advertisers or data brokers — ever.",
      "We collect only what is strictly needed to operate your account and the projects you publish.",
      "You can export, edit, or permanently delete any of your data at any time, no questions asked.",
      "If we ever change how data is handled, you'll be notified before the change takes effect — not after.",
      "On account deletion, your personal data is removed within 30 days from active systems and 90 days from backups.",
    ],
  },
  {
    icon: Eye,
    title: "No Tracking, No Cookies",
    desc: "We don't use cookies and we don't track our users. Privacy isn't a feature — it's a promise.",
    standards: [
      "No third-party tracking pixels, no Google Analytics, no Facebook SDK, no advertising cookies.",
      "We use only the bare-minimum essential cookies required for you to stay signed in securely.",
      "No fingerprinting, no cross-site profiling, no behavioural surveillance of any kind.",
      "Aggregate, anonymous platform metrics may be used to improve performance — never tied to a person.",
      "If we ever introduce optional analytics, it will be opt-in, transparent, and self-hosted.",
    ],
  },
  {
    icon: Shield,
    title: "Safety & Integrity",
    desc: "Nobody steals on this platform. We share a common understanding of respect, integrity, and trust.",
    standards: [
      "Plagiarism, code theft, model theft, and dataset theft are grounds for immediate removal.",
      "Original authorship is respected and credited. Forks must clearly attribute the original creator.",
      "All licenses chosen by creators (MIT, Apache, CC, custom, etc.) are honoured and enforceable.",
      "Reports of stolen work are reviewed within 72 hours and resolved transparently.",
      "Repeat offenders forfeit their accounts and any associated paid memberships without refund.",
    ],
  },
  {
    icon: Scale,
    title: "Governance & Transparency",
    desc: "We are committed to open governance — building Web4 on peer-to-peer collaboration, not gatekeeping.",
    standards: [
      "Major platform decisions are published openly and discussed with the community before adoption.",
      "Our policies, pricing, moderation actions, and changes are documented publicly.",
      "We publish a quarterly transparency note covering moderation actions, data requests, and platform health.",
      "No hidden algorithmic ranking — discovery is based on stars, recency, tags, and your explicit preferences.",
      "The platform's source-of-record values (this page) cannot be changed silently — material edits are dated.",
    ],
  },
  {
    icon: Handshake,
    title: "Mediation Over Punishment",
    desc: "Disputes are handled through mediation. We don't ban people except in cases of abuse or theft.",
    standards: [
      "Any user can request mediation for a dispute by contacting lara@loveconcursall.com.",
      "Mediators listen to both sides before any action is taken; nobody is judged in absence.",
      "Bans are reserved for abuse, harassment, theft, fraud, or repeated material violations.",
      "Account suspensions include a clear written reason and a path to appeal within 14 days.",
      "We favour restoration and dialogue over permanent removal whenever it is safely possible.",
    ],
  },
  {
    icon: Heart,
    title: "No Discrimination",
    desc: "We protect our community and welcome everyone. We're building a better internet, together.",
    standards: [
      "Aura Collective is open to everyone regardless of race, ethnicity, nationality, gender, sexuality, religion, age, ability, or background.",
      "Hate speech, slurs, harassment, or discriminatory targeting of any group are not tolerated.",
      "We protect members who are being targeted — silence is not neutrality.",
      "Accessibility is a first-class concern: the platform aims to meet WCAG 2.1 AA standards.",
      "Content moderation is applied evenly — the rules are the same for everyone, including us.",
    ],
  },
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

const ValueCard = ({ v, i }: { v: (typeof values)[number]; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
      <Card
        className={`h-full rounded-2xl border-2 border-border bg-card/80 backdrop-blur transition-all hover:-translate-y-1 hover:border-secondary/60 hover:shadow-[6px_6px_0_hsl(var(--secondary)/0.3)] ${
          open ? "border-secondary/60 shadow-[6px_6px_0_hsl(var(--secondary)/0.3)]" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full text-left"
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-foreground mb-4 ring-2 ring-white/40"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(320 90% 80%), hsl(280 80% 65%), hsl(48 95% 65%))",
                }}
              >
                <v.icon className="h-7 w-7 text-white drop-shadow" />
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                      Our standards
                    </p>
                    <ul className="space-y-2.5">
                      {v.standards.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!open && (
              <p className="mt-4 text-xs font-semibold text-secondary">Click to read our standards →</p>
            )}
          </CardContent>
        </button>
      </Card>
    </motion.div>
  );
};

const About = () => (
  <>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <CosmicBackdrop />
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold text-secondary ring-1 ring-secondary/30 mb-6">
            <Sparkles className="h-3 w-3" /> Our Agreement With You
          </span>
        </motion.div>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          Building a better internet,{" "}
          <span className="italic font-serif bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent">
            together
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          AuraCollective is the open infrastructure for Web4 — a decentralized web built on peer-to-peer governance, collaboration, and a single core value: <strong className="text-foreground">your data is your own.</strong>
        </motion.p>
      </div>
    </section>

    {/* Values */}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          What we <span className="italic font-serif text-secondary">stand for</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Six principles that shape every decision we make. Tap any card to read our standards in detail.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {values.map((v, i) => (
          <ValueCard key={v.title} v={v} i={i} />
        ))}
      </div>
    </section>

    {/* User Agreement */}
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-28">
      <CosmicBackdrop variant="soft" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            The <span className="italic font-serif text-secondary">User Agreement</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A plain-language agreement between us and you.</p>
        </div>

        <Card className="rounded-2xl border-2 border-foreground bg-card/90 backdrop-blur shadow-[6px_6px_0_hsl(var(--secondary)/0.4)]">
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

    {/* Built by Vela */}
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={velaWatermark}
          alt="Vela"
          className="h-32 w-32 select-none sm:h-40 sm:w-40"
        />
        <p className="text-sm text-muted-foreground">
          Built by <span className="font-semibold text-foreground">Vela</span> for AuraCollective.
        </p>
      </div>
    </section>
  </>
);

export default About;
