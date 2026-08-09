"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/utils/format";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-line/80 bg-surface p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-editorial",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "primary" | "secondary" | "danger" }) {
  const variants = {
    default: "border-line bg-surface-muted text-ink",
    primary: "border-accent/20 bg-accent-soft text-accent",
    secondary: "border-ink bg-ink text-surface",
    danger: "border-danger/20 bg-danger/10 text-danger",
  };

  return (
    <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
