"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ContentBlock, Field } from "@/lib/content-schema";
import { saveContent, type SaveState } from "@/app/admin/content/actions";
import { Button } from "@/components/ui/primitives";
import { FileUpload } from "@/components/admin/file-upload";

const fieldClass =
  "w-full rounded-[var(--radius)] border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary";

type Data = Record<string, unknown>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function ContentEditor({
  block,
  initial,
}: {
  block: ContentBlock;
  initial: Data;
}) {
  const [data, setData] = useState<Data>(initial);
  const [state, formAction] = useActionState<SaveState, FormData>(
    saveContent,
    { ok: false },
  );

  const set = (name: string, value: unknown) =>
    setData((d) => ({ ...d, [name]: value }));

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="key" value={block.key} />
      <input type="hidden" name="data" value={JSON.stringify(data)} />

      {block.fields.map((field) => (
        <FieldEditor
          key={field.name}
          field={field}
          value={data[field.name]}
          onChange={(v) => set(field.name, v)}
        />
      ))}

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.ok && <span className="text-sm text-success">Saved!</span>}
        {state.error && (
          <span className="text-sm text-danger">{state.error}</span>
        )}
      </div>
    </form>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "text") {
    return (
      <Label field={field}>
        <input
          className={fieldClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </Label>
    );
  }

  if (field.type === "textarea") {
    return (
      <Label field={field}>
        <textarea
          rows={3}
          className={fieldClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </Label>
    );
  }

  if (field.type === "image" || field.type === "file") {
    return (
      <Label field={field}>
        <FileUpload
          accept={field.type === "image" ? "image" : "pdf"}
          value={(value as string) ?? ""}
          onChange={(u) => onChange(u)}
        />
      </Label>
    );
  }

  if (field.type === "lines") {
    const lines = Array.isArray(value) ? (value as string[]) : [];
    return (
      <Label field={field}>
        <textarea
          rows={5}
          className={fieldClass}
          value={lines.join("\n")}
          onChange={(e) =>
            onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))
          }
        />
      </Label>
    );
  }

  // type === "objects"
  const rows = Array.isArray(value) ? (value as Data[]) : [];
  const subFields = field.fields ?? [];

  const update = (i: number, name: string, v: string) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [name]: v } : r));
    onChange(next);
  };
  const add = () => {
    const blank: Data = {};
    subFields.forEach((sf) => (blank[sf.name] = ""));
    onChange([...rows, blank]);
  };
  const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{field.label}</p>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-[var(--radius)] border border-border bg-bg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">
                Item {i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs font-medium text-danger hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {subFields.map((sf) => (
                <div
                  key={sf.name}
                  className={
                    sf.type === "textarea" || sf.type === "image" || sf.type === "file"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label className="mb-1 block text-xs text-muted">
                    {sf.label}
                  </label>
                  {sf.type === "textarea" ? (
                    <textarea
                      rows={2}
                      className={fieldClass}
                      value={(row[sf.name] as string) ?? ""}
                      onChange={(e) => update(i, sf.name, e.target.value)}
                    />
                  ) : sf.type === "image" || sf.type === "file" ? (
                    <FileUpload
                      accept={sf.type === "image" ? "image" : "pdf"}
                      value={(row[sf.name] as string) ?? ""}
                      onChange={(u) => update(i, sf.name, u)}
                    />
                  ) : (
                    <input
                      className={fieldClass}
                      value={(row[sf.name] as string) ?? ""}
                      onChange={(e) => update(i, sf.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:border-primary"
      >
        + Add item
      </button>
    </div>
  );
}

function Label({
  field,
  children,
}: {
  field: Field;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{field.label}</label>
      {field.help && <p className="mb-1 text-xs text-muted">{field.help}</p>}
      {children}
    </div>
  );
}
