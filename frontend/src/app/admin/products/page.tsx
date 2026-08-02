"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MagnifyingGlass, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency } from "@/utils/format";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();
  useEffect(() => { const timer = window.setTimeout(() => { setKeyword(search.trim()); setPage(0); }, 350); return () => window.clearTimeout(timer); }, [search]);
  const query = useQuery({ queryKey: queryKeys.adminProducts(keyword, page), queryFn: () => adminService.getAdminProducts(keyword, page, 10) });
  const result = query.data?.data;
  async function toggle(id: number, isActive: boolean) { try { await adminService.toggleProductStatus(id, !isActive); await queryClient.invalidateQueries({ queryKey: ["admin", "products"] }); addToast("success", "Trạng thái sản phẩm đã cập nhật."); } catch { addToast("error", "Chưa thể cập nhật sản phẩm."); } }
  async function remove(id: number) { try { await adminService.deleteProduct(id); await queryClient.invalidateQueries({ queryKey: ["admin", "products"] }); addToast("success", "Sản phẩm đã được xóa."); } catch { addToast("error", "Chưa thể xóa sản phẩm."); } }
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-extrabold tracking-[-0.02em]">Sản phẩm</h1><p className="mt-2 text-sm text-muted">Quản lý nội dung, biến thể và trạng thái bán.</p></div><Button asChild className="gap-2"><Link href="/admin/products/create"><Plus /> Tạo sản phẩm</Link></Button></header>
      <div className="rounded-2xl border border-line bg-surface p-4"><div className="relative max-w-xl"><MagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><Input aria-label="Tìm sản phẩm" className="pl-11" placeholder="Tên sản phẩm hoặc SKU" value={search} onChange={(event) => setSearch(event.target.value)} /></div></div>
      {query.isLoading ? <Skeleton className="h-[34rem]" /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : !result?.content.length ? <EmptyState title="Không có sản phẩm phù hợp" description="Thử từ khóa khác hoặc tạo sản phẩm mới." /> : (
        <section className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-xs"><thead className="border-b border-line bg-canvas text-muted"><tr><th className="p-4">Sản phẩm</th><th className="p-4">Danh mục</th><th className="p-4">Giá bán</th><th className="p-4">Trạng thái</th><th className="p-4 text-right">Thao tác</th></tr></thead><tbody className="divide-y divide-line">{result.content.map((product) => <tr key={product.id} className="hover:bg-canvas/60"><td className="p-4"><div className="flex items-center gap-3"><div className="relative h-14 w-12 overflow-hidden rounded-lg bg-canvas">{product.mainImageUrl && <Image src={product.mainImageUrl} alt="" fill sizes="48px" className="object-cover" />}</div><div className="min-w-0"><p className="max-w-xs truncate font-bold text-ink">{product.name}</p><p className="mt-1 font-mono text-[11px] text-muted">{product.sku}</p></div></div></td><td className="p-4 text-muted">{product.category?.name || "Chưa phân loại"}</td><td className="p-4 font-bold">{formatCurrency(product.salePrice || product.basePrice)}</td><td className="p-4"><button type="button" onClick={() => toggle(product.id, product.isActive)}><StatusBadge status={product.isActive ? "ACTIVE" : "INACTIVE"} label={product.isActive ? "Đang bán" : "Tạm ẩn"} /></button></td><td className="p-4"><div className="flex justify-end gap-1"><Button asChild variant="ghost" size="sm"><Link href={`/admin/products/${product.id}/edit`} aria-label={`Sửa ${product.name}`}><PencilSimple /></Link></Button><ConfirmDialog trigger={<Button variant="ghost" size="sm" className="text-danger" aria-label={`Xóa ${product.name}`}><Trash /></Button>} title="Xóa sản phẩm?" description="Sản phẩm sẽ không còn xuất hiện trong danh sách bán." confirmLabel="Xóa" destructive onConfirm={() => remove(product.id)} /></div></td></tr>)}</tbody></table></div>
          <div className="divide-y divide-line md:hidden">{result.content.map((product) => <article key={product.id} className="p-4"><div className="flex gap-3"><div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-canvas">{product.mainImageUrl && <Image src={product.mainImageUrl} alt="" fill sizes="64px" className="object-cover" />}</div><div className="min-w-0 flex-1"><p className="font-bold text-ink">{product.name}</p><p className="mt-1 font-mono text-xs text-muted">{product.sku}</p><p className="mt-3 text-sm font-bold">{formatCurrency(product.salePrice || product.basePrice)}</p></div></div><div className="mt-4 flex items-center justify-between"><button type="button" onClick={() => toggle(product.id, product.isActive)}><StatusBadge status={product.isActive ? "ACTIVE" : "INACTIVE"} label={product.isActive ? "Đang bán" : "Tạm ẩn"} /></button><div className="flex"><Button asChild variant="ghost" size="sm"><Link href={`/admin/products/${product.id}/edit`}><PencilSimple /><span className="sr-only">Sửa</span></Link></Button><ConfirmDialog trigger={<Button variant="ghost" size="sm" className="text-danger"><Trash /><span className="sr-only">Xóa</span></Button>} title="Xóa sản phẩm?" description="Sản phẩm sẽ không còn xuất hiện trong danh sách bán." confirmLabel="Xóa" destructive onConfirm={() => remove(product.id)} /></div></div></article>)}</div>
          {result.totalPages > 1 && <div className="flex items-center justify-between border-t border-line p-4"><Button variant="outline" disabled={result.first} onClick={() => setPage((value) => value - 1)}>Trang trước</Button><span className="text-xs text-muted">{result.page + 1} / {result.totalPages}</span><Button variant="outline" disabled={result.last} onClick={() => setPage((value) => value + 1)}>Trang sau</Button></div>}
        </section>
      )}
    </div>
  );
}
