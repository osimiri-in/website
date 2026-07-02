import "server-only";
import { demoProducts, type DemoProduct } from "@/lib/product-demo";
import {
  PRODUCT_FIELD_MAP,
  type Product,
  type ProductParsed,
} from "@/lib/product-schema";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export const PRODUCTS_TABLE = "products";

type Row = Record<string, unknown>;
export type AdminProductsState = {
  products: Product[];
  writable: boolean;
};

/** Map a Supabase row (snake_case) into the canonical Product (camelCase). */
export function rowToProduct(row: Row): Product {
  const out: Record<string, unknown> = { id: row.id };
  for (const [camel, snake] of Object.entries(PRODUCT_FIELD_MAP)) {
    out[camel] = row[snake] ?? undefined;
  }
  // Guarantee the non-nullable shape fields are at least present.
  out.galleryImageLinks = (row.gallery_image_links as string[]) ?? [];
  out.featuredProduct = Boolean(row.featured_product);
  out.dimensionsCustomizable = Boolean(row.dimensions_customizable);
  out.price = row.price != null ? Number(row.price) : undefined;
  out.updatedAt = (row.updated_at as string) ?? undefined;
  const cat = (row.category as string) || "";
  const sub = (row.sub_category as string) || "";
  out.categoryPath = sub ? (cat ? `${cat} / ${sub}` : sub) : cat;
  return out as Product;
}

/** Public products must never expose the numeric price. */
function toPublic(product: Product): Product {
  const { price: _price, ...rest } = product;
  return rest as Product;
}

/** Map a validated input into a Supabase row, filling slug/productId if blank. */
export function inputToRow(input: ProductParsed): Row {
  const slug = input.slug?.trim() || slugify(input.title);
  const productId =
    input.productId?.trim() || `OSI-${slug.slice(0, 12).toUpperCase()}`;
  const normalized: ProductParsed = { ...input, slug, productId };

  const row: Row = {};
  for (const [camel, snake] of Object.entries(PRODUCT_FIELD_MAP)) {
    const value = (normalized as Record<string, unknown>)[camel];
    if (value !== undefined) row[snake] = value;
  }
  return row;
}

/** Public catalogue — only Active products, newest first. */
export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return demoProducts as Product[];

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("status", "Active")
    .order("created_at", { ascending: false });

  if (error || !data) return demoProducts as Product[];
  return data.map((r) => toPublic(rowToProduct(r)));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return (demoProducts as Product[]).find((p) => p.slug === slug);
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("status", "Active")
    .maybeSingle();

  if (error) {
    return (demoProducts as Product[]).find((p) => p.slug === slug);
  }
  if (!data) return undefined;
  return toPublic(rowToProduct(data));
}

/** Admin listing — every status. */
export async function getAdminProductsState(): Promise<AdminProductsState> {
  if (!isSupabaseConfigured()) {
    return { products: demoProducts as Product[], writable: false };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { products: demoProducts as Product[], writable: false };
  }
  return { products: data.map(rowToProduct), writable: true };
}

export async function listAllProductsAdmin(): Promise<Product[]> {
  return (await getAdminProductsState()).products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) return undefined;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return undefined;
  return rowToProduct(data);
}

export type { DemoProduct };
