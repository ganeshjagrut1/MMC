import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { deleteNews } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/format";

export default async function AdminNewsPage() {
  let posts: Array<{
    id: string;
    title: string;
    category: string | null;
    published: boolean;
    published_at: string | null;
  }> = [];

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("id, title, category, published, published_at")
      .order("created_at", { ascending: false });
    posts = data ?? [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">News & Notices</h1>
        <Link
          href="/admin/news/new"
          className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          + Add post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
        {posts.length === 0 ? (
          <p className="p-6 text-sm text-muted">No news posts yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-bg text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-secondary">
                    {p.title}
                  </td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {formatDate(p.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/news/${p.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteNews}>
                        <input type="hidden" name="id" value={p.id} />
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
