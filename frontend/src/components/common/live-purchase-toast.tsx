"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, X } from "@phosphor-icons/react";

interface PurchaseEvent {
  customerName: string;
  location: string;
  productName: string;
  timeAgo: string;
  imageUrl: string;
}

const SAMPLE_PURCHASES: PurchaseEvent[] = [
  { customerName: "Chị Ngọc Anh", location: "Quận 1, TP.HCM", productName: "Bó Hồng Pastel Phấn", timeAgo: "3 phút trước", imageUrl: "/images/campaign/hero-blush.png" },
  { customerName: "Anh Minh Tuấn", location: "Cầu Giấy, Hà Nội", productName: "Lẵng Hoa Mẫu Đơn Trắng", timeAgo: "7 phút trước", imageUrl: "/images/campaign/hero-blush.png" },
  { customerName: "Chị Thu Hà", location: "Quận 3, TP.HCM", productName: "Bó Hoa Hướng Dương Nắng Mới", timeAgo: "12 phút trước", imageUrl: "/images/campaign/hero-blush.png" },
  { customerName: "Anh Đức Huy", location: "Hoàn Kiếm, Hà Nội", productName: "Bó Hồng Đỏ Classic Valentine", timeAgo: "15 phút trước", imageUrl: "/images/campaign/hero-blush.png" },
];

export function LivePurchaseToast() {
  const pathname = usePathname();
  const [currentToast, setCurrentToast] = useState<PurchaseEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hiddenOnEditorialPage = pathname.startsWith("/flower-meanings");

  useEffect(() => {
    if (dismissed || hiddenOnEditorialPage) return;

    let index = 0;
    const interval = setInterval(() => {
      setCurrentToast(SAMPLE_PURCHASES[index % SAMPLE_PURCHASES.length]);
      setVisible(true);
      index++;

      // Hide toast after 6 seconds
      setTimeout(() => {
        setVisible(false);
      }, 6000);
    }, 25000); // Trigger every 25 seconds

    // Initial show after 4s
    const timer = setTimeout(() => {
      setCurrentToast(SAMPLE_PURCHASES[0]);
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [dismissed, hiddenOnEditorialPage]);

  if (hiddenOnEditorialPage || !visible || !currentToast || dismissed) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm rounded-2xl border border-line/80 bg-surface/96 p-3.5 shadow-float backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-cream border border-line/50">
          <Image src={currentToast.imageUrl} alt={currentToast.productName} fill sizes="48px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
            <ShoppingBag size={13} />
            <span>Đừa có người đặt hoa</span>
          </div>
          <h4 className="truncate text-xs font-bold text-ink">{currentToast.productName}</h4>
          <p className="text-[10px] text-muted truncate">
            {currentToast.customerName} ({currentToast.location}) · {currentToast.timeAgo}
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-muted hover:text-ink p-1"
          aria-label="Đóng thông báo"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
