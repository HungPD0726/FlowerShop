"use client";

import React, { useId } from "react";
import { cn } from "@/utils/format";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const messageId = `${textareaId}-message`;

    return (
      <div className="flex w-full flex-col gap-2">
        {label && <label htmlFor={textareaId} className="text-sm font-semibold text-ink">{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={cn(
            "min-h-28 w-full resize-y rounded-[10px] border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-300 ease-editorial focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10",
            error && "border-danger focus:border-danger focus:ring-danger/10",
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <span id={messageId} className={cn("text-xs text-muted", error && "font-medium text-danger")}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
