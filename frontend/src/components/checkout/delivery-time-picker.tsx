"use client";

import { useState } from "react";
import { Clock, Calendar, Lightning, Check } from "@phosphor-icons/react";

interface DeliveryTimePickerProps {
  onSelect?: (date: string, timeSlot: string) => void;
}

const TIME_SLOTS = [
  { id: "08:00 - 10:00", label: "08:00 - 10:00 (Buổi Sáng)", rush: true },
  { id: "11:00 - 13:00", label: "11:00 - 13:00 (Buổi Trưa)", rush: true },
  { id: "14:00 - 17:00", label: "14:00 - 17:00 (Buổi Chiều)", rush: false },
  { id: "18:00 - 20:00", label: "18:00 - 20:00 (Buổi Tối)", rush: false },
];

export function DeliveryTimePicker({ onSelect }: DeliveryTimePickerProps) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0].id);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlot(slotId);
    if (onSelect) {
      onSelect(selectedDate, slotId);
    }
  };

  return (
    <div className="rounded-2xl border border-line/60 bg-surface p-5 space-y-4 shadow-card">
      <div className="flex items-center justify-between border-b border-line/50 pb-3">
        <h4 className="font-serif text-base font-bold text-ink flex items-center gap-2">
          <Clock className="text-accent" size={18} /> Chọn Ngày & Khung Giờ Giao Hoa
        </h4>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-[10px] font-bold text-accent">
          <Lightning weight="fill" size={12} /> Cam kết đúng giờ
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1">
            <Calendar size={14} /> Ngày nhận hoa
          </label>
          <input
            type="date"
            min={todayStr}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-xs text-ink outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Khung giờ hỏa tốc
          </label>
          <div className="space-y-1.5">
            {TIME_SLOTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSlot(s.id)}
                className={`w-full flex items-center justify-between rounded-xl border p-2.5 text-xs transition-all ${
                  selectedSlot === s.id
                    ? "border-accent bg-accent-soft text-accent font-bold shadow-sm"
                    : "border-line bg-canvas text-ink hover:border-accent/40"
                }`}
              >
                <span>{s.label}</span>
                {selectedSlot === s.id && <Check size={14} weight="bold" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
