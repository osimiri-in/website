import { NextRequest, NextResponse } from "next/server";
import { MEDIA_BUCKET, listMedia } from "@/lib/media";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";

function notConfigured() {
  return NextResponse.json({ error: SUPABASE_SETUP_MESSAGE }, { status: 503 });
}

export async function GET() {
  const items = await listMedia();
  return NextResponse.json({ items });
}

export async function DELETE(request: NextRequest) {
  if (!isSupabaseConfigured()) return notConfigured();

  const { name } = (await request.json().catch(() => ({}))) as { name?: string };
  if (!name) {
    return NextResponse.json({ error: "Missing file name." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([name]);
  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
