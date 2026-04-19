import { useEffect, useRef, useMemo } from "react";

interface Star {
  x: number; // % across
  y: number; // % down
  size: number; // px
  delay: number; // s
  depth: number; // 0..1 (parallax strength)
}

/**
 * Subtle starfield with gentle scroll parallax + twinkling.
 * Layered behind hero content (-z-10 inside the section).
 */
const Starfield = ({ density = 60 }: { density?: number }) => {
  const layerRef = useRef<HTMLDivElement>(null);

  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: density }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.6 + 0.4,
        delay: Math.random() * 4,
        depth: Math.random() * 0.6 + 0.2,
      })),
    [density],
  );

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = layerRef.current;
        if (!el) return;
        const y = window.scrollY;
        // Move the whole layer slightly slower than scroll for parallax
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.6,
            boxShadow: `0 0 ${s.size * 2}px hsl(320 100% 85% / 0.6)`,
            animation: `star-twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${-s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
