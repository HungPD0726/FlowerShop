"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { CalendarBlank, CheckCircle, Envelope, Phone } from "@phosphor-icons/react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUIStore } from "@/stores/useUIStore";
import { changePasswordSchema, ChangePasswordFormValues } from "@/schemas/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/format";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { addToast } = useUIStore();
  const form = useForm<ChangePasswordFormValues>({ resolver: zodResolver(changePasswordSchema), defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" } });
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = form;

  useEffect(() => {
    authService.getCurrentUser().then((response) => { if (response.success) setUser(response.data); }).catch(() => undefined);
  }, [setUser]);

  async function changePassword(values: ChangePasswordFormValues) {
    try {
      const response = await authService.changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      if (!response.success) throw new Error(response.message);
      reset();
      addToast("success", "Mật khẩu đã được thay đổi.");
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors as Record<string, string> | undefined;
        Object.entries(serverErrors || {}).forEach(([field, message]) => {
          if (field === "currentPassword" || field === "newPassword" || field === "confirmPassword") setError(field, { type: "server", message });
        });
        addToast("error", error.response?.data?.message || "Chưa thể đổi mật khẩu.");
      } else addToast("error", "Chưa thể đổi mật khẩu.");
    }
  }

  if (!user) return null;
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className="eyebrow">Thông tin đọc</p>
        <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Hồ sơ của bạn.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Thông tin hồ sơ hiện do hệ thống quản lý. Bạn vẫn có thể đổi mật khẩu bên dưới.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Info icon={<Envelope />} label="Email" value={user.email} />
          <Info icon={<Phone />} label="Điện thoại" value={user.phone || "Chưa cập nhật"} />
          <Info icon={<CalendarBlank />} label="Tham gia" value={user.createdAt ? formatDate(user.createdAt) : "Chưa có dữ liệu"} />
        </div>
        {user.emailVerified && <p className="mt-6 flex items-center gap-2 text-xs font-bold text-success"><CheckCircle weight="fill" /> Email đã xác minh</p>}
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-3xl font-semibold text-ink">Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit(changePassword)} noValidate className="mt-6 max-w-xl space-y-4">
          <Input label="Mật khẩu hiện tại" type="password" autoComplete="current-password" error={errors.currentPassword?.message} {...register("currentPassword")} />
          <Input label="Mật khẩu mới" type="password" autoComplete="new-password" error={errors.newPassword?.message} {...register("newPassword")} />
          <Input label="Nhập lại mật khẩu mới" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
          <Button type="submit" isLoading={isSubmitting}>Cập nhật mật khẩu</Button>
        </form>
      </section>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-[10px] border border-line bg-canvas p-4"><span className="text-accent">{icon}</span><p className="mt-4 text-xs text-muted">{label}</p><p className="mt-1 truncate text-sm font-bold text-ink">{value}</p></div>;
}
