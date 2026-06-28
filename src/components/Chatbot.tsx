import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const API_BASE = "https://rag-chatbot-api-pixd.onrender.com";
const API_URL = `${API_BASE}/chat`;
const REQUEST_TIMEOUT_MS = 45000; // Render free tier can take a while to wake up

type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

const SUGGESTIONS = [
  { icon: "💼", label: "Projects", q: "What projects has Bhavya built?" },
  { icon: "🛠️", label: "Skills", q: "What are Bhavya's technical skills?" },
  { icon: "🎓", label: "Experience", q: "What is Bhavya's work experience?" },
  { icon: "📬", label: "Contact", q: "How can I get in touch with Bhavya?" },
];

/** A tiny CSS robot face with lime eyes that blink. */
function BotFace({ size = 36 }: { size?: number }) {
  const s = size;
  return (
    <div className="relative" style={{ width: s, height: s }} aria-hidden>
      {/* antenna stem + dot */}
      <span
        className="absolute left-1/2 -translate-x-1/2 bg-accent/70 rounded-full"
        style={{ top: 0, width: s * 0.1, height: s * 0.1 }}
      />
      {/* head */}
      <div
        className="absolute rounded-[28%] bg-[#17140f] border border-accent/45 flex items-center justify-center"
        style={{ left: s * 0.14, top: s * 0.16, width: s * 0.72, height: s * 0.72 }}
      >
        {/* eyes (blink together) */}
        <div className="bot-eyes flex gap-[18%]">
          <span className="block rounded-full bg-accent shadow-[0_0_6px_rgba(198,242,78,0.8)]" style={{ width: s * 0.13, height: s * 0.16 }} />
          <span className="block rounded-full bg-accent shadow-[0_0_6px_rgba(198,242,78,0.8)]" style={{ width: s * 0.13, height: s * 0.16 }} />
        </div>
        {/* smile */}
        <span
          className="absolute border-b-2 border-accent/80 rounded-b-full"
          style={{ bottom: s * 0.14, width: s * 0.26, height: s * 0.1 }}
        />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Pre-warm the API on page load so it's ready when the user opens the chatbot
  useEffect(() => {
    fetch(API_BASE, { method: "GET" }).catch(() => {});
  }, []);

  // Auto-dismiss the "ask me anything" hint after a while
  useEffect(() => {
    if (!showHint) return;
    const t = window.setTimeout(() => setShowHint(false), 6000);
    return () => window.clearTimeout(t);
  }, [showHint]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Message = {
      role: "user",
      content,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowHint(false);
    setLoading(true);

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: content }),
        signal: controller.signal,
      });
      window.clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`server responded ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer ?? "(no answer returned)",
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      window.clearTimeout(timer);
      const aborted = error instanceof DOMException && error.name === "AbortError";
      const network = error instanceof TypeError; // CORS / offline surface as TypeError "Failed to fetch"
      console.error("Chatbot request failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aborted
            ? "The assistant is taking too long to reply — the server may still be waking up. Try again in a moment."
            : network
            ? "Couldn't reach the assistant. If you're viewing this site locally, the API only allows the deployed portfolio (CORS). On the live site, give it a few seconds and retry."
            : `Couldn't get an answer (${(error as Error).message}). Try again in a moment.`,
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const empty = messages.length === 0;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            {/* attention ping */}
            <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
            {/* hint bubble */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="absolute right-[60px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[#2a241d] bg-[#131210] px-3 py-2 shadow-lg"
                >
                  <p className="font-mono text-[11px] text-[#f3eee3]">Ask me anything 👋</p>
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 border-r border-t border-[#2a241d] bg-[#131210]" />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative h-14 w-14 rounded-full bg-[#131210] border border-accent/40 shadow-[0_0_22px_rgba(198,242,78,0.28)] flex items-center justify-center bot-float"
              aria-label="Open chat"
            >
              <BotFace size={38} />
            </motion.button>
          </motion.div>
        )}

        {open && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-lenis-prevent className="w-[380px] h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-[#2a241d] bg-[#131210] flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#0b0a08] border-b border-[#2a241d] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BotFace size={38} />
                <div>
                  <p className="text-sm font-semibold text-[#f3eee3] flex items-center gap-2">
                    Techy
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                        <span className="relative rounded-full bg-accent h-1.5 w-1.5" />
                      </span>
                      online
                    </span>
                  </p>
                  <p className="text-[11px] text-[#9b948a]">Bhavya's AI assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-[#26211b] rounded-md transition text-[#9b948a] hover:text-[#f3eee3]"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages / Welcome */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {empty ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-2">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="bot-float mb-3"
                  >
                    <BotFace size={64} />
                  </motion.div>
                  <p className="text-sm font-semibold text-[#f3eee3] mb-1">Hey, I'm Techy 👋</p>
                  <p className="text-[12px] text-[#9b948a] mb-4 leading-relaxed">
                    I know Bhavya's projects, skills and experience. Pick a starter below or just type a question.
                  </p>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => sendMessage(s.q)}
                        className="group flex items-center gap-2 rounded-lg border border-[#2a241d] bg-[#17140f] hover:bg-[#1b1812] hover:border-accent/40 transition px-3 py-2 text-left"
                      >
                        <span className="text-base leading-none">{s.icon}</span>
                        <span className="text-[12px] text-[#f3eee3] font-medium">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                    >
                      {msg.role === "assistant" && (
                        <div className="h-6 w-6 rounded-md bg-[#17140f] border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
                          <BotFace size={20} />
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-xl px-3 py-2 text-[12.5px] max-w-[72%] leading-relaxed",
                          msg.role === "user"
                            ? "bg-accent text-[#0b0a08] rounded-br-sm font-medium"
                            : "bg-[#17140f] border border-[#2a241d] text-[#f3eee3] rounded-bl-sm"
                        )}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {loading && (
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-md bg-[#17140f] border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
                    <BotFace size={20} />
                  </div>
                  <div className="flex gap-1 items-center bg-[#17140f] border border-[#2a241d] rounded-xl rounded-bl-sm px-3 py-2.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-accent"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#2a241d] bg-[#0b0a08] p-2.5 flex gap-2 items-center">
              <Input
                placeholder="Ask Techy anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="bg-[#17140f] border-[#2a241d] text-[#f3eee3] text-xs placeholder:text-[#6b655b] h-9 focus:border-accent/50 focus-visible:ring-accent/20"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                whileTap={{ scale: 0.9 }}
                className="px-3 h-9 rounded-lg bg-accent text-[#0b0a08] hover:brightness-110 transition disabled:opacity-40 flex items-center justify-center"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            <div className="bg-[#0b0a08] border-t border-[#2a241d] px-4 py-1.5 flex items-center justify-center gap-1.5">
              <Sparkles className="h-3 w-3 text-accent/70" />
              <span className="font-mono text-[9px] text-[#6b655b] tracking-wider uppercase">
                RAG · powered by Bhavya's work
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bot-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.12); }
        }
        .bot-eyes { transform-origin: center; animation: bot-blink 4.5s ease-in-out infinite; }
        @keyframes bot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .bot-float { animation: bot-float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
