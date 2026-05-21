import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SETTINGS } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId } = body as {
      message: string;
      conversationId?: string;
    };

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 20 } },
      });
    }

    if (!conversation) {
      const title =
        message.length > 40 ? message.slice(0, 40) + "…" : message;
      conversation = await prisma.conversation.create({
        data: { title },
        include: { messages: true },
      });
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: message,
      },
    });

    // Build message history for AI
    const history = (conversation.messages || []).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    history.push({ role: "user", content: message });

    // Call AI API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your-openai-api-key-here") {
      // Return a demo response if no API key is configured
      const demoResponse = getDemoResponse(message);
      const aiMessage = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: "assistant",
          content: demoResponse,
        },
      });

      return NextResponse.json({
        conversationId: conversation.id,
        messageId: aiMessage.id,
        content: demoResponse,
      });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_SETTINGS.model,
        messages: [
          { role: "system", content: DEFAULT_SETTINGS.systemPrompt },
          ...history,
        ],
        temperature: DEFAULT_SETTINGS.temperature,
        max_tokens: DEFAULT_SETTINGS.maxTokens,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.json();
      throw new Error(error.error?.message || "OpenAI API error");
    }

    const openaiData = await openaiRes.json();
    const aiContent =
      openaiData.choices[0]?.message?.content ||
      "The cosmos is silent for now...";

    // Save AI response
    const aiMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: "assistant",
        content: aiContent,
      },
    });

    // Update conversation title if it was just created
    if (!conversationId) {
      const title =
        message.length > 50 ? message.slice(0, 50) + "…" : message;
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { title },
      });
    }

    return NextResponse.json({
      conversationId: conversation.id,
      messageId: aiMessage.id,
      content: aiContent,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

function getDemoResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return "Greetings, cosmic traveler. 🌙 I am Moon, your celestial AI companion. I sense you've journeyed far to reach me across the digital cosmos. To unlock my full wisdom, please configure your OpenAI API key in the `.env.local` file. Until then, I shall answer from the stars as best I can.";
  }

  if (lowerMsg.includes("who are you") || lowerMsg.includes("what are you")) {
    return "I am **Moon** — a full-stack AI chatbot born from the intersection of code and cosmos. ✨\n\nBuilt with:\n- **Next.js 15** — the stellar framework\n- **TypeScript** — typed like constellations\n- **Prisma ORM** — database as deep as space\n- **Tailwind CSS** — styled by nebulae\n- **shadcn/ui** — components forged from stardust\n\nTo experience my true intelligence, configure your OpenAI API key.";
  }

  if (lowerMsg.includes("space") || lowerMsg.includes("moon") || lowerMsg.includes("star")) {
    return "Ah, you speak my native language — the language of the cosmos! 🌌\n\nDid you know that the Moon influences not just tides, but human creativity and consciousness? The same gravitational poetry that pulls the oceans also draws dreamers to look upward.\n\n*Configure your API key to explore the universe of my knowledge fully.*";
  }

  return `I received your message across the void: *"${message}"*\n\nAs a demo instance without a configured API key, my responses are limited to the echoes of pre-written cosmic poetry. 🌙\n\n**To activate full AI capabilities:**\n1. Copy \`.env.example\` to \`.env.local\`\n2. Add your OpenAI API key\n3. Restart the development server\n\nThen I shall answer every question with the full depth of the cosmos.`;
}
