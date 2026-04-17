import { useState } from "react";
import { Search, GitFork, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StarButton from "@/components/StarButton";

const categories = ["All", "Models", "Code", "Datasets", "Tools"];

const mockProjects = [
  { id: "1", title: "aura-llm-7b", author: "aura-labs", desc: "A lightweight 7B language model optimized for edge inference.", stars: 1240, forks: 312, downloads: "45K", tags: ["model", "llm", "edge"], category: "Models" },
  { id: "2", title: "web4-auth-sdk", author: "decentralabs", desc: "Authentication SDK for decentralized identity providers.", stars: 890, forks: 134, downloads: "22K", tags: ["auth", "sdk", "web4"], category: "Code" },
  { id: "3", title: "imagenet-mini", author: "dataforge", desc: "Curated subset of ImageNet for rapid prototyping and benchmarking.", stars: 2100, forks: 540, downloads: "89K", tags: ["dataset", "vision", "benchmark"], category: "Datasets" },
  { id: "4", title: "neural-canvas", author: "artisan-ml", desc: "Real-time neural style transfer for creative applications.", stars: 670, forks: 88, downloads: "12K", tags: ["model", "creative", "style-transfer"], category: "Models" },
  { id: "5", title: "chain-deploy", author: "shipfast", desc: "One-command deployment pipeline for smart contracts.", stars: 430, forks: 67, downloads: "8K", tags: ["tool", "deploy", "smart-contracts"], category: "Tools" },
  { id: "6", title: "common-voice-ext", author: "speech-hub", desc: "Extended multilingual speech dataset for ASR training.", stars: 1560, forks: 290, downloads: "67K", tags: ["dataset", "speech", "multilingual"], category: "Datasets" },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockProjects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Explore</h1>
        <p className="mt-1 text-muted-foreground">Discover models, code, and datasets from the community.</p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              className={activeCategory === cat ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id} className="group cursor-pointer border-border/60 transition-all hover:border-secondary/40 hover:shadow-md">
            <CardContent className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.author}</p>
                </div>
              </div>
              <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs bg-secondary/10 text-secondary border-0">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <StarButton projectId={p.id} initialCount={p.stars} />
                <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {p.forks}</span>
                <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {p.downloads}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <Filter className="mx-auto mb-3 h-8 w-8" />
          <p>No projects found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
