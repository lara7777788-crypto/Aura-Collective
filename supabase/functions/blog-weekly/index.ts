// Generates the AuraCollective weekly blog post about trending GitHub repos.
// Uses cached output per ISO week to satisfy "publish once a week".
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

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
    x.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${fmt(monday)} – ${fmt(sunday)}, ${sunday.getUTCFullYear()}`;
}

// Tiny in-memory cache (per edge instance). Keyed by ISO week.
const cache = new Map<string, { repos: Repo[]; post: string; week: string; weekLabel: string }>();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const week = isoWeekKey();
    const weekLabel = weekRangeLabel();

    const cached = cache.get(week);
    if (cached) return json(cached);

    // 1. Fetch trending GitHub repos from the past month, top 8.
    const since = new Date();
    since.setUTCMonth(since.getUTCMonth() - 1);
    const sinceStr = since.toISOString().slice(0, 10);
    const ghUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      `created:>${sinceStr} stars:>100`
    )}&sort=stars&order=desc&per_page=8`;
    const ghHeaders: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "AuraCollective",
    };
    const ghToken = Deno.env.get("GITHUB_TOKEN");
    if (ghToken) ghHeaders.Authorization = `Bearer ${ghToken}`;

    const ghRes = await fetch(ghUrl, { headers: ghHeaders });
    if (!ghRes.ok) {
      const t = await ghRes.text();
      return json({ error: `GitHub ${ghRes.status}: ${t}` }, 502);
    }
    const ghData = await ghRes.json();
    const repos: Repo[] = (ghData.items as any[]).map((it) => ({
      id: it.id,
      name: it.full_name,
      url: it.html_url,
      description: it.description,
      stars: it.stargazers_count,
      language: it.language,
      owner: it.owner.login,
      avatar: it.owner.avatar_url,
      createdAt: it.created_at,
    }));

    // 2. Generate weekly editorial via Lovable AI.
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    let post = "";
    if (lovableKey && repos.length > 0) {
      const summaryInput = repos.slice(0, 6).map(it =>
        `- ${it.name} (${it.stars}⭐, ${it.language ?? "—"}): ${it.description ?? ""}`
      ).join("\n");

      const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "You are Starlet, the editorial voice of AuraCollective — a Web4 open developer platform. Warm, concise, professional, lightly cosmic. No bullet lists, no headings, no markdown formatting characters.",
            },
            {
              role: "user",
              content:
                `Write the AuraCollective weekly blog post for the week of ${weekLabel}. ` +
                `About 180–230 words, plain prose only. Cover what's trending on GitHub this week — ` +
                `highlight standout themes, name 3–4 repos directly, and close with one short reflective ` +
                `line about open-source momentum on Web4.\n\nRepos:\n${summaryInput}`,
            },
          ],
        }),
      });
      if (aiRes.ok) {
        const aiData = await aiRes.json();
        post = aiData.choices?.[0]?.message?.content?.trim() ?? "";
      } else {
        console.error("AI gateway error", aiRes.status, await aiRes.text());
      }
    }

    const payload = { repos, post, week, weekLabel };
    cache.set(week, payload);
    return new Response(JSON.stringify(payload), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});
