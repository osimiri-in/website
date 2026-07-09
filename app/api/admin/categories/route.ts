import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CATEGORIES_TABLE, getCategoryTree } from "@/lib/categories";
import { logActivity } from "@/lib/activity";
import { slugify } from "@/lib/utils";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";

const categoryInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  parentId: z
    .string()
    .optional()
    .transform((v) => (v ? v : undefined)),
  slug: z.string().trim().optional(),
});

function notConfigured() {
  return NextResponse.json({ error: SUPABASE_SETUP_MESSAGE }, { status: 503 });
}

export async function GET() {
  const tree = await getCategoryTree();
  return NextResponse.json({ tree });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) return notConfigured();

  const payload = await request.json().catch(() => null);
  const result = categoryInputSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid category.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .insert({
      name: result.data.name,
      slug: result.data.slug?.trim() || slugify(result.data.name),
      parent_id: result.data.parentId ?? null,
    })
    .select("*")
    .single();

  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    const conflict = error.code === "23505";
    return NextResponse.json(
      { error: conflict ? "A category with this slug already exists." : error.message },
      { status: conflict ? 409 : 500 },
    );
  }

  await logActivity("created", `category “${result.data.name}”`, {
    entity: "category",
    entityId: data.id as string,
  });
  return NextResponse.json({ category: data }, { status: 201 });
}
