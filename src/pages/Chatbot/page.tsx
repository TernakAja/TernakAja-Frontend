import ChatbotInterface from "@/components/Chatbot/chatbot-interface";
import FloatingChatbot from "@/components/Chatbot/floating-chatbot";

export default function ChatbotPage() {
  return (
    <main className="overflow-hidden min-h-screen bg-gradient-to-b from-white to-[#E1EEBC]/30">
      <FloatingChatbot />
      <ChatbotInterface />
    </main>
  );
}
