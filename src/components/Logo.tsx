import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

const Logo = ({ size = "md", className }: LogoProps) => {
  const dims = size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-lg bg-primary overflow-hidden",
        dims,
        className,
      )}
    >
      {/* Outer slow rotating halo */}
      <span
        className="absolute inset-0 rounded-lg opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--secondary)), transparent 40%, hsl(var(--secondary)) 80%, transparent)",
          animation: "logo-spin 6s linear infinite",
        }}
      />
      {/* Pulsing aura ring */}
      <span
        className="absolute h-6 w-6 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle, hsl(280 85% 60%) 0%, hsl(var(--secondary)) 45%, transparent 75%)",
          animation: "logo-pulse 2.2s ease-in-out infinite",
        }}
      />
      {/* Inner core */}
      <span
        className="relative z-10 h-2.5 w-2.5 rounded-full bg-white"
        style={{
          boxShadow:
            "0 0 6px hsl(280 90% 70%), 0 0 12px hsl(var(--secondary)), 0 0 18px hsl(var(--secondary))",
          animation: "logo-core 1.6s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default Logo;
