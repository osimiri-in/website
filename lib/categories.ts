import "server-only";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export const CATEGORIES_TABLE = "categories";

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  position: number;
};

export type CategoryWithChildren = Category & {
  children: Category[];
  productCount: number;
};

type Row = Record<string, unknown>;

function rowToCategory(row: Row): Category {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    parentId: (row.parent_id as string) ?? undefined,
    position: (row.position as number) ?? 0,
  };
}

/** Flat list of all categories, ordered. Empty if the table isn't set up yet. */
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(CATEGORIES_TABLE)
      .select("*")
      .order("position", { ascending: true });
    if (error || !data) return [];
    return data.map(rowToCategory);
  } catch {
    return [];
  }
}

/** Parent categories with their children nested and a product count each. */
export async function getCategoryTree(): Promise<CategoryWithChildren[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabaseServerClient();

  const [{ data: cats }, { data: products }] = await Promise.all([
    supabase.from(CATEGORIES_TABLE).select("*").order("position"),
    supabase.from("products").select("category_id"),
  ]);
  if (!cats) return [];

  const counts = new Map<string, number>();
  for (const p of products ?? []) {
    const cid = (p as Row).category_id as string | null;
    if (cid) counts.set(cid, (counts.get(cid) ?? 0) + 1);
  }

  const all = cats.map(rowToCategory);
  const parents = all.filter((c) => !c.parentId);
  return parents.map((parent) => {
    const children = all.filter((c) => c.parentId === parent.id);
    const productCount =
      (counts.get(parent.id) ?? 0) +
      children.reduce((sum, c) => sum + (counts.get(c.id) ?? 0), 0);
    return { ...parent, children, productCount };
  });
}
