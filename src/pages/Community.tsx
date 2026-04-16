import { useState } from "react";
import { MessageSquare, ThumbsUp, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Community</h1>
          <p className="mt-1 text-muted-foreground">Discuss, share, and learn with fellow builders.</p>
        </div>
        <Button className="bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 gap-2 hidden sm:inline-flex">
          <Plus className="h-4 w-4" /> New Thread
        </Button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {topics.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={activeTopic === t ? "default" : "outline"}
            className={activeTopic === t ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}
            onClick={() => setActiveTopic(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <Card key={t.id} className="group cursor-pointer border-border/60 hover:border-secondary/40 transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-secondary transition-colors truncate">{t.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{t.author}</span>
                  <Badge className="bg-secondary/10 text-secondary border-0 text-[10px]">{t.topic}</Badge>
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
        <Button className="w-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 gap-2">
          <Plus className="h-4 w-4" /> New Thread
        </Button>
      </div>
    </div>
  );
};

export default Community;
