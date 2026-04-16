import { MapPin, Link as LinkIcon, Calendar, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const userProjects = [
  { title: "aura-llm-7b", desc: "Lightweight 7B LLM for edge inference", stars: 1240, tags: ["model", "llm"] },
  { title: "tokenizer-fast", desc: "High-speed BPE tokenizer in Rust", stars: 560, tags: ["tool", "rust"] },
  { title: "web4-starter", desc: "Boilerplate for Web4 decentralized apps", stars: 320, tags: ["template", "web4"] },
  { title: "benchmark-suite", desc: "Standardized ML model benchmarking toolkit", stars: 180, tags: ["tool", "benchmark"] },
];

const Profile = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    {/* Profile Header */}
    <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary" />
      <div className="text-center sm:text-left flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Sarah Chen</h1>
          <Badge className="bg-primary text-primary-foreground border-0 text-xs w-fit mx-auto sm:mx-0">Pro</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">ML Engineer & Web4 advocate. Building open infrastructure for everyone.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-start">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> San Francisco</span>
          <span className="flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5" /> sarahchen.dev</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined Mar 2025</span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm sm:justify-start">
          <span className="text-foreground font-semibold">248 <span className="text-muted-foreground font-normal">followers</span></span>
          <span className="text-foreground font-semibold">52 <span className="text-muted-foreground font-normal">following</span></span>
        </div>
      </div>
      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
        <Users className="h-4 w-4" /> Follow
      </Button>
    </div>

    {/* Stats */}
    <div className="mb-8 grid grid-cols-3 gap-4">
      {[
        { label: "Projects", value: "12" },
        { label: "Stars Earned", value: "2,300" },
        { label: "Contributions", value: "486" },
      ].map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Projects */}
    <h2 className="mb-4 text-lg font-semibold text-foreground">Projects</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      {userProjects.map((p) => (
        <Card key={p.title} className="group cursor-pointer border-border/60 hover:border-secondary/40 transition-all hover:shadow-md">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs bg-secondary/10 text-secondary border-0">{t}</Badge>
                ))}
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5" /> {p.stars}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Profile;
