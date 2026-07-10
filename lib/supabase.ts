import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const SUPABASE_SETUP_MESSAGE =
  "The catalog isn't fully set up yet, so this action isn't available. Please contact your site administrator.";

type SupabaseLikeError = {
  code?: string;
  message?: string;
};

export function isSupabaseConfigured() {
  return Boolean(url && (serviceRoleKey || anonKey));
}

export function isSupabaseSetupError(error: unknown) {
  const err = error as SupabaseLikeError | null | undefined;
  const message = err?.message?.toLowerCase() ?? "";
  return (
    err?.code === "PGRST205" ||
    err?.code === "42P01" ||
    message.includes("could not find the table") ||
    message.includes("schema cache") ||
    message.includes("bucket not found")
  );
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
