"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "@/lib/query-keys";
import { ProductForm } from "@/components/admin/product-form";
import { ErrorState, Skeleton } from "@/components/ui/feedback-state";
export default function EditProductPage() { const id = Number(useParams<{ id: string }>().id); const query = useQuery({ queryKey: queryKeys.product(id), queryFn: () => adminService.getAdminProduct(id), enabled: Number.isFinite(id) }); if (query.isLoading) return <Skeleton className="h-[52rem]" />; if (query.isError || !query.data?.data) return <ErrorState title="Không tìm thấy sản phẩm" onRetry={() => query.refetch()} />; return <div className="space-y-6"><header><h1 className="text-2xl font-extrabold tracking-[-0.02em]">Sửa sản phẩm</h1><p className="mt-2 text-sm text-muted">{query.data.data.name}</p></header><ProductForm product={query.data.data} /></div>; }
