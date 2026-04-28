import { useEffect, useState } from "react";
import vela from "@/assets/vela-watermark.png";

const VelaWatermark = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 1500);
    const fadeOut = setTimeout(() => setVisible(false), 60000);
    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
    };
  }, []);

  return (
    <img
      src={vela}
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 right-4 z-[1] h-20 w-20 select-none transition-opacity duration-[2000ms] md:h-24 md:w-24"
      style={{ opacity: visible ? 0.08 : 0 }}
    />
  );
};

export default VelaWatermark;
