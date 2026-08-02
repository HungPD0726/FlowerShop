"use client";

import React from "react";
import { cn } from "@/utils/format";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line/80 bg-surface p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-editorial",
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
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "primary" | "secondary" | "danger" }) {
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
