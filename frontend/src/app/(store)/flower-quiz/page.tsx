"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle, Check, ArrowRight, ArrowLeft, ShoppingBag, ArrowCounterClockwise } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";

interface RecommendedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  flowerType: string;
  reason: string;
}

const RECIPIENTS = [
  { id: "partner", label: "Người yêu / Vợ", icon: "❤️" },
  { id: "mother", label: "Mẹ / Phụ nữ lớn tuổi", icon: "💐" },
  { id: "boss", label: "Sếp / Đối tác", icon: "💼" },
  { id: "friend", label: "Bạn bè / Đồng nghiệp", icon: "✨" },
];

const OCCASIONS = [
  { id: "birthday", label: "Sinh nhật rạng rỡ" },
  { id: "anniversary", label: "Kỷ niệm ngày yêu / Ngày cưới" },
  { id: "opening", label: "Khai trương phát tài" },
  { id: "gratitude", label: "Cảm ơn & Tri ân" },
];

const BUDGETS = [
  { id: "under500", label: "Dưới 500.000₫" },
  { id: "500to1000", label: "500.000₫ - 1.000.000₫" },
  { id: "above1000", label: "Trên 1.000.000₫" },
];

const MOCK_RECOMMENDATIONS: Record<string, RecommendedProduct[]> = {
  partner: [
    { id: 1, name: "Bó Hồng Pastel Phấn", slug: "bo-hong-pastel-phan", price: 599000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Hồng Ohara", reason: "Mang vẻ đẹp dịu dàng, thể hiện tình yêu nồng nàn & tinh tế." },
    { id: 5, name: "Bó Hồng Đỏ Classic Valentine", slug: "bo-hong-do-classic-valentine", price: 1250000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Hồng Ecuador", reason: "Bắt mắt, biểu tượng lãng mạn kinh điển cho tình yêu lứa đôi." },
    { id: 7, name: "Lẵng Hoa Tulip Hà Lan Cam Hồng", slug: "lang-hoa-tulip-ha-lan-cam-hong", price: 1100000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Tulip", reason: "Nét đẹp Châu Âu kiều diễm vô cùng ngọt ngào." },
  ],
  mother: [
    { id: 2, name: "Lẵng Hoa Mẫu Đơn Trắng", slug: "lang-hoa-mau-don-trang", price: 890000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Mẫu Đơn", reason: "Biểu tượng quý phái, thể hiện sự kính trọng & yêu thương sâu sắc." },
    { id: 4, name: "Giỏ Hoa Cẩm Chướng Hồng", slug: "gio-hoa-cam-chuong-hong", price: 520000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Cẩm Chướng", reason: "Loài hoa truyền thống biểu trưng cho lòng biết ơn dành cho Mẹ." },
  ],
  boss: [
    { id: 6, name: "Kệ Hoa Khai Trương Phát Lộc", slug: "ke-hoa-khai-truong-phat-loc", price: 1850000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Lan Hồ Điệp & Hồng Vàng", reason: "Thiết kế hoành tráng mang lại may mắn, phát tài phát lộc." },
    { id: 2, name: "Lẵng Hoa Mẫu Đơn Trắng", slug: "lang-hoa-mau-don-trang", price: 890000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Mẫu Đơn", reason: "Thanh lịch, trang trọng dành tặng sếp hoặc đối tác lớn." },
  ],
  friend: [
    { id: 3, name: "Bó Hoa Hướng Dương Nắng Mới", slug: "bo-hoa-huong-duong-nang-moi", price: 450000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Hướng Dương", reason: "Ngập tràn năng lượng tích cực, lời chúc niềm vui & thành công." },
    { id: 8, name: "Bó Hoa Baby Trắng Tinh Khôi", slug: "bo-hoa-baby-trang-tinh-khoi", price: 399000, imageUrl: "/images/campaign/hero-blush.png", flowerType: "Hoa Baby", reason: "Bồng bềnh nhẹ nhàng, phù hợp cho bạn bè lưu giữ kỷ niệm." },
  ],
};

export default function FlowerQuizPage() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState(RECIPIENTS[0].id);
  const [occasion, setOccasion] = useState(OCCASIONS[0].id);
  const [budget, setBudget] = useState(BUDGETS[1].id);

  const { setIsOpen } = useCartStore();
  const { addToast } = useUIStore();

  const results = MOCK_RECOMMENDATIONS[recipient] || MOCK_RECOMMENDATIONS.partner;

  const handleAddToCart = (product: RecommendedProduct) => {
    addToast("success", `Đã thêm ${product.name} vào giỏ hàng!`);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <Sparkle weight="fill" size={14} />
              Trợ lý thông minh
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Trợ Lý Gợi Ý Hoa Theo Ý Muốn
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Trả lời 3 câu hỏi nhanh dưới đây để hệ thống tự động tìm cho bạn mẫu hoa tươi hoàn hảo nhất trong 30 giây.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-shell pb-16 sm:pb-24">
        {step < 4 ? (
          <div className="mx-auto max-w-2xl rounded-[24px] border border-line/80 bg-surface p-6 shadow-card sm:p-8 space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-muted">
              <span>Bước {step} trên 3</span>
              <span className="text-accent">{Math.round((step / 3) * 100)}% Hoàn thành</span>
            </div>
            <div className="h-2 rounded-full bg-accent-soft overflow-hidden">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            {/* Step 1: Recipient */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink">Câu 1: Bạn muốn tặng hoa cho ai?</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {RECIPIENTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRecipient(item.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                        recipient === item.id
                          ? "border-accent bg-accent-soft/40 font-bold text-ink shadow-sm"
                          : "border-line/60 bg-canvas text-ink hover:border-accent/40"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-semibold">{item.label}</span>
                      {recipient === item.id && <Check className="ml-auto h-5 w-5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Occasion */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink">Câu 2: Nhân dịp lễ/sự kiện gì?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {OCCASIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOccasion(item.id)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                        occasion === item.id
                          ? "border-accent bg-accent-soft/40 font-bold text-ink shadow-sm"
                          : "border-line/60 bg-canvas text-ink hover:border-accent/40"
                      }`}
                    >
                      <span className="text-sm font-semibold">{item.label}</span>
                      {occasion === item.id && <Check className="h-5 w-5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink">Câu 3: Ngân sách dự kiến của bạn?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {BUDGETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBudget(item.id)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                        budget === item.id
                          ? "border-accent bg-accent-soft/40 font-bold text-ink shadow-sm"
                          : "border-line/60 bg-canvas text-ink hover:border-accent/40"
                      }`}
                    >
                      <span className="text-sm font-semibold">{item.label}</span>
                      {budget === item.id && <Check className="h-5 w-5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nav Buttons */}
            <div className="flex items-center justify-between border-t border-line/50 pt-5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(s - 1, 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold text-ink hover:bg-cream disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Quay lại
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
                >
                  Tiếp tục <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
                >
                  Xem kết quả gợi ý <Sparkle size={16} weight="fill" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Step 4: Results Showcase */
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/50 pb-6">
              <div>
                <span className="eyebrow">Kết quả dành riêng cho bạn</span>
                <h2 className="font-serif text-3xl font-bold text-ink">Top Mẫu Hoa Phù Hợp Nhất</h2>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold text-ink hover:bg-cream"
              >
                <ArrowCounterClockwise size={14} /> Trắc nghiệm lại
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {results.map((product) => (
                <article key={product.id} className="flex flex-col rounded-[24px] border border-line/60 bg-surface p-5 shadow-card transition-shadow hover:shadow-float">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream border border-line/40">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="mt-4 flex-1 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{product.flowerType}</span>
                    <h3 className="font-serif text-lg font-bold text-ink">{product.name}</h3>
                    <p className="text-xs text-muted leading-relaxed bg-accent-soft/30 p-3 rounded-xl border border-accent/15">
                      💡 {product.reason}
                    </p>
                    <p className="text-base font-bold text-accent tabular-nums pt-1">{formatCurrency(product.price)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="mt-5 flex items-center justify-center gap-2 w-full rounded-full bg-accent py-2.5 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
                  >
                    <ShoppingBag size={15} /> Thêm Vào Giỏ Ngay
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
