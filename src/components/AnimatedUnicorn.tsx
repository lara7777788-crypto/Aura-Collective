/**
 * Tiny animated unicorn — floats gently with a sparkling horn.
 * Pure SVG, white/pink/purple palette to match the cosmic aesthetic.
 */
const AnimatedUnicorn = ({
  size = 56,
  delay = 0,
  flip = false,
  className = "",
}: {
  size?: number;
  delay?: number;
  flip?: boolean;
  className?: string;
}) => (
  <div
    aria-hidden
    className={`pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      animation: "unicorn-float 5s ease-in-out infinite",
      animationDelay: `${delay}s`,
      transform: flip ? "scaleX(-1)" : undefined,
    }}
  >
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <linearGradient id="uniBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="hsl(320 90% 92%)" />
        </linearGradient>
        <linearGradient id="uniMane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(320 90% 75%)" />
          <stop offset="50%" stopColor="hsl(280 80% 65%)" />
          <stop offset="100%" stopColor="hsl(48 95% 65%)" />
        </linearGradient>
        <linearGradient id="uniHorn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(48 100% 70%)" />
          <stop offset="100%" stopColor="hsl(320 90% 80%)" />
        </linearGradient>
      </defs>

      {/* Body */}
      <ellipse cx="52" cy="62" rx="26" ry="18" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.5" />
      {/* Legs */}
      <rect x="34" y="74" width="5" height="14" rx="2" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />
      <rect x="44" y="76" width="5" height="14" rx="2" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />
      <rect x="58" y="76" width="5" height="14" rx="2" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />
      <rect x="68" y="74" width="5" height="14" rx="2" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />

      {/* Tail */}
      <path d="M 78 60 Q 92 55 88 72 Q 86 78 80 74" fill="url(#uniMane)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />

      {/* Head */}
      <ellipse cx="28" cy="44" rx="14" ry="12" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.5" />
      {/* Snout */}
      <ellipse cx="18" cy="50" rx="6" ry="5" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />
      {/* Eye */}
      <circle cx="24" cy="42" r="1.6" fill="hsl(330 30% 15%)" />
      {/* Ear */}
      <path d="M 32 32 L 36 24 L 38 34 Z" fill="url(#uniBody)" stroke="hsl(330 30% 25%)" strokeWidth="1.2" />

      {/* Horn */}
      <path
        d="M 28 30 L 32 12 L 35 30 Z"
        fill="url(#uniHorn)"
        stroke="hsl(48 100% 35%)"
        strokeWidth="1"
        style={{ animation: "logo-horn 2s ease-in-out infinite" }}
      />

      {/* Mane */}
      <path
        d="M 36 32 Q 44 28 46 38 Q 48 32 52 40 Q 54 34 58 44 Q 50 50 38 48 Z"
        fill="url(#uniMane)"
        stroke="hsl(330 30% 25%)"
        strokeWidth="1.2"
      />

      {/* Sparkles */}
      <circle cx="38" cy="14" r="1.6" fill="hsl(48 100% 80%)" style={{ animation: "unicorn-sparkle 1.6s ease-in-out infinite" }} />
      <circle cx="22" cy="18" r="1.2" fill="hsl(320 90% 80%)" style={{ animation: "unicorn-sparkle 2.1s ease-in-out infinite", animationDelay: "0.4s" }} />
      <circle cx="42" cy="22" r="1" fill="hsl(280 80% 75%)" style={{ animation: "unicorn-sparkle 1.9s ease-in-out infinite", animationDelay: "0.8s" }} />
    </svg>
  </div>
);

export default AnimatedUnicorn;
