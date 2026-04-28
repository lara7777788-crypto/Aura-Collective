import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN;
const ENV: "sandbox" | "live" = clientToken?.startsWith("test_") ? "sandbox" : "live";

type Subscription = {
  id: string;
  status: string;
  product_id: string;
  price_id: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  environment: string;
};

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("environment", ENV)
        .maybeSingle();
      if (active) {
        setSubscription((data as Subscription) ?? null);
        setLoading(false);
      }
    };
    load();

    const channel = supabase
      .channel(`sub-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
        () => load()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [user, authLoading]);

  const isActive =
    !!subscription &&
    ["active", "trialing"].includes(subscription.status) &&
    (!subscription.current_period_end || new Date(subscription.current_period_end) > new Date());

  const tier =
    subscription?.product_id === "constellation"
      ? "constellation"
      : subscription?.product_id === "glow"
      ? "glow"
      : subscription?.product_id === "starter"
      ? "starter"
      : null;

  return { subscription, loading: loading || authLoading, isActive, tier };
}
