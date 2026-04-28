const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const receiver = Deno.env.get("CRYPTO_RECEIVER_ADDRESS") ?? null;
  return new Response(JSON.stringify({ receiver }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
