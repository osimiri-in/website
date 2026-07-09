import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { ProductForm } from "../../../_components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);
  if (!product) notFound();
  return <ProductForm product={product} id={id} categories={categories} />;
}
