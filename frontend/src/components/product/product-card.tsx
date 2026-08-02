"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Star } from "@phosphor-icons/react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/stores/useCartStore";
import { cartService } from "@/services/cart.service";
import { useUIStore } from "@/stores/useUIStore";
import { cn } from "@/utils/format";

export function ProductCard({ product, density = "editorial", priority = false }: { product: Product; density?: "editorial" | "compact"; priority?: boolean }) {
  const [adding, setAdding] = useState(false);
  const { setCart, setIsOpen } = useCartStore();
  const { addToast } = useUIStore();
  const price = product.salePrice ?? product.basePrice;
  const discounted = product.salePrice != null && product.salePrice < product.basePrice;
  const inStock = !product.variants?.length || product.variants.some((variant) => variant.isActive && variant.stockQuantity > 0);

  const quickAdd = async () => {
    if (!inStock || adding) return;
    setAdding(true);
    try {
      const variant = product.variants?.find((item) => item.isActive && item.stockQuantity > 0);
      const response = await cartService.addToCart({ productId: product.id, variantId: variant?.id, quantity: 1 });
      if (response.success) {
        setCart(response.data);
        setIsOpen(true);
        addToast("success", `Đã thêm ${product.name} vào giỏ hàng`);
      }
    } catch {
      addToast("error", "Không thể thêm sản phẩm. Vui lòng thử lại.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group min-w-0">
      <div className={cn("relative overflow-hidden rounded-2xl bg-surface-muted", density === "compact" ? "aspect-square" : "aspect-[4/5]")}>
        <Link href={`/products/${product.slug}`} aria-label={`Xem ${product.name}`} className="absolute inset-0">
          <Image src={product.mainImageUrl || "/images/campaign/hero-editorial.png"} alt={product.name} fill priority={priority} unoptimized={Boolean(product.mainImageUrl)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.035]" />
        </Link>
        <button onClick={quickAdd} disabled={!inStock || adding} aria-label={inStock ? `Thêm nhanh ${product.name}` : `${product.name} đã hết hàng`} className="absolute bottom-3 right-3 grid min-h-11 min-w-11 place-items-center rounded-full bg-surface text-ink shadow-float transition-[transform,background-color,color] duration-500 hover:-translate-y-1 hover:bg-accent hover:text-surface disabled:cursor-not-allowed disabled:opacity-60">
          <ShoppingBag className={adding ? "animate-pulse" : ""} />
        </button>
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span>{product.category?.name || "Hoa tươi"}</span>
          {product.reviewCount > 0 && <span className="flex items-center gap-1 tabular-nums"><Star weight="fill" className="text-accent" />{product.averageRating.toFixed(1)} ({product.reviewCount})</span>}
        </div>
        <Link href={`/products/${product.slug}`} className="mt-1 block font-serif text-xl font-semibold leading-tight text-ink transition-colors duration-300 hover:text-accent">{product.name}</Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2 tabular-nums">
          <span className="text-sm font-bold text-accent">{formatCurrency(price)}</span>
          {discounted && <span className="text-xs text-muted line-through">{formatCurrency(product.basePrice)}</span>}
          {!inStock && <span className="rounded-md bg-danger/10 px-2 py-1 text-[10px] font-bold text-danger">Hết hàng</span>}
        </div>
      </div>
    </article>
  );
}
