
import { Sparkles, MessageCircle } from "lucide-react";

const AITypingBubble = () => (
  <div className="flex gap-3 justify-start items-end mb-2 animate-fade-in">
    <div className="w-8 h-8 bg-white border border-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
      <MessageCircle className="h-5 w-5 text-brand-600" />
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

export default AITypingBubble;
