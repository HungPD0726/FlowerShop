"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ArrowUp } from "@phosphor-icons/react";

export function FloatingSupportWidget() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const hiddenOnEditorialPage = pathname.startsWith("/flower-meanings");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (hiddenOnEditorialPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="grid h-11 w-11 place-items-center rounded-full border border-line/80 bg-surface/96 text-ink shadow-float backdrop-blur-md transition-all hover:bg-accent hover:text-white active:scale-95"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          <ArrowUp size={18} weight="bold" />
        </button>
      )}

      {/* Zalo & Hotline Floating Buttons */}
      <a
        href="tel:0901234567"
        className="flex items-center gap-2.5 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-white shadow-float transition-transform hover:scale-105 active:scale-95"
        title="Gọi điện tư vấn 24/7"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-white/20 animate-pulse">
          <Phone size={16} weight="fill" />
        </div>
        <span className="hidden sm:inline">Hotline: 090 123 4567</span>
      </a>
    </div>
  );
}
