"use client";

import { Crown, Sparkle, Gift } from "@phosphor-icons/react";

interface LoyaltyBadgeProps {
  points?: number;
  tierName?: string;
}

export function LoyaltyBadge({ points = 350, tierName = "Thành viên Vàng (Gold)" }: LoyaltyBadgeProps) {
  const nextTierPoints = 500;
  const progressPercent = Math.min(100, Math.round((points / nextTierPoints) * 100));

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-amber-300/60 bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] p-6 shadow-card text-amber-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-500 text-white shadow-soft">
            <Crown size={22} weight="fill" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800">Thẻ Thành Viên VIP</span>
            <h3 className="font-serif text-lg font-bold text-amber-950">{tierName}</h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-500/30">
          <Sparkle size={14} weight="fill" /> Giảm 5% mọi đơn
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-5 space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-amber-900">
          <span>Điểm tích lũy: {points} điểm</span>
          <span>{nextTierPoints - points} điểm đến Kim Cương</span>
        </div>
        <div className="h-2.5 rounded-full bg-amber-200/80 overflow-hidden p-0.5 border border-amber-300">
          <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-amber-300/60 pt-3 text-[11px] font-semibold text-amber-900">
        <span className="flex items-center gap-1">
          <Gift size={15} /> Tích 10 điểm cho mỗi 100.000₫ mua hoa
        </span>
        <span className="font-bold underline">Xem đặc quyền VIP &rarr;</span>
      </div>
    </div>
  );
}
