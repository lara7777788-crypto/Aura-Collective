import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import StarlitStudio from "./StarlitStudio";

const tipsByPath: Record<string, string> = {
  "/": "Hey ✨ I'm Starlit. Tap me anytime — I help you write summaries, tags & READMEs.",
  "/explore": "Try asking me to find a project — I read vibes and tags.",
  "/dashboard": "Want a quick README draft for your repo? Click me.",
  "/billing": "Crypto or card — both unlock the same orbit.",
  "/profile": "I can polish your bio in one tap. Just open me.",
};

const dismissedKey = "starlit-faerie-dismissed";

export default function StarlitFaerie() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(dismissedKey);
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  // Show contextual tip when route changes
  useEffect(() => {
    if (!visible) return;
    setTipOpen(false);
    const t = setTimeout(() => {
      if (tipsByPath[location.pathname]) setTipOpen(true);
    }, 1200);
    const hide = setTimeout(() => setTipOpen(false), 7000);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, [location.pathname, visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(dismissedKey, "1");
  };

  const tip = tipsByPath[location.pathname];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 18, -10, 14, 0],
              y: [0, -16, 8, -10, 0],
            }}
            exit={{ opacity: 0, scale: 0.3, rotate: 40 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              x: { repeat: Infinity, duration: 8, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            }}
            className="fixed right-[4.5rem] top-[5.5rem] z-[60] select-none"
          >
            {/* Tip bubble */}
            <AnimatePresence>
              {tipOpen && tip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  className="absolute right-full top-0 mr-3 w-60 rounded-2xl border-2 border-foreground bg-white p-3 text-xs text-foreground shadow-[4px_4px_0_hsl(var(--foreground))]"
                >
                  <button
                    onClick={() => setTipOpen(false)}
                    className="absolute -top-2 -right-2 rounded-full bg-foreground text-background p-0.5"
                    aria-label="Close tip"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="flex items-center gap-1 mb-1 text-secondary font-bold">
                    <Sparkles className="h-3 w-3" /> Starlit
                  </div>
                  <p className="leading-snug">{tip}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              {/* Sparkle trail */}
              <span className="pointer-events-none absolute -left-3 -top-1 text-yellow-400 animate-ping opacity-70 text-xs">✨</span>
              <span className="pointer-events-none absolute -left-5 top-3 text-pink-400 animate-pulse opacity-80 text-[10px]">✨</span>
              <span className="pointer-events-none absolute -left-1 top-6 text-yellow-300 animate-pulse opacity-60 text-[8px]">✦</span>

              <button
                onClick={() => setStudioOpen(true)}
                className="text-3xl drop-shadow-[0_0_10px_rgba(217,70,168,0.5)] transition-transform hover:scale-125 cursor-pointer"
                aria-label="Open Starlit"
                title="Open Starlit"
              >
                🧚
              </button>

              {/* Swat (X) button */}
              <button
                onClick={dismiss}
                className="absolute -top-1 -right-2 rounded-full bg-foreground text-background p-0.5 opacity-0 hover:opacity-100 transition-opacity"
                aria-label="Swat away"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StarlitStudio trigger={null} open={studioOpen} onOpenChange={setStudioOpen} />
    </>
  );
}
