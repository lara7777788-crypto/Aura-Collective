// Starlet — AuraCollective's AI sidekick ✨
// One function, four modes: summarize | search | readme | tags
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are Starlet, the friendly AI sidekick of AuraCollective.io — a Web4 open developer platform.
Tone: warm, smart, a touch of cosmic sparkle but never cheesy. Concise. Never use emojis unless asked.`;

type Mode = "summarize" | "search" | "readme" | "tags";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI not configured" }, 500);

    const { mode, payload } = await req.json() as { mode: Mode; payload: any };

    const body = buildRequest(mode, payload);
    if (!body) return json({ error: "invalid mode" }, 400);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 429) return json({ error: "Starlet is taking a breather — try again in a moment." }, 429);
    if (res.status === 402) return json({ error: "AI credits exhausted. Top up in workspace settings." }, 402);
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error:", res.status, t);
      return json({ error: "AI gateway error" }, 500);
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const toolCall = choice?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        return json({ result: parsed });
      } catch {
        return json({ error: "failed to parse AI output" }, 500);
      }
    }
    return json({ result: { text: choice?.message?.content ?? "" } });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});

function buildRequest(mode: Mode, payload: any) {
  if (mode === "summarize") {
    return {
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content:
          `Write a ONE-line summary (max 110 chars) of this project. No quotes, no period if not needed.\n\n` +
          `Title: ${payload.title}\nDescription: ${payload.description ?? ""}\nTags: ${(payload.tags ?? []).join(", ")}` },
      ],
      max_completion_tokens: 60,
    };
  }
  if (mode === "tags") {
    return {
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content:
          `Suggest 3-6 short lowercase tags (single words or hyphenated) for this project.\n\n` +
          `Title: ${payload.title}\nDescription: ${payload.description ?? ""}` },
      ],
      tools: [{
        type: "function",
        function: {
          name: "suggest_tags",
          description: "Return short lowercase tags",
          parameters: {
            type: "object",
            properties: {
              tags: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 6 },
            },
            required: ["tags"],
            additionalProperties: false,
          },
        },
      }],
      tool_choice: { type: "function", function: { name: "suggest_tags" } },
    };
  }
  if (mode === "readme") {
    return {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content:
          `Generate a clean, useful README.md (markdown) for this project. Include sections: Overview, Features, Quick start, Usage, License (MIT). Keep it under 250 words.\n\n` +
          `Title: ${payload.title}\nDescription: ${payload.description ?? ""}\nTags: ${(payload.tags ?? []).join(", ")}` },
      ],
      max_completion_tokens: 700,
    };
  }
  if (mode === "search") {
    // Semantic ranking: pick best matches from a provided list
    return {
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content:
          `User is searching: "${payload.query}"\n\nFrom this list, return the IDs of the most relevant projects ranked best-first. Skip irrelevant ones.\n\n` +
          (payload.projects as any[]).map(p => `- id=${p.id} | ${p.title} — ${p.desc} [${(p.tags||[]).join(",")}]`).join("\n") },
      ],
      tools: [{
        type: "function",
        function: {
          name: "rank_projects",
          parameters: {
            type: "object",
            properties: {
              ids: { type: "array", items: { type: "string" } },
              reason: { type: "string", description: "1-sentence cosmic explanation of the picks" },
            },
            required: ["ids", "reason"],
            additionalProperties: false,
          },
        },
      }],
      tool_choice: { type: "function", function: { name: "rank_projects" } },
    };
  }
  return null;
}

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
