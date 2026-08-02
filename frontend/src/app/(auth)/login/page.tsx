"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUIStore } from "@/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { addToast } = useUIStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Email chưa đúng định dạng";
    if (!password) nextErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (!response.success) throw new Error(response.message);
      setUser({ id: response.data.id, fullName: response.data.fullName, email: response.data.email, roles: response.data.roles, isActive: true, emailVerified: true, createdAt: "" });
      addToast("success", "Đăng nhập thành công.");
      router.replace(response.data.roles.includes("ROLE_ADMIN") ? "/admin/dashboard" : "/account/orders");
    } catch (error) {
      addToast("error", isAxiosError(error) ? error.response?.data?.message || "Email hoặc mật khẩu chưa đúng." : "Chưa thể đăng nhập.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="eyebrow">Chào mừng trở lại</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-[-0.045em] text-ink">Đăng nhập.</h1>
      <p className="mt-4 text-sm leading-6 text-muted">Theo dõi đơn hoa, lưu địa chỉ và đặt lại nhanh hơn.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Input label="Email" type="email" autoComplete="email" value={email} error={errors.email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined })); }} />
        <div className="relative">
          <Input label="Mật khẩu" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} error={errors.password} className="pr-12" onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })); }} />
          <button type="button" className="absolute right-2 top-7 grid min-h-11 min-w-11 place-items-center text-muted hover:text-ink" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeSlash /> : <Eye />}</button>
        </div>
        <Button type="submit" size="lg" isLoading={loading} className="w-full">Đăng nhập</Button>
      </form>
      <p className="mt-7 border-t border-line pt-6 text-center text-sm text-muted">Chưa có tài khoản? <Link href="/register" className="font-bold text-accent hover:underline">Đăng ký</Link></p>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 rounded-[10px] bg-surface-muted p-4 text-xs leading-5 text-muted"><p className="font-bold text-ink">Tài khoản phát triển</p><p>Admin: admin@lahoa.vn / Password@123456</p><p>Khách: khachhang1@gmail.com / Password@123456</p></div>
      )}
    </div>
  );
}
