import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Wand2, Copy, Check, Lock, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { askStarlit } from "@/lib/starlit";
import { StarlitBadge } from "./StarlitBadge";
import { useSubscription } from "@/hooks/useSubscription";
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

  const { isActive } = useSubscription();
  const isMember = !!isActive;

  // Free-tier inputs
  const [idea, setIdea] = useState("");
  const [interests, setInterests] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);

  // Paid inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [readme, setReadme] = useState("");

  const [loading, setLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const runFree = async (mode: "name" | "username") => {
    if (mode === "name" && !idea.trim()) { toast.error("Describe your project idea first"); return; }
    if (mode === "username" && !interests.trim()) { toast.error("Tell Starlit a bit about you first"); return; }
    setLoading(mode);
    try {
      if (mode === "name") {
        const r = await askStarlit<{ names: string[] }>("name", { idea });
        setNames(r.names);
      } else {
        const r = await askStarlit<{ usernames: string[] }>("username", { interests });
        setUsernames(r.usernames);
      }
    } catch (e: any) {
      toast.error(e.message || "Starlit stumbled");
    } finally {
      setLoading(null);
    }
  };

  const runPaid = async (mode: "summarize" | "tags" | "readme") => {
    if (!isMember) {
      toast.error("This Starlit power is for members ✨");
      return;
    }
    if (!title.trim()) { toast.error("Add a project title first"); return; }
    setLoading(mode);
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

  const PaidLockedOverlay = () => (
    <div className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-5 text-center space-y-3">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/15 p-2.5">
          <Lock className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">For Star, Glow & Constellation members</p>
        <p className="text-xs text-foreground/70 mt-1">
          Starlit's full studio — summaries, tags, and README drafts — comes with any paid tier.
        </p>
      </div>
      <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5">
        <Link to="/#pricing" onClick={() => setOpen(false)}>
          <Sparkles className="h-3.5 w-3.5" /> Unlock Starlit Studio
        </Link>
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {(trigger !== null) && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button variant="outline" className="rounded-full border-2 gap-2">
              <Wand2 className="h-4 w-4" /> Starlit Studio
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Starlit Studio <StarlitBadge />
          </DialogTitle>
          <DialogDescription>
            Your AI sidekick for shaping projects. Free tools for everyone — summaries, tags & READMEs for members.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="name" className="mt-2">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="name">Name <span className="ml-1 text-[10px] text-primary">free</span></TabsTrigger>
            <TabsTrigger value="username">Username <span className="ml-1 text-[10px] text-primary">free</span></TabsTrigger>
            <TabsTrigger value="summary" className="gap-1">{!isMember && <Lock className="h-3 w-3" />}One-liner</TabsTrigger>
            <TabsTrigger value="tags" className="gap-1">{!isMember && <Lock className="h-3 w-3" />}Tags</TabsTrigger>
            <TabsTrigger value="readme" className="gap-1">{!isMember && <Lock className="h-3 w-3" />}README</TabsTrigger>
          </TabsList>

          {/* FREE: Project name generator */}
          <TabsContent value="name" className="space-y-3 pt-3">
            <Textarea
              placeholder="Describe your project idea in a sentence — e.g. 'a CLI that tracks crypto wallet activity in real time'"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={3}
            />
            <Button onClick={() => runFree("name")} disabled={loading === "name"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              {loading === "name" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Suggest project names
            </Button>
            {names.length > 0 && (
              <div className="rounded-lg border-2 border-secondary/40 bg-secondary/5 p-3 space-y-1.5">
                {names.map((n) => (
                  <div key={n} className="flex items-center justify-between gap-2 text-sm">
                    <code className="font-mono text-foreground">{n}</code>
                    <button onClick={() => copy(`name-${n}`, n)} className="text-muted-foreground hover:text-foreground">
                      {copied === `name-${n}` ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* FREE: Username generator */}
          <TabsContent value="username" className="space-y-3 pt-3">
            <Textarea
              placeholder="A few words about you — interests, vibe, what you build (e.g. 'rust, distributed systems, late-night coder, sci-fi')"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              rows={3}
            />
            <Button onClick={() => runFree("username")} disabled={loading === "username"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              {loading === "username" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Suggest usernames
            </Button>
            {usernames.length > 0 && (
              <div className="rounded-lg border-2 border-secondary/40 bg-secondary/5 p-3 space-y-1.5">
                {usernames.map((u) => (
                  <div key={u} className="flex items-center justify-between gap-2 text-sm">
                    <code className="font-mono text-foreground">@{u}</code>
                    <button onClick={() => copy(`u-${u}`, u)} className="text-muted-foreground hover:text-foreground">
                      {copied === `u-${u}` ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* PAID tabs share inputs */}
          {(["summary", "tags", "readme"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 pt-3">
              {!isMember ? (
                <PaidLockedOverlay />
              ) : (
                <>
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
                  {tab === "summary" && (
                    <>
                      <Button onClick={() => runPaid("summarize")} disabled={loading === "summarize"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
                        {loading === "summarize" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
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
                    </>
                  )}
                  {tab === "tags" && (
                    <>
                      <Button onClick={() => runPaid("tags")} disabled={loading === "tags"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
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
                    </>
                  )}
                  {tab === "readme" && (
                    <>
                      <Button onClick={() => runPaid("readme")} disabled={loading === "readme"} className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
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
                    </>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
