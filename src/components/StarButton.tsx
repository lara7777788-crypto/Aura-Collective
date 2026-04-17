import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Variant = "compact" | "full";

interface StarButtonProps {
  projectId: string;
  initialStarred?: boolean;
  initialCount: number;
  variant?: Variant;
  className?: string;
}

const isUuid = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

const StarButton = ({
  projectId,
  initialStarred = false,
  initialCount,
  variant = "compact",
  className,
}: StarButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [starred, setStarred] = useState(initialStarred);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    if (!user) {
      toast.error("Sign in to star projects");
      navigate("/sign-in");
      return;
    }

    if (!isUuid(projectId)) {
      toast.info("This project isn't connected to the database yet");
      return;
    }

    // Optimistic update
    const nextStarred = !starred;
    setStarred(nextStarred);
    setCount((c) => c + (nextStarred ? 1 : -1));
    setLoading(true);

    const { error } = nextStarred
      ? await supabase
          .from("project_stars")
          .insert({ user_id: user.id, project_id: projectId })
      : await supabase
          .from("project_stars")
          .delete()
          .eq("user_id", user.id)
          .eq("project_id", projectId);

    setLoading(false);
    if (error) {
      // Roll back
      setStarred(!nextStarred);
      setCount((c) => c + (nextStarred ? -1 : 1));
      toast.error(error.message);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "flex items-center gap-1 text-xs transition-colors",
          starred ? "text-primary" : "text-muted-foreground hover:text-primary",
          className,
        )}
        aria-label={starred ? "Unstar project" : "Star project"}
      >
        <Star className={cn("h-3.5 w-3.5", starred && "fill-current")} />
        {count.toLocaleString()}
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className={cn("w-full gap-2", starred && "border-primary text-primary", className)}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Star className={cn("h-4 w-4", starred && "fill-current")} />
      )}
      {starred ? "Starred" : "Star"} · {count.toLocaleString()}
    </Button>
  );
};

export default StarButton;
