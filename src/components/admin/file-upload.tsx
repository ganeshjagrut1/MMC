"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Accept = "image" | "pdf";

/**
 * Upload-first file picker. The admin chooses a file; it uploads to the
 * Supabase "uploads" bucket and the public URL is created automatically.
 * (A "paste URL" option is tucked away for advanced use.)
 *
 * Modes:
 *  - Forms: pass `name` (+ optional `defaultValue`) → renders a hidden input.
 *  - Controlled: pass `value` + `onChange`.
 */
export function FileUpload({
  name,
  defaultValue,
  value,
  onChange,
  accept = "image",
}: {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (url: string) => void;
  accept?: Accept;
}) {
  const [url, setUrl] = useState(value ?? defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (u: string) => {
    setUrl(u);
    onChange?.(u);
  };

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "bin").toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("uploads")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("uploads").getPublicUrl(path);
      set(data.publicUrl); // URL is created automatically here
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed.";
      setError(
        /bucket not found/i.test(msg)
          ? "Storage isn't set up yet — run supabase/storage.sql once."
          : msg,
      );
    } finally {
      setBusy(false);
    }
  }

  const isImage = accept === "image";
  const acceptAttr = isImage ? "image/*" : "application/pdf,.pdf";

  return (
    <div className="rounded-[var(--radius)] border border-border bg-bg p-3">
      {name && <input type="hidden" name={name} value={url} />}

      <div className="flex items-center gap-4">
        {/* Preview */}
        {url ? (
          isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="preview"
              className="h-16 w-16 flex-none rounded-md border border-border object-cover"
            />
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-16 w-16 flex-none place-items-center rounded-md border border-border bg-surface text-xs font-semibold text-danger"
            >
              PDF
            </a>
          )
        ) : (
          <div className="grid h-16 w-16 flex-none place-items-center rounded-md border border-dashed border-border text-center text-[10px] leading-tight text-muted">
            no {isImage ? "image" : "file"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {busy
                ? "Uploading…"
                : url
                  ? `Replace ${isImage ? "image" : "PDF"}`
                  : `Upload ${isImage ? "image" : "PDF"}`}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => set("")}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-danger hover:border-danger"
              >
                Remove
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={acceptAttr}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />

          {/* Status line */}
          {url && !error ? (
            <p className="mt-2 truncate text-xs text-success">
              ✓ Uploaded — URL set automatically
            </p>
          ) : !error ? (
            <p className="mt-2 text-xs text-muted">
              Choose a file — the link is created for you.
            </p>
          ) : null}

          {error && <p className="mt-2 text-xs text-danger">{error}</p>}

          {/* Advanced: paste a URL */}
          <button
            type="button"
            onClick={() => setShowUrl((v) => !v)}
            className="mt-1 text-[11px] text-muted underline hover:text-primary"
          >
            {showUrl ? "Hide URL field" : "or paste a URL"}
          </button>
          {showUrl && (
            <input
              type="text"
              value={url}
              onChange={(e) => set(e.target.value)}
              placeholder="https://…"
              className="mt-1 w-full truncate rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted focus:border-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
