import { getAdminProductsState } from "@/lib/products";
import { ProductsTable } from "../../_components/ProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { products, writable } = await getAdminProductsState();
  return (
    <ProductsTable
      initialProducts={products}
      configured={writable}
    />
  );
}
