import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        void: {
          950: "#02010a",
          900: "#06050f",
          800: "#0d0b1e",
          700: "#13102d",
        },
        lunar: {
          100: "#e8e4ff",
          200: "#c5bcff",
          300: "#a394ff",
          400: "#8470ff",
          500: "#6b4eff",
          600: "#5534ff",
          700: "#3d1aff",
        },
        nebula: {
          pink: "#ff6eb4",
          cyan: "#00e5ff",
          gold: "#ffd700",
          silver: "#c0c0ff",
        },
        glass: {
          white: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.12)",
        },
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at 20% 50%, #1a0533 0%, #020112 50%, #000814 100%)",
        "lunar-glow":
          "radial-gradient(circle at center, rgba(107,78,255,0.3) 0%, transparent 70%)",
        "nebula-mesh":
          "conic-gradient(from 180deg at 50% 50%, #02010a 0deg, #13102d 120deg, #02010a 240deg, #0d0b1e 360deg)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.4s ease",
        "shimmer": "shimmer 2s linear infinite",
        "moon-rise": "moonRise 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "star-burst": "starBurst 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "typing-dot": "typingDot 1.4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(107,78,255,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(107,78,255,0.8), 0 0 80px rgba(107,78,255,0.3)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" },
        },
        moonRise: {
          from: { opacity: "0", transform: "translateY(30px) scale(0.8)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        starBurst: {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "60%": { transform: "scale(1.1) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        typingDot: {
          "0%, 80%, 100%": { transform: "scale(0)", opacity: "0.3" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "lunar": "0 0 30px rgba(107,78,255,0.4), 0 0 60px rgba(107,78,255,0.15)",
        "nebula": "0 0 40px rgba(255,110,180,0.3), 0 0 80px rgba(0,229,255,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "message-user": "0 4px 20px rgba(107,78,255,0.3)",
        "message-ai": "0 4px 20px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
