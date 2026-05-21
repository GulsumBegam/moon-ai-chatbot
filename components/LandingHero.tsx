"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Zap, Database } from "lucide-react";

interface LandingHeroProps {
  onStartChat: () => void;
}

const features = [
  {
    icon: Zap,
    title: "Real-time AI",
    desc: "Powered by GPT-4",
    color: "var(--nebula-gold)",
  },
  {
    icon: Database,
    title: "Persistent Memory",
    desc: "Chat history saved",
    color: "var(--nebula-cyan)",
  },
  {
    icon: Sparkles,
    title: "Cosmic UI",
    desc: "Glassmorphism design",
    color: "var(--nebula-pink)",
  },
];

export function LandingHero({ onStartChat }: LandingHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 max-w-2xl mx-auto">
      {/* Moon icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div
          className="w-28 h-28 rounded-full mx-auto relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #e8e4ff 0%, #a394ff 35%, #5534ff 75%, #1a0066 100%)",
            boxShadow:
              "0 0 80px rgba(107,78,255,0.6), 0 0 160px rgba(107,78,255,0.3)",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-16px] rounded-full border border-dashed opacity-30"
            style={{ borderColor: "rgba(107,78,255,0.5)" }}
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1
          className="font-display text-7xl font-light tracking-tight mb-2 text-shimmer"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Moon AI
        </h1>
        <p
          className="text-sm font-mono uppercase tracking-[0.3em] mb-4"
          style={{ color: "rgba(163,148,255,0.6)" }}
        >
          Celestial Intelligence
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-lg mb-10 max-w-md leading-relaxed"
        style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}
      >
        Where artificial intelligence meets cosmic wonder. Ask anything. Explore
        everything.
      </motion.p>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <f.icon size={14} style={{ color: f.color }} />
            <span
              className="text-xs font-body"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {f.title}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.button
          onClick={onStartChat}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-body text-base font-medium overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(107,78,255,0.8), rgba(85,52,255,0.9))",
            boxShadow:
              "0 0 30px rgba(107,78,255,0.5), 0 8px 32px rgba(0,0,0,0.4)",
            border: "1px solid rgba(163,148,255,0.3)",
            color: "white",
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
          <MessageCircle size={18} />
          Begin Your Journey
          <Sparkles size={16} className="opacity-70" />
        </motion.button>
      </motion.div>

      {/* Stack badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 flex flex-col items-center gap-2"
      >
        <div
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Built with
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Next.js 15",
            "TypeScript",
            "Prisma",
            "Tailwind CSS",
            "shadcn/ui",
          ].map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{
                background: "rgba(107,78,255,0.1)",
                border: "1px solid rgba(107,78,255,0.15)",
                color: "rgba(163,148,255,0.6)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
