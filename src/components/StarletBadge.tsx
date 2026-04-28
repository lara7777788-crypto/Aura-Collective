import { Sparkles } from "lucide-react";

export function StarletBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-secondary/20 to-primary/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary ring-1 ring-secondary/30 ${className}`}>
      <Sparkles className="h-2.5 w-2.5" /> Starlet
    </span>
  );
}
