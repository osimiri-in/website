import { getCategories } from "@/lib/categories";
import { ProductForm } from "../../../_components/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();
  return <ProductForm categories={categories} />;
}
