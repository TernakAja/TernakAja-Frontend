import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mic, RefreshCw, Settings, Download, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

// Types
type MessageType = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isLoading?: boolean
}

type SuggestedQuestion = {
  id: string
  text: string
  category: string
}

// Sample data
const suggestedQuestions: SuggestedQuestion[] = [
  { id: "q1", text: "How do I monitor my livestock's health?", category: "health" },
  { id: "q2", text: "What's the ideal temperature for cattle?", category: "environment" },
  { id: "q3", text: "How to set up a new livestock collar?", category: "setup" },
  { id: "q4", text: "What are signs of stress in sheep?", category: "health" },
  { id: "q5", text: "How to interpret heart rate data?", category: "data" },
  { id: "q6", text: "Best practices for feeding during winter", category: "seasonal" },
]

// Bot responses based on keywords
// const getBotResponse = (message: string): string => {
//   const lowerMessage = message.toLowerCase()

//   if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
//     return "Hello! I'm Moorgan Assistant. How can I help you with your livestock management today?"
//   }

//   if (lowerMessage.includes("health") || lowerMessage.includes("sick")) {
//     return "Monitoring livestock health is crucial. Look for changes in vital signs like temperature (101-103°F for cattle), heart rate (40-80 BPM), and respiratory rate (10-30 breaths per minute). Our Moorgan collars track these metrics automatically and alert you to anomalies."
//   }

//   if (lowerMessage.includes("temperature") || lowerMessage.includes("weather")) {
//     return "The ideal temperature range for cattle is between 40-75°F (4-24°C). Temperatures outside this range can cause stress. Our weather monitoring system can help you prepare for temperature changes and provide recommendations for livestock care during extreme weather."
//   }

//   if (lowerMessage.includes("collar") || lowerMessage.includes("setup")) {
//     return "To set up a new Moorgan collar: 1) Charge the device fully, 2) Register it in your dashboard with the device ID, 3) Attach it to your animal ensuring a snug but comfortable fit, 4) Verify data transmission in your dashboard. Need more detailed instructions?"
//   }

//   if (lowerMessage.includes("stress") || lowerMessage.includes("behavior")) {
//     return "Signs of stress in livestock include: increased vocalization, reduced feed intake, abnormal posture, excessive panting, isolation from the herd, and changes in vital signs. Our monitoring system can detect many of these changes automatically."
//   }

//   if (lowerMessage.includes("heart rate") || lowerMessage.includes("vital")) {
//     return "Heart rate data interpretation: Normal resting heart rate for cattle is 40-80 BPM, sheep 70-90 BPM, and goats 70-90 BPM. Sustained elevated rates may indicate stress, illness, or pain. Our system flags abnormal patterns and provides historical context for better diagnosis."
//   }

//   if (lowerMessage.includes("feed") || lowerMessage.includes("winter")) {
//     return "For winter feeding: 1) Increase caloric intake by 10-25% as animals use more energy to stay warm, 2) Ensure constant access to unfrozen water, 3) Provide wind protection and dry bedding, 4) Consider supplemental vitamins, especially vitamin A and E. Our nutrition module can help calculate optimal rations."
//   }

//   return "I don't have specific information about that yet. Would you like me to connect you with a livestock specialist who can help with your question?"
// }

export default function ChatbotInterface() {

  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm Moorgan Assistant. I can help you with livestock monitoring, health insights, and management recommendations. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [inputValue])



  // const handleSendMessage = () => {

  //   if (!inputValue.trim()) return

  //   // Add user message
  //   const userMessage: MessageType = {
  //     id: Date.now().toString(),
  //     content: inputValue,
  //     sender: "user",
  //     timestamp: new Date(),
  //   }

  //   setMessages((prev) => [...prev, userMessage])
  //   setInputValue("")
  //   setIsTyping(true)
  //   setShowSuggestions(false)

  //   // Simulate bot typing
  //   setTimeout(() => {

  //     const botMessage: MessageType = {
  //       id: (Date.now() + 1).toString(),
  //       content: getBotResponse(inputValue),
  //       sender: "bot",
  //       timestamp: new Date(),
  //     }

  //     setMessages((prev) => [...prev, botMessage])
  //     setIsTyping(false)
  //   }, 1500)

  // }


  const handleSendMessage = async () => {

    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    // setShowSuggestions(false);

    try {
      const response = await fetch("https://moorgan-ai-ewcub4cafphtgfar.eastus-01.azurewebsites.net/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      // Buat pesan dari bot
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I cannot answer this question...",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }
    
    catch (error) {
      console.error("Gagal mengambil respon dari chatbot:", error);

      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "There is error in the backend server.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
    
    finally {
      setIsTyping(false);
    }
    
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }

  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        content: "Chat cleared. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
    setShowSuggestions(true)
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <motion.header
        className="bg-[#328E6E] text-white py-6 px-8 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">MooBot AI Assistant</h1>
              <p className="text-[#E1EEBC] mt-1">Your intelligent livestock management companion</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" onClick={clearChat}>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <motion.div
          className="flex-1 flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-6 bg-white/80">

            <div className="max-w-4xl mx-auto space-y-6">

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4 shadow-sm",
                      message.sender === "user"
                        ? "bg-[#328E6E] text-white rounded-tr-none"
                        : "bg-[#E1EEBC]/50 text-gray-800 rounded-tl-none border border-[#90C67C]/30",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 border-2 border-[#67AE6E]">
                          <div className="bg-[#90C67C] h-full w-full flex items-center justify-center text-white font-semibold">
                            M
                          </div>
                        </Avatar>
                      )}

                      <div className="flex-1">

                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs opacity-70">
                            {message.sender === "user" ? "You" : "Moorgan Assistant"}
                          </span>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        {/* <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p> */}

                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                            h2: ({...props}) => <h2 className="text-lg font-semibold mt-3 mb-1" {...props} />,
                            h3: ({...props}) => <h3 className="text-base font-medium mt-2 mb-1" {...props} />,
                            ul: ({...props}) => <ul className="list-disc list-inside ml-4" {...props} />,
                            li: ({...props}) => <li className="mb-1" {...props} />,
                            p: ({...props}) => <p className="mb-2 text-sm leading-relaxed" {...props} />,
                          }}
                        >
                          {message.content.replace("\\n", "\n")}
                        </ReactMarkdown>

                        {message.sender === "bot" && (
                          <div className="flex items-center justify-end mt-2 space-x-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-[#E1EEBC]/50 text-gray-800 rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm border border-[#90C67C]/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border-2 border-[#67AE6E]">
                        <div className="bg-[#90C67C] h-full w-full flex items-center justify-center text-white font-semibold">
                          M
                        </div>
                      </Avatar>
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-[#328E6E] rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-[#328E6E] rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-[#328E6E] rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

            </div>

          </div>

          {/* Suggested Questions */}
          {showSuggestions && (
            <motion.div
              className="bg-white/90 border-t border-gray-200 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested questions</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <Badge
                      key={question.id}
                      variant="outline"
                      className="bg-[#E1EEBC]/30 hover:bg-[#E1EEBC]/50 text-[#328E6E] border-[#90C67C]/30 cursor-pointer px-3 py-1.5"
                      onClick={() => handleSuggestedQuestion(question.text)}
                    >
                      {question.text}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <motion.div
            className="border-t border-gray-200 bg-white p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-2 bg-white rounded-xl border border-gray-300 focus-within:border-[#328E6E] focus-within:ring-1 focus-within:ring-[#328E6E] p-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="flex-1 max-h-32 outline-none resize-none text-gray-800 bg-transparent py-2 px-3"
                  rows={1}
                />
                <div className="flex items-center gap-2 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-[#328E6E] hover:bg-[#E1EEBC]/20"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#328E6E] hover:bg-[#328E6E]/90 text-white rounded-full h-10 w-10 p-0 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Moorgan AI provides general information and is not a substitute for professional veterinary advice.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Sidebar - Knowledge Base */}
        <motion.div
          className="hidden lg:block w-80 border-l border-gray-200 bg-white/90 overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-4">
            <h2 className="font-semibold text-lg text-[#328E6E] mb-4">Knowledge Base</h2>

            <Tabs defaultValue="guides">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="docs">Docs</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="space-y-4">
                <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
                  <h3 className="font-medium text-[#328E6E]">Getting Started</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Complete guide to setting up your first livestock monitoring system
                  </p>
                </div>
                <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
                  <h3 className="font-medium text-[#328E6E]">Health Monitoring</h3>
                  <p className="text-sm text-gray-600 mt-1">Understanding vital signs and health indicators</p>
                </div>
                <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
                  <h3 className="font-medium text-[#328E6E]">Seasonal Care</h3>
                  <p className="text-sm text-gray-600 mt-1">Adapting livestock management to seasonal changes</p>
                </div>
                <div className="bg-[#E1EEBC]/20 rounded-lg p-3 cursor-pointer hover:bg-[#E1EEBC]/30">
                  <h3 className="font-medium text-[#328E6E]">Device Maintenance</h3>
                  <p className="text-sm text-gray-600 mt-1">Keeping your Moorgan devices in optimal condition</p>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-medium text-[#328E6E]">How often should I charge the collar?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Moorgan collars typically last 2-3 weeks on a single charge, depending on usage.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-medium text-[#328E6E]">What's the range of the collar?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    The standard range is up to 5 miles in open terrain, less in areas with obstacles.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-medium text-[#328E6E]">Is the collar waterproof?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Yes, Moorgan collars are IP67 rated, making them fully waterproof in up to 1 meter of water.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="font-medium text-[#328E6E]">How accurate is the health monitoring?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Our sensors are 95-98% accurate compared to veterinary equipment in controlled tests.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="docs" className="space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="bg-[#328E6E]/10 p-2 rounded">
                    <Download className="h-4 w-4 text-[#328E6E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#328E6E]">Technical Specifications</h3>
                    <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="bg-[#328E6E]/10 p-2 rounded">
                    <Download className="h-4 w-4 text-[#328E6E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#328E6E]">API Documentation</h3>
                    <p className="text-xs text-gray-500">PDF • 3.7 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="bg-[#328E6E]/10 p-2 rounded">
                    <Download className="h-4 w-4 text-[#328E6E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#328E6E]">User Manual</h3>
                    <p className="text-xs text-gray-500">PDF • 5.1 MB</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
