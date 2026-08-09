"use client";

import { useState } from "react";
import { Tag, Check, Ticket } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format";

interface Coupon {
  code: string;
  title: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: "FLOWERS10", title: "Giảm 10% đơn từ 500k", type: "PERCENTAGE", value: 10 },
  { code: "WELCOME50K", title: "Giảm 50.000₫ cho đơn hàng mới", type: "FIXED", value: 50000 },
  { code: "FREESHIP", title: "Miễn phí vận chuyển 30.000₫", type: "FIXED", value: 30000 },
];

interface CouponCodeWidgetProps {
  onApplyCoupon?: (discountAmount: number, code: string) => void;
  subtotal: number;
}

export function CouponCodeWidget({ onApplyCoupon, subtotal }: CouponCodeWidgetProps) {
  const [inputCode, setInputCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleApply = (couponToApply?: Coupon) => {
    const coupon = couponToApply || AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === inputCode.trim().toUpperCase());
    if (!coupon) {
      setErrorMsg("Mã ưu đãi không hợp lệ!");
      return;
    }

    let discount = 0;
    if (coupon.type === "PERCENTAGE") {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discount = coupon.value;
    }

    setAppliedCoupon(coupon);
    setErrorMsg("");
    if (onApplyCoupon) {
      onApplyCoupon(discount, coupon.code);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setInputCode("");
    if (onApplyCoupon) {
      onApplyCoupon(0, "");
    }
  };

  return (
    <div className="rounded-2xl border border-line/60 bg-cream/40 p-3.5 space-y-3 text-xs">
      <div className="flex items-center justify-between font-bold text-ink">
        <span className="flex items-center gap-1.5 text-accent">
          <Ticket size={16} /> Mã ưu đãi & Voucher
        </span>
        {appliedCoupon && (
          <button type="button" onClick={handleRemove} className="text-danger hover:underline text-[11px]">
            Hủy dùng
          </button>
        )}
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-emerald-800">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <div>
              <span className="font-bold block">{appliedCoupon.code}</span>
              <span className="text-[10px] text-emerald-700">{appliedCoupon.title}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Nhập mã FLOWERS10..."
              className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-xs uppercase outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => handleApply()}
              className="rounded-xl bg-accent px-4 py-2 font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
            >
              Áp dụng
            </button>
          </div>
          {errorMsg && <p className="text-[11px] text-danger font-semibold">{errorMsg}</p>}

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {AVAILABLE_COUPONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setInputCode(c.code);
                  handleApply(c);
                }}
                className="rounded-lg border border-accent/20 bg-surface px-2.5 py-1 text-[10px] font-bold text-accent hover:bg-accent-soft"
              >
                + {c.code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
