import Link from "next/link";
import Image from "next/image";
import type { News } from "@/lib/supabase/types";
import { HoverLift } from "@/components/ui/motion";
import { formatDate } from "@/lib/format";

const FALLBACK_COVER = "/images/medical.jpg";

/** News listing card with cover image. */
export function NewsCard({ post }: { post: News }) {
  return (
    <HoverLift>
      <Link href={`/news/${post.slug}`} className="block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface transition-colors hover:border-primary">
          <div className="relative aspect-[16/9] bg-bg">
            <Image
              src={post.cover_image_url || FALLBACK_COVER}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-2">
              {post.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {post.category}
                </span>
              )}
              {post.published_at && (
                <time className="text-xs text-muted">
                  {formatDate(post.published_at)}
                </time>
              )}
            </div>
            <h3 className="mt-2 font-semibold text-secondary">{post.title}</h3>
            {post.excerpt && (
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            )}
          </div>
        </article>
      </Link>
    </HoverLift>
  );
}
