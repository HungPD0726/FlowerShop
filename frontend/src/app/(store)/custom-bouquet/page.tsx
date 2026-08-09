"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Flower, Sparkle, ShoppingBag } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";

interface Option {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const MAIN_FLOWERS: Option[] = [
  { id: "rose-ohara", name: "Hoa Hồng Ohara Phấn", price: 350000, description: "Hồng nhập khẩu thơm dịu, cánh dày ngọt ngào", image: "/images/campaign/hero-blush.png" },
  { id: "peony-white", name: "Hoa Mẫu Đơn Trắng", price: 550000, description: "Mẫu đơn kiêu sa, biểu tượng kiều diễm & quý phái", image: "/images/campaign/hero-blush.png" },
  { id: "tulip-orange", name: "Tulip Hà Lan Cam Hồng", price: 480000, description: "Tulip tươi nét đẹp Châu Âu thanh lịch", image: "/images/campaign/hero-blush.png" },
  { id: "sunflower", name: "Hoa Hướng Dương Nắng Mới", price: 280000, description: "Bông to rực rỡ, ngập tràn năng lượng tích cực", image: "/images/campaign/hero-blush.png" },
];

const COMPANION_FLOWERS: Option[] = [
  { id: "baby-white", name: "Hoa Baby Trắng Phun Sương", price: 120000, description: "Nhẹ nhàng bồng bềnh như đám mây", image: "/images/campaign/hero-blush.png" },
  { id: "carnation-pink", name: "Hoa Cẩm Chướng Hồng", price: 150000, description: "Tôn thêm vẻ đằm thắm & đầm ấm", image: "/images/campaign/hero-blush.png" },
  { id: "eucalyptus", name: "Lá Khuynh Diệp & Lá Bạc", price: 80000, description: "Tạo chiều sâu & hương thơm mộc tự nhiên", image: "/images/campaign/hero-blush.png" },
];

const WRAPPING_STYLES: Option[] = [
  { id: "wrap-blush", name: "Giấy Gói Hồng Pastel & Nơ Voan", price: 60000, description: "Phong cách Hàn Quốc dịu dàng, lãng mạn", image: "/images/campaign/hero-blush.png" },
  { id: "wrap-terracotta", name: "Giấy Gói Cam Đất Terracotta", price: 70000, description: "Phong cách PetShop cổ điển, ấm áp & sang trọng", image: "/images/campaign/hero-blush.png" },
  { id: "wrap-kraft", name: "Giấy Kraft Rustic Nâu Mộc", price: 50000, description: "Phong cách Vintage giản dị, gần gũi tự nhiên", image: "/images/campaign/hero-blush.png" },
];

export default function CustomBouquetBuilderPage() {
  const [step, setStep] = useState(1);
  const [selectedMain, setSelectedMain] = useState<Option>(MAIN_FLOWERS[0]);
  const [selectedCompanion, setSelectedCompanion] = useState<Option>(COMPANION_FLOWERS[0]);
  const [selectedWrap, setSelectedWrap] = useState<Option>(WRAPPING_STYLES[0]);
  const [cardMessage, setCardMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [hideSender, setHideSender] = useState(false);

  const { setIsOpen } = useCartStore();
  const { addToast } = useUIStore();

  const totalPrice = selectedMain.price + selectedCompanion.price + selectedWrap.price;

  const handleAddToCart = () => {
    addToast("success", `Đã thêm bó hoa tự phối (${totalPrice.toLocaleString("vi-VN")}₫) vào giỏ hàng!`);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <Sparkle weight="fill" size={14} />
              Trải nghiệm độc quyền
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Tự Phối Bó Hoa Theo Ý Thích
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Tự tay chọn loài hoa yêu thích, phối màu lá kèn và giấy gói để tạo nên bó hoa độc bản mang đậm dấu ấn cá nhân.
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="mt-8 grid grid-cols-4 gap-2 border-b border-line/60 pb-6 text-center text-xs font-bold sm:gap-4 sm:text-sm">
            {[
              { num: 1, label: "Hoa chính" },
              { num: 2, label: "Hoa phụ & Lá" },
              { num: 3, label: "Giấy gói & Nơ" },
              { num: 4, label: "Thông điệp thiệp" },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 transition-all ${
                  step === s.num
                    ? "bg-accent text-white shadow-soft"
                    : step > s.num
                    ? "bg-accent-soft text-accent"
                    : "bg-surface text-muted hover:bg-cream"
                }`}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs font-extrabold">
                  {step > s.num ? <Check size={12} weight="bold" /> : s.num}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Builder Content */}
      <section className="page-shell pb-16 sm:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Options Selection */}
          <div className="space-y-6">
            {step === 1 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink">Bước 1: Chọn Hoa Chính</h3>
                <p className="mt-1 text-xs text-muted">Loài hoa chủ đạo định hình phong cách chính cho bó hoa.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {MAIN_FLOWERS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMain(item)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                        selectedMain.id === item.id
                          ? "border-accent bg-accent-soft/30 shadow-card"
                          : "border-line/60 bg-surface hover:border-accent/40"
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        {selectedMain.id === item.id && (
                          <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
                            <Check size={14} weight="bold" />
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 font-serif font-bold text-ink">{item.name}</h4>
                      <p className="mt-1 text-xs text-muted">{item.description}</p>
                      <p className="mt-2 text-sm font-bold text-accent">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink">Bước 2: Chọn Hoa Phụ & Lá Đi Kèm</h3>
                <p className="mt-1 text-xs text-muted">Tạo chiều sâu và sự hài hòa rạng rỡ cho bó hoa.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {COMPANION_FLOWERS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCompanion(item)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                        selectedCompanion.id === item.id
                          ? "border-accent bg-accent-soft/30 shadow-card"
                          : "border-line/60 bg-surface hover:border-accent/40"
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        {selectedCompanion.id === item.id && (
                          <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
                            <Check size={14} weight="bold" />
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 font-serif font-bold text-ink">{item.name}</h4>
                      <p className="mt-1 text-xs text-muted line-clamp-2">{item.description}</p>
                      <p className="mt-2 text-sm font-bold text-accent">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink">Bước 3: Chọn Phong Cách Giấy Gói & Nơ</h3>
                <p className="mt-1 text-xs text-muted">Hoàn thiện vẻ đẹp tổng thể theo tông màu bạn thích.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {WRAPPING_STYLES.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedWrap(item)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                        selectedWrap.id === item.id
                          ? "border-accent bg-accent-soft/30 shadow-card"
                          : "border-line/60 bg-surface hover:border-accent/40"
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        {selectedWrap.id === item.id && (
                          <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
                            <Check size={14} weight="bold" />
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 font-serif font-bold text-ink">{item.name}</h4>
                      <p className="mt-1 text-xs text-muted line-clamp-2">{item.description}</p>
                      <p className="mt-2 text-sm font-bold text-accent">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink">Bước 4: Viết Lời Chúc Thiệp</h3>
                <p className="mt-1 text-xs text-muted">Chạm Hoa sẽ in thiệp miễn phí và đính kèm vào bó hoa của bạn.</p>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted">Lời chúc thiệp</label>
                  <textarea
                    rows={4}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Nhập lời nhắn yêu thương (VD: Chúc em sinh nhật ấm áp & hạnh phúc!)..."
                    className="mt-2 w-full rounded-2xl border border-line bg-surface p-4 text-sm text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted">Tên người gửi</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="VD: Anh Minh"
                      className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="hideSender"
                      checked={hideSender}
                      onChange={(e) => setHideSender(e.target.checked)}
                      className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
                    />
                    <label htmlFor="hideSender" className="text-xs font-semibold text-ink cursor-pointer">
                      Giấu tên người gửi (Gửi ẩn danh)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between border-t border-line/60 pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(s - 1, 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-cream disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Quay lại
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(s + 1, 4))}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-white shadow-soft transition-all hover:bg-accent-hover active:scale-[0.98]"
                >
                  Tiếp theo <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-accent-hover active:scale-[0.98]"
                >
                  <ShoppingBag size={18} /> Thêm Bó Hoa Vào Giỏ
                </button>
              )}
            </div>
          </div>

          {/* Live Summary Panel */}
          <div className="h-fit rounded-[24px] border border-line/80 bg-surface p-6 shadow-card">
            <h3 className="font-serif text-xl font-bold text-ink">Bó Hoa Tự Phối Của Bạn</h3>
            <div className="mt-4 space-y-3 border-t border-b border-line/50 py-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Hoa chính:</span>
                <span className="font-bold text-ink">{selectedMain.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Hoa phụ & Lá:</span>
                <span className="font-bold text-ink">{selectedCompanion.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Giấy gói:</span>
                <span className="font-bold text-ink">{selectedWrap.name}</span>
              </div>
              {cardMessage && (
                <div className="border-t border-dashed border-line pt-2">
                  <span className="text-muted block">Lời chúc thiệp:</span>
                  <span className="italic text-ink leading-relaxed">&ldquo;{cardMessage}&rdquo;</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-sm font-bold text-muted">Tổng tạm tính:</span>
              <span className="font-serif text-2xl font-bold text-accent tabular-nums">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              ✓ Miễn phí thiệp thiết kế & in thông điệp.<br />
              ✓ Giao hoa hỏa tốc trong 2 giờ nội thành.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
