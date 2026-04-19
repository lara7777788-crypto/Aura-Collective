import { useEffect, useState } from "react";

/**
 * Occasionally streaks a shooting star across the parent section.
 * Parent must be `position: relative; overflow: hidden`.
 */
const ShootingStar = () => {
  const [keyId, setKeyId] = useState(0);
  const [top, setTop] = useState(15);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setTop(Math.random() * 35 + 5); // 5%–40% from top
      setKeyId((k) => k + 1);
      // Re-fire every 5–11s
      timeout = setTimeout(trigger, 5000 + Math.random() * 6000);
    };
    timeout = setTimeout(trigger, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      key={keyId}
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: `${top}%`,
        left: 0,
        width: "180px",
        height: "2px",
        background:
          "linear-gradient(90deg, transparent 0%, hsl(48 100% 90% / 0.9) 40%, #ffffff 70%, transparent 100%)",
        borderRadius: "9999px",
        boxShadow: "0 0 8px hsl(48 100% 85%), 0 0 18px hsl(320 100% 80% / 0.7)",
        animation: "shoot 1.6s ease-out forwards",
      }}
    />
  );
};

export default ShootingStar;
