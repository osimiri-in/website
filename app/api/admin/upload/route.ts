import { NextRequest, NextResponse } from "next/server";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";
import { PRODUCTS_TABLE } from "@/lib/products";
import { slugify } from "@/lib/utils";

const BUCKET = "product-images";
const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

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

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

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
  }

  return NextResponse.json({ urls });
}
