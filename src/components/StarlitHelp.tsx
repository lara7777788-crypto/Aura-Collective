import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { askStarlit } from "@/lib/starlit";
import { Link } from "react-router-dom";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const STARTER: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Starlit ✦ — ask me about plans, billing, refunds, crypto payments, or how to use Aura Collective. How can I help?",
};

const StarlitHelp = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await askStarlit<{ text: string }>("support", { messages: next });
      setMessages([...next, { role: "assistant", content: result.text || "Sorry, I didn't catch that — try rephrasing?" }]);
    } catch (e: any) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I'm having trouble right now. For urgent help, email lara@loveconcursall.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Starlit help"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" />
          Help
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 left-6 z-40 flex h-[520px] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">Starlit support</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-md p-1 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/20 px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-card text-card-foreground border border-border"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto rounded-2xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                Starlit is thinking…
              </div>
            )}
          </div>

          <div className="border-t border-border bg-background px-3 py-2 text-[11px] text-muted-foreground">
            Quick links:{" "}
            <Link to="/billing" className="underline hover:text-foreground">Billing</Link>{" "}·{" "}
            <Link to="/refunds" className="underline hover:text-foreground">Refunds</Link>{" "}·{" "}
            <Link to="/terms" className="underline hover:text-foreground">Terms</Link>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border bg-background px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about plans, refunds, crypto…"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default StarlitHelp;
