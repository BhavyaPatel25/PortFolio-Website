import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const API_BASE = "https://rag-chatbot-api-pixd.onrender.com";
const API_URL = `${API_BASE}/chat`;

type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Pre-warm the API on page load so it's ready when the user opens the chatbot
  useEffect(() => {
    fetch(API_BASE, { method: "GET" }).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          question: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry — couldn't reach AI service. Try again.",
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 w-12 rounded-md bg-[#8B5CF6] shadow-lg hover:shadow-xl transition flex items-center justify-center"
          >
            <Bot className="h-5 w-5 text-white" />
          </motion.button>
        )}

        {open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[360px] h-[500px] rounded-lg overflow-hidden shadow-xl border border-[#1a1a24] bg-[#111118] flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#0a0a0f] border-b border-[#1a1a24]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-[#8B5CF6]/15 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f0f5]">AI Assistant</p>
                    <p className="text-xs text-[#8a8a9a]">Ask about my work</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-[#1a1a24] rounded-md transition"
                >
                  <X className="h-4 w-4 text-[#8a8a9a]" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Bot className="w-8 h-8 text-[#4a4a5a] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#f0f0f5] mb-1">Welcome!</p>
                    <p className="text-xs text-[#8a8a9a]">Ask me about projects or skills</p>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "flex gap-2",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-5 w-5 rounded-md bg-[#8B5CF6]/15 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-2.5 w-2.5 text-[#8B5CF6]" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "rounded-md px-3 py-2 text-xs max-w-[70%] leading-relaxed",
                        msg.role === "user"
                          ? "bg-[#8B5CF6] text-white rounded-br-none"
                          : "bg-[#1a1a24] text-[#f0f0f5] rounded-bl-none"
                      )}
                    >
                      {msg.content}
                    </div>

                    {msg.role === "user" && (
                      <div className="h-5 w-5 rounded-md bg-[#1a1a24] flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-2.5 w-2.5 text-[#8a8a9a]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-md bg-[#8B5CF6]/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-2.5 w-2.5 text-[#8B5CF6]" />
                  </div>
                  <div className="flex gap-1 items-center bg-[#1a1a24] rounded-md rounded-bl-none px-3 py-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-[#8B5CF6]"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#1a1a24] bg-[#0a0a0f] p-2.5 flex gap-2">
              <Input
                placeholder="Ask me..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="bg-[#111118] border-[#1a1a24] text-[#f0f0f5] text-xs placeholder:text-[#4a4a5a] h-8 focus:border-[#8B5CF6]/40"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-3 rounded-md bg-[#8B5CF6] text-white hover:bg-[#7c3aed] transition disabled:opacity-50 h-8 flex items-center justify-center"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
