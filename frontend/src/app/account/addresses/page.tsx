"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { CheckCircle, MapPin, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { addressSchema, AddressFormValues } from "@/schemas/forms";
import { addressService } from "@/services/address.service";
import { Address } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/feedback-state";

const emptyAddress: AddressFormValues = { recipientName: "", phone: "", province: "", district: "", ward: "", detailAddress: "", isDefault: false };

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const query = useQuery({ queryKey: queryKeys.addresses, queryFn: () => addressService.getAddresses() });
  const form = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema), defaultValues: emptyAddress });
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = form;

  function openForm(address?: Address) {
    setEditing(address || null);
    reset(address ? { recipientName: address.recipientName, phone: address.phone, province: address.province, district: address.district, ward: address.ward, detailAddress: address.detailAddress, isDefault: address.isDefault } : emptyAddress);
    setOpen(true);
  }

  async function save(values: AddressFormValues) {
    try {
      const response = editing ? await addressService.updateAddress(editing.id, values) : await addressService.createAddress(values);
      if (!response.success) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
      setOpen(false);
      addToast("success", editing ? "Địa chỉ đã được cập nhật." : "Địa chỉ đã được lưu.");
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors as Record<string, string> | undefined;
        Object.entries(serverErrors || {}).forEach(([field, message]) => {
          if (field in emptyAddress) setError(field as keyof AddressFormValues, { type: "server", message });
        });
        addToast("error", error.response?.data?.message || "Chưa thể lưu địa chỉ.");
      } else addToast("error", "Chưa thể lưu địa chỉ.");
    }
  }

  async function remove(id: number) {
    try {
      await addressService.deleteAddress(id);
      await queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
      addToast("success", "Địa chỉ đã được xóa.");
    } catch { addToast("error", "Chưa thể xóa địa chỉ."); }
  }

  async function makeDefault(id: number) {
    try {
      await addressService.setDefaultAddress(id);
      await queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
      addToast("success", "Đã đặt làm địa chỉ mặc định.");
    } catch { addToast("error", "Chưa thể cập nhật địa chỉ mặc định."); }
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Giao hoa nhanh hơn</p><h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Sổ địa chỉ.</h2></div><Button className="gap-2" onClick={() => openForm()}><Plus /> Thêm địa chỉ</Button></div>
      {query.isLoading ? <div className="mt-8 grid gap-4 sm:grid-cols-2"><Skeleton className="h-56" /><Skeleton className="h-56" /></div> : query.isError ? <div className="mt-8"><ErrorState onRetry={() => query.refetch()} /></div> : query.data?.data?.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {query.data.data.map((address) => (
            <article key={address.id} className="relative rounded-2xl border border-line bg-canvas p-5">
              <div className="flex items-start justify-between gap-3"><MapPin className="text-accent" size={24} /><div className="flex gap-1"><button type="button" className="grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink" aria-label="Sửa địa chỉ" onClick={() => openForm(address)}><PencilSimple /></button><ConfirmDialog trigger={<button type="button" className="grid min-h-11 min-w-11 place-items-center rounded-full text-danger hover:bg-danger/10" aria-label="Xóa địa chỉ"><Trash /></button>} title="Xóa địa chỉ này?" description="Địa chỉ sẽ không còn xuất hiện ở bước thanh toán." confirmLabel="Xóa" destructive onConfirm={() => remove(address.id)} /></div></div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{address.recipientName}</h3>
              <p className="mt-1 text-xs font-semibold text-muted">{address.phone}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{address.detailAddress}, {address.ward}, {address.district}, {address.province}</p>
              {address.isDefault ? <p className="mt-5 flex items-center gap-2 text-xs font-bold text-success"><CheckCircle weight="fill" /> Địa chỉ mặc định</p> : <button type="button" className="mt-5 min-h-11 text-xs font-bold text-accent hover:underline" onClick={() => makeDefault(address.id)}>Đặt làm mặc định</button>}
            </article>
          ))}
        </div>
      ) : <div className="mt-8"><EmptyState title="Chưa có địa chỉ đã lưu" description="Lưu địa chỉ người nhận để điền nhanh ở lần đặt hoa tiếp theo." /></div>}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title={editing ? "Sửa địa chỉ" : "Thêm địa chỉ"} description="Thông tin này sẽ được dùng ở bước thanh toán.">
          <form onSubmit={handleSubmit(save)} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2"><Input label="Tên người nhận" error={errors.recipientName?.message} {...register("recipientName")} /><Input label="Số điện thoại" inputMode="tel" error={errors.phone?.message} {...register("phone")} /></div>
            <div className="grid gap-4 sm:grid-cols-2"><Input label="Tỉnh hoặc thành phố" error={errors.province?.message} {...register("province")} /><Input label="Quận hoặc huyện" error={errors.district?.message} {...register("district")} /></div>
            <Input label="Phường hoặc xã" error={errors.ward?.message} {...register("ward")} />
            <Input label="Số nhà và tên đường" error={errors.detailAddress?.message} {...register("detailAddress")} />
            <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-ink"><input type="checkbox" className="h-4 w-4 accent-accent" {...register("isDefault")} /> Đặt làm địa chỉ mặc định</label>
            <div className="flex justify-end"><Button type="submit" isLoading={isSubmitting}>{editing ? "Lưu thay đổi" : "Thêm địa chỉ"}</Button></div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
