
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import AITypingBubble from "./AITypingBubble";
import { generateAIResponse } from "./aiChatUtils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatRoomProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIChatRoom = ({ isOpen, setIsOpen }: AIChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    text: "Hello! I'm your shopping assistant. I can help you find products, answer questions about our items, and provide recommendations. What are you looking for today?",
    sender: "ai",
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsAITyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[420px] max-h-[90vh] flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-brand-600" />
            <span className="text-brand-600 font-bold">styli</span>
          </SheetTitle>
          <SheetDescription className="text-inherit">
            Your personal style BFF, powered by AI.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 h-[450px] sm:h-[60vh] px-6 pb-4">
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {/* AI AVATAR */}
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 bg-white border border-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-brand-600" />
                    </div>
                  )}
                  {/* AI message and User message styling */}
                  <div className={`max-w-[280px] p-3 rounded-lg ${message.sender === "user" ? "bg-brand-600 text-white" : "bg-brand-200 text-brand-700"}`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {/* User AVATAR */}
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {/* If AI is typing, show the animated typing bubble */}
              {isAITyping && <AITypingBubble />}
            </div>
          </ScrollArea>
          <div className="border-t pt-4 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about products, prices, recommendations..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <span className="sr-only">Send</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-xs text-gray-500 hover:text-brand-600"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              Close Chat
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatRoom;
