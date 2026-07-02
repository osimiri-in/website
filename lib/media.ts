import "server-only";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export const MEDIA_BUCKET = "product-images";

export type MediaItem = {
  name: string;
  url: string;
  size?: number;
  createdAt?: string;
};

/** List uploaded assets from the Storage bucket (newest first). */
export async function listMedia(limit = 200): Promise<MediaItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .list("", { limit, sortBy: { column: "created_at", order: "desc" } });
    if (error || !data) return [];
    return data
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => {
        const { data: pub } = supabase.storage
          .from(MEDIA_BUCKET)
          .getPublicUrl(f.name);
        return {
          name: f.name,
          url: pub.publicUrl,
          size: (f.metadata as { size?: number } | null)?.size,
          createdAt: f.created_at,
        };
      });
  } catch {
    return [];
  }
}

export async function getMediaCount(): Promise<number> {
  return (await listMedia()).length;
}
