"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { authService } from "@/services/auth.service";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [values, setValues] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (values.fullName.trim().length < 2) next.fullName = "Vui lòng nhập họ tên";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Email chưa đúng định dạng";
    if (values.phone && !/^(0|\+84)[0-9]{9,10}$/.test(values.phone)) next.phone = "Số điện thoại chưa đúng định dạng";
    if (values.password.length < 6) next.password = "Mật khẩu cần ít nhất 6 ký tự";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      const response = await authService.register({ ...values, phone: values.phone || undefined });
      if (!response.success) throw new Error(response.message);
      addToast("success", "Tài khoản đã được tạo. Bạn có thể đăng nhập.");
      router.replace("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors as Record<string, string> | undefined;
        if (serverErrors) setErrors(serverErrors);
        addToast("error", error.response?.data?.message || "Đăng ký chưa thành công.");
      } else addToast("error", "Đăng ký chưa thành công.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="eyebrow">Một tài khoản, nhiều dịp</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-[-0.045em] text-ink">Tạo tài khoản.</h1>
      <p className="mt-4 text-sm leading-6 text-muted">Lưu thông tin để những lần gửi hoa sau nhẹ nhàng hơn.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <Input label="Họ và tên" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={(event) => update("fullName", event.target.value)} />
        <Input label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(event) => update("email", event.target.value)} />
        <Input label="Số điện thoại" inputMode="tel" autoComplete="tel" value={values.phone} error={errors.phone} helperText="Không bắt buộc" onChange={(event) => update("phone", event.target.value)} />
        <div className="relative">
          <Input label="Mật khẩu" type={showPassword ? "text" : "password"} autoComplete="new-password" value={values.password} error={errors.password} className="pr-12" onChange={(event) => update("password", event.target.value)} />
          <button type="button" className="absolute right-2 top-7 grid min-h-11 min-w-11 place-items-center text-muted hover:text-ink" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeSlash /> : <Eye />}</button>
        </div>
        <Button type="submit" size="lg" isLoading={loading} className="w-full">Tạo tài khoản</Button>
      </form>
      <p className="mt-7 border-t border-line pt-6 text-center text-sm text-muted">Đã có tài khoản? <Link href="/login" className="font-bold text-accent hover:underline">Đăng nhập</Link></p>
    </div>
  );
}
