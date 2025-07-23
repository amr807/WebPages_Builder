"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Send,
  Code,
  Loader2,
  CheckCircle,
  Clock,
  Zap,
  Sparkles,
  Star,
  ArrowRight,
  Globe,
  Palette,
  Layout,
} from "lucide-react"
import { ChatMessage, GeneratedPage } from "./types"



const samplePrompts = [
  "Create a modern landing page for a SaaS startup",
  "Build a portfolio website for a graphic designer",
  "Design a restaurant website with menu and contact",
  "Generate an e-commerce product page layout",
  "Create a blog homepage with article cards",
  "Build a corporate about us page with team section",
]

const loadingSteps = [
  { text: "Analyzing your requirements...", icon: "🔍" },
  { text: "Designing the layout structure...", icon: "📐" },
  { text: "Crafting beautiful components...", icon: "🎨" },
  { text: "Optimizing for responsiveness...", icon: "📱" },
  { text: "Adding interactive elements...", icon: "⚡" },
  { text: "Finalizing your perfect webpage...", icon: "🚀" },
]

export default function WebPageBuilderChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null)
  const [showPage, setShowPage] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentPrompt = inputValue
    setInputValue("")
    setIsGenerating(true)
    setCurrentStep(0)

    const animationInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Clear the animation interval
      clearInterval(animationInterval)

      const mockPage: GeneratedPage = {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .feature { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Welcome to Your New Website</h1>
        <p>Built with AI-powered precision and modern design principles</p>
    </div>
    <div class="container">
        <div class="features">
            <div class="feature">
                <h3>Modern Design</h3>
                <p>Clean, contemporary layouts that engage your audience</p>
            </div>
            <div class="feature">
                <h3>Responsive</h3>
                <p>Looks perfect on all devices and screen sizes</p>
            </div>
            <div class="feature">
                <h3>Fast Loading</h3>
                <p>Optimized for speed and performance</p>
            </div>
        </div>
    </div>
</body>
</html>`,
        css: "",
        title: "AI Generated Website",
        description: "A beautiful, responsive website created by AI",
      }

      setCurrentStep(loadingSteps.length - 1)
      await new Promise((resolve) => setTimeout(resolve, 300))

      setGeneratedPage(mockPage)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Perfect! I've created a stunning, responsive website based on your requirements. The page features modern design principles, optimized performance, and engaging user experience. Your website is ready to go live! 🎉`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
      setShowPage(true)
    } catch (error) {
      console.error("Error generating page:", error)
      clearInterval(animationInterval)

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I apologize, but I encountered an error while generating your website. Please try again with a different description.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = () => {
    setMessages([])
    setGeneratedPage(null)
    setShowPage(false)
    setIsGenerating(false)
    setCurrentStep(0)
  }

  if (showPage && generatedPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    WebGPT Generated Page
                  </h1>
                  <p className="text-sm text-gray-600">AI-crafted for optimal user experience</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 transition-all duration-200"
                >
                  <Code className="w-4 h-4" />
                  <span>View Code</span>
                </Button>
                <Button
                  onClick={resetChat}
                  variant="outline"
                  className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create New Page</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-600">Preview - {generatedPage.title}</span>
                </div>
              </div>
              <iframe
                srcDoc={generatedPage.html}
                className="w-full h-[600px] border-0"
                title="Generated Website Preview"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WebGPT
              </h1>
              <p className="text-gray-600">AI-Powered Website Builder • Create stunning websites in seconds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-100px)] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to WebGPT!
              </h2>
              <p className="text-gray-600 mb-12 max-w-4xl mx-auto text-lg leading-relaxed">
                Your intelligent website creation assistant. Simply describe what you need, and I&apos;ll generate a
                beautiful, responsive website tailored perfectly to your requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                <div className="col-span-full flex items-center justify-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-700">Popular Website Types</h3>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                {samplePrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInputValue(prompt)}
                    className="group p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 text-gray-700 text-sm hover:border-blue-300 hover:bg-white/90 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {index === 0 && <Zap className="w-4 h-4 text-white" />}
                        {index === 1 && <Palette className="w-4 h-4 text-white" />}
                        {index === 2 && <Layout className="w-4 h-4 text-white" />}
                        {index === 3 && <Globe className="w-4 h-4 text-white" />}
                        {index === 4 && <Code className="w-4 h-4 text-white" />}
                        {index === 5 && <Star className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <span className="block font-medium">{prompt}</span>
                        <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="text-xs text-blue-600">Click to try</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start space-x-3 max-w-4xl">
                {message.type === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 shadow-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-xs font-medium text-white">You</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading Animation */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-4xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Globe className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            WebGPT is Building Your Website
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {loadingSteps.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-3"
                            >
                              {index < currentStep ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : index === currentStep ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Loader2 className="w-5 h-5 text-blue-600" />
                                </motion.div>
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="text-lg mr-2">{step.icon}</span>
                              <span
                                className={`text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`}
                              >
                                {step.text}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        {/* Website Preview */}
                        <div className="relative mt-6">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl z-10"></div>
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 space-y-4">
                            <div className="flex items-center space-x-2 mb-4">
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              <div className="h-2 bg-gray-200 rounded-full flex-1 ml-4"></div>
                            </div>
                            <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg w-3/4 animate-pulse"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-blue-100 rounded-full w-full animate-pulse"></div>
                              <div className="h-3 bg-purple-100 rounded-full w-2/3 animate-pulse"></div>
                              <div className="h-3 bg-blue-100 rounded-full w-1/2 animate-pulse"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              <div className="h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg animate-pulse"></div>
                              <div className="h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg animate-pulse"></div>
                              <div className="h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span>Crafting the perfect web experience...</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your dream website... (e.g., 'Create a modern landing page for a tech startup with hero section')"
                className="bg-transparent border-0 text-gray-900 placeholder-gray-500 text-base focus:ring-0 focus:outline-none"
                disabled={isGenerating}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isGenerating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Press Enter to send • Shift + Enter for new line</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>WebGPT Online</span>
              </div>
              <span>🔒 Secure</span>
              <span>⚡ Instant</span>
              <span>📱 Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
