"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CaretLeft, CaretRight, Funnel, MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { productService } from "@/services/product.service";
import { queryKeys } from "@/lib/query-keys";

export default function ProductsPage() {
  return <Suspense fallback={<CatalogSkeleton />}><ProductsPageContent /></Suspense>;
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [keywordDraft, setKeywordDraft] = useState(searchParams.get("keyword") || "");

  const filters = useMemo(() => ({
    category: searchParams.get("category") || "",
    keyword: searchParams.get("keyword") || "",
    sort: searchParams.get("sort") || "newest",
    flowerType: searchParams.get("flowerType") || "",
    color: searchParams.get("color") || "",
    inStock: searchParams.get("inStock") === "true",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    page: Math.max(0, Number(searchParams.get("page") || 0)),
  }), [searchParams]);

  const updateParam = (name: string, value?: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === undefined || value === false) params.delete(name);
    else params.set(name, String(value));
    if (name !== "page") params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (keywordDraft !== filters.keyword) updateParam("keyword", keywordDraft.trim());
    }, 350);
    return () => window.clearTimeout(timer);
    // updateParam intentionally reads the latest URL state after the debounce.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordDraft, filters.keyword]);

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => (await productService.getCategories()).data,
  });
  const productsQuery = useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: async () => (await productService.getProducts({
      category: filters.category || undefined,
      keyword: filters.keyword || undefined,
      sort: filters.sort,
      flowerType: filters.flowerType || undefined,
      color: filters.color || undefined,
      inStock: filters.inStock || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      page: filters.page,
      size: 18,
    })).data,
  });

  const filterPanel = (
    <FilterPanel
      categories={categoriesQuery.data || []}
      values={filters}
      keyword={keywordDraft}
      onKeywordChange={setKeywordDraft}
      onChange={updateParam}
      onClear={() => { setKeywordDraft(""); router.replace(pathname, { scroll: false }); setFiltersOpen(false); }}
    />
  );

  return (
    <div className="page-shell pb-20 pt-10 lg:pt-14">
      <div className="max-w-3xl">
        <h1 className="editorial-title">Cửa hàng hoa.</h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted">Lọc theo dịp, màu sắc, loại hoa và khoảng giá để tìm thiết kế phù hợp.</p>

        {/* Quick Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {[
            { label: "Tất cả mẫu", category: "" },
            { label: " Hoa Sinh Nhật", category: "hoa-sinh-nhat" },
            { label: "❤️ Hoa Tình Yêu", category: "hoa-tinh-yeu" },
            { label: "💐 Hoa Khai Trương", category: "hoa-khai-truong" },
            { label: "✨ Hoa Cảm Ơn", category: "hoa-cam-on" },
            { label: "🌹 Lẵng & Giỏ Hoa", category: "lang-hoa-gio-hoa" },
          ].map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => updateParam("category", pill.category)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                filters.category === pill.category
                  ? "bg-accent text-white shadow-soft"
                  : "border border-line/70 bg-surface text-ink hover:border-accent/40"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[17rem_1fr] xl:gap-12">
        <aside className="sticky top-24 hidden rounded-[20px] border border-line bg-surface p-5 shadow-soft lg:block">{filterPanel}</aside>

        <section aria-label="Danh sách sản phẩm" className="min-w-0">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div className="flex items-center gap-3">
              <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
                <DialogTrigger asChild><Button variant="outline" className="gap-2 lg:hidden"><Funnel /> Bộ lọc</Button></DialogTrigger>
                <DialogContent title="Lọc sản phẩm" description="Thu hẹp danh sách theo nhu cầu của bạn." className="max-w-md">{filterPanel}</DialogContent>
              </Dialog>
              <span className="text-sm text-muted tabular-nums">{productsQuery.data?.totalElements || 0} sản phẩm</span>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <SlidersHorizontal className="text-muted" />
              <select aria-label="Sắp xếp sản phẩm" value={filters.sort} onChange={(event) => updateParam("sort", event.target.value)} className="min-h-11 rounded-xl border border-line bg-surface px-3 text-sm focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10">
                <option value="newest">Mới nhất</option><option value="bestseller">Bán chạy</option><option value="price-asc">Giá tăng dần</option><option value="price-desc">Giá giảm dần</option>
              </select>
            </label>
          </div>

          {productsQuery.isLoading ? (
            <ProductGridSkeleton />
          ) : productsQuery.isError ? (
            <ErrorState onRetry={() => productsQuery.refetch()} />
          ) : !productsQuery.data?.content.length ? (
            <EmptyState title="Chưa tìm thấy mẫu hoa phù hợp" description="Thử bỏ bớt bộ lọc hoặc dùng từ khóa khác." action={<Button variant="outline" onClick={() => { setKeywordDraft(""); router.replace(pathname); }}>Xóa bộ lọc</Button>} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 xl:grid-cols-3">
                {productsQuery.data.content.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 3} />)}
              </div>
              {productsQuery.data.totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Phân trang sản phẩm">
                  <button aria-label="Trang trước" disabled={productsQuery.data.first} onClick={() => updateParam("page", filters.page - 1)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-line text-ink hover:border-accent hover:text-accent disabled:opacity-40"><CaretLeft /></button>
                  <span className="px-4 text-sm text-muted tabular-nums">Trang {productsQuery.data.page + 1} / {productsQuery.data.totalPages}</span>
                  <button aria-label="Trang sau" disabled={productsQuery.data.last} onClick={() => updateParam("page", filters.page + 1)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-line text-ink hover:border-accent hover:text-accent disabled:opacity-40"><CaretRight /></button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterPanel({ categories, values, keyword, onKeywordChange, onChange, onClear }: { categories: Array<{ id: number; name: string; slug: string }>; values: Record<string, string | number | boolean>; keyword: string; onKeywordChange: (value: string) => void; onChange: (name: string, value?: string | number | boolean) => void; onClear: () => void }) {
  return (
    <div className="grid gap-5">
      <div className="relative"><MagnifyingGlass className="absolute left-4 top-[2.85rem] text-muted" /><Input label="Tìm kiếm" value={keyword} onChange={(event) => onKeywordChange(event.target.value)} placeholder="Tên mẫu hoa" className="pl-11" /></div>
      <Select label="Danh mục" value={String(values.category)} onChange={(event) => onChange("category", event.target.value)}><option value="">Tất cả danh mục</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</Select>
      <Input label="Loại hoa" value={String(values.flowerType)} onChange={(event) => onChange("flowerType", event.target.value)} placeholder="Ví dụ: hoa hồng" />
      <Input label="Màu chủ đạo" value={String(values.color)} onChange={(event) => onChange("color", event.target.value)} placeholder="Ví dụ: đỏ" />
      <div className="grid grid-cols-2 gap-3"><Input label="Giá từ" type="number" min={0} value={String(values.minPrice)} onChange={(event) => onChange("minPrice", event.target.value)} /><Input label="Đến" type="number" min={0} value={String(values.maxPrice)} onChange={(event) => onChange("maxPrice", event.target.value)} /></div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink"><input type="checkbox" checked={Boolean(values.inStock)} onChange={(event) => onChange("inStock", event.target.checked)} className="h-4 w-4 accent-accent" />Chỉ còn hàng</label>
      <Button variant="ghost" onClick={onClear}>Xóa bộ lọc</Button>
    </div>
  );
}

function ProductGridSkeleton() { return <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index}><Skeleton className="aspect-[4/5]" /><Skeleton className="mt-4 h-6 w-2/3" /><Skeleton className="mt-2 h-4 w-1/3" /></div>)}</div>; }
function CatalogSkeleton() { return <div className="page-shell py-12"><Skeleton className="h-24 max-w-2xl" /><div className="mt-10"><ProductGridSkeleton /></div></div>; }
