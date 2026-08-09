"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/format";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const messageId = `${inputId}-message`;

    return (
      <div className="flex w-full flex-col gap-2">
        {label && <label htmlFor={inputId} className="text-sm font-semibold text-ink">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={cn(
            "min-h-11 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted/90 transition-[border-color,box-shadow,background-color] duration-300 ease-editorial focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 disabled:cursor-not-allowed disabled:bg-surface-muted",
            error && "border-danger focus:border-danger focus:ring-danger/10",
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <span id={messageId} className={cn("text-xs leading-relaxed text-muted", error && "font-medium text-danger")}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
