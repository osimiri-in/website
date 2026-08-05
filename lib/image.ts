import "server-only";
import sharp from "sharp";

export type ProcessedImage = {
  buffer: Buffer;
  contentType: "image/jpeg";
  ext: "jpg";
  width?: number;
  height?: number;
  bytes: number;
};

/**
 * Auto-orient, resize down to `maxDim` on the longest side, and compress to
 * JPEG under `targetBytes` (default ~1 MB) while keeping quality as high as
 * possible. Never enlarges. Returns the processed buffer to upload.
 */
export async function processImage(
  input: Buffer,
  { maxDim = 2000, targetBytes = 1_000_000 } = {},
): Promise<ProcessedImage> {
  const base = sharp(input, { failOn: "none" }).rotate(); // honour EXIF orientation
  const meta = await base.metadata();

  const needsResize =
    (meta.width ?? 0) > maxDim || (meta.height ?? 0) > maxDim;
  const prepared = needsResize
    ? base.resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    : base;

  // Step quality down until the encoded size fits the target.
  let out: Buffer | null = null;
  for (const quality of [86, 80, 74, 68, 62, 56]) {
    out = await prepared.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
    if (out.length <= targetBytes) break;
  }
  const buffer = out ?? (await prepared.jpeg({ quality: 56 }).toBuffer());
  const outMeta = await sharp(buffer).metadata();

  return {
    buffer,
    contentType: "image/jpeg",
    ext: "jpg",
    width: outMeta.width,
    height: outMeta.height,
    bytes: buffer.length,
  };
}
