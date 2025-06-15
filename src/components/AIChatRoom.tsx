import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, Sparkles, Hanger } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIChatRoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your shopping assistant. I can help you find products, answer questions about our items, and provide recommendations. What are you looking for today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsAITyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1200);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("headphone") || input.includes("audio")) {
      return "I'd recommend our Wireless Noise-Cancelling Headphones for ₹20,699. They offer excellent sound quality and comfort. Would you like to know more about their features?";
    }
    
    if (input.includes("yoga") || input.includes("fitness")) {
      return "For fitness enthusiasts, we have a Premium Yoga Mat for ₹7,399. It's eco-friendly and provides excellent grip. We also have other fitness products. What specific fitness equipment are you looking for?";
    }
    
    if (input.includes("beauty") || input.includes("skincare")) {
      return "Our Hydrating Facial Serum for ₹4,819 is very popular! It's recommended by beauty influencer Sarah Chen. Would you like recommendations for other skincare products?";
    }
    
    if (input.includes("price") || input.includes("budget")) {
      return "I can help you find products within your budget! What's your price range? We have products from ₹2,909 to ₹20,699 across various categories.";
    }
    
    if (input.includes("smart home") || input.includes("home")) {
      return "Check out our Smart Home Assistant for ₹10,719! It can control your lights, music, and answer questions. Perfect for making your home smarter.";
    }
    
    return "That's a great question! I can help you find the perfect product. Could you tell me more about what you're looking for? I can search through our tech, fashion, beauty, fitness, home, and lifestyle categories.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Typing animation component (with sparkle/hanger & animated dots)
  const AITypingBubble = () => (
    <div className="flex gap-3 justify-start items-end mb-2 animate-fade-in">
      <div className="w-8 h-8 bg-white border border-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
        {/* Avatar: minimal neutral with hat (simulate with icons) */}
        <MessageCircle className="h-5 w-5 text-brand-600" />
        {/* Could swap MessageCircle for sparkle/hanger, but using first for avatar */}
      </div>
      <div className="max-w-[280px] px-4 py-2 rounded-lg bg-brand-100 flex items-center gap-2">
        <span className="flex gap-1 items-center">
          <Sparkles className="h-4 w-4 text-brand-600 animate-pulse" />
          <span className="text-white font-medium">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>.</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '.1s' }}>.</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '.2s' }}>.</span>
          </span>
        </span>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-brand-600 font-bold">styli</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-brand-600" />
            <span className="text-brand-600 font-bold">styli</span>
          </SheetTitle>
          <SheetDescription>
            Get personalized product recommendations and shopping assistance
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-120px)] mt-6">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI AVATAR (styled as described) */}
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 bg-white border border-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                      {/* Minimal silhouette/neutral (MessageCircle as neutral face), and could swap to user avatars later */}
                      <MessageCircle className="h-5 w-5 text-brand-600" />
                    </div>
                  )}
                  {/* AI message styling: pink with white text */}
                  <div
                    className={`max-w-[280px] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-brand-600 text-white"
                        : "bg-brand-100 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatRoom;
