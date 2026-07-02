import { NextRequest, NextResponse } from "next/server";
import { productInputSchema } from "@/lib/product-schema";
import {
  PRODUCTS_TABLE,
  inputToRow,
  listAllProductsAdmin,
  rowToProduct,
} from "@/lib/products";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";

function notConfigured() {
  return NextResponse.json(
    { error: SUPABASE_SETUP_MESSAGE },
    { status: 503 },
  );
}

export async function GET() {
  const products = await listAllProductsAdmin();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) return notConfigured();

  const payload = await request.json().catch(() => null);
  const result = productInputSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid product.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert(inputToRow(result.data))
    .select("*")
    .single();

  if (error) {
    const conflict = error.code === "23505";
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json(
      {
        error: conflict
          ? "A product with this slug or product ID already exists."
          : error.message,
      },
      { status: conflict ? 409 : 500 },
    );
  }

  return NextResponse.json({ product: rowToProduct(data) }, { status: 201 });
}
