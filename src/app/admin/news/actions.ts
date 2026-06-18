"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

function read(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const published = formData.get("published") === "on";
  const s = (k: string) => String(formData.get(k) ?? "").trim() || null;
  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    excerpt: s("excerpt"),
    content: s("content"),
    cover_image_url: s("cover_image_url"),
    category: s("category"),
    published,
  };
}

export async function createNews(formData: FormData) {
  const data = read(formData);
  if (!data.title || !data.slug) return;
  const supabase = await createClient();
  await supabase.from("news").insert({
    ...data,
    published_at: data.published ? new Date().toISOString() : null,
  });
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(
  id: string,
  prevPublishedAt: string | null,
  formData: FormData,
) {
  const data = read(formData);
  if (!data.title || !data.slug) return;
  // Set published_at the first time it goes live; keep the original otherwise.
  const published_at = data.published
    ? (prevPublishedAt ?? new Date().toISOString())
    : null;

  const supabase = await createClient();
  await supabase.from("news").update({ ...data, published_at }).eq("id", id);
  revalidatePath("/news");
  revalidatePath(`/news/${data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("news").delete().eq("id", id);
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}
