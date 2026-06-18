import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { CONTENT_BLOCKS, type ContentKey } from "@/lib/content-schema";

/**
 * Server-side accessors for the dynamic content system.
 * Schema + defaults live in content-schema.ts (pure, client-safe).
 */

// Widen the `as const` literal defaults to their base types (e.g. the
// specific string "/images/..." becomes `string`). Without this, admin
// overrides wouldn't type-check and literal narrowing breaks conditionals.
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;

type ContentOf<K extends ContentKey> = Widen<
  (typeof CONTENT_BLOCKS)[K]["default"]
>;

/** Read a content block: code defaults merged with any admin override. */
export async function getContent<K extends ContentKey>(
  key: K,
): Promise<ContentOf<K>> {
  const fallback = CONTENT_BLOCKS[key].default as ContentOf<K>;
  if (!isSupabaseConfigured()) return fallback;

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("data")
    .eq("key", key)
    .maybeSingle();

  if (!data?.data || typeof data.data !== "object") return fallback;
  return { ...fallback, ...(data.data as object) } as ContentOf<K>;
}

/** Convenience accessor for the site-wide info block. */
export async function getSiteInfo() {
  return getContent("site_info");
}
