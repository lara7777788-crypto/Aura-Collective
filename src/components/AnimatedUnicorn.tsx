import unicornMascot from "@/assets/unicorn-mascot.webp";

/**
 * Floating kawaii unicorn — uses the same mascot image as the hero
 * so every unicorn on the site shares one consistent puffy style.
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
  <img
    src={unicornMascot}
    alt=""
    aria-hidden
    className={`pointer-events-none select-none drop-shadow-[0_8px_18px_hsl(var(--lavender)/0.5)] ${className}`}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      animation: "unicorn-float 5s ease-in-out infinite",
      animationDelay: `${delay}s`,
      transform: flip ? "scaleX(-1)" : undefined,
    }}
  />
);

export default AnimatedUnicorn;
