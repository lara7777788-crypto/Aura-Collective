import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

const Logo = ({ size = "md", className }: LogoProps) => {
  const dims = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-lg bg-primary overflow-hidden",
        dims,
        className,
      )}
    >
      {/* Pulsing glow */}
      <span className="absolute inset-0 rounded-lg bg-primary animate-ping opacity-40" />
      {/* Sweep highlight */}
      <span className="pointer-events-none absolute -inset-y-1 -left-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-logo-sweep" />
      <Zap
        className={cn(
          icon,
          "relative z-10 text-primary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-logo-flicker",
        )}
        strokeWidth={2.5}
        fill="currentColor"
      />
    </div>
  );
};

export default Logo;
