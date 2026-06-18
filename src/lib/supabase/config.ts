/**
 * Central Supabase connection values.
 * Accepts either env var name for the public key:
 *   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  (newer "sb_publishable_..." keys)
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY         (legacy anon key)
 * Both references are statically inlined by Next.js for the browser bundle.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}
