"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CaretLeft, MapPin } from "@phosphor-icons/react";
import { orderService } from "@/services/order.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency, formatDate } from "@/utils/format";
import { StatusBadge } from "@/components/ui/status-badge";
import { ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function OrderDetailPage() {
  const code = useParams<{ orderCode: string }>().orderCode;
  const query = useQuery({ queryKey: queryKeys.order(code), queryFn: () => orderService.getOrderByCode(code) });
  if (query.isLoading) return <div className="space-y-4"><Skeleton className="h-20" /><Skeleton className="h-96" /></div>;
  if (query.isError || !query.data?.data) return <ErrorState title="Không tìm thấy đơn hàng" description="Đơn hàng không tồn tại hoặc bạn không có quyền xem." onRetry={() => query.refetch()} />;
  const order = query.data.data;
  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted hover:text-ink"><CaretLeft /> Quay lại đơn hàng</Link>
      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6"><div><p className="font-mono text-sm font-bold text-accent">{order.orderCode}</p><h1 className="mt-2 font-serif text-4xl font-medium text-ink">Chi tiết đơn hoa.</h1><p className="mt-2 text-xs text-muted">Đặt ngày {formatDate(order.createdAt)}</p></div><StatusBadge status={order.orderStatus} /></header>
        <div className="mt-6 space-y-4">{order.items.map((item) => <article key={item.id} className="grid grid-cols-[5rem_1fr] gap-4 rounded-[10px] border border-line bg-canvas p-3 sm:grid-cols-[5rem_1fr_auto]"><div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">{item.imageUrl && <Image src={item.imageUrl} alt={item.productName} fill sizes="80px" className="object-cover" />}</div><div className="py-1"><p className="font-serif text-lg font-semibold text-ink">{item.productName}</p>{item.variantName && <p className="mt-1 text-xs text-muted">{item.variantName}</p>}<p className="mt-2 text-xs text-muted">{item.quantity} × {formatCurrency(item.unitPrice)}</p></div><p className="col-span-2 self-center text-right text-sm font-bold text-ink sm:col-span-1">{formatCurrency(item.totalPrice)}</p></article>)}</div>
        <div className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
          <div><h2 className="flex items-center gap-2 text-sm font-bold text-ink"><MapPin className="text-accent" /> Thông tin giao hoa</h2><p className="mt-4 text-sm font-bold text-ink">{order.recipientName} · {order.recipientPhone}</p><p className="mt-2 text-sm leading-6 text-muted">{order.deliveryAddress}, {order.ward}, {order.district}, {order.province}</p><p className="mt-2 text-sm text-muted">{order.deliveryDate}, {order.deliveryTimeSlot}</p></div>
          <dl className="space-y-3 text-sm"><div className="flex justify-between"><dt className="text-muted">Tạm tính</dt><dd>{formatCurrency(order.subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted">Phí giao hàng</dt><dd>{formatCurrency(order.shippingFee)}</dd></div>{order.discountAmount > 0 && <div className="flex justify-between"><dt className="text-muted">Giảm giá</dt><dd>-{formatCurrency(order.discountAmount)}</dd></div>}<div className="flex items-baseline justify-between border-t border-line pt-4"><dt className="font-bold">Tổng cộng</dt><dd className="font-serif text-2xl font-semibold">{formatCurrency(order.totalAmount)}</dd></div></dl>
        </div>
      </section>
    </div>
  );
}
