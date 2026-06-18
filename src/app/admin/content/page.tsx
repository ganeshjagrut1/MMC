import Link from "next/link";
import { CONTENT_BLOCK_LIST } from "@/lib/content-schema";

export default function ContentListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Page Content</h1>
      <p className="mt-1 text-sm text-muted">
        Edit the text shown on the public pages. Changes appear on the site
        immediately after saving.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CONTENT_BLOCK_LIST.map((block) => (
          <Link
            key={block.key}
            href={`/admin/content/${block.key}`}
            className="rounded-[var(--radius)] border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <h2 className="font-semibold text-secondary">{block.title}</h2>
            <p className="mt-1 text-sm text-muted">{block.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
