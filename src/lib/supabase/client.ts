"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";
import { SUPABASE_URL, SUPABASE_KEY } from "./config";

/**
 * Browser-side Supabase client (for Client Components).
 * Uses the public publishable/anon key — safe to ship; RLS protects data.
 */
export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);
}
