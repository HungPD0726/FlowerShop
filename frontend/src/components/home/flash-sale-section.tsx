"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightning, ArrowRight, Timer, Fire } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format";

interface FlashSaleItem {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  originalPrice: number;
  salePrice: number;
  totalQuantity: number;
  soldQuantity: number;
}

/* ── mock data ── */
const MOCK_END_TIME = new Date(Date.now() + 6 * 60 * 60 * 1000 + 23 * 60 * 1000 + 45 * 1000);

const MOCK_ITEMS: FlashSaleItem[] = [
  { id: 1, name: "Bó Hồng Pastel Phấn", slug: "bo-hong-pastel-phan", imageUrl: "/images/campaign/hero-blush.png", originalPrice: 850000, salePrice: 599000, totalQuantity: 30, soldQuantity: 22 },
  { id: 2, name: "Lẵng Hoa Mẫu Đơn Trắng", slug: "lang-hoa-mau-don-trang", imageUrl: "/images/campaign/hero-blush.png", originalPrice: 1200000, salePrice: 890000, totalQuantity: 20, soldQuantity: 14 },
  { id: 3, name: "Bó Hoa Hướng Dương", slug: "bo-hoa-huong-duong", imageUrl: "/images/campaign/hero-blush.png", originalPrice: 680000, salePrice: 450000, totalQuantity: 40, soldQuantity: 35 },
  { id: 4, name: "Giỏ Hoa Cẩm Chướng Hồng", slug: "gio-hoa-cam-chuong-hong", imageUrl: "/images/campaign/hero-blush.png", originalPrice: 750000, salePrice: 520000, totalQuantity: 25, soldQuantity: 8 },
];

function useCountdown(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calc = () => Math.max(endTime.getTime() - Date.now(), 0);
    setTimeLeft(calc());
    const id = setInterval(() => {
      const next = calc();
      setTimeLeft(next);
      if (next === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    hours: pad(Math.floor(timeLeft / 3_600_000)),
    minutes: pad(Math.floor((timeLeft / 60_000) % 60)),
    seconds: pad(Math.floor((timeLeft / 1000) % 60)),
    expired: timeLeft === 0,
  };
}

export function FlashSaleSection() {
  const { hours, minutes, seconds, expired } = useCountdown(MOCK_END_TIME);
  const items = MOCK_ITEMS;

  if (expired || !items.length) return null;

  const timeUnits = [
    { value: hours, label: "Giờ" },
    { value: minutes, label: "Phút" },
    { value: seconds, label: "Giây" },
  ];

  return (
    <section className="section-space page-shell">
      {/* ── heading ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            <Lightning weight="fill" size={14} />
            Ưu đãi giờ vàng
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Hoa Tươi Giá Sốc
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Số lượng có hạn — khi đồng hồ dừng, đợt giá tốt này sẽ khép lại.
          </p>
        </div>

        {/* countdown */}
        <div className="flex items-center gap-2" aria-label="Thời gian còn lại">
          {timeUnits.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center rounded-2xl border border-line/80 bg-surface px-4 py-2.5 shadow-card">
                <strong className="font-serif text-2xl font-bold tabular-nums text-accent sm:text-3xl">
                  {unit.value}
                </strong>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {unit.label}
                </span>
              </div>
              {i < 2 && <span className="text-xl font-bold text-accent/50">:</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── product grid ── */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const percentSold = Math.min(Math.round((item.soldQuantity / Math.max(item.totalQuantity, 1)) * 100), 100);
          const discount = Math.round(((item.originalPrice - item.salePrice) / item.originalPrice) * 100);
          const soldOut = item.soldQuantity >= item.totalQuantity;

          return (
            <article key={item.id} className="group overflow-hidden rounded-[22px] border border-line/60 bg-surface shadow-card transition-shadow duration-500 hover:shadow-float">
              {/* image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-soft">
                  <Fire weight="fill" size={13} /> -{discount}%
                </span>
              </div>

              {/* content */}
              <div className="p-4 sm:p-5">
                <h3 className="line-clamp-1 font-serif text-lg font-semibold text-ink">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2 tabular-nums">
                  <strong className="text-lg font-bold text-accent">{formatCurrency(item.salePrice)}</strong>
                  <span className="text-xs text-muted line-through">{formatCurrency(item.originalPrice)}</span>
                </div>

                {/* progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
                    <span>{soldOut ? "Đã bán hết" : `Đã bán ${item.soldQuantity}`}</span>
                    <span className="tabular-nums">{percentSold}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-accent-soft" aria-hidden="true">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                </div>

                {/* action */}
                {soldOut ? (
                  <span className="mt-4 block text-center text-xs font-bold text-muted">Tạm hết hàng</span>
                ) : (
                  <Link
                    href={`/products/${item.slug}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-soft transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    Xem ưu đãi <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
