import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(url && (serviceRoleKey || anonKey));
}

export function createSupabaseServerClient() {
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  const key = serviceRoleKey ?? anonKey;
  if (!key) {
    throw new Error("Missing Supabase API key");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}
