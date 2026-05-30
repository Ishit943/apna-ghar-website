import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      {/* Tooltip - Hide on mobile for cleaner UX */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 sm:mb-3 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg hidden sm:block animate-in fade-in duration-200">
          Chat With Us
          <div className="absolute -bottom-1 right-3 w-2 h-2 bg-primary transform rotate-45" />
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/917014930206"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-accent to-gold text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 fill-current" />
      </a>
    </div>
  );
}
