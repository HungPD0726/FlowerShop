"use client";

import { Star, CheckCircle } from "@phosphor-icons/react";

interface ProductRatingBreakdownProps {
  rating?: number;
  reviewCount?: number;
}

export function ProductRatingBreakdown({ rating = 4.9, reviewCount = 28 }: ProductRatingBreakdownProps) {
  const breakdown = [
    { stars: 5, percentage: 85, count: 24 },
    { stars: 4, percentage: 10, count: 3 },
    { stars: 3, percentage: 5, count: 1 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <div className="rounded-[24px] border border-line/80 bg-surface p-6 shadow-card space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line/50 pb-5">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="font-serif text-4xl font-bold text-ink">{rating.toFixed(1)}</span>
            <div className="flex items-center justify-center gap-0.5 text-amber-500 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} weight="fill" size={16} />
              ))}
            </div>
            <span className="text-[11px] text-muted font-bold block mt-1">{reviewCount} đánh giá từ khách mua</span>
          </div>

          <div className="flex-1 space-y-1.5 min-w-[200px]">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-2 text-xs">
                <span className="w-6 font-bold text-muted text-right">{b.stars}★</span>
                <div className="h-2 flex-1 rounded-full bg-cream overflow-hidden border border-line/40">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${b.percentage}%` }} />
                </div>
                <span className="w-8 text-[11px] font-semibold text-muted">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 space-y-1">
          <span className="flex items-center gap-1.5 font-bold text-emerald-900">
            <CheckCircle size={16} weight="fill" className="text-emerald-600" />
            100% Đánh Giá Đã Mua Hàng Thực Tế
          </span>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            Chỉ những khách hàng đã nhận hoa thành công mới có thể gửi nhận xét & chấm điểm.
          </p>
        </div>
      </div>
    </div>
  );
}
