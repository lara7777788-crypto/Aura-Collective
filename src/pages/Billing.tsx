import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, Sparkles, CreditCard, Calendar, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { getPaddleEnvironment } from "@/lib/paddle";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { toast } from "sonner";

const tierLabels: Record<string, { name: string; price: string }> = {
  glow: { name: "Glow", price: "$9 / mo" },
  constellation: { name: "Constellation", price: "$29 / mo" },
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 border-green-300",
  trialing: "bg-blue-100 text-blue-800 border-blue-300",
  past_due: "bg-orange-100 text-orange-800 border-orange-300",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-300",
  canceled: "bg-red-100 text-red-800 border-red-300",
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : "—";

const Billing = () => {
  const { subscription, isActive, tier, loading } = useSubscription();
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();
  const [portalLoading, setPortalLoading] = useState<"cancel" | "payment" | null>(null);

  const openPortal = async (action: "cancel" | "payment") => {
    setPortalLoading(action);
    try {
      const { data, error } = await supabase.functions.invoke("get-customer-portal", {
        body: { environment: getPaddleEnvironment() },
      });
      if (error) throw error;
      const url = action === "cancel" ? data?.cancelUrl : data?.updatePaymentUrl;
      const fallback = data?.overviewUrl;
      const target = url || fallback;
      if (!target) throw new Error("No portal URL returned");
      window.open(target, "_blank", "noopener,noreferrer");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open billing portal");
    } finally {
      setPortalLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const tierInfo = tier ? tierLabels[tier] : null;
  const willCancel = subscription?.cancel_at_period_end;
  const status = subscription?.status ?? "none";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif italic">Manage billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Your subscription, payment method, and billing history.</p>
      </div>

      {!subscription ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">No active subscription</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Pick a tier to unlock the members area.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button onClick={() => openCheckout("glow_monthly")} disabled={checkoutLoading} variant="outline" className="rounded-full">
                Glow — $9/mo
              </Button>
              <Button onClick={() => openCheckout("constellation_monthly")} disabled={checkoutLoading} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                Constellation — $29/mo
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Plan card */}
          <Card className="border-2 border-foreground shadow-[6px_6px_0_hsl(var(--secondary)/0.4)]">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current plan</span>
                  <Badge variant="outline" className={statusColors[status] ?? ""}>
                    {status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  {tierInfo?.name ?? subscription.product_id}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{tierInfo?.price}</p>
              </div>
              {isActive && !willCancel && (
                <Badge className="bg-green-100 text-green-800 border-green-300 border" variant="outline">Active</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {willCancel && (
                <div className="flex items-start gap-2 rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-900">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    Your subscription is set to cancel on{" "}
                    <strong>{formatDate(subscription.current_period_end)}</strong>. You'll keep access until then.
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Current period</p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(subscription.current_period_start)} → {formatDate(subscription.current_period_end)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {willCancel ? "Access ends" : "Renews on"}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(subscription.current_period_end)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between rounded-lg"
                onClick={() => openPortal("payment")}
                disabled={portalLoading !== null}
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Update payment method
                </span>
                {portalLoading === "payment" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
              </Button>

              {tier === "glow" && (
                <Button
                  className="w-full justify-between rounded-lg bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => openCheckout("constellation_monthly")}
                  disabled={checkoutLoading}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Upgrade to Constellation
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}

              {!willCancel && status !== "canceled" && (
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-lg border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => openPortal("cancel")}
                  disabled={portalLoading !== null}
                >
                  <span className="flex items-center gap-2">Cancel subscription</span>
                  {portalLoading === "cancel" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </Button>
              )}

              <p className="text-xs text-muted-foreground pt-1">
                Payment and cancellation are handled in our secure billing portal (opens in a new tab).
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Billing;
