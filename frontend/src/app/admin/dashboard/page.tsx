"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CurrencyCircleDollar, Package, ShoppingBag, Users } from "@phosphor-icons/react";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency, formatDate } from "@/utils/format";
import { StatusBadge } from "@/components/ui/status-badge";
import { ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AdminDashboardPage() {
  const query = useQuery({ queryKey: queryKeys.adminSummary, queryFn: () => adminService.getDashboardSummary() });
  if (query.isLoading) return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36" />)}</div><Skeleton className="h-96" /></div>;
  if (query.isError || !query.data?.data) return <ErrorState onRetry={() => query.refetch()} />;
  const data = query.data.data;
  const metrics = [
    { label: "Doanh thu", value: formatCurrency(data.totalRevenue), icon: CurrencyCircleDollar },
    { label: "Tổng đơn", value: data.totalOrders.toLocaleString("vi-VN"), icon: ShoppingBag },
    { label: "Chờ xử lý", value: data.pendingOrders.toLocaleString("vi-VN"), icon: Package },
    { label: "Khách hàng", value: data.totalCustomers.toLocaleString("vi-VN"), icon: Users },
  ];
  return (
    <div className="space-y-8">
      <header><h1 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">Tổng quan vận hành</h1><p className="mt-2 text-sm text-muted">Dữ liệu mới nhất từ hệ thống đơn hàng.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Chỉ số tổng quan">{metrics.map(({ label, value, icon: Icon }) => <article key={label} className="rounded-2xl border border-line bg-surface p-5"><Icon size={25} className="text-accent" /><p className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</p><p className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-ink">{value}</p></article>)}</section>
      <div className="grid items-start gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="overflow-hidden rounded-2xl border border-line bg-surface"><header className="flex items-center justify-between border-b border-line p-5"><h2 className="text-base font-extrabold text-ink">Đơn hàng gần đây</h2><Link href="/admin/orders" className="text-xs font-bold text-accent hover:underline">Xem tất cả</Link></header>{data.recentOrders.length ? <><div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-xs"><thead className="bg-canvas text-muted"><tr><th className="p-4">Mã đơn</th><th className="p-4">Khách hàng</th><th className="p-4">Ngày đặt</th><th className="p-4">Tổng</th><th className="p-4">Trạng thái</th></tr></thead><tbody className="divide-y divide-line">{data.recentOrders.map((order) => <tr key={order.id}><td className="p-4"><Link href={`/admin/orders/${order.id}`} className="font-mono font-bold text-accent hover:underline">{order.orderCode}</Link></td><td className="p-4 font-semibold">{order.customerName}</td><td className="p-4 text-muted">{formatDate(order.createdAt)}</td><td className="p-4 font-bold">{formatCurrency(order.totalAmount)}</td><td className="p-4"><StatusBadge status={order.orderStatus} /></td></tr>)}</tbody></table></div><div className="divide-y divide-line md:hidden">{data.recentOrders.map((order) => <Link key={order.id} href={`/admin/orders/${order.id}`} className="block p-5"><div className="flex justify-between gap-4"><span className="font-mono text-xs font-bold text-accent">{order.orderCode}</span><StatusBadge status={order.orderStatus} /></div><p className="mt-3 text-sm font-bold">{order.customerName}</p><p className="mt-1 text-xs text-muted">{formatCurrency(order.totalAmount)}</p></Link>)}</div></> : <p className="p-8 text-sm text-muted">Chưa có đơn hàng gần đây.</p>}</section>
        <section className="rounded-2xl border border-line bg-surface"><header className="border-b border-line p-5"><h2 className="text-base font-extrabold text-ink">Sắp hết hàng</h2></header><div className="divide-y divide-line">{data.lowStockProducts.length ? data.lowStockProducts.slice(0, 8).map((product) => <Link key={product.id} href={`/admin/products/${product.id}/edit`} className="flex items-center justify-between gap-4 p-5 hover:bg-canvas"><div className="min-w-0"><p className="truncate text-sm font-bold text-ink">{product.name}</p><p className="mt-1 font-mono text-xs text-muted">{product.sku}</p></div><span className="text-xs font-bold text-danger">{product.variants?.reduce((sum, variant) => sum + variant.stockQuantity, 0) || 0}</span></Link>) : <p className="p-8 text-sm text-muted">Không có sản phẩm sắp hết.</p>}</div></section>
      </div>
    </div>
  );
}
