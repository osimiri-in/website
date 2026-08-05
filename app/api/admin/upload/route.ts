import { NextRequest, NextResponse } from "next/server";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";
import { PRODUCTS_TABLE } from "@/lib/products";
import { logActivity } from "@/lib/activity";
import { processImage } from "@/lib/image";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

const BUCKET = "product-images";
const MAX_BYTES = 30 * 1024 * 1024; // 30MB originals (compressed to <1MB on upload)
const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
];

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_SETUP_MESSAGE },
      { status: 503 },
    );
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const files = formData.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error: productsError } = await supabase
    .from(PRODUCTS_TABLE)
    .select("id")
    .limit(1);

  if (productsError && isSupabaseSetupError(productsError)) {
    return NextResponse.json(
      { error: SUPABASE_SETUP_MESSAGE },
      { status: 503 },
    );
  }

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || "unknown"}.` },
        { status: 415 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" exceeds the 10MB limit.` },
        { status: 413 },
      );
    }

    // Auto-resize + compress to <1MB (good quality) before storing.
    let processed;
    try {
      const input = Buffer.from(await file.arrayBuffer());
      processed = await processImage(input);
    } catch {
      return NextResponse.json(
        { error: `Couldn't process "${file.name}". Please try a JPG or PNG.` },
        { status: 422 },
      );
    }

    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${processed.ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, processed.buffer, {
        contentType: processed.contentType,
        upsert: false,
      });

    if (error) {
      if (isSupabaseSetupError(error)) {
        return NextResponse.json(
          { error: SUPABASE_SETUP_MESSAGE },
          { status: 503 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
    await logActivity("uploaded", file.name, { entity: "media" });
  }

  return NextResponse.json({ urls });
}
