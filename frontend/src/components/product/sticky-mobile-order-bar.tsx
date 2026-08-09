"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Lightning } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format";

interface StickyMobileOrderBarProps {
  productName: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  onAddToCart: () => void;
  adding?: boolean;
}

export function StickyMobileOrderBar({
  productName,
  price,
  imageUrl,
  inStock,
  onAddToCart,
  adding = false,
}: StickyMobileOrderBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 250px
      if (window.scrollY > 250) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-line/80 bg-surface/96 p-3 shadow-float backdrop-blur-md lg:hidden transition-transform duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-cream border border-line/50">
            <Image
              src={imageUrl || "/images/campaign/hero-blush.png"}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-xs font-bold text-ink">{productName}</h4>
            <p className="text-sm font-bold text-accent tabular-nums">{formatCurrency(price)}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!inStock || adding}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-5 text-xs font-bold text-white shadow-soft transition-all hover:bg-accent-hover active:scale-[0.98] disabled:opacity-60"
        >
          <ShoppingBag size={16} className={adding ? "animate-pulse" : ""} />
          <span>{inStock ? "Đặt hoa ngay" : "Hết hàng"}</span>
        </button>
      </div>
    </div>
  );
}
