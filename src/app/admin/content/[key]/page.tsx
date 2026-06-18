import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT_BLOCKS, type ContentKey } from "@/lib/content-schema";
import { getContent } from "@/lib/content";
import { ContentEditor } from "@/components/admin/content-editor";

type Params = { params: Promise<{ key: string }> };

export default async function EditContentPage({ params }: Params) {
  const { key } = await params;
  if (!(key in CONTENT_BLOCKS)) notFound();

  const typedKey = key as ContentKey;
  const block = CONTENT_BLOCKS[typedKey];
  const initial = await getContent(typedKey);

  return (
    <div>
      <Link
        href="/admin/content"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to content
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">{block.title}</h1>
      <p className="mt-1 text-sm text-muted">{block.description}</p>

      <div className="mt-8 max-w-2xl rounded-[var(--radius)] border border-border bg-surface p-6">
        <ContentEditor block={block} initial={initial as Record<string, unknown>} />
      </div>
    </div>
  );
}
