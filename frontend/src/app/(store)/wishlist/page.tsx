"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ArrowRight, Trash } from "@phosphor-icons/react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { productService } from "@/services/product.service";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { items: wishlistIds, clear } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fetchProducts = async () => {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        /* Fetch all products and filter by wishlist IDs.
           In a real app you'd have a batch endpoint. */
        const response = await productService.getProducts({ page: 0, size: 100 });
        const allProducts = response.data?.content || response.data || [];
        const filtered = (allProducts as Product[]).filter((p) =>
          wishlistIds.includes(p.id)
        );
        setProducts(filtered);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [wishlistIds, mounted]);

  if (!mounted) {
    return (
      <main className="min-h-screen">
        <div className="page-shell py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="overflow-hidden rounded-[22px] border border-line/40 bg-surface p-2">
                <div className="aspect-[4/5] rounded-[18px] bg-cream relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/3 rounded-full bg-cream" />
                  <div className="h-4 w-3/4 rounded-full bg-cream" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-line/40 pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                <Heart weight="fill" size={13} />
                Danh sách yêu thích
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                Hoa Yêu Thích
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Lưu lại những mẫu hoa bạn muốn đặt sau. Tất cả đều ở ngay đây.
              </p>
            </div>

            {wishlistIds.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-line/60 bg-surface px-5 py-3 shadow-card">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Đã lưu</p>
                  <p className="mt-0.5 font-serif text-2xl font-bold text-accent">
                    {wishlistIds.length} <span className="text-sm font-medium text-muted">sản phẩm</span>
                  </p>
                </div>
                <button
                  onClick={clear}
                  className="flex items-center gap-1.5 rounded-full border border-danger/20 px-4 py-2 text-xs font-bold text-danger hover:bg-danger/5 transition-colors"
                >
                  <Trash size={14} /> Xóa hết
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="page-shell pb-16 sm:pb-24">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="overflow-hidden rounded-[22px] border border-line/40 bg-surface p-2">
                <div className="aspect-[4/5] rounded-[18px] bg-cream relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/3 rounded-full bg-cream" />
                  <div className="h-4 w-3/4 rounded-full bg-cream" />
                </div>
              </div>
            ))}
          </div>
        ) : wishlistIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[22px] border border-line/60 bg-surface py-16 text-center shadow-card">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft">
              <Heart size={28} className="text-accent" />
            </div>
            <h3 className="mt-5 font-serif text-xl font-bold text-ink">Danh sách đang trống</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Nhấn biểu tượng trái tim trên các sản phẩm bạn yêu thích để lưu lại và tìm xem nhanh hơn.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-accent-hover hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Khám phá sản phẩm <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* If products couldn't be fetched but IDs exist */}
            {products.length === 0 && wishlistIds.length > 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-sm text-muted">Có {wishlistIds.length} sản phẩm yêu thích, nhưng không thể tải dữ liệu sản phẩm lúc này.</p>
                <Link href="/products" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-hover">
                  Xem tất cả sản phẩm <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
