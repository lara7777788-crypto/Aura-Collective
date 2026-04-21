import { useEffect, useState } from "react";
import { Plus, Star, Eye, Trash2, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: "model" | "code" | "dataset";
  stars_count: number;
  views_count: number;
  created_at: string;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const MembersArea = ({ tier }: { tier: string | null }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"model" | "code" | "dataset">("code");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, slug, description, category, stars_count, views_count, created_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      setProjects((data as Project[]) ?? []);
      setLoading(false);
    };
    load();
  }, [user]);

  const totalStars = projects.reduce((acc, p) => acc + (p.stars_count || 0), 0);
  const totalViews = projects.reduce((acc, p) => acc + (p.views_count || 0), 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;
    setSubmitting(true);
    const slug = `${slugify(title)}-${Math.random().toString(36).slice(2, 6)}`;
    const { data, error } = await supabase
      .from("projects")
      .insert({
        owner_id: user.id,
        title: title.trim(),
        slug,
        description: description.trim() || null,
        category,
      })
      .select("id, title, slug, description, category, stars_count, views_count, created_at")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setProjects((p) => [data as Project, ...p]);
    setTitle("");
    setDescription("");
    setCategory("code");
    setOpen(false);
    toast.success("Project created ✨");
  };

  const handleDelete = async (id: string) => {
    const prev = projects;
    setProjects((p) => p.filter((x) => x.id !== id));
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      setProjects(prev);
      toast.error(error.message);
    } else {
      toast.success("Project deleted");
    }
  };

  return (
    <div className="space-y-8">
      {/* Members banner */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-foreground bg-gradient-to-br from-primary/20 via-secondary/10 to-background p-6 shadow-[6px_6px_0_hsl(var(--secondary)/0.4)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Members area
              </span>
              <Badge variant="outline" className="border-secondary text-secondary capitalize">
                {tier ?? "member"}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-foreground font-serif italic">
              You're inside the orbit ✨
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ship private projects, track your aura, and move with the collective.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full gap-2 shadow-[4px_4px_0_hsl(var(--secondary))]">
                <Plus className="h-4 w-4" /> New project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ship a new project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="aura-llm-7b"
                    required
                    maxLength={120}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What does it do? Who is it for?"
                    rows={3}
                    maxLength={500}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat">Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
                    <SelectTrigger id="cat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="model">Model</SelectItem>
                      <SelectItem value="code">Code</SelectItem>
                      <SelectItem value="dataset">Dataset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting ? "Shipping…" : "Ship it"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Member stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { icon: Sparkles, label: "Your projects", value: projects.length.toString() },
          { icon: Star, label: "Total stars", value: totalStars.toLocaleString() },
          { icon: Eye, label: "Total views", value: totalViews.toLocaleString() },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your projects</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Loading…</p>
          ) : projects.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground mb-3">No projects yet — let's ship some auras together.</p>
              <Button onClick={() => setOpen(true)} variant="outline" className="gap-2 rounded-full">
                <Plus className="h-4 w-4" /> Create your first project
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3 hover:border-secondary/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{p.title}</p>
                      <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                        {p.category}
                      </Badge>
                    </div>
                    {p.description && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{p.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" />{p.stars_count}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{p.views_count}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link to={`/project/${p.id}`}>
                      <Button variant="ghost" size="icon" aria-label="Open"><ExternalLink className="h-4 w-4" /></Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {tier === "constellation" && (
        <Card className="border-secondary/40 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" /> Constellation team tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Org profiles, team collaboration, admin controls and SSO are queued up for your galaxy.
              We'll ping you the moment they're ready to ship.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MembersArea;
