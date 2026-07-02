import "server-only";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export const ACTIVITY_TABLE = "activity_log";

export type ActivityAction =
  | "created"
  | "updated"
  | "deleted"
  | "published"
  | "uploaded";

export type ActivityEntry = {
  id: string;
  action: ActivityAction;
  entity: string;
  entityId?: string;
  title: string;
  createdAt: string;
};

/** Best-effort activity logging — never throws (won't break the write it records). */
export async function logActivity(
  action: ActivityAction,
  title: string,
  opts: { entity?: string; entityId?: string } = {},
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createSupabaseServerClient();
    await supabase.from(ACTIVITY_TABLE).insert({
      action,
      title,
      entity: opts.entity ?? "product",
      entity_id: opts.entityId ?? null,
    });
  } catch {
    // activity_log table may not exist yet — ignore.
  }
}

export async function getRecentActivity(limit = 8): Promise<ActivityEntry[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(ACTIVITY_TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map((r) => ({
      id: r.id as string,
      action: r.action as ActivityAction,
      entity: r.entity as string,
      entityId: (r.entity_id as string) ?? undefined,
      title: r.title as string,
      createdAt: r.created_at as string,
    }));
  } catch {
    return [];
  }
}
