"use client";

import { useRef, useEffect, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  PanelLeftOpen,
  Sparkles,
  Moon,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Message } from "@/types";
import { cn, formatDate } from "@/lib/utils";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const SUGGESTIONS = [
  "Tell me about the cosmos",
  "What is artificial intelligence?",
  "Write a cosmic poem",
  "Explain quantum physics simply",
];

export function ChatInterface({
  messages,
  isLoading,
  onSendMessage,
  onToggleSidebar,
  sidebarOpen,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    onSendMessage(trimmed);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleCopy(id: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(6,5,15,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-cosmic"
          >
            <PanelLeftOpen
              size={16}
              style={{ color: "rgba(163,148,255,0.7)" }}
            />
          </motion.button>
        )}
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #e8e4ff, #5534ff)",
              boxShadow: "0 0 8px rgba(107,78,255,0.6)",
            }}
          />
          <span
            className="text-sm font-medium"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
            }}
          >
            Moon AI
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#00e5ff", boxShadow: "0 0 6px #00e5ff" }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(0,229,255,0.6)" }}
          >
            Online
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        <AnimatePresence>
          {isEmpty && !isLoading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full py-16 gap-6"
            >
              <Moon
                size={40}
                style={{ color: "rgba(107,78,255,0.3)" }}
              />
              <div className="text-center">
                <p
                  className="font-display text-2xl font-light mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Begin your conversation
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Ask me anything, cosmic traveler
                </p>
              </div>
              {/* Suggestion pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSendMessage(s)}
                    className="px-3 py-1.5 text-xs rounded-full font-body transition-cosmic"
                    style={{
                      background: "rgba(107,78,255,0.1)",
                      border: "1px solid rgba(107,78,255,0.2)",
                      color: "rgba(163,148,255,0.7)",
                    }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx === messages.length - 1 ? 0 : 0,
                  }}
                  className={cn(
                    "flex gap-3 group",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {/* AI Avatar */}
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-7 h-7 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 35%, #e8e4ff, #5534ff)",
                          boxShadow: "0 0 10px rgba(107,78,255,0.5)",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className={cn(
                      "relative max-w-[75%] rounded-2xl px-4 py-3",
                      msg.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm"
                    )}
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(107,78,255,0.7), rgba(85,52,255,0.8))",
                            border: "1px solid rgba(163,148,255,0.2)",
                            boxShadow:
                              "0 4px 20px rgba(107,78,255,0.25)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                          }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose-cosmic text-sm">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {msg.content}
                      </p>
                    )}

                    {/* Copy & timestamp */}
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span
                        className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-cosmic"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        {formatDate(msg.createdAt)}
                      </span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="opacity-0 group-hover:opacity-100 transition-cosmic p-0.5 rounded"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {copiedId === msg.id ? (
                          <Check size={11} style={{ color: "#00e5ff" }} />
                        ) : (
                          <Copy size={11} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #e8e4ff, #5534ff)",
                  boxShadow: "0 0 10px rgba(107,78,255,0.5)",
                }}
              />
              <div
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(107,78,255,0.6)" }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="px-4 py-4 flex-shrink-0"
        style={{
          background: "rgba(6,5,15,0.7)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="flex items-end gap-3 px-4 py-3 rounded-2xl relative"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(107,78,255,0.2)",
            boxShadow: input
              ? "0 0 20px rgba(107,78,255,0.15)"
              : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <Sparkles
            size={16}
            className="flex-shrink-0 mb-1"
            style={{ color: "rgba(107,78,255,0.4)" }}
          />
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the cosmos anything..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed font-body placeholder:italic"
            style={{
              color: "rgba(255,255,255,0.85)",
              caretColor: "rgba(107,78,255,0.8)",
              maxHeight: "160px",
            }}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            whileHover={input.trim() && !isLoading ? { scale: 1.08 } : {}}
            whileTap={input.trim() && !isLoading ? { scale: 0.93 } : {}}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-cosmic mb-0.5"
            style={{
              background:
                input.trim() && !isLoading
                  ? "linear-gradient(135deg, rgba(107,78,255,0.8), rgba(85,52,255,0.9))"
                  : "rgba(255,255,255,0.05)",
              boxShadow:
                input.trim() && !isLoading
                  ? "0 0 16px rgba(107,78,255,0.4)"
                  : "none",
              color:
                input.trim() && !isLoading
                  ? "white"
                  : "rgba(255,255,255,0.2)",
            }}
          >
            <Send size={14} />
          </motion.button>
        </div>
        <p
          className="text-center text-xs mt-2 font-mono"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
