"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  MessageSquare,
  Trash2,
  Moon,
  Sparkles,
} from "lucide-react";
import type { Conversation } from "@/types";
import { truncate, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  activeId,
  isOpen,
  onToggle,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setDeletingId(id);
    await onDeleteConversation(id);
    setDeletingId(null);
  }

  return (
    <>
      {/* Toggle button when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={onToggle}
            className="fixed left-4 top-4 z-50 p-2.5 rounded-xl glass transition-cosmic"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PanelLeftOpen size={18} style={{ color: "rgba(163,148,255,0.8)" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex-shrink-0 overflow-hidden"
        style={{
          background: "rgba(6,5,15,0.85)",
          backdropFilter: "blur(30px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex flex-col h-full w-[280px]">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex-shrink-0"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #e8e4ff, #5534ff)",
                  boxShadow: "0 0 12px rgba(107,78,255,0.5)",
                }}
              />
              <span
                className="text-sm font-display font-medium tracking-wide"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1rem",
                }}
              >
                Moon AI
              </span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg transition-cosmic hover:bg-white/5"
            >
              <PanelLeftClose
                size={16}
                style={{ color: "rgba(255,255,255,0.35)" }}
              />
            </button>
          </div>

          {/* New Chat button */}
          <div className="px-3 py-3">
            <motion.button
              onClick={onNewChat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-body transition-cosmic"
              style={{
                background: "rgba(107,78,255,0.12)",
                border: "1px solid rgba(107,78,255,0.2)",
                color: "rgba(163,148,255,0.9)",
              }}
            >
              <Plus size={15} />
              New Conversation
            </motion.button>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Moon
                  size={28}
                  style={{ color: "rgba(107,78,255,0.3)" }}
                />
                <p
                  className="text-xs text-center"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  No conversations yet.
                  <br />
                  Start a new chat.
                </p>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p
                  className="text-xs uppercase tracking-widest font-mono px-2 py-2"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  History
                </p>
                <AnimatePresence>
                  {conversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10, height: 0 }}
                      layout
                    >
                      <button
                        onClick={() => onSelectConversation(conv.id)}
                        onMouseEnter={() => setHoveredId(conv.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={cn(
                          "w-full flex items-start gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-cosmic group relative",
                          activeId === conv.id
                            ? "bg-lunar-500/15 border border-lunar-500/20"
                            : "hover:bg-white/4"
                        )}
                      >
                        <MessageSquare
                          size={13}
                          className="flex-shrink-0 mt-0.5"
                          style={{
                            color:
                              activeId === conv.id
                                ? "rgba(163,148,255,0.8)"
                                : "rgba(255,255,255,0.25)",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs truncate leading-snug"
                            style={{
                              color:
                                activeId === conv.id
                                  ? "rgba(255,255,255,0.85)"
                                  : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {truncate(conv.title, 32)}
                          </p>
                          <p
                            className="text-xs mt-0.5 font-mono"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                          >
                            {formatDate(conv.updatedAt)}
                          </p>
                        </div>

                        {/* Delete button */}
                        <AnimatePresence>
                          {(hoveredId === conv.id || deletingId === conv.id) && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              onClick={(e) => handleDelete(e, conv.id)}
                              className="flex-shrink-0 p-1 rounded-md hover:bg-red-500/20 transition-cosmic"
                              style={{ color: "rgba(255,100,100,0.6)" }}
                            >
                              <Trash2 size={12} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={12} style={{ color: "rgba(107,78,255,0.5)" }} />
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Moon AI v1.0 · Best Project ★
              </span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
