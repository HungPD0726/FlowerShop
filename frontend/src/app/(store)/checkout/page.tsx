"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Bank, Check, CreditCard, LockKey } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { checkoutSchema, CheckoutFormValues } from "@/schemas/forms";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUIStore } from "@/stores/useUIStore";
import { orderService } from "@/services/order.service";
import { cartService } from "@/services/cart.service";
import { addressService } from "@/services/address.service";
import { ApiResponse } from "@/types";
import { queryKeys } from "@/lib/query-keys";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState, Skeleton } from "@/components/ui/feedback-state";

const SHIPPING_FEE = 30000;
const tomorrow = () => new Date(Date.now() + 86400000).toLocaleDateString("en-CA");

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, setCart } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();
  const [isLoadingCart, setIsLoadingCart] = useState(!cart);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user?.fullName || "",
      customerEmail: user?.email || "",
      customerPhone: user?.phone || "",
      recipientName: "",
      recipientPhone: "",
      province: "TP. Hồ Chí Minh",
      district: "",
      ward: "",
      deliveryAddress: "",
      deliveryDate: tomorrow(),
      deliveryTimeSlot: "08:00 - 12:00",
      senderName: "",
      cardMessage: "",
      hideSenderName: false,
      customerNote: "",
      couponCode: "",
      paymentMethod: "COD",
    },
  });
  const { register, handleSubmit, setValue, setError, formState: { errors, isSubmitting }, watch } = form;
  const paymentMethod = watch("paymentMethod");
  const hideSenderName = watch("hideSenderName");

  const addressesQuery = useQuery({
    queryKey: queryKeys.addresses,
    queryFn: () => addressService.getAddresses(),
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (user) {
      setValue("customerName", user.fullName);
      setValue("customerEmail", user.email);
      setValue("customerPhone", user.phone || "");
    }
  }, [setValue, user]);

  useEffect(() => {
    if (cart) { setIsLoadingCart(false); return; }
    cartService.getCart().then((response) => {
      if (response.success) setCart(response.data);
    }).finally(() => setIsLoadingCart(false));
  }, [cart, setCart]);

  function applyAddress(id: number) {
    const address = addressesQuery.data?.data?.find((item) => item.id === id);
    if (!address) return;
    setSelectedAddress(id);
    setValue("recipientName", address.recipientName, { shouldValidate: true });
    setValue("recipientPhone", address.phone, { shouldValidate: true });
    setValue("province", address.province, { shouldValidate: true });
    setValue("district", address.district, { shouldValidate: true });
    setValue("ward", address.ward, { shouldValidate: true });
    setValue("deliveryAddress", address.detailAddress, { shouldValidate: true });
  }

  async function submitOrder(values: CheckoutFormValues) {
    if (!cart) return;
    try {
      const response = await orderService.createOrder({
        ...values,
        senderName: values.senderName || undefined,
        cardMessage: values.cardMessage || undefined,
        customerNote: values.customerNote || undefined,
        couponCode: values.couponCode || undefined,
        items: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          deliveryDate: item.deliveryDate || values.deliveryDate,
          deliveryTimeSlot: item.deliveryTimeSlot || values.deliveryTimeSlot,
          cardMessage: item.cardMessage || values.cardMessage,
        })),
      });
      if (!response.success) {
        Object.entries(response.errors || {}).forEach(([field, message]) => setBackendError(field, message));
        throw new Error(response.message);
      }
      setCart(null);
      addToast("success", "Đơn hoa đã được ghi nhận.");
      router.push(`/checkout/success?code=${response.data.orderCode}`);
    } catch (error) {
      if (isAxiosError<ApiResponse<never>>(error)) {
        Object.entries(error.response?.data?.errors || {}).forEach(([field, message]) => setBackendError(field, message));
        addToast("error", error.response?.data?.message || "Đặt hàng chưa thành công.");
      } else {
        addToast("error", "Đặt hàng chưa thành công. Vui lòng kiểm tra lại.");
      }
    }
  }

  function setBackendError(field: string, message: string) {
    if (field in form.getValues()) setError(field as keyof CheckoutFormValues, { type: "server", message });
  }

  if (isLoadingCart) return <div className="page-shell py-12"><Skeleton className="h-14 w-80" /><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_23rem]"><Skeleton className="h-[48rem]" /><Skeleton className="h-[30rem]" /></div></div>;
  if (!cart || cart.items.length === 0) return <div className="page-shell py-16"><EmptyState title="Chưa có sản phẩm để thanh toán" description="Hãy thêm hoa vào giỏ trước khi tiếp tục." action={<Button asChild><Link href="/products">Đến cửa hàng</Link></Button>} /></div>;

  const total = cart.subtotal + SHIPPING_FEE;

  return (
    <div className="page-shell py-10 sm:py-14">
      <p className="eyebrow">Bước cuối</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-[-0.045em] text-ink sm:text-6xl">Gửi hoa đến đúng người.</h1>
      <form onSubmit={handleSubmit(submitOrder)} noValidate className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="space-y-6">
          <FormSection number="01" title="Người đặt hoa">
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Họ và tên" autoComplete="name" error={errors.customerName?.message} {...register("customerName")} />
              <Input label="Email" type="email" autoComplete="email" error={errors.customerEmail?.message} {...register("customerEmail")} />
              <Input label="Số điện thoại" inputMode="tel" autoComplete="tel" error={errors.customerPhone?.message} {...register("customerPhone")} />
            </div>
          </FormSection>

          <FormSection number="02" title="Người nhận và địa chỉ">
            {user && addressesQuery.data?.data?.length ? (
              <div className="mb-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">Địa chỉ đã lưu</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {addressesQuery.data.data.map((address) => (
                    <button key={address.id} type="button" aria-pressed={selectedAddress === address.id} onClick={() => applyAddress(address.id)} className={`min-w-64 rounded-xl border p-4 text-left text-xs leading-5 ${selectedAddress === address.id ? "border-accent bg-accent-soft" : "border-line bg-canvas"}`}>
                      <span className="block font-bold text-ink">{address.recipientName}{address.isDefault ? " · Mặc định" : ""}</span>
                      <span className="mt-1 block text-muted">{address.detailAddress}, {address.ward}, {address.district}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Tên người nhận" autoComplete="shipping name" error={errors.recipientName?.message} {...register("recipientName")} />
              <Input label="Số điện thoại người nhận" inputMode="tel" autoComplete="shipping tel" error={errors.recipientPhone?.message} {...register("recipientPhone")} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Input label="Tỉnh hoặc thành phố" autoComplete="shipping address-level1" error={errors.province?.message} {...register("province")} />
              <Input label="Quận hoặc huyện" autoComplete="shipping address-level2" error={errors.district?.message} {...register("district")} />
              <Input label="Phường hoặc xã" autoComplete="shipping address-level3" error={errors.ward?.message} {...register("ward")} />
            </div>
            <Input className="mt-4" label="Số nhà và tên đường" autoComplete="shipping street-address" error={errors.deliveryAddress?.message} {...register("deliveryAddress")} />
          </FormSection>

          <FormSection number="03" title="Thời gian và thiệp">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Ngày giao hoa" type="date" min={tomorrow()} error={errors.deliveryDate?.message} {...register("deliveryDate")} />
              <Select label="Khung giờ" error={errors.deliveryTimeSlot?.message} {...register("deliveryTimeSlot")}>
                <option value="08:00 - 12:00">08:00 - 12:00, buổi sáng</option>
                <option value="13:00 - 17:00">13:00 - 17:00, buổi chiều</option>
                <option value="18:00 - 21:00">18:00 - 21:00, buổi tối</option>
              </Select>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input label="Tên người gửi" disabled={hideSenderName} error={errors.senderName?.message} {...register("senderName")} />
              <label className="flex min-h-11 cursor-pointer items-center gap-3 self-end rounded-xl border border-line bg-canvas px-4 text-sm font-semibold text-ink">
                <input type="checkbox" className="h-4 w-4 accent-accent" {...register("hideSenderName")} /> Gửi ẩn danh
              </label>
            </div>
            <Textarea className="mt-4" label="Lời nhắn trên thiệp" error={errors.cardMessage?.message} maxLength={300} {...register("cardMessage")} />
            <Textarea className="mt-4" label="Ghi chú cho cửa hàng" error={errors.customerNote?.message} maxLength={500} {...register("customerNote")} />
          </FormSection>

          <FormSection number="04" title="Thanh toán">
            <fieldset>
              <legend className="sr-only">Chọn phương thức thanh toán</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <PaymentOption value="COD" current={paymentMethod} title="Thanh toán khi nhận hoa" description="Thanh toán cho nhân viên giao hàng" icon={<CreditCard />} register={register("paymentMethod")} />
                <PaymentOption value="BANK_TRANSFER" current={paymentMethod} title="Chuyển khoản ngân hàng" description="Thông tin chuyển khoản theo đơn" icon={<Bank />} register={register("paymentMethod")} />
              </div>
              {errors.paymentMethod && <p className="mt-2 text-xs font-medium text-danger">{errors.paymentMethod.message}</p>}
            </fieldset>
          </FormSection>
        </div>

        <aside className="rounded-[20px] border border-line bg-surface p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl font-semibold text-ink">Đơn hàng</h2>
          <div className="mt-5 max-h-64 divide-y divide-line overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-3 py-4 first:pt-0">
                <div className="relative h-16 w-[3.25rem] shrink-0 overflow-hidden rounded-lg bg-surface-muted">{item.mainImageUrl && <Image src={item.mainImageUrl} alt="" fill sizes="52px" className="object-cover" />}</div>
                <div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-bold leading-5 text-ink">{item.productName}</p><p className="mt-1 text-xs text-muted">{item.quantity} × {formatCurrency(item.unitPrice)}</p></div>
              </div>
            ))}
          </div>
          <Input className="mt-5" label="Mã ưu đãi" helperText="Mã được xác nhận khi gửi đơn." error={errors.couponCode?.message} {...register("couponCode")} />
          <dl className="mt-6 space-y-4 border-t border-line pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Tạm tính</dt><dd className="font-semibold">{formatCurrency(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Phí giao hàng</dt><dd className="font-semibold">{formatCurrency(SHIPPING_FEE)}</dd></div>
            <div className="flex items-baseline justify-between border-t border-line pt-5"><dt className="font-bold">Tổng cộng</dt><dd className="font-serif text-2xl font-semibold">{formatCurrency(total)}</dd></div>
          </dl>
          <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-7 w-full">Xác nhận đặt hàng</Button>
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted"><LockKey className="mt-0.5 shrink-0 text-accent" /> Thông tin được mã hóa trong quá trình gửi đơn.</p>
        </aside>
      </form>
    </div>
  );
}

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="rounded-[20px] border border-line bg-surface p-5 sm:p-7"><header className="mb-6 flex items-center gap-4 border-b border-line pb-5"><span className="text-xs font-bold tracking-[0.16em] text-accent">{number}</span><h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2></header>{children}</section>;
}

function PaymentOption({ value, current, title, description, icon, register }: { value: "COD" | "BANK_TRANSFER"; current: string; title: string; description: string; icon: React.ReactNode; register: UseFormRegisterReturn<"paymentMethod"> }) {
  const selected = current === value;
  return <label className={`relative flex min-h-24 cursor-pointer items-start gap-3 rounded-xl border p-4 ${selected ? "border-accent bg-accent-soft" : "border-line bg-canvas"}`}><input type="radio" value={value} className="sr-only" {...register} /><span className="mt-0.5 text-accent">{icon}</span><span><span className="block text-sm font-bold text-ink">{title}</span><span className="mt-1 block text-xs leading-5 text-muted">{description}</span></span>{selected && <Check className="absolute right-3 top-3 text-accent" weight="bold" aria-hidden="true" />}</label>;
}
