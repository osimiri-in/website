import "server-only";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export const MEDIA_BUCKET = "product-images";
const PRODUCT_MEDIA_FIELDS = [
  { column: "main_image_link", label: "Main image" },
  { column: "gallery_image_links", label: "Gallery image" },
  { column: "lifestyle_image_links", label: "Lifestyle image" },
  { column: "detail_closeup_links", label: "Detail close-up" },
  { column: "swatch_image_links", label: "Swatch image" },
] as const;

export type MediaItem = {
  name: string;
  path: string;
  url: string;
  size?: number;
  createdAt?: string;
  contentType?: string;
  source: "storage" | "product";
  productTitle?: string;
  productField?: string;
  deletable: boolean;
};

/** List uploaded assets from the Storage bucket (newest first). */
export async function listMedia(limit = 1000): Promise<MediaItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createSupabaseServerClient();
    const items: MediaItem[] = [];

    async function collect(prefix = "") {
      if (items.length >= limit) return;

      const { data, error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .list(prefix, { limit, sortBy: { column: "created_at", order: "desc" } });
      if (error || !data) return;

      for (const file of data) {
        if (items.length >= limit || !file.name || file.name.startsWith(".")) continue;

        const metadata = file.metadata as
          | { size?: number; mimetype?: string; mimeType?: string }
          | null;
        const path = prefix ? `${prefix}/${file.name}` : file.name;

        if (!metadata) {
          await collect(path);
          continue;
        }

        const { data: pub } = supabase.storage
          .from(MEDIA_BUCKET)
          .getPublicUrl(path);
        items.push({
          name: file.name,
          path,
          url: pub.publicUrl,
          size: metadata.size,
          createdAt: file.created_at ?? undefined,
          contentType: metadata.mimetype ?? metadata.mimeType,
          source: "storage",
          deletable: true,
        });
      }
    }

    await collect();
    await collectProductMedia(supabase, items, limit);

    return items.sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    );
  } catch {
    return [];
  }
}

export async function getMediaCount(): Promise<number> {
  return (await listMedia()).length;
}

async function collectProductMedia(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  items: MediaItem[],
  limit: number,
) {
  if (items.length >= limit) return;

  const mediaColumns = PRODUCT_MEDIA_FIELDS.map((field) => field.column).join(",");
  const { data, error } = await supabase
    .from("products")
    .select(`id,title,created_at,${mediaColumns}`)
    .limit(1000);

  if (error || !data) return;

  const existingUrls = new Map(items.map((item) => [normalizeUrl(item.url), item]));

  for (const row of data as unknown as Record<string, unknown>[]) {
    if (items.length >= limit) break;

    for (const field of PRODUCT_MEDIA_FIELDS) {
      const urls = toUrlList(row[field.column]);
      for (const url of urls) {
        if (items.length >= limit) break;

        const key = normalizeUrl(url);
        const existing = existingUrls.get(key);
        if (existing) {
          existing.productTitle ??= String(row.title || "Untitled product");
          existing.productField ??= field.label;
          continue;
        }

        const item: MediaItem = {
          name: getUrlName(url),
          path: url,
          url,
          createdAt: (row.created_at as string | undefined) ?? undefined,
          contentType: getImageContentType(url),
          source: "product",
          productTitle: String(row.title || "Untitled product"),
          productField: field.label,
          deletable: false,
        };

        items.push(item);
        existingUrls.set(key, item);
      }
    }
  }
}

function toUrlList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function normalizeUrl(url: string) {
  return url.trim();
}

function getUrlName(url: string) {
  try {
    const parsed = new URL(url);
    return decodeURIComponent(parsed.pathname.split("/").filter(Boolean).pop() || url);
  } catch {
    return url.split("/").filter(Boolean).pop() || url;
  }
}

function getImageContentType(url: string) {
  const cleanPath = url.split("?")[0].toLowerCase();
  if (cleanPath.endsWith(".jpg") || cleanPath.endsWith(".jpeg")) return "image/jpeg";
  if (cleanPath.endsWith(".png")) return "image/png";
  if (cleanPath.endsWith(".webp")) return "image/webp";
  if (cleanPath.endsWith(".avif")) return "image/avif";
  if (cleanPath.endsWith(".gif")) return "image/gif";
  return "image/*";
}
