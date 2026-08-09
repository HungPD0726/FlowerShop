"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Scales, Trash, ArrowRight, Star, ShoppingBag } from "@phosphor-icons/react";
import { useCompareStore } from "@/stores/useCompareStore";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { formatCurrency } from "@/utils/format";

export default function ComparePage() {
  const { items, remove, clear } = useCompareStore();
  const { setCart, setIsOpen } = useCartStore();
  const { addToast } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-line/50 pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                <Scales size={15} />
                So sánh sản phẩm
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                So Sánh Bó Hoa
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                So sánh chi tiết tối đa 3 mẫu hoa về mức giá, kích thước, loài hoa và số sao đánh giá.
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-full border border-danger/30 px-4 py-2 text-xs font-bold text-danger hover:bg-danger/5 transition-colors"
              >
                <Trash size={14} /> Xóa tất cả so sánh
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table / Grid */}
      <section className="page-shell pb-16 sm:pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-line/60 bg-surface py-16 text-center shadow-card">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft">
              <Scales size={28} className="text-accent" />
            </div>
            <h3 className="mt-5 font-serif text-xl font-bold text-ink">Chưa chọn sản phẩm so sánh</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Thêm tối đa 3 mẫu hoa từ danh sách sản phẩm để so sánh thông số chi tiết.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95"
            >
              Khám phá sản phẩm <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="w-1/4 p-4 text-xs font-bold uppercase tracking-wider text-muted border-b border-line">Thông số</th>
                  {items.map((p) => (
                    <th key={p.id} className="w-1/4 p-4 border-b border-line">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-danger/10 text-danger hover:bg-danger hover:text-white transition-colors"
                          title="Xóa khỏi so sánh"
                        >
                          <Trash size={13} />
                        </button>
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream border border-line/50 mb-3">
                          <Image src={p.mainImageUrl || "/images/campaign/hero-blush.png"} alt={p.name} fill className="object-cover" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-ink line-clamp-1">{p.name}</h4>
                        <p className="mt-1 text-sm font-bold text-accent tabular-nums">{formatCurrency(p.salePrice ?? p.basePrice)}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-xs">
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Danh mục</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-ink">{p.category?.name || "Hoa tươi"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Loại hoa chủ đạo</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-ink">{p.flowerType || "Hoa phối cao cấp"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Màu sắc chính</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-ink">{p.mainColor || "Cam Hồng"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Đánh giá khách hàng</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className="flex items-center gap-1 font-bold text-ink">
                        <Star weight="fill" className="text-amber-500" size={14} />
                        {p.averageRating?.toFixed(1) || "5.0"} ({p.reviewCount || 12} đánh giá)
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Độ bền tươi dự kiến</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-emerald-700">5 - 7 ngày tươi đẹp</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-muted bg-cream/40">Thao tác Mua</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white shadow-soft hover:bg-accent-hover"
                      >
                        <ShoppingBag size={14} /> Đặt mẫu này
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
