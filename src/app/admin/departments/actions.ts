"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

function read(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    short_description:
      String(formData.get("short_description") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createDepartment(formData: FormData) {
  const data = read(formData);
  if (!data.name || !data.slug) return;
  const supabase = await createClient();
  await supabase.from("departments").insert(data);
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
  redirect("/admin/departments");
}

export async function updateDepartment(id: string, formData: FormData) {
  const data = read(formData);
  if (!data.name || !data.slug) return;
  const supabase = await createClient();
  await supabase.from("departments").update(data).eq("id", id);
  revalidatePath("/departments");
  revalidatePath(`/departments/${data.slug}`);
  revalidatePath("/admin/departments");
  redirect("/admin/departments");
}

export async function deleteDepartment(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("departments").delete().eq("id", id);
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
}
