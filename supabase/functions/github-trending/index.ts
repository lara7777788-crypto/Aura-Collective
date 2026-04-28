const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GhRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: { login: string; avatar_url: string };
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const months = Math.min(Math.max(parseInt(url.searchParams.get("months") ?? "12"), 1), 24);
    const perPage = Math.min(Math.max(parseInt(url.searchParams.get("per_page") ?? "12"), 1), 30);

    const since = new Date();
    since.setMonth(since.getMonth() - months);
    const sinceStr = since.toISOString().slice(0, 10);

    const ghUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      `created:>${sinceStr} stars:>100`
    )}&sort=stars&order=desc&per_page=${perPage}`;

    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "AuraCollective",
    };
    const token = Deno.env.get("GITHUB_TOKEN");
    if (token) headers.Authorization = `Bearer ${token}`;

    const r = await fetch(ghUrl, { headers });
    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ error: `GitHub ${r.status}: ${text}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const data = await r.json();
    const repos = (data.items as GhRepo[]).map((it) => ({
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

    return new Response(JSON.stringify({ repos, months }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
