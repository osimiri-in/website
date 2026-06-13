import { NextRequest, NextResponse } from "next/server";
import { formSchemas, type AllowedFormTable } from "@/lib/forms";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

const allowedTables = Object.keys(formSchemas) as AllowedFormTable[];

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ table: string }> },
) {
  const { table } = await context.params;

  if (!allowedTables.includes(table as AllowedFormTable)) {
    return NextResponse.json({ error: "Unsupported form table." }, { status: 404 });
  }

  const payload = await request.json();
  const schema = formSchemas[table as AllowedFormTable];
  const result = schema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid payload.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      mode: "mock",
      message:
        "Form accepted locally. Paste Supabase keys into .env.local to persist submissions.",
    });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from(table).insert(result.data);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, mode: "supabase" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected form failure.",
      },
      { status: 500 },
    );
  }
}
