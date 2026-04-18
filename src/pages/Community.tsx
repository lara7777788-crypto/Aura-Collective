import { useState } from "react";
import { MessageSquare, ThumbsUp, Clock, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CosmicBackdrop from "@/components/CosmicBackdrop";

const topics = ["All", "General", "Models", "Web4", "Help", "Showcase"];

const threads = [
  { id: 1, title: "Best practices for deploying models on decentralized nodes?", author: "alex_web4", topic: "Web4", replies: 24, likes: 89, time: "2h ago" },
  { id: 2, title: "Introducing Aura LLM 7B — our first open model release", author: "aura-labs", topic: "Showcase", replies: 56, likes: 234, time: "5h ago" },
  { id: 3, title: "How to fine-tune models with limited GPU resources", author: "ml_beginner", topic: "Help", replies: 18, likes: 42, time: "8h ago" },
  { id: 4, title: "RFC: Standard format for Web4 model metadata", author: "protocol_dev", topic: "Web4", replies: 31, likes: 67, time: "1d ago" },
  { id: 5, title: "Monthly community showcase — April 2026", author: "community_mod", topic: "General", replies: 43, likes: 112, time: "2d ago" },
  { id: 6, title: "Benchmarking edge inference: ONNX vs TensorRT", author: "perf_guru", topic: "Models", replies: 15, likes: 38, time: "3d ago" },
];

const Community = () => {
  const [activeTopic, setActiveTopic] = useState("All");

  const filtered = threads.filter((t) => activeTopic === "All" || t.topic === activeTopic);

  return (
    <div className="relative">
      <CosmicBackdrop variant="soft" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold text-secondary ring-1 ring-secondary/30 mb-3">
              <Sparkles className="h-3 w-3" /> Voices of the collective
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-5xl">
              The <span className="italic font-serif text-secondary">commons</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Discuss, share, and learn with fellow builders.</p>
          </div>
          <Button className="bg-foreground text-background font-semibold hover:bg-foreground/90 gap-2 hidden sm:inline-flex rounded-full px-6 shadow-[4px_4px_0_hsl(var(--secondary))] hover:shadow-[2px_2px_0_hsl(var(--secondary))] transition-all">
            <Plus className="h-4 w-4" /> Start a thread
          </Button>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto">
          {topics.map((t) => (
            <Button
              key={t}
              size="sm"
              variant="outline"
              className={`rounded-full border-2 ${
                activeTopic === t ? "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90" : ""
              }`}
              onClick={() => setActiveTopic(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((t) => (
            <Card
              key={t.id}
              className="group cursor-pointer rounded-2xl border-2 border-border bg-card/80 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-[4px_4px_0_hsl(var(--secondary)/0.3)]"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-white/40"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(320 90% 75%), hsl(280 80% 60%), hsl(48 95% 60%))",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-secondary transition-colors truncate">{t.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{t.author}</span>
                    <Badge className="bg-secondary/10 text-secondary border-0 text-[10px] rounded-full">{t.topic}</Badge>
                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {t.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {t.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {t.replies}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Button className="w-full bg-foreground text-background font-semibold hover:bg-foreground/90 gap-2 rounded-full shadow-[4px_4px_0_hsl(var(--secondary))]">
            <Plus className="h-4 w-4" /> Start a thread
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
