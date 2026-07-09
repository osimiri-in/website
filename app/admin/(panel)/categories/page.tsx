import { getCategoryTree } from "@/lib/categories";
import { isSupabaseConfigured } from "@/lib/supabase";
import { CategoriesManager } from "../../_components/CategoriesManager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const tree = await getCategoryTree();
  return <CategoriesManager tree={tree} configured={isSupabaseConfigured()} />;
}
