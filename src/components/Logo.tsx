import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Puffy ice-cream-cone wordmark for "aura".
 * Soft pastel gradient pill, chunky rounded letters with a glossy highlight,
 * a tiny cherry sparkle on top — kawaii to match the unicorn mascot.
 */
const Logo = ({ size = "md", className }: LogoProps) => {
  const box =
    size === "sm"
      ? "h-8 px-3 text-base"
      : size === "lg"
      ? "h-14 px-6 text-3xl"
      : "h-10 px-4 text-xl";

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-extrabold tracking-tight",
        "border-2 border-foreground/80",
        box,
        className,
      )}
      style={{
        background:
          "linear-gradient(160deg, hsl(var(--pink-soft)) 0%, hsl(var(--lavender)) 45%, hsl(var(--teal)) 100%)",
        boxShadow:
          "inset 0 -3px 0 hsl(var(--foreground) / 0.12), inset 0 6px 8px hsl(0 0% 100% / 0.55), 2px 3px 0 hsl(var(--foreground))",
      }}
      aria-label="aura"
    >
      {/* Glossy highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 right-2 top-[14%] h-[28%] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 100% / 0.7) 0%, hsl(0 0% 100% / 0) 100%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* Cherry sparkle */}
      <span
        aria-hidden
        className="absolute -top-1.5 right-2 text-[10px] leading-none"
        style={{
          color: "hsl(var(--gold))",
          textShadow: "0 1px 0 hsl(var(--foreground))",
          animation: "logo-twinkle 2.4s ease-in-out infinite",
        }}
      >
        ✦
      </span>

      <span
        className="relative z-10 lowercase"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "hsl(var(--foreground))",
          textShadow:
            "0 1px 0 hsl(0 0% 100% / 0.7), 0 -1px 0 hsl(var(--foreground) / 0.15)",
          letterSpacing: "-0.02em",
        }}
      >
        aura
      </span>
    </span>
  );
};

export default Logo;
