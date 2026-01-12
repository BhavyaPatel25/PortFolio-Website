import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * 🔴 IMPORTANT
 * This MUST be a valid HTTPS URL.
 * Do NOT use env vars until everything works.
 */
const API_URL = "https://rag-chatbot-api-pixd.onrender.com/chat";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
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
        credentials: "include", // 🔴 REQUIRED FOR SESSION COOKIES
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
        },
      ]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — I couldn’t reach the AI service. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <Button
          size="icon"
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl hover:scale-105 transition"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-[360px] h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 text-zinc-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <div>
                <p className="text-sm font-semibold">Ask Bhavya’s AI</p>
                <p className="text-xs text-white/80">
                  Resume-aware assistant
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-zinc-900">
            {messages.length === 0 && (
              <div className="mt-20 text-center text-sm text-zinc-400">
                <p className="font-medium">👋 Hi!</p>
                <p className="mt-2">
                  Ask about my experience, skills, projects, or research.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <Bot className="h-5 w-5 mt-1 text-indigo-400" />
                )}

                <div
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm max-w-[75%]",
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-800 text-zinc-100"
                  )}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <User className="h-5 w-5 mt-1 text-zinc-400" />
                )}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-zinc-400">
                AI is thinking…
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-zinc-800 bg-zinc-900 p-3 flex gap-2">
            <Input
              placeholder="Ask about me..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
            <Button
              size="icon"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={sendMessage}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
