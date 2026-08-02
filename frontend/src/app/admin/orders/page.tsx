"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, MagnifyingGlass } from "@phosphor-icons/react";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency, formatDate } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => { const timer = window.setTimeout(() => { setKeyword(search.trim()); setPage(0); }, 350); return () => window.clearTimeout(timer); }, [search]);
  const query = useQuery({ queryKey: queryKeys.adminOrders(keyword, status, page), queryFn: () => adminService.getAdminOrders(keyword, status, page, 10) });
  const result = query.data?.data;
  return <div className="space-y-6"><header><h1 className="text-2xl font-extrabold tracking-[-0.02em]">Đơn hàng</h1><p className="mt-2 text-sm text-muted">Tìm kiếm và theo dõi tiến trình giao hoa.</p></header><div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[1fr_16rem]"><div className="relative"><MagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><Input aria-label="Tìm đơn hàng" className="pl-11" placeholder="Mã đơn, khách hàng hoặc số điện thoại" value={search} onChange={(event) => setSearch(event.target.value)} /></div><Select aria-label="Lọc trạng thái" value={status} onChange={(event) => { setStatus(event.target.value); setPage(0); }}><option value="">Tất cả trạng thái</option><option value="PENDING">Chờ xác nhận</option><option value="CONFIRMED">Đã xác nhận</option><option value="PREPARING">Đang chuẩn bị</option><option value="DELIVERING">Đang giao</option><option value="COMPLETED">Hoàn tất</option><option value="CANCELLED">Đã hủy</option></Select></div>
    {query.isLoading ? <Skeleton className="h-[34rem]" /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : !result?.content.length ? <EmptyState title="Không có đơn hàng phù hợp" description="Thử thay đổi từ khóa hoặc bộ lọc trạng thái." /> : <section className="overflow-hidden rounded-2xl border border-line bg-surface"><div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-xs"><thead className="border-b border-line bg-canvas text-muted"><tr><th className="p-4">Mã đơn</th><th className="p-4">Người đặt</th><th className="p-4">Người nhận</th><th className="p-4">Giao hoa</th><th className="p-4">Tổng</th><th className="p-4">Trạng thái</th><th className="p-4 text-right">Xem</th></tr></thead><tbody className="divide-y divide-line">{result.content.map((order) => <tr key={order.id} className="hover:bg-canvas/60"><td className="p-4"><Link href={`/admin/orders/${order.id}`} className="font-mono font-bold text-accent hover:underline">{order.orderCode}</Link><p className="mt-1 text-[11px] text-muted">{formatDate(order.createdAt)}</p></td><td className="p-4"><p className="font-bold">{order.customerName}</p><p className="mt-1 text-muted">{order.customerPhone}</p></td><td className="p-4"><p className="font-bold">{order.recipientName}</p><p className="mt-1 max-w-48 truncate text-muted">{order.deliveryAddress}</p></td><td className="p-4"><p>{order.deliveryDate}</p><p className="mt-1 text-muted">{order.deliveryTimeSlot}</p></td><td className="p-4 font-bold">{formatCurrency(order.totalAmount)}</td><td className="p-4"><StatusBadge status={order.orderStatus} /></td><td className="p-4 text-right"><Button asChild variant="ghost" size="sm"><Link href={`/admin/orders/${order.id}`} aria-label={`Xem ${order.orderCode}`}><Eye /></Link></Button></td></tr>)}</tbody></table></div><div className="divide-y divide-line md:hidden">{result.content.map((order) => <Link key={order.id} href={`/admin/orders/${order.id}`} className="block p-5"><div className="flex justify-between gap-4"><span className="font-mono text-xs font-bold text-accent">{order.orderCode}</span><StatusBadge status={order.orderStatus} /></div><p className="mt-4 text-sm font-bold">{order.recipientName}</p><p className="mt-1 text-xs text-muted">{order.deliveryDate}, {order.deliveryTimeSlot}</p><p className="mt-4 text-sm font-extrabold">{formatCurrency(order.totalAmount)}</p></Link>)}</div>{result.totalPages > 1 && <div className="flex items-center justify-between border-t border-line p-4"><Button variant="outline" disabled={result.first} onClick={() => setPage((value) => value - 1)}>Trang trước</Button><span className="text-xs text-muted">{result.page + 1} / {result.totalPages}</span><Button variant="outline" disabled={result.last} onClick={() => setPage((value) => value + 1)}>Trang sau</Button></div>}</section>}
  </div>;
}
