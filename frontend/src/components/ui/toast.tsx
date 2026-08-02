"use client";

import { CheckCircle, Info, WarningCircle, X } from "@phosphor-icons/react";
import { useUIStore } from "@/stores/useUIStore";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === "error" ? "alert" : "status"}
          className={`flex items-center justify-between rounded-2xl border bg-surface p-4 text-sm text-ink shadow-float ${
            toast.type === "success" ? "border-success/20" : toast.type === "error" ? "border-danger/20" : "border-accent/20"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && <CheckCircle className="shrink-0 text-success" />}
            {toast.type === "error" && <WarningCircle className="shrink-0 text-danger" />}
            {toast.type === "info" && <Info className="shrink-0 text-accent" />}
            <span>{toast.message}</span>
          </div>
          <button aria-label="Đóng thông báo" onClick={() => removeToast(toast.id)} className="ml-3 grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-surface-muted hover:text-ink">
            <X />
          </button>
        </div>
      ))}
    </div>
  );
}
