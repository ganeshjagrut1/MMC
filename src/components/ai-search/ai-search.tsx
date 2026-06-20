"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Result = { title: string; url: string; snippet: string };

const SUGGESTIONS = [
  "MBBS admission",
  "Departments",
  "Library",
  "Contact",
];

export function AISearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = useCallback(async (q: string) => {
    const question = q.trim();
    if (!question || loading) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });
      const data = (await res.json()) as { results?: Result[] };
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
    // `loading` only guards re-entry; safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open automatically when the page is reached with ?q=... (sitelinks search
  // box / shared links). Deferred so we don't call setState synchronously.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q) return;
    const t = setTimeout(() => {
      setOpen(true);
      setQuery(q);
      void ask(q);
    }, 0);
    return () => clearTimeout(t);
  }, [ask]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(false);
    setSearched(false);
    setResults([]);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search this website"
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary ${className}`}
      >
        <span aria-hidden>✨</span>
        <span>Ask AI</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[10vh]"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Search this website"
              className="w-full max-w-xl overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-2xl"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void ask(query);
                }}
                className="flex items-center gap-2 border-b border-border p-3"
              >
                <span aria-hidden className="pl-1 text-lg">
                  ✨
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Mauli Medical College…"
                  className="flex-1 bg-transparent px-1 py-1.5 text-sm text-text outline-none"
                  maxLength={200}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {loading ? "…" : "Search"}
                </button>
              </form>

              <div className="max-h-[50vh] overflow-y-auto p-4 text-sm text-text">
                {!searched && (
                  <div className="space-y-2">
                    <p className="text-muted">Try searching:</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setQuery(s);
                            void ask(s);
                          }}
                          className="rounded-full border border-border px-3 py-1 text-xs text-secondary hover:border-primary hover:text-primary"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {loading && <p className="text-muted">Searching…</p>}

                {!loading && searched && results.length === 0 && (
                  <p className="text-muted">
                    No matching pages found on this site. Visit the{" "}
                    <Link
                      href="/contact"
                      onClick={close}
                      className="font-medium text-primary underline"
                    >
                      Contact page
                    </Link>{" "}
                    for help.
                  </p>
                )}

                {!loading && results.length > 0 && (
                  <ul className="space-y-3">
                    {results.map((r) => (
                      <li key={r.url}>
                        <Link
                          href={r.url}
                          onClick={close}
                          className="block rounded-md p-2 transition-colors hover:bg-bg"
                        >
                          <span className="font-semibold text-primary">
                            {r.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                            {r.snippet}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="border-t border-border px-4 py-2 text-[0.7rem] text-muted">
                Results come only from this website.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
