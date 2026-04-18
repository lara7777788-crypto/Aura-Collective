import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Animated unicorn logo:
 * - White unicorn silhouette on a pink → purple gradient square
 * - Glowing rainbow horn that pulses
 * - Drifting sparkles + slow shimmer sweep
 * - Mane flutters subtly on hover
 */
const Logo = ({ size = "md", className }: LogoProps) => {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-14 w-14" : "h-9 w-9";

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-xl overflow-hidden ring-1 ring-white/30",
        dims,
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, hsl(320 90% 75%) 0%, hsl(290 80% 60%) 50%, hsl(260 75% 50%) 100%)",
      }}
      aria-label="AuraCollective unicorn"
    >
      {/* Shimmer sweep */}
      <span
        className="pointer-events-none absolute -inset-y-2 -left-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ animation: "logo-sweep 3.5s ease-in-out infinite" }}
      />

      {/* Drifting sparkles */}
      <span
        className="absolute h-1 w-1 rounded-full bg-white"
        style={{ top: "18%", left: "22%", animation: "logo-twinkle 2.4s ease-in-out infinite" }}
      />
      <span
        className="absolute h-0.5 w-0.5 rounded-full bg-white"
        style={{ top: "70%", left: "78%", animation: "logo-twinkle 1.8s ease-in-out infinite", animationDelay: "-0.6s" }}
      />
      <span
        className="absolute h-0.5 w-0.5 rounded-full bg-white"
        style={{ top: "30%", right: "15%", animation: "logo-twinkle 2.1s ease-in-out infinite", animationDelay: "-1.2s" }}
      />

      {/* Unicorn silhouette */}
      <svg
        viewBox="0 0 64 64"
        className="relative z-10 h-[78%] w-[78%] drop-shadow-[0_0_3px_hsl(320_100%_85%/0.9)]"
        style={{ animation: "logo-bob 3s ease-in-out infinite" }}
      >
        <defs>
          <linearGradient id="hornGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="35%" stopColor="hsl(48 100% 70%)" />
            <stop offset="70%" stopColor="hsl(320 100% 75%)" />
            <stop offset="100%" stopColor="hsl(280 100% 80%)" />
          </linearGradient>
          <linearGradient id="maneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(320 100% 85%)" />
            <stop offset="100%" stopColor="hsl(280 100% 80%)" />
          </linearGradient>
        </defs>

        {/* Mane flowing behind */}
        <path
          d="M22 18 Q14 22 16 32 Q12 36 18 42 Q14 48 22 50 L26 38 Q24 28 28 22 Z"
          fill="url(#maneGrad)"
          opacity="0.95"
          style={{ transformOrigin: "22px 34px", animation: "logo-mane 4s ease-in-out infinite" }}
        />

        {/* Head + neck (white silhouette) */}
        <path
          d="M48 28
             C 50 24, 48 20, 44 20
             C 42 18, 38 18, 36 22
             L 32 22
             C 28 22, 24 26, 24 32
             L 24 46
             C 24 50, 26 52, 30 52
             L 34 52
             L 34 44
             C 38 44, 42 42, 44 38
             C 48 36, 50 32, 48 28 Z"
          fill="#ffffff"
        />

        {/* Ear */}
        <path d="M40 20 L 42 14 L 44 21 Z" fill="#ffffff" />
        <path d="M41 19 L 42 16 L 43 20 Z" fill="hsl(320 80% 80%)" />

        {/* Eye */}
        <circle cx="42" cy="28" r="1.4" fill="hsl(280 60% 25%)" />
        <circle cx="42.4" cy="27.6" r="0.45" fill="#fff" />

        {/* Nostril */}
        <ellipse cx="48" cy="32" rx="0.8" ry="1.1" fill="hsl(320 50% 70%)" />

        {/* Horn */}
        <g style={{ transformOrigin: "40px 16px", animation: "logo-horn 2s ease-in-out infinite" }}>
          <path d="M40 16 L 36 4 L 43 14 Z" fill="url(#hornGrad)" />
          {/* Horn ridges */}
          <path d="M37.5 9 L 41 11" stroke="#fff" strokeWidth="0.5" opacity="0.7" />
          <path d="M38.5 12 L 41.5 13" stroke="#fff" strokeWidth="0.5" opacity="0.7" />
        </g>

        {/* Sparkle near horn tip */}
        <g style={{ animation: "logo-twinkle 1.4s ease-in-out infinite" }}>
          <path d="M35 4 L 36 2 L 37 4 L 39 5 L 37 6 L 36 8 L 35 6 L 33 5 Z" fill="#fff" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
