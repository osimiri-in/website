import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  PRODUCT_STATUSES,
  productInputSchema,
} from "@/lib/product-schema";
import { PRODUCTS_TABLE, inputToRow } from "@/lib/products";
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

const bulkSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("delete"), ids: z.array(z.string()).min(1) }),
  z.object({
    action: z.literal("setStatus"),
    ids: z.array(z.string()).min(1),
    status: z.enum(PRODUCT_STATUSES),
  }),
  z.object({
    action: z.literal("upsert"),
    products: z.array(productInputSchema).min(1),
  }),
]);

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) return notConfigured();

  const payload = await request.json().catch(() => null);
  const parsed = bulkSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid bulk request.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const body = parsed.data;

  if (body.action === "delete") {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .delete()
      .in("id", body.ids);
    if (error) {
      if (isSupabaseSetupError(error)) return notConfigured();
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, deleted: body.ids.length });
  }

  if (body.action === "setStatus") {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ status: body.status })
      .in("id", body.ids);
    if (error) {
      if (isSupabaseSetupError(error)) return notConfigured();
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, updated: body.ids.length });
  }

  // upsert (CSV import) — conflict on slug so re-imports update existing rows.
  const rows = body.products.map(inputToRow);
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .upsert(rows, { onConflict: "slug" })
    .select("id");

  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, upserted: data?.length ?? 0 });
}
