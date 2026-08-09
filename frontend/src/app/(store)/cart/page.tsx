"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Minus, Plus, ShieldCheck, Trash } from "@phosphor-icons/react";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { cartService } from "@/services/cart.service";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

const SHIPPING_FEE = 30000;

export default function CartPage() {
  const { cart, setCart } = useCartStore();
  const { addToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [pendingItem, setPendingItem] = useState<number | null>(null);
  const [itemError, setItemError] = useState<number | null>(null);

  const loadCart = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const response = await cartService.getCart();
      if (!response.success) throw new Error(response.message);
      setCart(response.data);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setCart]);

  useEffect(() => { void loadCart(); }, [loadCart]);

  async function updateQuantity(itemId: number, quantity: number) {
    if (quantity < 1) return;
    setPendingItem(itemId);
    setItemError(null);
    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      if (!response.success) throw new Error(response.message);
      setCart(response.data);
    } catch {
      setItemError(itemId);
      addToast("error", "Chưa thể cập nhật số lượng.");
    } finally {
      setPendingItem(null);
    }
  }

  async function removeItem(itemId: number) {
    setPendingItem(itemId);
    setItemError(null);
    try {
      const response = await cartService.removeCartItem(itemId);
      if (!response.success) throw new Error(response.message);
      setCart(response.data);
    } catch {
      setItemError(itemId);
      addToast("error", "Chưa thể xóa sản phẩm.");
    } finally {
      setPendingItem(null);
    }
  }

  if (isLoading) return <div className="page-shell py-12"><Skeleton className="h-14 w-72" /><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]"><Skeleton className="h-[30rem]" /><Skeleton className="h-80" /></div></div>;
  if (loadError) return <div className="page-shell py-16"><ErrorState onRetry={loadCart} /></div>;
  if (!cart || cart.items.length === 0) {
    return <div className="page-shell py-16 sm:py-24"><EmptyState title="Giỏ hàng đang trống" description="Chọn một thiết kế hoa và thời gian giao phù hợp để bắt đầu đơn hàng." action={<Button asChild><Link href="/products">Khám phá cửa hàng</Link></Button>} /></div>;
  }

  const total = cart.subtotal + SHIPPING_FEE;

  return (
    <div className="page-shell py-10 sm:py-14">
      <p className="eyebrow">Đơn hoa của bạn</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-[-0.045em] text-ink sm:text-6xl">Giỏ hàng.</h1>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-label="Sản phẩm trong giỏ" className="overflow-hidden rounded-[20px] border border-line bg-surface">
          <div className="divide-y divide-line">
            {cart.items.map((item) => {
              const pending = pendingItem === item.id;
              return (
                <article key={item.id} className={`relative grid grid-cols-[6rem_1fr] gap-4 p-4 transition-opacity sm:grid-cols-[7rem_1fr_auto] sm:gap-6 sm:p-6 ${pending ? "opacity-55" : ""}`} aria-busy={pending}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-muted">
                    {item.mainImageUrl ? <Image src={item.mainImageUrl} alt={item.productName} fill sizes="112px" className="object-cover" /> : null}
                  </div>
                  <div className="min-w-0 py-1">
                    <Link href={`/products/${item.productSlug}`} className="font-serif text-xl font-semibold leading-tight text-ink hover:text-accent">{item.productName}</Link>
                    {item.variantName && <p className="mt-2 text-xs text-muted">Phiên bản: {item.variantName}</p>}
                    {item.deliveryDate && <p className="mt-1 text-xs text-muted">Giao {item.deliveryDate}{item.deliveryTimeSlot ? `, ${item.deliveryTimeSlot}` : ""}</p>}
                    {item.cardMessage && <p className="mt-3 line-clamp-2 text-xs italic leading-5 text-muted">“{item.cardMessage}”</p>}
                    <p className="mt-4 text-sm font-bold text-ink sm:hidden">{formatCurrency(item.totalPrice)}</p>
                    {itemError === item.id && <p className="mt-2 text-xs font-semibold text-danger" role="alert">Cập nhật chưa thành công.</p>}
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end">
                    <p className="hidden text-sm font-bold text-ink sm:block">{formatCurrency(item.totalPrice)}</p>
                    <div className="flex min-h-11 items-center rounded-full border border-line">
                      <button type="button" className="grid min-h-11 min-w-11 place-items-center" aria-label={`Giảm số lượng ${item.productName}`} disabled={pending || item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus /></button>
                      <output className="min-w-7 text-center text-sm font-bold" aria-live="polite">{item.quantity}</output>
                      <button type="button" className="grid min-h-11 min-w-11 place-items-center" aria-label={`Tăng số lượng ${item.productName}`} disabled={pending || item.quantity >= item.stockQuantity} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus /></button>
                    </div>
                    <button type="button" className="inline-flex min-h-11 items-center gap-2 px-2 text-xs font-bold text-danger hover:underline" disabled={pending} onClick={() => removeItem(item.id)}><Trash /> Xóa</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="rounded-[20px] border border-line bg-surface p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl font-semibold text-ink">Tóm tắt đơn hàng</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted">Tạm tính</dt><dd className="font-semibold text-ink">{formatCurrency(cart.subtotal)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted">Phí giao hàng</dt><dd className="font-semibold text-ink">{formatCurrency(SHIPPING_FEE)}</dd></div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5"><dt className="font-bold text-ink">Tổng cộng</dt><dd className="font-serif text-2xl font-semibold text-ink">{formatCurrency(total)}</dd></div>
          </dl>
          <Button asChild size="lg" className="mt-7 w-full gap-2"><Link href="/checkout">Tiếp tục thanh toán <ArrowRight /></Link></Button>
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted"><ShieldCheck className="mt-0.5 shrink-0 text-accent" /> Thông tin đơn hàng được gửi qua kết nối bảo mật.</p>
        </aside>
      </div>
    </div>
  );
}
