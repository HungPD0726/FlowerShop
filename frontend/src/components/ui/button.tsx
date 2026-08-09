"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/format";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px active:scale-[0.99]";
    const variants = {
      primary: "bg-accent text-surface shadow-soft hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-float",
      secondary: "bg-ink text-surface hover:-translate-y-0.5 hover:bg-ink/90",
      outline: "border border-ink/25 bg-transparent text-ink hover:border-accent hover:bg-accent-soft hover:text-accent",
      ghost: "text-ink hover:bg-accent-soft/70",
      danger: "bg-danger text-surface hover:bg-danger/90",
    };
    const sizes = {
      sm: "px-4 text-xs",
      md: "px-6 text-sm",
      lg: "min-h-12 px-7 text-sm",
    };
    const styles = cn(baseStyles, variants[variant], sizes[size], className);
    if (asChild) {
      return <Slot ref={ref} className={styles} {...props}>{children}</Slot>;
    }
    return (
      <button ref={ref} className={styles} disabled={disabled || isLoading} aria-busy={isLoading || undefined} {...props}>
        {isLoading && <span aria-hidden="true" className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
        <span className={cn("inline-flex items-center gap-2", isLoading && "opacity-80")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
