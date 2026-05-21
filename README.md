# 🌙 Moon AI Chatbot

> **★ Best Project** — Full Stack Conversational AI Web App

A stunning, space-themed full-stack AI chatbot featuring glassmorphism UI, real-time AI responses, persistent chat history, and cosmic animations. Built end-to-end with Next.js 15, TypeScript, Prisma ORM, and a custom REST API.

![Moon AI Preview](https://placehold.co/1200x600/02010a/a394ff?text=Moon+AI+Chatbot&font=playfair-display)

---

## ✨ Features

- 🤖 **Real-time AI responses** via OpenAI GPT-4o-mini
- 💾 **Persistent chat history** powered by Prisma ORM + SQLite
- 🌌 **Space-themed glassmorphism UI** with animated nebulae, stars, and a floating moon
- 💬 **Multiple conversations** with sidebar management
- 🗑️ **Delete conversations** with smooth animations
- 📝 **Markdown rendering** with syntax highlighting
- 📋 **Copy messages** to clipboard
- ⌨️ **Typing indicators** with cosmic animation
- 🎨 **Framer Motion** animations throughout
- 📱 **Responsive layout** with collapsible sidebar
- 🌠 **Shooting stars** and twinkling star field
- 🚀 **Suggestion prompts** to get started quickly

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **AI Integration** | OpenAI API (GPT-4o-mini) |
| **Database ORM** | Prisma ORM |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **Styling** | Tailwind CSS |
| **Components** | shadcn/ui + Radix UI |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Markdown** | React Markdown |
| **API** | Next.js REST API Routes |

---

## 📁 Project Structure

```
moon-ai-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # POST /api/chat - Send message, get AI response
│   │   └── history/
│   │       ├── route.ts          # GET /api/history - Fetch all conversations
│   │       └── [id]/
│   │           └── route.ts      # GET/DELETE/PATCH /api/history/:id
│   ├── layout.tsx                # Root layout with fonts + metadata
│   └── page.tsx                  # Main page (landing + chat)
├── components/
│   ├── CosmicBackground.tsx      # Animated star field, nebulae, moon orb
│   ├── LandingHero.tsx           # Welcome screen with CTA
│   ├── Sidebar.tsx               # Conversation history sidebar
│   └── ChatInterface.tsx         # Chat UI with messages + input
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   └── utils.ts                  # Utility functions (cn, formatDate, etc.)
├── prisma/
│   └── schema.prisma             # Database schema (Conversation + Message)
├── styles/
│   └── globals.css               # Global styles, glassmorphism, prose styles
├── types/
│   └── index.ts                  # TypeScript types + interfaces
├── .env.example                  # Environment variables template
├── tailwind.config.ts            # Custom Tailwind theme (cosmic colors)
└── next.config.mjs               # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/moon-ai-chatbot.git
cd moon-ai-chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# 4. Set up the database
npx prisma generate
npx prisma db push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

```env
# Database connection (SQLite for dev, PostgreSQL for prod)
DATABASE_URL="file:./dev.db"

# OpenAI API key (required for AI responses)
OPENAI_API_KEY="sk-..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🗄️ Database Schema

```prisma
model Conversation {
  id        String    @id @default(cuid())
  title     String    @default("New Conversation")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  messages  Message[]
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  role           String       // "user" | "assistant"
  content        String
  createdAt      DateTime     @default(now())
  conversation   Conversation @relation(...)
}
```

---

## 🌐 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send a message, get AI response |
| `GET` | `/api/history` | Get all conversations |
| `GET` | `/api/history/:id` | Get conversation with messages |
| `DELETE` | `/api/history/:id` | Delete a conversation |
| `PATCH` | `/api/history/:id` | Update conversation title |

---

## 🎨 Design System

The UI uses a custom **cosmic design system** with:

- **Colors**: Deep void blacks, lunar purples, nebula pinks/cyans/golds
- **Typography**: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (code)
- **Effects**: Glassmorphism, animated nebulae, star field, shooting stars
- **Animations**: Framer Motion throughout — page transitions, message entrance, typing indicator

---

## 📦 Languages on GitHub

This project uses the following languages that GitHub detects:

| Language | Usage |
|----------|-------|
| **TypeScript** | Main application code (`.ts`, `.tsx`) |
| **CSS** | Global styles, Tailwind (`globals.css`) |
| **Prisma** | Database schema (`schema.prisma`) |
| **JavaScript** | Config files (`postcss.config.js`) |
| **JSON** | `package.json`, `tsconfig.json` |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - DATABASE_URL (use PostgreSQL for production)
# - OPENAI_API_KEY
```

### Production Database

For production, switch to PostgreSQL in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with 🌙 and cosmic energy</p>
  <p><strong>Moon AI</strong> — Where intelligence meets the stars</p>
</div>
