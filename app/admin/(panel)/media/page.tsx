import { listMedia } from "@/lib/media";
import { isSupabaseConfigured } from "@/lib/supabase";
import { MediaLibrary } from "../../_components/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const items = await listMedia();
  return <MediaLibrary items={items} configured={isSupabaseConfigured()} />;
}
