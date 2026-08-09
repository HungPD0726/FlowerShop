"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { ReactNode } from "react";
import { Button } from "./button";

export function ConfirmDialog({ trigger, title, description, confirmLabel = "Xác nhận", onConfirm, destructive = false }: { trigger: ReactNode; title: string; description: string; confirmLabel?: string; onConfirm: () => void | Promise<void>; destructive?: boolean }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[40] bg-ink/40 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[50] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-line bg-surface p-6 shadow-float">
          <AlertDialog.Title className="font-serif text-2xl font-semibold text-ink">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm leading-6 text-muted">{description}</AlertDialog.Description>
          <div className="mt-7 flex justify-end gap-3">
            <AlertDialog.Cancel asChild><Button variant="ghost">Hủy</Button></AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant={destructive ? "danger" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
