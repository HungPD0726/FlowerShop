"use client";

import { useState } from "react";
import { Heart, Sparkle, Check, X, PencilSimple } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CardTemplate {
  id: string;
  category: string;
  name: string;
  bgClass: string;
  textColorClass: string;
  borderClass: string;
  sampleMessage: string;
}

const TEMPLATES: CardTemplate[] = [
  {
    id: "birthday",
    category: "Sinh nhật",
    name: "Hồng Nắng Sinh Nhật",
    bgClass: "bg-gradient-to-br from-[#fde8e3] to-[#fbc7b8]",
    textColorClass: "text-[#873212]",
    borderClass: "border-[#f2a477]",
    sampleMessage: "Chúc em một ngày sinh nhật ngập tràn niềm vui, nụ cười và rạng rỡ như những đóa hoa tươi!",
  },
  {
    id: "romance",
    category: "Tình yêu",
    name: "Yêu Thương Nồng Thắm",
    bgClass: "bg-gradient-to-br from-[#fceebe] to-[#f8d0be]",
    textColorClass: "text-[#612d00]",
    borderClass: "border-[#d86a3b]",
    sampleMessage: "Gửi tặng em cả bầu trời yêu thương. Cảm ơn em đã đến và làm cuộc sống anh luôn đong đầy hạnh phúc.",
  },
  {
    id: "gratitude",
    category: "Cảm ơn",
    name: "Tri Ân Chân Thành",
    bgClass: "bg-gradient-to-br from-[#f4e8dc] to-[#e7d9cd]",
    textColorClass: "text-[#49372f]",
    borderClass: "border-[#9b7b6b]",
    sampleMessage: "Xin chân thành cảm ơn Anh/Chị vì sự đồng hành, hỗ trợ và những tình cảm quý báu dành cho chúng tôi.",
  },
  {
    id: "opening",
    category: "Khai trương",
    name: "Hồng Phát Tài Lộc",
    bgClass: "bg-gradient-to-br from-[#fef0e7] to-[#fcd9c7]",
    textColorClass: "text-[#873212]",
    borderClass: "border-[#d65c27]",
    sampleMessage: "Chúc công ty/cửa hàng Khai trương hồng phát, làm ăn phát tài phát lộc, vạn sự như ý!",
  },
];

interface GreetingCardModalProps {
  onSaveMessage?: (message: string, sender: string, isAnonymous: boolean) => void;
  triggerButton?: React.ReactNode;
}

export function GreetingCardModal({ onSaveMessage, triggerButton }: GreetingCardModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(TEMPLATES[0]);
  const [message, setMessage] = useState(TEMPLATES[0].sampleMessage);
  const [senderName, setSenderName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSelectTemplate = (t: CardTemplate) => {
    setSelectedTemplate(t);
    setMessage(t.sampleMessage);
  };

  const handleSave = () => {
    if (onSaveMessage) {
      onSaveMessage(message, senderName, isAnonymous);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <PencilSimple size={15} />
            <span>Thiết kế thiệp miễn phí</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent title="Thiết kế thiệp mừng miễn phí" description="Tùy chỉnh mẫu thiệp và lời chúc gửi kèm bó hoa." className="max-w-xl">
        <div className="space-y-5">
          {/* Card Template Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Chọn mẫu thiệp</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTemplate(t)}
                  className={`rounded-xl border p-2.5 text-center text-xs transition-all ${
                    selectedTemplate.id === t.id
                      ? "border-accent bg-accent-soft text-accent font-bold shadow-sm"
                      : "border-line bg-surface text-ink hover:border-accent/40"
                  }`}
                >
                  <span className="block text-[10px] text-muted">{t.category}</span>
                  <span className="truncate block font-serif font-bold mt-0.5">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Card Preview */}
          <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-card transition-all ${selectedTemplate.bgClass} ${selectedTemplate.borderClass}`}>
            <div className="flex items-center justify-between text-xs font-bold opacity-80 mb-3">
              <span className="uppercase tracking-widest">{selectedTemplate.category}</span>
              <Sparkle weight="fill" size={16} />
            </div>
            <p className={`font-serif text-base leading-relaxed italic ${selectedTemplate.textColorClass}`}>
              &ldquo;{message || "Nhập lời chúc thiệp ở ô bên dưới..."}&rdquo;
            </p>
            <div className={`mt-4 border-t border-black/10 pt-3 text-right text-xs font-bold ${selectedTemplate.textColorClass}`}>
              {isAnonymous ? "Người gửi giấu tên" : senderName ? `Từ: ${senderName}` : "Chạm Hoa"}
            </div>
          </div>

          {/* Message Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Lời chúc của bạn</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-line bg-canvas p-3 text-xs text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Tên người gửi</label>
                <input
                  type="text"
                  value={senderName}
                  disabled={isAnonymous}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="VD: Anh Minh..."
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-accent disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="cardAnonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
                />
                <label htmlFor="cardAnonymous" className="text-xs font-bold text-ink cursor-pointer">
                  Giấu tên người gửi (Ẩn danh)
                </label>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-full bg-accent py-3 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95 transition-all"
          >
            Lưu Thiệp Mừng Vào Đơn Hàng
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
