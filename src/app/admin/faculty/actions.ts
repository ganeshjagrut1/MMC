"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function read(formData: FormData) {
  const s = (k: string) => String(formData.get(k) ?? "").trim() || null;
  return {
    name: String(formData.get("name") ?? "").trim(),
    designation: s("designation"),
    department: s("department"),
    qualifications: s("qualifications"),
    bio: s("bio"),
    photo_url: s("photo_url"),
    email: s("email"),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createFaculty(formData: FormData) {
  const data = read(formData);
  if (!data.name) return;
  const supabase = await createClient();
  await supabase.from("faculty").insert(data);
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function updateFaculty(id: string, formData: FormData) {
  const data = read(formData);
  if (!data.name) return;
  const supabase = await createClient();
  await supabase.from("faculty").update(data).eq("id", id);
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function deleteFaculty(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("faculty").delete().eq("id", id);
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
}
