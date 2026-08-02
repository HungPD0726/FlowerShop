"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CaretLeft, MapPin } from "@phosphor-icons/react";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency, formatDate } from "@/utils/format";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AdminOrderDetailPage() {
  const id = Number(useParams<{ id: string }>().id);
  const client = useQueryClient();
  const { addToast } = useUIStore();
  const query = useQuery({ queryKey: ["admin", "order", id], queryFn: () => adminService.getAdminOrder(id), enabled: Number.isFinite(id) });
  const [nextStatus, setNextStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  async function updateStatus() { const status = nextStatus || query.data?.data?.orderStatus; if (!status) return; setSaving(true); try { await adminService.updateOrderStatus(id, status, note.trim() || undefined); await client.invalidateQueries({ queryKey: ["admin", "order", id] }); setNote(""); addToast("success", "Trạng thái đơn đã cập nhật."); } catch { addToast("error", "Chưa thể cập nhật đơn hàng."); } finally { setSaving(false); } }
  if (query.isLoading) return <Skeleton className="h-[44rem]" />;
  if (query.isError || !query.data?.data) return <ErrorState title="Không tìm thấy đơn hàng" onRetry={() => query.refetch()} />;
  const order = query.data.data;
  return <div className="space-y-6"><Link href="/admin/orders" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted hover:text-ink"><CaretLeft /> Quay lại</Link><header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="font-mono text-xl font-extrabold text-accent">{order.orderCode}</h1><p className="mt-2 text-sm text-muted">Đặt ngày {formatDate(order.createdAt)}</p></div><StatusBadge status={order.orderStatus} /></header><div className="grid items-start gap-6 xl:grid-cols-[1fr_22rem]"><div className="space-y-6"><section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-base font-extrabold">Sản phẩm</h2><div className="mt-5 divide-y divide-line">{order.items.map((item) => <article key={item.id} className="grid grid-cols-[4rem_1fr] gap-4 py-4 first:pt-0 sm:grid-cols-[4rem_1fr_auto]"><div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-canvas">{item.imageUrl && <Image src={item.imageUrl} alt="" fill sizes="64px" className="object-cover" />}</div><div><p className="text-sm font-bold">{item.productName}</p><p className="mt-1 text-xs text-muted">{item.variantName || item.productSku} · {item.quantity} × {formatCurrency(item.unitPrice)}</p></div><p className="col-span-2 text-right text-sm font-bold sm:col-span-1">{formatCurrency(item.totalPrice)}</p></article>)}</div></section><section className="grid gap-6 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-7"><div><h2 className="flex items-center gap-2 text-base font-extrabold"><MapPin className="text-accent" /> Giao hoa</h2><p className="mt-5 text-sm font-bold">{order.recipientName} · {order.recipientPhone}</p><p className="mt-2 text-sm leading-6 text-muted">{order.deliveryAddress}, {order.ward}, {order.district}, {order.province}</p><p className="mt-2 text-sm text-muted">{order.deliveryDate}, {order.deliveryTimeSlot}</p></div><div><h2 className="text-base font-extrabold">Người đặt</h2><p className="mt-5 text-sm font-bold">{order.customerName}</p><p className="mt-2 text-sm text-muted">{order.customerPhone}</p><p className="mt-1 text-sm text-muted">{order.customerEmail}</p></div></section></div><aside className="rounded-2xl border border-line bg-surface p-5 xl:sticky xl:top-24"><h2 className="text-base font-extrabold">Cập nhật đơn</h2><Select className="mt-5" label="Trạng thái" value={nextStatus || order.orderStatus} onChange={(event) => setNextStatus(event.target.value)}><option value="PENDING">Chờ xác nhận</option><option value="CONFIRMED">Đã xác nhận</option><option value="PREPARING">Đang chuẩn bị</option><option value="DELIVERING">Đang giao</option><option value="COMPLETED">Hoàn tất</option><option value="CANCELLED">Đã hủy</option></Select><Textarea className="mt-4" label="Ghi chú nội bộ" value={note} onChange={(event) => setNote(event.target.value)} /><Button className="mt-5 w-full" isLoading={saving} onClick={updateStatus}>Lưu trạng thái</Button><dl className="mt-7 space-y-3 border-t border-line pt-5 text-sm"><div className="flex justify-between"><dt className="text-muted">Tạm tính</dt><dd>{formatCurrency(order.subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted">Giao hàng</dt><dd>{formatCurrency(order.shippingFee)}</dd></div><div className="flex items-baseline justify-between border-t border-line pt-4"><dt className="font-bold">Tổng</dt><dd className="text-lg font-extrabold">{formatCurrency(order.totalAmount)}</dd></div></dl></aside></div></div>;
}
