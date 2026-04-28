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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    let mounted = true;

    const markReady = () => {
      if (!mounted) return;
      setReady(true);
      setLinkError("");
    };

    const validateRecoverySession = async () => {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const errorDescription = params.get("error_description") || params.get("error");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (errorDescription) {
        if (mounted) setLinkError(errorDescription.replace(/\+/g, " "));
        return;
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!mounted) return;
        if (error) {
          setLinkError(error.message);
          return;
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        markReady();
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        markReady();
      } else {
        setLinkError("This reset link is missing or expired. Please request a fresh password reset email.");
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) markReady();
    });

    validateRecoverySession();

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

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
      <CosmicBackdrop />
      <Card className="relative w-full max-w-sm rounded-2xl border-2 border-foreground/10 shadow-[6px_6px_0_hsl(var(--secondary)/0.4)]">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto"><Logo size="md" /></div>
          <CardTitle className="font-serif italic">Set a new password</CardTitle>
          <CardDescription>
            {linkError ? linkError : ready ? "Choose a strong new password." : "Validating your reset link…"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {linkError ? (
            <Button asChild className="w-full rounded-full bg-primary text-primary-foreground font-bold shadow-[4px_4px_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-primary">
              <Link to="/forgot-password">Request a fresh link</Link>
            </Button>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" required placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading || !ready} className="w-full rounded-full bg-primary text-primary-foreground font-bold shadow-[4px_4px_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-primary">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
            </Button>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
