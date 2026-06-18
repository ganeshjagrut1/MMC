import { createClient } from "@/lib/supabase/server";
import type { Department, Faculty, News } from "@/lib/supabase/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  DEFAULT_DEPARTMENTS,
  findDefaultDepartment,
} from "@/lib/departments-data";

/** Re-exported so existing imports from "@/lib/data" keep working. */
export { isSupabaseConfigured };

export async function getDepartments(): Promise<Department[]> {
  if (!isSupabaseConfigured()) return DEFAULT_DEPARTMENTS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("departments")
    .select("*")
    .order("sort_order", { ascending: true });
  // Fall back to code defaults if the table is missing/empty.
  return data && data.length > 0 ? data : DEFAULT_DEPARTMENTS;
}

export async function getDepartmentBySlug(
  slug: string,
): Promise<Department | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("departments")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (data) return data;
  }
  return findDefaultDepartment(slug);
}

export async function getFaculty(): Promise<Faculty[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("faculty")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getPublishedNews(limit?: number): Promise<News[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  let query = supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return data ?? [];
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data ?? null;
}
