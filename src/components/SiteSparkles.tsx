import { useMemo } from "react";

/**
 * Subtle pinpoints of light scattered behind the entire site.
 * Fixed, full-viewport, very low opacity — pure decoration.
 */
const SiteSparkles = ({ density = 70 }: { density?: number }) => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => {
        const r = Math.random();
        const palette = [
          "hsl(var(--lavender))",
          "hsl(var(--gold))",
          "hsl(var(--pink-soft))",
          "#ffffff",
        ];
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: r * 2 + 0.6, // 0.6 – 2.6px
          duration: 2.4 + Math.random() * 3.6,
          delay: Math.random() * 5,
          color: palette[Math.floor(Math.random() * palette.length)],
          glow: r * 6 + 2,
        };
      }),
    [density],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            opacity: 0.55,
            boxShadow: `0 0 ${s.glow}px ${s.color}`,
            animation: `sparkle-twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `-${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SiteSparkles;
