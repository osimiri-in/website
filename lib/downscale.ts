/**
 * Client-side image downscale + compress, run BEFORE upload.
 *
 * Hosting platforms (e.g. Vercel) cap a serverless request body at ~4.5 MB, so
 * a large original (6 MB+) fails before it ever reaches the upload route. We
 * resize to a sane max dimension and re-encode as JPEG so the uploaded body is
 * small; the server still re-processes defensively to <1 MB.
 */
export async function downscaleImage(
  file: File,
  { maxDim = 2400, targetBytes = 1_800_000 }: { maxDim?: number; targetBytes?: number } = {},
): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/")) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    } as ImageBitmapOptions);
  } catch {
    // Undecodable in this browser (e.g. some HEIC) — let the server attempt it.
    return file;
  }

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close?.();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  let quality = 0.86;
  let blob: Blob | null = null;
  for (let i = 0; i < 5; i++) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );
    if (!blob || blob.size <= targetBytes) break;
    quality -= 0.12;
  }
  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
}
