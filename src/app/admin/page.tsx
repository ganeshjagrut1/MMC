import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";

async function count(table: string): Promise<number | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

const CARDS = [
  { label: "Departments", table: "departments", href: "/admin/departments" },
  { label: "Faculty", table: "faculty", href: "/admin/faculty" },
  { label: "News posts", table: "news", href: "/admin/news" },
  { label: "Messages", table: "contact_messages", href: "/admin/messages" },
];

export default async function AdminDashboard() {
  const counts = await Promise.all(CARDS.map((c) => count(c.table)));

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage all website content from here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <Link
            key={c.table}
            href={c.href}
            className="rounded-[var(--radius)] border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-secondary">
              {counts[i] ?? "—"}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[var(--radius)] border border-border bg-surface p-6">
        <h2 className="font-semibold text-secondary">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href="/admin/content"
            className="rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary-dark"
          >
            Edit page content
          </Link>
          <Link
            href="/admin/news/new"
            className="rounded-md border border-border px-4 py-2 font-medium hover:border-primary"
          >
            Add news post
          </Link>
          <Link
            href="/admin/departments/new"
            className="rounded-md border border-border px-4 py-2 font-medium hover:border-primary"
          >
            Add department
          </Link>
          <Link
            href="/admin/faculty/new"
            className="rounded-md border border-border px-4 py-2 font-medium hover:border-primary"
          >
            Add faculty
          </Link>
        </div>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mt-6 rounded-[var(--radius)] border border-warning/40 bg-warning/10 p-4 text-sm text-text">
          Supabase is not configured yet. Add your keys to{" "}
          <code className="font-mono">.env.local</code> and restart the dev
          server.
        </div>
      )}
    </div>
  );
}
