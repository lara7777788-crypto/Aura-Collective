import { useEffect, useState } from "react";
import { Loader2, Wallet, CheckCircle2, ExternalLink, AlertCircle, Sparkles } from "lucide-react";
import { encodeFunctionData, parseAbi } from "viem";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/useWallet";
import { CHAINS, priceUsd, tierLabel, type ChainKey, type Tier, type Duration } from "@/lib/crypto";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const erc20Abi = parseAbi(["function transfer(address to, uint256 amount) returns (bool)"]);

const DURATIONS: { months: Duration; label: string; badge?: string }[] = [
  { months: 1, label: "Monthly" },
  { months: 6, label: "6 months", badge: "Save 10%" },
  { months: 12, label: "12 months", badge: "Save 20%" },
];

const CHAIN_OPTIONS: { key: ChainKey; label: string; subtitle: string }[] = [
  { key: "base", label: "Base", subtitle: "Fast & cheap (recommended)" },
  { key: "polygon", label: "Polygon", subtitle: "Very low fees" },
  { key: "ethereum", label: "Ethereum", subtitle: "Higher gas fees" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTier?: Tier;
}

export default function CryptoCheckoutDialog({ open, onOpenChange, defaultTier = "glow" }: Props) {
  const { user } = useAuth();
  const { address, chainId, connect, connecting, switchChain, hasMetaMask } = useWallet();
  const [tier, setTier] = useState<Tier>(defaultTier);
  const [months, setMonths] = useState<Duration>(1);
  const [chain, setChain] = useState<ChainKey>("base");
  const [receiver, setReceiver] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => { setTier(defaultTier); }, [defaultTier]);

  useEffect(() => {
    if (!open) return;
    supabase.functions.invoke("get-crypto-receiver").then(({ data }) => {
      setReceiver(data?.receiver ?? null);
    });
  }, [open]);

  const amount = priceUsd(tier, months);
  const chainCfg = CHAINS[chain];
  const onCorrectChain = chainId?.toLowerCase() === chainCfg.hexId.toLowerCase();

  const reset = () => {
    setTxHash(null);
    setDone(false);
    setPaying(false);
    setVerifying(false);
  };

  const pay = async () => {
    if (!user) { toast.error("Sign in first"); return; }
    if (!address) { await connect(); return; }
    if (!receiver) { toast.error("Receiver not configured"); return; }
    if (!onCorrectChain) {
      try { await switchChain(chain); } catch { toast.error("Switch network in MetaMask"); return; }
    }

    setPaying(true);
    try {
      const amountUnits = BigInt(Math.round(amount * 1_000_000)); // 6 decimals
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [receiver as `0x${string}`, amountUnits],
      });

      const hash: string = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: address, to: chainCfg.usdc, data }],
      });
      setTxHash(hash);
      toast.success("Transaction sent — verifying on-chain…");
      setVerifying(true);

      // Poll the chain via verifier (gives RPC time to index)
      let lastErr = "";
      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 4000));
        const { data: res, error } = await supabase.functions.invoke("verify-crypto-payment", {
          body: { txHash: hash, chain, tier, months },
        });
        if (res?.success) {
          setDone(true);
          setVerifying(false);
          toast.success("Membership activated! ✨");
          return;
        }
        lastErr = res?.error || error?.message || "pending";
        if (lastErr.includes("insufficient") || lastErr.includes("no USDC")) break;
      }
      toast.error(`Verification: ${lastErr || "timed out — try again from Billing"}`);
      setVerifying(false);
    } catch (e: any) {
      toast.error(e?.shortMessage || e?.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-secondary" /> Pay with USDC
          </DialogTitle>
          <DialogDescription>
            One-tap stablecoin checkout via MetaMask. No subscription auto-renew.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-600" />
            <h3 className="font-semibold text-lg">You're in ✨</h3>
            <p className="text-sm text-muted-foreground">
              {tierLabel(tier)} unlocked for {months} {months === 1 ? "month" : "months"}.
            </p>
            {txHash && (
              <a
                href={`${chainCfg.explorer}/tx/${txHash}`}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-secondary hover:underline"
              >
                View transaction <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <Button onClick={() => onOpenChange(false)} className="w-full mt-2">Done</Button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Tier */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {(["starter","glow","constellation"] as Tier[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`rounded-lg border-2 px-2 py-2 text-xs font-semibold transition ${
                      tier === t ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {tierLabel(t)}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map(d => (
                  <button
                    key={d.months}
                    onClick={() => setMonths(d.months)}
                    className={`rounded-lg border-2 px-2 py-2 text-xs font-semibold transition relative ${
                      months === d.months ? "border-secondary bg-secondary/10" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {d.label}
                    {d.badge && <div className="text-[9px] font-bold text-secondary mt-0.5">{d.badge}</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Chain */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Network</label>
              <div className="space-y-1.5">
                {CHAIN_OPTIONS.map(c => (
                  <button
                    key={c.key}
                    onClick={() => setChain(c.key)}
                    className={`w-full flex items-center justify-between rounded-lg border-2 px-3 py-2 text-left transition ${
                      chain === c.key ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{c.label}</div>
                      <div className="text-[11px] text-muted-foreground">{c.subtitle}</div>
                    </div>
                    {chain === c.key && <CheckCircle2 className="h-4 w-4 text-foreground" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="rounded-lg bg-muted/40 p-3 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-semibold">{tierLabel(tier)} · {months}mo</div>
                <div className="text-xs text-muted-foreground">on {chainCfg.name}</div>
              </div>
              <div className="text-2xl font-bold">{amount} <span className="text-sm font-medium text-muted-foreground">USDC</span></div>
            </div>

            {!hasMetaMask && (
              <div className="flex items-start gap-2 text-xs rounded-md bg-orange-50 border border-orange-200 p-2 text-orange-900">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                MetaMask not detected. We'll send you to install it.
              </div>
            )}

            {address && !onCorrectChain && (
              <div className="flex items-start gap-2 text-xs rounded-md bg-amber-50 border border-amber-200 p-2 text-amber-900">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                Will switch your wallet to {chainCfg.name} when you confirm.
              </div>
            )}

            <Button
              onClick={pay}
              disabled={paying || verifying}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full gap-2"
            >
              {(paying || verifying) && <Loader2 className="h-4 w-4 animate-spin" />}
              {!address && !paying ? <>Connect MetaMask</> :
               paying ? "Confirm in wallet…" :
               verifying ? "Verifying on-chain…" :
               <><Sparkles className="h-4 w-4" /> Pay {amount} USDC</>}
            </Button>

            {address && (
              <p className="text-[11px] text-center text-muted-foreground">
                Wallet: {address.slice(0,6)}…{address.slice(-4)}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
