import { useState } from "react";
import { Loader2, Wand2, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { askStarlit } from "@/lib/starlit";
import { StarlitBadge } from "./StarlitBadge";
import { toast } from "sonner";

interface Props {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StarlitStudio({ trigger, open: openProp, onOpenChange }: Props) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = onOpenChange ?? setOpenState;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState<"summary" | "tags" | "readme" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const need = (label: string) => {
    if (!title.trim()) { toast.error(`Add a project title first to ${label}`); return false; }
    return true;
  };

  const run = async (mode: "summarize" | "tags" | "readme") => {
    if (!need(mode === "summarize" ? "summarize" : mode === "tags" ? "suggest tags" : "draft a README")) return;
    setLoading(mode === "summarize" ? "summary" : mode);
    try {
      if (mode === "summarize") {
        const r = await askStarlit<{ text: string }>("summarize", { title, description, tags });
        setSummary(r.text.trim());
      } else if (mode === "tags") {
        const r = await askStarlit<{ tags: string[] }>("tags", { title, description });
        setTags(r.tags);
      } else {
        const r = await askStarlit<{ text: string }>("readme", { title, description, tags });
        setReadme(r.text);
      }
    } catch (e: any) {
      toast.error(e.message || "Starlit stumbled");
    } finally {
      setLoading(null);
    }
  };

  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="rounded-full border-2 gap-2">
            <Wand2 className="h-4 w-4" /> Starlit Studio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Starlit Studio <StarlitBadge />
          </DialogTitle>
          <DialogDescription>
            Your AI sidekick for shaping projects — summaries, tags, and a starter README.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Project title (e.g. aura-llm-7b)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="What does it do? A few sentences are enough."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Tabs defaultValue="summary" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="summary">One-liner</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="readme">README</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-3 pt-3">
            <Button onClick={() => run("summarize")} disabled={loading === "summary"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              {loading === "summary" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Generate one-liner
            </Button>
            {summary && (
              <div className="rounded-lg border-2 border-secondary/40 bg-secondary/5 p-3 flex items-start gap-2">
                <p className="flex-1 text-sm">{summary}</p>
                <button onClick={() => copy("summary", summary)} className="text-muted-foreground hover:text-foreground">
                  {copied === "summary" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tags" className="space-y-3 pt-3">
            <Button onClick={() => run("tags")} disabled={loading === "tags"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              {loading === "tags" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Suggest tags
            </Button>
            {tags.length > 0 && (
              <div className="rounded-lg border-2 border-secondary/40 bg-secondary/5 p-3 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-secondary/15 text-secondary border-0 rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="readme" className="space-y-3 pt-3">
            <Button onClick={() => run("readme")} disabled={loading === "readme"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              {loading === "readme" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Draft README
            </Button>
            {readme && (
              <div className="relative">
                <Textarea value={readme} onChange={(e) => setReadme(e.target.value)} rows={14} className="font-mono text-xs" />
                <button
                  onClick={() => copy("readme", readme)}
                  className="absolute top-2 right-2 rounded-md bg-background border p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {copied === "readme" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
