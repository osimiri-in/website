import { NextRequest, NextResponse } from "next/server";
import { formSchemas, type AllowedFormTable } from "@/lib/forms";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";
import { z } from "zod";

const allowedTables = Object.keys(formSchemas) as AllowedFormTable[];
type FormPayloadMap = {
  [K in AllowedFormTable]: z.infer<(typeof formSchemas)[K]>;
};

/** camelCase -> snake_case so payload keys match the Postgres column names. */
function toSnakeCaseKeys(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)] = v;
  }
  return out;
}

async function insertFormSubmission<T extends AllowedFormTable>(
  table: T,
  data: FormPayloadMap[T],
) {
  const supabase = createSupabaseServerClient();

  // Data is validated against the schema selected for this table before insert.
  // Keys are snake_cased to match the DB columns (e.g. sourcePage -> source_page).
  return supabase.from(table).insert(toSnakeCaseKeys(data as Record<string, unknown>) as never);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ table: string }> },
) {
  const { table } = await context.params;

  if (!allowedTables.includes(table as AllowedFormTable)) {
    return NextResponse.json({ error: "Unsupported form table." }, { status: 404 });
  }

  const formTable = table as AllowedFormTable;
  const payload = await request.json();
  const schema = formSchemas[formTable];
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
    const { error } = await insertFormSubmission(formTable, result.data);

    if (error) {
      if (isSupabaseSetupError(error)) {
        return NextResponse.json(
          {
            error:
              "We couldn't submit that right now. Please email info@osimiri.in or WhatsApp us and we'll respond quickly.",
          },
          { status: 503 },
        );
      }
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
