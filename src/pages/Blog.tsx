import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ExternalLink, Sparkles, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Repo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  owner: string;
  avatar: string;
  createdAt: string;
};

// ISO week key (e.g. "2026-W17") — used to publish exactly once per week.
function isoWeekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

function weekRangeLabel(d = new Date()) {
  const day = d.getUTCDay() || 7;
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - (day - 1));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = (x: Date) =>
    x.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(monday)} – ${fmt(sunday)}, ${sunday.getUTCFullYear()}`;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function Blog() {
  const week = isoWeekKey();
  const cacheKey = `aura_blog_${week}`;

  const [repos, setRepos] = useState<Repo[]>([]);
  const [post, setPost] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setRepos(parsed.repos || []);
        setPost(parsed.post || "");
        setLoading(false);
        return;
      } catch { /* ignore */ }
    }

    (async () => {
      try {
        // Fetch trending repos from the past month, top 8
        const r = await fetch(
          `${SUPABASE_URL}/functions/v1/github-trending?months=1&per_page=8`,
          { headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } }
        );
        const data = await r.json();
        const items: Repo[] = data.repos || [];
        setRepos(items);

        // Ask Starlet (Lovable AI) to write a short weekly post
        const summaryInput = items.slice(0, 6).map(it =>
          `- ${it.name} (${it.stars}⭐, ${it.language ?? "—"}): ${it.description ?? ""}`
        ).join("\n");

        const aiRes = await supabase.functions.invoke("starlet", {
          body: {
            mode: "summarize",
            text: `You are writing the AuraCollective weekly blog post for the week of ${weekRangeLabel()}.\n\nWrite a friendly, concise editorial (about 180–230 words, no headings, no bullets, no markdown) covering what's trending on GitHub this week. Highlight standout themes across these repos getting stars, mention 3–4 by name, and end with a short reflective line about open-source momentum on Web4. Keep tone warm, professional, a touch cosmic.\n\nRepos:\n${summaryInput}`,
          },
        });

        const text =
          (aiRes.data?.summary as string) ||
          (aiRes.data?.text as string) ||
          (aiRes.data?.result as string) ||
          "";

        setPost(text);
        localStorage.setItem(cacheKey, JSON.stringify({ repos: items, post: text }));
      } catch (e) {
        console.error(e);
        toast.error("Couldn't load this week's post");
      } finally {
        setLoading(false);
      }
    })();
  }, [cacheKey]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email, tags: ["blog"] },
      });
      if (error) throw error;
      toast.success("Subscribed! See you next week ✨");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't subscribe — try again?");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog — AuraCollective | Weekly Web4 GitHub trends</title>
        <meta
          name="description"
          content="Weekly editorial on what's trending on GitHub: standout repos, themes, and open-source momentum on Web4. Published every Monday."
        />
        <link rel="canonical" href="https://auracollective.io/blog" />
      </Helmet>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="mb-2 flex items-center gap-2 text-sm text-foreground/60">
          <Calendar className="h-4 w-4" />
          <span>Week of {weekRangeLabel()}</span>
          <span className="mx-1">·</span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            written by Starlet
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          What got starred this week ⭐
        </h1>

        {loading ? (
          <div className="flex items-center gap-2 text-foreground/70 py-12">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading this week's post…
          </div>
        ) : (
          <>
            <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed whitespace-pre-wrap mb-10">
              {post || "This week's post is brewing — check back soon."}
            </div>

            {repos.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Repos featured this week
                </h2>
                <div className="grid gap-3">
                  {repos.slice(0, 6).map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-lg border border-lavender/40 bg-card p-4 hover:border-primary/60 transition-colors"
                    >
                      <img src={r.avatar} alt={r.owner} className="h-10 w-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {r.name}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5 text-foreground/50" />
                        </div>
                        {r.description && (
                          <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                            {r.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-3 text-xs text-foreground/60">
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3 w-3" /> {r.stars.toLocaleString()}
                          </span>
                          {r.language && <span>· {r.language}</span>}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <Card className="p-6 sm:p-8 border-primary/30 bg-primary/5">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Get the weekly post in your inbox
          </h2>
          <p className="text-sm text-foreground/70 mb-4">
            One short editorial every Monday. No spam — just what's getting starred on GitHub
            and why it matters for Web4.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              required
              placeholder="you@stardust.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={subscribing}>
              {subscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
        </Card>

        <div className="mt-12 text-center text-sm text-foreground/60">
          ← <Link to="/" className="hover:text-foreground">Back home</Link>
        </div>
      </article>
    </div>
  );
}
