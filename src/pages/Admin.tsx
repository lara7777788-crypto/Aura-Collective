import { useEffect, useState } from "react";
import { Loader2, Shield, Users, CreditCard, Coins, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

type Profile = { id: string; display_name: string | null; username: string | null; created_at: string };
type Subscription = {
  id: string; user_id: string; status: string; product_id: string; price_id: string;
  current_period_end: string | null; environment: string; cancel_at_period_end: boolean;
};
type CryptoPayment = {
  id: string; user_id: string; tier: string; amount_usd: number; chain: string;
  tx_hash: string; status: string; verified_at: string | null; created_at: string;
};

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<CryptoPayment[]>([]);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: s }, { data: c }] = await Promise.all([
      supabase.from("profiles").select("id,display_name,username,created_at").order("created_at", { ascending: false }).limit(100),
      supabase.from("subscriptions").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("crypto_payments").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setProfiles((p ?? []) as any);
    setSubs((s ?? []) as any);
    setPayments((c ?? []) as any);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const grantComp = async (userId: string, tier: "starter" | "glow" | "constellation") => {
    const months = 1;
    const now = new Date();
    const end = new Date(now.getTime() + months * 30 * 24 * 3600 * 1000);
    const { error } = await supabase.from("crypto_payments").insert({
      user_id: userId,
      tier,
      tx_hash: `comp-${Date.now()}`,
      chain: "comp",
      token: "COMP",
      from_address: "admin",
      to_address: "admin",
      amount_usd: 0,
      duration_months: months,
      status: "verified",
      verified_at: now.toISOString(),
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Comp ${tier} granted (${months}mo)`);
    load();
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 ring-1 ring-secondary/30">
            <Shield className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin</h1>
            <p className="text-xs text-muted-foreground">Operations dashboard</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={load} className="gap-2 rounded-full">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card><CardContent className="py-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-muted-foreground tracking-wider">Users</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 text-3xl font-bold">{profiles.length}</div>
        </CardContent></Card>
        <Card><CardContent className="py-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-muted-foreground tracking-wider">Subscriptions</span>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 text-3xl font-bold">{subs.filter(s => s.status === "active" || s.status === "trialing").length}</div>
          <p className="text-xs text-muted-foreground mt-1">{subs.length} total</p>
        </CardContent></Card>
        <Card><CardContent className="py-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-muted-foreground tracking-wider">Crypto Pmts</span>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 text-3xl font-bold">{payments.filter(p => p.status === "verified").length}</div>
          <p className="text-xs text-muted-foreground mt-1">{payments.length} total</p>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="subs">Subscriptions</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card><CardContent className="p-0 divide-y">
            {profiles.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 text-sm">
                <div>
                  <div className="font-medium">{p.display_name ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">@{p.username ?? "—"} · {new Date(p.created_at).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-full" onClick={() => grantComp(p.id, "glow")}>Comp Glow</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-full" onClick={() => grantComp(p.id, "constellation")}>Comp Constellation</Button>
                </div>
              </div>
            ))}
            {profiles.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No users yet.</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="subs" className="mt-4">
          <Card><CardContent className="p-0 divide-y">
            {subs.map((s) => (
              <div key={s.id} className="p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{s.user_id.slice(0, 8)}…</span>
                  <Badge variant={s.status === "active" ? "default" : "secondary"}>{s.status}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.product_id} · {s.environment} · ends {s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}
                  {s.cancel_at_period_end && " · cancels at period end"}
                </div>
              </div>
            ))}
            {subs.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No subscriptions yet.</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="crypto" className="mt-4">
          <Card><CardContent className="p-0 divide-y">
            {payments.map((p) => (
              <div key={p.id} className="p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{p.tier} · ${p.amount_usd}</span>
                  <Badge variant={p.status === "verified" ? "default" : "secondary"}>{p.status}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  {p.chain} · {p.tx_hash.slice(0, 18)}… · {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
            {payments.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No crypto payments yet.</div>}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
