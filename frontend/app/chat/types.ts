export interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface GeneratedPage {
  html: string
  css: string
  js?: string
  title: string
  description: string
}