import { NextRequest, NextResponse } from "next/server";
import { productInputSchema } from "@/lib/product-schema";
import {
  PRODUCTS_TABLE,
  getProductById,
  inputToRow,
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

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

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
    .update(inputToRow(result.data))
    .eq("id", id)
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

  return NextResponse.json({ product: rowToProduct(data) });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq("id", id);
  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
