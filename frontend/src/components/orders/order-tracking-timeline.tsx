"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Truck, Camera, Handshake, Check } from "@phosphor-icons/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface OrderTrackingTimelineProps {
  currentStage?: number; // 1 to 5
  photoUrl?: string;
  orderCode: string;
}

const STAGES = [
  { stage: 1, title: "Đã nhận đơn", desc: "Shop đã tiếp nhận đơn hàng" },
  { stage: 2, title: "Đang chọn hoa", desc: "Tuyển chọn hoa tươi trong ngày" },
  { stage: 3, title: "Đang cắm hoa", desc: "Florist đang hoàn thiện mẫu hoa" },
  { stage: 4, title: "Đang giao hàng", desc: "Shipper đang trên đường giao" },
  { stage: 5, title: "Đã giao thành công", desc: "Người nhận đã nhận hoa tươi" },
];

export function OrderTrackingTimeline({
  currentStage = 3,
  photoUrl = "/images/campaign/hero-blush.png",
  orderCode,
}: OrderTrackingTimelineProps) {
  const [photoOpen, setPhotoOpen] = useState(false);
  const [approved, setApproved] = useState(false);

  return (
    <div className="rounded-[24px] border border-line/80 bg-surface p-6 shadow-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line/50 pb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Theo dõi thời gian thực</span>
          <h3 className="font-serif text-xl font-bold text-ink">Tiến Trình Đơn Hàng #{orderCode}</h3>
        </div>

        {/* Photo Approval Notification Banner */}
        {currentStage >= 3 && (
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-xs font-bold text-accent transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Camera className="h-4 w-4" />
            <span>{approved ? "✓ Đã duyệt ảnh hoa" : "Xem ảnh hoa thực tế mới cắm"}</span>
          </button>
        )}
      </div>

      {/* Timeline Steps */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-5 relative">
        {STAGES.map((s) => {
          const isDone = s.stage < currentStage;
          const isCurrent = s.stage === currentStage;

          return (
            <div key={s.stage} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-500 ${
                  isDone
                    ? "bg-accent text-white shadow-soft"
                    : isCurrent
                    ? "bg-accent text-white ring-4 ring-accent/20 animate-pulse"
                    : "bg-cream text-muted"
                }`}
              >
                {isDone ? (
                  <Check className="h-5 w-5 stroke-[3]" />
                ) : s.stage === 1 ? (
                  <Clock className="h-5 w-5" />
                ) : s.stage === 3 ? (
                  <Camera className="h-5 w-5" />
                ) : s.stage === 4 ? (
                  <Truck className="h-5 w-5" />
                ) : (
                  <Handshake className="h-5 w-5" />
                )}
              </div>

              <h4 className={`mt-3 font-serif text-sm font-bold ${isCurrent || isDone ? "text-ink" : "text-muted"}`}>
                {s.title}
              </h4>
              <p className="mt-1 text-[11px] text-muted leading-tight">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Photo Preview & Approval Modal */}
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogContent title="Ảnh bó hoa cắm thực tế" description="Ảnh chụp bởi Florist trước khi bàn giao cho Shipper giao hoa." className="max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream border border-line">
            <Image src={photoUrl} alt="Ảnh hoa thực tế" fill className="object-cover" />
          </div>
          <div className="mt-4 space-y-3 text-center">
            <p className="text-xs text-muted">
              Đây là hình ảnh bó hoa thực tế của bạn vừa được hoàn thiện tại cửa hàng.
            </p>
            {approved ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800">
                ✓ Bạn đã xác nhận hài lòng với mẫu hoa này!
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setApproved(true);
                  setPhotoOpen(false);
                }}
                className="w-full rounded-full bg-accent py-3 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
              >
                Xác nhận duyệt đẹp & Cho phép giao hàng
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
