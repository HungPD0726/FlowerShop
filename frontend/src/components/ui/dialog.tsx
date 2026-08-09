"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/utils/format";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ children, className, title, description }: { children: ReactNode; className?: string; title: string; description?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[40] bg-ink/40 backdrop-blur-sm data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[50] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] border border-line bg-surface p-6 shadow-float transition-[transform,opacity] duration-300 ease-editorial data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 motion-reduce:transition-none",
          className
        )}
      >
        <div className="pr-12">
          <DialogPrimitive.Title className="font-serif text-2xl font-semibold text-ink">{title}</DialogPrimitive.Title>
          {description && <DialogPrimitive.Description className="mt-1 text-sm leading-6 text-muted">{description}</DialogPrimitive.Description>}
        </div>
        <DialogPrimitive.Close aria-label="Đóng" className="absolute right-4 top-4 grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-surface-muted hover:text-ink">
          <X />
        </DialogPrimitive.Close>
        <div className="mt-6">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
