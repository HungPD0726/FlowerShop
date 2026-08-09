"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { Product, ProductVariant } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AdminInventoryPage() {
  const [page, setPage] = useState(0);
  const query = useQuery({ queryKey: queryKeys.adminProducts("", page), queryFn: () => adminService.getAdminProducts("", page, 12) });
  const result = query.data?.data;
  const rows: Array<{ product: Product; variant: ProductVariant | null }> = [];
  result?.content.forEach((product) => {
    if (product.variants.length) product.variants.forEach((variant) => rows.push({ product, variant }));
    else rows.push({ product, variant: null });
  });
  const lowStockCount = rows.filter(({ variant }) => (variant?.stockQuantity || 0) <= 20).length;

  return <div className="space-y-6">
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em]">Tồn kho hiện tại</h1>
        <p className="mt-2 text-sm text-muted">Số lượng thực tế theo sản phẩm và biến thể từ API sản phẩm.</p>
      </div>
      {lowStockCount > 0 && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-xs font-bold text-amber-800">
          ⚠️ Có {lowStockCount} loại hoa sắp hết hàng (&le; 20 cành/bó)
        </div>
      )}
    </header>{query.isLoading ? <Skeleton className="h-[34rem]" /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : !rows.length ? <EmptyState title="Chưa có dữ liệu tồn kho" description="Tạo sản phẩm và biến thể để theo dõi tại đây." /> : <section className="overflow-hidden rounded-2xl border border-line bg-surface"><div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-xs"><thead className="border-b border-line bg-canvas text-muted"><tr><th className="p-4">Sản phẩm</th><th className="p-4">Biến thể</th><th className="p-4">SKU</th><th className="p-4">Tồn kho</th><th className="p-4">Trạng thái</th></tr></thead><tbody className="divide-y divide-line">{rows.map(({ product, variant }) => { const stock = variant?.stockQuantity || 0; return <tr key={`${product.id}-${variant?.id || 0}`}><td className="p-4"><Link href={`/admin/products/${product.id}/edit`} className="font-bold hover:text-accent">{product.name}</Link></td><td className="p-4 text-muted">{variant?.name || "Mặc định"}</td><td className="p-4 font-mono text-muted">{variant?.sku || product.sku}</td><td className={`p-4 text-sm font-extrabold ${stock <= 5 ? "text-danger" : "text-ink"}`}>{stock}</td><td className="p-4"><StatusBadge status={stock > 0 ? "ACTIVE" : "INACTIVE"} label={stock > 0 ? "Còn hàng" : "Hết hàng"} /></td></tr>; })}</tbody></table></div><div className="divide-y divide-line md:hidden">{rows.map(({ product, variant }) => { const stock = variant?.stockQuantity || 0; return <Link key={`${product.id}-${variant?.id || 0}`} href={`/admin/products/${product.id}/edit`} className="flex items-center justify-between gap-4 p-5"><div><p className="text-sm font-bold">{product.name}</p><p className="mt-1 text-xs text-muted">{variant?.name || "Mặc định"} · {variant?.sku || product.sku}</p></div><span className={`text-lg font-extrabold ${stock <= 5 ? "text-danger" : "text-ink"}`}>{stock}</span></Link>; })}</div>{result && result.totalPages > 1 && <div className="flex items-center justify-between border-t border-line p-4"><Button variant="outline" disabled={result.first} onClick={() => setPage((value) => value - 1)}>Trang trước</Button><span className="text-xs text-muted">{result.page + 1} / {result.totalPages}</span><Button variant="outline" disabled={result.last} onClick={() => setPage((value) => value + 1)}>Trang sau</Button></div>}</section>}</div>;
}
