import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CATEGORIES_TABLE } from "@/lib/categories";
import { logActivity } from "@/lib/activity";
import { slugify } from "@/lib/utils";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";

const patchSchema = z.object({ name: z.string().trim().min(1) });

function notConfigured() {
  return NextResponse.json({ error: SUPABASE_SETUP_MESSAGE }, { status: 503 });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

  const payload = await request.json().catch(() => null);
  const result = patchSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .update({ name: result.data.name, slug: slugify(result.data.name) })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ category: data });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

  const supabase = createSupabaseServerClient();
  // Children cascade via the FK; products keep their text category, category_id nulls.
  const { error } = await supabase.from(CATEGORIES_TABLE).delete().eq("id", id);
  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  await logActivity("deleted", "a category", { entity: "category", entityId: id });
  return NextResponse.json({ ok: true });
}
