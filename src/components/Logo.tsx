import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Wordmark logo: "aura" inside a cosmic gradient box.
 * Each letter has its own cosmic animation (twinkle, drift, shimmer, pulse).
 */
const Logo = ({ size = "md", className }: LogoProps) => {
  const box =
    size === "sm" ? "h-8 px-2.5 text-base" : size === "lg" ? "h-14 px-5 text-3xl" : "h-9 px-3 text-lg";

  const letters = ["a", "u", "r", "a"];
  const anims = ["letter-twinkle", "letter-drift", "letter-shimmer", "letter-pulse"];
  const delays = ["0s", "-0.4s", "-0.8s", "-1.2s"];

  return (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl overflow-hidden ring-1 ring-white/30 font-extrabold tracking-tight",
        box,
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, hsl(320 90% 75%) 0%, hsl(290 80% 60%) 50%, hsl(260 75% 50%) 100%)",
      }}
      aria-label="aura"
    >
      {/* Shimmer sweep across the box */}
      <span
        className="pointer-events-none absolute -inset-y-2 -left-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ animation: "logo-sweep 3.5s ease-in-out infinite" }}
      />

      {/* Tiny drifting stars inside the box */}
      <span
        className="absolute h-1 w-1 rounded-full bg-white"
        style={{ top: "18%", left: "8%", animation: "logo-twinkle 2.4s ease-in-out infinite" }}
      />
      <span
        className="absolute h-0.5 w-0.5 rounded-full bg-white"
        style={{ top: "70%", left: "92%", animation: "logo-twinkle 1.8s ease-in-out infinite", animationDelay: "-0.6s" }}
      />
      <span
        className="absolute h-0.5 w-0.5 rounded-full bg-white"
        style={{ top: "30%", right: "15%", animation: "logo-twinkle 2.1s ease-in-out infinite", animationDelay: "-1.2s" }}
      />

      {/* Word: each letter animated independently */}
      <span className="relative z-10 flex items-baseline">
        {letters.map((l, i) => (
          <span
            key={i}
            className="inline-block text-white drop-shadow-[0_0_4px_hsl(320_100%_85%/0.8)]"
            style={{
              animation: `${anims[i]} 2.6s ease-in-out infinite`,
              animationDelay: delays[i],
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, hsl(48 100% 85%) 50%, hsl(320 100% 88%) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {l}
          </span>
        ))}
      </span>
    </div>
  );
};

export default Logo;
