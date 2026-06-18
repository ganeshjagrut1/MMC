import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { NewsForm } from "../news-form";

type Params = { params: Promise<{ id: string }> };

export default async function EditNewsPage({ params }: Params) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/news"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to news
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">Edit Post</h1>
      <div className="mt-6">
        <NewsForm post={post} />
      </div>
    </div>
  );
}
