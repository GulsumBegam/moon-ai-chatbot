export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date | string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messages?: Message[];
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  conversationId: string;
  messageId: string;
  content: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface ConversationDetailResponse {
  conversation: Conversation;
  messages: Message[];
}

export type AIModel = "gpt-4o" | "gpt-4o-mini" | "gpt-3.5-turbo";

export interface AppSettings {
  model: AIModel;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  model: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt:
    "You are Moon, a celestial AI assistant with vast cosmic knowledge. You are poetic, wise, and helpful. You speak with elegance and insight, drawing metaphors from the cosmos when appropriate, but remain genuinely useful and accurate.",
};
