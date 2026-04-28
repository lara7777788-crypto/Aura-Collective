import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setState("invalid");
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch (e) {
        setState("invalid");
      }
    };
    validate();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) {
      setErrorMsg(error.message);
      setState("error");
      return;
    }
    if (data?.success) setState("done");
    else if (data?.reason === "already_unsubscribed") setState("already");
    else setState("error");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-border rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-3">Unsubscribe</h1>

        {state === "loading" && (
          <div className="flex flex-col items-center gap-3 py-6 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Checking your link…</p>
          </div>
        )}

        {state === "valid" && (
          <>
            <p className="text-muted-foreground mb-6">
              Click below to unsubscribe from Aura Collective emails. You'll stop
              receiving updates immediately.
            </p>
            <Button onClick={confirm} className="w-full">Confirm unsubscribe</Button>
          </>
        )}

        {state === "submitting" && (
          <div className="flex flex-col items-center gap-3 py-6 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Processing…</p>
          </div>
        )}

        {state === "done" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="text-lg font-medium">You're unsubscribed</p>
            <p className="text-sm text-muted-foreground">We won't email you again.</p>
          </div>
        )}

        {state === "already" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="text-lg font-medium">Already unsubscribed</p>
            <p className="text-sm text-muted-foreground">This email is no longer on our list.</p>
          </div>
        )}

        {state === "invalid" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <XCircle className="h-10 w-10 text-destructive" />
            <p className="text-lg font-medium">Invalid or expired link</p>
            <p className="text-sm text-muted-foreground">Please use the link from your most recent email.</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <XCircle className="h-10 w-10 text-destructive" />
            <p className="text-lg font-medium">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{errorMsg || "Please try again."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
