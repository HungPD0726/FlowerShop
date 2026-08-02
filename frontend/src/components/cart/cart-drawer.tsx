"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, Trash, X } from "@phosphor-icons/react";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { cartService } from "@/services/cart.service";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/feedback-state";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, setCart } = useCartStore();
  const addToast = useUIStore((state) => state.addToast);
  const [pendingItem, setPendingItem] = useState<number | null>(null);

  useEffect(() => {
    if (cart) return;
    cartService.getCart().then((response) => response.success && setCart(response.data)).catch(() => undefined);
  }, [cart, setCart]);

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1 || pendingItem) return;
    setPendingItem(itemId);
    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      if (response.success) setCart(response.data);
    } catch {
      addToast("error", "Không thể cập nhật số lượng. Vui lòng thử lại.");
    } finally {
      setPendingItem(null);
    }
  };

  const removeItem = async (itemId: number) => {
    if (pendingItem) return;
    setPendingItem(itemId);
    try {
      const response = await cartService.removeCartItem(itemId);
      if (response.success) setCart(response.data);
    } catch {
      addToast("error", "Không thể xóa sản phẩm. Vui lòng thử lại.");
    } finally {
      setPendingItem(null);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[40] bg-ink/40 backdrop-blur-sm data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[50] flex w-full max-w-md flex-col border-l border-line bg-surface shadow-float transition-transform duration-500 ease-editorial data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 motion-reduce:transition-none">
          <div className="flex h-20 items-center justify-between border-b border-line px-5 sm:px-6">
            <div>
              <Dialog.Title className="font-serif text-2xl font-semibold text-ink">Giỏ hàng</Dialog.Title>
              <Dialog.Description className="text-xs text-muted">{cart?.totalItems || 0} sản phẩm đã chọn</Dialog.Description>
            </div>
            <Dialog.Close aria-label="Đóng giỏ hàng" className="grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-surface-muted hover:text-ink"><X /></Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            {!cart?.items.length ? (
              <EmptyState title="Giỏ hàng đang trống" description="Chọn một bó hoa phù hợp để bắt đầu đơn hàng." action={<Dialog.Close asChild><Button asChild variant="outline"><Link href="/products">Chọn hoa</Link></Button></Dialog.Close>} className="border-0 shadow-none" />
            ) : (
              <div className="grid gap-5">
                {cart.items.map((item) => (
                  <article key={item.id} className={`grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line pb-5 ${pendingItem === item.id ? "opacity-60" : ""}`}>
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-muted">
                      <Image src={item.mainImageUrl || "/images/campaign/hero-editorial.png"} alt={item.productName} fill unoptimized={Boolean(item.mainImageUrl)} sizes="88px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/products/${item.productSlug}`} onClick={() => setIsOpen(false)} className="font-serif text-lg font-semibold leading-tight text-ink hover:text-accent">{item.productName}</Link>
                      {item.variantName && <p className="mt-1 text-xs text-muted">Kích thước: {item.variantName}</p>}
                      <p className="mt-2 text-sm font-bold text-accent tabular-nums">{formatCurrency(item.totalPrice)}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-line bg-canvas p-1">
                          <button aria-label="Giảm số lượng" disabled={pendingItem === item.id || item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid min-h-9 min-w-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink disabled:opacity-40"><Minus size={15} /></button>
                          <span className="min-w-8 text-center text-xs font-bold tabular-nums">{item.quantity}</span>
                          <button aria-label="Tăng số lượng" disabled={pendingItem === item.id} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid min-h-9 min-w-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"><Plus size={15} /></button>
                        </div>
                        <button aria-label={`Xóa ${item.productName}`} disabled={pendingItem === item.id} onClick={() => removeItem(item.id)} className="grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-danger/10 hover:text-danger"><Trash /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {Boolean(cart?.items.length) && (
            <div className="border-t border-line bg-canvas px-5 py-5 sm:px-6">
              <div className="flex items-baseline justify-between"><span className="text-sm text-muted">Tạm tính</span><strong className="font-serif text-2xl text-ink tabular-nums">{formatCurrency(cart!.subtotal)}</strong></div>
              <p className="mt-1 text-xs leading-5 text-muted">Phí giao hàng và mã giảm giá được xác nhận tại bước thanh toán.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Dialog.Close asChild><Button asChild variant="outline" className="w-full"><Link href="/cart">Xem giỏ</Link></Button></Dialog.Close>
                <Dialog.Close asChild><Button asChild className="w-full"><Link href="/checkout">Thanh toán</Link></Button></Dialog.Close>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
