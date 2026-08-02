"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "@phosphor-icons/react";
import { productService } from "@/services/product.service";
import { cartService } from "@/services/cart.service";
import { ProductVariant } from "@/types";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ErrorState, Skeleton } from "@/components/ui/feedback-state";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { queryKeys } from "@/lib/query-keys";

const DELIVERY_SLOTS = [
  { value: "08:00 - 12:00", label: "08:00 - 12:00, buổi sáng" },
  { value: "13:00 - 17:00", label: "13:00 - 17:00, buổi chiều" },
  { value: "18:00 - 21:00", label: "18:00 - 21:00, buổi tối" },
];

export default function ProductDetailPage() {
  const slug = useParams<{ slug: string }>().slug;
  const { setCart, setIsOpen } = useCartStore();
  const { addToast } = useUIStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(DELIVERY_SLOTS[0].value);
  const [cardMessage, setCardMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const productQuery = useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug),
  });
  const product = productQuery.data?.data;

  const relatedQuery = useQuery({
    queryKey: product ? queryKeys.relatedProducts(product.id) : ["products", "related"],
    queryFn: () => productService.getRelatedProducts(product!.id),
    enabled: Boolean(product?.id),
  });
  const reviewsQuery = useQuery({
    queryKey: product ? queryKeys.productReviews(product.id) : ["products", "reviews"],
    queryFn: () => productService.getProductReviews(product!.id, 0, 6),
    enabled: Boolean(product?.id),
  });

  useEffect(() => {
    if (!product) return;
    const firstAvailable = product.variants?.find((variant) => variant.isActive && variant.stockQuantity > 0);
    setSelectedVariant(firstAvailable || product.variants?.[0] || null);
    setSelectedImage(0);
  }, [product]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const images = [
      ...(product.mainImageUrl ? [{ id: 0, imageUrl: product.mainImageUrl, altText: product.name }] : []),
      ...(product.images || []).filter((image) => image.imageUrl !== product.mainImageUrl),
    ];
    return images;
  }, [product]);

  const currentPrice = selectedVariant
    ? selectedVariant.salePrice || selectedVariant.price
    : product?.salePrice || product?.basePrice || 0;
  const originalPrice = selectedVariant?.salePrice ? selectedVariant.price : product?.salePrice ? product.basePrice : null;
  const availableStock = selectedVariant ? selectedVariant.stockQuantity : product?.variants?.length ? 0 : 99;
  const isOutOfStock = availableStock <= 0;
  const minDate = new Date().toLocaleDateString("en-CA");

  async function handleAddToCart() {
    if (!product) return;
    if (!deliveryDate) {
      addToast("error", "Vui lòng chọn ngày giao hoa.");
      return;
    }
    setIsAdding(true);
    try {
      const response = await cartService.addToCart({
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
        deliveryDate,
        deliveryTimeSlot,
        cardMessage: cardMessage.trim() || undefined,
      });
      if (!response.success) throw new Error(response.message);
      setCart(response.data);
      setIsOpen(true);
      addToast("success", `Đã thêm ${quantity} sản phẩm vào giỏ.`);
    } catch {
      addToast("error", "Chưa thể thêm vào giỏ. Vui lòng thử lại.");
    } finally {
      setIsAdding(false);
    }
  }

  if (productQuery.isLoading) return <ProductDetailSkeleton />;
  if (productQuery.isError || !product) {
    return <div className="page-shell py-16"><ErrorState title="Không tìm thấy sản phẩm" description="Sản phẩm có thể đã ngừng bán hoặc đường dẫn chưa đúng." onRetry={() => productQuery.refetch()} /></div>;
  }

  const activeImage = gallery[selectedImage];
  const related = relatedQuery.data?.data || [];
  const reviews = reviewsQuery.data?.data?.content || [];

  return (
    <div className="pb-28 lg:pb-0">
      <div className="page-shell py-6 sm:py-10">
        <nav aria-label="Đường dẫn" className="mb-7 flex items-center gap-2 overflow-hidden text-xs text-muted">
          <Link href="/" className="shrink-0 hover:text-ink">Trang chủ</Link>
          <CaretRight aria-hidden="true" />
          <Link href="/products" className="shrink-0 hover:text-ink">Cửa hàng</Link>
          <CaretRight aria-hidden="true" />
          <span className="truncate text-ink" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-16">
          <section aria-label="Ảnh sản phẩm" className="min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted sm:aspect-[5/6]">
              {activeImage ? (
                <Image src={activeImage.imageUrl} alt={activeImage.altText || product.name} fill priority sizes="(max-width: 1024px) 100vw, 57vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted">Chưa có ảnh sản phẩm</div>
              )}
              {gallery.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button type="button" aria-label="Ảnh trước" className="grid min-h-11 min-w-11 place-items-center rounded-full bg-surface/90 text-ink shadow-soft backdrop-blur" onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}><CaretLeft /></button>
                  <button type="button" aria-label="Ảnh tiếp theo" className="grid min-h-11 min-w-11 place-items-center rounded-full bg-surface/90 text-ink shadow-soft backdrop-blur" onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}><CaretRight /></button>
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2" role="list" aria-label="Chọn ảnh sản phẩm">
                {gallery.map((image, index) => (
                  <button key={`${image.id}-${image.imageUrl}`} type="button" aria-label={`Xem ảnh ${index + 1}`} aria-current={selectedImage === index ? "true" : undefined} onClick={() => setSelectedImage(index)} className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-[10px] border-2 transition-opacity ${selectedImage === index ? "border-accent" : "border-transparent opacity-65 hover:opacity-100"}`}>
                    <Image src={image.imageUrl} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">{product.category?.name || "Hoa tươi"}</p>
            <h1 className="mt-3 font-serif text-5xl font-medium leading-[0.92] tracking-[-0.045em] text-ink sm:text-6xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
              <span>SKU {product.sku}</span>
              {product.reviewCount > 0 && (
                <a href="#reviews" className="flex items-center gap-1.5 hover:text-ink"><Star weight="fill" className="text-warning" /> {product.averageRating.toFixed(1)} · {product.reviewCount} đánh giá</a>
              )}
            </div>
            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-ink">{formatCurrency(currentPrice)}</span>
              {originalPrice && <span className="text-sm text-muted line-through">{formatCurrency(originalPrice)}</span>}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">{product.shortDescription || product.description || "Thiết kế hoa được hoàn thiện thủ công theo từng đơn."}</p>

            {product.variants?.length > 0 && (
              <fieldset className="mt-7">
                <legend className="text-sm font-bold text-ink">Chọn phiên bản</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {product.variants.filter((variant) => variant.isActive).map((variant) => {
                    const disabled = variant.stockQuantity <= 0;
                    return (
                      <button key={variant.id} type="button" disabled={disabled} aria-pressed={selectedVariant?.id === variant.id} onClick={() => { setSelectedVariant(variant); setQuantity(1); }} className={`min-h-14 rounded-[10px] border px-3 py-2 text-left text-xs transition-colors ${selectedVariant?.id === variant.id ? "border-accent bg-accent-soft text-ink" : "border-line bg-surface text-muted hover:border-ink/30"} disabled:cursor-not-allowed disabled:opacity-45`}>
                        <span className="block font-bold">{variant.name}</span>
                        <span className="mt-1 block">{disabled ? "Hết hàng" : formatCurrency(variant.salePrice || variant.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div className="mt-7 rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-ink"><CalendarBlank className="text-accent" /> Thời gian và lời nhắn</div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Input label="Ngày giao hoa" type="date" min={minDate} value={deliveryDate} required onChange={(event) => setDeliveryDate(event.target.value)} />
                <Select label="Khung giờ" value={deliveryTimeSlot} onChange={(event) => setDeliveryTimeSlot(event.target.value)}>{DELIVERY_SLOTS.map((slot) => <option key={slot.value} value={slot.value}>{slot.label}</option>)}</Select>
              </div>
              <Textarea label="Lời nhắn trên thiệp" helperText="Không bắt buộc, tối đa 300 ký tự." rows={3} maxLength={300} className="mt-4" value={cardMessage} onChange={(event) => setCardMessage(event.target.value)} placeholder="Viết lời nhắn của bạn" />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex min-h-11 items-center rounded-full border border-line bg-surface" aria-label="Số lượng">
                <button type="button" className="grid min-h-11 min-w-11 place-items-center" aria-label="Giảm số lượng" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button>
                <output className="min-w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</output>
                <button type="button" className="grid min-h-11 min-w-11 place-items-center" aria-label="Tăng số lượng" disabled={quantity >= availableStock} onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}><Plus /></button>
              </div>
              <Button className="hidden flex-1 gap-2 lg:flex" size="lg" disabled={isOutOfStock || isAdding} isLoading={isAdding} onClick={handleAddToCart}><ShoppingBag /> {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}</Button>
            </div>
            <div className="mt-6 grid gap-3 border-t border-line pt-5 text-xs text-muted sm:grid-cols-2">
              <span className="flex items-center gap-2"><CheckCircle className="text-accent" /> Xác nhận ảnh trước khi giao</span>
              <span className="flex items-center gap-2"><CheckCircle className="text-accent" /> Thiệp viết tay miễn phí</span>
            </div>
          </section>
        </div>

        <section id="reviews" className="section-space border-t border-line">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow">Đánh giá thật</p>
              <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Từ người đã đặt hoa.</h2>
              {product.reviewCount > 0 && <p className="mt-4 text-sm text-muted">{product.averageRating.toFixed(1)} trên 5 từ {product.reviewCount} đánh giá.</p>}
            </div>
            {reviewsQuery.isLoading ? <div className="grid gap-4 sm:grid-cols-2"><Skeleton className="h-40" /><Skeleton className="h-40" /></div> : reviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((review) => (
                  <article key={review.id} className="rounded-2xl border border-line bg-surface p-6">
                    <div className="flex gap-1 text-warning" aria-label={`${review.rating} trên 5 sao`}>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} weight={index < review.rating ? "fill" : "regular"} />)}</div>
                    <p className="mt-5 text-sm leading-6 text-ink">{review.comment || "Khách hàng đã đánh giá sản phẩm."}</p>
                    <p className="mt-5 text-xs font-bold text-muted">{review.userName}</p>
                  </article>
                ))}
              </div>
            ) : <p className="rounded-2xl border border-line bg-surface p-8 text-sm text-muted">Sản phẩm chưa có đánh giá.</p>}
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-line py-12 sm:py-16">
            <h2 className="font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Có thể bạn cũng thích.</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">{related.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} density="compact" />)}</div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 p-3 shadow-float backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1"><p className="truncate text-xs text-muted">{product.name}</p><p className="font-serif text-lg font-semibold text-ink">{formatCurrency(currentPrice)}</p></div>
          <Button className="gap-2" disabled={isOutOfStock || isAdding} isLoading={isAdding} onClick={handleAddToCart}><ShoppingBag /> {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}</Button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return <div className="page-shell grid gap-10 py-10 lg:grid-cols-2"><Skeleton className="aspect-[4/5]" /><div className="space-y-5 pt-8"><Skeleton className="h-4 w-24" /><Skeleton className="h-28 w-full" /><Skeleton className="h-10 w-40" /><Skeleton className="h-28 w-full" /><Skeleton className="h-64 w-full" /></div></div>;
}
