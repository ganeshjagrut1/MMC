import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import type { ContactMessage } from "@/lib/supabase/types";
import { formatDate } from "@/lib/format";
import { DeleteButton } from "@/components/admin/delete-button";
import { toggleHandled, deleteMessage } from "./actions";

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    messages = data ?? [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Contact Messages</h1>
      <p className="mt-1 text-sm text-muted">
        Messages submitted through the public contact form.
      </p>

      <div className="mt-6 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-[var(--radius)] border border-border bg-surface p-6 text-sm text-muted">
            No messages yet.
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-[var(--radius)] border bg-surface p-5 ${
                m.handled ? "border-border opacity-70" : "border-primary/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-secondary">
                    {m.name}{" "}
                    {m.subject && (
                      <span className="font-normal text-muted">
                        — {m.subject}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted">
                    <a href={`mailto:${m.email}`} className="hover:text-primary">
                      {m.email}
                    </a>
                    {m.phone && <span> · {m.phone}</span>}
                  </p>
                </div>
                <time className="text-xs text-muted">
                  {formatDate(m.created_at)}
                </time>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-text">
                {m.message}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <form action={toggleHandled}>
                  <input type="hidden" name="id" value={m.id} />
                  <input
                    type="hidden"
                    name="handled"
                    value={String(m.handled)}
                  />
                  <button
                    type="submit"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {m.handled ? "Mark as unread" : "Mark as handled"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <DeleteButton />
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
