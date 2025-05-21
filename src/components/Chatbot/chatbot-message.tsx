import { useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

type ChatbotMessageProps = {
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isLoading?: boolean
}

export default function ChatbotMessage({ content, sender, timestamp, isLoading = false }: ChatbotMessageProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  console.log("JSON Response Content : ", content)

  return (
    <motion.div
      className={cn("flex", sender === "user" ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-sm",
          sender === "user"
            ? "bg-[#328E6E] text-white rounded-tr-none"
            : "bg-[#E1EEBC]/50 text-gray-800 rounded-tl-none border border-[#90C67C]/30",
        )}
      >
        <div className="flex items-start gap-3">
          {sender === "bot" && (
            <Avatar className="h-8 w-8 border-2 border-[#67AE6E]">
              <div className="bg-[#90C67C] h-full w-full flex items-center justify-center text-white font-semibold">
                M
              </div>
            </Avatar>
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs opacity-70">{sender === "user" ? "You" : "MooBot Assistant"}</span>
              <span className="text-xs opacity-70">
                {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            {isLoading ? (
              <div className="flex space-x-1 py-2">
                <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div
                  className="h-2 w-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            ) : (

              // <p className="text-sm md:text-base whitespace-pre-wrap prose prose-sm md:prose-base">{content}</p>

              // <ReactMarkdown className="prose prose-sm md:prose-base max-w-none">{content}</ReactMarkdown>

              // <div className="prose prose-sm md:prose-base max-w-none">
              //   <ReactMarkdown
              //     remarkPlugins={[remarkGfm]}
              //     components={...}
              //   >
              //     {content.replaceAll("\\n", "\n")}
              //   </ReactMarkdown>
              // </div>

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
                {content.replace("\\n", "\n")}
              </ReactMarkdown>

            )}

            {sender === "bot" && !isLoading && (
              <div className="flex items-center justify-end mt-2 space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-[#328E6E] hover:bg-[#E1EEBC]/30"
                  title="Helpful"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-[#328E6E] hover:bg-[#E1EEBC]/30"
                  title="Not helpful"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-[#328E6E] hover:bg-[#E1EEBC]/30"
                  title={isCopied ? "Copied!" : "Copy to clipboard"}
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-[#328E6E] hover:bg-[#E1EEBC]/30"
                  title="Download response"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
