import { createClient } from "jsr:@supabase/supabase-js@2";
import { createPublicClient, http, decodeEventLog, parseAbiItem, getAddress } from "npm:viem@2.48.4";
import { base, mainnet, polygon } from "npm:viem@2.48.4/chains";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CHAIN_CFG = {
  base: { chain: base, usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" },
  polygon: { chain: polygon, usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" },
  ethereum: { chain: mainnet, usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
} as const;

const PRICE: Record<string, number> = {
  starter: 3, glow: 5, constellation: 8,
};
const DISC: Record<number, number> = { 1: 0, 6: 0.10, 12: 0.20 };

function expectedUsd(tier: string, months: number) {
  const base = (PRICE[tier] ?? 0) * months;
  return Math.round(base * (1 - (DISC[months] ?? 0)) * 100) / 100;
}

const transferEvent = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)"
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return json({ error: "unauthorized" }, 401);

    const { txHash, chain, tier, months } = await req.json();
    if (!txHash || !chain || !tier || !months) return json({ error: "missing fields" }, 400);

    const cfg = CHAIN_CFG[chain as keyof typeof CHAIN_CFG];
    if (!cfg) return json({ error: "unsupported chain" }, 400);

    const receiver = Deno.env.get("CRYPTO_RECEIVER_ADDRESS");
    if (!receiver) return json({ error: "receiver not configured" }, 500);

    const client = createPublicClient({ chain: cfg.chain, transport: http() });
    const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });

    if (!receipt || receipt.status !== "success") {
      return json({ error: "transaction failed or not found" }, 400);
    }

    // Find a USDC Transfer log to receiver
    const usdc = getAddress(cfg.usdc);
    const recv = getAddress(receiver);
    let amount = 0n;
    let from = "";
    for (const log of receipt.logs) {
      if (getAddress(log.address) !== usdc) continue;
      try {
        const decoded = decodeEventLog({ abi: [transferEvent], data: log.data, topics: log.topics });
        if (decoded.eventName === "Transfer" && getAddress(decoded.args.to) === recv) {
          amount = decoded.args.value;
          from = decoded.args.from;
          break;
        }
      } catch {}
    }

    if (amount === 0n) return json({ error: "no USDC transfer to receiver in tx" }, 400);

    const expected = expectedUsd(tier, Number(months));
    const expectedUnits = BigInt(Math.round(expected * 1_000_000)); // USDC = 6 decimals
    if (amount < expectedUnits) {
      return json({ error: `insufficient amount: got ${Number(amount) / 1e6} USDC, expected ${expected}` }, 400);
    }

    // Use service role for writes
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Idempotency check
    const { data: existing } = await admin
      .from("crypto_payments")
      .select("id")
      .eq("tx_hash", txHash)
      .maybeSingle();

    if (!existing) {
      await admin.from("crypto_payments").insert({
        user_id: user.id,
        tx_hash: txHash,
        chain,
        token: "USDC",
        from_address: from,
        to_address: recv,
        amount_usd: expected,
        tier,
        duration_months: Number(months),
        status: "verified",
        verified_at: new Date().toISOString(),
      });
    }

    // Activate / extend subscription (env='crypto')
    const now = new Date();
    const { data: existingSub } = await admin
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("environment", "crypto")
      .maybeSingle();

    const startBase = existingSub?.current_period_end && new Date(existingSub.current_period_end) > now
      ? new Date(existingSub.current_period_end)
      : now;
    const endDate = new Date(startBase);
    endDate.setMonth(endDate.getMonth() + Number(months));

    const subRow = {
      user_id: user.id,
      paddle_subscription_id: txHash,
      paddle_customer_id: from,
      product_id: tier,
      price_id: `${tier}_${months}mo_crypto`,
      status: "active",
      current_period_start: (existingSub?.current_period_start ?? now.toISOString()),
      current_period_end: endDate.toISOString(),
      cancel_at_period_end: false,
      environment: "crypto",
    };

    if (existingSub) {
      await admin.from("subscriptions").update(subRow).eq("id", existingSub.id);
    } else {
      await admin.from("subscriptions").insert(subRow);
    }

    return json({ success: true, tier, months, amount: expected, validUntil: endDate.toISOString() });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
