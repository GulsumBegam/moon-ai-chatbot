"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { LandingHero } from "@/components/LandingHero";
import type { Conversation, Message } from "@/types";

export default function HomePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    }
  }

  async function loadConversation(id: string) {
    setIsLoading(true);
    setShowLanding(false);
    try {
      const res = await fetch(`/api/history/${id}`);
      const data = await res.json();
      setActiveConversationId(id);
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load conversation:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteConversation(id: string) {
    try {
      await fetch(`/api/history/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
        setMessages([]);
        setShowLanding(true);
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  }

  function startNewChat() {
    setActiveConversationId(null);
    setMessages([]);
    setShowLanding(false);
  }

  async function sendMessage(content: string) {
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId: activeConversationId || "new",
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          conversationId: activeConversationId,
        }),
      });

      const data = await res.json();

      if (data.conversationId && !activeConversationId) {
        setActiveConversationId(data.conversationId);
        await fetchConversations();
      }

      const aiMessage: Message = {
        id: data.messageId,
        conversationId: data.conversationId,
        role: "assistant",
        content: data.content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation title if it was newly created
      if (!activeConversationId) {
        setActiveConversationId(data.conversationId);
        await fetchConversations();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        conversationId: activeConversationId || "new",
        role: "assistant",
        content:
          "The cosmic signal was lost. Please check your API configuration and try again.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-void-950 relative">
      <CosmicBackground />

      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onSelectConversation={(id) => {
          loadConversation(id);
          setShowLanding(false);
        }}
        onNewChat={startNewChat}
        onDeleteConversation={deleteConversation}
      />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col relative overflow-hidden transition-all duration-500"
        style={{ marginLeft: sidebarOpen ? "0" : "0" }}
      >
        <AnimatePresence mode="wait">
          {showLanding ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex items-center justify-center"
            >
              <LandingHero onStartChat={startNewChat} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ChatInterface
                messages={messages}
                isLoading={isLoading}
                onSendMessage={sendMessage}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                sidebarOpen={sidebarOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
