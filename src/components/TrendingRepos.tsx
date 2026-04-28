import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink, GitBranch } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Repo {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  owner: string;
  avatar: string;
}

export const TrendingRepos = ({ months = 12 }: { months?: number }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("github-trending", {
          body: { months },
        });
        if (!alive) return;
        if (error) throw error;
        setRepos(data?.repos ?? []);
      } catch (e) {
        if (alive) setError((e as Error).message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [months]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-secondary">
            // trending.git
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Open source from the last <span className="font-mono">{months}</span> months.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hot repos pulled live from GitHub. Sorted by stars.
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg border border-border bg-muted/40"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 font-mono text-sm text-destructive">
          $ failed to load: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full border border-border transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-[4px_4px_0_hsl(var(--foreground))]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <img
                        src={r.avatar}
                        alt=""
                        className="h-6 w-6 rounded border border-border"
                        loading="lazy"
                      />
                      <CardTitle className="truncate font-mono text-sm font-semibold">
                        {r.name}
                      </CardTitle>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-2 text-sm">
                    {r.description || "// no description"}
                  </CardDescription>
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-secondary" />
                      {r.stars.toLocaleString()}
                    </span>
                    {r.language && (
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-3.5 w-3.5" />
                        {r.language}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};
