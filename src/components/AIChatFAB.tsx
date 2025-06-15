
import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatRoom from "./AIChatRoom";

const AIChatFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-40 bottom-6 right-4 sm:bottom-8 sm:right-8 bg-brand-600 text-white shadow-lg rounded-full p-3 flex items-center gap-2 hover:bg-brand-700 animate-fade-in"
        aria-label="Ask Styli (AI Assistant)"
        style={{ boxShadow: "0 2px 16px 0 #0002" }}
      >
        <Bot className="h-6 w-6" />
        <span className="font-semibold hidden sm:block">Ask Styli</span>
      </button>
      {open && (
        <div className="fixed inset-0 flex items-end sm:items-center sm:justify-end z-50 bg-black/30 animate-fade-in">
          <div className="w-full sm:w-[420px] max-h-[90vh]">
            <AIChatRoom />
            <button
              className="block mx-auto mt-2 text-xs text-gray-500 hover:text-brand-600"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              Close Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatFAB;
