import { ReactNode } from "react";
import Starfield from "./Starfield";
import ShootingStar from "./ShootingStar";

/**
 * Cosmic dreamy backdrop: drifting gradient blobs + starfield + shooting stars + grain.
 * Place once near the top of a page section; absolutely-positioned, behind content.
 */
const CosmicBackdrop = ({
  variant = "default",
  withStars = true,
}: {
  variant?: "default" | "soft";
  withStars?: boolean;
}) => {
  const opacity = variant === "soft" ? 0.35 : 0.6;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {withStars && <Starfield density={50} />}
      {withStars && (
        <>
          <ShootingStar initialDelay={1200} minDelay={2200} maxDelay={4500} />
          <ShootingStar initialDelay={3400} minDelay={2600} maxDelay={5200} />
        </>
      )}
      <div
        className="absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.7), transparent 70%)", opacity }}
      />
      <div
        className="absolute top-10 right-0 h-96 w-96 rounded-full blur-3xl animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(280 85% 65% / 0.6), transparent 70%)",
          opacity,
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl animate-blob-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.7), transparent 70%)",
          opacity: opacity * 0.7,
          animationDelay: "-12s",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
};

export const CosmicSection = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`relative overflow-hidden ${className}`}>
    <CosmicBackdrop />
    {children}
  </section>
);

export default CosmicBackdrop;
