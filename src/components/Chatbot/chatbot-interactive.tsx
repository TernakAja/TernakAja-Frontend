import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mic,
  RefreshCw,
  Settings,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";

// Types
export interface SensorData {
  id: number;
  livestockId: number;
  temperature: number;
  heartRate: number;
  sp02: number;
  timestamp: string;
}

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
};

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  sensorData?: SensorData | null;
  healthStatus?: string | undefined;
}

interface HealthMonitorChatProps {
  sensorData: SensorData | null;
  healthStatus: string | undefined;
}

// Function to generate recommendation based on health status
const generateRecommendation = (status: string): string => {
  if (status === "Healthy") {
    return "Your cow appears to be in good health. Continue regular monitoring and maintain proper nutrition and hydration.";
  }
  return "Please consult a veterinarian immediately for a thorough examination and consider isolating the animal to prevent potential spread of disease. What condition do you see in your cow? Are there any signs of illness? If so, please describe them and I will help you with the initial treatment steps.";
};

function ChatbotInterface({
  isOpen,
  onClose,
  sensorData,
  healthStatus,
}: ChatbotInterfaceProps) {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: t("chatbot.welcomeMessage"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastProcessedData = useRef<{
    sensorData: SensorData | null;
    healthStatus: string | undefined;
  }>({
    sensorData: null,
    healthStatus: undefined,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue, isOpen]);

  // Handle sensor data and health status when received
  useEffect(() => {
    if (sensorData && healthStatus) {
      // Check if the sensorData and healthStatus are different from the last processed data
      const isNewData =
        lastProcessedData.current.sensorData?.id !== sensorData.id ||
        lastProcessedData.current.healthStatus !== healthStatus;

      if (isNewData) {
        const recommendation = generateRecommendation(healthStatus);
        const sensorDetails = `Temperature: ${sensorData.temperature}°C, Heart Rate: ${sensorData.heartRate} bpm, SpO2: ${sensorData.sp02}%`;
        const healthMessage: MessageType = {
          id: `health-${sensorData.id}-${Date.now()}`,
          content: `Based on the latest sensor data for livestock ID ${sensorData.livestockId} (${sensorDetails}), the AI has determined your cow is ${healthStatus}. ${recommendation}`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, healthMessage]);

        // Update the last processed data
        lastProcessedData.current = { sensorData, healthStatus };
      }
    }
  }, [sensorData, healthStatus]);

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

    try {
      const response = await fetch(
        "https://ternakaja-ai-hceghrgdd3dtfjdz.eastus-01.azurewebsites.net/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        }
      );

      const data = await response.json();

      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response || t("chatbot.botResponse.noAnswer"),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to fetch chatbot response:", error);

      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "There is an error in the backend server.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        content: t("chatbot.chatClearedMessage"),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    // Reset last processed data when clearing chat
    lastProcessedData.current = { sensorData: null, healthStatus: undefined };
  };

  return (
    <motion.div
      className={cn(
        "fixed bottom-20 right-5 w-[90vw] max-w-[400px] h-[70vh] max-h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-y-auto",
        isOpen ? "block" : "hidden"
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.header className="bg-[#328E6E] text-white py-4 px-6 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{t("chatbot.header.title")}</h1>
          <p className="text-[#E1EEBC] text-sm">
            {t("chatbot.header.subtitle")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={clearChat}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white/80">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-3 shadow-sm",
                  message.sender === "user"
                    ? "bg-[#328E6E] text-white rounded-tr-none"
                    : "bg-[#E1EEBC]/50 text-gray-800 rounded-tl-none border border-[#90C67C]/30"
                )}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && (
                    <Avatar className="h-6 w-6 border-2 border-[#67AE6E]">
                      <div className="bg-[#90C67C] h-full w-full flex items-center justify-center text-white font-semibold text-xs">
                        M
                      </div>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs opacity-70">
                        {message.sender === "user"
                          ? t("chatbot.chat.youLabel")
                          : t("chatbot.chat.ternakajaAssistantLabel")}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => (
                          <h1
                            className="text-lg font-bold mt-3 mb-1"
                            {...props}
                          />
                        ),
                        h2: ({ ...props }) => (
                          <h2
                            className="text-base font-semibold mt-2 mb-1"
                            {...props}
                          />
                        ),
                        h3: ({ ...props }) => (
                          <h3
                            className="text-sm font-medium mt-2 mb-1"
                            {...props}
                          />
                        ),
                        ul: ({ ...props }) => (
                          <ul
                            className="list-disc list-inside ml-3"
                            {...props}
                          />
                        ),
                        li: ({ ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        p: ({ ...props }) => (
                          <p
                            className="mb-1 text-xs leading-relaxed"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content.replace("\\n", "\n")}
                    </ReactMarkdown>
                    {message.sender === "bot" && (
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full"
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full"
                        >
                          <Download className="h-3 w-3" />
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
              <div className="bg-[#E1EEBC]/50 text-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm border border-[#90C67C]/30">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border-2 border-[#67AE6E]">
                    <div className="bg-[#90C67C] h-full w-full flex items-center justify-center text-white font-semibold text-xs">
                      M
                    </div>
                  </Avatar>
                  <div className="flex space-x-1">
                    <div
                      className="h-1.5 w-1.5 bg-[#328E6E] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-1.5 w-1.5 bg-[#328E6E] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-1.5 w-1.5 bg-[#328E6E] rounded-full animate-bounce"
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

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3">
        <div className="flex items-end gap-1.5 bg-white rounded-lg border border-gray-300 focus-within:border-[#328E6E] focus-within:ring-1 focus-within:ring-[#328E6E] p-1.5">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chatbot.input.placeholder")}
            className="flex-1 max-h-24 outline-none resize-none text-gray-800 bg-transparent py-1.5 px-2 text-sm"
            rows={1}
          />
          <div className="flex items-center gap-1.5 px-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-[#328E6E] hover:bg-[#E1EEBC]/20"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-[#328E6E] hover:bg-[#328E6E]/90 text-white rounded-full h-8 w-8 p-0 flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1.5 text-center">
          {t("chatbot.footer.disclaimer")}
        </p>
      </div>
    </motion.div>
  );
}

export default function HealthMonitorChat({
  sensorData,
  healthStatus,
}: HealthMonitorChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          className="bg-[#328E6E] hover:bg-[#328E6E]/90 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
        >
          {isChatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Chatbot Interface */}
      <ChatbotInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sensorData={sensorData}
        healthStatus={healthStatus}
      />
    </>
  );
}
