import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CosmicBackdrop from "@/components/CosmicBackdrop";
import Logo from "@/components/Logo";

type Stage = "checking" | "confirm" | "form" | "error";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<Stage>("checking");
  const [linkError, setLinkError] = useState("");
  const [continueUrl, setContinueUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // 1. If we already have a recovery session, go straight to the form.
      const { data: existing } = await supabase.auth.getSession();
      if (existing.session) {
        if (!mounted) return;
        if (window.location.hash || window.location.search) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        setStage("form");
        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const queryParams = new URLSearchParams(window.location.search);

      const errorDescription =
        hashParams.get("error_description") ||
        hashParams.get("error") ||
        queryParams.get("error_description") ||
        queryParams.get("error");

      if (errorDescription) {
        if (!mounted) return;
        setLinkError(decodeURIComponent(errorDescription.replace(/\+/g, " ")));
        setStage("error");
        return;
      }

      // 2. If access tokens were posted in the hash (already verified), set the session.
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!mounted) return;
        if (error) {
          setLinkError(error.message);
          setStage("error");
          return;
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        setStage("form");
        return;
      }

      // 3. Scanner-safe handoff: email links arrive as ?continue=<verify-url>.
      // We DO NOT navigate automatically — that would let inbox bots consume the token.
      // The user must click "Continue" to proceed to /verify.
      const continueParam = queryParams.get("continue");
      if (continueParam) {
        if (!mounted) return;
        setContinueUrl(continueParam);
        setStage("confirm");
        return;
      }

      if (!mounted) return;
      setLinkError("This reset link is missing or has already been used. Please request a fresh password reset email.");
      setStage("error");
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        if (window.location.hash || window.location.search) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        setStage("form");
      }
    });

    init();

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated — you're signed in");
    navigate("/dashboard");
  };

  const description =
    stage === "error"
      ? linkError
      : stage === "confirm"
      ? "Click continue to verify your reset link and set a new password."
      : stage === "form"
      ? "Choose a strong new password."
      : "Preparing your reset…";

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
      <CosmicBackdrop />
      <Card className="relative w-full max-w-sm rounded-2xl border-2 border-foreground/10 shadow-[6px_6px_0_hsl(var(--secondary)/0.4)]">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto"><Logo size="md" /></div>
          <CardTitle className="font-serif italic">Set a new password</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stage === "error" && (
            <Button asChild className="w-full rounded-full bg-primary text-primary-foreground font-bold shadow-[4px_4px_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-primary">
              <Link to="/forgot-password">Request a fresh link</Link>
            </Button>
          )}

          {stage === "confirm" && continueUrl && (
            <Button
              asChild
              className="w-full rounded-full bg-primary text-primary-foreground font-bold shadow-[4px_4px_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-primary"
            >
              <a href={continueUrl} rel="noopener noreferrer">Continue to reset password</a>
            </Button>
          )}

          {stage === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" required placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-bold shadow-[4px_4px_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-primary">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
              </Button>
            </form>
          )}

          {stage === "checking" && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
