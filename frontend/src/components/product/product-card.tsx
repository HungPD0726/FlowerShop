"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Star, Heart, Scales } from "@phosphor-icons/react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { cartService } from "@/services/cart.service";
import { useUIStore } from "@/stores/useUIStore";
import { cn } from "@/utils/format";

export function ProductCard({ product, density = "editorial", priority = false }: { product: Product; density?: "editorial" | "compact"; priority?: boolean }) {
  const [adding, setAdding] = useState(false);
  const { setCart, setIsOpen } = useCartStore();
  const { addToast } = useUIStore();
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const wishlistHas = useWishlistStore((s) => s.has);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(wishlistHas(product.id));
  }, [wishlistHas, product.id]);

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

  const compareAdd = useCompareStore((s) => s.add);
  const compareHas = useCompareStore((s) => s.has);
  const isCompared = compareHas(product.id);

  const toggleFav = () => {
    wishlistToggle(product.id);
    setIsFav(!isFav);
  };

  const handleCompare = () => {
    if (isCompared) {
      addToast("info", `${product.name} đã có trong danh sách so sánh.`);
    } else {
      const added = compareAdd(product);
      if (added) {
        addToast("success", `Đã thêm ${product.name} vào danh sách so sánh!`);
      } else {
        addToast("error", "Đã đạt tối đa 3 sản phẩm so sánh.");
      }
    }
  };

  return (
    <article className="group min-w-0">
      <div className={cn("relative overflow-hidden rounded-[20px] bg-surface-muted", density === "compact" ? "aspect-square" : "aspect-[4/5]")}>
        <Link href={`/products/${product.slug}`} aria-label={`Xem ${product.name}`} className="absolute inset-0">
          <Image src={product.mainImageUrl || "/images/campaign/hero-blush.png"} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.035]" />
        </Link>
        {/* Compare button */}
        <button
          onClick={handleCompare}
          aria-label={`So sánh ${product.name}`}
          className={cn(
            "absolute top-3 left-3 grid min-h-10 min-w-10 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5",
            isCompared
              ? "border-accent/40 bg-accent text-white shadow-soft"
              : "border-white/60 bg-surface/92 text-ink shadow-card hover:bg-accent-soft hover:text-accent"
          )}
          title="So sánh bó hoa này"
        >
          <Scales size={17} />
        </button>
        {/* Wishlist heart toggle */}
        <button
          onClick={toggleFav}
          aria-label={isFav ? `Bỏ ${product.name} khỏi yêu thích` : `Thêm ${product.name} vào yêu thích`}
          className={cn(
            "absolute top-3 right-3 grid min-h-10 min-w-10 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5",
            isFav
              ? "border-accent/40 bg-accent text-white shadow-soft"
              : "border-white/60 bg-surface/92 text-ink shadow-card hover:bg-accent-soft hover:text-accent"
          )}
        >
          <Heart size={17} weight={isFav ? "fill" : "regular"} />
        </button>
        {/* Quick add to cart */}
        <button onClick={quickAdd} disabled={!inStock || adding} aria-label={inStock ? `Thêm nhanh ${product.name}` : `${product.name} đã hết hàng`} className="absolute bottom-3 right-3 grid min-h-11 min-w-11 place-items-center rounded-full border border-white/60 bg-surface/92 text-ink shadow-float backdrop-blur-sm transition-[transform,background-color,color] duration-300 hover:-translate-y-1 hover:bg-accent hover:text-surface disabled:cursor-not-allowed disabled:opacity-60">
          <ShoppingBag className={adding ? "animate-pulse" : ""} />
        </button>
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span>{product.category?.name || "Hoa tươi"}</span>
          {product.reviewCount > 0 && <span className="flex items-center gap-1 tabular-nums"><Star weight="fill" className="text-accent" />{product.averageRating.toFixed(1)} ({product.reviewCount})</span>}
        </div>
        <Link href={`/products/${product.slug}`} className={cn("mt-1 block font-serif font-semibold leading-tight text-ink transition-colors duration-300 hover:text-accent", density === "compact" ? "text-lg" : "text-xl sm:text-2xl")}>{product.name}</Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2 tabular-nums">
          <span className="text-sm font-bold text-accent">{formatCurrency(price)}</span>
          {discounted && <span className="text-xs text-muted line-through">{formatCurrency(product.basePrice)}</span>}
          {!inStock && <span className="rounded-md border border-danger/20 bg-danger/10 px-2 py-1 text-[10px] font-bold text-danger">Hết hàng</span>}
        </div>
      </div>
    </article>
  );
}
