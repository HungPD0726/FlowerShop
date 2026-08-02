"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "@phosphor-icons/react";
import { orderService } from "@/services/order.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency, formatDate } from "@/utils/format";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AccountOrdersPage() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();
  const query = useQuery({ queryKey: queryKeys.orders(page), queryFn: () => orderService.getMyOrders(page, 6) });
  const result = query.data?.data;

  async function cancel(orderCode: string) {
    try {
      await orderService.cancelOrder(orderCode, "Khách hàng yêu cầu hủy");
      await queryClient.invalidateQueries({ queryKey: queryKeys.orders(page) });
      addToast("success", "Yêu cầu hủy đơn đã được ghi nhận.");
    } catch { addToast("error", "Chưa thể hủy đơn hàng."); }
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <p className="eyebrow">Theo dõi từng bó hoa</p><h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Đơn hàng của bạn.</h2>
      {query.isLoading ? <div className="mt-8 space-y-4"><Skeleton className="h-48" /><Skeleton className="h-48" /></div> : query.isError ? <div className="mt-8"><ErrorState onRetry={() => query.refetch()} /></div> : !result?.content.length ? <div className="mt-8"><EmptyState title="Bạn chưa có đơn hàng" description="Những đơn hoa đã đặt sẽ được lưu tại đây." action={<Button asChild><Link href="/products">Chọn hoa</Link></Button>} /></div> : (
        <div className="mt-8 space-y-4">
          {result.content.map((order) => (
            <article key={order.id} className="rounded-2xl border border-line bg-canvas p-5">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4"><div><Link href={`/account/orders/${order.orderCode}`} className="font-mono text-sm font-bold text-accent hover:underline">{order.orderCode}</Link><p className="mt-1 text-xs text-muted">Đặt ngày {formatDate(order.createdAt)}</p></div><StatusBadge status={order.orderStatus} /></header>
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {order.items.slice(0, 4).map((item) => <div key={item.id} className="relative h-16 w-[3.25rem] shrink-0 overflow-hidden rounded-lg bg-surface">{item.imageUrl && <Image src={item.imageUrl} alt={item.productName} fill sizes="52px" className="object-cover" />}</div>)}
                <div className="min-w-0 pl-2"><p className="line-clamp-2 text-sm font-bold text-ink">{order.items.map((item) => item.productName).join(", ")}</p><p className="mt-2 text-xs text-muted">Giao {order.deliveryDate}, {order.deliveryTimeSlot}</p></div>
              </div>
              <footer className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4"><p className="font-serif text-xl font-semibold text-ink">{formatCurrency(order.totalAmount)}</p><div className="flex items-center gap-2">{order.orderStatus === "PENDING" && <ConfirmDialog trigger={<Button variant="ghost" size="sm" className="text-danger">Hủy đơn</Button>} title="Hủy đơn hàng?" description="Cửa hàng sẽ dừng xử lý đơn nếu yêu cầu hủy được chấp nhận." confirmLabel="Hủy đơn" destructive onConfirm={() => cancel(order.orderCode)} />}<Button asChild variant="outline" size="sm" className="gap-2"><Link href={`/account/orders/${order.orderCode}`}>Chi tiết <ArrowRight /></Link></Button></div></footer>
            </article>
          ))}
          {result.totalPages > 1 && <div className="flex items-center justify-between pt-4"><Button variant="outline" disabled={result.first} onClick={() => setPage((value) => value - 1)}>Trang trước</Button><span className="text-xs text-muted">Trang {result.page + 1} / {result.totalPages}</span><Button variant="outline" disabled={result.last} onClick={() => setPage((value) => value + 1)}>Trang sau</Button></div>}
        </div>
      )}
    </section>
  );
}
