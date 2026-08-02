"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Plus, Trash, UploadSimple } from "@phosphor-icons/react";
import { adminService } from "@/services/admin.service";
import { productSchema, ProductFormValues, ProductVariantFormValues } from "@/schemas/forms";
import { Product, ProductImage, ProductRequestData } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const emptyVariant: ProductVariantFormValues = { name: "", sku: "", price: 0, salePrice: undefined, stockQuantity: 0, isActive: true };
const emptyProduct: ProductFormValues = { categoryId: 0, name: "", slug: "", sku: "", shortDescription: "", description: "", basePrice: 0, salePrice: undefined, mainImageUrl: "", flowerType: "", mainColor: "", isFeatured: false, isNew: true, isBestSeller: false, isActive: true, variants: [] };

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [values, setValues] = useState<ProductFormValues>(() => product ? fromProduct(product) : emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<ProductImage[]>(product?.images || []);
  const [saving, setSaving] = useState(false);
  const categories = useQuery({ queryKey: queryKeys.adminCategories, queryFn: () => adminService.getAdminCategories() });

  function update<K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }
  function updateVariant(index: number, field: keyof ProductVariantFormValues, value: string | number | boolean | undefined) {
    setValues((current) => ({ ...current, variants: current.variants.map((variant, position) => position === index ? { ...variant, [field]: value } : variant) }));
    setErrors((current) => ({ ...current, [`variants.${index}.${field}`]: "" }));
  }
  function chooseFiles(event: ChangeEvent<HTMLInputElement>) { setFiles(Array.from(event.target.files || [])); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = productSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => { next[issue.path.join(".")] = issue.message; });
      setErrors(next);
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setSaving(true);
    try {
      const payload: ProductRequestData = { ...parsed.data, slug: parsed.data.slug || undefined, salePrice: parsed.data.salePrice || undefined, mainImageUrl: parsed.data.mainImageUrl || undefined, variants: parsed.data.variants.map((variant) => ({ ...variant, salePrice: variant.salePrice || undefined })) };
      const response = product ? await adminService.updateProduct(product.id, payload) : await adminService.createProduct(payload);
      if (!response.success) { setErrors(response.errors || {}); throw new Error(response.message); }
      for (let index = 0; index < files.length; index += 1) await adminService.uploadProductImage(response.data.id, files[index], !response.data.mainImageUrl && images.length === 0 && index === 0);
      addToast("success", product ? "Sản phẩm đã được cập nhật." : "Sản phẩm đã được tạo.");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        setErrors(error.response?.data?.errors || {});
        addToast("error", error.response?.data?.message || "Chưa thể lưu sản phẩm.");
      } else addToast("error", "Chưa thể lưu sản phẩm.");
    } finally { setSaving(false); }
  }

  async function deleteImage(imageId: number) {
    if (!product) return;
    try { await adminService.deleteProductImage(product.id, imageId); setImages((current) => current.filter((image) => image.id !== imageId)); addToast("success", "Ảnh đã được xóa."); } catch { addToast("error", "Chưa thể xóa ảnh."); }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-base font-extrabold">Thông tin cơ bản</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Tên sản phẩm" value={values.name} error={errors.name} onChange={(event) => update("name", event.target.value)} /><Input label="SKU" value={values.sku} error={errors.sku} onChange={(event) => update("sku", event.target.value)} /><Select label="Danh mục" value={values.categoryId} error={errors.categoryId} onChange={(event) => update("categoryId", Number(event.target.value))}><option value={0}>Chọn danh mục</option>{categories.data?.data?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select><Input label="Slug" helperText="Có thể để trống để backend tự tạo." value={values.slug || ""} error={errors.slug} onChange={(event) => update("slug", event.target.value)} /><Input label="Loại hoa" value={values.flowerType || ""} error={errors.flowerType} onChange={(event) => update("flowerType", event.target.value)} /><Input label="Màu chính" value={values.mainColor || ""} error={errors.mainColor} onChange={(event) => update("mainColor", event.target.value)} /></div><Textarea className="mt-4" label="Mô tả ngắn" maxLength={240} value={values.shortDescription || ""} error={errors.shortDescription} onChange={(event) => update("shortDescription", event.target.value)} /><Textarea className="mt-4" label="Mô tả chi tiết" rows={7} value={values.description || ""} error={errors.description} onChange={(event) => update("description", event.target.value)} /></section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-base font-extrabold">Giá và hiển thị</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Giá gốc" type="number" min="0" value={values.basePrice} error={errors.basePrice} onChange={(event) => update("basePrice", Number(event.target.value))} /><Input label="Giá ưu đãi" type="number" min="0" value={values.salePrice ?? ""} error={errors.salePrice} onChange={(event) => update("salePrice", event.target.value === "" ? undefined : Number(event.target.value))} /><Input label="URL ảnh chính" value={values.mainImageUrl || ""} error={errors.mainImageUrl} onChange={(event) => update("mainImageUrl", event.target.value)} /></div><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Checkbox label="Đang bán" checked={values.isActive} onChange={(value) => update("isActive", value)} /><Checkbox label="Sản phẩm mới" checked={values.isNew} onChange={(value) => update("isNew", value)} /><Checkbox label="Nổi bật" checked={values.isFeatured} onChange={(value) => update("isFeatured", value)} /><Checkbox label="Bán chạy" checked={values.isBestSeller} onChange={(value) => update("isBestSeller", value)} /></div></section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-base font-extrabold">Biến thể và tồn kho</h2><p className="mt-1 text-xs text-muted">Thêm kích thước hoặc phiên bản bán riêng.</p></div><Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => update("variants", [...values.variants, { ...emptyVariant }])}><Plus /> Thêm biến thể</Button></div><div className="mt-6 space-y-4">{values.variants.length ? values.variants.map((variant, index) => <div key={variant.id || index} className="rounded-[10px] border border-line bg-canvas p-4"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><Input label="Tên" value={variant.name} error={errors[`variants.${index}.name`]} onChange={(event) => updateVariant(index, "name", event.target.value)} /><Input label="SKU" value={variant.sku} error={errors[`variants.${index}.sku`]} onChange={(event) => updateVariant(index, "sku", event.target.value)} /><Input label="Giá" type="number" min="0" value={variant.price} error={errors[`variants.${index}.price`]} onChange={(event) => updateVariant(index, "price", Number(event.target.value))} /><Input label="Giá ưu đãi" type="number" min="0" value={variant.salePrice ?? ""} error={errors[`variants.${index}.salePrice`]} onChange={(event) => updateVariant(index, "salePrice", event.target.value === "" ? undefined : Number(event.target.value))} /><Input label="Tồn kho" type="number" min="0" value={variant.stockQuantity} error={errors[`variants.${index}.stockQuantity`]} onChange={(event) => updateVariant(index, "stockQuantity", Number(event.target.value))} /></div><div className="mt-3 flex items-center justify-between"><Checkbox label="Đang hoạt động" checked={variant.isActive} onChange={(value) => updateVariant(index, "isActive", value)} /><Button type="button" variant="ghost" size="sm" className="gap-2 text-danger" onClick={() => update("variants", values.variants.filter((_, position) => position !== index))}><Trash /> Xóa</Button></div></div>) : <p className="rounded-[10px] border border-dashed border-line p-6 text-center text-sm text-muted">Sản phẩm chưa có biến thể.</p>}</div></section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-base font-extrabold">Hình ảnh</h2>{images.length > 0 && <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">{images.map((image) => <div key={image.id} className="group relative aspect-[4/5] overflow-hidden rounded-[10px] bg-canvas"><Image src={image.imageUrl} alt={image.altText || "Ảnh sản phẩm"} fill sizes="160px" className="object-cover" /><ConfirmDialog trigger={<button type="button" className="absolute right-1 top-1 grid min-h-11 min-w-11 place-items-center rounded-full bg-surface/90 text-danger opacity-100 shadow-soft sm:opacity-0 sm:group-hover:opacity-100" aria-label="Xóa ảnh"><Trash /></button>} title="Xóa ảnh này?" description="Ảnh sẽ bị xóa khỏi sản phẩm." confirmLabel="Xóa" destructive onConfirm={() => deleteImage(image.id)} /></div>)}</div>}<label className="mt-6 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-line bg-canvas p-5 text-center hover:border-accent"><UploadSimple size={24} className="text-accent" /><span className="mt-3 text-sm font-bold">Chọn ảnh để tải lên</span><span className="mt-1 text-xs text-muted">Có thể chọn nhiều ảnh.</span><input type="file" accept="image/*" multiple className="sr-only" onChange={chooseFiles} /></label>{files.length > 0 && <ul className="mt-3 text-xs text-muted">{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul>}</section>

      <div className="flex justify-end gap-3"><Button type="button" variant="ghost" onClick={() => router.back()}>Hủy</Button><Button type="submit" isLoading={saving}>{product ? "Lưu thay đổi" : "Tạo sản phẩm"}</Button></div>
    </form>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] border border-line bg-canvas px-4 text-sm font-bold"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-accent" /> {label}</label>; }

function fromProduct(product: Product): ProductFormValues { return { categoryId: product.category.id, name: product.name, slug: product.slug, sku: product.sku, shortDescription: product.shortDescription || "", description: product.description || "", basePrice: product.basePrice, salePrice: product.salePrice, mainImageUrl: product.mainImageUrl || "", flowerType: product.flowerType || "", mainColor: product.mainColor || "", isFeatured: product.isFeatured, isNew: product.isNew, isBestSeller: product.isBestSeller, isActive: product.isActive, variants: product.variants.map((variant) => ({ id: variant.id, name: variant.name, sku: variant.sku, price: variant.price, salePrice: variant.salePrice, stockQuantity: variant.stockQuantity, isActive: variant.isActive })) }; }
