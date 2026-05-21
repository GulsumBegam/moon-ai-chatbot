import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Moon AI — Celestial Intelligence",
  description:
    "A space-themed full-stack AI chatbot with glassmorphism UI, real-time responses, and persistent chat history.",
  keywords: ["AI", "chatbot", "space", "Moon", "assistant", "Next.js"],
  openGraph: {
    title: "Moon AI — Celestial Intelligence",
    description: "Chat with Moon, your cosmic AI companion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#02010a" />
      </head>
      <body className="noise-overlay antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
