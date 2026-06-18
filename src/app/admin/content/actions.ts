"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { CONTENT_BLOCKS, type ContentKey } from "@/lib/content-schema";

export type SaveState = { ok: boolean; error?: string };

export async function saveContent(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const key = String(formData.get("key") ?? "");
  if (!(key in CONTENT_BLOCKS)) {
    return { ok: false, error: "Unknown content block." };
  }

  let data: unknown;
  try {
    data = JSON.parse(String(formData.get("data") ?? "{}"));
  } catch {
    return { ok: false, error: "Could not read the submitted content." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key: key as ContentKey, data: data as Record<string, unknown> });

  if (error) {
    return { ok: false, error: "Failed to save. Please try again." };
  }

  // Refresh the public pages that consume this content.
  revalidatePath("/", "layout");
  return { ok: true };
}
