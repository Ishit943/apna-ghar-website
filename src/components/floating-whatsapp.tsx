import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg hidden sm:block animate-in fade-in duration-200">
          Chat with us
          <div className="absolute -bottom-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}

      {/* WhatsApp Button - Rounded Square with Message Icon */}
      <a
        href="https://wa.me/917014930206"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-green-500 text-white shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 fill-current" />
      </a>
    </div>
  );
}
