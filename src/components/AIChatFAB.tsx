
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
      <AIChatRoom isOpen={open} setIsOpen={setOpen} />
    </>
  );
};

export default AIChatFAB;
