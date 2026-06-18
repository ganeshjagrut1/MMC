"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps } from "react";

const base =
  "w-full rounded-[var(--radius)] border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {hint && <p className="mb-1 text-xs text-muted">{hint}</p>}
      {children}
    </div>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Checkbox({
  label,
  ...props
}: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" {...props} className="h-4 w-4 accent-[var(--c-primary)]" />
      {label}
    </label>
  );
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
